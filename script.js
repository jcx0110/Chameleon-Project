(function () {
  const data = window.SITE_DATA;

  if (!data) {
    throw new Error("SITE_DATA is missing. Check config/site-data.js");
  }

  const byId = (id) => document.getElementById(id);

  function makeButton(label, url) {
    const a = document.createElement("a");
    a.className = "btn";
    a.textContent = label;
    a.href = url || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
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
      ["Paper", data.links?.paper],
      ["Code", data.links?.code],
      ["Dataset", data.links?.dataset],
      ["Video", data.links?.video]
    ];
    items.forEach(([label, url]) => links.appendChild(makeButton(label, url)));
  }

  function renderTextBlocks() {
    byId("abstract-text").textContent = data.paper.abstract || "";
    byId("method-text").textContent = data.sections?.method || "";
    byId("results-text").textContent = data.sections?.results || "";
    byId("bibtex-box").textContent = data.paper.bibtex || "";

    const email = data.contact?.email || "your-email@example.com";
    byId("contact-note").textContent = data.contact?.note || "";
    byId("contact-email").textContent = email;
    byId("contact-email").href = `mailto:${email}`;
  }

  function renderGallery() {
    const root = byId("gallery-grid");
    const images = data.images || [];

    if (!images.length) {
      const empty = document.createElement("p");
      empty.className = "status-tag";
      empty.textContent = "No figures yet. Add items in config/site-data.js";
      root.appendChild(empty);
      return;
    }

    images.forEach((item) => {
      const card = document.createElement("article");
      card.className = "card";
      card.appendChild(
        makeMedia(item.thumbnail, "Figure placeholder", item.title || "figure")
      );

      const title = document.createElement("h3");
      title.textContent = item.title || item.id || "Untitled Figure";

      const desc = document.createElement("p");
      desc.textContent = item.description || "";

      card.appendChild(title);
      card.appendChild(desc);

      if (item.full) {
        const link = document.createElement("a");
        link.href = item.full;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "Open full image";
        card.appendChild(link);
      }

      root.appendChild(card);
    });
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
  renderGallery();
  renderDemos();
  wireCopyBibtex();
})();
