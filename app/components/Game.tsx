"use client"

import { useState, useEffect, useCallback } from "react"
import GameCard from "./Card"
import Scoreboard from "./Scoreboard"
import PowerUps from "./PowerUps"
import { shuffleCards, checkMatch, getModeConfig } from "../utils/gameLogic"
import { makeAIMove, updateAIMemory } from "../utils/aiLogic"
import { checkAchievements } from "../data/achievements"
import { playSound, triggerHaptic } from "../utils/audioManager"
import { motion, AnimatePresence } from "framer-motion"
import { getRandomTheme } from "../data/themes"

export default function Game({
  players,
  setPlayers,
  gameMode,
  difficulty,
  onGameComplete,
  onBackToMenu,
  gameData,
  setGameData,
}) {
  const [gamePhase, setGamePhase] = useState("preview")
  const [cards, setCards] = useState([])
  const [flippedCards, setFlippedCards] = useState([])
  const [matchedCards, setMatchedCards] = useState([])
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0)
  const [previewTimeLeft, setPreviewTimeLeft] = useState(0)
  const [canFlip, setCanFlip] = useState(true)
  const [gameStartTime, setGameStartTime] = useState(null)
  const [totalMoves, setTotalMoves] = useState(0)
  const [perfectGame, setPerfectGame] = useState(true)
  const [powerUps, setPowerUps] = useState({ hint: 3, shuffle: 2, extraTime: 2 })
  const [aiMemory, setAiMemory] = useState([])
  const [selectedTheme, setSelectedTheme] = useState("animals")
  const [streakCount, setStreakCount] = useState(0)
  const [showStreakBonus, setShowStreakBonus] = useState(false)

  const modeConfig = getModeConfig(difficulty)
  const currentPlayer = players[currentPlayerIndex]

  useEffect(() => {
    initializeGame()
  }, [])

  useEffect(() => {
    if (gamePhase === "playing" && currentPlayer?.isAI && canFlip) {
      const timer = setTimeout(() => {
        handleAITurn()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [currentPlayerIndex, gamePhase, canFlip])

  const initializeGame = () => {
    const theme = getRandomTheme()
    setSelectedTheme(theme)

    const newCards = shuffleCards(modeConfig.pairs, theme)
    setCards(newCards)
    setFlippedCards([])
    setMatchedCards([])
    setCurrentPlayerIndex(0)
    setGamePhase("preview")
    setCanFlip(true)
    setGameStartTime(Date.now())
    setTotalMoves(0)
    setPerfectGame(true)
    setAiMemory([])
    setStreakCount(0)

    // Start preview
    setPreviewTimeLeft(modeConfig.previewTime)
    setFlippedCards(newCards.map((_, index) => index))

    const timer = setInterval(() => {
      setPreviewTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          setFlippedCards([])
          setGamePhase("playing")
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleAITurn = useCallback(() => {
    if (!currentPlayer?.isAI || !canFlip) return

    const aiMove = makeAIMove(cards, flippedCards, matchedCards, aiMemory, currentPlayer.difficulty)

    if (aiMove.length > 0) {
      setFlippedCards([aiMove[0]])
      playSound("flip")
      triggerHaptic("light")

      setTimeout(() => {
        setFlippedCards([aiMove[0], aiMove[1]])
        playSound("flip")
        triggerHaptic("light")
        handleCardFlip(aiMove[0], aiMove[1], true)
      }, 800)
    }
  }, [cards, flippedCards, matchedCards, aiMemory, currentPlayer, canFlip])

  const handleCardClick = (index) => {
    if (
      !canFlip ||
      gamePhase !== "playing" ||
      currentPlayer?.isAI ||
      flippedCards.includes(index) ||
      matchedCards.includes(index)
    ) {
      return
    }

    const newFlippedCards = [...flippedCards, index]
    setFlippedCards(newFlippedCards)
    playSound("flip")
    triggerHaptic("light")

    if (newFlippedCards.length === 2) {
      handleCardFlip(newFlippedCards[0], newFlippedCards[1], false)
    }
  }

  const handleCardFlip = (firstIndex, secondIndex, isAI) => {
    setCanFlip(false)
    setTotalMoves((prev) => prev + 1)

    // Update AI memory
    if (players.some((p) => p.isAI)) {
      setAiMemory((prev) => updateAIMemory(prev, firstIndex, secondIndex, cards))
    }

    setTimeout(() => {
      const isMatch = checkMatch(cards[firstIndex], cards[secondIndex])

      if (isMatch) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex])
        setFlippedCards([])
        playSound("match")
        triggerHaptic("medium")

        // Update player score with streak bonus
        const updatedPlayers = [...players]
        const baseScore = 10
        const streakBonus = streakCount * 2
        const totalScore = baseScore + streakBonus

        updatedPlayers[currentPlayerIndex].score += totalScore
        updatedPlayers[currentPlayerIndex].matches += 1
        updatedPlayers[currentPlayerIndex].combo += 1

        setPlayers(updatedPlayers)
        setStreakCount((prev) => prev + 1)

        // Show streak bonus animation
        if (streakCount > 0) {
          setShowStreakBonus(true)
          setTimeout(() => setShowStreakBonus(false), 2000)
        }

        // Check if game is complete
        if (matchedCards.length + 2 >= cards.length) {
          handleGameComplete(updatedPlayers)
        }
      } else {
        setFlippedCards([])
        setPerfectGame(false)
        setStreakCount(0)
        playSound("miss")

        const updatedPlayers = [...players]
        updatedPlayers[currentPlayerIndex].combo = 0
        setPlayers(updatedPlayers)

        if (players.length > 1) {
          setCurrentPlayerIndex((prev) => (prev + 1) % players.length)
        }
      }

      setCanFlip(true)
    }, 1000)
  }

  const handleGameComplete = (finalPlayers) => {
    playSound("win")
    triggerHaptic("heavy")

    const gameTime = (Date.now() - gameStartTime) / 1000
    const totalScore = finalPlayers.reduce((sum, player) => sum + player.score, 0)

    // Check achievements
    const achievements = checkAchievements({
      perfectGame,
      gameTime,
      totalMoves,
      combo: Math.max(...finalPlayers.map((p) => p.combo)),
      mode: gameMode,
    })

    setTimeout(() => {
      onGameComplete({
        players: finalPlayers,
        totalScore,
        gameTime,
        newAchievements: achievements,
        stars: calculateStars(gameTime, totalMoves, perfectGame),
      })
    }, 1500)
  }

  const calculateStars = (gameTime, moves, perfect) => {
    if (perfect && gameTime < 30) return 3
    if (perfect || gameTime < 60) return 2
    return 1
  }

  const usePowerUp = (type) => {
    if (powerUps[type] <= 0) return

    setPowerUps((prev) => ({ ...prev, [type]: prev[type] - 1 }))
    playSound("powerup")
    triggerHaptic("medium")

    switch (type) {
      case "hint":
        const unmatched = cards.map((_, index) => index).filter((index) => !matchedCards.includes(index))
        const randomCards = unmatched.sort(() => 0.5 - Math.random()).slice(0, 2)
        setFlippedCards(randomCards)
        setTimeout(() => setFlippedCards([]), 1500)
        break

      case "shuffle":
        const shuffledCards = [...cards]
        const unmatchedIndices = cards
          .map((_, index) => (matchedCards.includes(index) ? null : index))
          .filter((index) => index !== null)

        for (let i = unmatchedIndices.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          const temp = shuffledCards[unmatchedIndices[i]]
          shuffledCards[unmatchedIndices[i]] = shuffledCards[unmatchedIndices[j]]
          shuffledCards[unmatchedIndices[j]] = temp
        }
        setCards(shuffledCards)
        break

      case "extraTime":
        // Add extra preview time
        setPreviewTimeLeft((prev) => prev + 3)
        break
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-4">
      <div className="max-w-4xl mx-auto">
        <Scoreboard
          players={players}
          currentPlayerIndex={currentPlayerIndex}
          gameMode={gameMode}
          onBackToMenu={onBackToMenu}
        />

        <PowerUps powerUps={powerUps} onUsePowerUp={usePowerUp} gamePhase={gamePhase} />

        {gamePhase === "preview" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-4"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 inline-block border border-white/20">
              <h2 className="text-2xl font-bold text-white mb-2">Memorize the cards!</h2>
              <motion.p
                className="text-4xl font-bold text-yellow-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                {previewTimeLeft}s
              </motion.p>
            </div>
          </motion.div>
        )}

        {/* Streak Bonus Animation */}
        <AnimatePresence>
          {showStreakBonus && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.5 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.5 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50"
            >
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-2xl px-6 py-3 rounded-full shadow-2xl">
                🔥 Streak Bonus +{streakCount * 2}!
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className="grid gap-2 sm:gap-3 justify-center mx-auto mb-6"
          style={{
            gridTemplateColumns: `repeat(${modeConfig.cols}, minmax(0, 1fr))`,
            maxWidth: `${modeConfig.cols * 80 + (modeConfig.cols - 1) * 12}px`,
          }}
        >
          <AnimatePresence>
            {cards.map((card, index) => (
              <GameCard
                key={`${card.id}-${index}`}
                card={card}
                index={index}
                isFlipped={flippedCards.includes(index) || matchedCards.includes(index)}
                isMatched={matchedCards.includes(index)}
                onClick={() => handleCardClick(index)}
                disabled={!canFlip || gamePhase !== "playing" || currentPlayer?.isAI}
                theme={selectedTheme}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Game Stats */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 inline-block border border-white/20">
            <div className="flex items-center gap-6 text-white">
              <div>
                <div className="text-sm text-white/70">Moves</div>
                <div className="text-xl font-bold">{totalMoves}</div>
              </div>
              <div>
                <div className="text-sm text-white/70">Streak</div>
                <div className="text-xl font-bold text-yellow-400">{streakCount}</div>
              </div>
              <div>
                <div className="text-sm text-white/70">Matches</div>
                <div className="text-xl font-bold text-green-400">{matchedCards.length / 2}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
