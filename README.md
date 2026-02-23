<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Three.js-r183-black?style=for-the-badge&logo=three.js" />
  <img src="https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss" />
  <img src="https://img.shields.io/badge/AI-Gemini-8E75B2?style=for-the-badge&logo=google" />
</p>

<h1 align="center">🌍 SDE Abroad — Masterclass Landing Page</h1>

<p align="center">
  <strong>A cinematic, WebGL-powered landing experience for the SDE Abroad Masterclass by Tanmay Kacker</strong><br/>
  <em>Helping engineers crack high-paying tech roles in the UK, EU & US — through a free live event.</em>
</p>

<p align="center">
  Built at the intersection of <strong>real-time 3D graphics</strong>, <strong>scroll-driven storytelling</strong>, and <strong>conversational AI</strong>.
</p>

---

## 🎬 The Experience

This isn't a landing page — it's a **visual narrative**. Every scroll pixel is choreographed.

| Section | Visual Layer | What Happens |
|---|---|---|
| **Hero** | `RealisticGlobe` + `ParticleSystem` + `ConnectionLines` | GLSL-shaded Earth with day/night cycle, 800 orbital particles, and animated Bézier arcs — all parallax-linked to scroll position |
| **About** | `KnowledgeCore` + `VoxelWorkspace` | Cyan/Blue gyroscope with glass-transmission rings orbiting a pulsing octahedron **+** pixel-art diorama with voxel laptop, orbiting plane, spinning coin & visa document |
| **Speaker** | `SpeakerOrb` (Spline-enhanced) | Holographic aurora sphere with GLSL shader, 3 orbital rings, electron particles, wireframe icosahedron shell & TK monogram — with Spline scene integration |
| **Benefits** | `BenefitsScenes` + `HolographicShape` + `MotionGraphics` | Three themed 3D vignettes — **NetworkScene** (orbiting icosahedron nodes), **PayScene** (floating gold coins), **WLBScene** (zen halo + coffee cup) — with holographic glass/wireframe variants and Framer Motion SVG fallbacks |
| **Agenda** | Timeline with animated progress | GSAP-driven timeline with scroll-linked progress bar |
| **Testimonials** | Card carousel | Social proof from past masterclass attendees |
| **FAQ** | Numbered accordion | 7-item accordion with green accent borders and GSAP entrance |
| **CTA** | `PremiumBadge` + animated grid | Iridescent glass octahedron badge with orbital rings, grid background, urgency countdown, trust-signal chips |

> Every 3D scene uses `MeshTransmissionMaterial` for glass refraction, chromatic aberration, and iridescence — achieving a look closer to offline renders than typical WebGL.

---

## 🧊 3D Scene Gallery

The project ships **17 Three.js components** — a full creative toolkit:

### Core Scenes
| Component | Description |
|---|---|
| `RealisticGlobe` | Custom GLSL Earth — day/night textures, cloud layer, specular oceans, green atmosphere, scroll-driven camera |
| `SpeakerOrb` | Aurora holographic sphere with animated shader, 3 orbital rings, 6 electron particles, wireframe shell |
| `KnowledgeCore` | Abstract gyroscope — 3 counter-rotating rings (glass transmission + metallic + wireframe) around a pulsing cyan octahedron |
| `VoxelWorkspace` | Pixel-art diorama — voxel laptop with glowing screen, orbiting paper plane, spinning coin stack, visa document |
| `PremiumBadge` | Iridescent glass octahedron with `distortion` + `iridescence` transmission, dual orbital torus rings |

### Benefits Scenes (3D × 3)
| Component | Theme | Key Elements |
|---|---|---|
| `NetworkScene` | Global Network | SDEBot mascot + 6 orbiting icosahedron nodes with connecting beams |
| `PayScene` | Higher Pay | SDEBot + 5 floating gold coin/octahedron pairs in orbital formation |
| `WLBScene` | Work-Life Balance | SDEBot + zen halo torus + floating coffee cup with steam particle |

