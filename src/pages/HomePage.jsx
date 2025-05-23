"use client"

import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import ThemeToggle from "../components/ThemeToggle"
import { SocialButton } from "../components/ui/social-button"
import { Gamepad2, Star, Zap, Users, Clock, Sparkles, Play, Heart } from "lucide-react"
import { useEffect } from "react"

export default function HomePage() {
  // Function to handle continuous fade animations on scroll
  useEffect(() => {
    // Create an Intersection Observer for continuous fade animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // When element enters viewport
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("fade-in")
            }, 50)
          } else {
            // When element leaves viewport, reset animation
            entry.target.classList.remove("fade-in")
          }
        })
      },
      {
        root: null,
        rootMargin: "0px 0px -100px 0px", // Start animation when element is 100px from bottom
        threshold: 0.1, // Trigger when 10% of element is visible
      },
    )

    // Create observer for staggered fade-in effects that reset on scroll
    const staggerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Get all stagger children
            const children = entry.target.querySelectorAll(".stagger-fade")

            // Animate each child with delay
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add("fade-in")
              }, index * 180)
            })
          } else {
            // Reset all children when container leaves viewport
            const children = entry.target.querySelectorAll(".stagger-fade")
            children.forEach((child) => {
              child.classList.remove("fade-in")
            })
          }
        })
      },
      {
        root: null,
        rootMargin: "0px 0px -50px 0px",
        threshold: 0.1,
      },
    )

    // Select elements for animation
    const fadeElements = document.querySelectorAll(".fade-element")
    const staggerParents = document.querySelectorAll(".stagger-container")

    // Observe elements
    fadeElements.forEach((el) => observer.observe(el))
    staggerParents.forEach((el) => staggerObserver.observe(el))

    // Cleanup
    return () => {
      fadeElements.forEach((el) => observer.unobserve(el))
      staggerParents.forEach((el) => staggerObserver.unobserve(el))
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        /* Continuous Scroll Fade Animation Styles */
        .fade-element {
          opacity: 0;
          transition: opacity 1.2s cubic-bezier(0.33, 1, 0.68, 1);
          will-change: opacity; /* Performance optimization */
        }

        .stagger-fade {
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.33, 1, 0.68, 1);
          will-change: opacity;
        }

        .fade-in {
          opacity: 1 !important;
        }

        /* Delay classes for sequential fading */
        .fade-delay-100 {
          transition-delay: 100ms;
        }
        
        .fade-delay-200 {
          transition-delay: 200ms;
        }
        
        .fade-delay-300 {
          transition-delay: 300ms;
        }
        
        .fade-delay-400 {
          transition-delay: 400ms;
        }
        
        .fade-delay-500 {
          transition-delay: 500ms;
        }
        
        .fade-delay-600 {
          transition-delay: 600ms;
        }

        /* Hero section special fade */
        .hero-fade {
          opacity: 0;
          transition: opacity 1.5s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity;
        }

        /* Smooth hover effects */
        .smooth-hover {
          transition: all 0.5s cubic-bezier(0.33, 1, 0.68, 1);
        }
        
        .smooth-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }
      `}</style>

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
            <ThemeToggle />
          </div>
        </nav>

        {/* Hero Section */}
        <div className="relative z-10 px-6 lg:px-8">
          <div className="mx-auto max-w-7xl pt-20 pb-24 sm:pt-32 sm:pb-32">
            <div className="text-center">
              {/* Main Heading - Each part with its own fade class */}
              <div className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-white dark:text-slate-50 sm:text-7xl lg:text-8xl">
                <span className="block hero-fade fade-element">Emoji</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 dark:from-purple-300 dark:via-pink-300 dark:to-purple-300 bg-clip-text text-transparent hero-fade fade-element fade-delay-200">
                  Tic Tac Toe
                </span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl mt-2 text-white/80 dark:text-slate-200 hero-fade fade-element fade-delay-400">
                  Reimagined
                </span>
              </div>

              {/* Subtitle */}
              <p className="mx-auto mt-8 max-w-2xl text-xl leading-8 text-white/80 dark:text-slate-300 sm:text-2xl fade-element fade-delay-500">
                Experience the classic game with a revolutionary twist. Strategic gameplay meets beautiful design in the
                most addictive puzzle game of 2025.
              </p>

              {/* CTA Buttons */}
              <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 fade-element fade-delay-600">
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
              </div>

              {/* Stats */}
              <div className="mt-16 flex justify-center px-4 stagger-container">
                <div className="grid grid-cols-1 gap-20 sm:grid-cols-3">
                  <div className="text-center stagger-fade">
                    <div className="text-3xl font-bold text-white">50k+</div>
                    <div className="text-sm text-white/60">Active Players</div>
                  </div>

                  <div className="text-center stagger-fade">
                    <div className="text-3xl font-bold text-white">1M+</div>
                    <div className="text-sm text-white/60">Games Played</div>
                  </div>

                  <div className="text-center stagger-fade">
                    <div className="text-3xl font-bold text-white">99%</div>
                    <div className="text-sm text-white/60">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Preview Section */}
        <div className="relative z-10 px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-4xl">
            <div className="text-center mb-16 fade-element">
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">See It In Action</h2>
              <p className="text-xl text-white/70">
                Watch how the vanishing emoji rule creates endless strategic possibilities
              </p>
            </div>

            {/* Game Board Preview */}
            <Card className="mx-auto max-w-md bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl fade-element fade-delay-200 smooth-hover">
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
            <div className="text-center mb-16 fade-element">
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-4">Why Players Love EmojiTTT</h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Revolutionary features that make every game unique and engaging
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 stagger-container">
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
              ].map((feature, index) => (
                <div
                  key={index}
                  className="group relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-500 smooth-hover stagger-fade"
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
            <h2 className="text-3xl font-bold text-white sm:text-4xl mb-12 fade-element">Loved by Players Worldwide</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 stagger-container">
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
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 smooth-hover stagger-fade"
                >
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

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 fade-element">
              <div className="flex items-center space-x-2 text-white">
                <Heart className="h-5 w-5 text-red-400" />
                <span>Join our community of 50,000+ players</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative z-10 px-6 lg:px-8 pb-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-3xl p-12 border border-white/20 fade-element smooth-hover">
              <h2 className="text-4xl font-bold text-white mb-6">Ready to Master the Game?</h2>
              <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
                Join thousands of players who have discovered the most addictive puzzle game of 2025. Start your journey
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
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 border-t border-white/20 bg-black/20 backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand and Description */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold text-white">EmojiTTT</span>
                </div>
                <p className="text-white/70 max-w-md">
                  The most innovative tic-tac-toe experience ever created. Join millions of players worldwide.
                </p>
              </div>

              {/* Extra Columns */}
              <div className="md:col-span-2 grid grid-cols-2 gap-8">
                <div>
                  <h4 className="text-white font-semibold mb-2">Company</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>
                      <a href="#" className="hover:underline">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Careers
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2">Support</h4>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li>
                      <a href="#" className="hover:underline">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Contact Us
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Privacy Policy
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Bottom Footer */}
            <div className="mt-12 border-t border-white/20 pt-6 text-center text-sm text-white/60">
              <p>&copy; 2025 EmojiTTT. All rights reserved. Made with ❤️ for puzzle lovers.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
