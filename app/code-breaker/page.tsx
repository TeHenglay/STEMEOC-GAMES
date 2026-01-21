"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Facebook, Youtube, Play, RotateCcw, Lightbulb, Clock, Trophy, X } from "lucide-react"
import Link from "next/link"
import TargetCursor from "@/components/TargetCursor"

const GAME_TIME = 45

interface Pattern {
  sequence: number[]
  question: string
  answer: number
  difficulty: number
}

const generatePattern = (difficulty: number): Pattern => {
  const patterns = [
    // Easy patterns (difficulty 1)
    () => {
      const start = Math.floor(Math.random() * 10) + 1
      const step = Math.floor(Math.random() * 3) + 2
      const seq = Array.from({ length: 4 }, (_, i) => start + i * step)
      return {
        sequence: seq,
        question: "What's the next number?",
        answer: seq[seq.length - 1] + step,
        difficulty: 1
      }
    },
    // Medium patterns (difficulty 2)
    () => {
      const start = Math.floor(Math.random() * 5) + 1
      const mult = 2
      const seq = Array.from({ length: 4 }, (_, i) => start * Math.pow(mult, i))
      return {
        sequence: seq,
        question: "What's the next number?",
        answer: seq[seq.length - 1] * mult,
        difficulty: 2
      }
    },
    () => {
      const start = Math.floor(Math.random() * 10) + 1
      const seq = [start, start + 1, start * 2, start * 2 + 1]
      return {
        sequence: seq,
        question: "What's the next number?",
        answer: start * 4,
        difficulty: 2
      }
    },
    // Hard patterns (difficulty 3)
    () => {
      // Fibonacci-like
      const a = Math.floor(Math.random() * 3) + 1
      const b = Math.floor(Math.random() * 3) + 2
      const seq = [a, b, a + b, a + 2 * b]
      return {
        sequence: seq,
        question: "What's the next number?",
        answer: 2 * a + 3 * b,
        difficulty: 3
      }
    },
    () => {
      // Square numbers
      const start = Math.floor(Math.random() * 3) + 1
      const seq = Array.from({ length: 4 }, (_, i) => Math.pow(start + i, 2))
      return {
        sequence: seq,
        question: "What's the next number?",
        answer: Math.pow(start + 4, 2),
        difficulty: 3
      }
    }
  ]

  const availablePatterns = patterns.filter((_, i) => 
    (difficulty === 1 && i === 0) ||
    (difficulty === 2 && i >= 1 && i <= 2) ||
    (difficulty === 3 && i >= 3)
  )

  const randomPattern = availablePatterns[Math.floor(Math.random() * availablePatterns.length)]
  return randomPattern()
}

