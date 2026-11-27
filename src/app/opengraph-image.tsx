import { ImageResponse } from "next/og";

export const alt = "Youssef Abdeltwab — Full-Stack MERN Web Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background:
            "radial-gradient(circle at 85% 15%, rgba(0, 231, 255, 0.16) 0%, transparent 45%), linear-gradient(135deg, #020412 0%, #040826 55%, #061539 100%)",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "rgba(0, 231, 255, 0.12)",
            border: "1px solid rgba(0, 231, 255, 0.35)",
            padding: "10px 24px",
            borderRadius: "999px",
            alignSelf: "flex-start",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              background: "#00E7FF",
            }}
          />
          <span
            style={{
              fontSize: "20px",
              fontWeight: 700,
              color: "#00E7FF",
              letterSpacing: "1.5px",
              textTransform: "uppercase",
            }}
          >
            Full-Stack MERN &amp; Next.js Developer
          </span>
        </div>

        {/* Center Title & Description */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "74px",
              fontWeight: 800,
              lineHeight: 1.08,
              letterSpacing: "-2px",
              color: "#FFFFFF",
            }}
          >
            Youssef Abdeltwab
          </div>
          <div
            style={{
              fontSize: "28px",
              lineHeight: 1.45,
              color: "#CBD9FF",
              maxWidth: "940px",
            }}
          >
            Architecting scalable full-stack web applications, RESTful APIs, and
            high-performance cloud platforms with Next.js, TypeScript &amp; React.
          </div>
        </div>

        {/* Bottom Stack & Domain */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255, 255, 255, 0.14)",
            paddingTop: "28px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", flexWrap: "nowrap" }}>
            {[
              "Next.js",
              "React",
              "TypeScript",
              "Node.js",
              "Express",
              "MongoDB",
              "Prisma",
            ].map((tech) => (
              <span
                key={tech}
                style={{
                  fontSize: "19px",
                  fontWeight: 600,
                  color: "#E2E8F0",
                  background: "rgba(255, 255, 255, 0.07)",
                  padding: "8px 16px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          <span
            style={{
              fontSize: "21px",
              fontWeight: 700,
              color: "#00E7FF",
            }}
          >
            youssef-abdeltwab.vercel.app
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}