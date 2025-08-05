"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Brain, Sparkles, Volume2, VolumeX, Gamepad2, ArrowRight, Check, UserCircle } from "lucide-react"
import { useSession, signIn, signOut } from "next-auth/react"

interface UnifiedAuthProps {
  onAuthComplete: (userData: {
    email: string
    username?: string
    age?: number
    soundEnabled: boolean
    nickname: string
  }) => void
}

type AuthMode = "signin" | "signup" | "onboarding" | "complete"

export default function UnifiedAuth({ onAuthComplete }: UnifiedAuthProps) {
  const { data: session, status } = useSession()
  const [authMode, setAuthMode] = useState<AuthMode>("signin")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [authError, setAuthError] = useState("")
  const [isNewUser, setIsNewUser] = useState(false)
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
    age: "",
    nickname: "",
  })

  const [floatingCards, setFloatingCards] = useState<
    { left: string; top: string; icon: string }[]
  >([])

  useEffect(() => {
    const icons = ["🧠", "🎮", "⭐", "🎯", "🔥", "💎", "🎪", "🎨"]
    setFloatingCards(
      Array.from({ length: 20 }).map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        icon: icons[Math.floor(Math.random() * icons.length)],
      }))
    )
  }, [])

  // If user is already authenticated, handle based on whether they're new or returning
  useEffect(() => {
    if (session && status === "authenticated") {
      if (session.isNewUser) {
        // New user - show onboarding
        setAuthMode("onboarding")
        setFormData(prev => ({
          ...prev,
          email: session.user?.email || "",
          username: session.user?.name || session.user?.email?.split('@')[0] || "",
          nickname: session.user?.name || session.user?.email?.split('@')[0] || "",
        }))
      } else {
        // Returning user - skip onboarding and go directly to game
        handleDirectAuthComplete()
      }
    }
  }, [session, status])

  const handleDirectAuthComplete = () => {
    if (session?.user) {
      onAuthComplete({
        email: session.user.email || "",
        username: session.user.name || session.user.email?.split('@')[0] || "",
        soundEnabled,
        nickname: session.user.name || session.user.email?.split('@')[0] || "",
      })
    }
  }

  const handleAuthSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setAuthError("")

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        username: formData.username,
        isSignUp: authMode === "signup" ? "true" : "false",
        redirect: false,
      })

      if (result?.error) {
        setAuthError(result.error === "User already exists" ? "User already exists" : "Invalid email or password")
        setIsLoading(false)
      } else {
        // Success - the session will be updated automatically
        setIsLoading(false)
      }
    } catch (error) {
      setAuthError("An error occurred during authentication")
      setIsLoading(false)
    }
  }

  const handleSocialAuth = async (provider: string) => {
    setIsLoading(true)
    setAuthError("")
    
    // Mark as new user for social auth (they'll need onboarding)
    setIsNewUser(true)
    
    try {
      await signIn(provider, { 
        callbackUrl: "/",
        redirect: true 
      })
    } catch (error) {
      setAuthError(`Failed to sign in with ${provider}`)
      setIsLoading(false)
    }
  }

  const handleOnboardingComplete = () => {
    if (!formData.age || !formData.nickname) return

    onAuthComplete({
      email: formData.email,
      username: formData.username || formData.email.split('@')[0],
      age: parseInt(formData.age),
      soundEnabled,
      nickname: formData.nickname,
    })
  }

  const renderSignInForm = () => (
    <motion.div
      key="signin"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      {authError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-400/50 text-red-300 px-4 py-3 rounded-xl text-sm"
        >
          {authError}
        </motion.div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-white/50" />
            </div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all duration-300"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/50" />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-yellow-400/50 focus:ring-yellow-400/20 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white/80 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold py-3 h-12 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
          />
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Sign In
          </>
        )}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setAuthMode("signup")}
          className="text-yellow-400 hover:text-yellow-300 text-sm font-medium transition-colors"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </motion.div>
  )

  const renderSignUpForm = () => (
    <motion.div
      key="signup"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-6"
    >
      {authError && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/20 border border-red-400/50 text-red-300 px-4 py-3 rounded-xl text-sm"
        >
          {authError}
        </motion.div>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">Username</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-white/50" />
            </div>
            <Input
              type="text"
              placeholder="Choose a username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-green-400/50 focus:ring-green-400/20 transition-all duration-300"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-white/50" />
            </div>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-green-400/50 focus:ring-green-400/20 transition-all duration-300"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/50" />
            </div>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-green-400/50 focus:ring-green-400/20 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white/80 transition-colors"
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">Confirm Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-white/50" />
            </div>
            <Input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-green-400/50 focus:ring-green-400/20 transition-all duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/50 hover:text-white/80 transition-colors"
            >
              {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 h-12 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
      >
        {isLoading ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
          />
        ) : (
          <>
            <Sparkles className="w-5 h-5 mr-2" />
            Create Account
          </>
        )}
      </Button>

      <div className="text-center">
        <button
          type="button"
          onClick={() => setAuthMode("signin")}
          className="text-green-400 hover:text-green-300 text-sm font-medium transition-colors"
        >
          Already have an account? Sign in
        </button>
      </div>
    </motion.div>
  )

  const renderOnboarding = () => (
    <motion.div
      key="onboarding"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-4xl mb-4"
        >
          🎮
        </motion.div>
        <h3 className="text-xl font-bold text-white mb-2">Let's personalize your experience!</h3>
        <p className="text-white/70 text-sm">Just a few quick questions to get you started</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">How old are you?</label>
          <Input
            type="number"
            placeholder="Enter your age"
            value={formData.age}
            onChange={(e) => setFormData({ ...formData, age: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-purple-400/50 focus:ring-purple-400/20 transition-all duration-300"
            min="1"
            max="120"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-white/80 text-sm font-medium">Choose a nickname</label>
          <Input
            type="text"
            placeholder="What should we call you?"
            value={formData.nickname}
            onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 focus:border-purple-400/50 focus:ring-purple-400/20 transition-all duration-300"
            required
          />
        </div>

        <div className="space-y-3">
          <label className="text-white/80 text-sm font-medium">Sound Effects</label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSoundEnabled(true)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                soundEnabled
                  ? "bg-green-500/20 border-green-400 text-green-300"
                  : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
              }`}
            >
              <Volume2 className="w-5 h-5" />
              <span className="text-sm font-medium">On</span>
            </button>
            <button
              type="button"
              onClick={() => setSoundEnabled(false)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all duration-300 ${
                !soundEnabled
                  ? "bg-red-500/20 border-red-400 text-red-300"
                  : "bg-white/10 border-white/20 text-white/70 hover:bg-white/20"
              }`}
            >
              <VolumeX className="w-5 h-5" />
              <span className="text-sm font-medium">Off</span>
            </button>
          </div>
        </div>
      </div>

      <Button
        onClick={handleOnboardingComplete}
        disabled={!formData.age || !formData.nickname}
        className="w-full bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-bold py-3 h-12 rounded-xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Gamepad2 className="w-5 h-5 mr-2" />
        Start Game
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>
  )

  // Show loading state while checking session
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {floatingCards.map((card, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-16 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
            animate={{
              x: [0, 100, 0],
              y: [0, -50, 0],
              rotate: [0, 180, 360],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
            style={{
              left: card.left,
              top: card.top,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-white/50 text-xl">
              {card.icon}
            </div>
          </motion.div>
        ))}

        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-2000" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo and Title */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-2xl"
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <Brain className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-2">Memory Master</h1>
            <p className="text-white/70">
              {authMode === "signin" && "Welcome back! Ready to challenge your mind?"}
              {authMode === "signup" && "Create your account and start training your brain!"}
              {authMode === "onboarding" && "Almost ready to play!"}
            </p>
          </motion.div>

          {/* Auth Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            {/* Mode Tabs */}
            {authMode !== "onboarding" && (
              <div className="flex mb-6 bg-white/10 rounded-xl p-1">
                <button
                  onClick={() => setAuthMode("signin")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    authMode === "signin"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setAuthMode("signup")}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-300 ${
                    authMode === "signup"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  Sign Up
                </button>
              </div>
            )}

            <form onSubmit={handleAuthSubmit}>
              <AnimatePresence mode="wait">
                {authMode === "signin" && renderSignInForm()}
                {authMode === "signup" && renderSignUpForm()}
                {authMode === "onboarding" && renderOnboarding()}
              </AnimatePresence>
            </form>

            {/* Social Auth */}
            {authMode !== "onboarding" && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-white/60">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    type="button"
                    onClick={() => handleSocialAuth("google")}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button>

                  <Button
                    type="button"
                    onClick={() => handleSocialAuth("github")}
                    variant="outline"
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 rounded-xl transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </Button>
                </div>
              </>
            )}
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-8"
          >
            <p className="text-white/40 text-sm">
              © 2024 Memory Master. Made with ❤️ for brain training.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
} 