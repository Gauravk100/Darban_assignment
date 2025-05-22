"use client"

import { useState, useEffect, useContext } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import ThemeToggle from "../components/ThemeToggle"
import { EmojiContext } from "../contexts/EmojiContext"
import { AlertCircle } from "lucide-react"

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

  useEffect(() => {
    if (!gameSettings) {
      navigate("/setup")
    } else {
      setCurrentEmoji(getRandomEmoji(1))
    }
  }, [gameSettings, navigate])

  if (!gameSettings) return null

  function getRandomEmoji(playerNum) {
    const player = playerNum === 1 ? gameSettings.player1 : gameSettings.player2
    const randomIndex = Math.floor(Math.random() * player.emojis.length)
    return player.emojis[randomIndex]
  }

  function handleCellClick(index) {
    if (winner || board[index] !== null) return

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
      return
    }

    // Switch player
    const nextPlayer = currentPlayer === 1 ? 2 : 1
    setCurrentPlayer(nextPlayer)
    setCurrentEmoji(getRandomEmoji(nextPlayer))

    // Computer move
    if (nextPlayer === 2 && gameSettings.playWithComputer && !result) {
      setTimeout(() => {
        makeComputerMove(newBoard)
      }, 800)
    }
  }

  function makeComputerMove(currentBoard) {
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
      return
    }

    // Switch back to player 1
    setCurrentPlayer(1)
    setCurrentEmoji(getRandomEmoji(1))
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
  }

  function isWinningCell(index) {
    return winningLine.includes(index)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4 flex space-x-2">
        <Dialog open={showHelp} onOpenChange={setShowHelp}>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <AlertCircle className="h-5 w-5" />
            </Button>
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
          {!winner ? (
            <CardDescription className="text-center">
              {currentPlayer === 1 ? gameSettings.player1.name : gameSettings.player2.name}'s turn
              <span className="text-2xl ml-2">{currentEmoji}</span>
            </CardDescription>
          ) : (
            <CardDescription className="text-center text-xl font-bold">
              {winner === 1 ? gameSettings.player1.name : gameSettings.player2.name} Wins!
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
                disabled={winner !== null}
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
          <Button variant="outline" onClick={() => navigate("/setup")}>
            New Game
          </Button>
          {winner && <Button onClick={resetGame}>Play Again</Button>}
        </CardFooter>
      </Card>
    </div>
  )
}
