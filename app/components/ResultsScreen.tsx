"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Trophy, Star, Clock, Target, RotateCcw, Home, Share2 } from "lucide-react"

interface Player {
  id: number
  name: string
  score: number
  matches: number
  combo: number
  isAI?: boolean
}

interface Results {
  players: Player[]
  totalScore: number
  gameTime: number
  stars?: number
  newAchievements?: any[]
}

interface ResultsScreenProps {
  results: Results
  onPlayAgain: () => void
  onBackToMenu: () => void
}

export default function ResultsScreen({ results, onPlayAgain, onBackToMenu }: ResultsScreenProps) {
  const { players, totalScore, gameTime, stars = 3, newAchievements = [] } = results

  const winner = players.reduce((prev, current) => (prev.score > current.score ? prev : current))

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Confetti Animation */}
        <div className="fixed inset-0 pointer-events-none z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: ["#FFD700", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#F38BA8"][i % 6],
              }}
              initial={{
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
                y: -10,
                rotate: 0,
              }}
              animate={{
                y: (typeof window !== "undefined" ? window.innerHeight : 800) + 10,
                rotate: 360,
                x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 1000),
              }}
              transition={{
                duration: 3,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Main Results Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-8">
            {/* Trophy and Title */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-6xl mb-4"
              >
                🏆
              </motion.div>
              <h1 className="text-3xl font-bold text-white mb-2">
                {players.length > 1 ? `${winner.name} Wins!` : "Game Complete!"}
              </h1>
              <p className="text-white/70">Congratulations on your performance!</p>
            </motion.div>

            {/* Star Rating */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="flex justify-center mb-6"
            >
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + i * 0.2 }}
                >
                  <Star className={`w-8 h-8 mx-1 ${i < stars ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}`} />
                </motion.div>
              ))}
            </motion.div>

            {/* Game Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="grid grid-cols-2 gap-4 mb-6"
            >
              <div className="bg-white/5 rounded-lg p-4">
                <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{formatTime(gameTime)}</div>
                <div className="text-white/60 text-sm">Time</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <Target className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{totalScore}</div>
                <div className="text-white/60 text-sm">Score</div>
              </div>
            </motion.div>

            {/* Player Scores */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="space-y-3 mb-6"
            >
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    player.id === winner.id
                      ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30"
                      : "bg-white/5"
                  }`}
                >
                  <div className="flex items-center">
                    {player.id === winner.id && <Trophy className="w-5 h-5 text-yellow-400 mr-2" />}
                    <span className="text-white font-medium">
                      {player.name} {player.isAI && "🤖"}
                    </span>
                  </div>
                  <div className="text-white font-bold">{player.score}</div>
                </div>
              ))}
            </motion.div>
          </Card>
        </motion.div>

        {/* New Achievements */}
        {newAchievements.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="mb-8"
          >
            <Card className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg border-purple-400/30 p-6">
              <h3 className="text-xl font-bold text-white mb-4 text-center">🎉 New Achievements!</h3>
              <div className="space-y-3">
                {newAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4 + index * 0.2 }}
                    className="flex items-center bg-white/10 rounded-lg p-3"
                  >
                    <div className="text-2xl mr-3">{achievement.icon}</div>
                    <div>
                      <div className="text-white font-semibold">{achievement.name}</div>
                      <div className="text-white/70 text-sm">{achievement.description}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Button
            onClick={onPlayAgain}
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Play Again
          </Button>

          <Button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Memory Master",
                  text: `I just scored ${totalScore} points in Memory Master! Can you beat my score?`,
                  url: window.location.href,
                })
              }
            }}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>

          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 bg-transparent"
          >
            <Home className="w-4 h-4 mr-2" />
            Main Menu
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
