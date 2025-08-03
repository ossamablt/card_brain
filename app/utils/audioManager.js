// Audio and haptic feedback management
let audioContext = null
let sounds = {}

export async function initializeAudio() {
  if (typeof window === "undefined") return

  try {
    // Initialize Web Audio API
    audioContext = new (window.AudioContext || window.webkitAudioContext)()

    // Create simple sound effects using oscillators
    sounds = {
      flip: createTone(800, 0.1, "sine"),
      match: createTone(1200, 0.2, "triangle"),
      miss: createTone(400, 0.3, "sawtooth"),
      win: createChord([523, 659, 784], 0.5, "sine"), // C major chord
      lose: createTone(200, 0.5, "sawtooth"),
      powerup: createTone(1000, 0.2, "square"),
    }
  } catch (error) {
    console.warn("Audio initialization failed:", error)
  }
}

function createTone(frequency, duration, type = "sine") {
  return () => {
    if (!audioContext) return

    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + duration)
  }
}

function createChord(frequencies, duration, type = "sine") {
  return () => {
    if (!audioContext) return

    frequencies.forEach((frequency, index) => {
      setTimeout(() => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()

        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime)
        oscillator.type = type

        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime)
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration)

        oscillator.start(audioContext.currentTime)
        oscillator.stop(audioContext.currentTime + duration)
      }, index * 100)
    })
  }
}

export function playSound(soundName) {
  if (sounds[soundName]) {
    try {
      sounds[soundName]()
    } catch (error) {
      console.warn(`Failed to play sound ${soundName}:`, error)
    }
  }
}

export function triggerHaptic(intensity = "medium") {
  if (typeof window === "undefined") return

  try {
    if (navigator.vibrate) {
      const patterns = {
        light: [50],
        medium: [100],
        heavy: [200],
      }
      navigator.vibrate(patterns[intensity] || patterns.medium)
    }
  } catch (error) {
    console.warn("Haptic feedback failed:", error)
  }
}

// Capacitor haptics integration (when available)
export async function initializeCapacitorHaptics() {
  try {
    // This would be used when running as a Capacitor app
    if (window.Capacitor) {
      const { Haptics } = await import("@capacitor/haptics")
      return Haptics
    }
  } catch (error) {
    console.warn("Capacitor haptics not available:", error)
  }
  return null
}
