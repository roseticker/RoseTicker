// ===== Nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.addEventListener('click', e => {
    if (e.target.tagName === 'A') navLinks.classList.remove('open');
  });
}

// ===== Smooth scroll for in-page links =====
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

// ===== Performance chart (vanilla canvas) =====
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
  const pad = { l: 38, r: 14, t: 12, b: 24 };
  const plotW = W - pad.l - pad.r;
  const plotH = H - pad.t - pad.b;

  // Simulated monthly returns (cumulative % from baseline). 13 months: May'25 → May'26
  // RSI ends +123.8%, Nasdaq +34.6%, S&P +23.3%
  const rsi  = [0, 8, 18, 12, 25, 38, 45, 60, 72, 85, 95, 110, 123.8];
  const ndx  = [0, 4, 9, 6, 12, 18, 16, 22, 25, 28, 30, 32, 34.6];
  const spx  = [0, 3, 6, 4, 9, 12, 11, 15, 17, 19, 21, 22, 23.3];

  const months = ['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];
  const minY = -10, maxY = 140;

  // Axes / gridlines
  ctx.strokeStyle = '#1c2330';
  ctx.lineWidth = 1;
  ctx.font = '11px "JetBrains Mono", monospace';
  ctx.fillStyle = '#7b8696';

  for (let g = 0; g <= 4; g++) {
    const yVal = minY + (maxY - minY) * (g / 4);
    const y = pad.t + plotH - ((yVal - minY) / (maxY - minY)) * plotH;
    ctx.beginPath();
    ctx.moveTo(pad.l, y);
    ctx.lineTo(W - pad.r, y);
    ctx.stroke();
    ctx.fillText(`${yVal.toFixed(0)}%`, 4, y + 4);
  }

  // X labels (every 2 months)
  for (let i = 0; i < months.length; i += 2) {
    const x = pad.l + (i / (months.length - 1)) * plotW;
    ctx.fillText(months[i], x - 8, H - 6);
  }

  function plot(data, color, lw = 2.2) {
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

    // Endpoint dot
    const lastX = pad.l + plotW;
    const lastY = pad.t + plotH - ((data[data.length - 1] - minY) / (maxY - minY)) * plotH;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(lastX, lastY, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  // Zero baseline
  const yZero = pad.t + plotH - ((0 - minY) / (maxY - minY)) * plotH;
  ctx.strokeStyle = '#2a3344';
  ctx.setLineDash([4, 4]);
  ctx.beginPath();
  ctx.moveTo(pad.l, yZero);
  ctx.lineTo(W - pad.r, yZero);
  ctx.stroke();
  ctx.setLineDash([]);

  plot(spx, '#f4c97a');
  plot(ndx, '#8aa9ff');
  plot(rsi, '#7dd3a4', 2.6);
}
drawChart();
window.addEventListener('resize', drawChart);

// ===== Financials toggle =====
const finData = {
  'q1-2025': {
    label: 'Q1 2025',
    metrics: [
      { label: 'Total revenue', val: '$262.4M', change: '+34% YoY', up: true, note: 'Strong growth pre-leverage breakout.' },
      { label: 'Adjusted EBITDA', val: '$33.2M', change: '', up: true, note: 'Margin profile improving.' },
      { label: 'Net income', val: '$11.2M', change: '', up: true, note: 'Profitable but small.' },
      { label: 'Marketing spend', val: '$38.8M', change: '14.8% of revenue', up: false, note: 'Higher acquisition costs.' },
      { label: 'North America MAUs', val: '205K', change: '', up: true, note: 'Monthly active users.' },
      { label: 'Latin America MAUs', val: '350K', change: '', up: true, note: 'Strong LatAm base.' }
    ]
  },
  'q1-2026': {
    label: 'Q1 2026',
    metrics: [
      { label: 'Total revenue', val: '$370.4M', change: '+41% YoY', up: true, note: 'Beat analyst expectations of ~$330M.' },
      { label: 'Adjusted EBITDA', val: '$60.2M', change: '+81% YoY', up: true, note: 'Profit growing 2× faster than revenue.' },
      { label: 'Net income', val: '$26.2M', change: '+134% YoY', up: true, note: 'The operating leverage payoff.' },
      { label: 'Marketing spend', val: '$46.2M', change: '12.5% of revenue', up: true, note: 'Lower % = more efficient.' },
      { label: 'North America MAUs', val: '296K', change: '+44% YoY', up: true, note: 'Healthy player growth.' },
      { label: 'Latin America MAUs', val: '543K', change: '+55% YoY', up: true, note: 'Mexico + Colombia engines.' }
    ]
  },
  'compare': {
    label: 'Side-by-side',
    compare: true,
    metrics: [
      { label: 'Total revenue', old: '$262.4M', new: '$370.4M', change: '+41.1%', note: 'Scale unlocking.' },
      { label: 'Adjusted EBITDA', old: '$33.2M', new: '$60.2M', change: '+81.3%', note: 'Profit grew 2× faster than revenue.' },
      { label: 'Net income', old: '$11.2M', new: '$26.2M', change: '+134.0%', note: 'Profit grew 3.3× faster than revenue.' },
      { label: 'Marketing %', old: '14.8%', new: '12.5%', change: '−2.3 pts', note: 'Acquiring users more cheaply.' },
      { label: 'North America MAUs', old: '205K', new: '296K', change: '+44.4%', note: '' },
      { label: 'Latin America MAUs', old: '350K', new: '543K', change: '+55.1%', note: '' }
    ]
  }
};

function renderFin(key) {
  const grid = document.getElementById('finGrid');
  const data = finData[key];
  grid.innerHTML = '';
  data.metrics.forEach(m => {
    const c = document.createElement('div');
    c.className = 'fin-card' + (data.compare ? ' compare' : '');
    if (data.compare) {
      c.innerHTML = `
        <div class="fin-label">${m.label}</div>
        <div class="fin-compare">
          <span class="old">${m.old}</span>
          <span class="arrow">→</span>
          <span class="new">${m.new}</span>
        </div>
        <div class="fin-change up">${m.change}</div>
        ${m.note ? `<div class="fin-note">${m.note}</div>` : ''}
      `;
    } else {
      c.innerHTML = `
        <div class="fin-label">${m.label}</div>
        <div class="fin-val">${m.val}</div>
        ${m.change ? `<div class="fin-change ${m.up ? 'up' : 'down'}">${m.change}</div>` : ''}
        ${m.note ? `<div class="fin-note">${m.note}</div>` : ''}
      `;
    }
    grid.appendChild(c);
  });
}
renderFin('q1-2025');

document.querySelectorAll('.toggle-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderFin(btn.dataset.q);
  });
});

