window.SITE_DATA = {
  methodSteps: [
    {
      id: "write",
      number: "01",
      action: "Write",
      label: "Embodied event tokens",
      title: "Bind what the robot sees, is, and intends.",
      description:
        "Each timestep is written as a set of localized event tokens rather than compressed into one global descriptor.",
      points: [
        "Patch-level tokens preserve local visual evidence.",
        "Proprioception anchors the event to the robot body.",
        "Language specifies the task or supplies a learned null instruction."
      ],
      note: "Visual + proprioceptive + language evidence"
    },
    {
      id: "propagate",
      number: "02",
      action: "Propagate",
      label: "Token-grounded traces",
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
      id: "address",
      number: "03",
      action: "Address",
      label: "Control-indexed recall",
      title: "Ask memory the current control question.",
      description:
        "The present body, task, and scene form a learned control context that attends over the trace bank and recalls decision-relevant evidence.",
      points: [
        "Recall is conditioned on control relevance.",
        "The same trace bank can answer different decision states.",
        "This realizes the addressability requirement."
      ],
      note: "Current control context → relevant trace"
    },
    {
      id: "consolidate",
      number: "04",
      action: "Consolidate",
      label: "Prospective working state",
      title: "Turn remembered evidence into future action.",
      description:
        "Recalled evidence is fused with the control context and updated through a fast stream to form the policy-facing working state.",
      points: [
        "Control-JEPA predicts future control contexts during training.",
        "A rectified-flow head generates the future action chunk.",
        "This realizes the prospectiveness requirement."
      ],
      note: "Fast action-ready state → action horizon"
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
      src: "assets/videos/video1 - teaser.mp4",
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

  bibtex: `@article{guo2026chameleon,
  title   = {Chameleon: Control-Indexed Prospective Memory
             for Visuomotor Manipulation},
  author  = {Guo, Xinying and Jiang, Chenxi and Kim, Hyun Bin
             and Han, Yuhang and Sun, Ying and Xiao, Yang
             and Yang, Jianfei},
  journal = {arXiv preprint arXiv:2603.24576},
  year    = {2026}
}`
};
