"use client"

import dynamic from 'next/dynamic'
import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Facebook, Youtube, Play, RotateCcw } from "lucide-react"
import Link from "next/link"
import TargetCursor from "@/components/TargetCursor"

const WORDS_TO_FIND = [
  'POLLUTION', 'OZONE', 'TOXIC', 'NATURE', 
  'WATER', 'TRASH', 'ECOSYSTEM', 'SOLUTION'
]

const GRID_SIZE = 14
const GRID_COLS = 12
const GAME_TIME = 15 // 30 seconds

export default function PuzzleWordGame() {
  const [grid, setGrid] = useState<string[][]>([])
  const [foundWords, setFoundWords] = useState<string[]>([])
  const [showFoundModal, setShowFoundModal] = useState(false)
  const [lastFoundWord, setLastFoundWord] = useState("")
  const [isShaking, setIsShaking] = useState(false)
  const [isSelecting, setIsSelecting] = useState(false)
  const [selectedCells, setSelectedCells] = useState<{row: number, col: number}[]>([])
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [gameOver, setGameOver] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Generate new grid
  const generateGrid = useCallback(() => {
    if (!isClient) return // Don't generate on server
    // Create empty grid
    const newGrid: string[][] = Array(GRID_SIZE).fill(null).map(() => 
      Array(GRID_COLS).fill('')
    )

    // Helper function to check if word can be placed at position
    const canPlaceWord = (word: string, row: number, col: number, direction: [number, number]): boolean => {
      for (let i = 0; i < word.length; i++) {
        const newRow = row + direction[0] * i
        const newCol = col + direction[1] * i
        
        if (newRow < 0 || newRow >= GRID_SIZE || newCol < 0 || newCol >= GRID_COLS) {
          return false
        }
        
        if (newGrid[newRow][newCol] !== '' && newGrid[newRow][newCol] !== word[i]) {
          return false
        }
      }
      return true
    }

    // Helper function to place word in grid
    const placeWord = (word: string, row: number, col: number, direction: [number, number]): void => {
      for (let i = 0; i < word.length; i++) {
        const newRow = row + direction[0] * i
        const newCol = col + direction[1] * i
        newGrid[newRow][newCol] = word[i]
      }
    }

    // Possible directions: horizontal, vertical, diagonal
    const directions: [number, number][] = [
      [0, 1],   // horizontal right
      [0, -1],  // horizontal left
      [1, 0],   // vertical down
      [-1, 0],  // vertical up
      [1, 1],   // diagonal down-right
      [1, -1],  // diagonal down-left
      [-1, 1],  // diagonal up-right
      [-1, -1]  // diagonal up-left
    ]

    // Shuffle words for random placement order
    const shuffledWords = [...WORDS_TO_FIND].sort(() => Math.random() - 0.5)

    // Try to place each word
    for (const word of shuffledWords) {
      let placed = false
      let attempts = 0
      const maxAttempts = 100

      while (!placed && attempts < maxAttempts) {
        const row = Math.floor(Math.random() * GRID_SIZE)
        const col = Math.floor(Math.random() * GRID_COLS)
        const direction = directions[Math.floor(Math.random() * directions.length)]

        if (canPlaceWord(word, row, col, direction)) {
          placeWord(word, row, col, direction)
          placed = true
        }
        attempts++
      }

      // If word couldn't be placed after many attempts, try again with new grid
      if (!placed) {
        console.log(`Could not place word: ${word}, regenerating grid...`)
        return generateGrid() // Recursive call to try again
      }
    }

    // Fill empty cells with random letters
    const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_COLS; col++) {
        if (newGrid[row][col] === '') {
          newGrid[row][col] = randomLetters[Math.floor(Math.random() * randomLetters.length)]
        }
      }
    }

    setGrid(newGrid)
  }, [isClient])

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && timeLeft > 0 && !gameOver) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true)
            setGameStarted(false)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, timeLeft, gameOver])

  // Start game
  const startGame = () => {
    generateGrid()
    setFoundWords([])
    setGameStarted(true)
    setGameOver(false)
    setTimeLeft(GAME_TIME)
    setSelectedCells([])
    setIsSelecting(false)
  }

  // Close found word modal and reset game
  const closeFoundModal = () => {
    setShowFoundModal(false)
    setLastFoundWord("")
    resetGame()
  }

  // Reset game
  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setTimeLeft(GAME_TIME)
    setFoundWords([])
    setSelectedCells([])
    setIsSelecting(false)
    generateGrid()
  }

  // Handle cell click
  const handleCellClick = (row: number, col: number) => {
    if (!gameStarted || gameOver) return

    if (!isSelecting) {
      // First click - start selection
      setIsSelecting(true)
      setSelectedCells([{row, col}])
    } else {
      // Second click - end selection, check for word
      const startCell = selectedCells[0]
      const endCell = {row, col}
      
      // Find all possible words between start and end points
      const foundWord = findWordBetweenPoints(startCell, endCell)
      
      if (foundWord && WORDS_TO_FIND.includes(foundWord) && !foundWords.includes(foundWord)) {
        // Word found! Add to found words and end the game
        setFoundWords(prev => [...prev, foundWord])
        setLastFoundWord(foundWord)
        setGameOver(true)
        setGameStarted(false)
        setShowFoundModal(true)
      } else {
        // Word not found or already found - trigger shake and continue
        setIsShaking(true)
        setTimeout(() => setIsShaking(false), 500) // Shake for 500ms
        console.log("Word not found or already found, continuing...")
      }
      
      // Reset selection regardless of outcome
      setSelectedCells([])
      setIsSelecting(false)
    }
  }

  // Find word between two points
  const findWordBetweenPoints = (start: {row: number, col: number}, end: {row: number, col: number}) => {
    const rowDiff = end.row - start.row
    const colDiff = end.col - start.col
    
    // Calculate direction
    const length = Math.max(Math.abs(rowDiff), Math.abs(colDiff)) + 1
    
    if (length < 2) return null
    
    // Normalize direction
    const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff)
    const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff)
    
    // Check if it's a valid straight line (horizontal, vertical, or diagonal)
    if (Math.abs(rowDiff) !== 0 && Math.abs(colDiff) !== 0 && Math.abs(rowDiff) !== Math.abs(colDiff)) {
      return null // Not a straight line
    }
    
    // Build the word
    let word = ""
    for (let i = 0; i < length; i++) {
      const currentRow = start.row + (rowStep * i)
      const currentCol = start.col + (colStep * i)
      
      if (currentRow >= 0 && currentRow < grid.length && currentCol >= 0 && currentCol < grid[0].length) {
        word += grid[currentRow][currentCol]
      }
    }
    
    // Check both forward and backward
    const reverseWord = word.split('').reverse().join('')
    
    if (WORDS_TO_FIND.includes(word)) {
      return word
    } else if (WORDS_TO_FIND.includes(reverseWord)) {
      return reverseWord
    }
    
    return null
  }

  // Initialize grid on component mount (client-side only)
  useEffect(() => {
    if (isClient) {
      generateGrid()
    }
  }, [isClient, generateGrid])

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
            20%, 40%, 60%, 80% { transform: translateX(4px); }
          }
          .dot-grid {
            background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `
      }} />
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-teal-900/20 to-blue-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(34,197,94,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(20,184,166,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 dot-grid"></div>
      </div>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {/* Navbar */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
          <nav className="bg-white shadow-xl px-8 py-4 rounded-2xl w-auto inline-flex">
            <div className="flex items-center justify-between gap-16">
              <Link href="/homepage">
                <Button variant="ghost" size="sm" className="p-3 cursor-target">
                  <ArrowLeft className="w-8 h-8 text-black" />
                </Button>
              </Link>
              
              <div className="flex items-center">
                <img 
                  src="/stemeoc-logo.png" 
                  alt="STEMEOC Logo" 
                  className="h-10 w-auto"
                />
              </div>
              
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-4 cursor-target"
                  onClick={() => window.open('https://www.facebook.com/STEMCambodia', '_blank')}
                >
                  <Facebook className="w-20 h-20 text-black" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-4 cursor-target"
                  onClick={() => window.open('https://www.youtube.com/@StemCambodia', '_blank')}
                >
                  <Youtube className="w-10 h-10 text-black" />
                </Button>
              </div>
            </div>
          </nav>
        </div>

        <div className="p-4 pt-24">
          <div 
            className="max-w-7xl mx-auto transition-transform duration-100"
            style={{
              animation: isShaking ? 'shake 0.5s ease-in-out' : 'none'
            }}
          >
            {/* Header */}
            <div className="text-center mb-8 mt-12">
              <h1 className="text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Ithaca, serif' }}>
                WORD SEARCH - POLLUTION
              </h1>
              <p className="text-gray-300 text-lg">Find 1 environmental word in 15 seconds!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Game Controls - Left Side */}
              <div className="lg:col-span-1">
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-green-500/30 rounded-xl">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-white mb-2">
                        {formatTime(timeLeft)}
                      </div>
                      <div className="text-green-300">Time Remaining</div>
                    </div>

                    {gameStarted && (
                      <div className="text-center mb-4 p-3 bg-blue-500/20 border border-blue-500 rounded-lg">
                        <p className="text-white text-sm font-bold mb-1">Find 1 word in 15 seconds!</p>
                        <p className="text-white text-xs">
                          {!isSelecting 
                            ? "Click the first letter of a word" 
                            : "Click the last letter to complete the word"
                          }
                        </p>
                      </div>
                    )}

                    <div className="space-y-4">
                      {!gameStarted ? (
                        <Button 
                          onClick={startGame}
                          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 cursor-target"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Start Game
                        </Button>
                      ) : (
                        <Button 
                          onClick={resetGame}
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 cursor-target"
                        >
                          <RotateCcw className="w-5 h-5 mr-2" />
                          Reset Game
                        </Button>
                      )}
                    </div>

                    {gameOver && !showFoundModal && (
                      <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg text-center">
                        <h3 className="text-white font-bold mb-2">Time's Up!</h3>
                        <p className="text-gray-300">
                          {foundWords.length > 0 
                            ? `You found: ${foundWords[foundWords.length - 1]}` 
                            : 'No words found this round'
                          }
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Game Grid - Center */}
              <div className="lg:col-span-2">
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-green-500/30 rounded-xl w-full">
                  <CardContent className="p-6 w-full">
                    <div className="grid grid-cols-12 max-w-none mx-auto w-fit" style={{ gap: 0, gridGap: 0, display: 'grid' }}>
                      {grid.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                          const isSelected = selectedCells.some(selected => 
                            selected.row === rowIndex && selected.col === colIndex
                          )
                          const isStartPoint = selectedCells.length > 0 && 
                            selectedCells[0].row === rowIndex && selectedCells[0].col === colIndex
                          
                          return (
                            <button
                              key={`${rowIndex}-${colIndex}`}
                              onClick={() => handleCellClick(rowIndex, colIndex)}
                              className={`
                                w-12 h-12 text-lg font-bold cursor-target
                                transition-all duration-200 hover:scale-105
                                ${isStartPoint 
                                  ? 'bg-yellow-500 text-black border-2 border-yellow-300' 
                                  : isSelected 
                                    ? 'bg-blue-500 text-white' 
                                    : 'bg-white text-black hover:bg-gray-200'
                                }
                              `}
                              style={{ margin: 0, padding: 0, outline: 'none' }}
                              disabled={!gameStarted || gameOver}
                            >
                              {cell}
                            </button>
                          )
                        })
                      )}
                    </div>
                    
                    {isSelecting && selectedCells.length > 0 && (
                      <div className="mt-4 text-center">
                        <div className="text-white">
                          Selected: {selectedCells.map(cell => grid[cell.row][cell.col]).join('')}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Words List - Right Side */}
              <div className="lg:col-span-1">
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-green-500/30 rounded-xl">
                  <CardContent className="p-6">
                    <h3 className="text-white font-bold mb-4 text-center">Find Any Word</h3>
                    <div className="space-y-2">
                      {WORDS_TO_FIND.map((word) => (
                        <div 
                          key={word}
                          className={`p-2 rounded text-center text-sm font-bold ${
                            foundWords.includes(word) 
                              ? 'bg-green-500 text-white line-through' 
                              : 'bg-white text-black'
                          }`}
                        >
                          {word}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center text-blue-300">
                      <p className="text-sm">Find any 1 word to win!</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Found Word Modal */}
      {showFoundModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center shadow-2xl">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">Well Done!</h2>
            <p className="text-lg text-gray-700 mb-6">
              You found: <span className="font-bold text-blue-600">{lastFoundWord}</span>
            </p>
            <button
              onClick={closeFoundModal}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            >
              Reset Game
            </button>
          </div>
        </div>
      )}
      
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
    </div>
  )
}
