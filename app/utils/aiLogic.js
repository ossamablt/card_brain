// AI opponent logic with different difficulty levels
export function makeAIMove(cards, flippedCards, matchedCards, aiMemory, difficulty) {
  const availableIndices = cards
    .map((_, index) => index)
    .filter((index) => !matchedCards.includes(index) && !flippedCards.includes(index))

  if (availableIndices.length < 2) return []

  switch (difficulty) {
    case "easy":
      return makeEasyMove(availableIndices)
    case "medium":
      return makeMediumMove(availableIndices, cards, aiMemory)
    case "hard":
      return makeHardMove(availableIndices, cards, aiMemory)
    default:
      return makeEasyMove(availableIndices)
  }
}

function makeEasyMove(availableIndices) {
  // Easy AI: Mostly random with 20% chance of good move
  const shuffled = [...availableIndices].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 2)
}

function makeMediumMove(availableIndices, cards, aiMemory) {
  // Medium AI: Remembers recent cards, 60% accuracy
  if (Math.random() < 0.4) {
    // 40% chance of random move
    const shuffled = [...availableIndices].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 2)
  }

  // Try to find a match from memory
  const recentMemory = aiMemory.slice(-6) // Remember last 6 cards
  const knownCards = recentMemory.filter((mem) => availableIndices.includes(mem.index))
  const cardGroups = {}

  knownCards.forEach((mem) => {
    if (!cardGroups[mem.cardId]) {
      cardGroups[mem.cardId] = []
    }
    cardGroups[mem.cardId].push(mem.index)
  })

  // Look for a pair in memory
  for (const cardId in cardGroups) {
    if (cardGroups[cardId].length >= 2) {
      return cardGroups[cardId].slice(0, 2)
    }
  }

  // Mix known and unknown cards
  if (knownCards.length > 0) {
    const knownIndex = knownCards[Math.floor(Math.random() * knownCards.length)].index
    const unknownIndices = availableIndices.filter((i) => !knownCards.some((k) => k.index === i))
    if (unknownIndices.length > 0) {
      const randomIndex = unknownIndices[Math.floor(Math.random() * unknownIndices.length)]
      return [knownIndex, randomIndex]
    }
  }

  // Fallback to random
  const shuffled = [...availableIndices].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 2)
}

function makeHardMove(availableIndices, cards, aiMemory) {
  // Hard AI: Near-perfect memory, 90% accuracy
  if (Math.random() < 0.1) {
    // 10% chance of mistake
    const shuffled = [...availableIndices].sort(() => 0.5 - Math.random())
    return shuffled.slice(0, 2)
  }

  // Build complete memory map
  const memoryMap = {}
  aiMemory.forEach((mem) => {
    if (availableIndices.includes(mem.index)) {
      memoryMap[mem.index] = mem.cardId
    }
  })

  // Look for guaranteed matches
  const cardPositions = {}
  Object.entries(memoryMap).forEach(([index, cardId]) => {
    if (!cardPositions[cardId]) {
      cardPositions[cardId] = []
    }
    cardPositions[cardId].push(Number.parseInt(index))
  })

  // Find a matching pair
  for (const cardId in cardPositions) {
    if (cardPositions[cardId].length >= 2) {
      return cardPositions[cardId].slice(0, 2)
    }
  }

  // Strategic exploration: pick cards to maximize information
  const knownIndices = Object.keys(memoryMap).map((i) => Number.parseInt(i))
  const unknownIndices = availableIndices.filter((i) => !knownIndices.includes(i))

  if (unknownIndices.length >= 2) {
    // Explore two unknown cards
    return unknownIndices.slice(0, 2)
  }

  if (knownIndices.length > 0 && unknownIndices.length > 0) {
    // Mix known and unknown
    return [
      knownIndices[Math.floor(Math.random() * knownIndices.length)],
      unknownIndices[Math.floor(Math.random() * unknownIndices.length)],
    ]
  }

  // Fallback
  const shuffled = [...availableIndices].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, 2)
}

export function updateAIMemory(currentMemory, firstIndex, secondIndex, cards) {
  const newMemory = [
    ...currentMemory,
    { index: firstIndex, cardId: cards[firstIndex].id },
    { index: secondIndex, cardId: cards[secondIndex].id },
  ]

  // Keep only the last 20 memories to prevent infinite growth
  return newMemory.slice(-20)
}

// Adaptive difficulty: AI plays slower if player is struggling
export function getAIDelay(playerScore, aiScore, baseDifficulty) {
  const scoreDifference = aiScore - playerScore
  let delayMultiplier = 1

  if (scoreDifference > 20) {
    delayMultiplier = 1.5 // AI plays 50% slower
  } else if (scoreDifference > 10) {
    delayMultiplier = 1.2 // AI plays 20% slower
  }

  const baseDelay = baseDifficulty === "easy" ? 2000 : baseDifficulty === "medium" ? 1500 : 1000

  return baseDelay * delayMultiplier
}