### Supporting Components
| Component | Role |
|---|---|
| `HolographicShape` | Polymorphic glass forms — Icosahedron/Dodecahedron nexus, TorusKnot infinity, Sphere gyroscope |
| `CommunityScene` | Full robot character (glass head, antenna, hover disk) with orbiting laptop, paper plane & coin |
| `MotionGraphics` | Framer Motion SVG fallbacks — `DigitalConstellation`, `GrowthBeam`, `ZenBloom` |
| `FloatingCharacter` | Animated character mesh |
| `InteractiveLaptop` | 3D laptop with glowing screen |
| `PixelatedGlobe` | Low-poly alternative globe |
| `PremiumGlobe` | Enhanced globe variant |
| `ConnectionLines` | Rotating Bézier arcs in brand palette around the hero globe |
| `ParticleSystem` | 800 lime-green orbital particles around the hero globe |
| `Scene` | Shared R3F `<Canvas>` wrapper with environment, lighting & Suspense |

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────┐
│                   Next.js 16 App Router          │
│              (Turbopack · React 19 · SSR)        │
├─────────────┬────────────────────┬───────────────┤
│   Sections  │    3D Engine       │    AI Layer   │
│             │                    │               │
│ HeroSection │ React Three Fiber  │ Vercel AI SDK │
│ AboutSection│ Three.js r183      │ Google Gemini │
│ Speaker...  │ @react-three/drei  │ Streaming Chat│
│ Benefits... │ Spline Runtime     │ RAG Knowledge │
│ Agenda...   │ Custom GLSL        │ Base Context  │
│ FAQ / CTA   │ MeshTransmission   │               │
├─────────────┴────────────────────┴───────────────┤
│   Animation Pipeline                             │
│   GSAP ScrollTrigger · Framer Motion · Lenis     │
├──────────────────────────────────────────────────┤
│   Design System                                  │
│   Tailwind v4 @theme · CSS Keyframes · Custom    │
│   Scrollbar · Glassmorphism · Montserrat/Inter   │
└──────────────────────────────────────────────────┘
```

---

## 🛠 Tech Stack

| Layer | Technology | Why |
|---|---|---|
| **Framework** | Next.js 16 (App Router, Turbopack) | Streaming SSR, file-based routing, React Server Components |
| **UI** | React 19 + TypeScript | Concurrent features, type safety |
| **Styling** | Tailwind CSS v4 + Vanilla CSS | `@theme` design tokens, custom keyframes, scrollbar theming |
| **3D Engine** | React Three Fiber + Three.js r183 | Declarative WebGL, GLSL shaders, `MeshTransmissionMaterial` |
| **3D Helpers** | `@react-three/drei` | Float, Text, Line, Environment, transmission materials |
| **3D Design** | `@splinetool/react-spline` | Spline scene embedding for the Speaker section |
| **Animation** | GSAP + ScrollTrigger | Scroll-driven entrance/exit choreography |
| **Motion** | Framer Motion | SVG path animations, layout transitions, benefit illustrations |
| **Smooth Scroll** | `@studio-freight/lenis` | Inertia-based momentum scrolling |
| **AI Chat** | Vercel AI SDK + Google Gemini | Streaming responses, context-aware chatbot with RAG knowledge base |
| **Icons** | Lucide React | Consistent icon system |
| **Utilities** | `clsx` + `tailwind-merge` | Conditional class merging via `cn()` helper |

---

## 🗂 Project Structure

```
sde-landing-page/
├── public/
│   ├── textures/              # Earth texture maps (day, night, normal, specular, clouds)
│   ├── animations/            # Lottie animation files
│   ├── images/                # Static image assets
│   ├── models/                # 3D model files
│   └── benefit-*.png          # Benefits section imagery
├── src/
│   ├── app/
│   │   ├── api/               # API routes (Gemini chat endpoint)
│   │   ├── globals.css        # @theme design tokens, keyframes, scrollbar, Lenis
│   │   ├── layout.tsx         # Root layout — Montserrat / Inter / Space Grotesk fonts
│   │   └── page.tsx           # Main page — section composition + Lenis init
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx     # Sticky glassmorphism navbar (transparent → frosted on scroll)
│   │   │   └── Footer.tsx     # Site footer
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx        # 3D globe + stagger entrance + scroll-out parallax
│   │   │   ├── AboutSection.tsx       # KnowledgeCore + VoxelWorkspace bento grid
│   │   │   ├── SpeakerSection.tsx     # SpeakerOrb + Spline scene + speaker bio
│   │   │   ├── BenefitsSection.tsx    # 3-card benefit showcase with 3D/motion scenes
│   │   │   ├── AgendaSection.tsx      # Timeline with animated progress line
│   │   │   ├── TestimonialsSection.tsx# Social proof card carousel
│   │   │   ├── FAQSection.tsx         # 7-item accordion with numbered tags
│   │   │   └── CTASection.tsx         # PremiumBadge + grid bg + urgency + trust signals
│   │   ├── three/                     # ⬇ 17 Three.js components (see gallery above)
│   │   │   ├── Scene.tsx              # Shared R3F Canvas wrapper
│   │   │   ├── RealisticGlobe.tsx     # GLSL Earth with scroll animation
│   │   │   ├── SpeakerOrb.tsx         # Holographic aurora orb
│   │   │   ├── KnowledgeCore.tsx      # Cyan/Blue gyroscope
│   │   │   ├── VoxelWorkspace.tsx     # Pixel-art diorama
│   │   │   ├── PremiumBadge.tsx       # Iridescent glass badge
│   │   │   ├── BenefitsScenes.tsx     # Network / Pay / WLB scenes
│   │   │   ├── HolographicShape.tsx   # Polymorphic glass forms
│   │   │   ├── CommunityScene.tsx     # Robot character scene
│   │   │   ├── MotionGraphics.tsx     # Framer Motion SVG illustrations
│   │   │   ├── ConnectionLines.tsx    # Rotating Bézier arcs
│   │   │   ├── ParticleSystem.tsx     # Orbital particle cloud
│   │   │   ├── FloatingCharacter.tsx  # Animated character
│   │   │   ├── InteractiveLaptop.tsx  # 3D laptop
│   │   │   ├── PixelatedGlobe.tsx     # Low-poly globe variant
│   │   │   ├── PremiumGlobe.tsx       # Enhanced globe variant
│   │   │   └── ThreeIcon.tsx          # 3D icon component
│   │   ├── ui/
│   │   │   ├── ChatWidget.tsx         # Gemini-powered floating chat (server component)
│   │   │   └── ClientChatWidget.tsx   # Client-side chat wrapper
│   │   └── forms/                     # Form components (reserved)
│   ├── lib/
│   │   ├── knowledge.ts              # RAG knowledge base for chatbot context
│   │   └── utils.ts                   # cn() — clsx + tailwind-merge helper
│   ├── hooks/                         # Custom React hooks
│   ├── config/                        # App configuration
│   ├── styles/                        # Additional style modules
│   └── types/                         # TypeScript type definitions
└── .env.local                         # API keys (never committed)
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**
- npm / yarn / pnpm

