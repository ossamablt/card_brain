"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { ArrowLeft, Brain, Zap, Clock, Target } from "lucide-react"

interface DifficultySelectionProps {
  mode: string
  onStartGame: (difficulty: string, count?: number) => void
  onBack: () => void
}

export default function DifficultySelection({ mode, onStartGame, onBack }: DifficultySelectionProps) {
  const isAI = mode === "ai"

  const aiDifficulties = [
    {
      level: "easy",
      name: "Beginner",
      description: "Perfect for learning the game",
      icon: "🟢",
      color: "from-green-400 to-green-600",
      features: ["Random moves", "Slow thinking", "Beginner friendly", "2×2 Grid"],
    },
    {
      level: "medium",
      name: "Intermediate",
      description: "Balanced challenge for most players",
      icon: "🟡",
      color: "from-yellow-400 to-orange-500",
      features: ["Smart moves", "Good memory", "Competitive play", "4×4 Grid"],
    },
    {
      level: "hard",
      name: "Expert",
      description: "Ultimate challenge for pros",
      icon: "🔴",
      color: "from-red-400 to-red-600",
      features: ["Perfect memory", "Strategic play", "Expert level", "6×6 Grid"],
    },
  ]

  const multiplayerOptions = [
    {
      count: 2,
      name: "2 Players",
      description: "Classic head-to-head battle",
      icon: "👥",
      color: "from-blue-400 to-blue-600",
      features: ["Quick games", "Intense rivalry", "Best for couples", "4×4 Grid"],
    },
    {
      count: 3,
      name: "3 Players",
      description: "Triple threat competition",
      icon: "👨‍👩‍👦",
      color: "from-purple-400 to-purple-600",
      features: ["Strategic play", "Alliance forming", "Family fun", "4×4 Grid"],
    },
    {
      count: 4,
      name: "4 Players",
      description: "Maximum chaos and fun",
      icon: "👨‍👩‍👧‍👦",
      color: "from-pink-400 to-pink-600",
      features: ["Party mode", "Lots of laughs", "Group challenge", "6×6 Grid"],
    },
  ]

  const options = isAI ? aiDifficulties : multiplayerOptions

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <Button onClick={onBack} variant="ghost" className="text-white hover:bg-white/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white">{isAI ? "Choose AI Difficulty" : "Select Players"}</h1>
            <p className="text-white/70 mt-2">{isAI ? "Pick your challenge level" : "How many players will join?"}</p>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </motion.div>

        {/* Difficulty/Player Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {options.map((option, index) => (
            <motion.div
              key={option.level || option.count}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className="relative overflow-hidden bg-white/10 backdrop-blur-lg border-white/20 p-6 cursor-pointer group hover:bg-white/15 transition-all duration-300 h-full"
                onClick={() => (isAI ? onStartGame(option.level) : onStartGame("medium", option.count))}
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${option.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                />

                {/* Content */}
                <div className="relative z-10 text-center h-full flex flex-col">
                  {/* Icon */}
                  <motion.div
                    className="text-6xl mb-4"
                    animate={{
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.2,
                    }}
                  >
                    {option.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2">{option.name}</h3>
                  <p className="text-white/70 text-sm mb-4">{option.description}</p>

                  {/* Features */}
                  <div className="space-y-2 mb-6 flex-grow">
                    {option.features.map((feature, featureIndex) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 + featureIndex * 0.05 }}
                        className="flex items-center text-white/60 text-sm"
                      >
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${option.color} mr-2`} />
                        {feature}
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    className={`w-full bg-gradient-to-r ${option.color} hover:opacity-90 text-white font-semibold py-3 mt-auto`}
                  >
                    {isAI ? "Challenge AI" : "Start Game"}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Game Features Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
        >
          <h3 className="text-xl font-bold text-white mb-4 text-center">What's Included</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Brain, text: "Memory Training", color: "text-blue-400" },
              { icon: Zap, text: "Power-ups", color: "text-yellow-400" },
              { icon: Clock, text: "Time Challenges", color: "text-green-400" },
              { icon: Target, text: "Achievements", color: "text-purple-400" },
            ].map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <feature.icon className={`w-8 h-8 mx-auto mb-2 ${feature.color}`} />
                <p className="text-white/70 text-sm">{feature.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
