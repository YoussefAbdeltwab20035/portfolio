import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Youssef Abdeltwab | Full-Stack Web Developer";
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
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          backgroundColor: "#030712",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* خلفيات الإضاءة العصرية */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "550px",
            height: "550px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, rgba(245, 158, 11, 0) 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-120px",
            left: "-80px",
            width: "500px",
            height: "500px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(14, 165, 233, 0.14) 0%, rgba(14, 165, 233, 0) 70%)",
          }}
        />

        {/* شريط الحالة العلوي */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "8px 18px",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "#10b981",
              }}
            />
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#e2e8f0", letterSpacing: "0.5px" }}>
              AVAILABLE FOR NEW PROJECTS
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "16px", fontWeight: 700, color: "#94a3b8" }}>
            <span style={{ color: "#f59e0b" }}>⚡</span> youssef-abdeltwab.dev
          </div>
        </div>

        {/* النصوص الرئيسية */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <h1
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-2px",
              margin: 0,
              color: "#ffffff",
              lineHeight: 1.1,
            }}
          >
            Youssef Abdeltwab
          </h1>

          <div style={{ fontSize: "28px", fontWeight: 600, color: "#f59e0b" }}>
            Full-Stack Web Developer & Software Engineer
          </div>

          <p style={{ fontSize: "20px", color: "#94a3b8", margin: 0, maxWidth: "850px", lineHeight: 1.5 }}>
            Architecting scalable web applications, robust Node.js backend systems, and modern React/Next.js interactive interfaces.
          </p>
        </div>

        {/* شريط التقنيات السفلي */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid rgba(255, 255, 255, 0.08)",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            {["Next.js 15", "React", "Node.js", "Express", "MongoDB", "Tailwind"].map((tech) => (
              <div
                key={tech}
                style={{
                  padding: "6px 14px",
                  borderRadius: "10px",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  color: "#cbd5e1",
                  fontSize: "14px",
                  fontWeight: 600,
                }}
              >
                {tech}
              </div>
            ))}
          </div>

          <div style={{ color: "#64748b", fontSize: "14px", fontWeight: 600 }}>
            MERN Stack Architecture
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}