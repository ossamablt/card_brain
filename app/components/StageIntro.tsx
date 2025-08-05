"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface StageConfig {
  rows: number
  cols: number
  pairs: number
  previewTime: number
}

interface StageIntroProps {
  stage: number
  stageConfig: StageConfig
  onStart: () => void
  onBackToMenu: () => void
}

export default function StageIntro({ stage, stageConfig, onStart, onBackToMenu }: StageIntroProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 max-w-md w-full text-center bg-white/95 backdrop-blur-sm shadow-2xl">
          <motion.h1
            className="text-5xl font-bold text-gray-800 mb-4"
            animate={{
              textShadow: ["0 0 0 transparent", "0 0 20px rgba(59, 130, 246, 0.5)", "0 0 0 transparent"],
            }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            Stage {stage}
          </motion.h1>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <motion.div
              className="bg-gradient-to-br from-blue-100 to-blue-200 p-4 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm text-blue-600 font-semibold">Grid Size</div>
              <div className="text-2xl font-bold text-blue-800">
                {stageConfig.rows} × {stageConfig.cols}
              </div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-green-100 to-green-200 p-4 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm text-green-600 font-semibold">Total Cards</div>
              <div className="text-2xl font-bold text-green-800">{stageConfig.pairs * 2}</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-purple-100 to-purple-200 p-4 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm text-purple-600 font-semibold">Pairs to Find</div>
              <div className="text-2xl font-bold text-purple-800">{stageConfig.pairs}</div>
            </motion.div>

            <motion.div
              className="bg-gradient-to-br from-orange-100 to-orange-200 p-4 rounded-xl"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-sm text-orange-600 font-semibold">Preview Time</div>
              <div className="text-2xl font-bold text-orange-800">{stageConfig.previewTime}s</div>
            </motion.div>
          </div>

          <div className="space-y-3">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={onStart}
                className="w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-lg py-4 shadow-lg"
              >
                🚀 Start Stage {stage}
              </Button>
            </motion.div>

            <Button onClick={onBackToMenu} variant="outline" className="w-full bg-transparent hover:bg-gray-100">
              ← Back to Menu
            </Button>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}
