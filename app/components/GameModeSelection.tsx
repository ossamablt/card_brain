"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Bot, Users, ArrowLeft, Sparkles, Zap } from "lucide-react"

export default function GameModeSelection({ onSelectMode, onBack }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
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
          <h1 className="text-3xl font-bold text-white">Choose Your Challenge</h1>
          <div className="w-20" /> {/* Spacer */}
        </motion.div>

        {/* Mode Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* AI Mode */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="relative overflow-hidden bg-gradient-to-br from-blue-600/20 to-cyan-600/20 backdrop-blur-lg border-blue-400/30 p-8 cursor-pointer group hover:border-blue-400/50 transition-all duration-300"
              onClick={() => onSelectMode("ai")}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Bot className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-4">VS AI</h2>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Challenge our smart AI opponents with different difficulty levels. Perfect for solo practice and skill
                  improvement.
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {[
                    "3 AI difficulty levels",
                    "Adaptive learning system",
                    "Perfect for training",
                    "Instant gameplay",
                  ].map((feature, index) => (
                    <motion.div
                      key={feature}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-center text-white/70 text-sm"
                    >
                      <Sparkles className="w-4 h-4 mr-2 text-blue-400" />
                      {feature}
                    </motion.div>
                  ))}
                </div>

                <Button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-3">
                  Challenge AI
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Multiplayer Mode */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card
              className="relative overflow-hidden bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-lg border-green-400/30 p-8 cursor-pointer group hover:border-green-400/50 transition-all duration-300"
              onClick={() => onSelectMode("multiplayer")}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10 text-center">
                <motion.div
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Users className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-2xl font-bold text-white mb-4">Local Multiplayer</h2>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Play with friends and family on the same device. Turn-based gameplay with competitive scoring.
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {["2-4 players support", "Turn-based gameplay", "Real-time scoring", "Social fun experience"].map(
                    (feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="flex items-center text-white/70 text-sm"
                      >
                        <Zap className="w-4 h-4 mr-2 text-green-400" />
                        {feature}
                      </motion.div>
                    ),
                  )}
                </div>

                <Button className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-3">
                  Play Together
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Tip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <p className="text-white/60 text-sm">💡 Tip: Start with AI mode to practice, then challenge your friends!</p>
        </motion.div>
      </div>
    </div>
  )
}
