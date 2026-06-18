// SPY fit-check quiz — vanilla JS, no dependencies
(function () {
  var answers = {};
  var quiz = document.getElementById('quiz');
  if (!quiz) return;

  quiz.addEventListener('click', function (e) {
    var btn = e.target.closest('button[data-v]');
    if (!btn) return;
    var qEl = btn.closest('.q');
    var q = qEl.getAttribute('data-q');

    // visually select within this question
    qEl.querySelectorAll('button').forEach(function (b) { b.classList.remove('selected'); });
    btn.classList.add('selected');

    answers[q] = btn.getAttribute('data-v');

    if (Object.keys(answers).length === 3) showResult();
  });

  function showResult() {
    var trade = 0, hold = 0;
    Object.keys(answers).forEach(function (k) {
      if (answers[k] === 'trade') trade++; else hold++;
    });

    var box = document.getElementById('result');
    var score = document.getElementById('result-score');
    var title = document.getElementById('result-title');
    var body = document.getElementById('result-body');

    if (hold >= 2) {
      score.textContent = 'VOO / IVV';
      title.textContent = 'Go with the cheaper twin';
      body.innerHTML = 'Your answers point to a <strong>long-term, buy-and-hold</strong> approach — exactly where SPY’s extra fee just costs you for nothing. Pick <strong>VOO</strong> (great at Vanguard) or <strong>IVV</strong> (great at Fidelity, Schwab, and most others); they hold the identical S&amp;P 500 for about a third of the cost. Whichever trades free at your brokerage wins.';
    } else if (trade === 3) {
      score.textContent = 'SPY';
      title.textContent = 'SPY is the right tool';
      body.innerHTML = 'You’re trading actively and value liquidity and options — that’s SPY’s home turf. Its unmatched volume, tight spreads, and deep options market are worth the higher fee when you’re moving in and out, not holding for decades.';
    } else {
      score.textContent = 'Mostly VOO / IVV';
      title.textContent = 'Lean cheap, unless you trade';
      body.innerHTML = 'You’re mixed. If most of this money is sitting and growing, default to <strong>VOO or IVV</strong> for the lower cost. Keep <strong>SPY</strong> only for the slice you actively trade or use for options.';
    }

    box.style.display = 'block';
    box.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
})();
