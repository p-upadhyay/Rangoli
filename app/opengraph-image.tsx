import { ImageResponse } from "next/og";

// The preview card shown when the link is shared. Drawn from the site's own
// palette rather than an asset, so there is nothing to keep in sync.
//
// To swap in real artwork later: delete this file and drop a 1200x630
// opengraph-image.jpg (or .png) into this same folder. Next picks it up with
// no other change.
//
// Text here is Latin only on purpose — the default font in next/og has no
// Devanagari coverage, so Hindi would render as empty boxes unless a font file
// were bundled.

export const alt = "Yaadon Ki Rangoli — purane geet, nayi yaadein";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 84px",
          background: "#f5e5c4",
          fontFamily: "serif",
        }}
      >
        {/* The television, the same shape as the one on the page */}
        <div
          style={{
            display: "flex",
            width: 360,
            height: 268,
            flexShrink: 0,
            padding: 20,
            borderRadius: 30,
            background: "linear-gradient(145deg, #332116, #120d09)",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
              border: "6px solid #765135",
              background: "#d7c7a5",
              color: "#79251f",
              fontSize: 40,
            }}
          >
            8:00 AM
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 34, color: "#432313", letterSpacing: 2 }}>YAADON KI</div>
          <div style={{ fontSize: 116, color: "#79251f", lineHeight: 1.05 }}>Rangoli</div>
          <div style={{ display: "flex", width: 190, height: 4, margin: "22px 0", background: "#d68b22" }} />
          <div style={{ fontSize: 34, color: "#432313" }}>Purane geet, nayi yaadein</div>
          <div style={{ fontSize: 21, color: "#687354", marginTop: 18 }}>
            An unofficial fan-made nostalgia project
          </div>
        </div>
      </div>
    ),
    size
  );
}
