import { Resend } from "resend";

const TO = process.env.NOTIFY_EMAIL ?? "dassoham345@gmail.com";
const CAREERS_TO = process.env.CAREERS_EMAIL ?? process.env.NOTIFY_EMAIL ?? "dassoham345@gmail.com";
const FROM = "Talk N Fix Wireless <onboarding@resend.dev>";

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

export async function sendBookingEmail(data: {
  name: string; phone: string; email?: string;
  device: string; service: string; location: string; issue?: string;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `New Booking: ${data.name} — ${data.service}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#bc0100;padding:20px;border-radius:8px 8px 0 0">
        <h2 style="color:white;margin:0">New Booking — Talk N Fix Wireless</h2>
      </div>
      <div style="background:white;padding:24px;border:1px solid #eee;border-radius:0 0 8px 8px">
        <p><strong>Customer:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
        ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ""}
        <p><strong>Device:</strong> ${data.device}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        ${data.issue ? `<p><strong>Issue:</strong> ${data.issue}</p>` : ""}
        <div style="background:#fff3f3;border-left:4px solid #bc0100;padding:12px;margin-top:16px;border-radius:4px">
          <strong style="color:#bc0100">Action: Customer is expecting to walk in. Prepare for their visit.</strong>
        </div>
      </div>
      <p style="color:#aaa;font-size:11px;text-align:center;margin-top:12px">Talk N Fix Wireless · Newark & Passaic NJ · <span style="color:#bc0100;font-weight:bold">Powered by NiceCare</span></p>
    </div>`,
  });

  if (error) {
    console.error("Resend booking error:", error);
    return false;
  }
  return true;
}

export async function sendContactEmail(data: {
  name: string; phone: string; email?: string;
  device?: string; location?: string; message: string;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  const { error } = await resend.emails.send({
    from: FROM,
    to: TO,
    subject: `New Contact: ${data.name} — ${data.device || "General Inquiry"}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#bc0100;padding:20px;border-radius:8px 8px 0 0">
        <h2 style="color:white;margin:0">New Contact — Talk N Fix Wireless</h2>
      </div>
      <div style="background:white;padding:24px;border:1px solid #eee;border-radius:0 0 8px 8px">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
        ${data.email ? `<p><strong>Email:</strong> ${data.email}</p>` : ""}
        ${data.device ? `<p><strong>Issue Type:</strong> ${data.device}</p>` : ""}
        ${data.location ? `<p><strong>Location:</strong> ${data.location}</p>` : ""}
        <div style="background:#f9f9f9;padding:16px;border-radius:8px;margin-top:12px">
          <strong>Message:</strong>
          <p style="margin:8px 0 0">${data.message}</p>
        </div>
      </div>
      <p style="color:#aaa;font-size:11px;text-align:center;margin-top:12px">Talk N Fix Wireless · Newark & Passaic NJ · <span style="color:#bc0100;font-weight:bold">Powered by NiceCare</span></p>
    </div>`,
  });

  if (error) {
    console.error("Resend contact error:", error);
    return false;
  }
  return true;
}

export async function sendCareerEmail(data: {
  name: string; email: string; phone: string;
  role: string; videoLink: string;
}): Promise<boolean> {
  const resend = getResend();
  if (!resend) return false;

  // Email to manager
  await resend.emails.send({
    from: FROM,
    to: CAREERS_TO,
    subject: `New Job Application: ${data.name} — ${data.role}`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#bc0100;padding:20px;border-radius:8px 8px 0 0">
        <h2 style="color:white;margin:0">New Job Application — Talk N Fix Wireless</h2>
      </div>
      <div style="background:white;padding:24px;border:1px solid #eee;border-radius:0 0 8px 8px">
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
        <p><strong>Role Applying For:</strong> ${data.role}</p>
        <div style="background:#fff3f3;border-left:4px solid #bc0100;padding:16px;margin-top:16px;border-radius:4px">
          <strong style="color:#bc0100">Video Application:</strong><br/>
          <a href="${data.videoLink}" style="color:#bc0100;font-size:16px;font-weight:bold">${data.videoLink}</a>
        </div>
        <p style="color:#666;font-size:13px;margin-top:16px">Click the link above to watch their video application on Google Drive.</p>
      </div>
      <p style="color:#aaa;font-size:11px;text-align:center;margin-top:12px">Talk N Fix Wireless · Newark & Passaic NJ · <span style="color:#bc0100;font-weight:bold">Powered by NiceCare</span></p>
    </div>`,
  });

  // Confirmation email to applicant
  const { error } = await resend.emails.send({
    from: FROM,
    to: data.email,
    subject: `We received your application — Talk N Fix Wireless`,
    html: `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#111;padding:20px;border-radius:8px 8px 0 0">
        <h2 style="color:white;margin:0">Application Received!</h2>
      </div>
      <div style="background:white;padding:24px;border:1px solid #eee;border-radius:0 0 8px 8px">
        <p>Hi <strong>${data.name}</strong>,</p>
        <p>Thank you for applying to <strong>Talk N Fix Wireless</strong>! We've received your video application for the <strong>${data.role}</strong> position.</p>
        <p>Our team will review your application and get back to you within <strong>3-5 business days</strong>.</p>
        <div style="background:#f9f9f9;padding:16px;border-radius:8px;margin-top:16px">
          <p style="margin:0;color:#666;font-size:13px">If you have any questions, reach us at <a href="mailto:talknfixwireless@gmail.com">talknfixwireless@gmail.com</a></p>
        </div>
      </div>
      <p style="color:#aaa;font-size:11px;text-align:center;margin-top:12px">Talk N Fix Wireless · Newark & Passaic NJ · <span style="color:#bc0100;font-weight:bold">Powered by NiceCare</span></p>
    </div>`,
  });

  if (error) { console.error("Career email error:", error); return false; }
  return true;
}