// ===== Region tabs =====
document.querySelectorAll('.region-tab').forEach(t => {
  t.addEventListener('click', () => {
    document.querySelectorAll('.region-tab').forEach(x => x.classList.remove('active'));
    t.classList.add('active');
    const region = t.dataset.region;
    document.getElementById('naMarkets').classList.toggle('hidden', region !== 'na');
    document.getElementById('laMarkets').classList.toggle('hidden', region !== 'la');
  });
});

// ===== Tooltips for inline terms =====
const tooltipDefs = {
  'operating-leverage': 'When revenue grows faster than costs, so profit grows much faster than revenue. RSI grew profit 3.3× faster than revenue last quarter.',
  'discount-rate': 'How much less a future dollar is worth today. When interest rates rise, future profits get discounted more — so high-growth stocks fall, even with great earnings.',
  'mau': 'Monthly Active Users. How many unique people used the app at least once in a month. The key engagement metric in online gaming.'
};

const tooltip = document.getElementById('tooltip');
document.querySelectorAll('.term').forEach(t => {
  const key = t.dataset.term;
  const text = tooltipDefs[key];
  if (!text) return;
  t.addEventListener('mouseenter', e => {
    tooltip.textContent = text;
    tooltip.classList.add('show');
  });
  t.addEventListener('mousemove', e => {
    const x = Math.min(e.clientX + 14, window.innerWidth - 300);
    const y = e.clientY + 18;
    tooltip.style.left = x + 'px';
    tooltip.style.top = y + 'px';
  });
  t.addEventListener('mouseleave', () => tooltip.classList.remove('show'));
  // Touch
  t.addEventListener('click', e => {
    e.preventDefault();
    tooltip.textContent = text;
    tooltip.classList.toggle('show');
    const r = t.getBoundingClientRect();
    tooltip.style.left = r.left + 'px';
    tooltip.style.top = (r.bottom + 8) + 'px';
  });
});

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
  const total = Object.values(answers).reduce((a, b) => a + b, 0); // 0-10
  const el = document.getElementById('quizResult');

  let title, body;
  if (total >= 8) {
    title = 'Strong fit — RSI could belong in your spicy slice';
    body = "You've got the time horizon, the stomach for volatility, the conviction on iGaming legalization, and you're treating this as one slice of a diversified portfolio. That's the textbook profile for a high-risk, high-growth holding like RSI. <strong>Suggested next steps:</strong> decide your position size (most pros cap a single growth stock at 3-5% of total portfolio), set a thesis you'll check quarterly (revenue growth ≥30%? EBITDA margin expanding?), and don't average down on bad news without re-validating the thesis.";
  } else if (total >= 5) {
    title = 'Mixed fit — proceed carefully or wait';
    body = "Some of your answers fit the RSI profile, others raise yellow flags. A 76× P/E doesn't forgive uncertainty. <strong>Options to consider:</strong> (a) wait for a pullback — RSI has had multiple 20%+ drawdowns even during this rally; (b) buy a much smaller position than you originally planned; (c) get more comfortable with the business by paper-trading or following it for a quarter first. Don't let FOMO drive a size you can't sit through.";
  } else {
    title = 'Likely not a fit right now';
    body = "Your answers suggest this stock's volatility, valuation, or industry don't match where you are as an investor. That's not a bad thing — there's no rule that you have to own every popular stock. <strong>Alternatives to consider:</strong> a diversified gaming/entertainment ETF (lower volatility, similar exposure), an S&P 500 index fund for the bulk of equity exposure, or simply wait until you have a longer time horizon and more conviction.";
  }

  el.innerHTML = `
    <div class="result-score">${total}/10</div>
    <div class="result-title">${title}</div>
    <div class="result-body">${body}<br><br><em style="color:#7b8696">This is educational, not financial advice. Talk to a fiduciary before making any large allocation decision.</em></div>
  `;
  el.classList.add('show');
  el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
