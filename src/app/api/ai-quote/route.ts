import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const SYSTEM_EN = `You are Alex, a friendly repair specialist at Talk N Fix Wireless — a premium device repair shop with 5 locations in Newark and Passaic, New Jersey. Founded 2014 by Rey. 6,500+ Google reviews. 1,000+ repairs/month.

PERSONALITY: Warm, helpful, conversational. Like a knowledgeable friend. Give specific answers. Keep replies 2-4 sentences max. Use natural language.

PRICING:
- iPhone 15 Pro Max screen: $329 | iPhone 15: $279 | iPhone 14 Pro Max: $249 | iPhone 14: $199 | iPhone 13: $179 | iPhone 12: $149 | iPhone 11: $129 | Older: $79-$119
- Samsung S24 Ultra: $349 | S24/S23: $249 | S22: $199 | A-series: $89-$149
- iPad screen: $119-$199 | Battery: $49-$89 | Charging port: $59-$79 | Back glass: $79-$149
- Game console HDMI (PS5/Xbox): $89-$129 | Water damage: FREE diagnostic, repair from $79
- Laptop screen: $99-$249 | Computer repair: $59-$149 | No power diagnostic: FREE

5 LOCATIONS:
1. 354 Passaic St, Passaic NJ — 973-778-5900
2. 315 Monroe St, Passaic NJ — 973-894-3600
3. 165 Market St, Passaic NJ — 973-767-2493
4. 207 Ferry St, Newark NJ — 973-274-9800
5. 674 Mt. Prospect Ave, Newark NJ — 973-250-6191

HOURS: Mon-Sat 9am-7:45pm, Sun 10am-5:45pm. Walk-ins always welcome, no appointment needed.
WARRANTY: 1-year on ALL repairs. FREE diagnostic. Data stays safe. Bilingual staff.

RULES: Give specific prices immediately. End with a helpful next step. Be natural and conversational.`;

const SYSTEM_ES = `Eres Alex, un especialista amigable en reparaciones de Talk N Fix Wireless — una tienda premium de reparación de dispositivos con 5 ubicaciones en Newark y Passaic, Nueva Jersey. Fundada en 2014 por Rey. Más de 6,500 reseñas en Google. Más de 1,000 reparaciones al mes.

PERSONALIDAD: Cálido, servicial, conversacional. Como un amigo conocedor. Da respuestas específicas. Máximo 2-4 oraciones. Usa lenguaje natural.

PRECIOS:
- Pantalla iPhone 15 Pro Max: $329 | iPhone 15: $279 | iPhone 14 Pro Max: $249 | iPhone 14: $199 | iPhone 13: $179 | iPhone 12: $149 | iPhone 11: $129 | Modelos anteriores: $79-$119
- Samsung S24 Ultra: $349 | S24/S23: $249 | S22: $199 | Serie A: $89-$149
- Pantalla iPad: $119-$199 | Batería: $49-$89 | Puerto de carga: $59-$79 | Vidrio trasero: $79-$149
- HDMI consola (PS5/Xbox): $89-$129 | Daño por agua: diagnóstico GRATIS, reparación desde $79
- Pantalla laptop: $99-$249 | Reparación computadora: $59-$149 | Sin encendido: diagnóstico GRATIS

5 UBICACIONES:
1. 354 Passaic St, Passaic NJ — 973-778-5900
2. 315 Monroe St, Passaic NJ — 973-894-3600
3. 165 Market St, Passaic NJ — 973-767-2493
4. 207 Ferry St, Newark NJ — 973-274-9800
5. 674 Mt. Prospect Ave, Newark NJ — 973-250-6191

HORARIO: Lun-Sáb 9am-7:45pm, Dom 10am-5:45pm. Visitas sin cita siempre bienvenidas.
GARANTÍA: 1 año en TODAS las reparaciones. Diagnóstico GRATIS. Datos seguros. Personal bilingüe.

REGLAS: Da precios específicos de inmediato. Termina con un próximo paso útil. Sé natural y conversacional. Responde SIEMPRE en español.`;

