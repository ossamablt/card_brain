"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Eye, EyeOff, Mail, Lock, User, Brain, Sparkles, ArrowLeft } from "lucide-react"
import { useRouter } from 'next/navigation'

interface SignUpPageProps {
  onSignUp?: (formData: { username: string; email: string; password: string; confirmPassword: string }) => void;
  onBackToLogin?: () => void;
}

export default function SignUpPage({ onSignUp, onBackToLogin }: SignUpPageProps) {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match!")
      return
    }

    setIsLoading(true)

    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      }),
    })

    setIsLoading(false)

    if (response.ok) {
      router.push('/profile')
    } else {
      // Handle errors (e.g., show a message)
      alert('Sign up failed')
    }
  }

  const handleSocialSignUp = (provider) => {
    console.log(`Sign up with ${provider}`)
    // Implement social signup logic
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Memory Cards */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-10 h-14 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
            animate={{
              x: [0, 80, 0],
              y: [0, -40, 0],
              rotate: [0, 90, 180],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 6 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 4,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          >
            <div className="w-full h-full flex items-center justify-center text-white/40 text-lg">
              {["🎮", "⭐", "🎯", "💎", "🔥", "✨"][Math.floor(Math.random() * 6)]}
            </div>
          </motion.div>
        ))}

        {/* Gradient Orbs */}
        <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-green-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        onClick={onBackToLogin}
        className="absolute top-8 left-8 z-20 flex items-center text-white/80 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        <span className="font-['Nunito']">Back to Login</span>
      </motion.button>

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
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mb-4 shadow-2xl"
              animate={{
                rotate: [0, -5, 5, 0],
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
            <h1 className="text-4xl font-bold text-white mb-2 font-['Poppins']">Join Memory Master</h1>
            <p className="text-white/70 font-['Nunito']">Create your account and start training your brain!</p>
          </motion.div>

          {/* Sign Up Card */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Username Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-2"
              >
                <label className="text-white/80 text-sm font-medium font-['Nunito']">Username</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-white/50" />
                  </div>
                  <Input
                    type="text"
                    placeholder="Choose a username"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 font-['Nunito'] focus:border-green-400/50 focus:ring-green-400/20 transition-all duration-300"
                    required
                  />
                </div>
              </motion.div>

              {/* Email Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-2"
              >
                <label className="text-white/80 text-sm font-medium font-['Nunito']">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-white/50" />
                  </div>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 font-['Nunito'] focus:border-green-400/50 focus:ring-green-400/20 transition-all duration-300"
                    required
                  />
                </div>
              </motion.div>

              {/* Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="space-y-2"
              >
                <label className="text-white/80 text-sm font-medium font-['Nunito']">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 font-['Nunito'] focus:border-green-400/50 focus:ring-green-400/20 transition-all duration-300"
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
              </motion.div>

              {/* Confirm Password Field */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-2"
              >
                <label className="text-white/80 text-sm font-medium font-['Nunito']">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-white/50" />
                  </div>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="pl-12 pr-12 bg-white/10 border-white/20 text-white placeholder:text-white/50 rounded-xl h-12 font-['Nunito'] focus:border-green-400/50 focus:ring-green-400/20 transition-all duration-300"
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
              </motion.div>

              {/* Sign Up Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 h-12 rounded-xl shadow-lg font-['Poppins'] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
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
              </motion.div>

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-transparent text-white/60 font-['Nunito']">Or sign up with</span>
                </div>
              </motion.div>

              {/* Social Sign Up Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="grid grid-cols-2 gap-4"
              >
                <Button
                  type="button"
                  onClick={() => handleSocialSignUp("google")}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 rounded-xl font-['Nunito'] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
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
                  onClick={() => handleSocialSignUp("facebook")}
                  variant="outline"
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20 h-12 rounded-xl font-['Nunito'] transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </motion.div>
            </form>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mt-8"
          >
            <p className="text-white/40 text-sm font-['Nunito']">
              By signing up, you agree to our Terms of Service and Privacy Policy.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
