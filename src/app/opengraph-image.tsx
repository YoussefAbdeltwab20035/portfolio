import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Youssef Abdeltwab — Full-Stack MERN Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

async function getAvatarDataUrl(): Promise<string | null> {
  try {
    const filePath = join(process.cwd(), "public", "og-avatar.jpg");
    const buffer = await readFile(filePath);
    return `data:image/jpeg;base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function Image() {
  const avatarSrc = await getAvatarDataUrl();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#020518",
          fontFamily: "sans-serif",
        }}
      >
        {/* Right Deep Royal Blue Split Panel */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "56%",
            height: "100%",
            background: "linear-gradient(135deg, #061466 0%, #030936 100%)",
            clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />

        {/* Top Bar (Logo + Nav Links) */}
        <div
          style={{
            position: "absolute",
            top: "32px",
            left: "72px",
            right: "72px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            zIndex: 2,
          }}
        >
          {/* Hexagon Y Badge */}
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "10px",
              border: "2px solid rgba(255,255,255,0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              fontSize: "20px",
              fontWeight: 800,
            }}
          >
            Y
          </div>

          {/* Nav Items + Contact Pill */}
          <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px" }}>
              About
            </span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px" }}>
              Experience
            </span>
            <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "15px" }}>
              Projects
            </span>
            <div
              style={{
                background: "#FFFFFF",
                color: "#020518",
                fontSize: "12px",
                fontWeight: 800,
                letterSpacing: "1.2px",
                padding: "8px 16px",
                borderRadius: "999px",
              }}
            >
              CONTACT ME
            </div>
          </div>
        </div>

        {/* Left Column: Intro, Name, Role & Social Squares */}
        <div
          style={{
            width: "52%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: "72px",
            paddingRight: "24px",
            zIndex: 2,
          }}
        >
          <div
            style={{
              fontSize: "22px",
              fontWeight: 700,
              color: "#38BDF8",
              marginBottom: "10px",
            }}
          >
            Hi, I am
          </div>

          <div
            style={{
              fontSize: "52px",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-1.5px",
              color: "#FFFFFF",
              marginBottom: "12px",
            }}
          >
            Youssef Abdeltwab
          </div>

          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#CBD5E1",
              marginBottom: "28px",
            }}
          >
            Full-Stack MERN Web Developer
          </div>

          {/* Social Icon Squares */}
          <div style={{ display: "flex", gap: "10px" }}>
            {["@", "WA", "GH", "in", "TEL"].map((label) => (
              <div
                key={label}
                style={{
                  width: "38px",
                  height: "34px",
                  borderRadius: "7px",
                  background: "rgba(15, 23, 42, 0.85)",
                  border: "1px solid rgba(148, 163, 184, 0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#E2E8F0",
                  fontSize: "12px",
                  fontWeight: 700,
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Portrait Frame */}
        <div
          style={{
            width: "48%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "28px",
            paddingRight: "48px",
            zIndex: 2,
          }}
        >
          {avatarSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarSrc}
              alt="Youssef Abdeltwab"
              style={{
                width: "350px",
                height: "420px",
                objectFit: "cover",
                objectPosition: "center top",
                borderRadius: "24px",
                boxShadow: "0 24px 60px rgba(0, 0, 0, 0.55)",
              }}
            />
          ) : (
            <div
              style={{
                width: "350px",
                height: "420px",
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFFFFF",
                fontSize: "64px",
                fontWeight: 800,
              }}
            >
              YA
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}