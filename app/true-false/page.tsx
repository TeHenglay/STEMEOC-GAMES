"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Facebook, Youtube, Play, RotateCcw, Check, X, Clock, Trophy } from "lucide-react"
import Link from "next/link"
import TargetCursor from "@/components/TargetCursor"

const GAME_TIME = 45

interface Question {
  statement: string
  isTrue: boolean
  explanation: string
}

const QUESTIONS: Question[] = [
  // Easy questions (35)
  { statement: "The Sun is a star", isTrue: true, explanation: "The Sun is a star at the center of our solar system." },
  { statement: "Water freezes at 0°C", isTrue: true, explanation: "Water turns into ice at 0 degrees Celsius." },
  { statement: "The Earth is flat", isTrue: false, explanation: "The Earth is round, like a sphere." },
  { statement: "Plants need sunlight to grow", isTrue: true, explanation: "Plants use sunlight to make food through photosynthesis." },
  { statement: "Fish can live without water", isTrue: false, explanation: "Fish need water to breathe through their gills." },
  { statement: "There are 7 days in a week", isTrue: true, explanation: "A week has 7 days: Monday through Sunday." },
  { statement: "Humans can breathe underwater without equipment", isTrue: false, explanation: "Humans need special equipment to breathe underwater." },
  { statement: "The moon orbits around the Earth", isTrue: true, explanation: "The moon travels in a circle around our planet Earth." },
  { statement: "Fire is cold", isTrue: false, explanation: "Fire is very hot and can burn!" },
  { statement: "Birds have feathers", isTrue: true, explanation: "All birds are covered with feathers." },
  { statement: "Cats are a type of dog", isTrue: false, explanation: "Cats and dogs are different animals." },
  { statement: "The human heart pumps blood", isTrue: true, explanation: "The heart pumps blood throughout your body." },
  { statement: "Ice is frozen water", isTrue: true, explanation: "When water gets very cold, it freezes into ice." },
  { statement: "Sharks are fish", isTrue: true, explanation: "Sharks are a type of fish that live in the ocean." },
  { statement: "Spiders have 6 legs", isTrue: false, explanation: "Spiders have 8 legs, not 6!" },
  { statement: "The Earth has one moon", isTrue: true, explanation: "Earth has one natural satellite called the Moon." },
  { statement: "Humans can see in complete darkness", isTrue: false, explanation: "Humans need at least some light to see." },
  { statement: "Trees are plants", isTrue: true, explanation: "Trees are very large plants with woody stems." },
  { statement: "The sky is blue during a clear day", isTrue: true, explanation: "The sky appears blue because of how sunlight interacts with air." },
  { statement: "Bees make honey", isTrue: true, explanation: "Bees collect nectar from flowers and turn it into honey." },
  { statement: "Sound travels through space", isTrue: false, explanation: "Space has no air, so sound cannot travel through it." },
  { statement: "Magnets can attract iron", isTrue: true, explanation: "Magnets pull iron and other magnetic metals toward them." },
  { statement: "The ocean is made of fresh water", isTrue: false, explanation: "Ocean water is salty, not fresh." },
  { statement: "Gravity pulls objects down to Earth", isTrue: true, explanation: "Gravity is the force that pulls everything toward Earth's center." },
  { statement: "Lightning is made of electricity", isTrue: true, explanation: "Lightning is a giant spark of electricity in the sky." },
  { statement: "Snakes have legs", isTrue: false, explanation: "Snakes don't have legs - they slither on their bellies!" },
  { statement: "The human body needs oxygen to survive", isTrue: true, explanation: "We breathe oxygen from the air to stay alive." },
  { statement: "Paper is made from rocks", isTrue: false, explanation: "Paper is made from wood pulp from trees." },
  { statement: "The sun rises in the east", isTrue: true, explanation: "The sun appears to rise in the east every morning." },
  { statement: "Elephants are the largest land animals", isTrue: true, explanation: "Elephants are the biggest animals that live on land." },
  
  // Harder questions (15)
  { statement: "Humans and dinosaurs lived at the same time", isTrue: false, explanation: "Dinosaurs went extinct 65 million years before humans appeared!" },
  { statement: "Octopuses have three hearts", isTrue: true, explanation: "Two hearts pump blood to the gills, one pumps blood to the body." },
  { statement: "Bananas grow on trees", isTrue: false, explanation: "Bananas grow on large herbaceous plants, not trees!" },
  { statement: "The Great Wall of China is visible from space", isTrue: false, explanation: "It's actually very difficult to see from space with the naked eye." },
  { statement: "Goldfish have a 3-second memory", isTrue: false, explanation: "Goldfish can remember things for months, not just seconds!" },
  { statement: "Bats are blind", isTrue: false, explanation: "Bats can see! They also use echolocation to navigate." },
  { statement: "Lightning never strikes the same place twice", isTrue: false, explanation: "Lightning can and often does strike the same place multiple times!" },
  { statement: "Mount Everest is the tallest mountain from base to peak", isTrue: false, explanation: "Mauna Kea in Hawaii is taller when measured from its base on the ocean floor!" },
  { statement: "Camels store water in their humps", isTrue: false, explanation: "Camel humps store fat, not water!" },
  { statement: "Bulls get angry when they see the color red", isTrue: false, explanation: "Bulls are colorblind to red! They react to the movement of the cape." },
  { statement: "Humans only use 10% of their brain", isTrue: false, explanation: "This is a myth! We use virtually all parts of our brain throughout the day." },
  { statement: "A penny dropped from a tall building could kill someone", isTrue: false, explanation: "A penny doesn't have enough mass or the right shape to be lethal!" },
  { statement: "Chameleons change color to blend in", isTrue: false, explanation: "They change color mainly for communication and temperature regulation!" },
  { statement: "Hot water freezes faster than cold water", isTrue: true, explanation: "This is called the Mpemba effect - hot water can sometimes freeze faster!" },
  { statement: "Sharks can smell a drop of blood from miles away", isTrue: false, explanation: "While sharks have great smell, this is an exaggeration - it's more like a few hundred meters!" },
]

