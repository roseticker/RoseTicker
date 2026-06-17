// ===== Smoothie ($1,000 breakdown) =====
const SMOOTHIE = [
  { label: 'NVIDIA', val: 66.4 },
  { label: 'Apple', val: 57.4 },
  { label: 'Microsoft', val: 43.6 },
  { label: 'Amazon', val: 36.9 },
  { label: 'Alphabet', val: 32.3 },
  { label: 'Broadcom', val: 28.5 },
  { label: 'Meta', val: 19.3 },
  { label: 'Tesla', val: 17.2 },
  { label: 'Other 3,690+', val: 698.4 },
];
const smoothieEl = document.getElementById('smoothie');
const maxSm = Math.max(...SMOOTHIE.map(s => s.val));
SMOOTHIE.forEach(s => {
  const row = document.createElement('div');
  row.className = 'smoothie-row';
  row.innerHTML = `
    <div class="smoothie-label">${s.label}</div>
    <div class="smoothie-bar"><div class="smoothie-fill" style="width:${(s.val / maxSm) * 100}%"></div></div>
    <div class="smoothie-val">$${s.val.toFixed(2)}</div>
  `;
  smoothieEl.appendChild(row);
});

// ===== Sectors =====
const SECTORS = [
  { name: 'Technology', weight: 36.3, desc: 'The biggest engine of VTI by far. This is where Apple, Microsoft, NVIDIA, and the rest of the AI infrastructure boom live. Also includes cloud software, cybersecurity, and chip equipment.', ex: 'AAPL · MSFT · NVDA · AVGO · ORCL · CRM · ADBE · CSCO' },
  { name: 'Consumer Discretionary', weight: 13.6, desc: 'Companies that make money when people have extra cash to spend — cars, online shopping, restaurants, travel, fashion. Includes some quasi-tech stocks like Amazon and Tesla.', ex: 'AMZN · TSLA · HD · MCD · NKE · BKNG · LOW · TJX' },
  { name: 'Industrials', weight: 12.6, desc: 'The boring backbone of the economy — airlines, defense, machinery, railroads, logistics. Often a leading indicator of where the broader economy is heading.', ex: 'GE · CAT · UNP · BA · RTX · HON · UPS · DE' },
  { name: 'Financials', weight: 10.7, desc: 'Banks, asset managers, insurance, and payment networks. Sensitive to interest rates — when the Fed hikes, banks generally benefit from wider lending margins.', ex: 'JPM · V · MA · BAC · WFC · GS · MS · BRK.B' },
  { name: 'Health Care', weight: 9.7, desc: 'Big pharma, medical devices, health insurance, and biotech. A defensive sector — people need medicine in good times and bad. Aging demographics are a long-term tailwind.', ex: 'UNH · LLY · JNJ · ABBV · MRK · TMO · PFE · ABT' },
  { name: 'Energy', weight: 4.3, desc: 'Oil & gas producers, pipelines, refineries. Notoriously cyclical — tied to global energy prices, geopolitics, and the slow transition to renewables.', ex: 'XOM · CVX · COP · EOG · SLB · MPC · OXY · PSX' },
  { name: 'Consumer Staples', weight: 3.7, desc: 'The companies you buy from no matter what — groceries, household products, beverages, tobacco. Defensive ballast when growth stocks sell off.', ex: 'PG · KO · WMT · PEP · COST · PM · MO · CL' },
  { name: 'Utilities', weight: 2.8, desc: 'Electricity, water, natural gas distribution. Slow-growing, dividend-heavy. AI data center build-out is creating a new growth angle here (massive new power demand).', ex: 'NEE · SO · DUK · CEG · AEP · D · EXC · SRE' },
  { name: 'Real Estate', weight: 2.4, desc: 'Mostly REITs (Real Estate Investment Trusts) — companies that own buildings and pass rent income to shareholders. Data center REITs are the new tech play in this sector.', ex: 'PLD · AMT · EQIX · WELL · DLR · O · SPG · PSA' },
  { name: 'Communication Services', weight: 2.1, desc: 'Telecom, streaming, social media, and traditional media. Note: Meta and Google sit here in some classifications — when they do, this sector swells past 8%.', ex: 'GOOGL · META · NFLX · DIS · CMCSA · T · VZ · TMUS' },
  { name: 'Materials', weight: 1.8, desc: 'Mining, chemicals, packaging, construction materials. The unglamorous companies that supply raw inputs to everyone else.', ex: 'LIN · SHW · APD · ECL · FCX · NEM · DD · NUE' },
];
const sectorGrid = document.getElementById('sectorGrid');
SECTORS.forEach((s, i) => {
  const btn = document.createElement('button');
  btn.className = 'sector-tile';
  btn.dataset.idx = i;
  btn.innerHTML = `
    <div class="sector-name">${s.name}</div>
    <div class="sector-weight mono">${s.weight.toFixed(1)}%</div>
    <div class="sector-bar"><div class="sector-bar-fill" style="width:${(s.weight / 36.3) * 100}%"></div></div>
  `;
  btn.addEventListener('click', () => selectSector(i));
  sectorGrid.appendChild(btn);
});
function selectSector(i) {
  const s = SECTORS[i];
  document.querySelectorAll('.sector-tile').forEach(t => t.classList.remove('active'));
  document.querySelector(`.sector-tile[data-idx="${i}"]`).classList.add('active');
  const d = document.getElementById('sectorDetail');
  d.innerHTML = `
    <div class="sd-head">
      <div class="sd-name">${s.name}</div>
      <div class="sd-weight mono">${s.weight.toFixed(1)}% of fund</div>
    </div>
    <p class="sd-desc">${s.desc}</p>
    <div class="sd-examples"><strong>You already own:</strong> ${s.ex}</div>
  `;
}
selectSector(0);

