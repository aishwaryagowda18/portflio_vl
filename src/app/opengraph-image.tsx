import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.fullName} — ${profile.jobTitle}, ${profile.department}, ${profile.institution}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const photo = await readFile(join(process.cwd(), "public", profile.photo), "base64");
const photoSrc = `data:image/jpeg;base64,${photo}`;

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#1d2540",
          color: "#f6f2e8",
          padding: 64,
          gap: 56,
          alignItems: "center",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: "#d8a94a", textTransform: "uppercase", fontFamily: "Arial" }}>
            Department of Physics · MIT Mysore
          </div>
          <div style={{ fontSize: 34, marginTop: 28, opacity: 0.75 }}>Prof. Dr.</div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05 }}>Vijaylakshmi Dayal</div>
          <div style={{ fontSize: 30, marginTop: 20, color: "#d8a94a" }}>{`${profile.jobTitle}, Department of Physics`}</div>
          <div style={{ fontSize: 24, marginTop: 28, opacity: 0.8, fontFamily: "Arial", lineHeight: 1.4 }}>
            Manganites · Multiferroics · Thermoelectrics · Microwave dielectrics · Photocatalysis
          </div>
        </div>
        <div
          style={{
            display: "flex",
            width: 330,
            height: 430,
            borderRadius: 28,
            overflow: "hidden",
            border: "3px solid rgba(216,169,74,0.6)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoSrc} alt="" width={330} height={430} style={{ objectFit: "cover", objectPosition: "top" }} />
        </div>
      </div>
    ),
    size,
  );
}
