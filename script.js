(function () {
  "use strict";

  const data = window.SITE_DATA;
  if (!data) {
    throw new Error("SITE_DATA is missing. Check config/site-data.js");
  }

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const byId = (id) => document.getElementById(id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }


  function renderCamoTasks() {
    const root = byId("camo-tasks");
    if (!root) return;

    (data.camoTasks || []).forEach((task) => {
      const row = element("article", `camo-task camo-task-${task.id}`);

      const info = element("div", "camo-task-info");
      info.appendChild(element("h3", "", task.title));
      info.appendChild(element("p", "camo-task-question", task.question));
      const facts = element("dl", "camo-task-facts");
      [
        ["Hidden variable", task.hiddenVariable],
        ["Why it is ambiguous", task.aliasing],
        ["Diagnoses", task.diagnostic]
      ].forEach(([term, value]) => {
        const item = element("div");
        item.append(element("dt", "", term), element("dd", "", value));
        facts.appendChild(item);
      });
      info.appendChild(facts);
      const chance = element("p", "camo-task-chance");
      chance.innerHTML = `Chance <strong>${task.chance}</strong>`;
      info.appendChild(chance);
      row.appendChild(info);

      const strip = element("ol", "camo-strip");
      task.frames.forEach((frame) => {
        const item = element("li", frame.decision ? "camo-frame is-decision" : "camo-frame");
        const img = element("img");
        img.src = frame.img;
        img.alt = `${task.title}: ${frame.caption}`;
        img.loading = "lazy";
        img.width = 720;
        img.height = 441;
        item.appendChild(img);
        const label = element("p", "camo-frame-label", frame.label);
        if (frame.decision) label.appendChild(element("sup", "", "*"));
        item.appendChild(label);
        item.appendChild(element("p", "camo-frame-caption", frame.caption));
        strip.appendChild(item);
      });
      const stripWrap = element("div", "camo-strip-wrap");
      stripWrap.appendChild(strip);
      if (task.repeat) {
        const repeat = element("p", "camo-repeat");
        repeat.innerHTML = `<span aria-hidden="true">↻</span> ${task.repeat}`;
        stripWrap.appendChild(repeat);
      }
      row.appendChild(stripWrap);
      root.appendChild(row);
    });

    const note = element("p", "camo-note");
    note.innerHTML = "<sup>*</sup> Non-Markovian stage: the current frame alone does not determine the correct action.";
    root.appendChild(note);
  }

  const formatTime = (seconds) => {
    const s = Math.max(0, Math.floor(seconds || 0));
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  };

  function renderRealDemos() {
    const root = byId("real-demos");
    const groups = data.realDemos || [];
    if (!root || !groups.length) return;

    const tabs = element("div", "real-tabs");
    tabs.setAttribute("role", "tablist");
    tabs.setAttribute("aria-label", "Camo-Dataset task");
    root.appendChild(tabs);

    const player = element("div", "real-player");
    root.appendChild(player);

    const stage = element("div", "real-stage");
    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.loop = true;
    stage.appendChild(video);
    const speedBadge = element("span", "real-speed");
    stage.appendChild(speedBadge);
    const missing = element("p", "real-missing", "Video coming soon");
    stage.appendChild(missing);

    const controls = element("div", "real-controls");
    const playButton = element("button", "real-play");
    playButton.type = "button";
    const timeline = element("div", "real-timeline");
    const clock = element("span", "real-clock", "0:00");
    controls.append(playButton, timeline, clock);

    const phaseName = element("p", "real-phase-name");

    const main = element("div", "real-main");
    main.append(stage, controls, phaseName);

    const side = element("aside", "real-side");
    player.append(main, side);

    let group = null;
    let episode = null;
    let segmentNodes = [];
    let starts = [];

    function setPlaying(playing) {
      playButton.textContent = playing ? "Pause" : "Play";
      playButton.setAttribute("aria-label", playing ? "Pause video" : "Play video");
    }

    function phaseStarts() {
      const duration = video.duration || 0;
      if (episode.phases) return episode.phases;
      return group.draftPhases.map((f) => f * duration);
    }

    function layoutTimeline() {
      const duration = video.duration;
      if (!duration || !isFinite(duration)) return;
      starts = phaseStarts();
      segmentNodes.forEach((node, i) => {
        const end = i + 1 < starts.length ? starts[i + 1] : duration;
        node.style.flexGrow = String(Math.max(0.001, end - starts[i]));
      });
      updateProgress();
    }

    function currentSegment(t) {
      let index = 0;
      starts.forEach((s, i) => {
        if (t >= s) index = i;
      });
      return index;
    }

    function updateProgress() {
      const duration = video.duration;
      if (!duration || !isFinite(duration) || !starts.length) return;
      const t = video.currentTime;
      const active = currentSegment(t);
      segmentNodes.forEach((node, i) => {
        const end = i + 1 < starts.length ? starts[i + 1] : duration;
        const fill = clamp((t - starts[i]) / Math.max(0.001, end - starts[i]), 0, 1);
        node.style.setProperty("--fill", fill.toFixed(4));
        node.classList.toggle("is-active", i === active);
      });
      const seg = group.segments[active];
      phaseName.textContent = seg.label;
      phaseName.classList.toggle("is-decision", Boolean(seg.decision));
      clock.textContent = `${formatTime(t)} / ${formatTime(duration)}`;
    }

    function buildTimeline() {
      timeline.textContent = "";
      segmentNodes = group.segments.map((seg, i) => {
        const node = element("button", seg.decision ? "real-seg is-decision" : "real-seg");
        node.type = "button";
        node.style.flexGrow = "1";
        node.setAttribute("aria-label", `Jump to ${seg.label}`);
        node.appendChild(element("span", "real-seg-bar"));
        node.appendChild(element("span", "real-seg-label", seg.decision ? `${seg.short}*` : seg.short));
        node.addEventListener("click", () => {
          if (!starts.length) return;
          video.currentTime = starts[i] + 0.05;
          video.play().catch(() => {});
        });
        timeline.appendChild(node);
        return node;
      });
    }

    function loadEpisode(next) {
      episode = next;
      starts = [];
      stage.classList.remove("is-missing");
      video.poster = episode.poster || "";
      video.src = episode.src;
      video.setAttribute("aria-label", `${group.title} rollout: ${episodeLabel(episode)}`);
      speedBadge.textContent = episode.speed ? `${episode.speed} speed` : "";
      buildTimeline();
      renderSide();
      if (!reducedMotion && inView) video.play().catch(() => {});
    }

    function episodeLabel(ep) {
      if (ep.from) return `ball under the ${ep.from} cup, found under the ${ep.to} cup`;
      return ep.z || ep.label;
    }

    function renderSide() {
      side.textContent = "";
      side.appendChild(element("p", "section-kicker", group.question));
      side.appendChild(element("h4", "", group.title));

      const picker = element("div", `real-picker real-picker-${group.picker}`);
      picker.appendChild(element("p", "real-picker-label", group.pickerLabel));

      if (group.picker === "matrix") {
        const grid = element("div", "real-matrix");
        grid.appendChild(element("span", "real-matrix-corner"));
        group.positions.forEach((p) => grid.appendChild(element("span", "real-matrix-col", p)));
        group.positions.forEach((from) => {
          grid.appendChild(element("span", "real-matrix-row", from));
          group.positions.forEach((to) => {
            const ep = group.episodes.find((e) => e.from === from && e.to === to);
            if (!ep) {
              grid.appendChild(element("span", "real-matrix-empty"));
              return;
            }
            grid.appendChild(episodeButton(ep, "real-matrix-cell", "●"));
          });
        });
        picker.appendChild(grid);
      } else {
        const list = element("div", "real-list");
        group.episodes.forEach((ep) => {
          const button = episodeButton(ep, "real-chip", ep.label);
          if (ep.swatch) {
            const dot = element("i", "real-swatch");
            dot.style.background = ep.swatch;
            button.prepend(dot);
          }
          list.appendChild(button);
        });
        picker.appendChild(list);
      }
      side.appendChild(picker);

      side.appendChild(element("p", "real-z", `This episode: ${episodeLabel(episode)}.`));

      const scores = element("dl", "real-scores");
      [
        ["Chameleon", group.scores.dsr, group.scores.sr, true],
        ["Diffusion Policy", group.scores.baselineDsr, group.scores.baselineSr, false]
      ].forEach(([name, dsr, sr, ours]) => {
        const item = element("div", ours ? "is-ours" : "");
        item.appendChild(element("dt", "", name));
        item.appendChild(element("dd", "", `DSR ${dsr.toFixed(1)} · SR ${sr.toFixed(1)}`));
        scores.appendChild(item);
      });
      side.appendChild(scores);
    }

    function episodeButton(ep, className, text) {
      const button = element("button", className, text);
      button.type = "button";
      const current = ep === episode;
      button.classList.toggle("is-active", current);
      button.setAttribute("aria-pressed", String(current));
      button.setAttribute("aria-label", episodeLabel(ep));
      button.title = episodeLabel(ep);
      button.addEventListener("click", () => {
        if (ep !== episode) loadEpisode(ep);
      });
      return button;
    }

    const tabButtons = groups.map((g) => {
      const tab = element("button", "real-tab");
      tab.type = "button";
      tab.setAttribute("role", "tab");
      tab.appendChild(element("strong", "", g.title));
      tab.appendChild(element("span", "", `${g.episodes.length} episode${g.episodes.length > 1 ? "s" : ""}`));
      tab.addEventListener("click", () => selectGroup(g));
      tabs.appendChild(tab);
      return tab;
    });

    function selectGroup(g) {
      group = g;
      tabButtons.forEach((tab, i) => {
        const on = groups[i] === g;
        tab.classList.toggle("is-active", on);
        tab.setAttribute("aria-selected", String(on));
      });
      loadEpisode(g.episodes[0]);
    }

    video.addEventListener("loadedmetadata", layoutTimeline);
    video.addEventListener("timeupdate", updateProgress);
    video.addEventListener("play", () => setPlaying(true));
    video.addEventListener("pause", () => setPlaying(false));
    video.addEventListener("error", () => stage.classList.add("is-missing"));
    playButton.addEventListener("click", () => {
      if (video.paused) video.play().catch(() => {});
      else video.pause();
    });

    let inView = false;
    new IntersectionObserver((entries) => {
      inView = entries[0].isIntersecting;
      if (inView && !reducedMotion) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.35 }).observe(stage);

    setPlaying(false);
    selectGroup(groups[0]);
  }

  function renderSimDemos() {
    const root = byId("sim-demos");
    if (!root) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const v = entry.target;
        if (entry.isIntersecting && !reducedMotion) v.play().catch(() => {});
        else v.pause();
      });
    }, { threshold: 0.4 });

    (data.simBenchmarks || []).forEach((bench) => {
      const block = element("article", `sim-bench sim-bench-${bench.id}`);
      const head = element("header", "sim-head");
      const title = element("div", "sim-title");
      title.appendChild(element("h4", "", bench.name));
      title.appendChild(element("p", "", `${bench.tests} · ${bench.protocol}`));
      head.appendChild(title);
      const score = element("p", "sim-score");
      score.innerHTML = `${bench.value}<small>${bench.uncertainty}</small>`;
      head.appendChild(score);
      block.appendChild(head);

      const grid = element("div", "sim-grid");
      bench.tasks.forEach((task) => {
        const tile = element("figure", "sim-tile");
        const media = element("div", "sim-media");
        const v = document.createElement("video");
        v.src = task.src;
        v.poster = task.poster;
        v.muted = true;
        v.loop = true;
        v.playsInline = true;
        v.preload = "none";
        v.setAttribute("aria-label", `${bench.name}: ${task.name}`);
        media.appendChild(v);
        if (bench.speed) media.appendChild(element("span", "sim-speed", bench.speed));
        tile.appendChild(media);
        const caption = element("figcaption");
        caption.appendChild(element("span", "sim-task", task.name));
        if (task.success) caption.appendChild(element("span", "sim-success", `${task.success}%`));
        tile.appendChild(caption);
        grid.appendChild(tile);
        observer.observe(v);
      });
      block.appendChild(grid);
      root.appendChild(block);
    });

    const note = element("p", "sim-note", "Per-task success rates are from the paper (Table S7). LIBERO-10 is reported as an average only.");
    root.appendChild(note);
  }

  function renderCamoTable() {
    const table = byId("camo-table");
    if (!table) return;
    const rows = data.camoTable || [];
    const fmt = (v) => v.toFixed(1);
    table.innerHTML = `
      <thead>
        <tr>
          <th scope="col">Method</th>
          <th scope="col">Clean a specified plate</th>
          <th scope="col">Play shell game</th>
          <th scope="col">Add various seasonings</th>
          <th scope="col">Avg. DSR</th>
          <th scope="col">Avg. MSR</th>
          <th scope="col">Avg. SR</th>
        </tr>
      </thead>
      <tbody>
        ${rows
          .map(
            (r) => `<tr${r.ours ? ' class="is-ours"' : ""}>
          <th scope="row">${r.method}</th>
          <td>${fmt(r.plate[0])} / ${fmt(r.plate[1])}</td>
          <td>${fmt(r.shell[0])} / ${fmt(r.shell[1])}</td>
          <td>${fmt(r.seasonings[0])} / ${fmt(r.seasonings[1])}</td>
          <td>${fmt(r.dsr)}</td>
          <td>${fmt(r.msr)}</td>
          <td>${fmt(r.sr)}</td>
        </tr>`
          )
          .join("")}
      </tbody>`;
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

  // Scrolling down steps through the pinned method walkthrough; scrolling up
  // is usually a search for earlier content, so leave the walkthrough in one
  // wheel tick instead of rewinding it step by step.
  function setupMethodWheel() {
    window.addEventListener(
      "wheel",
      (event) => {
        if (event.deltaY >= 0 || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
        const track = document.querySelector("#method .cmw-track");
        const sticky = track && track.querySelector(".cmw-sticky");
        if (!sticky) return;

        const pinTop = parseFloat(getComputedStyle(sticky).top) || 0;
        const rect = track.getBoundingClientRect();
        const pinned = rect.top < pinTop - 1 && rect.bottom > window.innerHeight;
        if (!pinned) return;

        const unit = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1;
        event.preventDefault();
        window.scrollTo({
          top: window.scrollY + rect.top - pinTop + event.deltaY * unit,
          behavior: "instant"
        });
      },
      { passive: false }
    );
  }

  renderCamoTasks();
  renderRealDemos();
  renderSimDemos();
  renderResults();
  renderCamoTable();
  renderEvidence();
  setupCitation();
  setupMethodWheel();
})();
