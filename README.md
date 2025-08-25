# Memory Master - Modern Memory Card Game

A comprehensive memory card game built with React, Next.js, and Capacitor for cross-platform mobile deployment.

## Features

### 🎮 Game Modes and levels 
- **Easy Mode**: 2×2 grid (4 cards)
- **Medium Mode**: 4×4 grid (16 cards) 
- **Hard Mode**: 6×6 grid (36 cards)
- **Time Attack**: Beat the clock!
- **Limited Moves**: Complete with X flips only
- **Endless Mode**: Infinite difficulty progression

### 🤖 AI Opponents
- **Easy AI**: Random moves with occasional good choices
- **Medium AI**: Remembers recent cards, 60% accuracy
- **Hard AI**: Near-perfect memory, 90% accuracy
- **Adaptive Difficulty**: AI adjusts based on player performance

### 👥 Multiplayer Support
- **Local Multiplayer**: 2-4 players on same device
- **Turn-based System**: Match = continue, miss = next player
- **Score Tracking**: Real-time scoreboard with highlights
- **Optional Score Steal Mode**: Steal points from opponents

### 🏆 Achievements & Progression
- **Perfect Memory**: Complete without mistakes
- **Speed Runner**: Finish under 30 seconds
- **Combo Master**: 3+ consecutive matches
- **Star Rating System**: 1-3 stars based on performance
- **Progress Persistence**: LocalStorage saves all data

### ⚡ Power-ups
- **💡 Hint**: Reveal 2 random cards for 1 second
- **🔀 Shuffle**: Randomize remaining face-down cards
- **⏰ Extra Time**: Add 5 seconds in timed modes
- **Limited Usage**: Earn through streaks and achievements

### 🎨 Themes & Customization
- **6 Built-in Themes**: Animals, Emojis, Fruits, Numbers, Space, Food
- **Custom Deck Support**: Upload your own images
- **Random Theme**: Different theme each round
- **Responsive Design**: Works on all screen sizes

### 📱 Mobile Features
- **Capacitor Integration**: Native mobile app capabilities
- **Haptic Feedback**: Vibration on flip/match/win
- **Audio Effects**: Sound feedback for all actions
- **Offline Storage**: Capacitor Storage for mobile persistence
- **Fullscreen Experience**: Optimized mobile UI

## Installation & Setup

### Web Development
\`\`\`bash
npm install
npm run dev
\`\`\`

### Mobile Development

#### Android Setup
\`\`\`bash
# Add Android platform
npm run cap:add:android

# Build and sync
npm run build
npm run cap:sync

# Open in Android Studio
npm run cap:open:android
\`\`\`

#### iOS Setup
\`\`\`bash
# Add iOS platform
npm run cap:add:ios

# Build and sync
npm run build
npm run cap:sync

# Open in Xcode
npm run cap:open:ios
\`\`\`

### Quick Mobile Build Commands
\`\`\`bash
# Build for Android
npm run cap:build:android

# Build for iOS
npm run cap:build:ios
\`\`\`

## Project Structure

\`\`\`
src/
├── components/
│   ├── Card.tsx              # Individual card with flip animation
│   ├── Game.tsx              # Main game logic and state
│   ├── GameIntro.tsx         # Stage introduction screen
│   ├── Menu.tsx              # Main menu and mode selection
│   ├── PowerUps.tsx          # Power-up UI and logic
│   └── Scoreboard.tsx        # Player scores and turn indicators
├── data/
│   ├── achievements.js       # Achievement definitions
│   └── themes.js             # Card themes and assets
├── utils/
│   ├── aiLogic.js           # AI opponent behavior
│   ├── audioManager.js      # Sound and haptic feedback
│   └── gameLogic.js         # Core game mechanics
└── app/
    └── page.tsx             # Main app component
\`\`\`

## Technical Features

### 🔧 Core Technologies
- **React 18**: Latest React with hooks and concurrent features
- **Next.js 14**: App Router, SSR, and optimization
- **Tailwind CSS**: Utility-first styling with responsive design
- **Framer Motion**: Smooth animations and transitions
- **Capacitor 5**: Cross-platform mobile deployment

### 🎯 Game Logic
- **Fisher-Yates Shuffle**: Proper card randomization
- **State Validation**: Prevents double-clicks and errors
- **Memory Management**: Efficient AI memory handling
- **Performance Optimization**: Debounced interactions

### 📊 Data Persistence
- **LocalStorage**: Web browser storage
- **Capacitor Storage**: Native mobile storage
- **Error Handling**: Graceful fallbacks for storage failures
- **Data Migration**: Version compatibility

### 🎵 Audio & Haptics
- **Web Audio API**: Procedural sound generation
- **Haptic Feedback**: Native vibration patterns
- **Capacitor Haptics**: Enhanced mobile feedback
- **Audio Context**: Optimized performance

## Deployment

### Web Deployment
Deploy to Vercel, Netlify, or any static hosting:
\`\`\`bash
npm run build
\`\`\`

### Mobile App Store Deployment

#### Android (Google Play)
1. Build APK in Android Studio
2. Sign with release keystore
3. Upload to Google Play Console

#### iOS (App Store)
1. Build in Xcode
2. Archive and validate
3. Upload to App Store Connect

## Game Rules

### Basic Gameplay
1. Cards are shuffled and placed face-down
2. Preview all cards for a few seconds
3. Flip 2 cards to find matching pairs
4. Matched pairs stay face-up
5. Complete all pairs to win

### Scoring System
- **Match**: 10 points
- **Combo Bonus**: 5 × combo multiplier
- **Time Bonus**: Faster completion = more points
- **Perfect Game**: No mistakes bonus

### Power-up Strategy
- **Hint**: Use when stuck on last few pairs
- **Shuffle**: Reset when cards are in bad positions
- **Extra Time**: Emergency time extension

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

MIT License - see LICENSE file for details.

## Support

For issues and support:
- Create GitHub issue
- Check documentation
- Review troubleshooting guide

---

**Memory Master** - Challenge your memory, compete with AI, and enjoy hours of brain-training fun! 🧠✨
# card_brain
