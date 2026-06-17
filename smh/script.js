// ===== Holdings data =====
const HOLDINGS = [
  { tick: 'NVDA', name: 'NVIDIA', weight: 15.94, business: 'AI accelerator GPUs (H100, B200, Rubin) — the standard for training and inference.', why: 'NVDA is the single biggest beneficiary of the AI buildout. Its CUDA software ecosystem creates a moat that competitors struggle to break. <strong>Bull case:</strong> AI compute demand keeps compounding. <strong>Bear case:</strong> hyperscaler custom chips (TPU, Trainium, MTIA) eat market share.' },
  { tick: 'TSM', name: 'Taiwan Semiconductor', weight: 9.62, business: 'World\'s largest contract chip foundry. Makes ~90% of advanced chips for everyone else.', why: 'TSMC manufactures chips for NVIDIA, AMD, Apple, Broadcom — basically everyone in SMH except Intel and Micron. <strong>Bull case:</strong> raised 2026 growth to 30%+, $56B capex. <strong>Bear case:</strong> Taiwan geopolitical risk is the single biggest tail risk in the fund.' },
  { tick: 'MU', name: 'Micron Technology', weight: 8.17, business: 'Memory chips — DRAM and NAND flash. Big push into High Bandwidth Memory (HBM) for AI.', why: 'HBM is the #1 supply bottleneck in AI hardware. Micron is one of three companies (with SK Hynix and Samsung) making it. <strong>Bull case:</strong> HBM sold out through 2027; DRAM revenue up 177% YoY. <strong>Bear case:</strong> memory is historically the most cyclical part of semis.' },
  { tick: 'AMD', name: 'Advanced Micro Devices', weight: 7.41, business: 'CPUs (EPYC servers, Ryzen consumer) and AI GPUs (MI300, MI350) — the closest NVDA competitor.', why: 'Lisa Su has methodically grown server CPU share against Intel and is now attacking NVIDIA in AI. <strong>Bull case:</strong> hyperscalers want a second AI chip source. <strong>Bear case:</strong> still ~10× smaller AI revenue than NVDA.' },
  { tick: 'AVGO', name: 'Broadcom', weight: 7.30, business: 'Custom AI chips for hyperscalers + networking silicon. Designed Google\'s TPU.', why: 'Broadcom designs the custom AI accelerators (ASICs) for Meta, Google, ByteDance. Networking chips are essential for AI clusters. <strong>Bull case:</strong> sells custom chips to NVIDIA\'s biggest customers. <strong>Bear case:</strong> a chunk of revenue is still legacy enterprise/telecom.' },
  { tick: 'INTC', name: 'Intel', weight: 6.78, business: 'CPUs (consumer + server) and a struggling foundry business trying to compete with TSMC.', why: 'The legacy giant in turnaround mode. <strong>Bull case:</strong> US CHIPS Act backing, 18A node ramps in 2026, foundry pivot. <strong>Bear case:</strong> burning cash, losing share to AMD in CPUs and ARM-based designs, no real AI chip.' },
  { tick: 'QCOM', name: 'Qualcomm', weight: 4.58, business: 'Mobile (Snapdragon) and connectivity (5G, Wi-Fi) chips. Pushing into PCs and automotive.', why: 'Dominant in Android phone chips, but Apple is bringing modems in-house. <strong>Bull case:</strong> automotive + PC + IoT diversification working. <strong>Bear case:</strong> phone-cycle exposure, Apple modem loss.' },
  { tick: 'TXN', name: 'Texas Instruments', weight: 4.39, business: 'Analog and embedded chips — the "boring" chips that go in everything (cars, factories, appliances).', why: 'Pricing power is back: TI raised prices 4× in 2 years. Data center business grew 90% YoY in Q1. <strong>Bull case:</strong> price hikes + AI infrastructure power chips. <strong>Bear case:</strong> heavy capex on new fabs, slow auto/industrial recovery.' },
  { tick: 'LRCX', name: 'Lam Research', weight: 4.31, business: 'Semiconductor equipment — etch and deposition tools that fabs need to make chips.', why: 'One of three big equipment players (with AMAT and KLAC). <strong>Bull case:</strong> TSMC + Intel + Samsung + Micron all expanding fabs. <strong>Bear case:</strong> China revenue under export control pressure.' },
  { tick: 'KLAC', name: 'KLA Corporation', weight: 3.94, business: 'Chip inspection and metrology tools — finds defects on wafers before they become bad chips.', why: 'Highest-margin equipment company. Critical for advanced nodes where defect rates kill yields. <strong>Bull case:</strong> indispensable for 2nm and beyond. <strong>Bear case:</strong> small market, fewer customers as fabs consolidate.' },
  { tick: 'AMAT', name: 'Applied Materials', weight: 3.88, business: 'The biggest semi equipment company. Makes deposition, etch, and CMP tools.', why: 'Broadest equipment portfolio — sells to every major fab. <strong>Bull case:</strong> $600B hyperscaler capex flows to new fabs. <strong>Bear case:</strong> 30%+ of historic revenue from China, now under restrictions.' },
  { tick: 'ASML', name: 'ASML Holding', weight: 3.88, business: 'Lithography machines (EUV and high-NA EUV) — the only company on Earth that can make them. Dutch.', why: 'Monopoly on the machines needed to make leading-edge chips. Each EUV machine costs ~$300M. <strong>Bull case:</strong> literal monopoly with multi-year backlog. <strong>Bear case:</strong> Dutch export rules to China; cyclical order patterns.' },
  { tick: 'ADI', name: 'Analog Devices', weight: 3.75, business: 'Analog and mixed-signal chips for industrial, automotive, and AI power delivery.', why: 'Bought Empower Semiconductor in May 2026 for $1.5B — targeting AI power delivery bottlenecks. <strong>Bull case:</strong> AI data center power chips. <strong>Bear case:</strong> industrial end-market weakness lingers.' },
  { tick: 'MRVL', name: 'Marvell Technology', weight: 3.29, business: 'Custom ASIC chips for cloud AI, plus networking and storage silicon.', why: 'Second-biggest custom AI chip designer after Broadcom. Major Amazon Trainium business. <strong>Bull case:</strong> custom AI silicon growing 3-digit %. <strong>Bear case:</strong> revenue concentration in 2-3 hyperscaler customers.' },
  { tick: 'CDNS', name: 'Cadence Design Systems', weight: 2.29, business: 'Software for designing chips (EDA — Electronic Design Automation). Plus IP licensing.', why: 'Every chip company uses Cadence or Synopsys to design their chips. <strong>Bull case:</strong> more chip designs = more EDA license revenue. <strong>Bear case:</strong> high valuation, slowing seat-license growth in mature markets.' }
];

