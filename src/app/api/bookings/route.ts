import { NextRequest, NextResponse } from "next/server";
import { createBooking } from "@/lib/firestore";

function sanitize(str: unknown, maxLen = 500): string {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, maxLen).replace(/<[^>]*>/g, "");
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const name = sanitize(body.name, 100);
    const phone = sanitize(body.phone, 20);
    const email = sanitize(body.email, 200);
    const device = sanitize(body.device, 100);
    const service = sanitize(body.service, 200);
    const location = sanitize(body.location, 200);
    const issue = sanitize(body.issue, 500);

    if (!name || !phone || !device || !service || !location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!/^[\d\s\-\+\(\)]{7,20}$/.test(phone)) {
      return NextResponse.json({ error: "Invalid phone number" }, { status: 400 });
    }

    const ref = await createBooking({ name, phone, email, device, service, location, issue });
    return NextResponse.json({ success: true, id: ref.id });
  } catch {
    return NextResponse.json({ error: "Failed to save booking" }, { status: 500 });
  }
}
