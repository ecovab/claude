"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function PhoneVisual() {
  const { scrollY } = useScroll();
  const screenY = useTransform(scrollY, [0, 400], [0, -60]);
  const dotGridY = useTransform(scrollY, [0, 400], [0, 60]);

  return (
    <div className="relative mx-auto" style={{ width: 260, height: 500 }}>
      <style>{`
        @keyframes phone-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      {/* Dot grid layer behind the phone */}
      <motion.div
        style={{
          y: dotGridY,
          backgroundImage: "radial-gradient(#2A2A2A 1px, transparent 1px)",
          backgroundSize: "8px 8px",
        }}
        className="absolute -inset-8 -z-10"
      />

      <div style={{ animation: "phone-float 3s ease-in-out infinite" }}>
        <motion.div
          className="relative"
          style={{
            width: 260,
            height: 500,
            background: "#1C1C1C",
            borderRadius: 40,
            border: "1.5px solid rgba(232,23,58,0.4)",
            boxShadow: "0 0 40px rgba(232,23,58,0.1)",
          }}
        >
          {/* Volume buttons */}
          <div
            className="absolute left-0"
            style={{
              top: 90,
              width: 3,
              height: 30,
              background: "#2A2A2A",
              borderRadius: 2,
              transform: "translateX(-1.5px)",
            }}
          />
          <div
            className="absolute left-0"
            style={{
              top: 130,
              width: 3,
              height: 30,
              background: "#2A2A2A",
              borderRadius: 2,
              transform: "translateX(-1.5px)",
            }}
          />

          {/* Power button */}
          <div
            className="absolute right-0"
            style={{
              top: 110,
              width: 3,
              height: 45,
              background: "#2A2A2A",
              borderRadius: 2,
              transform: "translateX(1.5px)",
            }}
          />

          {/* Screen */}
          <motion.div
            style={{
              y: screenY,
              margin: 8,
              borderRadius: 32,
              background: "linear-gradient(180deg, #111111 0%, #1a1a1a 100%)",
              height: "calc(100% - 16px)",
            }}
            className="flex flex-col overflow-hidden"
          >
            {/* Notch */}
            <div
              style={{
                width: 70,
                height: 22,
                background: "#111111",
                borderRadius: 999,
                margin: "10px auto",
              }}
            />

            {/* Middle content */}
            <div className="flex flex-1 flex-col items-center justify-center gap-2">
              <span className="text-lg font-bold text-white">Cell &amp; Sound</span>
              <div style={{ width: 60, height: 2, background: "#E8173A", margin: "0 auto" }} />
              <span className="text-xs" style={{ color: "#888888" }}>
                Paarl&apos;s #1 Repair Shop
              </span>
            </div>

            {/* Home indicator */}
            <div
              style={{
                width: 80,
                height: 4,
                background: "rgba(255,255,255,0.2)",
                borderRadius: 999,
                margin: "0 auto 12px",
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