// ===== Render holdings grid =====
const grid = document.getElementById('holdingsGrid');
HOLDINGS.forEach((h, i) => {
  const btn = document.createElement('button');
  btn.className = 'h-chip';
  btn.dataset.idx = i;
  btn.innerHTML = `
    <div class="h-chip-tick">${h.tick}</div>
    <div class="h-chip-weight">${h.weight.toFixed(2)}%</div>
    <div class="h-chip-name">${h.name}</div>
    <div class="h-chip-bar" style="width:${(h.weight / 16) * 100}%"></div>
  `;
  btn.addEventListener('click', () => selectHolding(i));
  grid.appendChild(btn);
});

function selectHolding(i) {
  const h = HOLDINGS[i];
  document.querySelectorAll('.h-chip').forEach(c => c.classList.remove('active'));
  document.querySelector(`.h-chip[data-idx="${i}"]`).classList.add('active');
  const detail = document.getElementById('holdingDetail');
  detail.innerHTML = `
    <div class="hd-head">
      <div>
        <div class="hd-name">${h.name}</div>
        <div class="hd-ticker">NASDAQ: ${h.tick}</div>
      </div>
      <div class="hd-weight-box">${h.weight.toFixed(2)}% of fund</div>
    </div>
    <div class="hd-business"><strong>What they do:</strong> ${h.business}</div>
    <div class="hd-why"><strong>Why it matters:</strong> ${h.why}</div>
  `;
  detail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Auto-select NVDA on load to show what the panel looks like
selectHolding(0);

// ===== Buy simulator =====
const SHARE_PRICE = 609.45;
const simRows = document.getElementById('simRows');
HOLDINGS.slice(0, 15).forEach(h => {
  const dollarVal = (SHARE_PRICE * h.weight / 100).toFixed(2);
  const row = document.createElement('div');
  row.className = 'sim-row';
  row.innerHTML = `
    <span class="sim-ticker">${h.tick}</span>
    <span class="sim-name">${h.name}</span>
    <span class="sim-val">$${dollarVal}</span>
  `;
  simRows.appendChild(row);
});

// ===== Concentration bar =====
const concBar = document.getElementById('concBar');
const concData = [
  { tick: 'NVDA', pct: 15.94, cls: 'nvda' },
  { tick: 'TSM', pct: 9.62, cls: 'tsm' },
  { tick: 'MU', pct: 8.17, cls: 'mu' },
  { tick: 'AMD', pct: 7.41, cls: 'amd' },
  { tick: 'AVGO', pct: 7.30, cls: 'avgo' },
  { tick: 'Others', pct: 51.56, cls: 'rest' }
];
concData.forEach(c => {
  const seg = document.createElement('div');
  seg.className = `conc-seg ${c.cls}`;
  seg.style.width = `${c.pct}%`;
  seg.innerHTML = `<div class="seg-tick">${c.tick}</div><div class="seg-pct">${c.pct.toFixed(1)}%</div>`;
  concBar.appendChild(seg);
});

// ===== Nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.addEventListener('click', e => {
    if (e.target.tagName === 'A') navLinks.classList.remove('open');
  });
}

