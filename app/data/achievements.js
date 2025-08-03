// Achievement system definitions
export const achievementDefinitions = [
  {
    id: "perfect_memory",
    name: "Perfect Memory",
    description: "Complete a game without any mistakes",
    icon: "🧠",
    condition: (data) => data.perfectGame,
  },
  {
    id: "speed_runner",
    name: "Speed Runner",
    description: "Complete a game in under 30 seconds",
    icon: "⚡",
    condition: (data) => data.gameTime < 30,
  },
  {
    id: "combo_master",
    name: "Combo Master",
    description: "Get 3 or more matches in a row",
    icon: "🔥",
    condition: (data) => data.combo >= 3,
  },
  {
    id: "time_master",
    name: "Time Master",
    description: "Win a Time Attack game",
    icon: "⏰",
    condition: (data) => data.mode === "time-attack",
  },
  {
    id: "efficiency_expert",
    name: "Efficiency Expert",
    description: "Win a Limited Moves game",
    icon: "🎯",
    condition: (data) => data.mode === "limited-moves",
  },
  {
    id: "endless_warrior",
    name: "Endless Warrior",
    description: "Reach level 5 in Endless mode",
    icon: "♾️",
    condition: (data) => data.mode === "endless" && data.level >= 5,
  },
  {
    id: "ai_destroyer",
    name: "AI Destroyer",
    description: "Beat Hard AI",
    icon: "🤖",
    condition: (data) => data.mode === "ai" && data.aiDifficulty === "hard",
  },
  {
    id: "social_player",
    name: "Social Player",
    description: "Play a multiplayer game",
    icon: "👥",
    condition: (data) => data.mode === "multiplayer",
  },
]

export function checkAchievements(gameData) {
  const newAchievements = []

  achievementDefinitions.forEach((achievement) => {
    if (achievement.condition(gameData)) {
      newAchievements.push(achievement)
    }
  })

  return newAchievements
}

export function getAchievementProgress(achievements) {
  const total = achievementDefinitions.length
  const unlocked = achievements.length
  return {
    unlocked,
    total,
    percentage: Math.round((unlocked / total) * 100),
  }
}

export function getAchievementById(id) {
  return achievementDefinitions.find((achievement) => achievement.id === id)
}
