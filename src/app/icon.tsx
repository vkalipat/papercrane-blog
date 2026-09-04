import { ImageResponse } from "next/og";

// App icon rendered via Satori. 32x32 "P" monogram in serif on cream paper,
// with a tiny forest-green paper-fold triangle as the Paper Crane mark.
// Next automatically wires this into <link rel="icon"> alongside favicon.ico.

export const runtime = "nodejs";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#F7F3EB",
          color: "#111110",
          fontFamily: "serif",
          fontSize: 24,
          fontWeight: 400,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            lineHeight: 1,
          }}
        >
          P
        </div>
        <div
          style={{
            position: "absolute",
            right: 4,
            bottom: 4,
            width: 0,
            height: 0,
            display: "flex",
            borderStyle: "solid",
            borderWidth: "0 0 6px 6px",
            borderColor: "transparent transparent #1F4438 transparent",
          }}
        />
      </div>
    ),
    size,
  );
}
