import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import ThemeToggle from "../components/ThemeToggle"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Emoji Tic Tac Toe</CardTitle>
          <CardDescription>A twisted version of the classic game</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center space-y-4">
          <div className="grid grid-cols-3 gap-2 mb-4">
            {["🐶", "🍕", "⚽️", "🐱", "🍟", "🏀", "🐵", "🍔", "🏈"].map((emoji, index) => (
              <div key={index} className="w-16 h-16 flex items-center justify-center text-3xl bg-muted rounded-md">
                {emoji}
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <Link to="/setup" className="w-full">
            <Button className="w-full">Start Game</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
