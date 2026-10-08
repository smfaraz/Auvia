import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({mode}) => {
  const review = mode === 'review';
  return {
    plugins: [react(), tailwindcss(), {
      name: 'review-html',
      transformIndexHtml(html) {
        if (!review) return html;
        return html.replace(/<!-- Meta Pixel Code -->[\s\S]*?<!-- End Meta Pixel Code -->/g, '')
          .replace(/<!-- Meta Pixel Fallback \(noscript\) -->\s*<noscript>[\s\S]*?<\/noscript>/g, '')
          .replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex, nofollow" />');
      },
    }],
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
