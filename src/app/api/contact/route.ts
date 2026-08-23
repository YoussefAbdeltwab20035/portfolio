import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, message } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // التحقق من وجود متغيرات البيئة
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Missing EMAIL_USER or EMAIL_PASS environment variables");
      return NextResponse.json(
        { error: "Email configuration missing on server" },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `💼 New Client Message from: ${email}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 24px; background: #0B0F17; color: #ffffff; border-radius: 16px; max-width: 600px; margin: 0 auto; border: 1px solid #1e293b;">
          <h2 style="color: #f59e0b; margin-top: 0; font-size: 20px;">🚀 New Portfolio Inquiry</h2>
          
          <div style="background: #151d2a; padding: 16px; border-radius: 12px; margin: 16px 0; border: 1px solid rgba(255,255,255,0.08);">
            <p style="margin: 0 0 6px 0; color: #94a3b8; font-size: 13px; font-weight: bold;">Sender Email:</p>
            <a href="mailto:${email}" style="color: #38bdf8; font-size: 16px; font-weight: bold; text-decoration: none;">${email}</a>
          </div>

          ${
            message
              ? `
          <div style="background: #151d2a; padding: 16px; border-radius: 12px; margin: 16px 0; border: 1px solid rgba(255,255,255,0.08);">
            <p style="margin: 0 0 6px 0; color: #94a3b8; font-size: 13px; font-weight: bold;">Message Content:</p>
            <p style="margin: 0; color: #e2e8f0; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>
          `
              : ""
          }

          <p style="font-size: 12px; color: #64748b; margin-top: 24px; border-top: 1px solid rgba(255,255,255,0.08); pt: 12px;">
            You can directly click "Reply" in your email client to respond to this lead.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: "Failed to send email notification" },
      { status: 500 }
    );
  }
}