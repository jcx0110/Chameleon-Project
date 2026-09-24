(function () {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) {
    throw new Error("SITE_DATA is missing. Check config/site-data.js");
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const byId = (id) => document.getElementById(id);

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function renderMethod() {
    const steps = data.methodSteps || [];
    const tabs = document.querySelector(".method-tabs");
    const panels = [...document.querySelectorAll("[data-method-panel]")];
    const label = byId("method-detail-label");
    const title = byId("method-detail-title");
    const description = byId("method-detail-description");
    const points = byId("method-detail-points");
    const note = byId("method-detail-note");
    let activeIndex = 0;

    if (!tabs || !steps.length) return;

    const buttons = steps.map((step, index) => {
      const button = element("button", "method-tab");
      button.type = "button";
      button.role = "tab";
      button.id = `method-tab-${step.id}`;
      button.setAttribute("aria-controls", `method-panel-${step.id}`);
      button.innerHTML = `<span>${step.number}</span><strong>${step.label}</strong>`;
      button.addEventListener("click", () => activate(index));
      button.addEventListener("keydown", (event) => {
        if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
        event.preventDefault();
        let next = activeIndex;
        if (event.key === "ArrowLeft") next = (activeIndex - 1 + steps.length) % steps.length;
        if (event.key === "ArrowRight") next = (activeIndex + 1) % steps.length;
        if (event.key === "Home") next = 0;
        if (event.key === "End") next = steps.length - 1;
        activate(next, true);
      });
      tabs.appendChild(button);
      return button;
    });

    function activate(index, focus = false) {
      activeIndex = index;
      const step = steps[index];

      buttons.forEach((button, buttonIndex) => {
        const selected = buttonIndex === index;
        button.classList.toggle("is-active", selected);
        button.setAttribute("aria-selected", String(selected));
        button.tabIndex = selected ? 0 : -1;
      });

      panels.forEach((panel) => {
        const selected = panel.dataset.methodPanel === step.id;
        panel.classList.toggle("is-active", selected);
        panel.hidden = !selected;
      });

      label.textContent = `${step.number} · ${step.label}`;
      title.textContent = step.title;
      description.textContent = step.description;
      points.replaceChildren(
        ...(step.points || []).map((point) => element("li", "", point))
      );
      note.textContent = step.note;

      if (focus) buttons[index].focus();
    }

    activate(0);
  }

  function makeDemoMedia(item) {
    const media = element("div", "demo-media");

    if (item.mediaType === "video" && item.src) {
      const video = document.createElement("video");
      video.src = item.src;
      video.poster = item.poster || "";
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.controls = true;
      video.preload = "metadata";
      video.setAttribute("aria-label", `${item.title} demonstration`);
      media.appendChild(video);
      return media;
    }

    const visual = element("div", `task-visual task-visual-${item.id}`);
    visual.setAttribute("aria-hidden", "true");
    visual.innerHTML = `
      <div class="task-grid-lines"></div>
      <div class="task-orbit orbit-one"></div>
      <div class="task-orbit orbit-two"></div>
      <div class="task-memory-path"><i></i><i></i><i></i><i></i></div>
      <span class="task-visual-label">${item.index}</span>
    `;
    media.appendChild(visual);
    return media;
  }

  function makeDemoSlide(item, index, total) {
    const slide = element("article", "demo-slide");
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute("aria-label", `${index + 1} of ${total}: ${item.title}`);
    slide.appendChild(makeDemoMedia(item));

    const copy = element("div", "demo-copy");
    copy.appendChild(element("p", "section-kicker", item.eyebrow));
    copy.appendChild(element("h3", "", item.title));
    copy.appendChild(element("p", "demo-description", item.description));

    if (item.hiddenVariable) {
      const facts = element("dl", "demo-facts");
      [
        ["Hidden variable", item.hiddenVariable],
        ["Diagnostic", item.diagnostic],
        ["Chance", item.chance]
      ].forEach(([term, value]) => {
        facts.appendChild(element("dt", "", term));
        facts.appendChild(element("dd", "", value));
      });
      copy.appendChild(facts);
    }

    const tags = element("div", "demo-tags");
    (item.tags || []).forEach((tag) => tags.appendChild(element("span", "", tag)));
    copy.appendChild(tags);
    slide.appendChild(copy);
    return slide;
  }

  function renderDemoCarousel() {
    const items = data.demos || [];
    const track = byId("demo-track");
    const dots = byId("demo-dots");
    const prev = byId("demo-prev");
    const next = byId("demo-next");
    const toggle = byId("demo-toggle");
    const viewport = document.querySelector(".demo-viewport");
    if (!items.length || !track || !viewport) return;

    let index = 0;
    let timer = null;
    let playing = !reducedMotion;
    let pointerStart = null;

    items.forEach((item, itemIndex) => {
      track.appendChild(makeDemoSlide(item, itemIndex, items.length));
      const dot = element("button", "demo-dot");
      dot.type = "button";
      dot.setAttribute("aria-label", `Show demo ${itemIndex + 1}: ${item.title}`);
      dot.addEventListener("click", () => goTo(itemIndex, true));
      dots.appendChild(dot);
    });

    const slides = [...track.children];
    const dotButtons = [...dots.children];
    byId("demo-total").textContent = String(items.length).padStart(2, "0");

    function updateMedia() {
      slides.forEach((slide, slideIndex) => {
        const video = slide.querySelector("video");
        if (!video) return;
        if (slideIndex === index && !reducedMotion) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }

    function update() {
      track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
      byId("demo-current").textContent = String(index + 1).padStart(2, "0");
      slides.forEach((slide, slideIndex) => {
        slide.setAttribute("aria-hidden", String(slideIndex !== index));
      });
      dotButtons.forEach((dot, dotIndex) => {
        const active = dotIndex === index;
        dot.classList.toggle("is-active", active);
        dot.setAttribute("aria-current", active ? "true" : "false");
      });
      updateMedia();
    }

    function schedule() {
      window.clearInterval(timer);
      if (!playing || items.length < 2) return;
      timer = window.setInterval(() => goTo(index + 1, false), 7000);
    }

    function goTo(nextIndex, userInitiated) {
      index = (nextIndex + items.length) % items.length;
      update();
      if (userInitiated) schedule();
    }

    function setPlaying(value) {
      playing = value;
      toggle.textContent = playing ? "Pause" : "Play";
      toggle.setAttribute(
        "aria-label",
        playing ? "Pause automatic slide rotation" : "Play automatic slide rotation"
      );
      schedule();
    }

    prev.addEventListener("click", () => goTo(index - 1, true));
    next.addEventListener("click", () => goTo(index + 1, true));
    toggle.addEventListener("click", () => setPlaying(!playing));
    viewport.addEventListener("mouseenter", () => window.clearInterval(timer));
    viewport.addEventListener("mouseleave", schedule);
    viewport.addEventListener("focusin", () => window.clearInterval(timer));
    viewport.addEventListener("focusout", schedule);
    viewport.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") goTo(index - 1, true);
      if (event.key === "ArrowRight") goTo(index + 1, true);
    });
    viewport.tabIndex = 0;

    viewport.addEventListener("pointerdown", (event) => {
      pointerStart = event.clientX;
    });
    viewport.addEventListener("pointerup", (event) => {
      if (pointerStart === null) return;
      const distance = event.clientX - pointerStart;
      if (Math.abs(distance) > 45) goTo(index + (distance < 0 ? 1 : -1), true);
      pointerStart = null;
    });
    viewport.addEventListener("pointercancel", () => {
      pointerStart = null;
    });

    setPlaying(playing);
    update();
  }

  function renderResults() {
    const highlights = byId("result-highlights");
    const bars = byId("result-bars");

    (data.benchmarkHighlights || []).forEach((result) => {
      const card = element("article", "result-card");
      const value = element("p", "result-value");
      value.innerHTML = `${result.value}<small>${result.uncertainty}</small>`;
      card.appendChild(element("p", "result-benchmark", result.benchmark));
      card.appendChild(value);
      card.appendChild(element("p", "result-protocol", result.protocol));
      highlights.appendChild(card);
    });

    (data.camoResults || []).forEach((result) => {
      const row = element("div", "bar-group");
      const heading = element("div", "bar-heading");
      heading.innerHTML = `<strong>${result.metric}</strong><span>${result.label}</span>`;
      row.appendChild(heading);

      [
        ["baseline", result.baseline],
        ["ours", result.ours]
      ].forEach(([kind, value]) => {
        const line = element("div", `bar-line bar-${kind}`);
        const label = element("span", "bar-name", kind === "ours" ? "Chameleon" : "Diffusion Policy");
        const meter = element("div", "bar-meter");
        const fill = element("i", "bar-fill");
        fill.style.setProperty("--bar-value", `${value}%`);
        meter.appendChild(fill);
        const number = element("strong", "bar-value", `${value}%`);
        line.append(label, meter, number);
        row.appendChild(line);
      });

      bars.appendChild(row);
    });
  }

  function renderEvidence() {
    const root = byId("evidence-grid");
    (data.evidence || []).forEach((item) => {
      const card = element("article", "evidence-card");
      const head = element("div", "evidence-head");
      head.appendChild(element("span", "evidence-number", item.number));
      head.appendChild(element("p", "section-kicker", item.property));
      card.appendChild(head);
      card.appendChild(element("h3", "", item.title));
      card.appendChild(element("p", "evidence-body", item.body));

      const stats = element("div", "evidence-stats");
      (item.stats || []).forEach((stat) => {
        const statNode = element("div", "evidence-stat");
        statNode.appendChild(element("span", "", stat.label));
        statNode.appendChild(element("strong", "", stat.value));
        statNode.appendChild(element("small", "", stat.compare));
        stats.appendChild(statNode);
      });
      card.appendChild(stats);
      root.appendChild(card);
    });
  }

  function setupCitation() {
    const box = byId("bibtex-box");
    const button = byId("copy-bibtex");
    const buttonLabel = button.querySelector(".copy-label");
    box.textContent = data.bibtex || "";

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(data.bibtex || "");
        buttonLabel.textContent = "Copied";
      } catch (_error) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(box);
        selection.removeAllRanges();
        selection.addRange(range);
        buttonLabel.textContent = "Selected";
      }
      window.setTimeout(() => {
        buttonLabel.textContent = "Copy BibTeX";
      }, 1600);
    });
  }

  renderMethod();
  renderDemoCarousel();
  renderResults();
  renderEvidence();
  setupCitation();
})();
