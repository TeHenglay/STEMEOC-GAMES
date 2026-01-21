"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Gamepad2, Puzzle, Calculator, Brain, Cpu, Lightbulb } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GameNavItem {
  name: string
  path: string
  icon: React.ElementType
  color: string
}

const games: GameNavItem[] = [
  { name: "Home", path: "/homepage", icon: Home, color: "text-gray-900" },
  { name: "Card Game", path: "/card-game", icon: Gamepad2, color: "text-red-600" },
  { name: "Puzzle Word", path: "/puzzle-word", icon: Puzzle, color: "text-green-600" },
  { name: "Math Sprint", path: "/math-sprint", icon: Calculator, color: "text-orange-600" },
  { name: "True or False", path: "/true-false", icon: Brain, color: "text-blue-600" },
  { name: "Memory Match", path: "/memory-match", icon: Cpu, color: "text-pink-600" },
  { name: "Code Breaker", path: "/code-breaker", icon: Lightbulb, color: "text-cyan-600" },
]

export default function GameSidebar() {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = React.useState(false)

  // Make sure we have a valid pathname prevents hydration errors
  if (!pathname) return null

  // Hide sidebar on homepage
  if (pathname === '/homepage' || pathname === '/') return null

  return (
    <div 
      className={`
        fixed left-6 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-2 
        bg-white/90 backdrop-blur-xl p-3 rounded-2xl border border-gray-200 shadow-2xl 
        transition-all duration-300 ease-in-out
        ${isHovered ? 'w-64' : 'w-20'}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {games.map((game) => {
        const isActive = pathname === game.path
        return (
          <Link key={game.path} href={game.path} className="w-full">
            <div
              className={`
                relative flex items-center p-3 rounded-xl transition-all duration-200 cursor-target overflow-hidden whitespace-nowrap
                ${isActive 
                  ? 'bg-gray-100 ring-1 ring-gray-200 shadow-sm' 
                  : 'hover:bg-gray-50'
                }
                ${isHovered ? '' : 'justify-center'}
              `}
            >
              <div className="min-w-[24px] flex items-center justify-center">
                <game.icon 
                  className={`
                    w-6 h-6 transition-all duration-300
                    ${isActive ? game.color : 'text-gray-400 group-hover:text-gray-600'}
                  `} 
                />
              </div>
              
              <span 
                style={{ fontFamily: 'Ithaca, serif' }}
                className={`
                  font-bold text-gray-700 transition-all duration-300 text-2xl
                  ${isHovered ? 'ml-4 opacity-100 max-w-[200px]' : 'ml-0 opacity-0 max-w-0'}
                `}
              >
                {game.name}
              </span>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
