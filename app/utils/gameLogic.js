import { themes } from "../data/themes"

// Simplified game mode configurations based on difficulty
export const gameModeConfigs = {
  easy: { rows: 2, cols: 2, pairs: 2, previewTime: 5 },
  medium: { rows: 4, cols: 4, pairs: 8, previewTime: 3 },
  hard: { rows: 6, cols: 6, pairs: 18, previewTime: 2 },
}

export function getModeConfig(difficulty) {
  return gameModeConfigs[difficulty] || gameModeConfigs.medium
}

export function shuffleCards(pairCount, theme = "animals") {
  const cards = []
  const themeData = themes[theme] || themes.animals

  // Create pairs of cards
  for (let i = 0; i < pairCount; i++) {
    cards.push({ id: i, pairId: i, theme })
    cards.push({ id: i, pairId: i, theme })
  }

  // Shuffle using Fisher-Yates algorithm
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[cards[i], cards[j]] = [cards[j], cards[i]]
  }

  return cards
}

export function checkMatch(card1, card2) {
  return card1.pairId === card2.pairId
}

export function getGameData() {
  if (typeof window === "undefined") {
    return {
      stats: { gamesPlayed: 0, totalScore: 0, bestTime: 999 },
      achievements: [],
      preferences: { soundEnabled: true, hapticsEnabled: true },
    }
  }

  try {
    const saved = localStorage.getItem("memoryMasterData")
    if (saved) {
      const data = JSON.parse(saved)
      return {
        stats: { gamesPlayed: 0, totalScore: 0, bestTime: 999, ...data.stats },
        achievements: data.achievements || [],
        preferences: { soundEnabled: true, hapticsEnabled: true, ...data.preferences },
      }
    }
  } catch (error) {
    console.error("Error loading game data:", error)
  }

  return {
    stats: { gamesPlayed: 0, totalScore: 0, bestTime: 999 },
    achievements: [],
    preferences: { soundEnabled: true, hapticsEnabled: true },
  }
}

export function saveGameData(data) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("memoryMasterData", JSON.stringify(data))
    } catch (error) {
      console.error("Error saving game data:", error)
    }
  }
}

export function calculateScore(matches, timeBonus, comboBonus, streakBonus = 0) {
  return matches * 10 + timeBonus + comboBonus + streakBonus
}

export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60)
  const secs = Math.floor(seconds % 60)
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

// Enhanced validation with better error handling
export function validateGameState(cards, flippedCards, matchedCards) {
  try {
    const totalCards = cards.length
    const flippedCount = flippedCards.length
    const matchedCount = matchedCards.length

    // Basic validation
    if (flippedCount > 2) return false
    if (matchedCount > totalCards) return false
    if (matchedCount % 2 !== 0) return false

    // Check for invalid indices
    const maxIndex = totalCards - 1
    const invalidFlipped = flippedCards.some((index) => index < 0 || index > maxIndex)
    const invalidMatched = matchedCards.some((index) => index < 0 || index > maxIndex)

    return !invalidFlipped && !invalidMatched
  } catch (error) {
    console.error("Game state validation error:", error)
    return false
  }
}

// Performance optimization utilities
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Memory optimization for large games
export function optimizeMemory(gameState) {
  // Clean up old game states and optimize memory usage
  const { cards, flippedCards, matchedCards, ...optimizedState } = gameState

  return {
    ...optimizedState,
    cards: cards.slice(), // Create shallow copy
    flippedCards: [...new Set(flippedCards)], // Remove duplicates
    matchedCards: [...new Set(matchedCards)], // Remove duplicates
  }
}
