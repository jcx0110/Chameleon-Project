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

  // Paper Table 1, main comparison rows. Each task is [DSR, SR].
  camoTable: [
    { method: "Diffusion Policy", plate: [33.3, 30.6], shell: [34.3, 33.3], seasonings: [0.0, 0.0], dsr: 22.5, msr: 67.6, sr: 21.3 },
    { method: "ACT", plate: [28.0, 19.4], shell: [35.5, 30.6], seasonings: [0.0, 0.0], dsr: 21.2, msr: 51.8, sr: 16.7 },
    { method: "Flow Matching", plate: [30.0, 25.0], shell: [25.7, 25.0], seasonings: [0.0, 0.0], dsr: 18.6, msr: 62.0, sr: 16.7 },
    { method: "Chameleon", ours: true, plate: [91.2, 86.1], shell: [86.1, 86.1], seasonings: [65.2, 41.7], dsr: 80.8, msr: 86.1, sr: 71.3 }
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