// ===== Magnificent 7 =====
const MAG7 = [
  { tick: 'NVDA', name: 'NVIDIA', weight: 6.64, role: 'The single most important company of the 2020s. Makes the GPUs that train and run every major AI model. Has a near-monopoly on AI compute hardware. As long as AI keeps growing, NVDA keeps powering it.' },
  { tick: 'AAPL', name: 'Apple', weight: 5.74, role: 'The most profitable consumer business in history. iPhone is the cash cow; services (App Store, iCloud, ads) are the growth engine. Slowly integrating AI into devices via "Apple Intelligence."' },
  { tick: 'MSFT', name: 'Microsoft', weight: 4.36, role: 'Azure is the #2 cloud platform after AWS, and the primary distribution channel for OpenAI. Office 365 + Copilot is a quiet money printer with 400M+ paid seats.' },
  { tick: 'AMZN', name: 'Amazon', weight: 3.69, role: 'Two businesses bolted together: the e-commerce retailer (low margin, massive scale) and AWS (high margin, the #1 cloud platform). AWS is where almost all the profit comes from.' },
  { tick: 'GOOGL', name: 'Alphabet', weight: 3.23, role: 'Google Search still prints ~$300B/yr in ad revenue. YouTube is a $50B+ business. Gemini and Google Cloud are the AI plays. The DOJ antitrust case is the biggest overhang.' },
  { tick: 'AVGO', name: 'Broadcom', weight: 2.85, role: 'The "other" AI chip company. Designs custom ASICs for hyperscalers (alternatives to NVIDIA) and dominates AI networking silicon. Plus a steady enterprise software business via VMware.' },
  { tick: 'META', name: 'Meta', weight: 1.93, role: 'Instagram and Facebook still grow user count and engagement. Reality Labs (VR/AR) burns ~$15B/yr betting on the next computing platform. AI ad-targeting is the near-term margin story.' },
];
const m7Grid = document.getElementById('m7Grid');
MAG7.forEach((m, i) => {
  const btn = document.createElement('button');
  btn.className = 'm7-card';
  btn.dataset.idx = i;
  btn.innerHTML = `
    <div class="m7-tick">${m.tick}</div>
    <div class="m7-name">${m.name}</div>
    <div class="m7-weight mono">${m.weight.toFixed(2)}%</div>
  `;
  btn.addEventListener('click', () => selectM7(i));
  m7Grid.appendChild(btn);
});
function selectM7(i) {
  const m = MAG7[i];
  document.querySelectorAll('.m7-card').forEach(c => c.classList.remove('active'));
  document.querySelector(`.m7-card[data-idx="${i}"]`).classList.add('active');
  const d = document.getElementById('m7Detail');
  const dollar = (m.weight / 100 * 1000).toFixed(2);
  d.innerHTML = `
    <div class="sd-head">
      <div>
        <div class="sd-name">${m.name}</div>
        <div style="font-family:'JetBrains Mono',monospace; font-size:13px; color:var(--muted); margin-top:4px">NASDAQ/NYSE: ${m.tick}</div>
      </div>
      <div class="sd-weight mono" style="border-color:var(--gold); color:var(--gold)">${m.weight.toFixed(2)}% · $${dollar} per $1,000</div>
    </div>
    <p class="sd-desc">${m.role}</p>
  `;
}
selectM7(0);

