"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface GameData {
  unlockedStages?: number
}

interface ModeSelectionProps {
  onStartGame: (mode: string, count?: number, difficulty?: string) => void
  gameData: GameData | null
  currentStage: number
  setCurrentStage: (stage: number) => void
}

export default function ModeSelection({ onStartGame, gameData, currentStage, setCurrentStage }: ModeSelectionProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl w-full"
      >
        <Card className="p-8 bg-white/90 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Memory Master</h1>
            <p className="text-xl text-gray-600">Challenge your memory across 10 exciting stages!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Solo Mode */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card
                className="p-6 h-full bg-gradient-to-br from-green-50 to-emerald-100 border-2 border-green-200 hover:border-green-400 transition-all cursor-pointer"
                onClick={() => onStartGame("solo")}
              >
                <div className="text-center">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">Solo Challenge</h3>
                  <p className="text-green-600 text-sm mb-4">Test your memory skills alone</p>
                  <Button className="w-full bg-green-600 hover:bg-green-700">Start Solo</Button>
                </div>
              </Card>
            </motion.div>

            {/* AI Mode */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="p-6 h-full bg-gradient-to-br from-orange-50 to-red-100 border-2 border-orange-200 hover:border-orange-400 transition-all">
                <div className="text-center">
                  <div className="text-4xl mb-4">🤖</div>
                  <h3 className="text-xl font-bold text-orange-800 mb-2">VS AI</h3>
                  <p className="text-orange-600 text-sm mb-4">Challenge the computer</p>
                  <div className="space-y-2">
                    <Button
                      onClick={() => onStartGame("ai", 2, "easy")}
                      className="w-full bg-green-500 hover:bg-green-600 text-sm"
                    >
                      Easy AI
                    </Button>
                    <Button
                      onClick={() => onStartGame("ai", 2, "medium")}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-sm"
                    >
                      Medium AI
                    </Button>
                    <Button
                      onClick={() => onStartGame("ai", 2, "hard")}
                      className="w-full bg-red-500 hover:bg-red-600 text-sm"
                    >
                      Hard AI
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Multiplayer Mode */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Card className="p-6 h-full bg-gradient-to-br from-blue-50 to-purple-100 border-2 border-blue-200 hover:border-blue-400 transition-all">
                <div className="text-center">
                  <div className="text-4xl mb-4">👥</div>
                  <h3 className="text-xl font-bold text-blue-800 mb-2">Multiplayer</h3>
                  <p className="text-blue-600 text-sm mb-4">Play with friends locally</p>
                  <div className="grid grid-cols-2 gap-2">
                    {[2, 3, 4].map((count) => (
                      <Button
                        key={count}
                        onClick={() => onStartGame("multiplayer", count)}
                        className="bg-blue-600 hover:bg-blue-700 text-sm"
                      >
                        {count}P
                      </Button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Stage Selection */}
          <Card className="p-6 bg-gray-50">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Select Stage (1-{gameData?.unlockedStages || 1})</h3>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {Array.from({ length: 10 }, (_, i) => (
                <Button
                  key={i}
                  onClick={() => setCurrentStage(i + 1)}
                  disabled={i + 1 > (gameData?.unlockedStages || 1)}
                  variant={currentStage === i + 1 ? "default" : "outline"}
                  className={`aspect-square ${
                    i + 1 <= (gameData?.unlockedStages || 1) ? "hover:bg-blue-100" : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Current Stage: {currentStage} | Unlocked: {gameData?.unlockedStages || 1}/10
            </p>
          </Card>
        </Card>
      </motion.div>
    </div>
  )
}
