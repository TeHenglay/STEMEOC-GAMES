"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Facebook, Youtube, Play, RotateCcw, Clock, Trophy, X } from "lucide-react"
import Link from "next/link"
import TargetCursor from "@/components/TargetCursor"

const GAME_TIME = 30

const STEM_ICONS = [
  { emoji: '🔬', name: 'Microscope' },
  { emoji: '🧪', name: 'Test Tube' },
  { emoji: '⚛️', name: 'Atom' },
  { emoji: '🧬', name: 'DNA' },
  { emoji: '🔭', name: 'Telescope' },
  { emoji: '🌡️', name: 'Thermometer' },
  { emoji: '⚡', name: 'Electricity' },
  { emoji: '🧲', name: 'Magnet' },
]

interface CardType {
  id: number
  emoji: string
  name: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryMatchGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [cards, setCards] = useState<CardType[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [moves, setMoves] = useState(0)
  const [showingPreview, setShowingPreview] = useState(false)
  const [previewTime, setPreviewTime] = useState(3)

  const initializeCards = () => {
    const duplicatedIcons = [...STEM_ICONS, ...STEM_ICONS]
    const shuffled = duplicatedIcons
      .map((icon, index) => ({
        id: index,
        emoji: icon.emoji,
        name: icon.name,
        isFlipped: false,
        isMatched: false
      }))
      .sort(() => Math.random() - 0.5)
    
    return shuffled
  }

  // Preview timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (showingPreview && previewTime > 0) {
      interval = setInterval(() => {
        setPreviewTime(prev => {
          if (prev <= 1) {
            // Preview is over, flip all cards back and start the game
            setShowingPreview(false)
            setCards(prevCards => prevCards.map(c => ({ ...c, isFlipped: false })))
            setGameStarted(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [showingPreview, previewTime])

  // Game timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (gameStarted && timeLeft > 0 && !gameOver && !showingPreview) {
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
  }, [gameStarted, timeLeft, gameOver, showingPreview])

  useEffect(() => {
    if (matchedPairs === STEM_ICONS.length && gameStarted) {
      setGameOver(true)
      setGameStarted(false)
    }
  }, [matchedPairs, gameStarted])

  const startGame = () => {
    const newCards = initializeCards()
    // Show all cards face up for preview
    setCards(newCards.map(c => ({ ...c, isFlipped: true })))
    setShowingPreview(true)
    setPreviewTime(3)
    setGameStarted(false)
    setGameOver(false)
    setTimeLeft(GAME_TIME)
    setMatchedPairs(0)
    setFlippedCards([])
    setMoves(0)
  }

  const handleCardClick = (cardId: number) => {
    if (!gameStarted || gameOver || showingPreview) return
    if (flippedCards.length >= 2) return
    if (flippedCards.includes(cardId)) return
    
    const card = cards.find(c => c.id === cardId)
    if (card?.isMatched) return

    const newFlippedCards = [...flippedCards, cardId]
    setFlippedCards(newFlippedCards)

    setCards(cards.map(c => 
      c.id === cardId ? { ...c, isFlipped: true } : c
    ))

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1)
      const [firstId, secondId] = newFlippedCards
      const firstCard = cards.find(c => c.id === firstId)
      const secondCard = cards.find(c => c.id === secondId)

      if (firstCard?.emoji === secondCard?.emoji) {
        // Match found!
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isMatched: true }
              : c
          ))
          setMatchedPairs(matchedPairs + 1)
          setFlippedCards([])
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setCards(cards.map(c =>
            c.id === firstId || c.id === secondId
              ? { ...c, isFlipped: false }
              : c
          ))
          setFlippedCards([])
        }, 1000)
      }
    }
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setShowingPreview(false)
    setPreviewTime(3)
    setTimeLeft(GAME_TIME)
    setMatchedPairs(0)
    setFlippedCards([])
    setMoves(0)
    setCards([])
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
        <div className="absolute inset-0 bg-gradient-to-br from-pink-900/20 via-purple-900/20 to-indigo-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(236,72,153,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(168,85,247,0.3),transparent_50%)]"></div>
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
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8 mt-12">
              <h1 className="text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Ithaca, serif' }}>
                MEMORY MATCH
              </h1>
              <p className="text-gray-300 text-lg">Match all STEM pairs in 30 seconds!</p>
              <p className="text-yellow-400 text-3xl font-bold mt-2" style={{ fontFamily: 'Ithaca, serif' }}>🎯 Match all 8 pairs to win!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Stats */}
              <div className="lg:col-span-1">
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-pink-500/30 rounded-xl mb-4">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-7xl font-bold text-pink-400 mb-2" style={{ fontFamily: 'Ithaca, serif' }}>
                        {matchedPairs}/{STEM_ICONS.length}
                      </div>
                      <div className="text-pink-300 text-sm">Pairs Found</div>
                    </div>

                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-white mb-2">
                        {showingPreview ? `${previewTime}s` : `${timeLeft}s`}
                      </div>
                      <div className="text-gray-300">{showingPreview ? 'Memorize!' : 'Time Left'}</div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-purple-400 mb-2" style={{ fontFamily: 'Ithaca, serif' }}>
                        {moves}
                      </div>
                      <div className="text-purple-300 text-sm">Moves</div>
                    </div>

                    <div className="space-y-4">
                      {!gameStarted && !gameOver && !showingPreview ? (
                        <Button 
                          onClick={startGame}
                          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-3 cursor-target"
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Start Game
                        </Button>
                      ) : (
                        <Button 
                          onClick={resetGame}
                          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 cursor-target"
                          disabled={showingPreview}
                        >
                          <RotateCcw className="w-5 h-5 mr-2" />
                          {showingPreview ? 'Memorizing...' : 'Reset Game'}
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Game Grid */}
              <div className="lg:col-span-3">
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-pink-500/30 rounded-xl">
                  <CardContent className="p-8">
                    {showingPreview && (
                      <div className="mb-4 p-4 bg-yellow-500/20 border-2 border-yellow-500 rounded-xl text-center animate-pulse">
                        <p className="text-yellow-300 font-bold text-xl">
                          📸 Memorize the cards! Game starts in {previewTime}s
                        </p>
                      </div>
                    )}
                    {!gameStarted && !showingPreview && cards.length === 0 ? (
                      <div className="text-center py-20">
                        <div className="text-6xl mb-6">🧠</div>
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Test Your Memory?</h2>
                        <p className="text-gray-300 text-2xl">Find all matching pairs of STEM items!</p>
                      </div>
                    ) : cards.length > 0 && (
                      <div className="grid grid-cols-4 gap-4">
                        {cards.map((card) => (
                          <button
                            key={card.id}
                            onClick={() => handleCardClick(card.id)}
                            disabled={card.isMatched || flippedCards.includes(card.id) || showingPreview}
                            className={`
                              aspect-square rounded-xl font-bold transition-all duration-300
                              cursor-target transform hover:scale-105 flex items-center justify-center
                              ${card.isFlipped || card.isMatched
                                ? 'bg-white text-6xl'
                                : 'bg-white p-4'
                              }
                              ${card.isMatched ? 'opacity-50 scale-95' : ''}
                              ${showingPreview ? 'ring-4 ring-yellow-500 ring-opacity-50' : ''}
                            `}
                          >
                            {card.isFlipped || card.isMatched ? (
                              card.emoji
                            ) : (
                              <img 
                                src="/images/stem-logo.png" 
                                alt="STEM Logo" 
                                className="w-3/4 h-3/4 object-contain"
                              />
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-pink-500/30 rounded-xl mt-4">
                  <CardContent className="p-4">
                    <div className="text-center text-sm text-gray-300">
                      <p className="font-bold text-white mb-1">💡 How to Play:</p>
                      <p>1. Memorize all cards in 3 seconds</p>
                      <p>2. Cards flip back and timer starts</p>
                      <p>3. Match all pairs before time runs out!</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {gameOver && (
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
                  {matchedPairs === STEM_ICONS.length ? (
                    <Trophy className="w-full h-full text-yellow-500" />
                  ) : (
                    <Clock className="w-full h-full text-red-500" />
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Ithaca, serif' }}>
                  {matchedPairs === STEM_ICONS.length ? 'You Won!' : 'Time\'s Up!'}
                </h2>
                <p className="text-gray-500 font-medium">
                  {matchedPairs === STEM_ICONS.length 
                    ? 'Incredible memory skills!' 
                    : 'Good try! Want to give it another go?'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 py-2">
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <div className="text-sm text-gray-500 mb-1">Pairs Found</div>
                  <div className="text-2xl font-bold text-pink-500">
                    {matchedPairs}/{STEM_ICONS.length}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl">
                  <div className="text-sm text-gray-500 mb-1">Moves</div>
                  <div className="text-2xl font-bold text-purple-500">{moves}</div>
                </div>
              </div>

              <Button 
                onClick={resetGame}
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
