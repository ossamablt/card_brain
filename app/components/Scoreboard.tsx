"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

export default function Scoreboard({
  players,
  currentPlayerIndex,
  gameMode,
  timeLeft,
  movesLeft,
  currentLevel,
  onBackToMenu,
}) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card className="mb-4 p-3 sm:p-4 bg-white/95 backdrop-blur-sm shadow-xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-800">
              {gameMode === "endless" ? `Level ${currentLevel}` : gameMode.replace("-", " ").toUpperCase()}
            </h1>
            {timeLeft !== null && (
              <div className={`text-sm font-bold ${timeLeft < 10 ? "text-red-600" : "text-blue-600"}`}>
                Time: {formatTime(timeLeft)}
              </div>
            )}
            {movesLeft !== null && (
              <div className={`text-sm font-bold ${movesLeft < 5 ? "text-red-600" : "text-blue-600"}`}>
                Moves: {movesLeft}
              </div>
            )}
          </div>
          <Button onClick={onBackToMenu} variant="outline" size="sm" className="hover:bg-gray-100 bg-transparent">
            ← Menu
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 sm:gap-3">
          {players.map((player, index) => (
            <motion.div
              key={player.id}
              className={`px-3 py-2 rounded-xl border-2 transition-all duration-300 ${
                index === currentPlayerIndex
                  ? "bg-gradient-to-r from-yellow-400 to-orange-400 border-yellow-500 text-white shadow-lg transform scale-105"
                  : "bg-white border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
              animate={
                index === currentPlayerIndex
                  ? {
                      boxShadow: [
                        "0 0 0 0 rgba(251, 191, 36, 0.7)",
                        "0 0 0 10px rgba(251, 191, 36, 0)",
                        "0 0 0 0 rgba(251, 191, 36, 0)",
                      ],
                    }
                  : {}
              }
              transition={{ duration: 1.5, repeat: index === currentPlayerIndex ? Number.POSITIVE_INFINITY : 0 }}
            >
              <div className="flex items-center gap-2">
                {player.isAI && <span className="text-xs">🤖</span>}
                <div className="text-xs sm:text-sm font-semibold">{player.name}</div>
              </div>
              <div className="text-xs flex items-center gap-2">
                <span>Score: {player.score}</span>
                {player.combo > 1 && (
                  <motion.span
                    className="text-red-500 font-bold"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    🔥{player.combo}x
                  </motion.span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  )
}
