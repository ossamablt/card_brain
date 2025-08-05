"use client"

import { motion } from "framer-motion"
import { themes } from "../data/themes"

interface Card {
  id: number
  pairId: number
  theme: string
}

interface GameCardProps {
  card: Card
  index: number
  isFlipped: boolean
  isMatched: boolean
  onClick: () => void
  disabled: boolean
  theme: string
}

export default function GameCard({ card, index, isFlipped, isMatched, onClick, disabled, theme }: GameCardProps) {
  const themeData = themes[theme as keyof typeof themes] || themes.animals
  const cardContent = themeData.cards[card.id % themeData.cards.length]

  return (
    <motion.div
      className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 cursor-pointer"
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02 }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Card Back */}
        <div
          className={`absolute inset-0 w-full h-full rounded-xl shadow-lg backface-hidden ${
            isMatched
              ? "bg-gradient-to-br from-green-400 to-green-600 ring-2 ring-green-300"
              : `bg-gradient-to-br ${themeData.backColor} hover:shadow-xl`
          } flex items-center justify-center transition-all duration-300`}
        >
          <div className="text-white text-lg sm:text-xl font-bold drop-shadow-lg">?</div>
        </div>

        {/* Card Front */}
        <div
          className={`absolute inset-0 w-full h-full rounded-xl shadow-lg backface-hidden rotate-y-180 ${
            isMatched
              ? "bg-gradient-to-br from-green-100 to-green-200 border-2 border-green-400"
              : "bg-gradient-to-br from-white to-gray-100 border-2 border-gray-200"
          } flex items-center justify-center`}
        >
          <div className="text-xl sm:text-2xl md:text-3xl drop-shadow-sm">{cardContent}</div>
        </div>
      </motion.div>

      {isMatched && (
        <motion.div
          className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}
    </motion.div>
  )
}
