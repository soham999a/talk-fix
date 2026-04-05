import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/firestore";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, email, device, service, location, issue } = body;

    if (!name || !phone || !device || !service || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const ref = await createBooking({ name, phone, email, device, service, location, issue });
    return NextResponse.json({ success: true, id: ref.id });
  } catch (err) {
    console.error("Booking error:", err);
    return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
  }
}
