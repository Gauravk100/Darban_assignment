"use client"

import { useState, useEffect, useContext, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { SocialButton } from "../components/ui/social-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Progress } from "../components/ui/progress"
import ThemeToggle from "../components/ThemeToggle"
import { EmojiContext } from "../contexts/EmojiContext"
import { AlertCircle, ArrowLeft, Clock, RotateCcw, Zap } from "lucide-react"

// Constants
const QUICK_MOVE_TIME = 10 // seconds
const QUICK_MOVE_BONUS = 5 // seconds

export default function GameBoardPage() {
  const navigate = useNavigate()
  const { gameSettings } = useContext(EmojiContext)

  const [board, setBoard] = useState(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState(1) // 1 for player 1, 2 for player 2
  const [player1Moves, setPlayer1Moves] = useState([])
  const [player2Moves, setPlayer2Moves] = useState([])
  const [currentEmoji, setCurrentEmoji] = useState(null)
  const [winner, setWinner] = useState(null)
  const [winningLine, setWinningLine] = useState([])
  const [showHelp, setShowHelp] = useState(false)

  // Timer related state
  const [gameTime, setGameTime] = useState(null) // Combined timer for non-separate mode
  const [player1Time, setPlayer1Time] = useState(null)
  const [player2Time, setPlayer2Time] = useState(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [timeIsUp, setTimeIsUp] = useState(false)
  const timerRef = useRef(null)

  // Track whether we're using separate timers
  const [usingSeparateTimers, setUsingSeparateTimers] = useState(false)

  // Turn timer for quick move bonus
  const [turnTimeRemaining, setTurnTimeRemaining] = useState(QUICK_MOVE_TIME)
  const [showPlayer1Bonus, setShowPlayer1Bonus] = useState(false)
  const [showPlayer2Bonus, setShowPlayer2Bonus] = useState(false)
  const turnTimerRef = useRef(null)
  const turnStartTimeRef = useRef(null)

  useEffect(() => {
    console.log("GameBoardPage mounted, gameSettings:", gameSettings)

    if (!gameSettings) {
      console.log("No game settings found, redirecting to setup")
      navigate("/setup")
      return
    }

    // Initialize the game
    console.log("Initializing game with settings:", gameSettings)
    setCurrentEmoji(getRandomEmoji(1))

    // Initialize timers if game has a duration
    if (gameSettings.gameDuration) {
      console.log(
        "Setting up timers with duration:",
        gameSettings.gameDuration,
        "separateTimers:",
        gameSettings.separateTimers,
      )

      // Store the timer mode for reference
      setUsingSeparateTimers(gameSettings.separateTimers)

      if (gameSettings.separateTimers) {
        // Separate timers for each player
        setPlayer1Time(gameSettings.player1.timeRemaining)
        setPlayer2Time(gameSettings.player2.timeRemaining)
        setGameTime(null) // Not using combined timer
        console.log("Using separate timers:", gameSettings.player1.timeRemaining, gameSettings.player2.timeRemaining)
      } else {
        // Single shared timer
        setGameTime(gameSettings.gameDuration * 60)
        setPlayer1Time(null) // Not using separate timers
        setPlayer2Time(null) // Not using separate timers
        console.log("Using shared timer:", gameSettings.gameDuration * 60)
      }

      setIsTimerRunning(true)
    }

    // Initialize turn timer
    if (gameSettings.enableQuickMoveBonus) {
      console.log("Setting up quick move bonus timer")
      turnStartTimeRef.current = Date.now()
      setTurnTimeRemaining(QUICK_MOVE_TIME)
      startTurnTimer()
    }
  }, [gameSettings, navigate])

  // Main game timer effect
  useEffect(() => {
    if (!isTimerRunning || !gameSettings?.gameDuration) return

    console.log("Timer running, mode:", usingSeparateTimers ? "separate" : "shared")

    timerRef.current = setInterval(() => {
      if (usingSeparateTimers) {
        // Separate timers mode
        if (currentPlayer === 1) {
          setPlayer1Time((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current)
              setIsTimerRunning(false)
              setTimeIsUp(true)
              setWinner(2) // Player 2 wins if Player 1 runs out of time
              return 0
            }
            return prev - 1
          })
        } else {
          setPlayer2Time((prev) => {
            if (prev <= 1) {
              clearInterval(timerRef.current)
              setIsTimerRunning(false)
              setTimeIsUp(true)
              setWinner(1) // Player 1 wins if Player 2 runs out of time
              return 0
            }
            return prev - 1
          })
        }
      } else {
        // Shared timer mode
        setGameTime((prev) => {
          if (!prev) return null
          if (prev <= 1) {
            clearInterval(timerRef.current)
            setIsTimerRunning(false)
            setTimeIsUp(true)
            // In shared timer mode, the current player loses when time runs out
            setWinner(currentPlayer === 1 ? 2 : 1)
            return 0
          }
          return prev - 1
        })
      }
    }, 1000)

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [isTimerRunning, currentPlayer, usingSeparateTimers, gameSettings?.gameDuration])

  // Turn timer effect for quick move bonus
  useEffect(() => {
    if (!gameSettings?.enableQuickMoveBonus || !isTimerRunning || winner || timeIsUp) return

    // Start turn timer when component mounts or when player changes
    if (gameSettings?.enableQuickMoveBonus && isTimerRunning) {
      startTurnTimer()
    }

    return () => {
      if (turnTimerRef.current) clearInterval(turnTimerRef.current)
    }
  }, [gameSettings, isTimerRunning, winner, timeIsUp, currentPlayer])

  // Cleanup animation effect for player 1 bonus
  useEffect(() => {
    if (showPlayer1Bonus) {
      const timer = setTimeout(() => {
        setShowPlayer1Bonus(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showPlayer1Bonus])

  // Cleanup animation effect for player 2 bonus
  useEffect(() => {
    if (showPlayer2Bonus) {
      const timer = setTimeout(() => {
        setShowPlayer2Bonus(false)
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [showPlayer2Bonus])

  if (!gameSettings) return null

  function startTurnTimer() {
    if (turnTimerRef.current) {
      clearInterval(turnTimerRef.current)
    }

    setTurnTimeRemaining(QUICK_MOVE_TIME)
    turnStartTimeRef.current = Date.now()

    turnTimerRef.current = setInterval(() => {
      if (!turnStartTimeRef.current) return

      const elapsedTime = Math.floor((Date.now() - turnStartTimeRef.current) / 1000)
      const remaining = Math.max(0, QUICK_MOVE_TIME - elapsedTime)

      setTurnTimeRemaining(remaining)

      if (remaining <= 0) {
        clearInterval(turnTimerRef.current)
      }
    }, 1000)
  }

  function checkForQuickMoveBonus() {
    if (!gameSettings?.enableQuickMoveBonus || !isTimerRunning) return false

    if (!turnStartTimeRef.current) return false

    const moveTime = Math.floor((Date.now() - turnStartTimeRef.current) / 1000)
    return moveTime <= QUICK_MOVE_TIME
  }

  function getRandomEmoji(playerNum) {
    const player = playerNum === 1 ? gameSettings.player1 : gameSettings.player2
    const randomIndex = Math.floor(Math.random() * player.emojis.length)
    return player.emojis[randomIndex]
  }

  function handleCellClick(index) {
    if (winner || timeIsUp || board[index] !== null) return

    // Check for quick move bonus
    const earnedBonus = checkForQuickMoveBonus()

    // Add bonus time if earned
    if (earnedBonus && gameSettings.enableQuickMoveBonus) {
      if (usingSeparateTimers) {
        // Add bonus to the current player's timer
        if (currentPlayer === 1 && player1Time !== null) {
          setPlayer1Time((prev) => prev + QUICK_MOVE_BONUS)
          setShowPlayer1Bonus(true)
        } else if (currentPlayer === 2 && player2Time !== null) {
          setPlayer2Time((prev) => prev + QUICK_MOVE_BONUS)
          setShowPlayer2Bonus(true)
        }
      } else {
        // Add bonus to the shared timer
        setGameTime((prev) => prev + QUICK_MOVE_BONUS)
        if (currentPlayer === 1) {
          setShowPlayer1Bonus(true)
        } else {
          setShowPlayer2Bonus(true)
        }
      }
    }

    // Create a new board
    const newBoard = [...board]

    // Track moves for the current player
    if (currentPlayer === 1) {
      // Check if player already has 3 emojis on the board
      if (player1Moves.length === 3) {
        const oldestMoveIndex = player1Moves[0]

        // Cannot place 4th emoji where the 1st was
        if (index === oldestMoveIndex) return

        // Remove the oldest emoji
        newBoard[oldestMoveIndex] = null

        // Update player1Moves (remove oldest and add new)
        setPlayer1Moves([...player1Moves.slice(1), index])
      } else {
        // Add new move
        setPlayer1Moves([...player1Moves, index])
      }
    } else {
      // Same logic for player 2
      if (player2Moves.length === 3) {
        const oldestMoveIndex = player2Moves[0]

        // Cannot place 4th emoji where the 1st was
        if (index === oldestMoveIndex) return

        // Remove the oldest emoji
        newBoard[oldestMoveIndex] = null

        // Update player2Moves (remove oldest and add new)
        setPlayer2Moves([...player2Moves.slice(1), index])
      } else {
        // Add new move
        setPlayer2Moves([...player2Moves, index])
      }
    }

    // Place the current emoji
    newBoard[index] = { emoji: currentEmoji, player: currentPlayer }
    setBoard(newBoard)

    // Check for winner
    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result.winner)
      setWinningLine(result.line)
      setIsTimerRunning(false)
      if (turnTimerRef.current) clearInterval(turnTimerRef.current)
      return
    }

    // Switch player
    const nextPlayer = currentPlayer === 1 ? 2 : 1
    setCurrentPlayer(nextPlayer)
    setCurrentEmoji(getRandomEmoji(nextPlayer))

    // Reset turn timer for next player
    if (gameSettings.enableQuickMoveBonus && isTimerRunning) {
      startTurnTimer()
    }

    // Computer move
    if (nextPlayer === 2 && gameSettings.playWithComputer && !result && !timeIsUp) {
      setTimeout(() => {
        makeComputerMove(newBoard)
      }, 800)
    }
  }

  function makeComputerMove(currentBoard) {
    // Don't make a move if time is up
    if (timeIsUp) return

    // Create a new board copy to work with
    const newBoard = [...currentBoard]

    // Find empty cells
    const emptyCells = []
    newBoard.forEach((cell, index) => {
      if (cell === null) {
        emptyCells.push(index)
      }
    })

    if (emptyCells.length === 0) return

    // Get a random emoji for the computer
    const computerEmoji = getRandomEmoji(2)

    // Choose a random empty cell
    let targetCell

    // If player2 has 3 moves and needs to remove the oldest
    if (player2Moves.length === 3) {
      // Filter out the oldest move position from valid moves
      const validCells = emptyCells.filter((cell) => cell !== player2Moves[0])

      if (validCells.length === 0) return

      // Choose a random valid cell
      const randomIndex = Math.floor(Math.random() * validCells.length)
      targetCell = validCells[randomIndex]

      // Remove the oldest emoji from the board
      newBoard[player2Moves[0]] = null

      // Update player2Moves (remove oldest and add new)
      setPlayer2Moves([...player2Moves.slice(1), targetCell])
    } else {
      // Choose any empty cell
      const randomIndex = Math.floor(Math.random() * emptyCells.length)
      targetCell = emptyCells[randomIndex]

      // Add new move to player2Moves
      setPlayer2Moves([...player2Moves, targetCell])
    }

    // Place the computer's emoji
    newBoard[targetCell] = { emoji: computerEmoji, player: 2 }

    // Update the board
    setBoard(newBoard)

    // Check for winner
    const result = checkWinner(newBoard)
    if (result) {
      setWinner(result.winner)
      setWinningLine(result.line)
      setIsTimerRunning(false)
      if (turnTimerRef.current) clearInterval(turnTimerRef.current)
      return
    }

    // Switch back to player 1
    setCurrentPlayer(1)
    setCurrentEmoji(getRandomEmoji(1))

    // Reset turn timer for player 1
    if (gameSettings.enableQuickMoveBonus && isTimerRunning) {
      startTurnTimer()
    }
  }

  function checkWinner(board) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i]
      if (
        board[a] &&
        board[b] &&
        board[c] &&
        board[a].player === board[b].player &&
        board[a].player === board[c].player
      ) {
        return {
          winner: board[a].player,
          line: [a, b, c],
        }
      }
    }

    return null
  }

  function resetGame() {
    setBoard(Array(9).fill(null))
    setCurrentPlayer(1)
    setPlayer1Moves([])
    setPlayer2Moves([])
    setCurrentEmoji(getRandomEmoji(1))
    setWinner(null)
    setWinningLine([])
    setTimeIsUp(false)
    setShowPlayer1Bonus(false)
    setShowPlayer2Bonus(false)

    // Reset timers if game has a duration
    if (gameSettings.gameDuration) {
      if (usingSeparateTimers) {
        setPlayer1Time(gameSettings.gameDuration * 60)
        setPlayer2Time(gameSettings.gameDuration * 60)
        setGameTime(null)
      } else {
        setGameTime(gameSettings.gameDuration * 60)
        setPlayer1Time(null)
        setPlayer2Time(null)
      }
      setIsTimerRunning(true)

      // Reset turn timer
      if (gameSettings.enableQuickMoveBonus) {
        startTurnTimer()
      }
    }
  }

  function isWinningCell(index) {
    return winningLine.includes(index)
  }

  function formatTime(seconds) {
    if (seconds === null) return "--:--"
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`
  }

  function getTimerColor(time, isActive) {
    if (time === null) return ""
    if (time < 10) return "text-red-500 dark:text-red-400 font-bold"
    if (time < 30) return "text-amber-500 dark:text-amber-400"
    return isActive ? "text-blue-500 dark:text-blue-400 font-medium" : ""
  }

  function getProgressValue(time) {
    if (!gameSettings.gameDuration || time === null) return 100
    return (time / (gameSettings.gameDuration * 60)) * 100
  }

  function getTurnProgressValue() {
    return (turnTimeRemaining / QUICK_MOVE_TIME) * 100
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4 flex space-x-2">
        <Dialog open={showHelp} onOpenChange={setShowHelp}>
          <DialogTrigger asChild>
            <SocialButton variant="outline" size="icon">
              <AlertCircle className="h-5 w-5" />
            </SocialButton>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Game Rules</DialogTitle>
              <DialogDescription>
                <div className="space-y-2 mt-2">
                  <p>
                    <strong>Board:</strong> 3x3 grid with a maximum of 6 active emojis (3 per player).
                  </p>
                  <p>
                    <strong>Emojis:</strong> Each player uses emojis from their chosen category.
                  </p>
                  <p>
                    <strong>Turns:</strong> Players take turns placing one emoji at a time.
                  </p>
                  <p>
                    <strong>Vanishing Rule:</strong> When a player tries to place a 4th emoji, their oldest emoji
                    vanishes. The 4th emoji cannot be placed where the 1st was.
                  </p>
                  <p>
                    <strong>Winning:</strong> Form a line of 3 of your emojis horizontally, vertically, or diagonally.
                  </p>
                  {gameSettings.gameDuration && (
                    <>
                      <p>
                        <strong>Time Limit:</strong>{" "}
                        {usingSeparateTimers
                          ? "Each player has their own time bank of "
                          : "Players share a time bank of "}
                        {gameSettings.gameDuration} minutes.
                        {usingSeparateTimers
                          ? " If a player runs out of time, they lose."
                          : " If time runs out, the current player loses."}
                      </p>
                      {gameSettings.enableQuickMoveBonus && (
                        <p>
                          <strong>Quick Move Bonus:</strong> Make a move within 10 seconds to earn +5 seconds of game
                          time.
                        </p>
                      )}
                    </>
                  )}
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Emoji Tic Tac Toe</CardTitle>

          {/* Timer display */}
          {gameSettings.gameDuration && (
            <>
              {usingSeparateTimers ? (
                // Separate timers display
                <div className="flex justify-between items-center mt-2 mb-1">
                  {/* Player 1 Timer */}
                  <div
                    className={`flex flex-col items-center ${currentPlayer === 1 ? "scale-110" : "opacity-80"} transition-all duration-300`}
                  >
                    <div className="flex items-center">
                      <Clock className={`h-4 w-4 mr-1 ${currentPlayer === 1 ? "text-blue-500" : ""}`} />
                      <span className={`text-sm font-medium ${getTimerColor(player1Time, currentPlayer === 1)}`}>
                        {formatTime(player1Time)}
                      </span>
                      {showPlayer1Bonus && (
                        <span className="ml-1 text-xs text-amber-500 dark:text-amber-400 font-bold flex items-center animate-pulse">
                          <Zap className="h-3 w-3 mr-0.5" />+{QUICK_MOVE_BONUS}s
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium">{gameSettings.player1.name}</div>
                    <Progress
                      value={getProgressValue(player1Time)}
                      className={`h-1.5 mt-1 w-32 ${currentPlayer === 1 ? "bg-blue-100 dark:bg-blue-950" : ""}`}
                    />
                  </div>

                  {/* Player 2 Timer */}
                  <div
                    className={`flex flex-col items-center ${currentPlayer === 2 ? "scale-110" : "opacity-80"} transition-all duration-300`}
                  >
                    <div className="flex items-center">
                      <Clock className={`h-4 w-4 mr-1 ${currentPlayer === 2 ? "text-blue-500" : ""}`} />
                      <span className={`text-sm font-medium ${getTimerColor(player2Time, currentPlayer === 2)}`}>
                        {formatTime(player2Time)}
                      </span>
                      {showPlayer2Bonus && (
                        <span className="ml-1 text-xs text-amber-500 dark:text-amber-400 font-bold flex items-center animate-pulse">
                          <Zap className="h-3 w-3 mr-0.5" />+{QUICK_MOVE_BONUS}s
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium">{gameSettings.player2.name}</div>
                    <Progress
                      value={getProgressValue(player2Time)}
                      className={`h-1.5 mt-1 w-32 ${currentPlayer === 2 ? "bg-blue-100 dark:bg-blue-950" : ""}`}
                    />
                  </div>
                </div>
              ) : (
                // Shared timer display
                <div className="flex justify-center items-center mt-2 mb-1">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1 text-blue-500" />
                      <span className={`text-sm font-medium ${getTimerColor(gameTime, true)}`}>
                        {formatTime(gameTime)}
                      </span>
                      {(showPlayer1Bonus || showPlayer2Bonus) && (
                        <span className="ml-1 text-xs text-amber-500 dark:text-amber-400 font-bold flex items-center animate-pulse">
                          <Zap className="h-3 w-3 mr-0.5" />+{QUICK_MOVE_BONUS}s
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-medium">Shared Time</div>
                    <Progress
                      value={getProgressValue(gameTime)}
                      className="h-1.5 mt-1 w-48 bg-blue-100 dark:bg-blue-950"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          {!winner && !timeIsUp ? (
            <CardDescription className="text-center">
              {currentPlayer === 1 ? gameSettings.player1.name : gameSettings.player2.name}'s turn
              <span className="text-2xl ml-2">{currentEmoji}</span>
              {gameSettings.enableQuickMoveBonus && gameSettings.gameDuration && !timeIsUp && (
                <div className="mt-1 flex flex-col items-center">
                  <div className="flex items-center text-xs">
                    <Zap className="h-3 w-3 mr-1 text-amber-500" />
                    <span>Quick move: {turnTimeRemaining}s</span>
                  </div>
                  <Progress value={getTurnProgressValue()} className="h-1 mt-1 w-24 bg-amber-100 dark:bg-amber-950" />
                </div>
              )}
            </CardDescription>
          ) : (
            <CardDescription className="text-center text-xl font-bold">
              {winner === 0
                ? "It's a tie!"
                : `${winner === 1 ? gameSettings.player1.name : gameSettings.player2.name} Wins!`}
              {timeIsUp && <span className="text-sm block mt-1 font-normal text-muted-foreground">Time's up!</span>}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-2 aspect-square">
            {board.map((cell, index) => (
              <button
                key={index}
                className={`rounded-md flex items-center justify-center text-4xl aspect-square transition-all ${
                  isWinningCell(index)
                    ? "bg-green-500/20 dark:bg-green-500/30 border-2 border-green-500"
                    : "bg-muted hover:bg-muted/80"
                }`}
                onClick={() => handleCellClick(index)}
                disabled={winner !== null || timeIsUp}
              >
                {cell && cell.emoji}
              </button>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="text-center">
              <p className="font-medium">{gameSettings.player1.name}</p>
              <div className="flex justify-center space-x-1 mt-1">
                {gameSettings.player1.emojis.slice(0, 3).map((emoji, i) => (
                  <span key={i} className="text-lg">
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
            <div className="text-center">
              <p className="font-medium">{gameSettings.player2.name}</p>
              <div className="flex justify-center space-x-1 mt-1">
                {gameSettings.player2.emojis.slice(0, 3).map((emoji, i) => (
                  <span key={i} className="text-lg">
                    {emoji}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <SocialButton variant="github" onClick={() => navigate("/setup")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            New Game
          </SocialButton>
          {(winner !== null || timeIsUp) && (
            <SocialButton variant="gradient" onClick={resetGame}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Play Again
            </SocialButton>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
