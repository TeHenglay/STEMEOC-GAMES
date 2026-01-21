"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Clock, Menu, Facebook, Youtube, ArrowLeft } from "lucide-react"
import Link from "next/link"
import TargetCursor from "@/components/TargetCursor"

interface Question {
  id: number
  question: string
  options: string[]
  correctAnswer: number
  category: string
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Why are trees important for the air we breathe?",
    options: [
      "Trees release oxygen through photosynthesis, helping us breathe clean air",
      "Trees absorb carbon dioxide and release nitrogen gas",
      "Trees filter dust particles but don't affect oxygen levels",
      "Trees only provide shade and don't impact air quality",
    ],
    correctAnswer: 0,
    category: "Environment",
  },
  {
    id: 2,
    question: "What causes the different seasons on Earth?",
    options: [
      "Earth's distance from the Sun changes throughout the year",
      "The Sun gets hotter and cooler during different times",
      "Earth's tilted axis causes different amounts of sunlight in different regions",
      "The Moon blocks sunlight during certain months",
    ],
    correctAnswer: 2,
    category: "Astronomy",
  },
  {
    id: 3,
    question: "How do vaccines help protect us from diseases?",
    options: [
      "They kill all the germs in our body",
      "They teach our immune system to recognize and fight specific diseases",
      "They create a barrier around our body to block germs",
      "They make our body temperature too hot for germs to survive",
    ],
    correctAnswer: 1,
    category: "Health",
  },
  {
    id: 4,
    question: "What happens when you mix baking soda and vinegar?",
    options: [
      "They create a hot, dangerous reaction",
      "Nothing happens - they don't react",
      "They produce carbon dioxide gas, causing bubbling and fizzing",
      "They turn into soap and water",
    ],
    correctAnswer: 2,
    category: "Chemistry",
  },
  {
    id: 5,
    question: "Why can some animals see in the dark while humans cannot?",
    options: [
      "They have more pupils in their eyes",
      "Their eyes have special structures that collect more light",
      "They can create their own light inside their eyes",
      "They don't actually see in the dark - they use sound instead",
    ],
    correctAnswer: 1,
    category: "Biology",
  },
  {
    id: 6,
    question: "What makes lightning occur during thunderstorms?",
    options: [
      "Hot air and cold air fighting each other",
      "Clouds rubbing against mountains",
      "Electrical charges building up in storm clouds",
      "Wind moving too fast through the atmosphere",
    ],
    correctAnswer: 2,
    category: "Weather",
  },
  {
    id: 7,
    question: "How do solar panels generate electricity?",
    options: [
      "They collect heat from the sun and convert it to electricity",
      "They use sunlight to create a chemical reaction that produces power",
      "Solar cells convert light energy directly into electrical energy",
      "They store sunlight in batteries for later use",
    ],
    correctAnswer: 2,
    category: "Technology",
  },
  {
    id: 8,
    question: "Why do objects fall down instead of floating in space?",
    options: [
      "Air pushes everything down toward the ground",
      "Earth's gravity pulls objects toward its center",
      "Objects are naturally heavy and want to go down",
      "The Sun's magnetic field pulls everything down",
    ],
    correctAnswer: 1,
    category: "Physics",
  },
  {
    id: 9,
    question: "What causes earthquakes to happen?",
    options: [
      "Underground explosions from volcanic activity",
      "Large trucks and construction equipment shaking the ground",
      "Movement of tectonic plates beneath Earth's surface",
      "Changes in ocean tides pulling on the land",
    ],
    correctAnswer: 2,
    category: "Geology",
  },
  {
    id: 10,
    question: "How do birds know which direction to fly when they migrate?",
    options: [
      "They follow the same paths their parents showed them",
      "They use magnetic fields, sun position, and landmarks to navigate",
      "They can smell their destination from thousands of miles away",
      "They follow other animals that know the way",
    ],
    correctAnswer: 1,
    category: "Biology",
  },
  {
    id: 11,
    question: "What makes some materials conduct electricity while others don't?",
    options: [
      "The color and texture of the material",
      "How heavy or light the material is",
      "The arrangement and movement of electrons in the material",
      "The temperature at which the material was formed",
    ],
    correctAnswer: 2,
    category: "Physics",
  },
  {
    id: 12,
    question: "Why do we see rainbows after it rains?",
    options: [
      "Water droplets act like tiny prisms, separating white light into colors",
      "The rain washes pollution out of the air, revealing hidden colors",
      "Sunlight reflects off wet pavement and creates colorful patterns",
      "Clouds contain natural dyes that leak out during storms",
    ],
    correctAnswer: 0,
    category: "Optics",
  },
  {
    id: 13,
    question: "How do 3D printers create solid objects?",
    options: [
      "They carve objects out of large blocks of material",
      "They mold liquid plastic using special shaped containers",
      "They build objects layer by layer using melted plastic or other materials",
      "They use lasers to transform air into solid matter",
    ],
    correctAnswer: 2,
    category: "Technology",
  },
  {
    id: 14,
    question: "What causes the ocean tides to rise and fall?",
    options: [
      "Underwater earthquakes push water up and down",
      "The gravitational pull of the Moon and Sun on Earth's water",
      "Ocean currents flowing in circular patterns around the globe",
      "Changes in water temperature making it expand and contract",
    ],
    correctAnswer: 1,
    category: "Astronomy",
  },
  {
    id: 15,
    question: "Why do some foods spoil faster than others?",
    options: [
      "Some foods are naturally dirtier than others",
      "Different foods have varying amounts of water, acidity, and nutrients that affect bacterial growth",
      "Certain foods are more attractive to insects and pests",
      "Some foods are made with preservatives while others are completely natural",
    ],
    correctAnswer: 1,
    category: "Food Science",
  },
  {
    id: 16,
    question: "How do submarines control whether they sink or float underwater?",
    options: [
      "They use powerful engines to push themselves up or down",
      "They adjust their weight by filling or emptying ballast tanks with water",
      "They change the shape of their hull to become more or less streamlined",
      "They use magnetic fields to repel or attract to the ocean floor",
    ],
    correctAnswer: 1,
    category: "Engineering",
  },
  {
    id: 17,
    question: "What makes some plants able to survive in very dry climates?",
    options: [
      "They have special roots that can find water anywhere",
      "They don't actually need water to survive",
      "They have adaptations like waxy leaves and water storage tissues",
      "They can create their own water through photosynthesis",
    ],
    correctAnswer: 2,
    category: "Botany",
  },
  {
    id: 18,
    question: "How do touchscreens detect where you're touching?",
    options: [
      "They use tiny cameras to watch your finger movements",
      "They sense the heat from your fingertip",
      "They detect electrical changes when your finger touches the screen",
      "They use sound waves to locate your finger position",
    ],
    correctAnswer: 2,
    category: "Technology",
  },
  {
    id: 19,
    question: "Why do we need to sleep every night?",
    options: [
      "Sleep helps our brain process memories and repair our body",
      "We sleep because it gets dark and there's nothing else to do",
      "Sleep prevents us from eating too much food",
      "We need sleep to grow taller and stronger",
    ],
    correctAnswer: 0,
    category: "Health",
  },
  {
    id: 20,
    question: "When will the WRO 2025 World Championship be held?",
    options: [
      "October 15-17, 2025 in Turkey",
      "November 28-30, 2025 in Turkey",
      "September 12-14, 2025 in Germany", 
      "December 5-7, 2025 in Japan"
    ],
    correctAnswer: 1,
    category: "Robotics"
  }
]

