"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { SocialButton } from "../components/ui/social-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs"
import ThemeToggle from "../components/ThemeToggle"
import { EmojiContext } from "../contexts/EmojiContext"
import { AlertCircle, ArrowLeft, Clock, Gamepad2, Zap, Users, Settings, Crown, Timer, Target } from "lucide-react"

const emojiCategories = {
  animals: ["🐶", "🐱", "🐵", "🐰", "🦊", "🐼", "🐨", "🦁", "🐯"],
  food: ["🍕", "🍟", "🍔", "🍩", "🍦", "🍭", "🍫", "🍿", "🥤"],
  sports: ["⚽️", "🏀", "🏈", "🎾", "🏐", "🏉", "🎱", "🏓", "⛳️"],
  nature: ["🌸", "🌺", "🌻", "🌹", "🌴", "🌵", "🍄", "🌈", "⭐️"],
  travel: ["✈️", "🚗", "🚢", "🚁", "🚂", "🚲", "🏖️", "🗽", "🏰"],
}

const gameDurations = [
  { value: "eternal", label: "Eternal", description: "Play until someone wins", icon: "♾️" },
  { value: "2", label: "2 Minutes", description: "Quick game", icon: "⚡" },
  { value: "3", label: "3 Minutes", description: "Standard game", icon: "🎯" },
  { value: "4", label: "4 Minutes", description: "Extended game", icon: "🏆" },
  { value: "custom", label: "Custom Time", description: "Set your own time limit", icon: "⚙️" },
]