export default function CodeBreakerGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [currentPattern, setCurrentPattern] = useState<Pattern>(generatePattern(1))
  const [gameOver, setGameOver] = useState(false)
  const [difficulty, setDifficulty] = useState(1)
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null)
  const [showHint, setShowHint] = useState(false)
  const [selectedDigits, setSelectedDigits] = useState<string>("")
  const [showWinnerModal, setShowWinnerModal] = useState(false)
  const [showTimeUpModal, setShowTimeUpModal] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && timeLeft > 0 && !gameOver) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setGameOver(true)
            setGameStarted(false)
            if (score >= 40) {
              setShowWinnerModal(true)
            } else {
              setShowTimeUpModal(true)
            }
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [gameStarted, timeLeft, gameOver])

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setTimeLeft(GAME_TIME)
    setScore(0)
    setDifficulty(1)
    setSelectedDigits("")
    setCurrentPattern(generatePattern(1))
    setFeedback(null)
    setShowHint(false)
    setShowWinnerModal(false)
    setShowTimeUpModal(false)
  }

  const getHint = () => {
    setShowHint(true)
    setTimeout(() => setShowHint(false), 3000)
  }

  const getPatternHint = (pattern: Pattern): string => {
    const seq = pattern.sequence
    const diff1 = seq[1] - seq[0]
    const diff2 = seq[2] - seq[1]
    const ratio = seq[1] / seq[0]

    if (diff1 === diff2) {
      return `Hint: Each number increases by ${diff1}`
    } else if (seq[1] / seq[0] === seq[2] / seq[1]) {
      return `Hint: Each number is multiplied by ${ratio}`
    } else {
      return "Hint: Look for a special mathematical relationship!"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!gameStarted || gameOver || selectedDigits === "") return

    const isCorrect = parseInt(selectedDigits) === currentPattern.answer
    
    if (isCorrect) {
      setFeedback('correct')
      const newScore = score + (currentPattern.difficulty * 10)
      setScore(newScore)
      
      // Increase difficulty every 3 correct answers
      if ((score / 10 + 1) % 3 === 0 && difficulty < 3) {
        setDifficulty(difficulty + 1)
      }
    } else {
      setFeedback('wrong')
    }

    setTimeout(() => {
      setFeedback(null)
      setSelectedDigits("")
      setShowHint(false)
      setCurrentPattern(generatePattern(difficulty))
    }, 1000)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setTimeLeft(GAME_TIME)
    setScore(0)
    setDifficulty(1)
    setSelectedDigits("")
    setCurrentPattern(generatePattern(1))
    setFeedback(null)
    setShowHint(false)
  }

  const handleNumberClick = (num: number) => {
    if (!gameStarted || gameOver) return
    setSelectedDigits(prev => prev + num.toString())
  }

  const handleClear = () => {
    setSelectedDigits("")
  }

  const handleBackspace = () => {
    setSelectedDigits(prev => prev.slice(0, -1))
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      <style dangerouslySetInnerHTML={{
        __html: `
          .dot-grid {
            background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }
        `
      }} />
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/20 via-teal-900/20 to-emerald-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(6,182,212,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(16,185,129,0.3),transparent_50%)]"></div>
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
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 mt-12">
              <h1 className="text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Ithaca, serif' }}>
                CODE BREAKER
              </h1>
              <p className="text-gray-300 text-lg">Crack the pattern code in 45 seconds!</p>
              <p className="text-yellow-400 text-3xl font-bold mt-2" style={{ fontFamily: 'Ithaca, serif' }}>🎯 Get 40 points to win!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Score & Controls */}
              <div className="lg:col-span-1">
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-cyan-500/30 rounded-xl mb-4">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-7xl font-bold text-cyan-400 mb-2" style={{ fontFamily: 'Ithaca, serif' }}>
                        {score}
                      </div>
                      <div className="text-cyan-300">Points</div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-white mb-2">
                        {timeLeft}s
                      </div>
                      <div className="text-gray-300">Time Left</div>
                    </div>

                    <div className="text-center mb-4 p-3 bg-teal-500/20 border border-teal-500 rounded-lg">
                      <p className="text-white text-sm font-bold">
                        Level {difficulty}
                        {difficulty === 1 ? ' - Easy' : difficulty === 2 ? ' - Medium' : ' - Hard'}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {!gameStarted && !gameOver ? (
                        <Button 
                          onClick={startGame}
                          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 cursor-target"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Start Game
                        </Button>
                      ) : (
                        <>
                          <Button 
                            onClick={resetGame}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 cursor-target"
                          >
                            <RotateCcw className="w-5 h-5 mr-2" />
                            Reset Game
                          </Button>
                          <Button 
                            onClick={getHint}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 cursor-target"
                            disabled={showHint}
                          >
                            <Lightbulb className="w-5 h-5 mr-2" />
                            {showHint ? 'Hint Shown' : 'Show Hint'}
                          </Button>
                        </>
                      )}
                    </div>

                    {gameOver && (
                      <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-center">
                        <h3 className="text-white font-bold mb-2">Game Over!</h3>
                        <p className="text-gray-300 text-2xl font-bold text-cyan-400">{score} Points!</p>
                        <p className="text-gray-400 text-sm mt-2">
                          {score >= 60 ? "Genius! 🧠" : score >= 40 ? "Excellent! 🌟" : score >= 20 ? "Great job! 🎉" : "Keep practicing! 💪"}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Game Area */}
              <div className="lg:col-span-2">
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-cyan-500/30 rounded-xl">
                  <CardContent className="p-8">
                    {!gameStarted && !gameOver ? (
                      <div className="text-center py-20">
                        <div className="text-6xl mb-6">🔢</div>
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Break the Code?</h2>
                        <p className="text-gray-300 text-2xl">Find the pattern and predict the next number!</p>
                      </div>
                    ) : (
                      <div className="space-y-8">
                        <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="text-center">
                            <p className="text-gray-300 text-2xl mb-4">{currentPattern.question}</p>
                            <div className="flex justify-center items-center gap-4 mb-6">
                              {currentPattern.sequence.map((num, idx) => (
                                <div key={idx} className="flex items-center gap-4">
                                  <div className={`w-20 h-20 flex items-center justify-center rounded-xl text-3xl font-bold transition-all ${
                                    feedback === 'correct' ? 'bg-green-500 text-white' :
                                    feedback === 'wrong' ? 'bg-red-500 text-white' :
                                    'bg-white text-black'
                                  }`}>
                                    {num}
                                  </div>
                                  {idx < currentPattern.sequence.length - 1 && (
                                    <span className="text-3xl text-white">→</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Answer Display */}
                          <div className="w-full text-5xl font-bold text-center p-6 rounded-xl border-4 border-cyan-500 bg-white/90 min-h-[100px] flex items-center justify-center">
                            {selectedDigits || "?"}
                          </div>

                          {/* Number Pad */}
                          <div className="grid grid-cols-3 gap-3">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                              <Button
                                key={num}
                                type="button"
                                onClick={() => handleNumberClick(num)}
                                className="h-16 text-3xl font-bold bg-white hover:bg-gray-100 text-black border-2 border-cyan-500 cursor-target"
                                disabled={!gameStarted || gameOver}
                              >
                                {num}
                              </Button>
                            ))}
                            <Button
                              type="button"
                              onClick={handleClear}
                              className="h-16 text-xl font-bold bg-red-500 hover:bg-red-600 text-white cursor-target"
                              disabled={!gameStarted || gameOver}
                            >
                              Clear
                            </Button>
                            <Button
                              type="button"
                              onClick={() => handleNumberClick(0)}
                              className="h-16 text-3xl font-bold bg-white hover:bg-gray-100 text-black border-2 border-cyan-500 cursor-target"
                              disabled={!gameStarted || gameOver}
                            >
                              0
                            </Button>
                            <Button
                              type="button"
                              onClick={handleBackspace}
                              className="h-16 text-xl font-bold bg-yellow-500 hover:bg-yellow-600 text-white cursor-target"
                              disabled={!gameStarted || gameOver}
                            >
                              ←
                            </Button>
                          </div>
                          
                          <Button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-2xl font-bold cursor-target"
                            disabled={!gameStarted || gameOver || selectedDigits === ""}
                          >
                            Submit Answer
                          </Button>
                        </form>

                        {feedback === 'correct' && (
                          <div className="mt-4 text-green-400 text-2xl font-bold text-center animate-bounce">
                            ✓ Correct! +{currentPattern.difficulty * 10} points
                          </div>
                        )}
                        {feedback === 'wrong' && (
                          <div className="mt-4 text-red-400 text-2xl font-bold text-center">
                            ✗ Wrong! The answer was {currentPattern.answer}
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-cyan-500/30 rounded-xl mt-4">
                  <CardContent className="p-4">
                    <div className="text-center text-sm text-gray-300">
                      <p className="font-bold text-white mb-1">💡 Pattern Types:</p>
                      <p>• Addition sequences • Multiplication sequences</p>
                      <p>• Fibonacci-like patterns • Square numbers</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Winner Modal */}
      {showWinnerModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center gap-4 mb-2">
                <img 
                  src="/STEM.png" 
                  alt="STEM Logo" 
                  className="h-8 w-auto object-contain"
                />
                
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 shadow-inner p-4">
                  <Trophy className="w-full h-full text-yellow-500" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Ithaca, serif' }}>
                  CONGRATULATIONS!
                </h2>
                <p className="text-gray-500 font-medium">
                  You're eligible for the Lucky Draw!
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-sm text-gray-500 mb-1">Final Score</div>
                <div className="text-4xl font-bold text-cyan-500">
                  {score}
                </div>
              </div>

              <Button 
                onClick={() => {
                  setShowWinnerModal(false)
                  resetGame()
                }}
                className="w-full bg-black hover:bg-gray-800 text-white py-6 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <X className="w-5 h-5 mr-2" />
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Time Up Modal */}
      {showTimeUpModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl transform transition-all animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="text-center space-y-6">
              <div className="flex flex-col items-center gap-4 mb-2">
                <img 
                  src="/STEM.png" 
                  alt="STEM Logo" 
                  className="h-8 w-auto object-contain"
                />
                
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-50 shadow-inner p-4">
                  <Clock className="w-full h-full text-red-500" />
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Ithaca, serif' }}>
                  TIME'S UP!
                </h2>
                <p className="text-gray-500 font-medium">
                  {score >= 20 ? "Great effort! Keep practicing to reach 40 points!" : "Keep trying! You can do it!"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-sm text-gray-500 mb-1">Final Score</div>
                <div className="text-4xl font-bold text-cyan-500">
                  {score}
                </div>
              </div>

              <Button 
                onClick={() => {
                  setShowTimeUpModal(false)
                  resetGame()
                }}
                className="w-full bg-black hover:bg-gray-800 text-white py-6 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <X className="w-5 h-5 mr-2" />
                Close
              </Button>
            </div>
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
