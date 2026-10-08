import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GEMINI_API_KEY) {
    process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
  }
  const review = mode === 'review';
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'review-html',
        transformIndexHtml(html) {
          if (!review) return html;
          return html.replace(/<!-- Meta Pixel Code -->[\s\S]*?<!-- End Meta Pixel Code -->/g, '')
            .replace(/<!-- Meta Pixel Fallback \(noscript\) -->\s*<noscript>[\s\S]*?<\/noscript>/g, '')
            .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, nofollow" />');
        },
      },
      {
        name: 'api-chat-dev',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', async () => {
              try {
                const parsed = JSON.parse(body || '{}');
                const mockReq = { method: 'POST', body: parsed };
                const mockRes = {
                  statusCode: 200,
                  status(code: number) { this.statusCode = code; return this; },
                  json(data: any) {
                    res.statusCode = this.statusCode;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify(data));
                  }
                };
                const chatModule = await import('./api/chat.js');
                await chatModule.default(mockReq, mockRes);
              } catch (err: any) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: err?.message || 'Server error' }));
              }
            });
          });
        }
      }
    ],
    define: {
      '__AUVIA_REVIEW__': JSON.stringify(review),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
