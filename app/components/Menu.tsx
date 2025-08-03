"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { themes } from "../data/themes"
import { getAchievementProgress } from "../data/achievements"

export default function Menu({ onStartGame, gameData, selectedTheme, setSelectedTheme }) {
  const achievementProgress = getAchievementProgress(gameData?.achievements || [])

  const gameModes = [
    { id: "easy", name: "Easy", description: "2×2 Grid", icon: "🟢", difficulty: "Beginner" },
    { id: "medium", name: "Medium", description: "4×4 Grid", icon: "🟡", difficulty: "Intermediate" },
    { id: "hard", name: "Hard", description: "6×6 Grid", icon: "🔴", difficulty: "Expert" },
    { id: "time-attack", name: "Time Attack", description: "Beat the clock!", icon: "⏰", difficulty: "Timed" },
    { id: "limited-moves", name: "Limited Moves", description: "X flips only", icon: "🎯", difficulty: "Strategic" },
    { id: "endless", name: "Endless", description: "Infinite challenge", icon: "♾️", difficulty: "Endless" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-6xl font-bold text-white mb-4 drop-shadow-lg">Memory Master</h1>
          <p className="text-xl text-white/90">Challenge your memory with multiple game modes!</p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6 bg-white/90 backdrop-blur-sm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{gameData?.stats?.gamesPlayed || 0}</div>
                <div className="text-sm text-gray-600">Games Played</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{gameData?.stats?.totalScore || 0}</div>
                <div className="text-sm text-gray-600">Total Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">
                  {achievementProgress.unlocked}/{achievementProgress.total}
                </div>
                <div className="text-sm text-gray-600">Achievements</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">{achievementProgress.percentage}%</div>
                <div className="text-sm text-gray-600">Progress</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Theme Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <Card className="p-6 bg-white/90 backdrop-blur-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Choose Theme</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(themes).map(([key, theme]) => (
                <motion.button
                  key={key}
                  onClick={() => setSelectedTheme(key)}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTheme === key
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white hover:border-gray-400"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-2xl mb-1">{theme.preview}</div>
                  <div className="text-sm font-medium">{theme.name}</div>
                </motion.button>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Game Modes */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {gameModes.map((mode, index) => (
            <motion.div
              key={mode.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Card
                className="p-6 h-full bg-white/90 backdrop-blur-sm hover:bg-white/95 transition-all cursor-pointer border-2 hover:border-blue-300"
                onClick={() => onStartGame(mode.id, 1, "medium", selectedTheme)}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{mode.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{mode.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{mode.description}</p>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    {mode.difficulty}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Multiplayer Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* AI Mode */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">🤖</div>
              <h3 className="text-xl font-bold text-gray-800">VS AI</h3>
              <p className="text-gray-600 text-sm">Challenge the computer</p>
            </div>
            <div className="space-y-2">
              {["easy", "medium", "hard"].map((difficulty) => (
                <Button
                  key={difficulty}
                  onClick={() => onStartGame("ai", 2, difficulty, selectedTheme)}
                  className={`w-full ${
                    difficulty === "easy"
                      ? "bg-green-500 hover:bg-green-600"
                      : difficulty === "medium"
                        ? "bg-yellow-500 hover:bg-yellow-600"
                        : "bg-red-500 hover:bg-red-600"
                  }`}
                >
                  {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} AI
                </Button>
              ))}
            </div>
          </Card>

          {/* Local Multiplayer */}
          <Card className="p-6 bg-white/90 backdrop-blur-sm">
            <div className="text-center mb-4">
              <div className="text-4xl mb-2">👥</div>
              <h3 className="text-xl font-bold text-gray-800">Local Multiplayer</h3>
              <p className="text-gray-600 text-sm">Play with friends</p>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[2, 3, 4].map((count) => (
                <Button
                  key={count}
                  onClick={() => onStartGame("multiplayer", count, "medium", selectedTheme)}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {count}P
                </Button>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
