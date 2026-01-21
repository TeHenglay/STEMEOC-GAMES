"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, Facebook, Youtube, Gamepad2, Puzzle, Calculator, Brain, Cpu, Lightbulb } from "lucide-react"
import Link from "next/link"
import TargetCursor from "@/components/TargetCursor"

export default function Homepage() {
  return (
    <div className="min-h-screen bg-black overflow-hidden relative">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(120,119,198,0.3),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(56,189,248,0.3),transparent_50%)]"></div>
        
        {/* Dot Grid Background */}
        <div className="absolute inset-0 opacity-30">
          <div 
            className="w-full h-full animate-[moveDotGrid_30s_ease-in-out_infinite_alternate]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
              backgroundPosition: '15px 15px'
            }}
          ></div>
        </div>
        
        {/* Animated Dot Grid Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div 
            className="w-full h-full animate-[moveDotGridReverse_40s_ease-in-out_infinite_alternate]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(147,197,253,0.6) 0.5px, transparent 0.5px)`,
              backgroundSize: '60px 60px',
              backgroundPosition: '30px 30px'
            }}
          ></div>
        </div>
        
        {/* Secondary Dot Pattern */}
        <div className="absolute inset-0 opacity-15">
          <div 
            className="w-full h-full animate-[moveDotGridDiagonal_50s_ease-in-out_infinite_alternate]"
            style={{
              backgroundImage: `radial-gradient(circle, rgba(168,85,247,0.4) 0.8px, transparent 0.8px)`,
              backgroundSize: '45px 45px',
              backgroundPosition: '22.5px 22.5px'
            }}
          ></div>
        </div>
        
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
        
        @keyframes moveDotGrid {
          0% { transform: translateX(0); }
          100% { transform: translateX(30px); }
        }
        
        @keyframes moveDotGridReverse {
          0% { transform: translateY(0); }
          100% { transform: translateY(60px); }
        }
        
        @keyframes moveDotGridDiagonal {
          0% { transform: translate(0, 0); }
          100% { transform: translate(45px, 22.5px); }
        }
      `}</style>
      
      {/* Content Layer */}
      <div className="relative z-10">
        {/* Navbar */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-50">
          <nav className="bg-white shadow-xl px-8 py-4 rounded-2xl w-auto inline-flex">
            <div className="flex items-center justify-between gap-16">
              {/* Left - Hamburger Menu */}
              <Button variant="ghost" size="sm" className="p-3 cursor-target">
                <Menu className="w-8 h-8 text-black" />
              </Button>
              
              {/* Center - Logo */}
              <div className="flex items-center">
                <button 
                  onClick={() => window.open('https://stemcambodia.ngo/', '_blank')}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img 
                    src="/stemeoc-logo.png" 
                    alt="STEMEOC Logo" 
                    className="h-10 w-auto"
                  />
                </button>
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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 mt-28">
              <h1 className="text-8xl font-bold text-white mb-4" style={{ fontFamily: 'Ithaca, serif' }}>
                STEMEOC EDUCATION GAMES
              </h1>

            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20 max-w-7xl mx-auto">
              {/* Card Game */}
              <Link href="/card-game">
                <Card className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 bg-white shadow-2xl border-4 border-black rounded-3xl overflow-hidden cursor-target">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-20 h-20 mx-auto bg-black/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-black/20 transition-all duration-300">
                        <Gamepad2 className="w-10 h-10 text-black" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Ithaca, serif' }}>
                      <span style={{ color: '#ef4444' }}>C</span>
                      <span style={{ color: '#f97316' }}>a</span>
                      <span style={{ color: '#22c55e' }}>r</span>
                      <span style={{ color: '#3b82f6' }}>d</span>
                      <span style={{ color: '#ef4444' }}> </span>
                      <span style={{ color: '#ef4444' }}>G</span>
                      <span style={{ color: '#f97316' }}>a</span>
                      <span style={{ color: '#22c55e' }}>m</span>
                      <span style={{ color: '#3b82f6' }}>e</span>
                    </h2>
                    <p className="text-black/80 text-sm leading-relaxed mb-4">
                      Answer STEM quiz questions. Flip cards and test your knowledge!
                    </p>
                    <div className="text-xs text-black/60 mb-4">⏱️ 30 seconds per question</div>
                    <div className="inline-block p-[2px] rounded-full" style={{
                      background: 'linear-gradient(90deg, #ef4444, #3b82f6, #f97316, #22c55e)'
                    }}>
                      <div className="inline-flex items-center text-black/90 font-semibold px-3 py-1.5 rounded-full bg-white text-sm">
                        <span>Play Now</span>
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Puzzle Word Game */}
              <Link href="/puzzle-word">
                <Card className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 bg-white shadow-2xl border-4 border-black rounded-3xl overflow-hidden cursor-target">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-20 h-20 mx-auto bg-black/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-black/20 transition-all duration-300">
                        <Puzzle className="w-10 h-10 text-black" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Ithaca, serif' }}>
                      <span style={{ color: '#ef4444' }}>P</span>
                      <span style={{ color: '#ef4444' }}>u</span>
                      <span style={{ color: '#f97316' }}>z</span>
                      <span style={{ color: '#22c55e' }}>z</span>
                      <span style={{ color: '#3b82f6' }}>l</span>
                      <span style={{ color: '#ef4444' }}>e</span>
                      <span style={{ color: '#ef4444' }}> </span>
                      <span style={{ color: '#f97316' }}>W</span>
                      <span style={{ color: '#22c55e' }}>o</span>
                      <span style={{ color: '#3b82f6' }}>r</span>
                      <span style={{ color: '#ef4444' }}>d</span>
                    </h2>
                    <p className="text-black/80 text-sm leading-relaxed mb-4">
                      Find environmental words in a grid. Quick thinking required!
                    </p>
                    <div className="text-xs text-black/60 mb-4">⏱️ 15 seconds to find 1 word</div>
                    <div className="inline-block p-[2px] rounded-full" style={{
                      background: 'linear-gradient(90deg, #ef4444, #3b82f6, #f97316, #22c55e)'
                    }}>
                      <div className="inline-flex items-center text-black/90 font-semibold px-3 py-1.5 rounded-full bg-white text-sm">
                        <span>Play Now</span>
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Math Sprint */}
              <Link href="/math-sprint">
                <Card className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 bg-white shadow-2xl border-4 border-black rounded-3xl overflow-hidden cursor-target">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-20 h-20 mx-auto bg-black/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-black/20 transition-all duration-300">
                        <Calculator className="w-10 h-10 text-black" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Ithaca, serif' }}>
                      <span style={{ color: '#ea580c' }}>M</span>
                      <span style={{ color: '#f97316' }}>a</span>
                      <span style={{ color: '#fb923c' }}>t</span>
                      <span style={{ color: '#fdba74' }}>h</span>
                      <span style={{ color: '#ea580c' }}> </span>
                      <span style={{ color: '#ea580c' }}>S</span>
                      <span style={{ color: '#f97316' }}>p</span>
                      <span style={{ color: '#fb923c' }}>r</span>
                      <span style={{ color: '#fdba74' }}>i</span>
                      <span style={{ color: '#fed7aa' }}>n</span>
                      <span style={{ color: '#ea580c' }}>t</span>
                    </h2>
                    <p className="text-black/80 text-sm leading-relaxed mb-4">
                      Solve math problems as fast as you can. Get 6 correct to win!
                    </p>
                    <div className="text-xs text-black/60 mb-4">⏱️ 45 seconds challenge</div>
                    <div className="inline-block p-[2px] rounded-full" style={{
                      background: 'linear-gradient(90deg, #ea580c, #f97316, #fb923c)'
                    }}>
                      <div className="inline-flex items-center text-black/90 font-semibold px-3 py-1.5 rounded-full bg-white text-sm">
                        <span>Play Now</span>
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* True or False */}
              <Link href="/true-false">
                <Card className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 bg-white shadow-2xl border-4 border-black rounded-3xl overflow-hidden cursor-target">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-20 h-20 mx-auto bg-black/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-black/20 transition-all duration-300">
                        <Brain className="w-10 h-10 text-black" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Ithaca, serif' }}>
                      <span style={{ color: '#3b82f6' }}>T</span>
                      <span style={{ color: '#60a5fa' }}>r</span>
                      <span style={{ color: '#93c5fd' }}>u</span>
                      <span style={{ color: '#3b82f6' }}>e</span>
                      <span style={{ color: '#60a5fa' }}> </span>
                      <span style={{ color: '#3b82f6' }}>o</span>
                      <span style={{ color: '#60a5fa' }}>r</span>
                      <span style={{ color: '#93c5fd' }}> </span>
                      <span style={{ color: '#3b82f6' }}>F</span>
                      <span style={{ color: '#60a5fa' }}>a</span>
                      <span style={{ color: '#93c5fd' }}>l</span>
                      <span style={{ color: '#3b82f6' }}>s</span>
                      <span style={{ color: '#60a5fa' }}>e</span>
                    </h2>
                    <p className="text-black/80 text-sm leading-relaxed mb-4">
                      Test your science knowledge. Get 15 correct to win!
                    </p>
                    <div className="text-xs text-black/60 mb-4">⏱️ 45 seconds challenge</div>
                    <div className="inline-block p-[2px] rounded-full" style={{
                      background: 'linear-gradient(90deg, #3b82f6, #60a5fa, #93c5fd)'
                    }}>
                      <div className="inline-flex items-center text-black/90 font-semibold px-3 py-1.5 rounded-full bg-white text-sm">
                        <span>Play Now</span>
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Memory Match */}
              <Link href="/memory-match">
                <Card className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 bg-white shadow-2xl border-4 border-black rounded-3xl overflow-hidden cursor-target">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-20 h-20 mx-auto bg-black/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-black/20 transition-all duration-300">
                        <Cpu className="w-10 h-10 text-black" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Ithaca, serif' }}>
                      <span style={{ color: '#ec4899' }}>M</span>
                      <span style={{ color: '#f472b6' }}>e</span>
                      <span style={{ color: '#f9a8d4' }}>m</span>
                      <span style={{ color: '#ec4899' }}>o</span>
                      <span style={{ color: '#f472b6' }}>r</span>
                      <span style={{ color: '#f9a8d4' }}>y</span>
                      <span style={{ color: '#ec4899' }}> </span>
                      <span style={{ color: '#ec4899' }}>M</span>
                      <span style={{ color: '#f472b6' }}>a</span>
                      <span style={{ color: '#f9a8d4' }}>t</span>
                      <span style={{ color: '#ec4899' }}>c</span>
                      <span style={{ color: '#f472b6' }}>h</span>
                    </h2>
                    <p className="text-black/80 text-sm leading-relaxed mb-4">
                      Match all 8 STEM pairs to win. Remember card positions!
                    </p>
                    <div className="text-xs text-black/60 mb-4">⏱️ 30 seconds challenge</div>
                    <div className="inline-block p-[2px] rounded-full" style={{
                      background: 'linear-gradient(90deg, #ec4899, #f472b6, #f9a8d4)'
                    }}>
                      <div className="inline-flex items-center text-black/90 font-semibold px-3 py-1.5 rounded-full bg-white text-sm">
                        <span>Play Now</span>
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Code Breaker */}
              <Link href="/code-breaker">
                <Card className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 bg-white shadow-2xl border-4 border-black rounded-3xl overflow-hidden cursor-target">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <div className="w-20 h-20 mx-auto bg-black/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-black/20 transition-all duration-300">
                        <Lightbulb className="w-10 h-10 text-black" />
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Ithaca, serif' }}>
                      <span style={{ color: '#06b6d4' }}>C</span>
                      <span style={{ color: '#22d3ee' }}>o</span>
                      <span style={{ color: '#67e8f9' }}>d</span>
                      <span style={{ color: '#06b6d4' }}>e</span>
                      <span style={{ color: '#22d3ee' }}> </span>
                      <span style={{ color: '#06b6d4' }}>B</span>
                      <span style={{ color: '#22d3ee' }}>r</span>
                      <span style={{ color: '#67e8f9' }}>e</span>
                      <span style={{ color: '#06b6d4' }}>a</span>
                      <span style={{ color: '#22d3ee' }}>k</span>
                      <span style={{ color: '#67e8f9' }}>e</span>
                      <span style={{ color: '#06b6d4' }}>r</span>
                    </h2>
                    <p className="text-black/80 text-sm leading-relaxed mb-4">
                      Solve number patterns. Get 40 points to win!
                    </p>
                    <div className="text-xs text-black/60 mb-4">⏱️ 45 seconds challenge</div>
                    <div className="inline-block p-[2px] rounded-full" style={{
                      background: 'linear-gradient(90deg, #06b6d4, #22d3ee, #67e8f9)'
                    }}>
                      <div className="inline-flex items-center text-black/90 font-semibold px-3 py-1.5 rounded-full bg-white text-sm">
                        <span>Play Now</span>
                        <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>

            </div>

            {/* Features Section */}
            <div className="mt-20 text-center">
              <h3 className="text-4xl font-bold text-white mb-8" style={{ fontFamily: 'Ithaca, serif' }}>
                Why Choose STEMEOC Games?
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🧠</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Educational</h4>
                  <p className="text-gray-300">Learn while you play with scientifically accurate content</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🎮</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Interactive</h4>
                  <p className="text-gray-300">Engaging gameplay that keeps you motivated</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-2xl">🏆</span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Challenging</h4>
                  <p className="text-gray-300">Test your limits with progressively difficult levels</p>
                </div>
              </div>
            </div>
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
