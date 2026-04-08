(function () {
  const data = window.SITE_DATA;

  if (!data) {
    throw new Error("SITE_DATA is missing. Check config/site-data.js");
  }

  const byId = (id) => document.getElementById(id);

  function makeButton(label, url, className = "btn", iconClass = "") {
    const a = document.createElement("a");
    a.className = className;
    a.href = url || "#";
    const isInPageAnchor = typeof url === "string" && url.startsWith("#");
    if (!isInPageAnchor) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }

    if (iconClass) {
      const icon = document.createElement("i");
      icon.className = `bi ${iconClass} button-icon`;
      icon.setAttribute("aria-hidden", "true");
      a.appendChild(icon);
    }

    const text = document.createElement("span");
    text.textContent = label;
    a.appendChild(text);

    return a;
  }

  function makeMedia(source, fallbackText, altText) {
    if (source) {
      const img = document.createElement("img");
      img.className = "media-box";
      img.src = source;
      img.alt = altText || "media";
      img.loading = "lazy";
      img.onerror = function onError() {
        this.replaceWith(makeMedia("", fallbackText, altText));
      };
      return img;
    }

    const div = document.createElement("div");
    div.className = "media-placeholder";
    div.textContent = fallbackText;
    return div;
  }

  function renderMeta() {
    byId("conference").textContent = data.paper.conference || "";
    byId("paper-title").textContent = data.paper.title || "Untitled";
    byId("paper-subtitle").textContent = data.paper.subtitle || "";
    byId("authors").textContent = (data.authors || [])
      .map((a) => `${a.name} (${a.affiliation})`)
      .join(" · ");

    const links = byId("quick-links");
    const items = [
      ["Code", data.links?.code, "bi-github"],
      ["Paper", data.links?.paper, "bi-file-earmark-pdf-fill"],
      ["arXiv", data.links?.arxiv, "bi-journal-text"],
      ["BibTeX", data.links?.bibtex || "#citation", "bi-quote"]
    ];
    items.forEach(([label, url, iconClass]) =>
      links.appendChild(makeButton(label, url, "btn", iconClass))
    );

    const teaserVideo = byId("teaser-video");
    teaserVideo.src = data.paper.teaser || "";
    teaserVideo.poster = data.paper.teaserPoster || "";
  }

  function renderTextBlocks() {
    byId("motivation-text").textContent = data.sections?.motivation || "";
    byId("method-text").textContent = data.sections?.method || "";
    byId("dataset-text").textContent = data.sections?.dataset || "";
    byId("acknowledgement-text").textContent =
      data.sections?.acknowledgement || "";
    byId("bibtex-box").textContent = data.paper.bibtex || "";
  }

  function renderDemos() {
    const root = byId("demo-grid");
    const demos = data.demos || [];

    if (!demos.length) {
      const empty = document.createElement("p");
      empty.className = "status-tag";
      empty.textContent = "No demos yet. Add items in config/site-data.js";
      root.appendChild(empty);
      return;
    }

    demos.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card";
      card.appendChild(
        makeMedia(item.cover, "Demo cover placeholder", item.name || "demo")
      );

      const title = document.createElement("h3");
      title.textContent = item.name || item.id || "Untitled Demo";

      const desc = document.createElement("p");
      desc.textContent = item.description || "";

      const status = document.createElement("span");
      status.className = "status-tag";
      status.textContent = `status: ${item.status || "unknown"}`;

      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(status);

      if (item.url && item.url !== "#") {
        const link = document.createElement("a");
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = item.type === "video" ? "Watch demo" : "Open demo";
        card.appendChild(document.createElement("br"));
        card.appendChild(link);
      }

      root.appendChild(card);
    });
  }

  function renderMethodMedia() {
    const methodVideo = byId("method-video");
    methodVideo.src = data.methodMedia?.video || "";
    methodVideo.poster = data.methodMedia?.poster || "";
  }

  function renderDatasetTasks() {
    const root = byId("dataset-task-grid");
    const tasks = data.datasetTasks || [];
    if (!tasks.length) {
      const empty = document.createElement("p");
      empty.className = "status-tag";
      empty.textContent = "No dataset tasks yet. Add items in config/site-data.js";
      root.appendChild(empty);
      return;
    }

    tasks.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card";
      card.appendChild(
        makeMedia(item.cover, "Task cover placeholder", item.title || "task")
      );

      const title = document.createElement("h3");
      title.textContent = item.title || "Untitled Task";
      const desc = document.createElement("p");
      desc.textContent = item.description || "";
      const link = makeButton("Open task", item.url, "btn small");

      card.appendChild(title);
      card.appendChild(desc);
      card.appendChild(link);
      root.appendChild(card);
    });
  }

  function renderMotivationGame() {
    const lanesRoot = byId("motivation-lanes");
    const game = data.motivationGame || {};
    const lanes = game.lanes || [];
    const optionLabels = game.options || [];
    const defaultAnswer = game.answer;

    byId("motivation-prompt").textContent = game.prompt || "";

    lanes.forEach((lane) => {
      const frames = lane.comic || [];
      const laneAnswer =
        lane.answer !== undefined && lane.answer !== null
          ? lane.answer
          : defaultAnswer;

      const laneNode = document.createElement("article");
      laneNode.className = "lane";

      const laneTitle = document.createElement("h3");
      laneTitle.textContent = lane.title || "Lane";
      laneNode.appendChild(laneTitle);

      const laneBody = document.createElement("div");
      laneBody.className = "lane-body";

      const carousel = document.createElement("div");
      carousel.className = "carousel";

      const prevBtn = document.createElement("button");
      prevBtn.type = "button";
      prevBtn.className = "carousel-nav carousel-prev";
      prevBtn.setAttribute("aria-label", "Previous frame");
      prevBtn.innerHTML =
        '<i class="bi bi-chevron-left" aria-hidden="true"></i>';

      const nextBtn = document.createElement("button");
      nextBtn.type = "button";
      nextBtn.className = "carousel-nav carousel-next";
      nextBtn.setAttribute("aria-label", "Next frame");
      nextBtn.innerHTML =
        '<i class="bi bi-chevron-right" aria-hidden="true"></i>';

      const carouselMain = document.createElement("div");
      carouselMain.className = "carousel-main";

      const viewport = document.createElement("div");
      viewport.className = "carousel-viewport";

      const strip = document.createElement("div");
      strip.className = "carousel-strip";
      const VISIBLE = 3;
      const cellImages = [];
      for (let c = 0; c < VISIBLE; c += 1) {
        const cell = document.createElement("div");
        cell.className = "carousel-cell";
        const img = document.createElement("img");
        img.className = "carousel-image";
        img.alt = `${lane.title || "Comic"} frame ${c + 1}`;
        img.loading = "lazy";
        cell.appendChild(img);
        strip.appendChild(cell);
        cellImages.push(img);
      }
      viewport.appendChild(strip);

      const counter = document.createElement("span");
      counter.className = "carousel-counter";

      let startIndex = 0;

      prevBtn.setAttribute("aria-label", "Show previous frames");
      nextBtn.setAttribute("aria-label", "Show next frames");

      function updateStrip() {
        if (!frames.length) {
          viewport.innerHTML = "";
          const ph = document.createElement("div");
          ph.className = "media-placeholder carousel-placeholder";
          ph.textContent = "No frames — add paths in config";
          viewport.appendChild(ph);
          counter.textContent = "";
          prevBtn.disabled = true;
          nextBtn.disabled = true;
          return;
        }

        if (!strip.parentNode) {
          viewport.innerHTML = "";
          viewport.appendChild(strip);
        }

        const len = frames.length;
        const maxStart = Math.max(0, len - VISIBLE);
        startIndex = Math.min(Math.max(0, startIndex), maxStart);

        cellImages.forEach((imgEl, i) => {
          const idx = startIndex + i;
          imgEl.onerror = function onCarouselImgError() {
            this.removeAttribute("src");
            this.style.display = "none";
            const cell = this.parentElement;
            if (!cell.querySelector(".carousel-cell-fallback")) {
              const fb = document.createElement("div");
              fb.className = "media-placeholder carousel-cell-fallback";
              fb.textContent = `Frame ${idx + 1}`;
              cell.appendChild(fb);
            }
          };
          const cell = imgEl.parentElement;
          const fb = cell.querySelector(".carousel-cell-fallback");
          if (fb) {
            fb.remove();
          }
          if (idx < len) {
            imgEl.style.display = "";
            imgEl.src = frames[idx];
          } else {
            imgEl.removeAttribute("src");
            imgEl.style.display = "none";
          }
        });

        const visibleCount = Math.min(VISIBLE, len - startIndex);
        counter.textContent = `${startIndex + 1}–${startIndex + visibleCount} / ${len}`;

        prevBtn.disabled = startIndex <= 0;
        nextBtn.disabled = startIndex >= maxStart;
      }

      prevBtn.addEventListener("click", () => {
        startIndex -= 1;
        updateStrip();
      });
      nextBtn.addEventListener("click", () => {
        startIndex += 1;
        updateStrip();
      });

      carouselMain.appendChild(viewport);
      carouselMain.appendChild(counter);
      carousel.appendChild(prevBtn);
      carousel.appendChild(carouselMain);
      carousel.appendChild(nextBtn);

      startIndex = 0;
      updateStrip();

      const laneQuiz = document.createElement("div");
      laneQuiz.className = "lane-quiz";

      const laneResult = document.createElement("p");
      laneResult.className = "lane-result";
      laneResult.setAttribute("role", "status");

      optionLabels.forEach((option) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "quiz-option";
        button.textContent = option;
        button.addEventListener("click", () => {
          if (option === laneAnswer) {
            laneResult.textContent = "Congratulations, you are lucky!";
            laneResult.dataset.state = "success";
          } else {
            laneResult.textContent = "Sorry, try again.";
            laneResult.dataset.state = "error";
          }
        });
        laneQuiz.appendChild(button);
      });

      laneQuiz.appendChild(laneResult);

      laneBody.appendChild(carousel);
      laneBody.appendChild(laneQuiz);
      laneNode.appendChild(laneBody);
      lanesRoot.appendChild(laneNode);
    });
  }

  function wireCopyBibtex() {
    const button = byId("copy-bibtex");
    button.addEventListener("click", async () => {
      const text = byId("bibtex-box").textContent || "";
      try {
        await navigator.clipboard.writeText(text);
        button.textContent = "Copied!";
      } catch (_err) {
        button.textContent = "Copy failed";
      } finally {
        window.setTimeout(() => {
          button.textContent = "Copy BibTeX";
        }, 1200);
      }
    });
  }

  renderMeta();
  renderTextBlocks();
  renderMethodMedia();
  renderDatasetTasks();
  renderMotivationGame();
  renderDemos();
  wireCopyBibtex();
})();
