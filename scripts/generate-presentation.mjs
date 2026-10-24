import pptxgen from 'pptxgenjs';
import fs from 'fs';
import path from 'path';

async function generatePresentation() {
  const pptx = new pptxgen();

  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'NammaTrip AI Team';
  pptx.company = 'Kannada Digital Innovation Hackathon 2026';
  pptx.subject = 'Problem Statement 06 — AI Travel Planner for Karnataka';
  pptx.title = 'NammaTrip AI — Intelligent Karnataka Travel Planner';

  // Palette definitions
  const C_FOREST = '1B4332';
  const C_DARK = '0F2A1F';
  const C_IVORY = 'FAF7F2';
  const C_TERRACOTTA = 'C85A32';
  const C_STONE_DARK = '1F2623';
  const C_STONE_MUTED = '55655E';
  const C_CARD_BG = 'FFFFFF';
  const C_BORDER = 'E3DED6';
  const C_LIGHT_GREEN = 'E9F3EE';

  // Slide 1: Title Slide (Dark Forest Green Background)
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_DARK };

    // Hackathon Tag
    slide.addText('KANNADA DIGITAL INNOVATION HACKATHON 2026', {
      x: 1.0,
      y: 1.0,
      w: 11.3,
      h: 0.4,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    slide.addText('Problem Statement 06 — Travel & Tourism', {
      x: 1.0,
      y: 1.4,
      w: 11.3,
      h: 0.4,
      fontSize: 14,
      fontFace: 'Arial',
      color: 'A2B3AB',
    });

    // Main Title
    slide.addText('NammaTrip AI', {
      x: 1.0,
      y: 2.3,
      w: 11.3,
      h: 1.2,
      fontSize: 48,
      fontFace: 'Georgia',
      bold: true,
      color: 'FFFFFF',
    });

    slide.addText('Your Intelligent Karnataka Travel Planner', {
      x: 1.0,
      y: 3.5,
      w: 11.3,
      h: 0.6,
      fontSize: 22,
      fontFace: 'Arial',
      color: 'E9F3EE',
    });

    slide.addText(
      'Personalized itineraries, day-by-day schedules, and transparent INR cost breakdowns tailored to your time, budget, and travel interests.',
      {
        x: 1.0,
        y: 4.4,
        w: 9.5,
        h: 0.8,
        fontSize: 14,
        fontFace: 'Arial',
        color: 'A2B3AB',
        lineSpacingMultiple: 1.2,
      }
    );

    // Meta box at bottom
    slide.addShape(pptx.ShapeType.rect, {
      x: 1.0,
      y: 5.8,
      w: 11.3,
      h: 0.8,
      fill: { color: C_FOREST },
      line: { color: '2D6A4F', width: 1 },
    });

    slide.addText(
      'Organized by HackerRank Campus Crew • The National Institute of Engineering (NIE), Mysuru',
      {
        x: 1.2,
        y: 6.0,
        w: 10.9,
        h: 0.4,
        fontSize: 11,
        fontFace: 'Arial',
        color: 'FFFFFF',
        bold: true,
      }
    );
  }

  // Slide 2: Problem Statement & Target Audience
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY };

    slide.addText('PROBLEM STATEMENT 06', {
      x: 0.8,
      y: 0.6,
      w: 10.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    slide.addText('The Karnataka Travel Planning Challenge', {
      x: 0.8,
      y: 0.9,
      w: 10.0,
      h: 0.6,
      fontSize: 28,
      fontFace: 'Georgia',
      bold: true,
      color: C_DARK,
    });

    // Core Challenge Box
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 1.7,
      w: 11.7,
      h: 1.5,
      fill: { color: C_CARD_BG },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText('Official Objective', {
      x: 1.1,
      y: 1.9,
      w: 11.1,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: C_FOREST,
    });

    slide.addText(
      'Develop an AI-powered travel planner that creates personalized Karnataka itineraries based on a traveller\'s interests, available time, budget, and preferred type of experience.',
      {
        x: 1.1,
        y: 2.2,
        w: 11.1,
        h: 0.8,
        fontSize: 14,
        fontFace: 'Arial',
        color: C_STONE_DARK,
        italic: true,
        lineSpacingMultiple: 1.2,
      }
    );

    // 3 Target Persona Cards
    const personas = [
      {
        title: 'Students & Budget Travellers',
        desc: 'Need strict cost ceilings in INR, low-cost KSRTC transport routes, and affordable stays with zero hidden surprises.',
      },
      {
        title: 'Families & Groups',
        desc: 'Require balanced schedules without travel fatigue, sensible hotel room counting (double occupancy), and kid/elderly friendly activities.',
      },
      {
        title: 'First-Time Visitors & Solo Explorers',
        desc: 'Seek authentic cultural immersion (Mysore Dasara, Hampi ruins, Coorg coffee, Gokarna cliffs) without spending hours on research.',
      },
    ];

    personas.forEach((p, idx) => {
      const xPos = 0.8 + idx * 4.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos,
        y: 3.5,
        w: 3.7,
        h: 3.2,
        fill: { color: C_CARD_BG },
        line: { color: C_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(p.title, {
        x: xPos + 0.3,
        y: 3.8,
        w: 3.1,
        h: 0.6,
        fontSize: 14,
        fontFace: 'Arial',
        bold: true,
        color: C_FOREST,
      });

      slide.addText(p.desc, {
        x: xPos + 0.3,
        y: 4.6,
        w: 3.1,
        h: 1.8,
        fontSize: 12,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
        lineSpacingMultiple: 1.2,
      });
    });
  }

  // Slide 3: Existing System and Gaps
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY };

    slide.addText('CURRENT LANDSCAPE', {
      x: 0.8,
      y: 0.6,
      w: 10.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    slide.addText('Existing Planning Gaps & Traveller Friction', {
      x: 0.8,
      y: 0.9,
      w: 10.0,
      h: 0.6,
      fontSize: 28,
      fontFace: 'Georgia',
      bold: true,
      color: C_DARK,
    });

    const gaps = [
      {
        label: 'FRAGMENTED RESEARCH',
        current: 'Travellers juggle 8-12 disjointed browser tabs: travel blogs, YouTube vlogs, TripAdvisor, and Google Maps.',
        problem: 'Cognitive overload and contradictory advice on Karnataka road conditions and travel times.',
      },
      {
        label: 'BUDGET GUESSWORK',
        current: 'Traditional portals only show individual flight or hotel room rates without holistic trip totals.',
        problem: 'No transparent separation of group vs per-person costs (monument tickets, food, fuel, tolls).',
      },
      {
        label: 'GEOGRAPHIC INFEASIBILITY',
        current: 'Generic itineraries often group distant places (e.g. Gokarna and Hampi in 1 day) without road reality.',
        problem: 'Travellers face extreme driving exhaustion on narrow Western Ghats hairpin ghat roads.',
      },
      {
        label: 'GENERIC PURPLE "AI WRAPPERS"',
        current: 'Typical hackathon AI tools output vague text paragraphs without validated schemas or budgets.',
        problem: 'Fail completely when API keys expire, without any deterministic fallback for reliable judging.',
      },
    ];

    gaps.forEach((g, idx) => {
      const row = Math.floor(idx / 2);
      const col = idx % 2;
      const xPos = 0.8 + col * 6.0;
      const yPos = 1.8 + row * 2.5;

      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos,
        y: yPos,
        w: 5.7,
        h: 2.2,
        fill: { color: C_CARD_BG },
        line: { color: C_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(g.label, {
        x: xPos + 0.3,
        y: yPos + 0.25,
        w: 5.1,
        h: 0.3,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: C_TERRACOTTA,
        charSpacing: 1,
      });

      slide.addText(`Status Quo: ${g.current}`, {
        x: xPos + 0.3,
        y: yPos + 0.65,
        w: 5.1,
        h: 0.65,
        fontSize: 11,
        fontFace: 'Arial',
        color: C_STONE_DARK,
      });

      slide.addText(`Traveller Pain: ${g.problem}`, {
        x: xPos + 0.3,
        y: yPos + 1.35,
        w: 5.1,
        h: 0.65,
        fontSize: 11,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
        italic: true,
      });
    });
  }

  // Slide 4: Proposed Solution & Differentiation
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY };

    slide.addText('OUR SOLUTION', {
      x: 0.8,
      y: 0.6,
      w: 10.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    slide.addText('NammaTrip AI: Intelligent Karnataka Travel Architect', {
      x: 0.8,
      y: 0.9,
      w: 11.5,
      h: 0.6,
      fontSize: 28,
      fontFace: 'Georgia',
      bold: true,
      color: C_DARK,
    });

    const pillars = [
      {
        num: '01',
        title: 'Curated Karnataka Dataset',
        desc: '15+ verified destinations with authentic coordinates, daily cost bands, recommended duration, and local cultural tips.',
      },
      {
        num: '02',
        title: 'Dual Engine Architecture',
        desc: 'Google Gemini 2.5 Flash for nuanced creative planning + 100% deterministic local fallback when offline or without API key.',
      },
      {
        num: '03',
        title: 'Programmatic Budget Engine',
        desc: 'Independent mathematical audit of rooms, meals, and transport in INR (₹). Flags over-budget trips and suggests cost optimizations.',
      },
      {
        num: '04',
        title: 'Zero-Friction Local Persistence',
        desc: 'Instant localStorage saving without logins, interactive OpenStreetMap routes, and one-click Print-to-PDF export.',
      },
    ];

    pillars.forEach((p, idx) => {
      const xPos = 0.8 + idx * 3.0;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos,
        y: 1.8,
        w: 2.8,
        h: 4.8,
        fill: { color: C_CARD_BG },
        line: { color: C_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addText(p.num, {
        x: xPos + 0.3,
        y: 2.1,
        w: 2.2,
        h: 0.6,
        fontSize: 24,
        fontFace: 'Georgia',
        bold: true,
        color: C_TERRACOTTA,
      });

      slide.addText(p.title, {
        x: xPos + 0.3,
        y: 2.8,
        w: 2.2,
        h: 0.7,
        fontSize: 14,
        fontFace: 'Arial',
        bold: true,
        color: C_FOREST,
      });

      slide.addText(p.desc, {
        x: xPos + 0.3,
        y: 3.6,
        w: 2.2,
        h: 2.6,
        fontSize: 11,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
        lineSpacingMultiple: 1.2,
      });
    });
  }

  // Slide 5: Features & End-to-End User Journey
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY };

    slide.addText('USER EXPERIENCE', {
      x: 0.8,
      y: 0.6,
      w: 10.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    slide.addText('Seamless 5-Stage Traveller Journey', {
      x: 0.8,
      y: 0.9,
      w: 10.0,
      h: 0.6,
      fontSize: 28,
      fontFace: 'Georgia',
      bold: true,
      color: C_DARK,
    });

    const steps = [
      {
        step: 'STEP 1',
        name: 'Discover',
        desc: 'Explore curated Karnataka destinations with region and interest filters. Click "Plan Trip" to prefill planner.',
      },
      {
        step: 'STEP 2',
        name: 'Input Constraints',
        desc: 'Set origin, party size (1-20), duration (1-10 days), target INR budget, travel tier, and interest themes.',
      },
      {
        step: 'STEP 3',
        name: 'AI Synthesis',
        desc: 'Server validates inputs via Zod, queries Gemini / Fallback engine, and pairs geographically close stops.',
      },
      {
        step: 'STEP 4',
        name: 'Inspect & Audit',
        desc: 'Review morning, afternoon, evening activities, Leaflet route map, and itemized budget feasibility breakdown.',
      },
      {
        step: 'STEP 5',
        name: 'Save & Export',
        desc: 'Persist plan in browser localStorage, copy formatted text summary, or export clean printable PDF.',
      },
    ];

    steps.forEach((s, idx) => {
      const xPos = 0.8 + idx * 2.4;
      slide.addShape(pptx.ShapeType.roundRect, {
        x: xPos,
        y: 1.8,
        w: 2.2,
        h: 4.8,
        fill: { color: C_CARD_BG },
        line: { color: C_BORDER, width: 1 },
        rectRadius: 0.1,
      });

      slide.addShape(pptx.ShapeType.rect, {
        x: xPos + 0.25,
        y: 2.1,
        w: 1.7,
        h: 0.35,
        fill: { color: C_LIGHT_GREEN },
        line: { color: '2D6A4F', width: 0.5 },
      });

      slide.addText(s.step, {
        x: xPos + 0.25,
        y: 2.15,
        w: 1.7,
        h: 0.25,
        fontSize: 10,
        fontFace: 'Arial',
        bold: true,
        color: C_FOREST,
        align: 'center',
      });

      slide.addText(s.name, {
        x: xPos + 0.2,
        y: 2.7,
        w: 1.8,
        h: 0.5,
        fontSize: 15,
        fontFace: 'Arial',
        bold: true,
        color: C_DARK,
        align: 'center',
      });

      slide.addText(s.desc, {
        x: xPos + 0.2,
        y: 3.4,
        w: 1.8,
        h: 3.0,
        fontSize: 11,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
        lineSpacingMultiple: 1.2,
        align: 'center',
      });
    });
  }

  // Slide 6: Technical Approach & Architecture
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY };

    slide.addText('ARCHITECTURE & TECH STACK', {
      x: 0.8,
      y: 0.6,
      w: 10.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    slide.addText('Clean Full-Stack Next.js App Router Architecture', {
      x: 0.8,
      y: 0.9,
      w: 11.5,
      h: 0.6,
      fontSize: 28,
      fontFace: 'Georgia',
      bold: true,
      color: C_DARK,
    });

    // Architecture diagram representation boxes
    const layers = [
      {
        title: 'FRONTEND CLIENT (Next.js 16 + React 19 + Tailwind v4)',
        items: 'App Router Pages (/, /plan, /explore, /saved, /itinerary/[id]) • Responsive Editorial UI • OpenStreetMap Leaflet Map • Lucide React',
        y: 1.8,
        bg: C_CARD_BG,
        color: C_FOREST,
      },
      {
        title: 'SERVER-SIDE API & VALIDATION (Node.js runtime)',
        items: 'POST /api/itinerary • Strict Zod Input Validation • Server-Side API Key Protection (Zero Client Secrets) • Request Timeout Guard (25s)',
        y: 3.0,
        bg: C_LIGHT_GREEN,
        color: C_DARK,
      },
      {
        title: 'INTELLIGENCE & SYNTHESIS LAYER',
        items: 'Google Gemini 2.5 Flash SDK (@google/genai) with Structured JSON Output Schema ↔ Verified Deterministic Fallback Engine',
        y: 4.2,
        bg: C_CARD_BG,
        color: C_TERRACOTTA,
      },
      {
        title: 'DATA & CALCULATION ENGINES',
        items: 'Curated Karnataka Dataset (15 destinations, verified coordinates) • Programmatic Budget Engine (Group/Person accounting, INR, Feasibility Score) • Browser LocalStorage',
        y: 5.4,
        bg: 'FDF6F2',
        color: C_STONE_DARK,
      },
    ];

    layers.forEach((l) => {
      slide.addShape(pptx.ShapeType.roundRect, {
        x: 0.8,
        y: l.y,
        w: 11.7,
        h: 1.0,
        fill: { color: l.bg },
        line: { color: C_BORDER, width: 1 },
        rectRadius: 0.08,
      });

      slide.addText(l.title, {
        x: 1.1,
        y: l.y + 0.15,
        w: 11.1,
        h: 0.3,
        fontSize: 11,
        fontFace: 'Arial',
        bold: true,
        color: l.color,
      });

      slide.addText(l.items, {
        x: 1.1,
        y: l.y + 0.45,
        w: 11.1,
        h: 0.45,
        fontSize: 10.5,
        fontFace: 'Arial',
        color: C_STONE_MUTED,
      });
    });
  }

  // Slide 7: Demonstration & Tested Evaluation
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_IVORY };

    slide.addText('DEMONSTRATION & EVALUATION', {
      x: 0.8,
      y: 0.6,
      w: 10.0,
      h: 0.3,
      fontSize: 11,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    slide.addText('Demonstrated Test Itinerary: Bengaluru to Mysuru & Kabini', {
      x: 0.8,
      y: 0.9,
      w: 11.5,
      h: 0.6,
      fontSize: 26,
      fontFace: 'Georgia',
      bold: true,
      color: C_DARK,
    });

    // Left side: Itinerary Day Schedule
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 0.8,
      y: 1.8,
      w: 6.2,
      h: 4.8,
      fill: { color: C_CARD_BG },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText('Generated 3-Day Balanced Schedule (2 Travellers)', {
      x: 1.1,
      y: 2.0,
      w: 5.6,
      h: 0.3,
      fontSize: 13,
      fontFace: 'Arial',
      bold: true,
      color: C_FOREST,
    });

    const dayText = `• Day 1: Bengaluru Departure → Mysore Palace & Devaraja Market
  Morning: Vande Bharat express from Bengaluru to Mysuru, check-in.
  Afternoon: Guided tour of Mysore Palace (Amba Vilas) and Durbar Hall.
  Evening: Fragrant Devaraja Market stroll & authentic Mysore Pak tasting.

• Day 2: Chamundi Hill & Scenic Drive to Kabini River
  Morning: Ascent to Chamundi Hill, Chamundeshwari Temple & Nandi bull.
  Afternoon: Drive through teak forest to Kabini River lodge / homestay.
  Evening: Kabini sunset boat safari spotting marsh crocodiles and birds.

• Day 3: Nagarhole Safari & Return Transit
  Morning: Early open-jeep tiger and elephant safari in Nagarhole reserve.
  Afternoon: Traditional lunch and return drive towards Bengaluru.`;

    slide.addText(dayText, {
      x: 1.1,
      y: 2.4,
      w: 5.6,
      h: 3.9,
      fontSize: 10.5,
      fontFace: 'Arial',
      color: C_STONE_DARK,
      lineSpacingMultiple: 1.15,
    });

    // Right side: Programmatic Budget Audit
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 7.3,
      y: 1.8,
      w: 5.2,
      h: 4.8,
      fill: { color: C_CARD_BG },
      line: { color: C_BORDER, width: 1 },
      rectRadius: 0.1,
    });

    slide.addText('Programmatic Budget Audit (INR ₹)', {
      x: 7.6,
      y: 2.0,
      w: 4.6,
      h: 0.3,
      fontSize: 13,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
    });

    const budgetLines = [
      ['Transport (Flexible Train/Cab)', '₹4,500'],
      ['Accommodation (1 Room, 2 Nights)', '₹5,600'],
      ['Food & Dining (2 people, 3 days)', '₹5,400'],
      ['Entry & Safaris (Palace + Kabini)', '₹3,000'],
      ['Contingency Buffer (6% tolls/water)', '₹1,110'],
      ['Total Estimated Trip Cost', '₹19,610'],
      ['User Allocated Budget', '₹20,000'],
      ['Feasibility Status', 'Within Budget (98%)'],
    ];

    budgetLines.forEach((b, idx) => {
      const yLine = 2.4 + idx * 0.45;
      const isBold = idx >= 5;
      slide.addText(b[0], {
        x: 7.6,
        y: yLine,
        w: 3.2,
        h: 0.3,
        fontSize: isBold ? 11 : 10,
        fontFace: 'Arial',
        bold: isBold,
        color: isBold ? C_DARK : C_STONE_MUTED,
      });
      slide.addText(b[1], {
        x: 10.8,
        y: yLine,
        w: 1.4,
        h: 0.3,
        fontSize: isBold ? 11 : 10,
        fontFace: 'Arial',
        bold: isBold,
        align: 'right',
        color: idx === 7 ? C_FOREST : isBold ? C_DARK : C_STONE_DARK,
      });
    });
  }

  // Slide 8: Conclusion & Future Scope
  {
    const slide = pptx.addSlide();
    slide.background = { color: C_DARK };

    slide.addText('CONCLUSION & FUTURE SCOPE', {
      x: 1.0,
      y: 0.8,
      w: 10.0,
      h: 0.3,
      fontSize: 12,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
      charSpacing: 2,
    });

    slide.addText('Empowering Travellers Across Karnataka', {
      x: 1.0,
      y: 1.1,
      w: 11.3,
      h: 0.6,
      fontSize: 32,
      fontFace: 'Georgia',
      bold: true,
      color: 'FFFFFF',
    });

    // Hackathon Impact
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 1.0,
      y: 2.0,
      w: 5.4,
      h: 4.5,
      fill: { color: C_FOREST },
      line: { color: '2D6A4F', width: 1 },
      rectRadius: 0.1,
    });

    slide.addText('Hackathon Achievements Today', {
      x: 1.3,
      y: 2.3,
      w: 4.8,
      h: 0.3,
      fontSize: 15,
      fontFace: 'Arial',
      bold: true,
      color: 'FFFFFF',
    });

    const achievements = `✓ 100% Focused on Problem Statement 06 (Karnataka Tourism)
✓ Working Next.js 16 Production Build with TypeScript & Zod
✓ Dual-Engine Design: Google Gemini 2.5 + Deterministic Fallback
✓ Fully testable offline without requiring paid API keys
✓ Curated dataset of 15 Karnataka destinations & coordinates
✓ Programmatic INR budget breakdown with feasibility scoring
✓ Zero authentication required; local browser persistence
✓ Print-to-PDF export & clipboard summary sharing`;

    slide.addText(achievements, {
      x: 1.3,
      y: 2.8,
      w: 4.8,
      h: 3.4,
      fontSize: 11,
      fontFace: 'Arial',
      color: 'E9F3EE',
      lineSpacingMultiple: 1.25,
    });

    // Future Roadmap
    slide.addShape(pptx.ShapeType.roundRect, {
      x: 6.9,
      y: 2.0,
      w: 5.4,
      h: 4.5,
      fill: { color: '143828' },
      line: { color: '2D6A4F', width: 1 },
      rectRadius: 0.1,
    });

    slide.addText('Future Roadmap (Post-Hackathon)', {
      x: 7.2,
      y: 2.3,
      w: 4.8,
      h: 0.3,
      fontSize: 15,
      fontFace: 'Arial',
      bold: true,
      color: C_TERRACOTTA,
    });

    const roadmap = `→ Live KSRTC bus & Indian Railways API seat integration
→ Multilingual Kannada Voice Assistant (Kannada Speech-to-Text)
→ Dynamic Western Ghats monsoon weather & landslide advisory
→ Direct integration with Karnataka Tourism (KSTDC) bookings
→ Collaborative group itinerary voting & split-fare payments`;

    slide.addText(roadmap, {
      x: 7.2,
      y: 2.8,
      w: 4.8,
      h: 3.4,
      fontSize: 11,
      fontFace: 'Arial',
      color: 'A2B3AB',
      lineSpacingMultiple: 1.35,
    });
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
