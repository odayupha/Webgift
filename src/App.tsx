import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  X,
  Volume2,
  VolumeX,
  Music,
  Flower2,
  Sparkles,
  Star,
} from "lucide-react";

/* ───────────────────── constants ───────────────────── */

// Ganti nilai di bawah ini dengan URL musik online langsung (direct link .mp3)
// Contoh: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
// Atau bisa juga tetap menggunakan file lokal di folder public seperti "/music.mp3"
export const MUSIC_URL = "/song.mp3";


const ROMANTIC_MESSAGES = [
  "Thank you for choosing me...",
  "Every moment with you is a treasure I hold close.",
  "You are the reason my heart learned to sing.",
  "In your eyes, I found my forever home.",
  "Loving you is the easiest and most beautiful thing.",
  "You are my today and all of my tomorrows.",
  "With you, even silence speaks louder than words.",
];

const POLAROID_PHOTOS = [
  {
    src: "/love5.jpeg",
    caption: "sukak bgt ini cantik bgt",
    rotate: -6,
    floatDuration: 4,
    floatY: 10,
  },
  {
    src: "/love2.jpeg",
    caption: "abis ini banyakin fotonya ya",
    rotate: 5,
    floatDuration: 4.5,
    floatY: 12,
  },
  {
    src: "/love3.jpeg",
    caption: "I like this one",
    rotate: -3,
    floatDuration: 5,
    floatY: 8,
  },
  {
    src: "/love4.jpeg",
    caption: "First di lingkar sayang",
    rotate: 4,
    floatDuration: 3.8,
    floatY: 11,
  },
  {
    src: "/love1.jpeg",
    caption: "Sayang foto kitaa kok dikit doang ternyataa huhuh sedih",
    rotate: -7,
    floatDuration: 4.2,
    floatY: 9,
  },
];

const SECRET_LETTER = `Hello my dearest Yanny,

You are so incredibly beautiful — inside and out.
Thank you so much for gracing my life with your presence.

Every single day, I feel grateful that I found you.
Thank you for accepting me, for allowing me to stand
beside you, for letting me be a part of your world.

You are the most wonderful thing that has ever happened
to me, and I will spend every day making sure you know
just how deeply, endlessly, and wholeheartedly I love you.

Forever yours,
With all my heart ♡`;

/* ═══════════════════════════════════════════════
   INTRO SCREEN — Dramatic Blooming Flower
   ═══════════════════════════════════════════════ */

function IntroPetal({
  angle,
  delay,
  size,
  color,
  distance,
}: {
  angle: number;
  delay: number;
  size: number;
  color: string;
  distance: number;
}) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transformOrigin: "center center",
      }}
      initial={{ scale: 0, opacity: 0, rotate: angle, x: "-50%", y: "-50%" }}
      animate={{
        scale: [0, 1.2, 1],
        opacity: [0, 1, 0.9],
        rotate: angle,
        x: "-50%",
        y: "-50%",
      }}
      transition={{ duration: 1.2, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      <div
        style={{
          width: size,
          height: size * 1.5,
          borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
          background: `radial-gradient(ellipse at 30% 30%, ${color}, ${color}88)`,
          transform: `translateY(-${distance}px)`,
          boxShadow: `0 0 20px ${color}44`,
        }}
      />
    </motion.div>
  );
}

