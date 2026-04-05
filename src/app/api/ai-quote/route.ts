import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const SYSTEM_PROMPT = `You are a friendly repair assistant for Talk N Fix Wireless — a professional device repair shop with 5 locations in Newark and Passaic, New Jersey.

Your job is to:
1. Help customers understand what repair they need
2. Give a rough price estimate based on common repair costs
3. Tell them how long it takes
4. Encourage them to walk in or call

Pricing guidelines (use these as rough estimates):
- iPhone screen repair: $79–$249 depending on model
- Samsung screen repair: $89–$299 depending on model  
- iPad screen repair: $99–$199
- Battery replacement: $49–$89
- Charging port repair: $49–$79
- Back glass repair: $79–$149
- Game console HDMI: $89–$129
- Water damage: $79–$149 (diagnostic first)
- Laptop screen: $99–$249
- Computer repair: $59–$149

Always:
- Be friendly and conversational
- Keep responses SHORT (2-4 sentences max)
- End with "Walk in today — no appointment needed!" or a phone number
- Mention the 1-year warranty
- If unsure about exact price, say "Call us for an exact quote"

Store phone: 973-778-5900 (Passaic) | 973-274-9800 (Newark)
Hours: Mon–Sat 9am–7:45pm, Sun 10am–5:45pm`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY === "your_groq_api_key_here") {
      return NextResponse.json({
        reply: "Hi! I'm the Talk N Fix assistant. For a quick quote, call us at 973-778-5900 or walk in to any of our 5 locations. No appointment needed!",
      });
    }

    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages,
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content ?? "I'm not sure about that — call us at 973-778-5900 for an exact quote!";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Groq error:", err);
    return NextResponse.json({ reply: "Call us at 973-778-5900 for a quick quote. Walk-ins welcome!" });
  }
}
