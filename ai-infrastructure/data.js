// AI Hardware Stack — A Guided Tour
// 7 chapters, written as an educator + investor lens for a curious learner.
// Each chapter has: title, dek (one-line subtitle), reading time,
// sections of body content, key terms (glossary inline), and a portfolio callout.

window.TOUR_DATA = {
  meta: {
    title: "AI Is a Physical Thing",
    subtitle: "A guided tour of the hardware stack behind every AI response",
    holdings: ["MU", "VRT", "BE"],
  },
  chapters: [
    {
      id: 1,
      slug: "why-hardware",
      title: "Why AI Needs So Much Hardware",
      dek: "The shape of the problem before the engineering of the solution.",
      readMin: 5,
      tag: "MENTAL MODEL",
      sections: [
        {
          heading: "The one sentence to remember",
          body: "AI is a physical thing before it is a software thing. Every ChatGPT response, every image generated, every AI recommendation is the end product of a long chain of physical hardware that has to be built, powered, cooled, and fed with memory. The software gets the headlines. The hardware is where the money actually flows.",
        },
        {
          heading: "What the model is actually doing",
          body: "When you type a question into ChatGPT, the model doesn't 'think.' It performs hundreds of billions of multiplications and additions on numbers — at the same time, in parallel. Every word it generates is the result of running an enormous matrix of numbers through more matrices of numbers. The model itself is just a giant pile of these numbers (called 'weights' or 'parameters'), sitting in memory, waiting to be multiplied.\n\nGPT-4-class models have around a trillion of these numbers. To produce one token of output — roughly one word — the system has to read a meaningful slice of those numbers from memory, multiply, and add. Then do it again for the next word. And again, and again, billions of times across millions of users.",
        },
        {
          heading: "Why this is a hardware problem, not a software problem",
          body: "Three constraints make AI fundamentally physical:\n\n1. **Scale of computation.** A single user asking ChatGPT a question can require trillions of math operations. Multiply by hundreds of millions of daily users.\n2. **Speed.** People expect answers in seconds. That means the math has to happen extremely fast, which means it has to happen in parallel across thousands of processors at once.\n3. **Memory bandwidth.** All those weights need to be moved from memory into the processor over and over again. The 'wire' connecting memory to compute becomes the bottleneck — not the compute itself.\n\nNo software trick eliminates these constraints. You can make the model smaller or smarter, but you cannot escape the underlying physics of moving electrons through silicon at the scale required.",
        },
        {
          heading: "What this means for an investor",
          body: "The companies that get rich in AI fall into two camps:\n\n- **The application winners** — a handful of brand-name consumer products and enterprise tools (ChatGPT, Cursor, Copilot). Hard to predict winners, intense competition, huge potential upside but also high failure rate.\n- **The picks-and-shovels suppliers** — the companies that sell the physical infrastructure every AI system needs, regardless of who's on top. More predictable, less explosive upside per stock, but the demand is *aggregate AI demand*, not the success of any single application.\n\nMU, VRT, and BE are picks-and-shovels bets. Understanding why those layers exist — and what could weaken them — is what the rest of this tour is about.",
        },
      ],
      callout: {
        title: "Why this matters to your portfolio",
        body: "You don't need to know which AI app wins. You need to know whether AI in aggregate keeps consuming more hardware. If the answer is yes, MU, VRT, and BE benefit roughly proportionally — regardless of whether OpenAI, Anthropic, or Google leads on any given month.",
      },
    },
    {
      id: 2,
      slug: "why-gpus",
      title: "Why GPUs Became the Engine",
      dek: "An accident of video games that became the foundation of an industry.",
      readMin: 6,
      tag: "MENTAL MODEL",
      sections: [
        {
          heading: "GPUs were not built for AI",
          body: "Graphics Processing Units were originally designed in the 1990s and 2000s to render video game graphics. Every pixel on a screen has to be calculated independently and at the same time, so GPU designers built chips that could do thousands of small math operations in parallel. CPUs, by contrast, were built to do one complex thing very fast, then move to the next.\n\nBy the late 2000s, researchers noticed that the math required to train neural networks looked suspiciously like the math required to render graphics: lots of small, independent multiplications happening in parallel. They started running AI workloads on gaming GPUs. It was several orders of magnitude faster than running them on CPUs. That was the start.",
        },
        {
          heading: "The CUDA moat — why NVIDIA, specifically",
          body: "NVIDIA didn't just build the fastest GPUs. In 2006 they released CUDA — a software platform that let researchers program their GPUs in a familiar language (C/C++). For the next 15+ years, every grad student and AI researcher in the world learned to program on NVIDIA hardware because that's where the libraries, tutorials, and community were.\n\nThe result: today, the entire AI ecosystem assumes NVIDIA hardware underneath. Switching costs aren't just buying a different chip — they're rewriting code, retraining engineers, and rebuilding the toolchain. AMD's hardware has gotten competitive, but software lock-in has kept NVIDIA's market share above 80% in AI accelerators.",
        },
        {
          heading: "What 'parallel' actually means in dollars",
          body: "A modern NVIDIA H100 GPU contains about 80 billion transistors and can perform roughly 2,000 trillion math operations per second. One chip costs roughly $30,000-$40,000 retail. A single AI training cluster typically uses 10,000 to 100,000+ of these chips wired together.\n\nMath check: a 25,000-GPU cluster, just for the silicon, is on the order of $750 million. That's before you count the building, the power, the cooling, the networking, and the memory. This is why hyperscaler capex is the single most important number in the AI economy.",
          mono: true,
        },
        {
          heading: "What this layer looks like below NVIDIA",
          body: "NVIDIA GPUs don't stand alone. Every GPU is fed by **HBM memory** stacked physically on top of it. Every cluster of GPUs is wired together by **NVLink and InfiniBand** networking. Every rack of clusters sits in a **data center** that needs **power and cooling** rated for densities that didn't exist five years ago.\n\nThis is the supply chain. It is the same supply chain whether the model on top is GPT-5 or Claude or Gemini or some open-weight model from a Chinese lab. That's why your bottom-half holdings don't depend on picking the AI winner.",
        },
      ],
      callout: {
        title: "Connecting to your portfolio",
        body: "Every NVIDIA chip is sold with HBM memory pre-attached (Micron, SK Hynix, or Samsung). Every chip generates 700+ watts of heat that has to be removed (Vertiv's specialty). And every cluster needs reliable, often on-site power to operate (Bloom Energy's pitch). Your three stocks aren't betting against NVIDIA — they're sitting in the lanes that NVIDIA's growth forces wider open.",
      },
    },
    {
      id: 3,
      slug: "memory-wall",
      title: "The Memory Wall — Why MU Has Pricing Power",
      dek: "The actual physics reason HBM exists, and why three companies print money making it.",
      readMin: 7,
      tag: "YOUR HOLDING · MU",
      highlightTicker: "MU",
      sections: [
        {
          heading: "The bottleneck nobody saw coming",
          body: "Here's the dirty secret of modern computing: chips have gotten phenomenally faster at doing math, but memory has not gotten phenomenally faster at delivering data to them. A modern GPU can perform math operations 100x faster than its memory can feed it data. Engineers call this the 'memory wall.'\n\nFor most of computing history, this wasn't a fatal problem because programs reused the same data many times — you could keep small bits of frequently-used data in fast on-chip caches and hide the slowness of main memory.\n\nAI broke that assumption. To produce a single output token, the model has to stream a huge fraction of its parameters from memory. There's nothing to cache cleverly — you genuinely need all of it, again and again. Memory bandwidth became the binding constraint on AI performance.",
        },
        {
          heading: "What HBM actually is",
          body: "**HBM = High Bandwidth Memory.** It is regular DRAM (the same memory technology in your laptop) but reorganized in a clever physical configuration:\n\n- Instead of placing memory chips on a separate board and connecting them with wires, HBM **stacks** memory chips vertically — 8, 12, or 16 layers high — directly on top of the GPU.\n- The stack connects to the GPU through thousands of tiny vertical wires called **through-silicon vias (TSVs)**, drilled straight through the silicon.\n- Result: dramatically more wires connecting memory to compute, dramatically shorter distances. Bandwidth jumps roughly 10x compared to traditional memory layouts.",
        },
        {
          heading: "Why this is hard to make",
          body: "HBM looks like a stack of regular memory chips. It is fiendishly difficult to manufacture:\n\n- Every layer in the stack must be near-perfect, because one bad layer ruins the whole stack.\n- The TSVs have to be drilled with sub-micron precision through silicon.\n- The thermal management is brutal — hot memory sitting on top of a hot GPU.\n- Yields (the percentage of stacks that come out usable) are much lower than for standard memory, especially for the latest generations (HBM3E and HBM4).\n\nOnly three companies in the world can produce HBM at scale: **SK Hynix** (Korea, the current leader), **Samsung** (Korea), and **Micron** (USA — your holding, ticker MU).",
          mono: true,
        },
        {
          heading: "Why MU has pricing power right now",
          body: "Three structural facts:\n\n1. **Demand is enormous and price-insensitive.** NVIDIA cannot ship a GPU without HBM. If HBM costs more, NVIDIA passes it on. The end customer (a hyperscaler) is buying a $40,000 GPU and doesn't quibble over a few hundred dollars of memory pricing.\n2. **Supply is constrained for years.** HBM capacity takes 18-24 months to build. SK Hynix and Samsung have been sold out through 2026. Micron sold out its 2025 and most of 2026 HBM3E production by mid-2024.\n3. **Three suppliers, no realistic fourth.** No new entrant can show up in this market. The capital cost of a fab is $20B+ and the manufacturing know-how takes years to develop.\n\nThis is the textbook setup for pricing power: oligopolistic supply, structural demand growth, and customers who can't substitute.",
        },
        {
          heading: "What would weaken Micron's position",
          body: "Be honest with yourself about the risks, in roughly the order of severity:\n\n- **A capacity glut.** All three players are racing to add HBM capacity. If they add too much, prices fall.\n- **Samsung catches up on quality.** Samsung has had yield problems on HBM3E. If they fix them, supply expands.\n- **A model architecture change** that needs less memory bandwidth (more on this in Chapter 7).\n- **NAND/DRAM cyclical downturn** dragging Micron's other businesses, which still account for a meaningful portion of revenue.\n\nNote that the AI demand thesis is very strong; the company-specific execution risk is what you actually have to monitor.",
        },
      ],
      callout: {
        title: "Tracking MU as an investor",
        body: "Watch four things every quarter: (1) HBM revenue as a percentage of total revenue, (2) HBM gross margins, (3) HBM3E and HBM4 qualification status with NVIDIA, (4) hyperscaler capex guidance. The first three tell you whether Micron is winning the AI memory shift. The fourth tells you whether the demand wave is still rising.",
      },
    },
    {
      id: 4,
      slug: "heat-and-power",
      title: "The Heat and Power Wall — Why VRT and BE Exist",
      dek: "AI data centers run hotter and hungrier than anything that came before.",
      readMin: 7,
      tag: "YOUR HOLDINGS · VRT, BE",
      highlightTicker: "VRT,BE",
      sections: [
        {
          heading: "The numbers that broke the old data center",
          body: "A traditional enterprise data center rack — the metal cabinet that holds servers — drew 5 to 10 kilowatts of power. An AI rack today, packed with NVIDIA GB200 systems, draws 100 to 130 kilowatts. That is more than a 10x increase in power per rack in roughly five years.\n\nPower in equals heat out. Every watt of electricity that goes into a chip comes out as heat. So an AI rack also produces more than 10x the heat of a traditional rack — concentrated in the same physical space.\n\nThe old way of cooling data centers — blowing cold air across the equipment — physically cannot remove heat that fast. It would be like trying to cool a hot stovetop with a desk fan. AI forced a generational shift in how data centers are designed and cooled.",
        },
        {
          heading: "Liquid cooling — Vertiv's market",
          body: "The new technique is **liquid cooling**: pumping a coolant (water or a specialized fluid) directly to the GPUs through plates and tubes that touch the chips. Liquid carries away heat roughly 1,000x more efficiently than air. There are several flavors — direct-to-chip cold plates, rear-door heat exchangers, full immersion — but they all require new hardware that didn't exist in old data centers.\n\n**Vertiv (VRT)** is one of the dominant suppliers of this hardware: cooling distribution units (CDUs), liquid-to-liquid heat exchangers, in-row coolers, power distribution gear, and the integrated systems that tie them together. Their competition includes Schneider Electric, Eaton, Trane, Johnson Controls, and several smaller specialists.\n\nVRT's pitch isn't 'we make the best cold plate.' It's 'we ship the integrated thermal + power system that lets a hyperscaler stand up a 100MW AI campus on a deadline.' Integration and execution speed are the moat.",
        },
        {
          heading: "Power — the new hard limit",
          body: "Cooling is solvable with engineering. **Power availability is solvable with electrical grid expansion** — and that is much, much harder. Building new high-voltage transmission lines in the United States routinely takes 7-10 years. Building a new natural gas peaker plant takes 3-5. Hooking a new substation into an existing grid can take 2-4 years just for utility approval.\n\nMeanwhile, hyperscalers want to bring AI campuses online in 18-24 months. That timeline mismatch is the constraint that's now defining where AI gets built. You're seeing data centers placed in West Texas, Wyoming, North Dakota, Iceland — anywhere with cheap, available power and permitting flexibility.",
        },
        {
          heading: "On-site power generation — Bloom Energy's market",
          body: "If you can't wait for the utility, you bring your own power. **Bloom Energy (BE)** sells solid-oxide fuel cells — modular, on-site power generators that run on natural gas (or hydrogen) and produce electricity through an electrochemical reaction rather than combustion.\n\nWhy this matters for AI:\n\n- **Speed.** A Bloom installation can be deployed in 90 days, vs. years for grid expansion or a new gas plant.\n- **Reliability.** Fuel cells are inherently more reliable than the grid for mission-critical AI workloads.\n- **Permitting.** They are easier to permit than a combustion plant in many jurisdictions.\n- **Density.** They produce a lot of power in a small footprint, which matters when you're co-locating with the data center itself.\n\nThe key 2024-2025 catalyst was Bloom's announcement that AEP (a major Ohio utility) committed to up to a gigawatt of Bloom fuel cells specifically for data center customers. That validated Bloom as a real solution at hyperscaler scale, not a niche player.",
        },
        {
          heading: "Why Vertiv and Bloom are different bets",
          body: "These are NOT redundant positions. They sit in adjacent markets:\n\n- **Vertiv** is cooling and power-distribution infrastructure *inside* the data center. Their revenue grows with **rack density** and **new builds**.\n- **Bloom Energy** is electricity generation, which is *upstream* of the data center. Their revenue grows when grid power becomes the binding constraint and customers are willing to pay a premium to avoid waiting.\n\nVertiv is a more proven business model with a clearer current revenue ramp. Bloom is more speculative — a real catalyst (AEP) with longer-dated upside if behind-the-meter power becomes the standard for AI.",
        },
      ],
      callout: {
        title: "Tracking VRT and BE",
        body: "VRT: watch backlog (orders booked but not yet shipped), book-to-bill ratio, and liquid cooling as a percentage of mix. BE: watch acceptance volumes (units actually delivered to customers), the AEP rollout pace, and any new utility or hyperscaler announcements. For both, hyperscaler capex guidance is the master signal.",
      },
    },
    {
      id: 5,
      slug: "manufacturing-chain",
      title: "The Manufacturing Chain — Stocks You Should Understand But Don't Own",
      dek: "TSMC, ASML, Applied Materials, Lam Research, KLA. Upstream of everything you do own.",
      readMin: 6,
      tag: "CONTEXT",
      sections: [
        {
          heading: "Why bother learning these",
          body: "You don't own these stocks (yet, at least), but you should understand them because they sit upstream of every chip your three companies depend on. If TSMC has a yield problem, NVIDIA GPU shipments slow, HBM demand softens, and rack deliveries get pushed out. Your portfolio doesn't move because of TSMC stock — it moves because TSMC's operations affect downstream demand.\n\nThink of these as 'macro signals dressed up as companies.'",
        },
        {
          heading: "TSMC — the foundry that makes everything",
          body: "**Taiwan Semiconductor Manufacturing Company** is a 'pure-play foundry,' meaning it doesn't design chips — it just manufactures them for other companies. NVIDIA designs the H100 and B200, but TSMC physically fabricates them. Same for AMD, Apple, Qualcomm, Broadcom, and most fabless semiconductor companies.\n\nTSMC controls roughly 70% of global foundry revenue and approximately 90%+ of the most advanced (3nm and below) capacity. There is no real second source for cutting-edge logic. Samsung Foundry tries; their yields lag. Intel Foundry is being built up; not yet competitive at the leading edge.\n\nThe geopolitical concentration in Taiwan is the single biggest tail risk for your portfolio that has nothing to do with AI itself. A serious disruption — political, military, or natural — would ripple through every layer of the stack within weeks.",
        },
        {
          heading: "ASML — the EUV monopoly",
          body: "Modern leading-edge chips require **Extreme Ultraviolet Lithography (EUV)** — a manufacturing technique that uses 13.5-nanometer-wavelength light to print circuit features smaller than 5 nanometers. The machines that produce this light are made by exactly one company in the world: **ASML**, headquartered in the Netherlands.\n\nAn EUV machine costs roughly $200 million, weighs 200+ tons, and ships in pieces on multiple cargo planes. ASML produces only 50-60 systems per year, and demand vastly exceeds supply. Every TSMC, Samsung, and Intel leading-edge fab is built around ASML machines.\n\nThis is the cleanest monopoly in modern technology. Worth tracking even if you don't own it.",
        },
        {
          heading: "Applied Materials, Lam Research, KLA, Tokyo Electron — the WFE oligopoly",
          body: "Beyond ASML lithography, fabs need dozens of other types of equipment: deposition tools, etch tools, ion implant, polishing, inspection. This category is called **WFE — Wafer Fab Equipment**. Four companies dominate:\n\n- **Applied Materials (AMAT)** — broadest portfolio, the IBM of fab tools.\n- **Lam Research (LRCX)** — etch and deposition specialist, particularly strong on memory (so disproportionate exposure to HBM build-out).\n- **KLA (KLAC)** — process control and inspection. If a wafer has defects, KLA finds them.\n- **Tokyo Electron (TEL, Japan)** — coater/developer leader, deposition.\n\nWhen you read 'AI capex,' a meaningful portion is hyperscaler servers — but a separate, parallel capex cycle is **fab capex**: TSMC, Samsung, Micron, SK Hynix, Intel all building new fabs to meet AI demand. That capex flows directly to AMAT, LRCX, KLAC, TEL.",
        },
        {
          heading: "How this layer connects to your portfolio",
          body: "TSMC bottlenecks → fewer NVIDIA GPUs → less HBM demand → softer Micron pricing.\nASML bottlenecks → fewer leading-edge wafers → general supply pressure.\nLam Research bookings → leading indicator of memory capex → leading indicator of HBM supply.\n\nReading these companies' earnings calls is reading a forward look at the supply side of your demand-side bets.",
        },
      ],
      callout: {
        title: "Practical tip",
        body: "Read the TSMC monthly revenue release (the 10th of each month) and the ASML quarterly bookings number. These two data points alone give you a strong forward read on the entire upstream supply situation that your three holdings depend on.",
      },
    },
    {
      id: 6,
      slug: "signals-to-watch",
      title: "Signals to Watch — A Quarterly Routine",
      dek: "What to actually track as the seasons turn, ranked by importance.",
      readMin: 6,
      tag: "ACTIONABLE",
      sections: [
        {
          heading: "The master signal: hyperscaler capex",
          body: "**This is the single most important number in the AI economy.** Microsoft, Amazon, Google (Alphabet), and Meta together spend more than $300 billion in annual capital expenditures, the majority of which now goes to AI infrastructure.\n\nEvery quarter, each of these four companies reports its capex and gives forward guidance. When their guidance goes up, your three stocks benefit roughly simultaneously. When it goes down or even just plateaus, the entire bottom half of the stack feels it within 1-2 quarters.\n\nThe earnings cadence:\n- **Late January / late April / late July / late October** — Microsoft, Alphabet, Meta, Amazon all report.\n- Listen for the words 'capex,' 'capital expenditures,' 'data center investment,' and any forward guidance.\n- The Q4 calls (late January) usually include full-year guidance for the coming year — by far the highest-information event of the year.",
        },
        {
          heading: "Second-tier signals (company-specific)",
          body: "**For MU (Micron):**\n- HBM revenue and gross margin progression (in their quarterly investor materials)\n- HBM3E and HBM4 qualification status with NVIDIA\n- DRAM pricing trends (Micron's traditional business floor)\n\n**For VRT (Vertiv):**\n- Backlog and book-to-bill ratio (orders coming in vs shipping out)\n- Liquid cooling mix as percentage of revenue\n- Major hyperscaler design wins announced\n\n**For BE (Bloom Energy):**\n- Acceptance volumes (actual deliveries, not just orders)\n- AEP rollout pace and any expansion announcements\n- New utility or hyperscaler deals (the next 'AEP-sized' announcement is the catalyst)",
        },
        {
          heading: "Third-tier signals (upstream supply chain)",
          body: "Read these to understand the supply side of the equation:\n\n- **TSMC monthly revenue** (10th of each month) — leading indicator for total fab output\n- **ASML quarterly bookings** — leading indicator for fab capacity additions 12-18 months out\n- **NVIDIA quarterly earnings** — bellwether for the demand side; their backlog comments tell you whether the demand wave is accelerating\n- **SK Hynix and Samsung memory commentary** — their HBM capacity guidance directly affects MU's pricing power",
        },
        {
          heading: "Putting it into a quarterly routine",
          body: "**Once per quarter, set aside 2-3 hours and walk through this checklist:**\n\n1. Read the four hyperscaler capex sections from their earnings releases. Note any direction changes.\n2. Read your three companies' quarterly results, focusing on the metrics above.\n3. Read NVIDIA's quarterly results for demand signal.\n4. Skim TSMC and ASML for supply signal.\n5. Write down, in two sentences each: **what changed**, and **what would change my mind**.\n\nThat last sentence is the most important habit you can develop. If you can't articulate what would change your mind on a thesis, you're not investing — you're hoping.",
        },
      ],
      callout: {
        title: "The morning briefing",
        body: "You already have a recurring weekday 7 AM ET briefing covering the broader AI infrastructure stack. The quarterly routine above is the deep-dive complement: weekly noise gets filtered by the briefing, quarterly fundamentals get audited by you.",
      },
    },
    {
      id: 7,
      slug: "what-could-break",
      title: "What Could Break the Thesis",
      dek: "An honest accounting of the risks that deserve respect.",
      readMin: 7,
      tag: "RISK",
      sections: [
        {
          heading: "Why this chapter exists",
          body: "Every investment thesis has a failure mode. The investors who survive long-term are the ones who can articulate their failure mode out loud — clearly, without flinching, before it happens. The ones who can't are the ones who get blindsided.\n\nHere are the four scenarios that could break the picks-and-shovels thesis on MU, VRT, and BE, ranked by severity.",
        },
        {
          heading: "Risk 1: The efficiency breakthrough (the DeepSeek scenario)",
          body: "**This is the scenario that deserves the most respect.** In late 2024 / early 2025, the Chinese lab DeepSeek released a model that achieved frontier-class performance using a fraction of the training compute that OpenAI and Anthropic had spent. The market briefly panicked. NVIDIA fell 17% in a single day.\n\nThe question DeepSeek raised: **what if AI gets dramatically more efficient at the algorithmic level?** What if a future model architecture needs less memory bandwidth, less power, less hardware overall? Picks-and-shovels companies depend on AI being hardware-hungry. If AI suddenly becomes lean, the whole demand wave softens.\n\nWhat actually happened next: demand kept growing anyway, because **lower per-query costs unlocked new use cases**. (Economists call this the Jevons paradox: efficiency gains in resource use often increase, not decrease, total consumption.) But the underlying fear is real and worth keeping in mind. If the next DeepSeek-class breakthrough is large enough, even Jevons doesn't save you.\n\n**This is the structural risk that even perfect execution by Micron, Vertiv, and Bloom couldn't offset.** It deserves your respect.",
        },
        {
          heading: "Risk 2: Capacity glut",
          body: "Three things can flood supply faster than demand can absorb it:\n\n1. All three HBM suppliers (Micron, Samsung, SK Hynix) are racing to add capacity. If they all hit their plans, HBM pricing softens.\n2. Hyperscalers occasionally over-build. AWS, Microsoft, and Google have all gone through prior 'digestion' periods where they pause new builds for 1-2 quarters.\n3. The cooling and power gear market draws new entrants. Vertiv's competition is real and growing.\n\nGlut risks are typically cyclical, not structural. They cause stock drawdowns of 30-50% but don't break the long-term thesis. The hard part is sitting through them.",
        },
        {
          heading: "Risk 3: Concentration risk in Taiwan",
          body: "Roughly 90% of leading-edge chip manufacturing happens within a few hundred kilometers of Hsinchu, Taiwan. A serious disruption — political, military, natural disaster — to TSMC operations would freeze the entire upstream supply chain.\n\nThis is the classic 'tail risk': low probability in any given year, catastrophic if it happens. Mitigation strategies: TSMC is building fabs in Arizona, Japan, and Germany. Intel and Samsung are racing to add leading-edge capacity outside Taiwan. The diversification will take years, but it is happening.\n\nFor your portfolio: a Taiwan disruption would hit MU hardest (HBM relies on TSMC packaging) and hit VRT/BE indirectly through suppressed AI build-out. Worth considering as you size positions.",
        },
        {
          heading: "Risk 4: Rate cycle and broader capex environment",
          body: "Hyperscaler capex is funded out of operating cash flow plus debt. If interest rates rise sharply or recession hits ad revenue (Google, Meta) and cloud revenue (AWS, Azure), capex gets trimmed. The bottom of the AI hardware stack is cyclical, even if the underlying demand wave is structural.\n\nThis is more of a timing risk than a thesis-breaker. Bad cycles compress the multiple your stocks trade at and create entry opportunities for patient investors.",
        },
        {
          heading: "How to think about all four together",
          body: "The honest portfolio framing:\n\n- **Risks 2, 3, and 4 are timing risks.** They cause drawdowns and create opportunities. They don't break the long-term picks-and-shovels thesis on AI as a hardware-hungry technology.\n- **Risk 1 is the actual structural risk.** If AI becomes meaningfully less hardware-hungry — through algorithmic breakthroughs, model compression, edge computing, or some combination — the demand wave softens permanently. Watch for it. Read papers. Notice if frontier labs start training meaningfully smaller models.\n\nThe best mental model: you are betting that AI's appetite for memory, power, and cooling grows faster than human ingenuity reduces it. That bet has won every year so far. It might not win every year forever.",
        },
      ],
      callout: {
        title: "What to do with this",
        body: "Don't avoid the thesis because of the risks. Investing without risk is impossible. The point is to *know* the risks, *size* positions accordingly, and *watch* for the specific signals that would tell you a risk is materializing — so you can react to evidence rather than headlines.",
      },
    },
  ],
};
