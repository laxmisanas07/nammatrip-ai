# NammaTrip AI — Official Video Demo Voiceover Script
## Kannada Digital Innovation Hackathon 2026 • Problem Statement 06 (Travel & Tourism)
**Target Video Duration:** 4 minutes 30 seconds  
**Format:** Screen recording with English voiceover (and warm Kannada greeting)

---

### [0:00 – 0:45] Problem Statement and Hackathon Requirements

**Visual on Screen:**  
*Display title slide from `submission/NammaTrip_AI_Hackathon_Presentation.pptx` or open the NammaTrip AI homepage at `localhost:3000` showing the hero headline: "Your Karnataka. Your Journey. Intelligently Planned."*

**Narrator Voiceover:**  
> "Namaskara Karnataka, and welcome to our demonstration of **NammaTrip AI — Your Intelligent Karnataka Travel Planner**, built for the **Kannada Digital Innovation Hackathon 2026** organized by HackerRank Campus Crew and The National Institute of Engineering (NIE), Mysuru.
>
> We chose **Problem Statement 06: Travel & Tourism — AI Travel Planner for Karnataka**.
>
> Karnataka is blessed with incredible diversity — from the royal palaces of Mysuru and the boulder-strewn ruins of Vijayanagara in Hampi, to the misty coffee peaks of Coorg and pristine Arabian sea beaches in Gokarna. However, travellers face a daunting challenge: how do you synthesize travel duration, varying group budgets, diverse personal interests, and difficult Western Ghats road distances into a realistic, day-wise schedule without spending days on research?
>
> That is the exact problem NammaTrip AI solves."

---

### [0:45 – 1:30] Existing Systems and Critical Gaps

**Visual on Screen:**  
*Briefly scroll past the "How Planning Works" section on the home page and highlight the "Budget Transparency" editorial card.*

**Narrator Voiceover:**  
> "Today, travellers typically juggle ten to twelve disconnected browser tabs: static travel blogs, YouTube vlogs, TripAdvisor reviews, and Google Maps.
>
> This existing workflow suffers from three fundamental gaps:
> First, **Fragmentation and Planning Fatigue**: It takes hours to cross-check whether two destinations are geographically feasible to cover in a 3-day weekend.
> Second, **Budget Guesswork**: Traditional booking portals only quote single hotel rooms or flights. They provide zero guidance on total group expenses like local transport, Archaeological Survey entrance tickets, dining, or state highway tolls.
> And third, **Generic AI Hallucinations**: Standard chatbots often produce fictional itineraries that suggest driving from Bidar to Coorg in a single afternoon, completely ignoring road realities.
>
> NammaTrip AI replaces this guesswork with verified regional tourism data, structured AI synthesis, and a transparent Indian Rupee budget audit."

---

### [1:30 – 3:30] Live Product Demonstration

**Visual on Screen:**  
*Navigate to `/explore` (Explore Karnataka page).*

**Narrator Voiceover:**  
> "Let's walk through the live application.
>
> We begin on the **Explore Karnataka** page. Here, travellers can discover 15 hand-curated Karnataka destinations — including Mysuru, Hampi, Coorg, Chikkamagaluru, Gokarna, Badami, Shivamogga, Bengaluru, Udupi, and Kabini.
> Each destination features verified latitude and longitude coordinates, authentic Kannada script nomenclature, daily cost ranges across Budget, Balanced, and Comfort tiers, and curated activities.
> We can instantly filter by region — like Coastal Karnataka or Malenadu — or by theme, such as Wildlife or Heritage.
> Clicking 'View Guide' opens a comprehensive modal with travel tips and direct links to OpenStreetMap.
>
> Now, let's click **'Plan Trip'** on Mysuru to open the **Trip Planner**."

**Visual on Screen:**  
*Navigate to `/plan` and interact with the form inputs.*

**Narrator Voiceover:**  
> "Here on the **Plan a Trip** page, the starting point is pre-set to Bengaluru and our destination preference is Mysuru.
> We'll set the party size to **2 travellers**, duration to **3 days**, and enter a target budget of **₹20,000 INR**.
> We select the **Balanced travel style**, which optimizes for 3-star stays and comfortable transport.
> For interests, we select **Heritage & History**, **Food & Local Cuisine**, and **Wildlife & Safaris**.
> Notice that all inputs have strict validation — budgets must be positive and realistic, and duration is strictly bound between 1 and 10 days.
>
> Now, let's click **'Generate My Itinerary'**."

