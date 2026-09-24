window.SITE_DATA = {
  methodSteps: [
    {
      id: "bind",
      number: "01",
      label: "Event Binding",
      title: "Bind perception, body state, and task before memory propagation.",
      description:
        "At each layer, the current embodied event tokens first interact through a residual self-attention mixer.",
      points: [
        "Visual, proprioceptive, and language tokens reinterpret one another.",
        "The written event is already conditioned on the task and robot body.",
        "This is the memory cell's write interface."
      ],
      note: "Current embodied tokens → bound event evidence"
    },
    {
      id: "propagate",
      number: "02",
      label: "Token-Grounded Trace Propagation",
      title: "Keep similar histories from collapsing together.",
      description:
        "A slow selective state-space stream propagates token-wise episode traces through causal time, preserving the distinctions that may matter later.",
      points: [
        "Multiple localized traces replace a single recurrent summary.",
        "Past evidence stays attached to its event and token stream.",
        "This realizes the separability requirement."
      ],
      note: "Slow episode-level memory"
    },
    {
      id: "recall",
      number: "03",
      label: "Control-Indexed Recall",
      title: "Ask memory the current control question.",
      description:
        "A learned control index is refined by the current scene into a control context, which attends over the trace bank.",
      points: [
        "Proprioception and language initialize the control index.",
        "Current event tokens refine it with present-scene evidence.",
        "The same trace bank can answer different decision states.",
        "Recall is selected by control relevance rather than visual similarity."
      ],
      note: "Current control context → relevant trace"
    },
    {
      id: "consolidate",
      number: "04",
      label: "Working-State Consolidation",
      title: "Fuse recalled evidence into the fast policy-facing state.",
      description:
        "The recalled trace and control context are fused, then propagated through a fast state-space stream for immediate action prediction.",
      points: [
        "The slow stream preserves episode evidence.",
        "The fast stream maintains the policy-facing working state.",
        "The final working state feeds Control-JEPA and the action policy."
      ],
      note: "Control context + recalled trace → working state"
    }
  ],

  demos: [
    {
      id: "overview",
      index: "00",
      eyebrow: "Chameleon overview",
      title: "The right past, recalled at the right moment.",
      description:
        "Watch observation–action delay unfold across the real-robot tasks used to diagnose memory-dependent control.",
      mediaType: "video",
      src: "assets/videos/supplementary-video-final.mp4",
      poster: "",
      tags: ["Real robot", "Causal policy", "Long horizon"]
    },
    {
      id: "clean-plate",
      index: "01",
      eyebrow: "Event–object binding",
      title: "Clean a specified plate",
      description:
        "The robot must remember which visually similar plate a human used or contaminated before selecting it later.",
      hiddenVariable: "Which plate was used earlier?",
      diagnostic: "Delayed event–object binding",
      chance: "1 / 3",
      mediaType: "placeholder",
      src: "",
      tags: ["3 plates", "Occluded cue", "Real robot"]
    },
    {
      id: "shell-game",
      index: "02",
      eyebrow: "Spatial memory",
      title: "Play shell game",
      description:
        "The ball disappears, identical cups move, and the policy must track the object-containing cup through occlusion and swaps.",
      hiddenVariable: "Which cup contains the ball?",
      diagnostic: "Spatial tracking under occlusion",
      chance: "1 / 3",
      mediaType: "placeholder",
      src: "",
      tags: ["3 cups", "Distractor motion", "Real robot"]
    },
    {
      id: "seasonings",
      index: "03",
      eyebrow: "Sequential memory",
      title: "Add various seasonings",
      description:
        "After each addition the workspace looks similar, so the next action depends on which subgoals have already been completed.",
      hiddenVariable: "Which subgoals are complete?",
      diagnostic: "Progress memory without repetition",
      chance: "1 / 27",
      mediaType: "placeholder",
      src: "",
      tags: ["3-step sequence", "Repeated scene", "Real robot"]
    }
  ],

  benchmarkHighlights: [
    {
      benchmark: "MemoryBench",
      value: "97.3",
      uncertainty: "± 4.5%",
      protocol: "3 task-specific policies"
    },
    {
      benchmark: "LIBERO-10",
      value: "87.1",
      uncertainty: "± 0.8%",
      protocol: "10-task mixed policy"
    },
    {
      benchmark: "MIKASA-Robo",
      value: "75.1",
      uncertainty: "± 1.4%",
      protocol: "5-task mixed policy"
    },
    {
      benchmark: "MIKASA-Robo",
      value: "95.6",
      uncertainty: "± 1.0%",
      protocol: "2 task-specific policies"
    }
  ],

  camoResults: [
    { metric: "DSR", label: "Decision success", baseline: 22.5, ours: 80.8 },
    { metric: "MSR", label: "Manipulation success", baseline: 67.6, ours: 86.1 },
    { metric: "SR", label: "End-to-end success", baseline: 21.3, ours: 71.3 }
  ],

  evidence: [
    {
      number: "01",
      property: "Separability",
      title: "History remains decodable after the scene becomes ambiguous.",
      body:
        "At aliased decision frames, memory states retain the hidden episode variable far better than current visual tokens.",
      stats: [
        { label: "Shell game", value: "83.3%", compare: "46.7% current" },
        { label: "Seasonings", value: "98.5%", compare: "37.4% current" }
      ]
    },
    {
      number: "02",
      property: "Addressability",
      title: "The control query selects the causally relevant trace.",
      body:
        "Counterfactual trace edits change the chosen subgoal only when relevant evidence is replaced or removed.",
      stats: [
        { label: "Full trace", value: "93%", compare: "choice accuracy" },
        { label: "Mask relevant", value: "40%", compare: "choice accuracy" }
      ]
    },
    {
      number: "03",
      property: "Prospectiveness",
      title: "The working state exposes future control information earlier.",
      body:
        "Control-JEPA makes future endpoints and upcoming subgoal modes more reliably decodable before the action is executed.",
      stats: [
        { label: "Full model SR", value: "71.3%", compare: "Camo-Dataset" },
        { label: "Without JEPA", value: "52.8%", compare: "Camo-Dataset" }
      ]
    }
  ],

  bibtex: `@inproceedings{guo2026chameleon,
  title     = {{Chameleon}: Control-Indexed Prospective Memory for Visuomotor Manipulation},
  author    = {Guo, Xinying and Jiang, Chenxi and Kim, Hyun Bin and Han, Yuhang
               and Sun, Ying and Xiao, Yang and Yang, Jianfei},
  booktitle = {Proceedings of The 10th Conference on Robot Learning},
  series    = {Proceedings of Machine Learning Research},
  publisher = {PMLR},
  year      = {2026}
}`
};
