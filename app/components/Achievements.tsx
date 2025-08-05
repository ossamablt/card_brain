"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Card } from "@/components/ui/card"

interface Achievement {
  id: string
  name: string
  description: string
  icon: string
}

interface AchievementsProps {
  achievements: Achievement[]
}

export default function Achievements({ achievements }: AchievementsProps) {
  if (!achievements || achievements.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", damping: 15 }}
        >
          <Card className="p-6 max-w-md bg-white/95 backdrop-blur-sm">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🏆 Achievement Unlocked!</h2>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg border-2 border-yellow-300"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <div className="text-3xl mb-2">{achievement.icon}</div>
                    <div className="font-bold text-gray-800">{achievement.name}</div>
                    <div className="text-sm text-gray-600">{achievement.description}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
