"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Menu, Facebook, Youtube, Gamepad2, Puzzle } from "lucide-react"
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
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16 mt-28">
              <h1 className="text-8xl font-bold text-white mb-4" style={{ fontFamily: 'Ithaca, serif' }}>
                STEMEOC GAMES
              </h1>
              <p className="text-gray-300 mb-8 text-xl">Choose your adventure and test your knowledge!</p>
            </div>

            {/* Games Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20 max-w-4xl mx-auto">
              {/* Card Game */}
              <Link href="/card-game">
                <Card className="group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 bg-white shadow-2xl border-4 border-black rounded-3xl overflow-hidden cursor-target">
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-24 h-24 mx-auto bg-black/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-black/20 transition-all duration-300">
                        <Gamepad2 className="w-12 h-12 text-black" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Ithaca, serif' }}>
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
                    <p className="text-black/80 text-lg leading-relaxed">
                      Test your STEM knowledge with our interactive card-based quiz game. 
                      Flip cards and answer questions across various science topics.
                    </p>
                    <div className="mt-6 inline-block p-[3px] rounded-full" style={{
                      background: 'linear-gradient(90deg, #ef4444, #3b82f6, #f97316, #22c55e)'
                    }}>
                      <div className="inline-flex items-center text-black/90 font-semibold px-4 py-2 rounded-full bg-white">
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
                  <CardContent className="p-8 text-center">
                    <div className="mb-6">
                      <div className="w-24 h-24 mx-auto bg-black/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-black/20 transition-all duration-300">
                        <Puzzle className="w-12 h-12 text-black" />
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'Ithaca, serif' }}>
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
                    <p className="text-black/80 text-lg leading-relaxed">
                      Challenge yourself with word puzzles and brain teasers. 
                      Solve crosswords, anagrams, and vocabulary challenges.
                      Test your skills and expand knowledge.
                    </p>
                    <div className="mt-6 inline-block p-[3px] rounded-full" style={{
                      background: 'linear-gradient(90deg, #ef4444, #3b82f6, #f97316, #22c55e)'
                    }}>
                      <div className="inline-flex items-center text-black/90 font-semibold px-4 py-2 rounded-full bg-white">
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
