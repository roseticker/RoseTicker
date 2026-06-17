(function () {
  "use strict";

  const data = window.TOUR_DATA;
  const tocList = document.getElementById("tocList");
  const reader = document.getElementById("reader");
  const hero = document.getElementById("hero");
  const tocSection = document.querySelector(".toc");
  const chapterNav = document.getElementById("chapterNav");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const prevTitle = document.getElementById("prevTitle");
  const nextTitle = document.getElementById("nextTitle");
  const backToToc = document.getElementById("backToToc");
  const progressBar = document.getElementById("progressBar");

  // Reading state held in memory only — sandbox-safe.
  const readState = new Set();
  let currentChapter = null;

  /* ------------------------------------------------------------------
     Render TOC
     ------------------------------------------------------------------ */
  function renderTOC() {
    const html = data.chapters
      .map((c) => {
        const tagClass = tagClassFor(c.tag);
        return `
          <li>
            <button
              class="toc__item"
              type="button"
              data-id="${c.id}"
              data-read="${readState.has(c.id) ? "true" : "false"}"
              aria-label="Read chapter ${c.id}: ${escapeAttr(c.title)}"
            >
              <span class="toc__num" aria-hidden="true">${String(c.id).padStart(2, "0")}</span>
              <span class="toc__center">
                <span class="toc__tag ${tagClass}">${escapeHtml(c.tag)}</span>
                <h3 class="toc__name">${escapeHtml(c.title)}</h3>
                <p class="toc__dek">${escapeHtml(c.dek)}</p>
              </span>
              <span class="toc__meta">
                <span>${c.readMin} min read</span>
                <span class="toc__check" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 7"/></svg>
                </span>
              </span>
            </button>
          </li>
        `;
      })
      .join("");
    tocList.innerHTML = html;
  }

  function tagClassFor(tag) {
    if (/YOUR HOLDING/i.test(tag)) return "toc__tag--portfolio";
    if (/RISK/i.test(tag)) return "toc__tag--risk";
    return "";
  }

  /* ------------------------------------------------------------------
     Render Chapter
     ------------------------------------------------------------------ */
  function renderChapter(id) {
    const c = data.chapters.find((x) => x.id === id);
    if (!c) return;
    currentChapter = id;

    // tag class for hero of chapter
    const headerTagClass = /YOUR HOLDING/i.test(c.tag)
      ? "chapter__tag--portfolio"
      : /RISK/i.test(c.tag)
      ? "chapter__tag--risk"
      : "";

    const sectionsHtml = c.sections
      .map((s) => {
        const cls = s.mono ? "section section--mono" : "section";
        return `
          <section class="${cls}">
            <h3 class="section__heading">${escapeHtml(s.heading)}</h3>
            <div class="section__body">${renderBody(s.body)}</div>
          </section>
        `;
      })
      .join("");

    const calloutHtml = c.callout
      ? `
        <aside class="callout" aria-label="Portfolio callout">
          <div class="callout__label">${
            /YOUR HOLDING/i.test(c.tag) || /portfolio/i.test(c.callout.title)
              ? "Your portfolio"
              : "Connection"
          }</div>
          <h4 class="callout__title">${escapeHtml(c.callout.title)}</h4>
          <div class="callout__body">${renderBody(c.callout.body)}</div>
        </aside>
      `
      : "";

    reader.dataset.tag = /RISK/i.test(c.tag) ? "RISK" : "";
    reader.innerHTML = `
      <header class="chapter__head">
        <button class="chapter__crumb" type="button" data-back>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
          All chapters
        </button>
        <div class="chapter__tag ${headerTagClass}">${escapeHtml(c.tag)}</div>
        <h2 class="chapter__title">
          <span class="chapter__num">Ch. ${c.id}</span>${escapeHtml(c.title)}
        </h2>
        <p class="chapter__dek">${escapeHtml(c.dek)}</p>
        <p class="chapter__meta">${c.readMin} min read · ${c.sections.length} sections</p>
      </header>
      ${sectionsHtml}
      ${calloutHtml}
    `;

    // Wire crumb back button
    const crumb = reader.querySelector("[data-back]");
    if (crumb) crumb.addEventListener("click", goToTOC);

    // Update prev/next nav
    const prev = data.chapters.find((x) => x.id === id - 1);
    const next = data.chapters.find((x) => x.id === id + 1);
    if (prev) {
      prevBtn.disabled = false;
      prevTitle.textContent = `Ch. ${prev.id} · ${prev.title}`;
      prevBtn.dataset.id = prev.id;
    } else {
      prevBtn.disabled = true;
      prevTitle.textContent = "—";
    }
    if (next) {
      nextBtn.disabled = false;
      nextTitle.textContent = `Ch. ${next.id} · ${next.title}`;
      nextBtn.dataset.id = next.id;
    } else {
      nextBtn.disabled = true;
      nextTitle.textContent = "End of tour";
    }

    // View transitions
    hero.hidden = true;
    tocSection.hidden = true;
    reader.hidden = false;
    chapterNav.hidden = false;
    window.scrollTo({ top: 0, behavior: "instant" });

    // Mark as read shortly after open
    setTimeout(() => {
      readState.add(id);
      renderTOC();
    }, 800);

    // Update progress (proportion of chapters read)
    updateProgress();
  }

  function renderBody(text) {
    // Convert simple markdown-style **bold** and line breaks/paragraphs.
    // No external deps; safe escaping first.
    const escaped = escapeHtml(text);
    const withBold = escaped.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    const paragraphs = withBold
      .split(/\n\n+/)
      .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
      .join("");
    return paragraphs;
  }

  /* ------------------------------------------------------------------
     Progress bar — based on chapters read
     ------------------------------------------------------------------ */
  function updateProgress() {
    const total = data.chapters.length;
    const read = readState.size;
    const pct = Math.min(100, Math.round((read / total) * 100));
    progressBar.style.width = pct + "%";
  }

  /* ------------------------------------------------------------------
     Navigation
     ------------------------------------------------------------------ */
  function goToTOC() {
    reader.hidden = true;
    chapterNav.hidden = true;
    hero.hidden = false;
    tocSection.hidden = false;
    currentChapter = null;
    window.scrollTo({ top: tocSection.offsetTop - 80, behavior: "smooth" });
  }

  /* ------------------------------------------------------------------
     Theme toggle
     ------------------------------------------------------------------ */
  function setupTheme() {
    const t = document.querySelector("[data-theme-toggle]");
    const r = document.documentElement;
    let d = "dark";
    r.setAttribute("data-theme", d);
    paint();
    t.addEventListener("click", () => {
      d = d === "dark" ? "light" : "dark";
      r.setAttribute("data-theme", d);
      paint();
    });
    function paint() {
      t.setAttribute("aria-label", "Switch to " + (d === "dark" ? "light" : "dark") + " mode");
      t.innerHTML =
        d === "dark"
          ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>'
          : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    }
  }

  /* ------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------ */
  function escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
    );
  }
  function escapeAttr(s) {
    return escapeHtml(s);
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  function init() {
    setupTheme();
    renderTOC();
    updateProgress();

    tocList.addEventListener("click", (e) => {
      const item = e.target.closest(".toc__item");
      if (!item) return;
      renderChapter(+item.dataset.id);
    });

    prevBtn.addEventListener("click", () => {
      if (prevBtn.disabled) return;
      renderChapter(+prevBtn.dataset.id);
    });
    nextBtn.addEventListener("click", () => {
      if (nextBtn.disabled) return;
      renderChapter(+nextBtn.dataset.id);
    });
    backToToc.addEventListener("click", goToTOC);

    // Keyboard nav
    document.addEventListener("keydown", (e) => {
      if (currentChapter === null) return;
      if (["INPUT", "TEXTAREA"].includes((document.activeElement || {}).tagName)) return;
      if (e.key === "ArrowLeft" && !prevBtn.disabled) {
        e.preventDefault();
        renderChapter(+prevBtn.dataset.id);
      } else if (e.key === "ArrowRight" && !nextBtn.disabled) {
        e.preventDefault();
        renderChapter(+nextBtn.dataset.id);
      } else if (e.key === "Escape") {
        goToTOC();
      }
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
