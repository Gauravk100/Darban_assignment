"use client"

import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Switch } from "../components/ui/switch"
import ThemeToggle from "../components/ThemeToggle"
import { EmojiContext } from "../contexts/EmojiContext"
import { AlertCircle } from "lucide-react"

const emojiCategories = {
  animals: ["🐶", "🐱", "🐵", "🐰", "🦊", "🐼", "🐨", "🦁", "🐯"],
  food: ["🍕", "🍟", "🍔", "🍩", "🍦", "🍭", "🍫", "🍿", "🥤"],
  sports: ["⚽️", "🏀", "🏈", "🎾", "🏐", "🏉", "🎱", "🏓", "⛳️"],
  nature: ["🌸", "🌺", "🌻", "🌹", "🌴", "🌵", "🍄", "🌈", "⭐️"],
  travel: ["✈️", "🚗", "🚢", "🚁", "🚂", "🚲", "🏖️", "🗽", "🏰"],
}

export default function GameSetupPage() {
  const navigate = useNavigate()
  const { setGameSettings } = useContext(EmojiContext)

  const [player1Name, setPlayer1Name] = useState("Player 1")
  const [player2Name, setPlayer2Name] = useState("Player 2")
  const [player1Category, setPlayer1Category] = useState("animals")
  const [player2Category, setPlayer2Category] = useState("food")
  const [playWithComputer, setPlayWithComputer] = useState(false)
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
    setGameSettings({
      player1: {
        name: player1Name,
        category: player1Category,
        emojis: emojiCategories[player1Category],
      },
      player2: {
        name: playWithComputer ? "Computer" : player2Name,
        category: player2Category,
        emojis: emojiCategories[player2Category],
      },
      playWithComputer,
    })

    navigate("/game")
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
                      <RadioGroupItem value={category} id={`p2-${category}`} disabled={category === player1Category} />
                      <Label
                        htmlFor={`p2-${category}`}
                        className={`flex items-center ${category === player1Category ? "opacity-50" : ""}`}
                      >
                        <span className="capitalize mr-2">{category}</span>
                        <span className="text-lg">{emojis.slice(0, 3).join(" ")}</span>
                        {category === player1Category && (
                          <span className="ml-2 text-xs text-destructive flex items-center">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Already chosen by Player 1
                          </span>
                        )}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </>
          )}

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