### 1 · Clone & Install

```bash
git clone <your-repo-url>
cd sde-landing-page
npm install
```

### 2 · Environment Variables

Create `.env.local` in the project root:

```env
GEMINI_API_KEY=your_google_gemini_api_key_here
```

> Get your key → [aistudio.google.com](https://aistudio.google.com/app/apikey)

### 3 · Run Dev Server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** — the app runs on Turbopack for instant HMR.

### 4 · Production Build

```bash
npm run build && npm start
```

---

## 🌍 Earth Textures

The globe requires texture maps in `public/textures/`. Source from [NASA Visible Earth](https://visibleearth.nasa.gov/):

| File | Purpose |
|---|---|
| `earth_daymap.jpg` | Daytime surface |
| `earth_normal_map.jpg` | Surface normals for lighting |
| `earth_specular_map.jpg` | Ocean specular highlights |
| `earth_clouds.png` | Cloud layer (transparent) |
| `earth_lights_2048.png` | City lights (night side) |

> ⚠️ **Not included in repo** due to file size — place in `public/textures/` before running.

---

## 🎨 Design System

### Color Palette

```
PRIMARY                    ACCENT                     SECONDARY
━━━━━━━━━━━━━━━━━━━       ━━━━━━━━━━━━━━━━━━━       ━━━━━━━━━━━━━━━━━━━
█ #050505  Dark BG         █ #8BC34A  Lime            █ #FF9800  Orange
█ #0A0F0A  Forest          █ #9CCC65  Bright          █ #FF7043  Coral
█ #1F2918  Olive            █ #C5E1A5  Neon            █ #FFC107  Amber
                                                      █ #00E5FF  Cyan  ←new
                                                      █ #2979FF  Blue  ←new
```

### Typography
| Role | Font |
|---|---|
| Headings | **Montserrat** |
| Body | **Inter** |
| Accents / Code | **Space Grotesk** |

### Signature Techniques
- **Glassmorphism** — backdrop-blur + subtle borders on navbar, cards, chat
- **MeshTransmissionMaterial** — real-time glass refraction on 3D objects
- **Chromatic Aberration** — lens distortion on glass materials for premium feel
- **Custom Scrollbar** — forest-green themed, matching the dark palette

---

## 📦 Scripts

```bash
npm run dev      # Turbopack dev server
npm run build    # Production build
npm start        # Serve production build
npm run lint     # ESLint check
```

---

## 📄 License

This project is private and proprietary.
All rights reserved © 2026 **SDE Abroad / Utkarsh Priye**.
