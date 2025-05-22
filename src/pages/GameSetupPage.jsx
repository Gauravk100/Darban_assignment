"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Slider } from "../components/ui/slider"
import { Switch } from "../components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import ThemeToggle from "../components/ThemeToggle"
import { EmojiContext } from "../contexts/EmojiContext"
import { AlertCircle, Clock, Zap } from "lucide-react"

const emojiCategories = {
  animals: ["🐶", "🐱", "🐵", "🐰", "🦊", "🐼", "🐨", "🦁", "🐯"],
  food: ["🍕", "🍟", "🍔", "🍩", "🍦", "🍭", "🍫", "🍿", "🥤"],
  sports: ["⚽️", "🏀", "🏈", "🎾", "🏐", "🏉", "🎱", "🏓", "⛳️"],
  nature: ["🌸", "🌺", "🌻", "🌹", "🌴", "🌵", "🍄", "🌈", "⭐️"],
  travel: ["✈️", "🚗", "🚢", "🚁", "🚂", "🚲", "🏖️", "🗽", "🏰"],
}

const gameDurations = [
  { value: "eternal", label: "Eternal", description: "Play until someone wins" },
  { value: "2", label: "2 Minutes", description: "Quick game" },
  { value: "3", label: "3 Minutes", description: "Standard game" },
  { value: "4", label: "4 Minutes", description: "Extended game" },
  { value: "custom", label: "Custom Time", description: "Set your own time limit" },
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
  const [separateTimers, setSeparateTimers] = useState(true)
  const [error, setError] = useState("")

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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Game Setup</CardTitle>
          <CardDescription className="text-center">Configure your emoji battle</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Tabs defaultValue="players" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="players">Players</TabsTrigger>
              <TabsTrigger value="settings">Game Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="players" className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label htmlFor="player1">Player 1 Name</Label>
                <Input id="player1" value={player1Name} onChange={(e) => setPlayer1Name(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Player 1 Emoji Category</Label>
                <RadioGroup
                  value={player1Category}
                  onValueChange={handlePlayer1CategoryChange}
                  className="grid grid-cols-1 gap-2"
                >
                  {Object.entries(emojiCategories).map(([category, emojis]) => (
                    <div key={category} className="flex items-center space-x-2">
                      <RadioGroupItem value={category} id={`p1-${category}`} />
                      <Label htmlFor={`p1-${category}`} className="flex items-center">
                        <span className="capitalize mr-2">{category}</span>
                        <span className="text-lg">{emojis.slice(0, 3).join(" ")}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="computer-opponent" checked={playWithComputer} onCheckedChange={setPlayWithComputer} />
                <Label htmlFor="computer-opponent">Play against computer</Label>
              </div>

              {!playWithComputer && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="player2">Player 2 Name</Label>
                    <Input id="player2" value={player2Name} onChange={(e) => setPlayer2Name(e.target.value)} />
                  </div>

                  <div className="space-y-2">
                    <Label>Player 2 Emoji Category</Label>
                    <RadioGroup
                      value={player2Category}
                      onValueChange={setPlayer2Category}
                      className="grid grid-cols-1 gap-2"
                    >
                      {Object.entries(emojiCategories).map(([category, emojis]) => (
                        <div key={category} className="flex items-center space-x-2">
                          <RadioGroupItem
                            value={category}
                            id={`p2-${category}`}
                            disabled={category === player1Category}
                          />
                          <Label
                            htmlFor={`p2-${category}`}
                            className={`flex items-center ${category === player1Category ? "opacity-70" : ""}`}
                          >
                            <span className="capitalize mr-2">{category}</span>
                            <span className="text-lg">{emojis.slice(0, 3).join(" ")}</span>
                            {category === player1Category && (
                              <span className="ml-2 text-xs bg-muted border border-border rounded-full px-2 py-0.5 flex items-center">
                                <AlertCircle className="h-3 w-3 mr-1 text-amber-500" />
                                <span className="text-foreground">Already chosen</span>
                              </span>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </>
              )}
            </TabsContent>
            <TabsContent value="settings" className="space-y-6 mt-4">
              <div className="space-y-2">
                <Label className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Game Duration
                </Label>
                <RadioGroup value={gameDuration} onValueChange={setGameDuration} className="grid grid-cols-1 gap-2">
                  {gameDurations.map((duration) => (
                    <div key={duration.value} className="flex items-center space-x-2">
                      <RadioGroupItem value={duration.value} id={`duration-${duration.value}`} />
                      <Label htmlFor={`duration-${duration.value}`} className="flex flex-col">
                        <span className="font-medium">{duration.label}</span>
                        <span className="text-xs text-muted-foreground">{duration.description}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {gameDuration === "custom" && (
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <Label htmlFor="custom-time">Minutes: {customMinutes}</Label>
                    </div>
                    <div className="px-1">
                      <Slider
                        id="custom-time"
                        min={1}
                        max={20}
                        step={1}
                        value={customMinutes}
                        onValueChange={(value) => setCustomMinutes(value)}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>1 min</span>
                      <span>20 min</span>
                    </div>
                  </div>
                )}

                {gameDuration !== "eternal" && (
                  <div className="mt-4 pt-4 border-t border-border space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="separate-timers" className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <div className="flex flex-col">
                          <span className="font-medium">Separate Time Banks</span>
                          <span className="text-xs text-muted-foreground">Each player has their own time bank</span>
                        </div>
                      </Label>
                      <Switch id="separate-timers" checked={separateTimers} onCheckedChange={setSeparateTimers} />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label htmlFor="quick-move-bonus" className="flex items-center">
                        <Zap className="h-4 w-4 mr-2 text-amber-500" />
                        <div className="flex flex-col">
                          <span className="font-medium">Quick Move Bonus</span>
                          <span className="text-xs text-muted-foreground">
                            +5 seconds for moves made within 10 seconds
                          </span>
                        </div>
                      </Label>
                      <Switch
                        id="quick-move-bonus"
                        checked={enableQuickMoveBonus}
                        onCheckedChange={setEnableQuickMoveBonus}
                      />
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>

          {error && (
            <div className="text-destructive text-sm flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleStartGame}>
            Start Game
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