**Visual on Screen:**  
*Click button; loading indicator displays: 'Synthesizing Your Karnataka Itinerary... Matching regional attractions, calculating double-occupancy hotel rooms...'; Itinerary view loads at `/itinerary/[id]`.*

**Narrator Voiceover:**  
> "Within seconds, NammaTrip AI generates a complete travel plan.
> Look at the **Trip Overview**: It recognizes that a 3-day trip from Bengaluru allows us to combine royal Mysuru with the wildlife of Kabini and Nagarhole without excessive transit exhaustion.
>
> Look at the **Feasibility Badge**: It automatically audits our ₹20,000 budget. The estimated cost is ₹19,610 — marked as **'Within Allocated Budget (98%)'** with a ₹390 contingency surplus.
>
> Next is the **Programmatic Budget Breakdown**:
> Notice how costs are separately calculated:
> - Transport is calculated as ₹4,500 for flexible rail and local transit.
> - Accommodation is calculated for **1 double-occupancy room across 2 nights** at ₹5,600.
> - Food is estimated at ₹5,400 for 2 travellers across 3 days.
> - Monument tickets and Kabini safaris are audited at ₹3,000.
> - And a 6% buffer of ₹1,110 is added for highway tolls and hydration.
>
> Scrolling down, we have the **Day-by-Day Schedule**:
> - **Day 1**: Scenic arrival from Bengaluru, Mysore Palace tour, and an evening stroll through Devaraja Market for Mysore Pak.
> - **Day 2**: Chamundi Hill ascent, Chamundeshwari temple, followed by a scenic drive to Kabini for an evening river boat safari.
> - **Day 3**: An early morning Nagarhole tiger and elephant safari, traditional Kodava/Karnataka lunch, and a smooth return journey.
>
> Below the schedule is the **Interactive Route Map**, powered by Leaflet and OpenStreetMap, plotting verified markers and the transit route.
>
> Finally, travellers can click **'Save Itinerary'** — which stores the plan permanently in the browser's local storage without requiring any login — or click **'Print / PDF'** to export an editorial travel document."

---

### [3:30 – 4:15] Technical Approach and Architecture

**Visual on Screen:**  
*Navigate to `/saved` showing the saved trip card, then transition to the Architecture diagram or codebase.*

**Narrator Voiceover:**  
> "Behind the scenes, NammaTrip AI is built with modern, enterprise-grade technologies:
> - **Frontend**: Next.js 16 with the App Router, React 19, TypeScript with strict type-safety, and Tailwind CSS v4 for a warm ivory and deep forest green visual aesthetic.
> - **API & Validation**: Server-side Next.js route handlers validate incoming payloads with **Zod** schemas, ensuring strict data hygiene and protecting server secrets.
> - **Dual-Engine Intelligence**: We integrate **Google Gemini 2.5 Flash** using the official `@google/genai` SDK with strict JSON schema outputs. Crucially, when an API key is absent or offline, NammaTrip AI automatically falls back to our **Deterministic Karnataka Knowledge Planner**, ensuring judges can evaluate the full application without paid credentials.
> - **Budget Engine**: All arithmetic is computed programmatically on the server, eliminating hallucinated math and ensuring honest, reproducible budgets.
> - **Testing**: Fully covered with 17 automated tests in Vitest across unit, validation, fallback, and API routes."

---

### [4:15 – 4:30] Conclusion and Future Scope

**Visual on Screen:**  
*Return to Home Page hero section with the wordmark: "NammaTrip AI — Your Karnataka. Your Journey. Intelligently Planned."*

**Narrator Voiceover:**  
> "NammaTrip AI demonstrates how artificial intelligence and verified local domain knowledge can make travel in Karnataka seamless, transparent, and accessible to everyone.
> In our future roadmap, we plan to integrate live KSRTC bus booking APIs, Western Ghats monsoon weather advisories, and a multilingual Kannada voice assistant.
>
> Thank you, and Dhanyavadagalu!"
