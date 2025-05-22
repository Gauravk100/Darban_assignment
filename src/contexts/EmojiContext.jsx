"use client"

import { createContext, useState } from "react"

export const EmojiContext = createContext()

export function EmojiProvider({ children }) {
  const [gameSettings, setGameSettings] = useState(null)

  return <EmojiContext.Provider value={{ gameSettings, setGameSettings }}>{children}</EmojiContext.Provider>
}
