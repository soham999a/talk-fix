import { NextRequest, NextResponse } from "next/server";
import { sendCareerEmail } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, role, videoLink } = await req.json();
    if (!name || !email || !phone || !role || !videoLink) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }
    await sendCareerEmail({ name, email, phone, role, videoLink });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