// ===== Smooth scroll =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id.length > 1) {
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// ===== Performance chart =====
function drawChart() {
  const canvas = document.getElementById('perfChart');
  if (!canvas) return;
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);

  const W = rect.width, H = rect.height;
  const pad = { l: 40, r: 14, t: 14, b: 24 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;

  // 13 months: Jun 2025 → Jun 2026. SMH ends +125%
  const smh = [0, 8, 22, 18, 30, 40, 55, 50, 35, 60, 90, 105, 125];
  const ndx = [0, 5, 12, 9, 16, 22, 25, 24, 22, 28, 32, 35, 38];
  const spx = [0, 4, 8, 6, 11, 14, 16, 15, 14, 18, 21, 23, 25];

  const months = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May','Jun'];
  const minY = -10, maxY = 140;

  ctx.strokeStyle = '#182238';
  ctx.lineWidth = 1;
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillStyle = '#6f7e93';

  for (let g = 0; g <= 4; g++) {
    const yVal = minY + (maxY - minY) * (g / 4);
    const y = pad.t + plotH - ((yVal - minY) / (maxY - minY)) * plotH;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(W - pad.r, y);
    ctx.stroke();
    ctx.fillText(`${yVal.toFixed(0)}%`, 4, y + 4);
  }

  for (let i = 0; i < months.length; i += 2) {
    const x = pad.l + (i / (months.length - 1)) * plotW;
    ctx.fillText(months[i], x - 8, H - 6);
  }

  function plot(data, color, lw = 2.2, glow = false) {
    if (glow) {
      ctx.shadowColor = color;
      ctx.shadowBlur = 8;
    }
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lw;
    ctx.lineJoin = 'round';
    data.forEach((v, i) => {
      const x = pad.l + (i / (data.length - 1)) * plotW;
      const y = pad.t + plotH - ((v - minY) / (maxY - minY)) * plotH;
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.shadowBlur = 0;

    const lastX = pad.l + plotW;
    const lastY = pad.t + plotH - ((data[data.length - 1] - minY) / (maxY - minY)) * plotH;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Zero baseline
  const yZero = pad.t + plotH - ((0 - minY) / (maxY - minY)) * plotH;
  ctx.strokeStyle = '#2a3a52';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(pad.l, yZero);
  ctx.lineTo(W - pad.r, yZero);
  ctx.stroke();
  ctx.setLineDash([]);

  plot(spx, '#c4cdd6');
  plot(ndx, '#a78bfa');
  plot(smh, '#00d4ff', 2.6, true);
}
drawChart();
window.addEventListener('resize', drawChart);

// ===== Quiz =====
const answers = {};
document.querySelectorAll('.q').forEach(q => {
  const qIdx = q.dataset.q;
  q.querySelectorAll('.q-opts button').forEach(b => {
    b.addEventListener('click', () => {
      q.querySelectorAll('.q-opts button').forEach(x => x.classList.remove('selected'));
      b.classList.add('selected');
      answers[qIdx] = parseInt(b.dataset.val);
      updateResult();
    });
  });
});

function updateResult() {
  if (Object.keys(answers).length < 5) return;
  const total = Object.values(answers).reduce((a, b) => a + b, 0);
  const el = document.getElementById('quizResult');

  let title, body;
  if (total >= 8) {
    title = 'Strong fit — SMH could belong in your thematic sleeve';
    body = "Your answers match the SMH profile: long horizon, conviction in AI compute demand, comfortable with concentration in NVDA, and treating this as one part of a diversified portfolio. <strong>Suggested approach:</strong> consider dollar-cost averaging in over 3–6 months rather than buying a full position at once — semis can drop 20% in a week. Cap thematic ETFs at ~5–10% of total portfolio. Set a quarterly thesis check: are hyperscaler capex commitments still growing? Is TSMC's growth outlook holding?";
  } else if (total >= 5) {
    title = 'Mixed fit — start small or wait for a pullback';
    body = "Some answers fit, others raise flags. SMH's 51× P/E and 1.34 beta don't forgive uncertainty. <strong>Options:</strong> (a) buy a smaller position than originally planned — even 1–2% of portfolio gives you exposure without devastating risk; (b) wait for a 15–20% pullback — SMH has had multiple this year; (c) consider a broader tech ETF (like QQQ or VGT) for some semi exposure with less concentration risk.";
  } else {
    title = 'Likely not a fit right now';
    body = "Your answers suggest SMH's volatility, concentration, or thematic risk doesn't match where you are as an investor. That's not a bad thing. <strong>Alternatives:</strong> (a) a broad-market ETF like VTI/VOO captures semis at a sensible weight (~5–7%); (b) QQQ or VGT for tech exposure with more diversification; (c) wait until you have a longer time horizon and clearer view on the AI cycle.";
  }

  el.innerHTML = `
    <div class="result-score">${total}/10</div>
    <div class="result-title">${title}</div>
    <div class="result-body">${body}<br><br><em style="color:#6f7e93">This is educational, not financial advice. Talk to a fiduciary before making any large allocation decision.</em></div>
  `;
  el.classList.add('show');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
