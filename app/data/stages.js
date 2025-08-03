// Stage configurations for the memory game
export const stages = [
  {
    stage: 1,
    rows: 2,
    cols: 2,
    pairs: 2,
    previewTime: 5,
    difficulty: "Easy",
  },
  {
    stage: 2,
    rows: 2,
    cols: 3,
    pairs: 3,
    previewTime: 4,
    difficulty: "Easy",
  },
  {
    stage: 3,
    rows: 2,
    cols: 4,
    pairs: 4,
    previewTime: 4,
    difficulty: "Easy",
  },
  {
    stage: 4,
    rows: 3,
    cols: 4,
    pairs: 6,
    previewTime: 3,
    difficulty: "Medium",
  },
  {
    stage: 5,
    rows: 4,
    cols: 4,
    pairs: 8,
    previewTime: 3,
    difficulty: "Medium",
  },
  {
    stage: 6,
    rows: 4,
    cols: 5,
    pairs: 10,
    previewTime: 3,
    difficulty: "Medium",
  },
  {
    stage: 7,
    rows: 4,
    cols: 6,
    pairs: 12,
    previewTime: 2,
    difficulty: "Hard",
  },
  {
    stage: 8,
    rows: 5,
    cols: 6,
    pairs: 15,
    previewTime: 2,
    difficulty: "Hard",
  },
  {
    stage: 9,
    rows: 5,
    cols: 7,
    pairs: 17,
    previewTime: 2,
    difficulty: "Hard",
  },
  {
    stage: 10,
    rows: 5,
    cols: 8,
    pairs: 20,
    previewTime: 1,
    difficulty: "Expert",
  },
]

export const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-600"
    case "Medium":
      return "text-yellow-600"
    case "Hard":
      return "text-orange-600"
    case "Expert":
      return "text-red-600"
    default:
      return "text-gray-600"
  }
}

export const getStageByNumber = (stageNumber) => {
  return stages.find((stage) => stage.stage === stageNumber) || stages[0]
}
