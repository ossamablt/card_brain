"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Brain, Trophy, Users, Zap, Star, Target } from "lucide-react"

export default function WelcomeScreen({ onContinue, gameData }) {
  const stats = gameData?.stats || {}

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {/* Main Logo and Title */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <motion.div
            className="text-8xl mb-4"
            animate={{
              rotate: [0, 5, -5, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          >
            🧠
          </motion.div>
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-4 tracking-tight">
            Memory
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Master</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/80 font-light">Challenge your mind, train your memory</p>
        </motion.div>

        {/* Feature Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 max-w-2xl"
        >
          {[
            { icon: Brain, text: "Smart AI", color: "from-blue-400 to-blue-600" },
            { icon: Users, text: "Multiplayer", color: "from-green-400 to-green-600" },
            { icon: Zap, text: "Power-ups", color: "from-yellow-400 to-yellow-600" },
            { icon: Trophy, text: "Achievements", color: "from-purple-400 to-purple-600" },
            { icon: Star, text: "Themes", color: "from-pink-400 to-pink-600" },
            { icon: Target, text: "Challenges", color: "from-red-400 to-red-600" },
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
              className="text-center"
            >
              <div
                className={`w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r ${feature.color} flex items-center justify-center`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-white/80 text-sm font-medium">{feature.text}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Card */}
        {stats.gamesPlayed > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <Card className="bg-white/10 backdrop-blur-lg border-white/20 p-6">
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-white">{stats.gamesPlayed}</div>
                  <div className="text-white/60 text-sm">Games Played</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">{stats.totalScore || 0}</div>
                  <div className="text-white/60 text-sm">Total Score</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-400">
                    {stats.bestTime ? `${Math.floor(stats.bestTime)}s` : "N/A"}
                  </div>
                  <div className="text-white/60 text-sm">Best Time</div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Play Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={onContinue}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform transition-all duration-300"
          >
            <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}>
              Start Playing →
            </motion.span>
          </Button>
        </motion.div>

        {/* Version Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 text-white/40 text-sm"
        >
          Version 2.0 • Made with ❤️
        </motion.div>
      </div>
    </div>
  )
}
