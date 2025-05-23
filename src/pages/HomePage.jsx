import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import ThemeToggle from "../components/ThemeToggle"
import { SocialButton } from "../components/ui/social-button"
import {
  Gamepad2,
  Star,
  Trophy,
  Zap,
  Users,
  Clock,
  Sparkles,
  ArrowRight,
  Play,
  Shield,
  Smartphone,
  Globe,
  TrendingUp,
  Heart,
  Award,
} from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-animated relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/30 dark:bg-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/30 dark:bg-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between p-6 lg:px-8">
        <div className="flex items-center space-x-2">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white dark:text-slate-100">EmojiTTT</span>
        </div>
        <div className="flex items-center space-x-4">
          <SocialButton
            variant="outline"
            size="sm"
            className="hidden md:inline-flex bg-white/10 dark:bg-white/5 border-white/20 dark:border-white/10 text-white hover:bg-white/20 dark:hover:bg-white/10"
          >
            <Globe className="h-4 w-4 mr-2" />
            Community
          </SocialButton>
          <ThemeToggle />
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 lg:px-8">
        <div className="mx-auto max-w-7xl pt-20 pb-24 sm:pt-32 sm:pb-32">
          <div className="text-center">
            {/* Badge */}
            <div className="mx-auto mb-8 flex max-w-fit items-center space-x-2 overflow-hidden rounded-full bg-white/10 backdrop-blur-sm px-6 py-2 text-sm text-white ring-1 ring-white/20">
              <Trophy className="h-4 w-4 text-yellow-400" />
              <span>Award-winning game design</span>
              <ArrowRight className="h-4 w-4" />
            </div>

            {/* Main Heading */}
            <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white dark:text-slate-50 sm:text-7xl lg:text-8xl">
              <span className="block">Emoji</span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 dark:from-purple-300 dark:via-pink-300 dark:to-purple-300 bg-clip-text text-transparent">
                Tic Tac Toe
              </span>
              <span className="block text-4xl sm:text-5xl lg:text-6xl mt-2 text-white/80 dark:text-slate-200">
                Reimagined
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-white/80 dark:text-slate-300 sm:text-2xl">
              Experience the classic game with a revolutionary twist. Strategic gameplay meets beautiful design in the
              most addictive puzzle game of 2024.
            </p>

            {/* CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/setup" className="w-full sm:w-auto">
                <SocialButton
                  size="lg"
                  variant="gradient"
                  className="w-full sm:w-auto text-lg px-8 py-4 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Playing Now
                </SocialButton>
              </Link>
              <SocialButton
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4"
              >
                <Users className="h-5 w-5 mr-2" />
                Join 50k+ Players
              </SocialButton>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">50k+</div>
                <div className="text-sm text-white/60">Active Players</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">4.9★</div>
                <div className="text-sm text-white/60">App Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">1M+</div>
                <div className="text-sm text-white/60">Games Played</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">99%</div>
                <div className="text-sm text-white/60">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Preview Section */}
      <div className="relative z-10 px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">See It In Action</h2>
            <p className="text-xl text-white/70">
              Watch how the vanishing emoji rule creates endless strategic possibilities
            </p>
          </div>

          {/* Game Board Preview */}
          <Card className="mx-auto max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-white">Live Game Preview</CardTitle>
              <CardDescription className="text-white/70 text-base">
                Interactive demo of the vanishing emoji mechanic
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8">
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { emoji: "🐶", player: 1 },
                  { emoji: "🍕", player: 2 },
                  { emoji: "🐱", player: 1 },
                  null,
                  { emoji: "🍟", player: 2 },
                  null,
                  { emoji: "🐵", player: 1 },
                  null,
                  { emoji: "🍔", player: 2 },
                ].map((cell, index) => (
                  <div
                    key={index}
                    className="aspect-square flex items-center justify-center text-3xl bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer"
                  >
                    {cell && <span className={`${cell.player === 1 ? "animate-pulse" : ""}`}>{cell.emoji}</span>}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <div className="h-6 w-6 rounded-full bg-purple-500/30 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-purple-300">P1</span>
                    </div>
                    <span className="text-white font-medium">Animals</span>
                  </div>
                  <div className="flex space-x-1">
                    {["🐶", "🐱", "🐵"].map((emoji, i) => (
                      <span key={i} className="text-lg">
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <div className="h-6 w-6 rounded-full bg-pink-500/30 flex items-center justify-center mr-2">
                      <span className="text-xs font-bold text-pink-300">P2</span>
                    </div>
                    <span className="text-white font-medium">Food</span>
                  </div>
                  <div className="flex space-x-1">
                    {["🍕", "🍟", "🍔"].map((emoji, i) => (
                      <span key={i} className="text-lg">
                        {emoji}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="px-8 pb-8">
              <Link to="/setup" className="w-full">
                <SocialButton className="w-full" variant="gradient">
                  <Gamepad2 className="h-5 w-5 mr-2" />
                  Try It Now
                </SocialButton>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Why Players Love EmojiTTT</h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Revolutionary features that make every game unique and engaging
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Vanishing Emoji Rule",
                description: "Strategic depth with our unique 3-emoji limit that creates dynamic gameplay",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: Clock,
                title: "Timed Challenges",
                description: "Quick move bonuses and time pressure add excitement to every turn",
                color: "from-blue-400 to-cyan-500",
              },
              {
                icon: Users,
                title: "Multiplayer & AI",
                description: "Play with friends or challenge our intelligent AI opponent",
                color: "from-green-400 to-emerald-500",
              },
              {
                icon: Smartphone,
                title: "Cross-Platform",
                description: "Seamless experience across all devices with responsive design",
                color: "from-purple-400 to-pink-500",
              },
              {
                icon: Shield,
                title: "Fair Play",
                description: "Advanced algorithms ensure balanced and fair gameplay for everyone",
                color: "from-red-400 to-rose-500",
              },
              {
                icon: TrendingUp,
                title: "Skill Progression",
                description: "Track your improvement with detailed statistics and achievements",
                color: "from-indigo-400 to-purple-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
              >
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="relative z-10 px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl mb-12">Loved by Players Worldwide</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                quote: "This game completely changed how I think about tic-tac-toe. The vanishing rule is genius!",
                author: "Sarah Chen",
                role: "Game Enthusiast",
                rating: 5,
              },
              {
                quote: "Perfect for quick breaks. The AI is challenging but fair, and the design is beautiful.",
                author: "Marcus Rodriguez",
                role: "Mobile Gamer",
                rating: 5,
              },
              {
                quote: "My kids and I play this every evening. It's educational and incredibly fun!",
                author: "Jennifer Park",
                role: "Parent",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-white/80 mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.author}</div>
                  <div className="text-sm text-white/60">{testimonial.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="flex items-center space-x-2 text-white">
              <Heart className="h-5 w-5 text-red-400" />
              <span>Join our community of 50,000+ players</span>
            </div>
            <div className="flex items-center space-x-2 text-white">
              <Award className="h-5 w-5 text-yellow-400" />
              <span>Featured in App Store</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-6 lg:px-8 pb-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20">
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Master the Game?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of players who have discovered the most addictive puzzle game of 2024. Start your journey
              to becoming an EmojiTTT champion today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/setup" className="w-full sm:w-auto">
                <SocialButton
                  size="lg"
                  variant="gradient"
                  className="w-full text-lg px-8 py-4 shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Playing Free
                </SocialButton>
              </Link>
              <SocialButton
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4"
              >
                <Globe className="h-5 w-5 mr-2" />
                View Leaderboard
              </SocialButton>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/20 bg-black/20 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">EmojiTTT</span>
              </div>
              <p className="text-white/70 max-w-md">
                The most innovative tic-tac-toe experience ever created. Join millions of players worldwide.
              </p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Game</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How to Play
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Tournaments
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-white/70">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/20 text-center text-white/60">
            <p>&copy; 2024 EmojiTTT. All rights reserved. Made with ❤️ for puzzle lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