function IntroScreen({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 3500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const fallingPetals = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 14 + Math.random() * 22,
        delay: Math.random() * 2,
        duration: 3 + Math.random() * 3,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 160,
        color: ["#f9a8d4", "#fbb6ce", "#fda4af", "#fb7185", "#f472b6"][
          Math.floor(Math.random() * 5)
        ],
      })),
    []
  );

  const petalLayers = useMemo(() => {
    const layers: {
      angle: number;
      delay: number;
      size: number;
      color: string;
      distance: number;
    }[] = [];
    for (let i = 0; i < 6; i++) {
      layers.push({
        angle: i * 60,
        delay: 0.2 + i * 0.06,
        size: 36,
        color: "#fb7185",
        distance: 40,
      });
    }
    for (let i = 0; i < 8; i++) {
      layers.push({
        angle: i * 45 + 22,
        delay: 0.5 + i * 0.05,
        size: 44,
        color: "#f9a8d4",
        distance: 65,
      });
    }
    for (let i = 0; i < 10; i++) {
      layers.push({
        angle: i * 36 + 10,
        delay: 0.8 + i * 0.04,
        size: 38,
        color: "#fce7f3",
        distance: 95,
      });
    }
    return layers;
  }, []);

  const sparkles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: 50 + (Math.random() - 0.5) * 60,
        y: 40 + (Math.random() - 0.5) * 50,
        delay: 1 + Math.random() * 1.5,
        size: 4 + Math.random() * 8,
      })),
    []
  );

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 40%, #fff1f2 0%, #ffe4e6 30%, #fecdd3 60%, #fda4af 100%)",
      }}
      exit={{ opacity: 0, scale: 1.15, filter: "blur(10px)" }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Falling Petals */}
      {fallingPetals.map((p) => (
        <motion.div
          key={p.id}
          className="absolute pointer-events-none"
          style={{ left: `${p.x}%`, top: -30 }}
          initial={{ y: -40, opacity: 0, rotate: p.rotate }}
          animate={{
            y: "110vh",
            opacity: [0, 0.8, 0.8, 0.5, 0],
            rotate: p.rotate + 540,
            x: [0, p.drift * 0.3, p.drift, p.drift * 0.6],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <div
            style={{
              width: p.size,
              height: p.size * 1.3,
              borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%",
              background: `radial-gradient(ellipse at 30% 30%, ${p.color}, ${p.color}66)`,
              filter: "blur(0.5px)",
            }}
          />
        </motion.div>
      ))}

      {/* Glow Rings */}
      {[1, 2, 3, 4].map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full"
          style={{
            width: 100 + ring * 120,
            height: 100 + ring * 120,
            border: `1px solid rgba(251,113,133,${0.15 - ring * 0.02})`,
            boxShadow: `0 0 ${20 + ring * 10}px rgba(251,113,133,${0.08 - ring * 0.01})`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1.5,
            delay: ring * 0.2,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.5, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.2,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        >
          <Star
            size={s.size}
            className="text-yellow-200"
            fill="currentColor"
          />
        </motion.div>
      ))}

      {/* ── The Blooming Flower ── */}
      <div className="relative" style={{ width: 240, height: 240 }}>
        {petalLayers.map((petal, i) => (
          <IntroPetal key={i} {...petal} />
        ))}

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: 50,
            height: 50,
            background:
              "radial-gradient(circle, #fde68a 0%, #fbbf24 40%, #f59e0b 100%)",
            boxShadow:
              "0 0 30px rgba(251,191,36,0.5), 0 0 60px rgba(251,191,36,0.2)",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: [0, 1.2, 1] }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: [0, 1.3, 1], rotate: 0 }}
          transition={{
            duration: 0.8,
            delay: 1,
            ease: [0.34, 1.56, 0.64, 1],
          }}
        >
          <Heart size={26} className="text-rose-600 fill-rose-600" />
        </motion.div>

        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ width: 280, height: 280 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/50"
              style={{
                left: "50%",
                top: "50%",
                transform: `rotate(${i * 60}deg) translateY(-140px) translate(-50%, -50%)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.1 }}
            >
              <Flower2 size={22} strokeWidth={1} />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Text */}
      <motion.h1
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
        className="mt-10 text-4xl sm:text-5xl md:text-7xl text-rose-600 tracking-wide z-10"
        style={{ fontFamily: "'Playfair Display', serif" }}
      >
        Hai Love{" "}
        <motion.span
          className="inline-block"
          animate={{ scale: [1, 1.25, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, delay: 1.6 }}
        >
          ♡
        </motion.span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="mt-4 text-pink-400 z-10 text-center px-6"
        style={{ fontFamily: "'Caveat', cursive", fontSize: "1.5rem" }}
      >
        I made something special just for you...
      </motion.p>

      {/* Progress bar */}
      <motion.div className="absolute bottom-14 w-48 sm:w-56 h-1.5 rounded-full bg-pink-200/40 overflow-hidden z-10">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: "linear-gradient(90deg, #f472b6, #fb7185, #f43f5e)",
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3.5, ease: "linear" }}
        />
      </motion.div>

      <motion.p
        className="absolute bottom-8 text-pink-300/60 text-sm z-10"
        style={{ fontFamily: "'Caveat', cursive" }}
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        preparing your surprise...
      </motion.p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   BACKGROUND EFFECTS
   ═══════════════════════════════════════════════ */

function FilmGrain() {
  return (
    <div
      className="fixed inset-0 z-[100] pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
      }}
    />
  );
}

function LightRays() {
  return (
    <div className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: "50vw",
            height: "140vh",
            background: `linear-gradient(${110 + i * 45}deg, transparent, rgba(251,207,232,0.1), transparent)`,
            top: "-20%",
            left: `${5 + i * 30}%`,
            transformOrigin: "top center",
          }}
          animate={{
            x: [0, 80, -60, 0],
            opacity: [0.2, 0.6, 0.3, 0.2],
            rotate: [0, 4, -3, 0],
          }}
          transition={{
            duration: 14 + i * 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function CherryBlossoms() {
  const blossoms = useMemo(
    () =>
      Array.from({ length: 16 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 12 + Math.random() * 16,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 250,
        initialRotate: Math.random() * 360,
        color: ["#fbb6ce", "#f9a8d4", "#fbcfe8", "#fda4af"][
          Math.floor(Math.random() * 4)
        ],
      })),
    []
  );

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none overflow-hidden">
      {blossoms.map((b) => (
        <motion.div
          key={b.id}
          className="absolute"
          style={{ left: `${b.x}%`, top: -30 }}
          animate={{
            y: ["0vh", "108vh"],
            x: [0, b.drift / 3, b.drift, b.drift / 2],
            rotate: [b.initialRotate, b.initialRotate + 720],
            opacity: [0, 0.7, 0.7, 0],
          }}
          transition={{
            duration: b.duration,
            delay: b.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <svg width={b.size} height={b.size} viewBox="0 0 20 20" fill="none">
            <ellipse cx="10" cy="5" rx="3.5" ry="5" fill={b.color} opacity="0.7" />
            <ellipse cx="10" cy="5" rx="3.5" ry="5" fill={b.color} opacity="0.5" transform="rotate(72 10 10)" />
            <ellipse cx="10" cy="5" rx="3.5" ry="5" fill={b.color} opacity="0.6" transform="rotate(144 10 10)" />
            <ellipse cx="10" cy="5" rx="3.5" ry="5" fill={b.color} opacity="0.5" transform="rotate(216 10 10)" />
            <ellipse cx="10" cy="5" rx="3.5" ry="5" fill={b.color} opacity="0.6" transform="rotate(288 10 10)" />
            <circle cx="10" cy="10" r="2" fill="#fda4af" opacity="0.9" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SCRAPBOOK DECORATIONS
   ═══════════════════════════════════════════════ */

function CornerFlowers() {
  const positions: React.CSSProperties[] = [
    { top: "3%", left: "3%" },
    { top: "3%", right: "3%" },
    { bottom: "3%", left: "3%" },
    { bottom: "3%", right: "3%" },
  ];
  const sizes = [48, 42, 38, 46];

  return (
    <>
      {positions.map((pos, i) => (
        <motion.div
          key={i}
          className="fixed z-[3] pointer-events-none hidden sm:block"
          style={{ ...pos, color: `rgba(244,114,182,${0.2 + (i % 3) * 0.08})` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25 + i * 6, repeat: Infinity, ease: "linear" }}
        >
          <Flower2 size={sizes[i]} strokeWidth={1} />
        </motion.div>
      ))}
    </>
  );
}

/* Washi Tape Strips — hidden on mobile */
function WashiTapes() {
  return (
    <div className="hidden md:block">
      <div
        className="fixed z-[4] pointer-events-none"
        style={{
          top: "6%",
          left: "22%",
          width: 120,
          height: 22,
          background:
            "repeating-linear-gradient(90deg, rgba(251,191,36,0.15) 0px, rgba(251,191,36,0.15) 8px, rgba(251,191,36,0.08) 8px, rgba(251,191,36,0.08) 16px)",
          transform: "rotate(-12deg)",
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      />
      <div
        className="fixed z-[4] pointer-events-none"
        style={{
          bottom: "12%",
          right: "15%",
          width: 100,
          height: 20,
          background:
            "repeating-linear-gradient(90deg, rgba(244,114,182,0.15) 0px, rgba(244,114,182,0.15) 6px, rgba(244,114,182,0.1) 6px, rgba(244,114,182,0.1) 12px)",
          transform: "rotate(8deg)",
          borderRadius: 2,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      />
    </div>
  );
}

/* Scattered Doodle Hearts & Stars */
function ScatteredDoodles() {
  const items = useMemo(
    () => [
      { type: "heart", top: "12%", left: "38%", size: 16, delay: 0 },
      { type: "star", top: "18%", right: "18%", size: 14, delay: 1 },
      { type: "heart", top: "72%", left: "42%", size: 14, delay: 1.5 },
      { type: "star", top: "65%", left: "35%", size: 10, delay: 0.8 },
      { type: "heart", top: "80%", right: "25%", size: 16, delay: 0.3 },
      { type: "heart", top: "88%", left: "20%", size: 10, delay: 0.7 },
    ],
    []
  );

  return (
    <>
      {items.map((item, i) => {
        const posStyle: React.CSSProperties = {};
        if (item.top) posStyle.top = item.top;
        if (item.left) posStyle.left = item.left;
        if (item.right) posStyle.right = item.right;

        return (
          <motion.div
            key={i}
            className="fixed z-[3] pointer-events-none"
            style={posStyle}
            animate={{
              opacity: [0.15, 0.35, 0.15],
              scale: [1, 1.2, 1],
              y: [0, -4, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {item.type === "heart" ? (
              <Heart
                size={item.size}
                className="text-rose-300"
                fill="currentColor"
              />
            ) : (
              <Star
                size={item.size}
                className="text-amber-300"
                fill="currentColor"
              />
            )}
          </motion.div>
        );
      })}
    </>
  );
}

/* String Lights across top — hidden on small mobile */
function StringLights() {
  const bulbs = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        x: 5 + i * 7,
        delay: i * 0.3,
        color: ["#fde68a", "#fbcfe8", "#fda4af", "#fce7f3", "#fef3c7"][i % 5],
      })),
    []
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-[4] pointer-events-none hidden sm:block">
      <svg
        className="w-full"
        height="60"
        viewBox="0 0 1000 60"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M0,10 Q70,50 140,15 Q210,50 280,15 Q350,50 420,15 Q490,50 560,15 Q630,50 700,15 Q770,50 840,15 Q910,50 1000,10"
          stroke="rgba(190,18,60,0.12)"
          strokeWidth="1.5"
          fill="none"
        />
      </svg>
      {bulbs.map((b) => (
        <motion.div
          key={b.id}
          className="absolute rounded-full"
          style={{
            left: `${b.x}%`,
            top: `${18 + Math.sin(b.id * 0.9) * 14}px`,
            width: 8,
            height: 10,
            background: b.color,
            boxShadow: `0 0 8px ${b.color}, 0 0 16px ${b.color}66`,
          }}
          animate={{
            opacity: [0.4, 1, 0.4],
            boxShadow: [
              `0 0 4px ${b.color}44`,
              `0 0 12px ${b.color}, 0 0 24px ${b.color}88`,
              `0 0 4px ${b.color}44`,
            ],
          }}
          transition={{
            duration: 2,
            delay: b.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* Notebook Lines pattern */
function NotebookLines() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.06] hidden md:block">
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="w-full"
          style={{
            height: 1,
            background: "#be123c",
            marginTop: i === 0 ? 60 : 32,
          }}
        />
      ))}
      <div
        className="absolute top-0 bottom-0"
        style={{
          left: 50,
          width: 1,
          background: "rgba(239,68,68,0.15)",
        }}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════
   CORE COMPONENTS
   ═══════════════════════════════════════════════ */

function MadeWithLove() {
  return (
    <div
      className="fixed bottom-4 left-4 sm:bottom-5 sm:left-6 z-[50] flex items-center gap-2 text-pink-400/70"
      style={{ fontFamily: "'Caveat', cursive", fontSize: "1.1rem" }}
    >
      Made with
      <motion.span
        animate={{ scale: [1, 1.35, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-flex text-rose-400"
      >
        <Heart size={14} fill="currentColor" />
      </motion.span>
      love
    </div>
  );
}

function RotatingText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROMANTIC_MESSAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-16 sm:h-20 relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="text-rose-400/80 absolute leading-relaxed"
          style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(1.1rem, 3vw, 1.6rem)" }}
        >
          "{ROMANTIC_MESSAGES[index]}"
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   POLAROID GALLERY — Responsive Grid + Scattered Desktop
   ═══════════════════════════════════════════════ */

function PolaroidCard({
  photo,
  index,
}: {
  photo: (typeof POLAROID_PHOTOS)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="cursor-pointer"
      style={{
        zIndex: hovered ? 50 : 10 + index,
      }}
      initial={{
        opacity: 0,
        scale: 0.3,
        rotate: photo.rotate,
      }}
      animate={{
        opacity: 1,
        scale: hovered ? 1.1 : 1,
        rotate: hovered ? 0 : photo.rotate,
        y: hovered ? -15 : [0, -photo.floatY, 0],
      }}
      transition={
        hovered
          ? { type: "spring", stiffness: 280, damping: 18 }
          : {
              y: {
                duration: photo.floatDuration,
                repeat: Infinity,
                ease: "easeInOut",
              },
              opacity: { duration: 0.7, delay: 0.3 + index * 0.15 },
              scale: { duration: 0.7, delay: 0.3 + index * 0.15 },
            }
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 1.05 }}
    >
      <div
        className="bg-white p-1.5 sm:p-2.5 pb-8 sm:pb-12 rounded-sm transition-shadow duration-500"
        style={{
          boxShadow: hovered
            ? "0 30px 60px rgba(190,18,60,0.28), 0 15px 30px rgba(0,0,0,0.12)"
            : "0 6px 20px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        {/* Tape on top */}
        <div
          className="absolute -top-2 sm:-top-2.5 left-1/2 -translate-x-1/2 z-10"
          style={{
            width: 40,
            height: 14,
            background: "rgba(253,224,71,0.3)",
            transform: `translateX(-50%) rotate(${(index % 2 === 0 ? -3 : 3)}deg)`,
            borderRadius: 1,
          }}
        />
        <img
          src={photo.src}
          alt={photo.caption}
          className="w-full h-28 sm:h-36 md:h-48 object-cover rounded-[2px]"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=600&fit=crop";
          }}
        />
        <p
          className="text-center text-gray-500 mt-2 sm:mt-3 text-xs sm:text-base line-clamp-2"
          style={{ fontFamily: "'Caveat', cursive", fontSize: "clamp(0.75rem, 2vw, 1.1rem)" }}
        >
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   ENVELOPE BUTTON
   ═══════════════════════════════════════════════ */

function EnvelopeSparkles() {
  const sparkles = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 140,
        y: (Math.random() - 0.5) * 90,
        delay: Math.random() * 2.5,
        duration: 1.5 + Math.random() * 1.5,
        size: 10 + Math.random() * 12,
      })),
    []
  );

  return (
    <>
      {sparkles.map((s) => (
        <motion.div
          key={s.id}
          className="absolute text-yellow-300/60 pointer-events-none"
          style={{
            left: `calc(50% + ${s.x}px)`,
            top: `calc(50% + ${s.y}px)`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.4, 1.2, 0.4],
            y: [0, -20, 0],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
          }}
        >
          <Sparkles size={s.size} />
        </motion.div>
      ))}
    </>
  );
}

function EnvelopeButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-[60] flex flex-col items-center">
      {/* Glow */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 160,
          height: 90,
          background:
            "radial-gradient(ellipse, rgba(251,113,133,0.3) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      />

      <EnvelopeSparkles />

      {/* Envelope */}
      <motion.button
        onClick={onClick}
        className="relative cursor-pointer group"
        whileHover={{ scale: 1.12, y: -6 }}
        whileTap={{ scale: 0.93 }}
        style={{ width: 90, height: 64 }}
      >
        {/* Envelope Body */}
        <div
          className="absolute inset-0 rounded-lg border-2 border-pink-300/40"
          style={{
            background:
              "linear-gradient(180deg, #fff5f5 0%, #ffe4e6 50%, #fecdd3 100%)",
            boxShadow:
              "0 10px 40px rgba(244,63,94,0.18), inset 0 1px 0 rgba(255,255,255,0.7)",
          }}
        />

        {/* Inner triangle decoration */}
        <div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: "60%",
            clipPath: "polygon(0 100%, 50% 20%, 100% 100%)",
            background: "linear-gradient(180deg, #fce7f3 0%, #fecdd3 100%)",
            opacity: 0.5,
          }}
        />

        {/* Flap */}
        <div className="absolute top-0 left-0 right-0 overflow-hidden" style={{ height: "55%" }}>
          <div
            className="w-full h-full origin-top"
            style={{
              background: "linear-gradient(180deg, #fce7f3 0%, #fda4af 100%)",
              clipPath: "polygon(0 0, 50% 100%, 100% 0)",
              opacity: 0.85,
            }}
          />
        </div>

        {/* Paper peeking */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 rounded-t-sm"
          style={{
            width: 55,
            height: 18,
            top: -8,
            background: "linear-gradient(180deg, #fffbeb 0%, #fef3c7 100%)",
            borderTop: "1px solid #fde68a",
            borderLeft: "1px solid #fde68a",
            borderRight: "1px solid #fde68a",
          }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center justify-center h-full gap-[2px] pt-1.5">
            <div className="w-8 h-[1.5px] bg-pink-300/50 rounded" />
            <div className="w-6 h-[1.5px] bg-pink-300/40 rounded" />
          </div>
        </motion.div>

        {/* Wax Seal */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <motion.div
            className="w-7 h-7 rounded-full flex items-center justify-center"
            style={{
              background:
                "radial-gradient(circle at 35% 35%, #fb7185, #e11d48 60%, #9f1239 100%)",
              boxShadow:
                "0 3px 10px rgba(225,29,72,0.45), inset 0 1px 3px rgba(255,255,255,0.3)",
            }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <Heart size={12} className="text-white fill-white" />
          </motion.div>
        </div>
      </motion.button>

      {/* "Open Me" text */}
      <motion.p
        className="mt-3 text-rose-400/80"
        style={{ fontFamily: "'Caveat', cursive", fontSize: "1.2rem" }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Open Me ♡
      </motion.p>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SECRET LETTER MODAL
   ═══════════════════════════════════════════════ */

function FloatingHearts() {
  const hearts = useMemo(
    () =>
      Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        size: 12 + Math.random() * 20,
        delay: Math.random() * 4,
        duration: 4 + Math.random() * 5,
        opacity: 0.12 + Math.random() * 0.2,
      })),
    []
  );

  return (
    <>
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute pointer-events-none text-rose-300"
          style={{ left: `${h.x}%`, bottom: -30, opacity: h.opacity }}
          animate={{
            y: [0, -(typeof window !== "undefined" ? window.innerHeight : 800) - 60],
            x: [(Math.random() - 0.5) * 100],
            rotate: [0, (Math.random() - 0.5) * 120],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Heart size={h.size} fill="currentColor" />
        </motion.div>
      ))}
    </>
  );
}

function SecretLetterModal({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={onClose}
      />

      <FloatingHearts />

      {/* Letter Card */}
      <motion.div
        className="relative z-10 max-w-lg w-full max-h-[85vh] overflow-y-auto"
        initial={{ scale: 0.6, y: 80, opacity: 0, rotate: -5 }}
        animate={{ scale: 1, y: 0, opacity: 1, rotate: 0 }}
        exit={{ scale: 0.7, y: 50, opacity: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 20 }}
      >
        <div
          className="relative rounded-2xl p-6 sm:p-8 md:p-10 overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, #fffbeb 0%, #fef3c7 30%, #fff7ed 60%, #fffbeb 100%)",
            boxShadow:
              "0 30px 90px rgba(0,0,0,0.22), 0 10px 30px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
            border: "1px solid rgba(253,224,71,0.3)",
          }}
        >
          {/* Corner Ornaments */}
          {[
            { top: 10, left: 10, rotate: 0 },
            { top: 10, right: 10, rotate: 90 },
            { bottom: 10, left: 10, rotate: 270 },
            { bottom: 10, right: 10, rotate: 180 },
          ].map((pos, i) => (
            <motion.div
              key={i}
              className="absolute text-pink-300/30"
              style={{
                top: pos.top,
                bottom: pos.bottom,
                left: pos.left,
                right: pos.right,
              }}
              initial={{ rotate: pos.rotate }}
              animate={{ rotate: [pos.rotate, pos.rotate + 360] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            >
              <Flower2 size={28} strokeWidth={1} />
            </motion.div>
          ))}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-rose-100/80 hover:bg-rose-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X size={16} className="text-rose-500" />
          </button>

          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block mb-2 sm:mb-3"
            >
              <Heart size={26} className="text-rose-400 fill-rose-400 mx-auto" />
            </motion.div>
            <h2
              className="text-xl sm:text-2xl md:text-3xl text-rose-600"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              My Secret Letter
            </h2>
            <div className="mt-2 sm:mt-3 w-24 sm:w-28 h-[1px] bg-gradient-to-r from-transparent via-rose-300 to-transparent mx-auto" />
          </div>

          {/* Letter Content */}
          <div
            className="text-gray-600 leading-relaxed whitespace-pre-line text-center"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: "clamp(1rem, 3vw, 1.3rem)",
              lineHeight: "1.9",
            }}
          >
            {SECRET_LETTER}
          </div>

          <div className="mt-4 sm:mt-6 flex justify-center gap-3">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1], y: [0, -3, 0] }}
                transition={{ duration: 1, delay: i * 0.15, repeat: Infinity }}
              >
                <Heart size={12} className="text-rose-300 fill-rose-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════
   MUSIC BUTTON — Plays "Can't Help Falling in Love"
   ═══════════════════════════════════════════════ */

function MusicNoteParticles({ active }: { active: boolean }) {
  const notes = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: (Math.random() - 0.5) * 80,
        delay: i * 0.35,
        duration: 1.6 + Math.random(),
      })),
    []
  );

  if (!active) return null;

  return (
    <>
      {notes.map((n) => (
        <motion.div
          key={n.id}
          className="absolute pointer-events-none text-pink-400/70"
          style={{ bottom: "100%", left: "50%" }}
          animate={{
            y: [0, -70, -140],
            x: [0, n.x],
            opacity: [0, 1, 0],
            scale: [0.5, 1.1, 0.5],
            rotate: [0, n.x > 0 ? 20 : -20],
          }}
          transition={{
            duration: n.duration,
            delay: n.delay,
            repeat: Infinity,
          }}
        >
          <Music size={15} />
        </motion.div>
      ))}
    </>
  );
}

function MusicButton() {
  const [active, setActive] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Create audio element once using the global MUSIC_URL constant
    const audio = new Audio(MUSIC_URL);
    audio.loop = true;
    audio.volume = 0.5;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (active) {
      audio.pause();
    } else {
      audio.play().catch(() => {
        // Autoplay blocked, user must interact again
      });
    }
    setActive(!active);
  }, [active]);

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-5 sm:right-6 z-[60]">
      <div className="relative">
        <MusicNoteParticles active={active} />
        <motion.button
          onClick={toggleMusic}
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer"
          style={{
            background: active
              ? "linear-gradient(135deg, #fda4af, #fb7185)"
              : "linear-gradient(135deg, #fce7f3, #fbcfe8)",
            boxShadow: active
              ? "0 4px 25px rgba(251,113,133,0.45)"
              : "0 2px 12px rgba(0,0,0,0.08)",
          }}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.88 }}
          animate={
            active
              ? {
                  boxShadow: [
                    "0 4px 20px rgba(251,113,133,0.2)",
                    "0 4px 35px rgba(251,113,133,0.55)",
                    "0 4px 20px rgba(251,113,133,0.2)",
                  ],
                }
              : {}
          }
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          {active ? (
            <Volume2 size={18} className="text-white" />
          ) : (
            <VolumeX size={18} className="text-pink-400" />
          )}
        </motion.button>
        {/* Song title tooltip */}
        {active && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap hidden sm:block"
          >
            <div
              className="px-3 py-1.5 rounded-full text-xs text-rose-500"
              style={{
                background: "rgba(255,241,242,0.9)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(253,164,175,0.3)",
                fontFamily: "'Caveat', cursive",
                fontSize: "0.85rem",
              }}
            >
              ♪ Can&apos;t Help Falling in Love
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ██   MAIN APP — Fully Responsive
   ═══════════════════════════════════════════════════ */

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showLetter, setShowLetter] = useState(false);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <div
      className="relative w-screen h-screen overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 40%, #fff1f2 0%, #ffe4e6 30%, #fce7f3 55%, #fecdd3 80%, #fbcfe8 100%)",
      }}
    >
      {/* ── Intro ── */}
      <AnimatePresence>
        {showIntro && <IntroScreen onComplete={handleIntroComplete} />}
      </AnimatePresence>

      {/* ── Background Effects ── */}
      <FilmGrain />
      <LightRays />
      <CherryBlossoms />
      <CornerFlowers />
      <StringLights />
      <WashiTapes />
      <ScatteredDoodles />

      {/* ── Paper Texture Overlay ── */}
      <div
        className="fixed inset-0 z-[1] pointer-events-none"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'6\' height=\'6\' viewBox=\'0 0 6 6\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23be123c\' fill-opacity=\'0.015\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'1\' cy=\'1\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
        }}
      />

      {/* ── Top Washi Tape Strip ── */}
      <div
        className="absolute top-0 left-0 right-0 h-2 sm:h-3 z-[5]"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(253,164,175,0.25) 0px, rgba(253,164,175,0.25) 16px, rgba(251,207,232,0.15) 16px, rgba(251,207,232,0.15) 32px)",
        }}
      />

      {/* ══════════════════════════════════════════
          MAIN CONTENT — Responsive Layout
          ══════════════════════════════════════════ */}
      <motion.div
        className="relative z-10 h-full overflow-y-auto sm:overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      >
        {/* ─── MOBILE LAYOUT (vertical scroll) ─── */}
        <div className="flex flex-col sm:hidden min-h-screen pb-32 pt-8 px-5">
          {/* Mobile: Title Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 30 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6"
          >
            <div
              className="px-3 py-1 rounded-sm inline-block mb-3"
              style={{
                background: "rgba(253,164,175,0.15)",
                border: "1px dashed rgba(253,164,175,0.4)",
              }}
            >
              <p
                className="text-pink-400/80 tracking-[0.2em] uppercase"
                style={{ fontFamily: "'Caveat', cursive", fontSize: "0.85rem" }}
              >
                ✦ A Love Scrapbook ✦
              </p>
            </div>

            <h1
              className="text-5xl text-rose-700 leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our
            </h1>
            <h1
              className="text-5xl italic text-rose-500 mb-4 leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Memories
            </h1>

            {/* Decorative line */}
            <div className="flex items-center gap-3 mb-4 max-w-[200px]">
              <div className="h-[1px] flex-1 bg-gradient-to-r from-rose-300/70 to-transparent" />
              <motion.div
                animate={{ scale: [1, 1.25, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart size={14} className="text-rose-400 fill-rose-400" />
              </motion.div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-rose-300/70 to-transparent" />
            </div>

            <RotatingText />
          </motion.div>

          {/* Mobile: Photo Grid */}
          <motion.div
            className="grid grid-cols-2 gap-3 mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 40 : 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {POLAROID_PHOTOS.map((photo, i) => (
              <div key={i} className={i === POLAROID_PHOTOS.length - 1 && POLAROID_PHOTOS.length % 2 !== 0 ? "col-span-2 max-w-[60%] mx-auto" : ""}>
                <PolaroidCard photo={photo} index={i} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* ─── DESKTOP LAYOUT (side by side) ─── */}
        {/* Left Panel — Text */}
        <div className="hidden sm:flex absolute left-0 top-0 bottom-0 w-[44%] lg:w-[42%] items-center z-20">
          <div className="pl-8 md:pl-14 lg:pl-20 max-w-xl relative">
            <NotebookLines />

            {/* Scrapbook label */}
            <motion.div
              initial={{ opacity: 0, x: -50, rotate: -3 }}
              animate={{
                opacity: showIntro ? 0 : 1,
                x: showIntro ? -50 : 0,
                rotate: -3,
              }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-4 inline-block"
            >
              <div
                className="px-4 py-1.5 rounded-sm inline-block"
                style={{
                  background: "rgba(253,164,175,0.15)",
                  border: "1px dashed rgba(253,164,175,0.4)",
                }}
              >
                <p
                  className="text-pink-400/80 tracking-[0.25em] uppercase text-xs"
                  style={{ fontFamily: "'Caveat', cursive", fontSize: "0.95rem" }}
                >
                  ✦ A Love Scrapbook ✦
                </p>
              </div>
            </motion.div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 50 : 0 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-rose-700 mb-2 leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Our
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 50 : 0 }}
              transition={{ duration: 1, delay: 0.75 }}
              className="text-5xl md:text-6xl lg:text-7xl xl:text-8xl italic text-rose-500 mb-6 leading-[1.1]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Memories
            </motion.h1>

            {/* Decorative line */}
            <motion.div
              className="flex items-center gap-3 mb-6 max-w-xs"
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{
                opacity: showIntro ? 0 : 1,
                scaleX: showIntro ? 0 : 1,
              }}
              transition={{ duration: 0.7, delay: 0.9 }}
            >
              <div className="h-[1px] flex-1 bg-gradient-to-r from-rose-300/70 to-transparent" />
              <motion.div
                animate={{ scale: [1, 1.25, 1], rotate: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart size={16} className="text-rose-400 fill-rose-400" />
              </motion.div>
              <div className="h-[1px] flex-1 bg-gradient-to-l from-rose-300/70 to-transparent" />
            </motion.div>

            {/* Rotating romantic text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <RotatingText />
            </motion.div>

            {/* Tiny hearts row */}
            <motion.div
              className="mt-6 flex items-center gap-5"
              initial={{ opacity: 0 }}
              animate={{ opacity: showIntro ? 0 : 1 }}
              transition={{ delay: 1.4 }}
            >
              <div className="flex gap-1.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{ opacity: [0.25, 0.7, 0.25], y: [0, -3, 0] }}
                    transition={{
                      duration: 2,
                      delay: i * 0.25,
                      repeat: Infinity,
                    }}
                  >
                    <Heart
                      size={11}
                      className="text-pink-300 fill-pink-300"
                    />
                  </motion.div>
                ))}
              </div>
              <span
                className="text-pink-300/60"
                style={{ fontFamily: "'Caveat', cursive", fontSize: "1rem" }}
              >
                every page tells our story
              </span>
            </motion.div>

            {/* Doodle arrow pointing right */}
            <motion.div
              className="mt-8 text-pink-200/40 hidden lg:block"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: showIntro ? 0 : 1, x: showIntro ? -20 : 0 }}
              transition={{ delay: 1.8, duration: 0.6 }}
            >
              <svg width="120" height="30" viewBox="0 0 120 30" fill="none">
                <path
                  d="M5 15 Q30 5 60 15 Q90 25 110 15"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="4 4"
                />
                <path
                  d="M105 10 L112 15 L105 20"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </motion.div>
          </div>
        </div>

        {/* Right Panel — Polaroid Gallery (Desktop) */}
        <motion.div
          className="hidden sm:block absolute right-0 top-0 bottom-0 w-[56%] lg:w-[58%] z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: showIntro ? 0 : 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          {/* Subtle background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at 60% 50%, rgba(253,164,175,0.08) 0%, transparent 70%)",
            }}
          />

          {/* Scattered polaroids with absolute positioning for desktop */}
          {POLAROID_PHOTOS.map((photo, i) => {
            // Pre-computed scattered positions for desktop (within the right panel)
            const desktopPositions = [
              { top: "6%", left: "8%", width: 185 },
              { top: "5%", left: "52%", width: 175 },
              { top: "36%", left: "28%", width: 190 },
              { top: "38%", left: "65%", width: 170 },
              { top: "66%", left: "12%", width: 180 },
            ];
            const pos = desktopPositions[i] || desktopPositions[0];

            return (
              <div
                key={i}
                className="absolute"
                style={{ top: pos.top, left: pos.left, width: pos.width }}
              >
                <PolaroidCard photo={photo} index={i} />
              </div>
            );
          })}
        </motion.div>

        {/* Center divider — visible only on desktop */}
        <div
          className="hidden sm:block absolute left-[44%] lg:left-[42%] top-[8%] bottom-[8%] w-[1px] z-[5] pointer-events-none"
          style={{
            background:
              "repeating-linear-gradient(180deg, rgba(253,164,175,0.2) 0px, rgba(253,164,175,0.2) 6px, transparent 6px, transparent 12px)",
          }}
        />
      </motion.div>

      {/* ── Envelope ── */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.9 }}
        >
          <EnvelopeButton onClick={() => setShowLetter(true)} />
        </motion.div>
      )}

      {/* ── Secret Letter Modal ── */}
      <AnimatePresence>
        {showLetter && (
          <SecretLetterModal onClose={() => setShowLetter(false)} />
        )}
      </AnimatePresence>

      {/* ── Music Button ── */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, type: "spring" }}
        >
          <MusicButton />
        </motion.div>
      )}

      {/* ── Made with Love ── */}
      {!showIntro && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
          <MadeWithLove />
        </motion.div>
      )}

      {/* ── Bottom washi tape ── */}
      <div
        className="absolute bottom-0 left-0 right-0 h-2 sm:h-3 z-[5]"
        style={{
          background:
            "repeating-linear-gradient(90deg, rgba(251,207,232,0.2) 0px, rgba(251,207,232,0.2) 16px, rgba(253,164,175,0.12) 16px, rgba(253,164,175,0.12) 32px)",
        }}
      />
    </div>
  );
}
