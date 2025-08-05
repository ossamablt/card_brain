"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface PowerUps {
  hint: number
  shuffle: number
  extraTime: number
}

interface PowerUpsProps {
  powerUps: PowerUps
  onUsePowerUp: (type: string) => void
  gamePhase: string
}

export default function PowerUps({ powerUps, onUsePowerUp, gamePhase }: PowerUpsProps) {
  if (gamePhase !== "playing") return null

  return (
    <Card className="mb-4 p-3 bg-white/90 backdrop-blur-sm">
      <div className="flex justify-center gap-2 sm:gap-4">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => onUsePowerUp("hint")}
            disabled={powerUps.hint <= 0}
            className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-3 py-2 text-xs sm:text-sm"
          >
            💡 Hint ({powerUps.hint})
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => onUsePowerUp("shuffle")}
            disabled={powerUps.shuffle <= 0}
            className="bg-purple-500 hover:bg-purple-600 text-white px-2 sm:px-3 py-2 text-xs sm:text-sm"
          >
            🔀 Shuffle ({powerUps.shuffle})
          </Button>
        </motion.div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => onUsePowerUp("extraTime")}
            disabled={powerUps.extraTime <= 0}
            className="bg-green-500 hover:bg-green-600 text-white px-2 sm:px-3 py-2 text-xs sm:text-sm"
          >
            ⏰ +Time ({powerUps.extraTime})
          </Button>
        </motion.div>
      </div>
    </Card>
  )
}
