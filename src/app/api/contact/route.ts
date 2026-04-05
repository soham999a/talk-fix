import { NextRequest, NextResponse } from "next/server";
import { createContactMessage } from "@/lib/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, device, location, message, smsOptIn } = body;

    if (!name || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ref = await createContactMessage({ name, phone, email, device, location, message, smsOptIn: !!smsOptIn });
    return NextResponse.json({ success: true, id: ref.id });
  } catch (err) {
    console.error("Contact error:", err);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
