import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const topic = (process.env.NTFY_TOPIC || "sBhYYf0nRytpjRyt").trim();
  if (!topic) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  try {
    let path = "/";
    let referrer = "Direct";
    let isMobile = false;

    try {
      const body = await req.json();
      if (typeof body?.path === "string" && body.path) path = body.path;
      if (typeof body?.referrer === "string" && body.referrer) referrer = body.referrer;
      if (typeof body?.isMobile === "boolean") isMobile = body.isMobile;
    } catch {
      // تجاهل لو الـ body فاضي
    }

    const country = req.headers.get("x-vercel-ip-country") || "Unknown";
    const city = req.headers.get("x-vercel-ip-city") || "";
    const location = city ? `${decodeURIComponent(city)}, ${country}` : country;
    const device = isMobile ? "Mobile" : "Desktop";

    const message = [
      `Page: ${path}`,
      `Device: ${device}`,
      `Location: ${location}`,
      `Referrer: ${referrer}`,
    ].join("\n");

    await fetch(`https://ntfy.sh/${encodeURIComponent(topic)}`, {
      method: "POST",
      headers: {
        Title: "New Portfolio Visitor",
        Priority: "3",
        Tags: "eyes,globe_with_meridians",
        Click: "https://youssef-abdeltwab.vercel.app/",
      },
      body: message,
      cache: "no-store",
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Visit notification error:", error);
    return NextResponse.json({ ok: false }, { status: 200 });
  }
}