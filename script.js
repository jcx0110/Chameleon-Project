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
    const optionsRoot = byId("motivation-options");
    const resultNode = byId("motivation-result");
    const game = data.motivationGame || {};
    const lanes = game.lanes || [];

    byId("motivation-prompt").textContent = game.prompt || "";

    lanes.forEach((lane) => {
      const laneNode = document.createElement("article");
      laneNode.className = "lane";

      const laneTitle = document.createElement("h3");
      laneTitle.textContent = lane.title || "Lane";
      laneNode.appendChild(laneTitle);

      const comicRow = document.createElement("div");
      comicRow.className = "comic-row";
      (lane.comic || []).forEach((frame, index) => {
        comicRow.appendChild(
          makeMedia(frame, `Frame ${index + 1} placeholder`, `${lane.title} frame`)
        );
      });
      laneNode.appendChild(comicRow);
      lanesRoot.appendChild(laneNode);
    });

    (game.options || []).forEach((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "quiz-option";
      button.textContent = option;
      button.addEventListener("click", () => {
        if (option === "I don't know") {
          resultNode.textContent = "Congratulations!";
          resultNode.dataset.state = "success";
        } else if (option === game.answer) {
          resultNode.textContent = "Congratulations, you are lucky!";
          resultNode.dataset.state = "success";
        } else {
          resultNode.textContent = "Sorry, try again.";
          resultNode.dataset.state = "error";
        }
      });
      optionsRoot.appendChild(button);
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
