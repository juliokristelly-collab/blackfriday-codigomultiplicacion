// Función serverless opcional (Vercel). La clave NUNCA llega al navegador.
// Variables de entorno: ANTHROPIC_API_KEY (obligatoria), APP_ACCESS_CODE (opcional), ANTHROPIC_MODEL (opcional).
const SYSTEM = `Eres un creador profesional de guiones virales para reels de aproximadamente un minuto, en español natural y conversacional.
Estructura obligatoria en 5 bloques con tiempos: HOOK VIRAL (0-3 s), PROBLEMA + AUTORIDAD (3-12 s), VERDAD REVELADORA (12-20 s), SOLUCIÓN PRÁCTICA (20-50 s), CIERRE + CTA (50-60 s).
Formato: 1) Título, 2) Objetivo, 3) Hook principal, 4) Tres hooks alternativos, 5) Guion por bloques, 6) Texto en pantalla, 7) Escena, 8) Tono, 9) Movimiento de cámara, 10) CTA, 11) Caption.
Reglas estrictas: no prometas ingresos ni resultados garantizados; no inventes testimonios, cifras, bonos, garantías ni experiencias personales de quien grabará; no uses urgencia falsa; no culpabilices; usa lenguaje inclusivo para hombres y mujeres; di «recomendar», «promocionar» o «comercializar», no «revender». Si hay lenguaje de fe, que sea suave, sin prosperidad prometida y sin versículos inventados. La palabra clave del CTA es la indicada por el usuario (por defecto BLACK). Precio de referencia solo si se pide: $297 USD regular y $179 USD en Black Week (cierre lunes 30 de noviembre de 2026, 11:59 p. m. hora Colombia).`;
const hits = new Map();
export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Método no permitido.' });
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(503).json({ error: 'El generador con IA no está configurado en este servidor.' });
  const body = typeof req.body === 'string' ? safe(req.body) : req.body || {};
  if (process.env.APP_ACCESS_CODE && body.codigo !== process.env.APP_ACCESS_CODE) return res.status(401).json({ error: 'Código de acceso incorrecto.' });
  const ip = String(req.headers['x-forwarded-for'] || 'x').split(',')[0]; const t = Date.now(); const arr = (hits.get(ip) || []).filter((x) => t - x < 600000);
  if (arr.length >= 10) return res.status(429).json({ error: 'Demasiadas solicitudes. Intenta en unos minutos.' }); arr.push(t); hits.set(ip, arr);
  const campos = body.campos && typeof body.campos === 'object' ? body.campos : {};
  const lines = Object.entries(campos).slice(0, 20).map(([k, v]) => `- ${String(k).slice(0, 60)}: ${String(v || '').slice(0, 500)}`).join('\n');
  if (!lines.trim()) return res.status(400).json({ error: 'Completa al menos un campo.' });
  try {
    const r = await fetch('https://api.anthropic.com/v1/messages', { method: 'POST', headers: { 'content-type': 'application/json', 'x-api-key': key, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5', max_tokens: 2000, system: SYSTEM, messages: [{ role: 'user', content: `Crea el guion con estos datos:\n${lines}` }] }) });
    const j = await r.json(); if (!r.ok) return res.status(502).json({ error: 'El servicio de IA no respondió correctamente.' });
    const texto = (j.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n').trim();
    return res.status(200).json({ texto });
  } catch (e) { return res.status(502).json({ error: 'No se pudo contactar al servicio de IA.' }); }
}
function safe(s) { try { return JSON.parse(s); } catch (e) { return {}; } }
