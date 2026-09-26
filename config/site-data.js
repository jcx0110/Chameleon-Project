window.SITE_DATA = {

  // Camo-Dataset task design (paper Fig. 3, Table S3). Frames are cropped from Fig. 3.
  camoTasks: [
    {
      id: "plate",
      title: "Clean a specified plate",
      question: "Which plate was used?",
      hiddenVariable: "Which of the visually similar plates the human used and set down as the target.",
      aliasing: "Once the human withdraws, three similar plates sit on the table and any of them could be the target.",
      diagnostic: "Event–object binding under delayed relevance",
      chance: "1/3",
      frames: [
        { img: "assets/images/camo/plate-1.jpg", label: "Observation & Memory", caption: "The plates and the cube are in view." },
        { img: "assets/images/camo/plate-2.jpg", label: "Observation & Memory", caption: "A human uses one plate and sets it down." },
        { img: "assets/images/camo/plate-3.jpg", label: "Decision", decision: true, caption: "Three look-alike plates. Which one?" },
        { img: "assets/images/camo/plate-4.jpg", label: "Manipulation", caption: "Clean the plate that was used." }
      ]
    },
    {
      id: "shell",
      title: "Play shell game",
      question: "Which cup holds the ball?",
      hiddenVariable: "Where the hidden object ends up after it is covered and the cups are swapped.",
      aliasing: "After the shuffle the cups are identical and the ball is out of sight.",
      diagnostic: "Spatial tracking under occlusion and distractor motion",
      chance: "1/3",
      frames: [
        { img: "assets/images/camo/shell-1.jpg", label: "Observation & Memory", caption: "The ball goes under one cup." },
        { img: "assets/images/camo/shell-2.jpg", label: "Observation & Memory", caption: "The cups are swapped while it is hidden." },
        { img: "assets/images/camo/shell-3.jpg", label: "Decision", decision: true, caption: "Three identical cups. Which one?" },
        { img: "assets/images/camo/shell-4.jpg", label: "Manipulation", caption: "Lift the cup that holds the ball." }
      ]
    },
    {
      id: "seasonings",
      title: "Add various seasonings",
      question: "Which seasonings are already in?",
      hiddenVariable: "Which subgoals of the repeated sequence have already been completed.",
      aliasing: "The workspace returns to a similar state after every addition.",
      diagnostic: "Sequential progress memory, with no repeats and no omissions",
      chance: "1/27",
      repeat: "Decide and add, three times",
      frames: [
        { img: "assets/images/camo/seasonings-1.jpg", label: "Decision", decision: true, caption: "Which seasoning comes next?" },
        { img: "assets/images/camo/seasonings-2.jpg", label: "Manipulation & Memory", caption: "Pick up that seasoning." },
        { img: "assets/images/camo/seasonings-3.jpg", label: "Manipulation & Memory", caption: "Add it to the dish." },
        { img: "assets/images/camo/seasonings-4.jpg", label: "Manipulation & Memory", caption: "Put it back and remember it is done." }
      ]
    }
  ],

  // Real-robot rollouts, grouped by task and by the hidden value of each episode.
  // `phases` lists the start time (seconds, in the web clip) of each timeline segment.
  // Episodes without `phases` fall back to the task's `draftPhases` fractions of the clip.
  realDemos: [
    {
      task: "plate",
      title: "Clean a specified plate",
      question: "Which plate was used?",
      picker: "swatch",
      pickerLabel: "Target plate",
      scores: { dsr: 91.2, sr: 86.1, baselineDsr: 33.3, baselineSr: 30.6 },
      segments: [
        { short: "Observe", label: "Observation & Memory" },
        { short: "Act", label: "Manipulation" },
        { short: "Decide", label: "Decision", decision: true }
      ],
      draftPhases: [0, 0.07, 0.68],
      episodes: [
        { id: "plate-red", label: "Red", swatch: "#d9403a", z: "The red plate was used", src: "assets/demos/real/plate-red.mp4", poster: "assets/demos/real/plate-red.jpg", speed: "10×", phases: [0, 1, 11] },
        { id: "plate-green", label: "Green", swatch: "#3f9a45", z: "The green plate was used", src: "assets/demos/real/plate-green.mp4", poster: "assets/demos/real/plate-green.jpg", speed: "10×", phases: [0, 2, 13] },
        { id: "plate-white", label: "White", swatch: "#f4f1ec", z: "The white plate was used", src: "assets/demos/real/plate-white.mp4", poster: "assets/demos/real/plate-white.jpg", speed: "10×", phases: [0, 1, 10] }
      ]
    },
    {
      task: "shell",
      title: "Play shell game",
      question: "Which cup holds the ball?",
      picker: "matrix",
      pickerLabel: "Ball starts under → is found under",
      positions: ["left", "middle", "right"],
      scores: { dsr: 86.1, sr: 86.1, baselineDsr: 34.3, baselineSr: 33.3 },
      segments: [
        { short: "Observe", label: "Observation & Memory" },
        { short: "Observe", label: "Observation & Memory" },
        { short: "Decide", label: "Decision", decision: true },
        { short: "Act", label: "Manipulation" }
      ],
      draftPhases: [0, 0.08, 0.42, 0.6],
      episodes: [
        { id: "shell-left-middle", from: "left", to: "middle", src: "assets/demos/real/shell-left-middle.mp4", poster: "assets/demos/real/shell-left-middle.jpg", speed: "10×" },
        { id: "shell-left-right", from: "left", to: "right", src: "assets/demos/real/shell-left-right.mp4", poster: "assets/demos/real/shell-left-right.jpg", speed: "10×" },
        { id: "shell-middle-left", from: "middle", to: "left", src: "assets/demos/real/shell-middle-left.mp4", poster: "assets/demos/real/shell-middle-left.jpg", speed: "10×" },
        { id: "shell-middle-right", from: "middle", to: "right", src: "assets/demos/real/shell-middle-right.mp4", poster: "assets/demos/real/shell-middle-right.jpg", speed: "10×" },
        { id: "shell-right-left", from: "right", to: "left", src: "assets/demos/real/shell-right-left.mp4", poster: "assets/demos/real/shell-right-left.jpg", speed: "10×" },
        { id: "shell-right-middle", from: "right", to: "middle", src: "assets/demos/real/shell-right-middle.mp4", poster: "assets/demos/real/shell-right-middle.jpg", speed: "8×" }
      ]
    },
    {
      task: "seasonings",
      title: "Add various seasonings",
      question: "Which seasonings are already in?",
      picker: "list",
      pickerLabel: "Episode",
      scores: { dsr: 65.2, sr: 41.7, baselineDsr: 0.0, baselineSr: 0.0 },
      segments: [
        { short: "", label: "Decision 1", decision: true },
        { short: "Add 1", label: "Manipulation & Memory 1" },
        { short: "", label: "Decision 2", decision: true },
        { short: "Add 2", label: "Manipulation & Memory 2" },
        { short: "", label: "Decision 3", decision: true },
        { short: "Add 3", label: "Manipulation & Memory 3" }
      ],
      draftPhases: [0, 0.05, 0.33, 0.38, 0.66, 0.71],
      episodes: [
        { id: "seasonings-1", label: "Full sequence", z: "Three seasonings, each added exactly once", src: "assets/demos/real/seasonings.mp4", poster: "assets/demos/real/seasonings.jpg", speed: "5×" }
      ]
    }
  ],

  // Public simulation benchmarks (paper Table 2 and Table S7). One successful rollout per task.
  simBenchmarks: [
    {
      id: "memorybench",
      name: "MemoryBench",
      tests: "Spatial memory in manipulation",
      protocol: "3 task-specific policies",
      value: "97.3",
      uncertainty: "± 4.5%",
      tasks: [
        { name: "Reopen drawer", src: "assets/demos/sim/memorybench/reopen-drawer.mp4", poster: "assets/demos/sim/memorybench/reopen-drawer.jpg", success: "92.0 ± 13.5" },
        { name: "Put block back", src: "assets/demos/sim/memorybench/put-block-back.mp4", poster: "assets/demos/sim/memorybench/put-block-back.jpg", success: "100.0 ± 0.0" },
        { name: "Rearrange block", src: "assets/demos/sim/memorybench/rearrange-block.mp4", poster: "assets/demos/sim/memorybench/rearrange-block.jpg", success: "100.0 ± 0.0" }
      ]
    },
    {
      id: "libero-10",
      name: "LIBERO-10",
      tests: "Language-conditioned long-horizon imitation",
      protocol: "10-task mixed policy",
      value: "87.1",
      uncertainty: "± 0.8%",
      tasks: [
        { name: "Put both the alphabet soup and the tomato sauce in the basket", src: "assets/demos/sim/libero-10/task0.mp4", poster: "assets/demos/sim/libero-10/task0.jpg" },
        { name: "Put both the cream cheese box and the butter in the basket", src: "assets/demos/sim/libero-10/task1.mp4", poster: "assets/demos/sim/libero-10/task1.jpg" },
        { name: "Turn on the stove and put the moka pot on it", src: "assets/demos/sim/libero-10/task2.mp4", poster: "assets/demos/sim/libero-10/task2.jpg" },
        { name: "Put the black bowl in the bottom drawer of the cabinet and close it", src: "assets/demos/sim/libero-10/task3.mp4", poster: "assets/demos/sim/libero-10/task3.jpg" },
        { name: "Put the white mug on the left plate and put the yellow and white mug on the right plate", src: "assets/demos/sim/libero-10/task4.mp4", poster: "assets/demos/sim/libero-10/task4.jpg" },
        { name: "Pick up the book and place it in the back compartment of the caddy", src: "assets/demos/sim/libero-10/task5.mp4", poster: "assets/demos/sim/libero-10/task5.jpg" },
        { name: "Put the white mug on the plate and put the chocolate pudding to the right of the plate", src: "assets/demos/sim/libero-10/task6.mp4", poster: "assets/demos/sim/libero-10/task6.jpg" },
        { name: "Put both the alphabet soup and the cream cheese box in the basket", src: "assets/demos/sim/libero-10/task7.mp4", poster: "assets/demos/sim/libero-10/task7.jpg" },
        { name: "Put both moka pots on the stove", src: "assets/demos/sim/libero-10/task8.mp4", poster: "assets/demos/sim/libero-10/task8.jpg" },
        { name: "Put the yellow and white mug in the microwave and close it", src: "assets/demos/sim/libero-10/task9.mp4", poster: "assets/demos/sim/libero-10/task9.jpg" }
      ]
    },
    {
      id: "mikasa-robo",
      name: "MIKASA-Robo",
      tests: "Non-Markovian tasks in simulation",
      protocol: "5-task mixed policy",
      value: "75.1",
      uncertainty: "± 1.4%",
      speed: "0.5×",
      tasks: [
        { name: "Shell Game", src: "assets/demos/sim/mikasa-robo/shell-game-touch.mp4", poster: "assets/demos/sim/mikasa-robo/shell-game-touch.jpg", success: "96.7 ± 1.4" },
        { name: "Remember Color 3", src: "assets/demos/sim/mikasa-robo/remember-color-3.mp4", poster: "assets/demos/sim/mikasa-robo/remember-color-3.jpg", success: "94.4 ± 1.3" },
        { name: "Remember Color 5", src: "assets/demos/sim/mikasa-robo/remember-color-5.mp4", poster: "assets/demos/sim/mikasa-robo/remember-color-5.jpg", success: "72.2 ± 1.7" },
        { name: "Remember Color 9", src: "assets/demos/sim/mikasa-robo/remember-color-9.mp4", poster: "assets/demos/sim/mikasa-robo/remember-color-9.jpg", success: "53.3 ± 1.6" },
        { name: "Intercept Medium", src: "assets/demos/sim/mikasa-robo/intercept-medium.mp4", poster: "assets/demos/sim/mikasa-robo/intercept-medium.jpg", success: "58.9 ± 2.5" }
      ]
    }
  ],

  // Experiments: the paper's Table 1 (Camo-Dataset) and Table 2 (public benchmarks).
  experiments: {
    camoTasks: [
      { key: "plate", name: "Clean a specified plate" },
      { key: "shell", name: "Play shell game" },
      { key: "seasonings", name: "Add various seasonings" }
    ],
    // Each task is [DSR, SR]; dsr / msr / sr are task-wise averages.
    camoGroups: [
      {
        title: "Matched imitation baselines",
        rows: [
          { method: "Diffusion Policy", plate: [33.3, 30.6], shell: [34.3, 33.3], seasonings: [0.0, 0.0], dsr: 22.5, msr: 67.6, sr: 21.3 },
          { method: "ACT", plate: [28.0, 19.4], shell: [35.5, 30.6], seasonings: [0.0, 0.0], dsr: 21.2, msr: 51.8, sr: 16.7 },
          { method: "Flow Matching", plate: [30.0, 25.0], shell: [25.7, 25.0], seasonings: [0.0, 0.0], dsr: 18.6, msr: 62.0, sr: 16.7 }
        ]
      },
      {
        title: "Ours and mechanism ablations",
        rows: [
          { method: "Chameleon", ours: true, plate: [91.2, 86.1], shell: [86.1, 86.1], seasonings: [65.2, 41.7], dsr: 80.8, msr: 86.1, sr: 71.3 },
          { method: "w/o memory", plate: [26.7, 22.2], shell: [34.4, 30.6], seasonings: [0.0, 0.0], dsr: 20.4, msr: 64.8, sr: 17.6 },
          { method: "Similarity retrieval bank", plate: [41.4, 33.3], shell: [28.6, 22.2], seasonings: [0.0, 0.0], dsr: 23.3, msr: 58.3, sr: 18.5 },
          { method: "Vanilla Mamba memory", plate: [27.6, 22.2], shell: [30.0, 25.0], seasonings: [50.0, 19.4], dsr: 35.9, msr: 67.6, sr: 22.2 },
          { method: "w/o control index", plate: [40.7, 30.6], shell: [45.8, 30.6], seasonings: [60.0, 16.7], dsr: 48.8, msr: 56.5, sr: 26.0 },
          { method: "w/o Control-JEPA", plate: [82.8, 66.7], shell: [71.0, 61.1], seasonings: [61.1, 30.6], dsr: 71.6, msr: 72.2, sr: 52.8 }
        ]
      }
    ],
    // Success rate (%). Baselines as published under the same protocol, strongest first.
    publicBenchmarks: [
      {
        name: "MemoryBench",
        protocol: "3 task-specific policies",
        ours: "97.3 ± 4.5",
        baselines: [["ReMem-VLA", "94.5*"], ["SAM2Act+", "94.3"], ["SAM2Act", "55.0"], ["RVT-2", "54.0"]]
      },
      {
        name: "LIBERO-10",
        protocol: "10-task mixed policy",
        ours: "87.1 ± 0.8",
        baselines: [
          ["MemoryVLA", "93.4"], ["MoDE", "92.0"], ["4D-VLA", "86.5"], ["π0", "85.2"], ["TriVLA", "73.2"],
          ["DP-CNN", "73.0"], ["QueST", "69.0"], ["CoT-VLA", "69.0"], ["OpenVLA", "53.7"], ["DP-T", "51.0"]
        ]
      },
      {
        name: "MIKASA-Robo",
        protocol: "5-task mixed policy",
        ours: "75.1 ± 1.4",
        baselines: [["GMP", "67.8"], ["MemoryVLA", "41.2"], ["π0", "29.4"], ["OpenVLA-OFT", "28.4"], ["SpatialVLA", "21.0"], ["CronusVLA", "18.0"]]
      },
      {
        name: "MIKASA-Robo",
        protocol: "2 task-specific policies",
        ours: "95.6 ± 1.0",
        baselines: [["DP-VPWEM", "86.5"], ["DP", "19.5"], ["MaIL", "19.5"], ["DP-PTP", "15.0"]]
      }
    ]
  },

  // Mechanistic evidence: the three panels of paper Figure 4, one per property.
  evidence: [
    {
      key: "separability",
      number: "01",
      property: "Separability",
      claim: "Memory keeps look-alike histories apart.",
      img: "assets/images/evidence/separability.webp",
      width: 3321,
      height: 876,
      alt: "Probe on current tokens versus memory states at aliased decision frames, with memory trajectories for Clean a specified plate.",
      stats: [
        { label: "Shell game", from: "46.7", value: "83.3" },
        { label: "Seasonings", from: "37.4", value: "98.5" }
      ],
      statNote: "probe accuracy, current → memory"
    },
    {
      key: "addressability",
      number: "02",
      property: "Addressability",
      claim: "The control query picks the relevant trace.",
      img: "assets/images/evidence/addressability.webp",
      width: 858,
      height: 921,
      alt: "Counterfactual trace edits under a fixed control query in Add various seasonings.",
      stats: [
        { label: "Full", value: "93" },
        { label: "Swap", value: "87" },
        { label: "Mask+", value: "40" },
        { label: "Mask−", value: "90" }
      ],
      statNote: "choice accuracy"
    },
    {
      key: "prospectiveness",
      number: "03",
      property: "Prospectiveness",
      claim: "Future control shows up before the action.",
      img: "assets/images/evidence/prospectiveness.webp",
      width: 2396,
      height: 921,
      alt: "Decoding future endpoints and subgoal modes from the working state around the decision, with and without Control-JEPA.",
      stats: [{ label: "Shell game", value: "+17" }],
      statNote: "earlier than w/o Control-JEPA"
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