function smartFallback(lastMsg: string, lang: string): string {
  const m = lastMsg.toLowerCase();
  const es = lang === "es";

  if (m.includes("iphone") && (m.includes("screen") || m.includes("crack") || m.includes("pantalla") || m.includes("roto"))) {
    return es
      ? "La reparación de pantalla de iPhone va de $79 a $329 según tu modelo. La mayoría de reparaciones listas en 30-45 minutos. ¡Visítanos cuando quieras, sin cita!"
      : "iPhone screen repair ranges from $79 to $329 depending on your model. Most repairs done in 30-45 minutes while you wait. Walk in anytime — no appointment needed!";
  }
  if (m.includes("samsung") && (m.includes("screen") || m.includes("crack") || m.includes("pantalla"))) {
    return es
      ? "La reparación de pantalla Samsung va de $89 a $349. Tenemos piezas para todos los modelos Galaxy. ¡Visítanos cuando quieras!"
      : "Samsung screen repair ranges from $89 to $349. We carry parts for all Galaxy models. Walk in anytime!";
  }
  if (m.includes("battery") || m.includes("batería") || m.includes("charging") || m.includes("carga")) {
    return es
      ? "El reemplazo de batería cuesta $49-$89 y tarda unos 30 minutos. Reparación de puerto de carga: $59-$79. ¡Sin cita necesaria!"
      : "Battery replacement is $49-$89 and takes about 30 minutes. Charging port repair is $59-$79. Walk in anytime!";
  }
  if (m.includes("water") || m.includes("agua") || m.includes("wet") || m.includes("mojado")) {
    return es
      ? "¡Tráelo lo antes posible! El diagnóstico es GRATIS y la reparación empieza en $79. No intentes cargarlo. Abierto Lun-Sáb 9am-7:45pm."
      : "Bring it in ASAP! Free diagnostic, repair starts at $79. Don't try to charge it first. Open Mon-Sat 9am-7:45pm.";
  }
  if (m.includes("location") || m.includes("where") || m.includes("ubicación") || m.includes("dónde") || m.includes("address")) {
    return es
      ? "¡Tenemos 5 ubicaciones! Passaic: 354 Passaic St (973-778-5900), 315 Monroe St (973-894-3600), 165 Market St (973-767-2493). Newark: 207 Ferry St (973-274-9800), 674 Mt. Prospect Ave (973-250-6191)."
      : "We have 5 locations! Passaic: 354 Passaic St (973-778-5900), 315 Monroe St (973-894-3600), 165 Market St (973-767-2493). Newark: 207 Ferry St (973-274-9800), 674 Mt. Prospect Ave (973-250-6191).";
  }
  if (m.includes("how long") || m.includes("wait") || m.includes("cuánto tiempo") || m.includes("espera")) {
    return es
      ? "¡La mayoría de reparaciones toman 30-45 minutos mientras esperas en la tienda! Las pantallas y baterías generalmente listas en menos de una hora."
      : "Most repairs take 30-45 minutes while you wait in-store! Screen repairs and battery swaps are usually done in under an hour.";
  }
  if (m.includes("warranty") || m.includes("garantía")) {
    return es
      ? "¡Cada reparación incluye 1 año de garantía! Si algo falla con la reparación, lo arreglamos gratis. Sin preguntas."
      : "Every repair comes with a 1-year warranty! If anything goes wrong with the repair, we fix it free of charge. No questions asked.";
  }
  if (m.includes("price") || m.includes("cost") || m.includes("how much") || m.includes("precio") || m.includes("cuánto")) {
    return es
      ? "Los precios dependen del dispositivo. Pantallas iPhone desde $79, Samsung desde $89, baterías desde $49. ¡Visítanos para un diagnóstico gratis y presupuesto exacto!"
      : "Pricing depends on your device. iPhone screens start at $79, Samsung at $89, batteries at $49. Walk in for a free diagnostic and exact quote!";
  }
  return es
    ? "¡Visita cualquiera de nuestras 5 ubicaciones sin cita! Te damos un diagnóstico gratis y presupuesto exacto en el momento. Abierto Lun-Sáb 9am-7:45pm."
    : "Walk in to any of our 5 locations — no appointment needed! We'll give you a free diagnostic and exact quote on the spot. Open Mon-Sat 9am-7:45pm.";
}

export async function POST(req: NextRequest) {
  let messages: Array<{ role: string; content: string }> = [];
  let lang = "en";

  try {
    const body = await req.json();
    messages = body.messages ?? [];
    lang = body.lang ?? "en";

    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system" as const, content: lang === "es" ? SYSTEM_ES : SYSTEM_EN },
        ...messages.slice(-10).map((m: { role: string; content: string }) => ({
          role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
          content: m.content,
        })),
      ],
      max_tokens: 220,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content?.trim();
    if (!reply) throw new Error("Empty response");

    return NextResponse.json({ reply });
  } catch (err) {
    // error logged
    const lastMsg = messages[messages.length - 1]?.content ?? "";
    return NextResponse.json({ reply: smartFallback(lastMsg, lang) });
  }
}