export default function GameSetupPage() {
  const navigate = useNavigate()
  const { setGameSettings } = useContext(EmojiContext)

  const [player1Name, setPlayer1Name] = useState("Player 1")
  const [player2Name, setPlayer2Name] = useState("Player 2")
  const [player1Category, setPlayer1Category] = useState("animals")
  const [player2Category, setPlayer2Category] = useState("food")
  const [playWithComputer, setPlayWithComputer] = useState(false)
  const [gameDuration, setGameDuration] = useState("eternal")
  const [customMinutes, setCustomMinutes] = useState(5)
  const [enableQuickMoveBonus, setEnableQuickMoveBonus] = useState(true)
  const [separateTimers, setSeparateTimers] = useState(false)
  const [error, setError] = useState("")
  const [activeTab, setActiveTab] = useState("players")

  // Update player2Category if it's the same as player1Category
  useEffect(() => {
    if (player1Category === player2Category && !playWithComputer) {
      // Find the first available category that's different from player1Category
      const availableCategories = Object.keys(emojiCategories).filter((category) => category !== player1Category)
      if (availableCategories.length > 0) {
        setPlayer2Category(availableCategories[0])
      }
    }
  }, [player1Category, player2Category, playWithComputer])

  const handleStartGame = () => {
    // Validate that players have different categories when not playing with computer
    if (!playWithComputer && player1Category === player2Category) {
      setError("Both players cannot choose the same emoji category. Please select different categories.")
      return
    }

    setError("")

    const duration =
      gameDuration === "eternal" ? null : gameDuration === "custom" ? Number(customMinutes) : Number(gameDuration)

    // Create the game settings object
    const settings = {
      player1: {
        name: player1Name,
        category: player1Category,
        emojis: emojiCategories[player1Category],
        timeRemaining: duration ? duration * 60 : null, // Convert to seconds
      },
      player2: {
        name: playWithComputer ? "Computer" : player2Name,
        category: player2Category,
        emojis: emojiCategories[player2Category],
        timeRemaining: duration ? duration * 60 : null, // Convert to seconds
      },
      playWithComputer,
      gameDuration: duration,
      enableQuickMoveBonus,
      separateTimers,
    }

    // Log for debugging
    console.log("Starting game with settings:", settings)
    console.log("Separate timers setting:", separateTimers)

    // Set the game settings in context
    setGameSettings(settings)

    // Navigate to the game page
    setTimeout(() => navigate("/game"), 100)
  }

  const handlePlayer1CategoryChange = (category) => {
    setPlayer1Category(category)

    // If player 2 has the same category, change it
    if (category === player2Category && !playWithComputer) {
      // Find the first available category that's different
      const availableCategories = Object.keys(emojiCategories).filter((cat) => cat !== category)
      if (availableCategories.length > 0) {
        setPlayer2Category(availableCategories[0])
      }
    }
  }

  // Handle tab change with animation
  const handleTabChange = (value) => {
    setActiveTab(value)
  }

  return (
    <div className="min-h-screen bg-gradient-animated relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 dark:bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.01)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6">
        <SocialButton
          variant="outline"
          size="sm"
          onClick={() => navigate("/")}
          className="bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 text-white hover:bg-white/20 dark:hover:bg-white/10"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </SocialButton>
        <ThemeToggle />
      </nav>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-4xl pt-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                <Settings className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white dark:text-slate-50 mb-4">Game Setup</h1>
            <p className="text-xl text-white/70 dark:text-slate-300">Configure your epic emoji battle</p>
          </div>

          {/* Setup Card */}
          <Card className="bg-white/10 dark:bg-white/5 backdrop-blur-xl border-white/20 dark:border-white/10 shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl font-bold text-white dark:text-slate-50 text-center">
                Customize Your Experience
              </CardTitle>
              <CardDescription className="text-white/70 dark:text-slate-300 text-center text-base">
                Set up players, choose categories, and configure game rules
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid w-full grid-cols-2 p-1 bg-white/10 backdrop-blur-sm border border-white/20">
                  <TabsTrigger
                    value="players"
                    className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white transition-all duration-300"
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Players
                  </TabsTrigger>
                  <TabsTrigger
                    value="settings"
                    className="text-white data-[state=active]:bg-white/20 data-[state=active]:text-white transition-all duration-300"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Game Setting
                  </TabsTrigger>
                </TabsList>

                <style jsx global>{`
    /* Smooth transitions for settings and toggles */
    .settings-transition {
      transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
    }
    
    .player-section {
      transition: opacity 0.5s ease, max-height 0.5s cubic-bezier(0.33, 1, 0.68, 1), transform 0.5s cubic-bezier(0.33, 1, 0.68, 1);
      max-height: 1000px;
      opacity: 1;
      transform: translateY(0);
    }
    
    .player-section.hidden {
      max-height: 0;
      opacity: 0;
      transform: translateY(-20px);
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    
    .custom-duration {
      transition: opacity 0.5s ease, max-height 0.5s ease, transform 0.5s ease;
      max-height: 300px;
      opacity: 1;
      transform: translateY(0);
    }
    
    .custom-duration.hidden {
      max-height: 0;
      opacity: 0;
      transform: translateY(-10px);
      overflow: hidden;
      margin: 0;
      padding: 0;
    }
    
    .radio-card {
      transition: all 0.3s ease;
    }
    
    .radio-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .category-card {
      transition: all 0.3s ease;
    }
    
    .category-card:not(.disabled):hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    }
    
    .switch-thumb {
      transition: transform 0.3s cubic-bezier(0.33, 1, 0.68, 1);
    }
    
    /* Side-by-side layout transitions */
    .players-container {
      transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
    }
    
    .player-column {
      transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
    }
    
    .computer-toggle {
      transition: all 0.3s ease;
    }
    
    .computer-toggle:hover {
      transform: translateY(-2px);
    }
    
    /* Tab content transitions */
    .tab-content {
      transition: opacity 0.5s ease, transform 0.5s cubic-bezier(0.33, 1, 0.68, 1);
      opacity: 1;
      transform: translateY(0) scale(1);
      transform-origin: top center;
    }
    
    .tab-content.entering {
      opacity: 0;
      transform: translateY(20px) scale(0.98);
    }
    
    .tab-content.exiting {
      opacity: 0;
      transform: translateY(-20px) scale(0.98);
      position: absolute;
      width: 100%;
    }
    
    .tabs-container {
      position: relative;
      min-height: 500px;
    }
    
    /* Tab indicator animation */
    .tab-indicator {
      position: absolute;
      bottom: -2px;
      height: 2px;
      background: linear-gradient(to right, #a855f7, #ec4899);
      transition: all 0.3s cubic-bezier(0.33, 1, 0.68, 1);
    }
    
    /* Responsive adjustments */
    @media (max-width: 767px) {
      .player-column.second {
        margin-top: 1.5rem;
      }
    }
  `}</style>

                <div className="tabs-container mt-8">
                  <div
                    className={`tab-content ${activeTab === "players" ? "" : "exiting"}`}
                    style={{ display: activeTab === "players" ? "block" : "none" }}
                  >
                    {/* Computer Toggle - Moved to top */}
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20 settings-transition computer-toggle mb-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="h-10 w-10 rounded-xl bg-blue-500/30 flex items-center justify-center mr-3">
                            <Target className="h-5 w-5 text-blue-300" />
                          </div>
                          <div>
                            <h3 className="text-white font-medium">AI Opponent</h3>
                            <p className="text-white/60 text-sm">Play against our intelligent computer</p>
                          </div>
                        </div>
                        <Switch
                          id="computer-opponent"
                          checked={playWithComputer}
                          onCheckedChange={setPlayWithComputer}
                          className="data-[state=checked]:bg-blue-500 settings-transition"
                        />
                      </div>
                    </div>

                    {/* Players Side by Side */}
                    <div className="players-container grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Player 1 Setup */}
                      <div className="player-column first">
                        <div className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-2xl p-6 border border-purple-400/30 h-full">
                          <div className="flex items-center mb-4">
                            <div className="h-10 w-10 rounded-xl bg-purple-500/30 flex items-center justify-center mr-3">
                              <Crown className="h-5 w-5 text-purple-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white">Player 1</h3>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="player1" className="text-white/90 font-medium">
                                Player Name
                              </Label>
                              <Input
                                id="player1"
                                value={player1Name}
                                onChange={(e) => setPlayer1Name(e.target.value)}
                                className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-purple-400/50"
                                placeholder="Enter player 1 name"
                              />
                            </div>

                            <div>
                              <Label className="text-white/90 font-medium mb-3 block">Choose Emoji Category</Label>
                              <RadioGroup
                                value={player1Category}
                                onValueChange={handlePlayer1CategoryChange}
                                className="grid grid-cols-1 gap-3"
                              >
                                {Object.entries(emojiCategories).map(([category, emojis]) => (
                                  <div
                                    key={category}
                                    className="flex items-center space-x-3 bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 category-card"
                                  >
                                    <RadioGroupItem
                                      value={category}
                                      id={`p1-${category}`}
                                      className="border-purple-400/50 text-purple-400"
                                    />
                                    <Label
                                      htmlFor={`p1-${category}`}
                                      className="flex items-center justify-between cursor-pointer w-full"
                                    >
                                      <span className="capitalize text-white font-medium">{category}</span>
                                      <div className="flex space-x-1">
                                        {emojis.slice(0, 3).map((emoji, i) => (
                                          <span key={i} className="text-xl">
                                            {emoji}
                                          </span>
                                        ))}
                                      </div>
                                    </Label>
                                  </div>
                                ))}
                              </RadioGroup>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Player 2 Setup or Computer Message */}
                      <div className={`player-column second ${playWithComputer ? "computer-active" : ""}`}>
                        {playWithComputer ? (
                          <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-2xl p-6 border border-blue-400/30 h-full flex flex-col justify-center items-center text-center">
                            <div className="h-16 w-16 rounded-xl bg-blue-500/30 flex items-center justify-center mb-4">
                              <Target className="h-8 w-8 text-blue-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Computer Opponent</h3>
                            <p className="text-white/70 mb-4">You'll be playing against our intelligent AI opponent.</p>
                            <div className="bg-white/10 rounded-xl p-4 border border-white/20 w-full">
                              <div className="flex items-center justify-between">
                                <span className="text-white/80">Difficulty</span>
                                <span className="text-white font-medium">Adaptive</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-2xl p-6 border border-pink-400/30 h-full">
                            <div className="flex items-center mb-4">
                              <div className="h-10 w-10 rounded-xl bg-pink-500/30 flex items-center justify-center mr-3">
                                <Crown className="h-5 w-5 text-pink-300" />
                              </div>
                              <h3 className="text-xl font-bold text-white">Player 2</h3>
                            </div>

                            <div className="space-y-4">
                              <div>
                                <Label htmlFor="player2" className="text-white/90 font-medium">
                                  Player Name
                                </Label>
                                <Input
                                  id="player2"
                                  value={player2Name}
                                  onChange={(e) => setPlayer2Name(e.target.value)}
                                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:border-pink-400/50"
                                  placeholder="Enter player 2 name"
                                />
                              </div>

                              <div>
                                <Label className="text-white/90 font-medium mb-3 block">Choose Emoji Category</Label>
                                <RadioGroup
                                  value={player2Category}
                                  onValueChange={setPlayer2Category}
                                  className="grid grid-cols-1 gap-3"
                                >
                                  {Object.entries(emojiCategories).map(([category, emojis]) => (
                                    <div
                                      key={category}
                                      className={`flex items-start space-x-3 bg-white/10 rounded-xl p-4 border border-white/20 transition-all duration-300 category-card
                                      ${category === player1Category ? "opacity-50 cursor-not-allowed disabled" : "hover:bg-white/20"}`}
                                    >
                                      <RadioGroupItem
                                        value={category}
                                        id={`p2-${category}`}
                                        disabled={category === player1Category}
                                        className="border-pink-400/50 text-pink-400 mt-1"
                                      />
                                      <Label
                                        htmlFor={`p2-${category}`}
                                        className={`flex-1 ${category === player1Category ? "cursor-not-allowed" : "cursor-pointer"}`}
                                      >
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                          <div className="flex items-center">
                                            <span className="capitalize text-white font-medium mr-3">{category}</span>
                                            <div className="flex space-x-1">
                                              {emojis.slice(0, 3).map((emoji, i) => (
                                                <span key={i} className="text-xl">
                                                  {emoji}
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                          {category === player1Category && (
                                            <div className="flex items-center">
                                              <span className="text-xs bg-amber-500/20 border border-amber-400/30 rounded-full px-2 py-1 flex items-center whitespace-nowrap">
                                                <AlertCircle className="h-3 w-3 mr-1 text-amber-400 flex-shrink-0" />
                                                <span className="text-amber-200">Taken</span>
                                              </span>
                                            </div>
                                          )}
                                        </div>
                                      </Label>
                                    </div>
                                  ))}
                                </RadioGroup>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div
                    className={`tab-content ${activeTab === "settings" ? "" : "exiting"}`}
                    style={{ display: activeTab === "settings" ? "block" : "none" }}
                  >
                    {/* Game Duration */}
                    <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                      <div className="flex items-center mb-6">
                        <div className="h-10 w-10 rounded-xl bg-blue-500/30 flex items-center justify-center mr-3">
                          <Timer className="h-5 w-5 text-blue-300" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Game Duration</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <RadioGroup
                            value={gameDuration}
                            onValueChange={setGameDuration}
                            className="grid grid-cols-1 gap-3"
                          >
                            {gameDurations.slice(0, 3).map((duration) => (
                              <div
                                key={duration.value}
                                className="flex items-center space-x-3 bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 radio-card"
                              >
                                <RadioGroupItem
                                  value={duration.value}
                                  id={`duration-${duration.value}`}
                                  className="border-blue-400/50 text-blue-400"
                                />
                                <Label
                                  htmlFor={`duration-${duration.value}`}
                                  className="flex items-center justify-between cursor-pointer w-full"
                                >
                                  <div className="flex items-center">
                                    <span className="text-2xl mr-3">{duration.icon}</span>
                                    <div>
                                      <div className="font-medium text-white">{duration.label}</div>
                                      <div className="text-sm text-white/60">{duration.description}</div>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </div>

                        <div className="space-y-3">
                          <RadioGroup
                            value={gameDuration}
                            onValueChange={setGameDuration}
                            className="grid grid-cols-1 gap-3"
                          >
                            {gameDurations.slice(3).map((duration) => (
                              <div
                                key={duration.value}
                                className="flex items-center space-x-3 bg-white/10 rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all duration-300 radio-card"
                              >
                                <RadioGroupItem
                                  value={duration.value}
                                  id={`duration-${duration.value}`}
                                  className="border-blue-400/50 text-blue-400"
                                />
                                <Label
                                  htmlFor={`duration-${duration.value}`}
                                  className="flex items-center justify-between cursor-pointer w-full"
                                >
                                  <div className="flex items-center">
                                    <span className="text-2xl mr-3">{duration.icon}</span>
                                    <div>
                                      <div className="font-medium text-white">{duration.label}</div>
                                      <div className="text-sm text-white/60">{duration.description}</div>
                                    </div>
                                  </div>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>

                          {gameDuration === "custom" && (
                            <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-4 border border-blue-400/30 custom-duration mt-3">
                              <div className="flex justify-between items-center mb-3">
                                <Label htmlFor="custom-time" className="text-white font-medium">
                                  Custom Duration: {customMinutes} minutes
                                </Label>
                              </div>
                              <Slider
                                id="custom-time"
                                min={1}
                                max={20}
                                step={1}
                                value={[customMinutes]}
                                onValueChange={(value) => setCustomMinutes(value[0])}
                                className="w-full"
                              />
                              <div className="flex justify-between text-sm text-white/60 mt-2">
                                <span>1 min</span>
                                <span>20 min</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Advanced Settings */}
                    {gameDuration !== "eternal" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 settings-transition mt-6">
                        <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-xl bg-green-500/30 flex items-center justify-center mr-3">
                                <Clock className="h-5 w-5 text-green-300" />
                              </div>
                              <div>
                                <h3 className="text-white font-medium">Separate Time Banks</h3>
                                <p className="text-white/60 text-sm">
                                  {separateTimers ? "Each player has their own timer" : "Players share one timer"}
                                </p>
                              </div>
                            </div>
                            <Switch
                              id="separate-timers"
                              checked={separateTimers}
                              onCheckedChange={setSeparateTimers}
                              className="data-[state=checked]:bg-green-500 settings-transition"
                            />
                          </div>
                        </div>

                        <div className="bg-white/10 rounded-2xl p-6 border border-white/20">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <div className="h-10 w-10 rounded-xl bg-yellow-500/30 flex items-center justify-center mr-3">
                                <Zap className="h-5 w-5 text-yellow-300" />
                              </div>
                              <div>
                                <h3 className="text-white font-medium">Quick Move Bonus</h3>
                                <p className="text-white/60 text-sm">
                                  Earn +5 seconds for moves made within 10 seconds
                                </p>
                              </div>
                            </div>
                            <Switch
                              id="quick-move-bonus"
                              checked={enableQuickMoveBonus}
                              onCheckedChange={setEnableQuickMoveBonus}
                              className="data-[state=checked]:bg-yellow-500 settings-transition"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Tabs>

              {error && (
                <div className="bg-red-500/20 border border-red-400/30 rounded-xl p-4 flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                  <span className="text-red-200">{error}</span>
                </div>
              )}
            </CardContent>

            <CardFooter className="pt-4 pb-8">
              <SocialButton className="w-full text-lg py-6" variant="gradient" onClick={handleStartGame}>
                <Gamepad2 className="h-6 w-6 mr-2" />
                Launch Game
              </SocialButton>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