export default function QuizCardGame() {
  const [cards, setCards] = useState<number[]>([])
  const [flippedCard, setFlippedCard] = useState<number | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [usedQuestions, setUsedQuestions] = useState<Set<number>>(new Set())
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const shuffleCards = () => {
    const cardNumbers = Array.from({ length: 20 }, (_, i) => i + 1)
    return cardNumbers.sort(() => Math.random() - 0.5)
  }

  useEffect(() => {
    if (isClient) {
      setCards(shuffleCards())
    }
  }, [isClient])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (timeLeft !== null && timeLeft > 0 && selectedAnswer === null) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0 && selectedAnswer === null) {
      handleAnswerSelect(-1) // -1 represents timeout
    }
    return () => clearTimeout(timer)
  }, [timeLeft, selectedAnswer])

  const handleCardClick = (cardNumber: number) => {
    const availableQuestions = QUESTIONS.filter(q => !usedQuestions.has(q.id))
    
    if (availableQuestions.length === 0) {
      // Reset if all questions have been used
      setUsedQuestions(new Set())
      return
    }

    const randomQuestion = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    
    setFlippedCard(cardNumber)
    setCurrentQuestion(randomQuestion)
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(30) // 30 seconds timer
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
    setShowResult(true)
    setTimeLeft(null)
    
    if (currentQuestion) {
      setUsedQuestions(prev => new Set([...prev, currentQuestion.id]))
    }

    setTimeout(() => {
      handleNextCard()
    }, 2000)
  }

  const handleNextCard = () => {
    setCurrentQuestion(null)
    setFlippedCard(null)
    setSelectedAnswer(null)
    setShowResult(false)
    setTimeLeft(null)
  }

  const getAnswerButtonClass = (index: number) => {
    if (selectedAnswer === null) {
      return "bg-white text-gray-800 hover:bg-gray-50 border-2 border-gray-200"
    }
    
    if (index === currentQuestion?.correctAnswer) {
      return "bg-green-500 text-white border-2 border-green-600"
    }
    
    if (index === selectedAnswer && index !== currentQuestion?.correctAnswer) {
      return "bg-red-500 text-white border-2 border-red-600"
    }
    
    return "bg-gray-300 text-gray-600 border-2 border-gray-400"
  }

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-xl">Loading...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(56,189,248,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 dot-grid"></div>
        
        {/* Animated elements */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping opacity-20"></div>
        <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
        
        {/* Dither effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-[wave_8s_ease-in-out_infinite]"></div>
          <div className="absolute inset-0 animate-[dither_4s_ease-in-out_infinite]"></div>
        </div>
      </div>
      
      {/* Custom CSS animations */}
      <style jsx>{`
        @keyframes dither {
          0% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(2px, -2px) rotate(1deg); }
          50% { transform: translate(-1px, 1px) rotate(-1deg); }
          75% { transform: translate(1px, -1px) rotate(0.5deg); }
          100% { transform: translate(0, 0) rotate(0deg); }
        }
        
        @keyframes wave {
          0% { transform: translateX(-100%) skewX(-15deg); }
          50% { transform: translateX(0%) skewX(0deg); }
          100% { transform: translateX(100%) skewX(15deg); }
        }
        
        .dot-grid {
          background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {/* Navbar */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
          <nav className="bg-white shadow-xl px-8 py-4 rounded-2xl w-auto inline-flex">
            <div className="flex items-center justify-between gap-16">
              {/* Left - Back Button */}
              <Link href="/homepage">
                <Button variant="ghost" size="sm" className="p-3 cursor-target">
                  <ArrowLeft className="w-8 h-8 text-black" />
                </Button>
              </Link>
              
              {/* Center - Logo */}
              <div className="flex items-center">
                <img 
                  src="/stemeoc-logo.png" 
                  alt="STEMEOC Logo" 
                  className="h-10 w-auto"
                />
              </div>
              
              {/* Right - Social Icons */}
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

        <div className="p-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 mt-28">
              <h1 className="text-8xl font-bold text-white mb-2" style={{ fontFamily: 'Ithaca, serif' }}>
                STEMEOC-Card GAME
              </h1>
              <p className="text-gray-300 mb-4 text-2xl">Click on a card to reveal a question!</p>
            </div>

            <div className="grid grid-cols-5 gap-8 mb-8 mt-20">
              {cards.map((cardNumber) => (
                <Card
                  key={cardNumber}
                  className={`
                    aspect-square cursor-pointer transition-all duration-300 hover:scale-110 hover:rotate-2
                    bg-white shadow-lg hover:shadow-2xl border-0 rounded-2xl min-h-[120px] min-w-[120px]
                    cursor-target
                    ${flippedCard === cardNumber ? "ring-4 ring-blue-400 ring-opacity-75 scale-105" : ""}
                  `}
                  onClick={() => handleCardClick(cardNumber)}
                >
                  <CardContent className="flex items-center justify-center h-full p-4">
                    <img
                      src="/images/stem-logo.png"
                      alt="STEM Logo"
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>

            {currentQuestion && (
              <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                onClick={(e) => {
                  if (e.target === e.currentTarget) {
                    handleNextCard()
                  }
                }}
              >
                <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-0 rounded-3xl bg-white scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400">
                  <CardContent className="p-8">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-6">
                          <img 
                            src="/images/stem-logo.png" 
                            alt="STEM Logo" 
                            className="w-20 h-20 object-contain"
                          />
                          {timeLeft !== null && (
                            <Badge
                              variant={timeLeft <= 10 ? "destructive" : "secondary"}
                              className={`flex items-center gap-2 px-4 py-2 ${
                                timeLeft <= 10 ? "bg-red-100 text-red-700 animate-pulse" : "bg-green-100 text-green-700"
                              }`}
                            >
                              <Clock className="w-4 h-4" />
                              {timeLeft}s
                            </Badge>
                          )}
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 text-balance leading-relaxed">
                          {currentQuestion.question}
                        </h2>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNextCard}
                        className="ml-4 hover:bg-gray-100 rounded-full cursor-target"
                      >
                        <X className="w-5 h-5" />
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      {currentQuestion.options.map((option, index) => (
                        <Button
                          key={index}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={selectedAnswer !== null}
                          className={`p-6 h-auto text-left justify-start rounded-xl font-medium text-2xl whitespace-normal break-words min-h-[4rem] cursor-target ${getAnswerButtonClass(index)}`}
                        >
                          <span className="font-bold mr-4 text-lg bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-sm flex-shrink-0">
                            {String.fromCharCode(65 + index)}
                          </span>
                          <span className="flex-1 text-left leading-relaxed">{option}</span>
                        </Button>
                      ))}
                    </div>

                    {showResult && (
                      <div className="mt-8 text-center p-6 bg-gray-50 rounded-2xl">
                        <p className="text-xl mb-4">
                          {selectedAnswer === -1 ? (
                            <span className="text-orange-600 font-bold">⏰ Time's Up!</span>
                          ) : selectedAnswer === currentQuestion.correctAnswer ? (
                            <span className="text-green-600 font-bold">🎉 Correct!</span>
                          ) : (
                            <span className="text-red-600 font-bold">❌ Incorrect</span>
                          )}
                        </p>
                        <p className="text-sm text-gray-500">Auto-resetting in 2 seconds...</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <TargetCursor 
        spinDuration={2}
        hideDefaultCursor={true}
      />
    </div>
  )
}
