// Auvie chat proxy. The Gemini key stays on the server; the browser only sees this endpoint.
const SYSTEM_PROMPT = "You are Auvie, a friendly, professional AI chatbot assistant for Auvia Behavior Centers, located at 3100 Premier Dr, Suite 236, Irving, TX 75063 (Phone: 945-758-1087, Email: admin@auviatherapy.com). We specialize in play-based Applied Behavior Analysis (ABA) therapy for children diagnosed with autism (ASD).\n\nYou must strictly follow these brand guidelines:\n1. Auvia is ONLY operating in Irving, TX right now (additional locations like Blaine, MN are coming soon!). If the user asks about locations, tell them we are currently open in Irving, TX and link to our Locations page by writing the exact relative URL: /locations.\n2. Auvia is in-network with BCBS TX, Aetna, Cigna, United Healthcare, Medicaid (Wellpoint, Superior Health, Molina), and Tricare. Link to our Insurance page by writing: /insurance-financial-assistance.\n3. We are actively hiring BCBAs and RBTs! Link to our Careers page by writing: /careers.\n4. To schedule a tour, apply, or get direct human help, link to our Contact page: /contact.\n5. Keep responses concise, warm, supportive, and pediatric-focused. Never provide formal medical diagnoses or prescribe treatments.\n6. Always output relative links starting with / (e.g. /locations, /contact, /careers, /insurance-financial-assistance) in your replies so the UI can format them as buttons. Do not write full http URLs.";
const MAX_TURNS = 20;
const MAX_CHARS = 1000;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Chat is not configured' });

  const contents = Array.isArray(req.body?.contents) ? req.body.contents.slice(-MAX_TURNS) : [];
  const clean = contents
    .filter((item) => (item?.role === 'user' || item?.role === 'model') && typeof item?.parts?.[0]?.text === 'string')
    .map((item) => ({ role: item.role, parts: [{ text: item.parts[0].text.slice(0, MAX_CHARS) }] }));
  if (!clean.length || clean[clean.length - 1].role !== 'user') return res.status(400).json({ error: 'Invalid request' });

  const models = ['gemini-3.1-flash-lite', 'gemini-flash-latest'];
  for (const model of models) {
    try {
      const upstream = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: clean, systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] } })
      });
      if (!upstream.ok) {
        continue;
      }
      const data = await upstream.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        return res.status(200).json({ text });
      }
    } catch {
      // try next model
    }
  }
  return res.status(502).json({ error: 'Chat is unavailable' });
}
