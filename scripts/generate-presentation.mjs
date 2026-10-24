import pptxgen from 'pptxgenjs';
import fs from 'fs';
import path from 'path';

async function generatePresentation() {
  const pptx = new pptxgen();

  // Modern 16:9 widescreen layout (13.333 x 7.5 inches)
  pptx.layout = 'LAYOUT_WIDE';
  pptx.author = 'NammaTrip AI Team';
  pptx.company = 'Kannada Digital Innovation Hackathon 2026';
  pptx.subject = 'Problem Statement 06 — AI Travel Planner for Karnataka';
  pptx.title = 'NammaTrip AI — Intelligent Karnataka Travel Planner';

  // Palette definitions
  const C_FOREST_DARK = '0F2A1F';
  const C_FOREST_MED = '1B4332';
  const C_FOREST_ACCENT = '2D6A4F';
  const C_IVORY_BG = 'FAF7F2';
  const C_TERRACOTTA = 'C85A32';
  const C_TERRACOTTA_LIGHT = 'FAECE6';
  const C_STONE_DARK = '1F2623';
  const C_STONE_MUTED = '55655E';
  const C_CARD_BG = 'FFFFFF';
  const C_BORDER = 'E3DED6';
  const C_LIGHT_GREEN = 'E9F3EE';

  // Helper for consistent slide headers on slides 2 to 8
  function addSlideHeader(slide, category, title, subtitle) {
    // Category Eyebrow
    slide.addText(category.toUpperCase(), {
      x: 0.8,
      y: 0.52,
      w: 11.73,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    // Main Slide Title
    slide.addText(title, {
      x: 0.8,
      y: 0.78,
      w: 11.73,
      h: 0.55,
      fontSize: 23,
      fontFace: 'Georgia',
      bold: true,
      color: C_FOREST_DARK,
    });

    // Subtitle / context description
    if (subtitle) {
      slide.addText(subtitle, {
        x: 0.8,
        y: 1.34,
        w: 11.73,
        h: 0.32,
        fontSize: 11,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
      });
    }

    // Subtle divider line
    slide.addShape(pptx.ShapeType.line, {
      x: 0.8,
      y: 1.72,
      w: 11.73,
      h: 0,
      line: { color: C_BORDER, width: 1 },
    });
  }

  // Helper for consistent footer on slides 2 to 8
  function addSlideFooter(slide, slideNum, totalSlides = 8, isDark = false) {
    slide.addText(
      'NammaTrip AI • Problem Statement 06 • Kannada Digital Innovation Hackathon 2026',
      {
        x: 0.8,
        y: 6.95,
        w: 8.5,
        h: 0.3,
        fontSize: 9,
        fontFace: 'Arial',
        color: isDark ? '8A9A92' : '88958E',
      }
    );

    slide.addText(`Slide ${slideNum} of ${totalSlides}`, {
      x: 10.5,
      y: 6.95,
      w: 2.0,
      h: 0.3,
      fontSize: 9,
      fontFace: 'Arial',
      align: 'right',
      color: isDark ? '8A9A92' : '88958E',
      bold: true,
    });
  }

  // ==========================================
  // SLIDE 1: Title Slide (Dark Forest Green)
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_FOREST_DARK };

    // Left Column: Brand & Presentation Details (x: 0.8 to 8.2)
    slide.addText('KANNADA DIGITAL INNOVATION HACKATHON 2026', {
      x: 0.8,
      y: 0.8,
      w: 8.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    slide.addText('Problem Statement 06 — Travel & Tourism', {
      x: 0.8,
      y: 1.15,
      w: 8.0,
      h: 0.35,
      fontSize: 13,
      fontFace: 'Arial',
      color: 'A2B3AB',
    });

    // Primary Brand Wordmark
    slide.addText('NammaTrip AI', {
      x: 0.8,
      y: 1.65,
      w: 8.0,
      h: 1.1,
      fontSize: 48,
      fontFace: 'Georgia',
      bold: true,
      color: 'FFFFFF',
    });

    // Kannada Script Accent
    slide.addText('ನಮ್ಮ ಟ್ರಿಪ್ • AI Travel Planner for Karnataka', {
      x: 0.8,
      y: 2.75,
      w: 8.0,
      h: 0.45,
      fontSize: 15,
      fontFace: 'Arial',
      bold: true,
      color: 'D97736',
    });

    slide.addText('Your Intelligent Karnataka Travel Planner', {
      x: 0.8,
      y: 3.25,
      w: 8.0,
      h: 0.5,
      fontSize: 20,
      fontFace: 'Arial',
      color: 'E9F3EE',
    });

    slide.addText(
      'Personalized itineraries, day-by-day schedules, and transparent INR cost breakdowns tailored to your time, budget, and travel interests.',
      {
        x: 0.8,
        y: 3.85,
        w: 7.6,
        h: 0.9,
        fontSize: 12.5,
        fontFace: 'Arial',
        color: 'A2B3AB',
        lineSpacingMultiple: 1.25,
      }
    );

    // Host & Organizer Card at Bottom
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 5.2,
      w: 7.6,
      h: 1.5,
      fill: { color: C_FOREST_MED },
      line: { color: C_FOREST_ACCENT, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText('ORGANIZED BY', {
      x: 1.1,
      y: 5.35,
      w: 7.0,
      h: 0.25,
      fontSize: 9.5,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 1.5,
    });

    slide.addText('HackerRank Campus Crew', {
      x: 1.1,
      y: 5.62,
      w: 7.0,
      h: 0.4,
      fontSize: 15,
      fontFace: 'Arial',
      bold: true,
      color: 'FFFFFF',
    });

    slide.addText(
      'The National Institute of Engineering (NIE), Mysuru • October 2026',
      {
        x: 1.1,
        y: 6.05,
        w: 7.0,
        h: 0.4,
        fontSize: 11.5,
        fontFace: 'Arial',
        color: 'E9F3EE',
      }
    );

    // Right Column: Architectural Highlights Card (x: 8.8 to 12.5)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 8.8,
      y: 0.8,
      w: 3.73,
      h: 5.9,
      fill: { color: '143828' },
      line: { color: C_FOREST_ACCENT, width: 1 },
      rectRadius: 0.12,
    });

    slide.addText('CORE CAPABILITIES', {
      x: 9.1,
      y: 1.05,
      w: 3.13,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 1.5,
    });

    slide.addText('Engineered for Real Karnataka Travel', {
      x: 9.1,
      y: 1.35,
      w: 3.13,
      h: 0.6,
      fontSize: 14,
      fontFace: 'Arial',
      bold: true,
      color: 'FFFFFF',
    });

    const highlights = [
      {
        title: '15 Curated Destinations',
        desc: 'Mysuru, Hampi, Coorg, Gokarna, Badami, Udupi & more with verified coordinates.',
      },
      {
        title: 'Dual-Engine Intelligence',
        desc: 'Google Gemini 2.5 Flash + Deterministic offline fallback planner for 100% judging viability.',
      },
      {
        title: 'Programmatic INR Budget',
        desc: 'Double-occupancy hotel rooms, transport, meals, and 6% buffer mathematically audited.',
      },
      {
        title: 'Interactive OpenStreetMap',
        desc: 'Leaflet geospatial route mapping with verified coordinates and external map links.',
      },
      {
        title: 'Zero-Login Local Persistence',
        desc: 'Browser localStorage saving, clipboard summary export, and Print-to-PDF formatting.',
      },
    ];

    highlights.forEach((h, idx) => {
      const yBox = 2.05 + idx * 0.9;
      slide.addText(`✓  ${h.title}`, {
        x: 9.1,
        y: yBox,
        w: 3.13,
        h: 0.28,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: 'E9F3EE',
      });
      slide.addText(h.desc, {
        x: 9.35,
        y: yBox + 0.26,
        w: 2.88,
        h: 0.55,
        fontSize: 9.5,
        fontFace: 'Arial',
        color: 'A2B3AB',
        lineSpacingMultiple: 1.15,
      });
    });
  }

  // ==========================================
  // SLIDE 2: Problem Statement & Target Users
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY_BG };
    addSlideHeader(
      slide,
      'Problem Statement 06',
      'The Karnataka Travel Planning Challenge',
      'Why personalized travel planning across Karnataka requires domain-specific intelligence.'
    );

    // Objective Banner (x: 0.8, y: 1.95, w: 11.73, h: 1.40)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 1.95,
      w: 11.73,
      h: 1.4,
      fill: { color: C_CARD_BG },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.08,
    });

    slide.addShape(pptx.ShapeType.rect, {
      x: 0.8,
      y: 1.95,
      w: 0.15,
      h: 1.4,
      fill: { color: C_FOREST_MED },
      line: { color: C_FOREST_MED },
    });

    slide.addText('OFFICIAL PROBLEM STATEMENT REQUIREMENT', {
      x: 1.15,
      y: 2.1,
      w: 11.2,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: C_FOREST_MED,
      charSpacing: 1.5,
    });

    slide.addText(
      '"Develop an AI-powered travel planner that creates personalized Karnataka itineraries based on a traveller\'s interests, available time, budget, and preferred type of experience."',
      {
        x: 1.15,
        y: 2.38,
        w: 11.2,
        h: 0.55,
        fontSize: 13,
        fontFace: 'Georgia',
        color: C_STONE_DARK,
        italic: true,
      }
    );

    slide.addText(
      'Core Mandate: Discover suitable Karnataka destinations, plan by duration & budget in INR, generate practical day-wise schedules, and provide transparent expense breakdowns.',
      {
        x: 1.15,
        y: 2.95,
        w: 11.2,
        h: 0.3,
        fontSize: 10.5,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
      }
    );

    // 3 Target Persona Cards (x: 0.8 + idx * 4.0, y: 3.55, w: 3.73, h: 3.10)
    const personas = [
      {
        title: 'Students & Budget Travellers',
        subtitle: 'Strict Cost Ceilings & Public Transit',
        badgeColor: C_LIGHT_GREEN,
        textColor: C_FOREST_MED,
        points: [
          'Require guaranteed budget ceilings in INR with zero surprise expenses.',
          'Rely on economical KSRTC Rajahamsa/Sarige buses and Indian Railways.',
          'Prefer clean guest lodges, temple annadaana, and local darshini dining.',
          'Value offline-ready day itineraries for connectivity-sparse regions.',
        ],
      },
      {
        title: 'Families & Holiday Groups',
        subtitle: 'Balanced Pacing & Realistic Lodging',
        badgeColor: 'FEF9EE',
        textColor: '92400E',
        points: [
          'Require balanced pacing without exhaustion on winding Western Ghats ghat roads.',
          'Need realistic double-occupancy room formulas (2 people per room).',
          'Seek wholesome experiences: Mysore Palace, Lalbagh, Jog Falls, wildlife safaris.',
          'Need group-wide expense clarity before departure.',
        ],
      },
      {
        title: 'First-Time Visitors & Explorers',
        subtitle: 'Authentic Heritage & Cultural Guidance',
        badgeColor: C_TERRACOTTA_LIGHT,
        textColor: C_TERRACOTTA,
        points: [
          'Want seamless discovery across royal south, coast, and rock-cut north Karnataka.',
          'Need verified temple dress codes, camera permit rules, and seasonal timing advice.',
          'Seek authentic regional gastronomy (Mysore Pak, Neer Dosa, Jolada Rotti).',
          'Eliminate 10+ hours of confusing, contradictory blog research.',
        ],
      },
    ];

    personas.forEach((p, idx) => {
      const xPos = 0.8 + idx * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos,
        y: 3.55,
        w: 3.73,
        h: 3.1,
        fill: { color: C_CARD_BG },
        line: { color: C_BORDER, width: 1 },
        rectRadius: 0.08,
      });

      slide.addText(p.title, {
        x: xPos + 0.25,
        y: 3.75,
        w: 3.23,
        h: 0.35,
        fontSize: 13,
        fontFace: 'Arial',
        bold: true,
        color: C_FOREST_DARK,
      });

      slide.addText(p.subtitle, {
        x: xPos + 0.25,
        y: 4.1,
        w: 3.23,
        h: 0.25,
        fontSize: 10,
        fontFace: 'Arial',
        bold: true,
        color: p.textColor,
      });

      p.points.forEach((pt, ptIdx) => {
        const yPt = 4.45 + ptIdx * 0.52;
        slide.addText('•', {
          x: xPos + 0.25,
          y: yPt,
          w: 0.15,
          h: 0.45,
          fontSize: 11,
          fontFace: 'Arial',
          color: C_FOREST_ACCENT,
          bold: true,
        });
        slide.addText(pt, {
          x: xPos + 0.45,
          y: yPt,
          w: 3.03,
          h: 0.45,
          fontSize: 9.8,
          fontFace: 'Arial',
          color: C_STONE_MUTED,
          lineSpacingMultiple: 1.15,
        });
      });
    });

    addSlideFooter(slide, 2);
  }

  // ==========================================
  // SLIDE 3: Existing System and Planning Gaps
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY_BG };
    addSlideHeader(
      slide,
      'Current Landscape',
      'Existing Travel Planning Gaps & Friction',
      'How travellers plan Karnataka trips today, and why current generic approaches fail.'
    );

    const gaps = [
      {
        tag: 'GAP 01: FRAGMENTED RESEARCH',
        title: 'Information Overload & Planning Fatigue',
        current: 'Travellers consult 8-12 disjointed browser tabs: travel blogs, TripAdvisor, YouTube vlogs, and Google Maps.',
        friction: 'Contradictory advice on Western Ghats driving conditions, seasonal timings, and permit requirements causes cognitive exhaustion.',
      },
      {
        tag: 'GAP 02: BUDGET GUESSWORK',
        title: 'Hidden Costs & Misleading Portals',
        current: 'Commercial OTAs only quote isolated flight or hotel room rates, ignoring true on-ground trip costs.',
        friction: 'No transparent separation of group vs per-person expenses. Fuel, tolls, meals, and monument tickets add 35-50% surprise costs.',
      },
      {
        tag: 'GAP 03: GEOGRAPHIC INFEASIBILITY',
        title: 'Unrealistic Travel Durations',
        current: 'Generic planners group distant cities (e.g. Gokarna to Hampi in 1 day) without road reality.',
        friction: 'Overlooks narrow 30 km/h ghat roads in Coorg and Chikkamagaluru, leaving travellers trapped in transit instead of sightseeing.',
      },
      {
        tag: 'GAP 04: FRAGILE AI WRAPPERS',
        title: 'Hallucinations & Zero Offline Reliability',
        current: 'Typical hackathon prototypes are thin LLM wrappers that output vague prose without structured schemas.',
        friction: 'Arithmetic errors in budgets, fabricated train schedules, and complete app failure when API keys expire or rate-limit.',
      },
    ];

    gaps.forEach((g, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      const xPos = 0.8 + col * 6.01;
      const yPos = 1.95 + row * 2.38;

      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos,
        y: yPos,
        w: 5.72,
        h: 2.18,
        fill: { color: C_CARD_BG },
        line: { color: C_BORDER, width: 1 },
        rectRadius: 0.08,
      });

      slide.addText(g.tag, {
        x: xPos + 0.25,
        y: yPos + 0.2,
        w: 5.22,
        h: 0.22,
        fontSize: 9.5,
        fontFace: 'Arial',
        bold: true,
        color: C_TERRACOTTA,
        charSpacing: 1.5,
      });

      slide.addText(g.title, {
        x: xPos + 0.25,
        y: yPos + 0.45,
        w: 5.22,
        h: 0.32,
        fontSize: 13,
        fontFace: 'Arial',
        bold: true,
        color: C_FOREST_DARK,
      });

      // Status Quo block
      slide.addText('Status Quo: ', {
        x: xPos + 0.25,
        y: yPos + 0.82,
        w: 0.85,
        h: 0.5,
        fontSize: 10,
        fontFace: 'Arial',
        bold: true,
        color: C_STONE_DARK,
      });
      slide.addText(g.current, {
        x: xPos + 1.1,
        y: yPos + 0.82,
        w: 4.37,
        h: 0.55,
        fontSize: 10,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
        lineSpacingMultiple: 1.15,
      });

      // Friction block
      slide.addText('Friction: ', {
        x: xPos + 0.25,
        y: yPos + 1.42,
        w: 0.85,
        h: 0.5,
        fontSize: 10,
        fontFace: 'Arial',
        bold: true,
        color: C_TERRACOTTA,
      });
      slide.addText(g.friction, {
        x: xPos + 1.1,
        y: yPos + 1.42,
        w: 4.37,
        h: 0.65,
        fontSize: 10,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
        italic: true,
        lineSpacingMultiple: 1.15,
      });
    });

    addSlideFooter(slide, 3);
  }

  // ==========================================
  // SLIDE 4: Proposed Solution & Differentiation
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY_BG };
    addSlideHeader(
      slide,
      'Proposed Solution',
      'NammaTrip AI: Architecture & Key Differentiation',
      'Combining verified Karnataka tourism knowledge with intelligent itinerary design and budget audits.'
    );

    const pillars = [
      {
        num: '01',
        title: 'Curated Karnataka Dataset',
        subtitle: '15+ Verified Destinations',
        desc: 'Hand-curated repository covering South, Coast, Malenadu, Central, and North Karnataka. Features verified coordinates, Kannada names, cost ranges, and cultural tips.',
        feature: 'Zero fabricated attractions or unrealistic travel times.',
      },
      {
        num: '02',
        title: 'Dual-Engine Intelligence',
        subtitle: 'Gemini 2.5 + Fallback',
        desc: 'Google Gemini 2.5 Flash SDK produces nuanced schedules via strict Zod JSON schemas. Seamlessly falls back to our Deterministic Knowledge Planner if offline.',
        feature: '100% demoable by judges without paid API keys.',
      },
      {
        num: '03',
        title: 'Programmatic Budget Engine',
        subtitle: 'Audited INR Accounting',
        desc: 'Computes double-occupancy hotel rooms, transport, meals, and 6% buffer mathematically. Flags over-budget plans and suggests actionable economizing tips.',
        feature: 'Zero mathematical hallucinations or hidden fees.',
      },
      {
        num: '04',
        title: 'Local Persistence & Export',
        subtitle: 'Zero Login Friction',
        desc: 'Instant browser localStorage persistence across refreshes. OpenStreetMap route visualization, one-click clipboard summary, and browser Print-to-PDF export.',
        feature: 'No signup barriers or invasive tracking.',
      },
    ];

    pillars.forEach((p, idx) => {
      const xPos = 0.8 + idx * 3.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos,
        y: 1.95,
        w: 2.73,
        h: 4.7,
        fill: { color: C_CARD_BG },
        line: { color: C_BORDER, width: 1 },
        rectRadius: 0.08,
      });

      slide.addText(p.num, {
        x: xPos + 0.25,
        y: 2.15,
        w: 2.23,
        h: 0.5,
        fontSize: 28,
        fontFace: 'Georgia',
        bold: true,
        color: C_TERRACOTTA,
      });

      slide.addText(p.title, {
        x: xPos + 0.25,
        y: 2.7,
        w: 2.23,
        h: 0.55,
        fontSize: 13,
        fontFace: 'Arial',
        bold: true,
        color: C_FOREST_DARK,
      });

      slide.addText(p.subtitle, {
        x: xPos + 0.25,
        y: 3.28,
        w: 2.23,
        h: 0.25,
        fontSize: 9.5,
        fontFace: 'Arial',
        bold: true,
        color: C_FOREST_ACCENT,
      });

      slide.addText(p.desc, {
        x: xPos + 0.25,
        y: 3.65,
        w: 2.23,
        h: 1.85,
        fontSize: 10,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
        lineSpacingMultiple: 1.2,
      });

      // Highlight Box
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos + 0.2,
        y: 5.6,
        w: 2.33,
        h: 0.85,
        fill: { color: C_LIGHT_GREEN },
        line: { color: C_FOREST_ACCENT, width: 0.5 },
        rectRadius: 0.05,
      });

      slide.addText(`Key Edge:\n${p.feature}`, {
        x: xPos + 0.25,
        y: 5.65,
        w: 2.23,
        h: 0.75,
        fontSize: 9,
        fontFace: 'Arial',
        bold: true,
        color: C_FOREST_DARK,
        lineSpacingMultiple: 1.15,
      });
    });

    addSlideFooter(slide, 4);
  }

  // ==========================================
  // SLIDE 5: Features and User Journey
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY_BG };
    addSlideHeader(
      slide,
      'User Experience',
      'End-to-End Traveller Journey',
      'From inspiration to day-wise schedule and budget audit in under 60 seconds.'
    );

    const steps = [
      {
        step: '01',
        title: 'Discover & Prefill',
        route: '/explore',
        points: [
          'Filter 15 Karnataka destinations by region & theme.',
          'Inspect verified coordinates and daily cost guides.',
          'One-click "Plan Trip" prefills the planner form.',
        ],
      },
      {
        step: '02',
        title: 'Input Constraints',
        route: '/plan',
        points: [
          'Set starting city, party size (1–20), duration (1–10 days).',
          'Enter total budget ceiling in INR (₹).',
          'Select travel style tier & multi-interest themes.',
        ],
      },
      {
        step: '03',
        title: 'AI Synthesis',
        route: '/api/itinerary',
        points: [
          'Server validates inputs strictly with Zod.',
          'Applies Haversine clustering to avoid travel fatigue.',
          'Prompts Gemini 2.5 or Fallback engine with schemas.',
        ],
      },
      {
        step: '04',
        title: 'Audit & Map',
        route: '/itinerary/[id]',
        points: [
          'Inspect morning, afternoon, evening activities.',
          'View OpenStreetMap Leaflet route & coordinates.',
          'Audit itemized budget and feasibility score.',
        ],
      },
      {
        step: '05',
        title: 'Save & Export',
        route: '/saved',
        points: [
          'Save to browser localStorage without login.',
          'Copy formatted summary text to clipboard.',
          'One-click clean browser Print-to-PDF export.',
        ],
      },
    ];

    steps.forEach((s, idx) => {
      const xPos = 0.8 + idx * 2.38;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos,
        y: 1.95,
        w: 2.18,
        h: 4.7,
        fill: { color: C_CARD_BG },
        line: { color: C_BORDER, width: 1 },
        rectRadius: 0.08,
      });

      // Step Badge
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos + 0.25,
        y: 2.15,
        w: 0.65,
        h: 0.35,
        fill: { color: C_FOREST_MED },
        line: { color: C_FOREST_MED },
        rectRadius: 0.05,
      });

      slide.addText(s.step, {
        x: xPos + 0.25,
        y: 2.18,
        w: 0.65,
        h: 0.3,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: 'FFFFFF',
        align: 'center',
      });

      slide.addText(s.route, {
        x: xPos + 0.95,
        y: 2.2,
        w: 1.0,
        h: 0.25,
        fontSize: 9,
        fontFace: 'Courier New',
        color: C_STONE_MUTED,
      });

      slide.addText(s.title, {
        x: xPos + 0.2,
        y: 2.65,
        w: 1.78,
        h: 0.5,
        fontSize: 13,
        fontFace: 'Arial',
        bold: true,
        color: C_FOREST_DARK,
      });

      s.points.forEach((pt, ptIdx) => {
        const yPt = 3.35 + ptIdx * 0.9;
        slide.addText('✓', {
          x: xPos + 0.15,
          y: yPt,
          w: 0.2,
          h: 0.3,
          fontSize: 10,
          fontFace: 'Arial',
          color: C_TERRACOTTA,
          bold: true,
        });
        slide.addText(pt, {
          x: xPos + 0.38,
          y: yPt,
          w: 1.62,
          h: 0.8,
          fontSize: 9.8,
          fontFace: 'Arial',
          color: C_STONE_MUTED,
          lineSpacingMultiple: 1.15,
        });
      });
    });

    addSlideFooter(slide, 5);
  }

  // ==========================================
  // SLIDE 6: Technical Approach & Architecture
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY_BG };
    addSlideHeader(
      slide,
      'Architecture & Tech Stack',
      'Full-Stack Technical Architecture',
      'Robust, decoupled system built for type safety, performance, and zero-downtime reliability.'
    );

    const layers = [
      {
        tag: 'LAYER 1: PRESENTATION & CLIENT',
        title: 'Next.js 16 App Router + React 19 + Tailwind CSS v4',
        details: [
          'Pages: Home (/), Explore (/explore), Planner (/plan), Itinerary (/itinerary/[id]), Saved (/saved).',
          'Responsive editorial UI with custom brand tokens, Leaflet OpenStreetMap routes, Lucide React icons.',
          'Zero-login browser localStorage client persistence and print-to-PDF export styles.',
        ],
        badgeColor: C_CARD_BG,
        borderColor: C_BORDER,
        tagColor: C_FOREST_MED,
      },
      {
        tag: 'LAYER 2: API & VALIDATION',
        title: 'Server-Side Route Handlers + Zod Schema Validation',
        details: [
          'POST /api/itinerary endpoint with strict runtime input validation via plannerInputSchema.',
          'Server-side API key protection: zero client bundle secret exposure; 25-second timeout guard.',
          'Sanitizes user input and rejects invalid budgets, negative travellers, or out-of-range days.',
        ],
        badgeColor: C_LIGHT_GREEN,
        borderColor: 'B7D7C8',
        tagColor: C_FOREST_DARK,
      },
      {
        tag: 'LAYER 3: INTELLIGENCE & SYNTHESIS',
        title: 'Dual-Engine: Google Gemini 2.5 Flash + Deterministic Fallback',
        details: [
          'Official @google/genai SDK with structured JSON output enforced via aiItineraryOutputSchema.',
          'Autonomous fallback planner: evaluates curated destinations offline when API key is unconfigured.',
          'Haversine distance matrix prevents extreme cross-state travel hops (e.g. Bidar to Coorg).',
        ],
        badgeColor: C_CARD_BG,
        borderColor: C_BORDER,
        tagColor: C_TERRACOTTA,
      },
      {
        tag: 'LAYER 4: DATA & CALCULATION ENGINE',
        title: 'Curated Karnataka Dataset + Programmatic Budget Engine',
        details: [
          'Curated 15+ Karnataka destination catalogue: coordinates, Kannada names, cost ranges, and tips.',
          'Mathematical budget audit: double-occupancy hotel rooms, transport, meals, and 6% buffer.',
          'Automated feasibility evaluation in INR (₹) with status scoring and economizing recommendations.',
        ],
        badgeColor: 'FDF6F2',
        borderColor: 'F2D4C7',
        tagColor: C_FOREST_MED,
      },
    ];

    layers.forEach((l, idx) => {
      const yPos = 1.95 + idx * 1.18;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8,
        y: yPos,
        w: 11.73,
        h: 1.05,
        fill: { color: l.badgeColor },
        line: { color: l.borderColor, width: 1 },
        rectRadius: 0.06,
      });

      slide.addText(l.tag, {
        x: 1.05,
        y: yPos + 0.1,
        w: 4.5,
        h: 0.2,
        fontSize: 8.5,
        fontFace: 'Arial',
        bold: true,
        color: l.tagColor,
        charSpacing: 1.2,
      });

      slide.addText(l.title, {
        x: 1.05,
        y: yPos + 0.28,
        w: 11.2,
        h: 0.28,
        fontSize: 11.5,
        fontFace: 'Arial',
        bold: true,
        color: C_FOREST_DARK,
      });

      slide.addText(l.details.join('  •  '), {
        x: 1.05,
        y: yPos + 0.58,
        w: 11.2,
        h: 0.4,
        fontSize: 9.3,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
        lineSpacingMultiple: 1.15,
      });
    });

    addSlideFooter(slide, 6);
  }

  // ==========================================
  // SLIDE 7: Demonstration & Evaluation
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY_BG };
    addSlideHeader(
      slide,
      'Demonstration & Evaluation',
      'Demonstrated Test Itinerary: Bengaluru to Mysuru & Kabini',
      'Live verified test case demonstrating realistic day-wise scheduling and programmatic budget auditing.'
    );

    // Left Container: Itinerary Schedule (x: 0.8 to 6.95, w: 6.15)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 1.95,
      w: 6.15,
      h: 4.7,
      fill: { color: C_CARD_BG },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.08,
    });

    slide.addText('GENERATED SCHEDULE (2 TRAVELLERS • 3 DAYS)', {
      x: 1.05,
      y: 2.15,
      w: 5.65,
      h: 0.22,
      fontSize: 9.5,
      fontFace: 'Arial',
      bold: true,
      color: C_FOREST_MED,
      charSpacing: 1.2,
    });

    slide.addText('Bengaluru → Mysuru & Kabini Safari Circuit', {
      x: 1.05,
      y: 2.4,
      w: 5.65,
      h: 0.32,
      fontSize: 13,
      fontFace: 'Arial',
      bold: true,
      color: C_FOREST_DARK,
    });

    const dayItems = [
      {
        day: 'DAY 1: ROYAL HERITAGE & FLAVORS OF MYSURU',
        acts: [
          'Morning: Vande Bharat Express from Bengaluru KSR to Mysuru; check-in.',
          'Afternoon: Guided walking tour of Mysore Palace (Amba Vilas) & Durbar Hall.',
          'Evening: Devaraja Market heritage stroll & authentic Guru Sweets Mysore Pak.',
        ],
      },
      {
        day: 'DAY 2: CHAMUNDI HILL & WILDLIFE TRANSIT TO KABINI',
        acts: [
          'Morning: Climb Chamundi Hill for Chamundeshwari Temple & Nandi bull.',
          'Afternoon: Scenic drive past teak forests to Kabini River lodge / homestay.',
          'Evening: Kabini sunset boat safari spotting marsh crocodiles and birds.',
        ],
      },
      {
        day: 'DAY 3: NAGARHOLE JEEP SAFARI & RETURN JOURNEY',
        acts: [
          'Morning: Early open-top jeep safari in Nagarhole (elephants & big cats).',
          'Afternoon: Authentic regional thali lunch; depart towards Bengaluru.',
          'Evening: Arrive in Bengaluru with local sandalwood & spice souvenirs.',
        ],
      },
    ];

    dayItems.forEach((d, idx) => {
      const yDay = 2.85 + idx * 1.2;
      slide.addText(d.day, {
        x: 1.05,
        y: yDay,
        w: 5.65,
        h: 0.24,
        fontSize: 10,
        fontFace: 'Arial',
        bold: true,
        color: C_TERRACOTTA,
      });

      d.acts.forEach((act, aIdx) => {
        slide.addText(`• ${act}`, {
          x: 1.15,
          y: yDay + 0.24 + aIdx * 0.28,
          w: 5.55,
          h: 0.28,
          fontSize: 9.2,
          fontFace: 'Arial',
          color: C_STONE_MUTED,
        });
      });
    });

    // Right Container: Programmatic Budget Audit (x: 7.25 to 12.53, w: 5.28)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 7.25,
      y: 1.95,
      w: 5.28,
      h: 4.7,
      fill: { color: C_CARD_BG },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.08,
    });

    slide.addText('BUDGET AUDIT & FEASIBILITY ENGINE', {
      x: 7.5,
      y: 2.15,
      w: 4.78,
      h: 0.22,
      fontSize: 9.5,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 1.2,
    });

    slide.addText('Programmatic Cost Accounting (INR ₹)', {
      x: 7.5,
      y: 2.4,
      w: 4.78,
      h: 0.32,
      fontSize: 13,
      fontFace: 'Arial',
      bold: true,
      color: C_FOREST_DARK,
    });

    const budgetTable = [
      ['Transport (Flexible Train/Cab)', '₹4,500', 'Train & local cabs @ ₹750/p/day'],
      ['Accommodation (1 Room, 2 Nights)', '₹5,600', '3-star double room @ ₹2,800/night'],
      ['Food & Dining (2 people, 3 days)', '₹5,400', '3 meals @ ₹900/p/day'],
      ['Activities & Safaris (Palace + Kabini)', '₹3,000', 'Verified ASI & Safari entry tickets'],
      ['Contingency Buffer (6% tolls/water)', '₹1,110', 'Highway tolls & incidental expenses'],
    ];

    budgetTable.forEach((row, idx) => {
      const yRow = 2.85 + idx * 0.52;
      slide.addText(row[0], {
        x: 7.5,
        y: yRow,
        w: 3.2,
        h: 0.26,
        fontSize: 9.8,
        fontFace: 'Arial',
        color: C_STONE_DARK,
      });
      slide.addText(row[1], {
        x: 10.7,
        y: yRow,
        w: 1.58,
        h: 0.26,
        fontSize: 9.8,
        fontFace: 'Arial',
        bold: true,
        align: 'right',
        color: C_FOREST_DARK,
      });
      slide.addText(row[2], {
        x: 7.5,
        y: yRow + 0.24,
        w: 4.78,
        h: 0.22,
        fontSize: 8.2,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
        italic: true,
      });
    });

    // Summary Box at Bottom of Right Container
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 7.45,
      y: 5.5,
      w: 4.88,
      h: 0.95,
      fill: { color: C_LIGHT_GREEN },
      line: { color: C_FOREST_ACCENT, width: 1 },
      rectRadius: 0.06,
    });

    slide.addText('Total Trip Estimate:', {
      x: 7.6,
      y: 5.58,
      w: 2.2,
      h: 0.28,
      fontSize: 10.5,
      fontFace: 'Arial',
      color: C_STONE_DARK,
    });
    slide.addText('₹19,610', {
      x: 9.8,
      y: 5.56,
      w: 2.35,
      h: 0.32,
      fontSize: 15,
      fontFace: 'Arial',
      bold: true,
      align: 'right',
      color: C_FOREST_DARK,
    });

    slide.addText('Target Budget: ₹20,000  •  Feasibility: Within Budget (98%)  •  Surplus: ₹390', {
      x: 7.6,
      y: 5.95,
      w: 4.58,
      h: 0.38,
      fontSize: 9.2,
      fontFace: 'Arial',
      bold: true,
      color: C_FOREST_MED,
    });

    addSlideFooter(slide, 7);
  }

  // ==========================================
  // SLIDE 8: Conclusion and Future Scope
  // ==========================================
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_FOREST_DARK };

    slide.addText('CONCLUSION & FUTURE SCOPE', {
      x: 0.8,
      y: 0.65,
      w: 11.73,
      h: 0.25,
      fontSize: 10.5,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    slide.addText('Empowering Travellers Across Karnataka', {
      x: 0.8,
      y: 0.95,
      w: 11.73,
      h: 0.55,
      fontSize: 26,
      fontFace: 'Georgia',
      bold: true,
      color: 'FFFFFF',
    });

    slide.addText(
      'Celebrating Karnataka\'s rich heritage and culture through accessible, intelligent, and transparent technology.',
      {
        x: 0.8,
        y: 1.5,
        w: 11.73,
        h: 0.32,
        fontSize: 11.5,
        fontFace: 'Arial',
        color: 'A2B3AB',
      }
    );

    // Left Container: Hackathon Achievements (x: 0.8, w: 5.72, y: 1.95, h: 4.7)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 1.95,
      w: 5.72,
      h: 4.7,
      fill: { color: C_FOREST_MED },
      line: { color: C_FOREST_ACCENT, width: 1 },
      rectRadius: 0.08,
    });

    slide.addText('HACKATHON ACHIEVEMENTS TODAY', {
      x: 1.05,
      y: 2.15,
      w: 5.22,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 1.5,
    });

    slide.addText('Complete, Production-Grade Deliverable', {
      x: 1.05,
      y: 2.42,
      w: 5.22,
      h: 0.35,
      fontSize: 14,
      fontFace: 'Arial',
      bold: true,
      color: 'FFFFFF',
    });

    const achievements = [
      '100% Focused on Problem Statement 06 (AI Travel Planner for Karnataka).',
      'Built with Next.js 16 App Router, React 19, TypeScript & Tailwind CSS v4.',
      'Dual-Engine Architecture: Gemini 2.5 Flash + Deterministic offline fallback.',
      '17 of 17 automated tests passing in Vitest (unit, validation, storage & API).',
      'Zero TypeScript errors (strict mode) and zero ESLint warnings.',
      'Curated catalogue of 15 Karnataka destinations with verified coordinates.',
      'Programmatic INR budget engine with double-occupancy stay formulas.',
      'Zero-signup browser localStorage persistence, OpenStreetMap, and PDF export.',
    ];

    achievements.forEach((ach, idx) => {
      const yAch = 2.9 + idx * 0.44;
      slide.addText('✓', {
        x: 1.05,
        y: yAch,
        w: 0.2,
        h: 0.35,
        fontSize: 11,
        fontFace: 'Arial',
        color: 'D97736',
        bold: true,
      });
      slide.addText(ach, {
        x: 1.3,
        y: yAch,
        w: 4.97,
        h: 0.38,
        fontSize: 9.8,
        fontFace: 'Arial',
        color: 'E9F3EE',
        lineSpacingMultiple: 1.15,
      });
    });

    // Right Container: Future Scope Roadmap (x: 6.81, w: 5.72, y: 1.95, h: 4.7)
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 6.81,
      y: 1.95,
      w: 5.72,
      h: 4.7,
      fill: { color: '143828' },
      line: { color: C_FOREST_ACCENT, width: 1 },
      rectRadius: 0.08,
    });

    slide.addText('POST-HACKATHON ROADMAP', {
      x: 7.06,
      y: 2.15,
      w: 5.22,
      h: 0.25,
      fontSize: 10,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 1.5,
    });

    slide.addText('Strategic Next Steps for Karnataka Tourism', {
      x: 7.06,
      y: 2.42,
      w: 5.22,
      h: 0.35,
      fontSize: 14,
      fontFace: 'Arial',
      bold: true,
      color: 'FFFFFF',
    });

    const roadmap = [
      {
        title: 'KSRTC & Indian Railways Real-Time Booking',
        desc: 'Direct seat inventory query and booking links for Airavat Club Class, Rajahamsa, and Vande Bharat trains.',
      },
      {
        title: 'Multilingual Kannada Voice Assistant',
        desc: 'Speech-to-text in Kannada for rural travellers and pilgrims navigating sacred circuits (Dharmasthala, Udupi, Kukke).',
      },
      {
        title: 'Live Weather & Monsoon Landslide Alerts',
        desc: 'Dynamic road safety advisories during peak monsoon across Western Ghats ghat corridors (Charmadi, Shiradi, Agumbe).',
      },
      {
        title: 'Official KSTDC Partnership Integration',
        desc: 'Automated booking passes for Jungle Lodges & Resorts (JLR) and verified state ASI heritage monuments.',
      },
    ];

    roadmap.forEach((rm, idx) => {
      const yRm = 2.9 + idx * 0.9;
      slide.addText(`→  ${rm.title}`, {
        x: 7.06,
        y: yRm,
        w: 5.22,
        h: 0.28,
        fontSize: 10.5,
        fontFace: 'Arial',
        bold: true,
        color: 'E9F3EE',
      });
      slide.addText(rm.desc, {
        x: 7.35,
        y: yRm + 0.26,
        w: 4.93,
        h: 0.58,
        fontSize: 9.3,
        fontFace: 'Arial',
        color: 'A2B3AB',
        lineSpacingMultiple: 1.15,
      });
    });

    addSlideFooter(slide, 8, 8, true);
  }

  // Ensure output directory exists
  const submissionDir = path.resolve('submission');
  if (!fs.existsSync(submissionDir)) {
    fs.mkdirSync(submissionDir, { recursive: true });
  }

  const outputPath = path.join(submissionDir, 'NammaTrip_AI_Hackathon_Presentation.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`Presentation successfully created at: ${outputPath}`);
}

generatePresentation().catch((err) => {
  console.error('Error generating presentation:', err);
  process.exit(1);
});
