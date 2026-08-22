import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Portfolio Alert" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      replyTo: email,
      subject: `New Client Connection Request: ${email}`,
      html: `
        <div style="font-family: sans-serif; padding: 24px; background: #0B0F17; color: #ffffff; border-radius: 16px;">
          <h2 style="color: #f59e0b; margin-top: 0;">🚀 New Client Lead</h2>
          <p style="font-size: 15px; color: #cbd5e1;">A visitor just submitted their email through your portfolio:</p>
          <div style="background: #1e293b; padding: 16px; border-radius: 10px; margin: 20px 0; border: 1px solid rgba(255,255,255,0.1);">
            <span style="color: #94a3b8; font-size: 13px;">Client Email:</span><br/>
            <a href="mailto:${email}" style="color: #38bdf8; font-size: 18px; font-weight: bold; text-decoration: none;">${email}</a>
          </div>
          <p style="font-size: 12px; color: #64748b; margin-bottom: 0;">Hit "Reply" directly in your email client to start the conversation.</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Nodemailer error:", error);
    return NextResponse.json(
      { error: "Failed to send email notification" },
      { status: 500 }
    );
  }
}