// ===== Fees compounding =====
const annualContrib = 10000;
const growth = 0.08;
const expenseVTI = 0.0003;
const expenseActive = 0.0085;

function fv(years, expense) {
  // Future value of an annuity with fees subtracted from growth rate
  const r = growth - expense;
  const months = years * 12;
  const monthlyContrib = annualContrib / 12;
  const mr = r / 12;
  // FV = P * [((1+mr)^n - 1) / mr]
  return monthlyContrib * (Math.pow(1 + mr, months) - 1) / mr;
}

function fmt(n) {
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${Math.round(n / 1e3)}K`;
  return `$${Math.round(n)}`;
}

function drawFeesChart(years) {
  const svg = document.getElementById('feesChart');
  const w = 500, h = 220, pad = 28;
  const xs = [];
  const ysVTI = [];
  const ysActive = [];
  const points = 30;
  for (let i = 0; i <= points; i++) {
    const y = (years * i) / points;
    xs.push(y);
    ysVTI.push(fv(y, expenseVTI));
    ysActive.push(fv(y, expenseActive));
  }
  const maxY = Math.max(...ysVTI);
  const xScale = (v) => pad + ((w - 2 * pad) * v) / years;
  const yScale = (v) => h - pad - ((h - 2 * pad) * v) / maxY;
  const lineVTI = ysVTI.map((y, i) => `${xScale(xs[i])},${yScale(y)}`).join(' ');
  const lineAct = ysActive.map((y, i) => `${xScale(xs[i])},${yScale(y)}`).join(' ');

  // Y axis labels
  const yLabels = [0, maxY * 0.25, maxY * 0.5, maxY * 0.75, maxY];
  let yticks = '';
  yLabels.forEach(v => {
    yticks += `<line x1="${pad}" y1="${yScale(v)}" x2="${w - pad}" y2="${yScale(v)}" stroke="#1f2c25" stroke-width="1"/>`;
    yticks += `<text x="${pad - 6}" y="${yScale(v) + 4}" text-anchor="end" fill="#7a8378" font-size="10" font-family="JetBrains Mono">${fmt(v)}</text>`;
  });
  // X labels
  const xTicks = 5;
  let xt = '';
  for (let i = 0; i <= xTicks; i++) {
    const y = (years * i) / xTicks;
    xt += `<text x="${xScale(y)}" y="${h - 8}" text-anchor="middle" fill="#7a8378" font-size="10" font-family="JetBrains Mono">${Math.round(y)}y</text>`;
  }

  // Area fill under VTI for visual punch
  const areaVTI = `${pad},${yScale(0)} ${lineVTI} ${xScale(years)},${yScale(0)}`;

  svg.innerHTML = `
    ${yticks}
    ${xt}
    <polygon points="${areaVTI}" fill="#7fb89a" opacity="0.08"/>
    <polyline points="${lineAct}" stroke="#c98570" stroke-width="2" fill="none" stroke-dasharray="4,3"/>
    <polyline points="${lineVTI}" stroke="#7fb89a" stroke-width="2.5" fill="none"/>
    <circle cx="${xScale(years)}" cy="${yScale(ysVTI[points])}" r="4" fill="#7fb89a"/>
    <circle cx="${xScale(years)}" cy="${yScale(ysActive[points])}" r="4" fill="#c98570"/>
  `;

  document.getElementById('feeVTI').textContent = fmt(ysVTI[points]);
  document.getElementById('feeActive').textContent = fmt(ysActive[points]);
  const savings = ysVTI[points] - ysActive[points];
  document.getElementById('feeSavings').textContent = fmt(savings);
}
drawFeesChart(30);

document.querySelectorAll('#feesToggle button').forEach(b => {
  b.addEventListener('click', () => {
    document.querySelectorAll('#feesToggle button').forEach(x => x.classList.remove('active'));
    b.classList.add('active');
    drawFeesChart(parseInt(b.dataset.yrs, 10));
  });
});

// ===== Quiz =====
const answers = [null, null, null, null, null];
document.querySelectorAll('.q').forEach(qEl => {
  const qIdx = parseInt(qEl.dataset.q, 10);
  qEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      qEl.querySelectorAll('button').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      answers[qIdx] = parseInt(btn.dataset.val, 10);
      maybeRenderQuiz();
    });
  });
});
function maybeRenderQuiz() {
  if (answers.some(a => a === null)) return;
  const total = answers.reduce((a, b) => a + b, 0);
  let title, body;
  if (total <= 3) {
    title = 'VTI might not be the right fit yet';
    body = 'Your answers suggest a short horizon, low tolerance for drawdowns, or active stock-picking interest. VTI is built for long-term, hands-off compounding. <strong>Consider:</strong> a high-yield savings account or short-term bonds if your money is needed soon. If you love trading, keep doing that in a smaller "play money" account and use VTI for the core later.';
  } else if (total <= 6) {
    title = 'Decent fit — but pace yourself';
    body = 'You\'ve got the right horizon for VTI, but might struggle behaviorally during big drawdowns. <strong>Suggested approach:</strong> start with smaller automatic contributions ($200–500/month) so a -30% paper loss is survivable. Add a smaller stock-picking sleeve only after VTI feels boring (that\'s a feature, not a bug).';
  } else if (total <= 8) {
    title = 'Good fit — VTI as your core makes sense';
    body = 'Your profile lines up with what VTI was designed for: long horizon, drawdown tolerance, low maintenance preference. <strong>Suggested approach:</strong> set up automatic monthly contributions, ignore the news, and check your account no more than quarterly. Consider pairing with VXUS (international) for global exposure if you want true diversification.';
  } else {
    title = 'Textbook Boglehead — VTI was made for you';
    body = 'You\'ve got the trifecta: long horizon, ironclad behavioral discipline, and aversion to over-managing. <strong>Suggested approach:</strong> maximize tax-advantaged accounts first (401k, Roth IRA), invest as much as possible into VTI on auto-pilot, and resist every urge to "do something" during the inevitable crashes. Boring is the strategy.';
  }
  document.getElementById('quizResult').innerHTML = `
    <div class="result-score mono">${total}/10</div>
    <div class="result-title">${title}</div>
    <div class="result-body">${body}<br><br><em style="color:var(--muted)">This is educational, not financial advice. A fee-only fiduciary can model your specific situation.</em></div>
  `;
}

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});