export default function TrueFalseGame() {
  const [gameStarted, setGameStarted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(GAME_TIME)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())
  const [gameOver, setGameOver] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [lastAnswer, setLastAnswer] = useState<'correct' | 'wrong' | null>(null)
  const [totalAnswered, setTotalAnswered] = useState(0)
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
            if (score >= 12) {
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

  const getRandomQuestion = () => {
    const availableQuestions = QUESTIONS.filter((_, index) => !usedQuestions.has(index))
    
    if (availableQuestions.length === 0) {
      setUsedQuestions(new Set())
      return QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)]
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const question = availableQuestions[randomIndex]
    const originalIndex = QUESTIONS.indexOf(question)
    
    setUsedQuestions(prev => new Set([...prev, originalIndex]))
    return question
  }

  const startGame = () => {
    setGameStarted(true)
    setGameOver(false)
    setTimeLeft(GAME_TIME)
    setScore(0)
    setTotalAnswered(0)
    setUsedQuestions(new Set())
    setCurrentQuestion(getRandomQuestion())
    setShowExplanation(false)
    setLastAnswer(null)
    setShowWinnerModal(false)
    setShowTimeUpModal(false)
  }

  const handleAnswer = (answer: boolean) => {
    if (!currentQuestion || !gameStarted || gameOver || showExplanation) return

    const isCorrect = answer === currentQuestion.isTrue
    setLastAnswer(isCorrect ? 'correct' : 'wrong')
    setShowExplanation(true)
    setTotalAnswered(prev => prev + 1)
    
    if (isCorrect) {
      const newScore = score + 1
      setScore(newScore)
      
      // Check if player reached 15 correct answers
      if (newScore >= 15) {
        setTimeout(() => {
          setGameOver(true)
          setGameStarted(false)
          setShowWinnerModal(true)
        }, 2000)
        return
      }
    }

    setTimeout(() => {
      setShowExplanation(false)
      setLastAnswer(null)
      setCurrentQuestion(getRandomQuestion())
    }, 2000)
  }

  const resetGame = () => {
    setGameStarted(false)
    setGameOver(false)
    setTimeLeft(GAME_TIME)
    setScore(0)
    setTotalAnswered(0)
    setUsedQuestions(new Set())
    setCurrentQuestion(null)
    setShowExplanation(false)
    setLastAnswer(null)
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
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-indigo-900/20 to-purple-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(59,130,246,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(139,92,246,0.3),transparent_50%)]"></div>
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
                SCIENCE TRUE OR FALSE
              </h1>
              <p className="text-yellow-400 text-3xl font-bold mt-2" style={{ fontFamily: 'Ithaca, serif' }}>🎯 Get 15 correct to win!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Stats */}
              <div className="lg:col-span-1">
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-xl mb-4">
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <div className="text-6xl font-bold text-blue-400 mb-2" style={{ fontFamily: 'Ithaca, serif' }}>
                        {score}/{totalAnswered}
                      </div>
                      <div className="text-blue-300 text-sm">Correct/Total</div>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-white mb-2">
                        {timeLeft}s
                      </div>
                      <div className="text-gray-300">Time Left</div>
                    </div>

                    <div className="space-y-4">
                      {!gameStarted && !gameOver ? (
                        <Button 
                          onClick={startGame}
                          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 cursor-target"
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

                    {gameOver && (
                      <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg text-center">
                        <h3 className="text-white font-bold mb-2">Game Over!</h3>
                        <p className="text-gray-300 text-lg">
                          Score: <span className="font-bold text-blue-400">{score}/{totalAnswered}</span>
                        </p>
                        <p className="text-gray-400 text-sm mt-2">
                          {totalAnswered > 0 && ((score/totalAnswered) >= 0.8) ? "Excellent! 🌟" : 
                           totalAnswered > 0 && ((score/totalAnswered) >= 0.6) ? "Great job! 🎉" : 
                           totalAnswered > 0 && ((score/totalAnswered) >= 0.4) ? "Good effort! 👍" : "Keep learning! 📚"}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Game Area */}
              <div className="lg:col-span-3">
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-xl">
                  <CardContent className="p-8">
                    {!gameStarted && !gameOver ? (
                      <div className="text-center py-20">
                        <div className="text-6xl mb-6">🔬</div>
                        <h2 className="text-3xl font-bold text-white mb-4">Ready to Test Your Knowledge?</h2>
                        <p className="text-gray-300 text-2xl">Answer as many questions correctly as you can!</p>
                      </div>
                    ) : currentQuestion ? (
                      <div className="space-y-8">
                        <div className={`text-center p-8 rounded-xl transition-all duration-300 ${
                          lastAnswer === 'correct' ? 'bg-green-500/20 border-2 border-green-500' : 
                          lastAnswer === 'wrong' ? 'bg-red-500/20 border-2 border-red-500' : 
                          'bg-white/5'
                        }`}>
                          <p className="text-2xl md:text-3xl font-bold text-white leading-relaxed">
                            {currentQuestion.statement}
                          </p>
                        </div>

                        {!showExplanation ? (
                          <div className="grid grid-cols-2 gap-6">
                            <Button
                              onClick={() => handleAnswer(true)}
                              className="h-32 text-3xl font-bold bg-green-500 hover:bg-green-600 text-white cursor-target transition-all hover:scale-105"
                              disabled={!gameStarted || gameOver}
                            >
                              <Check className="w-12 h-12 mr-4" />
                              TRUE
                            </Button>
                            <Button
                              onClick={() => handleAnswer(false)}
                              className="h-32 text-3xl font-bold bg-red-500 hover:bg-red-600 text-white cursor-target transition-all hover:scale-105"
                              disabled={!gameStarted || gameOver}
                            >
                              <X className="w-12 h-12 mr-4" />
                              FALSE
                            </Button>
                          </div>
                        ) : (
                          <div className={`p-6 rounded-xl ${
                            lastAnswer === 'correct' ? 'bg-green-500/20 border-2 border-green-500' : 'bg-red-500/20 border-2 border-red-500'
                          }`}>
                            <p className={`text-2xl font-bold mb-3 ${
                              lastAnswer === 'correct' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {lastAnswer === 'correct' ? '✓ Correct!' : '✗ Wrong!'}
                            </p>
                            <p className="text-white text-lg leading-relaxed">
                              {currentQuestion.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </CardContent>
                </Card>

                {/* Tips */}
                <Card className="bg-white/10 backdrop-blur-sm border-2 border-blue-500/30 rounded-xl mt-4">
                  <CardContent className="p-4">
                    <div className="text-center text-sm text-gray-300">
                      <p className="font-bold text-white mb-1">💡 Did You Know?</p>
                      <p>Answer quickly but think carefully - some facts might surprise you!</p>
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
                <div className="text-sm text-gray-500 mb-1">Correct Answers</div>
                <div className="text-4xl font-bold text-cyan-500">
                  {score}/{totalAnswered}
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
                  {score >= 8 ? "Almost there! Try to reach 12 correct answers!" : "Keep practicing! You can do it!"}
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl">
                <div className="text-sm text-gray-500 mb-1">Correct Answers</div>
                <div className="text-4xl font-bold text-cyan-500">
                  {score}/{totalAnswered}
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
