window.SITE_DATA = {
  paper: {
    title: "NeuroEmbody: Anonymous Submission",
    subtitle: "Embodied memory and behavior modeling with multimodal signals.",
    conference: "Anonymous Submission",
    abstract:
      "This is a placeholder abstract. Replace this text with your final paper abstract after your submission is ready.",
    teaser: "assets/videos/video1 - teaser.mp4",
    bibtex: `@article{neuroembody2026,
  title={NeuroEmbody: Anonymous Submission},
  author={Anonymous},
  journal={Under review},
  year={2026}
}`
  },
  authors: [
    { name: "Author One", affiliation: "Institute A", homepage: "#" },
    { name: "Author Two", affiliation: "Institute B", homepage: "#" },
    { name: "Author Three", affiliation: "Institute C", homepage: "#" }
  ],
  links: { code: "#", arxiv: "#", paper: "#", bibtex: "#citation" },
  sections: {
    motivation:
      "Motivation placeholder: briefly explain why your approach is needed and what challenge it solves.",
    method:
      "Method placeholder: describe your key model design, data flow, and training strategy here.",
    dataset:
      "Dataset placeholder: introduce your data design and the three interaction tasks.",
    acknowledgement:
      "Acknowledgement placeholder: add funding, collaborators, and supporting resources."
  },
  motivationGame: {
    prompt:
      "Pick the best option according to the comic clue in each lane. Correct answer is Middle cup.",
    // Optional per lane: add `answer: "Middle cup"` (must match one string in options). If omitted, uses `answer` below.
    lanes: [
      {
        id: "language-memory",
        title: "Language Memory",
        comic: [
          "assets/images/motivation/language_1.jpg",
          "assets/images/motivation/language_2.jpg",
          "assets/images/motivation/language_3.jpg"
        ]
      },
      {
        id: "nearby-visual-retrieval",
        title: "Nearby Visual Retrieval",
        comic: [
          "assets/images/motivation/nearby_1.jpg",
          "assets/images/motivation/nearby_2.jpg",
          "assets/images/motivation/nearby_3.jpg"
        ]
      },
      {
        id: "episodic-memory",
        title: "Episodic Memory",
        comic: [
          "assets/images/motivation/episodic_1.jpg",
          "assets/images/motivation/episodic_2.jpg",
          "assets/images/motivation/episodic_3.jpg"
        ]
      },
      {
        id: "multi-cue-reasoning",
        title: "Multi-cue Reasoning",
        comic: [
          "assets/images/motivation/multicue_1.jpg",
          "assets/images/motivation/multicue_2.jpg",
          "assets/images/motivation/multicue_3.jpg"
        ]
      }
    ],
    options: ["Left cup", "Middle cup", "Right cup", "I don't know"],
    answer: "Middle cup"
  },
  methodMedia: {
    title: "Signal Flow Animation",
    video: "assets/videos/method_flow.mp4",
    poster: "assets/images/method_poster.jpg"
  },
  datasetTasks: [
    {
      id: "task-1",
      title: "Interactive Task 1",
      description: "Task placeholder description.",
      cover: "assets/images/dataset/task1.jpg",
      url: "#"
    },
    {
      id: "task-2",
      title: "Interactive Task 2",
      description: "Task placeholder description.",
      cover: "assets/images/dataset/task2.jpg",
      url: "#"
    },
    {
      id: "task-3",
      title: "Interactive Task 3",
      description: "Task placeholder description.",
      cover: "assets/images/dataset/task3.jpg",
      url: "#"
    }
  ],
  images: [
    {
      id: "fig-overview",
      title: "Framework Overview",
      description: "High-level method pipeline figure.",
      thumbnail: "assets/images/overview_thumb.jpg",
      full: "assets/images/overview_full.jpg"
    },
    {
      id: "fig-qualitative",
      title: "Qualitative Results",
      description: "Representative qualitative comparisons.",
      thumbnail: "assets/images/qualitative_thumb.jpg",
      full: "assets/images/qualitative_full.jpg"
    }
  ],
  demos: [
    {
      id: "demo-live",
      name: "Interactive Viewer",
      type: "live",
      url: "#",
      cover: "assets/demos/demo_live_cover.jpg",
      description: "Interactive visualization of NeuroEmbody outputs.",
      status: "coming_soon"
    },
    {
      id: "demo-video",
      name: "Video Demo",
      type: "video",
      url: "#",
      cover: "assets/demos/demo_video_cover.jpg",
      description: "Walkthrough of the full system behavior.",
      status: "coming_soon"
    }
  ],
  contact: {
    email: "your-email@example.com",
    note: "For questions and collaborations, please reach out via email."
  }
};
