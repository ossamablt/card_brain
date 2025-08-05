"use client"

import { useState, useEffect } from "react"
import WelcomeScreen from "./components/WelcomeScreen"
import GameModeSelection from "./components/GameModeSelection"
import DifficultySelection from "./components/DifficultySelection"
import Game from "./components/Game"
import ResultsScreen from "./components/ResultsScreen"
import UnifiedAuth from "./components/UnifiedAuth"
import { getGameData, saveGameData } from "./utils/gameLogic"
import { initializeAudio } from "./utils/audioManager"
import { useSession, signOut } from "next-auth/react"
import { UserCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

interface UserData {
  email: string
  username?: string
  age?: number
  soundEnabled: boolean
  nickname: string
}

export default function App() {
  const { data: session, status } = useSession()
  const [gameState, setGameState] = useState("auth") // 'auth', 'welcome', 'mode', 'difficulty', 'playing', 'results'
  const [selectedMode, setSelectedMode] = useState(null) // 'ai' or 'multiplayer'
  const [selectedDifficulty, setSelectedDifficulty] = useState("medium")
  const [playerCount, setPlayerCount] = useState(2)
  const [players, setPlayers] = useState([])
  const [gameData, setGameData] = useState(null)
  const [gameResults, setGameResults] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [userData, setUserData] = useState<UserData | null>(null)

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const data = await getGameData()
        setGameData(data)
        await initializeAudio()
      } catch (error) {
        console.error("Failed to initialize app:", error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeApp()
  }, [])

  // Handle session changes
  useEffect(() => {
    if (status === "authenticated" && session && !userData) {
      // User is authenticated but we don't have user data yet
      // This means they're a returning user, so skip onboarding
      handleAuthComplete({
        email: session.user?.email || "",
        username: session.user?.name || session.user?.email?.split('@')[0] || "",
        soundEnabled: true,
        nickname: session.user?.name || session.user?.email?.split('@')[0] || "",
      })
    }
  }, [session, status, userData])

  const handleAuthComplete = (user: UserData) => {
    setUserData(user)
    setGameState("welcome")
  }

  const handleModeSelect = (mode) => {
    setSelectedMode(mode)
    setGameState("difficulty")
  }

  const handleStartGame = (difficulty, count = 2) => {
    setSelectedDifficulty(difficulty)
    setPlayerCount(count)

    let newPlayers = []
    if (selectedMode === "ai") {
      newPlayers = [
        { id: 1, name: userData?.nickname || "You", score: 0, matches: 0, combo: 0, isAI: false },
        { id: 2, name: `AI (${difficulty})`, score: 0, matches: 0, combo: 0, isAI: true, difficulty },
      ]
    } else {
      newPlayers = Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        name: i === 0 ? (userData?.nickname || `Player ${i + 1}`) : `Player ${i + 1}`,
        score: 0,
        matches: 0,
        combo: 0,
        isAI: false,
      }))
    }

    setPlayers(newPlayers)
    setGameState("playing")
  }

  const handleGameComplete = (results) => {
    setGameResults(results)

    const updatedData = {
      ...gameData,
      stats: {
        ...gameData.stats,
        gamesPlayed: (gameData.stats?.gamesPlayed || 0) + 1,
        totalScore: (gameData.stats?.totalScore || 0) + results.totalScore,
        bestTime: Math.min(gameData.stats?.bestTime || 999, results.gameTime),
      },
      achievements: [...(gameData.achievements || []), ...(results.newAchievements || [])],
    }
    setGameData(updatedData)
    saveGameData(updatedData)
    setGameState("results")
  }

  const handlePlayAgain = () => {
    setGameState("difficulty")
  }

  const handleBackToMenu = () => {
    setGameState("welcome")
    setSelectedMode(null)
    setPlayers([])
    setGameResults(null)
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" })
    setUserData(null)
    setGameState("auth")
  }

  // Account icon component
  const AccountIcon = () => {
    if (!session) return null

    return (
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <div className="bg-white/10 backdrop-blur-lg rounded-full p-2 border border-white/20">
          <UserCircle className="w-6 h-6 text-white" />
        </div>
        <Button
          onClick={handleLogout}
          variant="ghost"
          size="sm"
          className="bg-white/10 backdrop-blur-lg text-white hover:bg-white/20 border border-white/20"
        >
          <LogOut className="w-4 h-4 mr-1" />
          Logout
        </Button>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">Loading Memory Master...</div>
      </div>
    )
  }

  if (gameState === "auth") {
    return <UnifiedAuth onAuthComplete={handleAuthComplete} />
  }

  // Show account icon for all authenticated states
  const renderGameContent = () => {
    if (gameState === "welcome") {
      return <WelcomeScreen onContinue={() => setGameState("mode")} gameData={gameData} />
    }

    if (gameState === "mode") {
      return <GameModeSelection onSelectMode={handleModeSelect} onBack={handleBackToMenu} />
    }

    if (gameState === "difficulty") {
      return <DifficultySelection mode={selectedMode} onStartGame={handleStartGame} onBack={() => setGameState("mode")} />
    }

    if (gameState === "playing") {
      return (
        <Game
          players={players}
          setPlayers={setPlayers}
          gameMode={selectedMode}
          difficulty={selectedDifficulty}
          onGameComplete={handleGameComplete}
          onBackToMenu={handleBackToMenu}
          gameData={gameData}
          setGameData={setGameData}
        />
      )
    }

    if (gameState === "results") {
      return <ResultsScreen results={gameResults} onPlayAgain={handlePlayAgain} onBackToMenu={handleBackToMenu} />
    }

    return null
  }

  return (
    <div className="relative">
      <AccountIcon />
      {renderGameContent()}
    </div>
  )
}
