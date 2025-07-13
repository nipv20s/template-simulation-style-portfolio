import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Zap, AlertTriangle } from 'lucide-react';
import { useSimStore } from '../store/useSimStore';

interface TerminalUIProps {
  children: React.ReactNode;
}

export const TerminalUI: React.FC<TerminalUIProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const terminalRef = useRef<HTMLDivElement>(null);
  const { resetSimulation } = useSimStore();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  });

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-text font-mono relative overflow-hidden">
      {/* Scanlines overlay */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-terminal-text to-transparent opacity-5 animate-scanline"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,65,0.03) 2px, rgba(0,255,65,0.03) 4px)',
        }}></div>
      </div>

      {/* Header */}
      <motion.div 
        className="border-b border-terminal-border bg-terminal-surface p-3 md:p-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 md:gap-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <Terminal className="w-6 h-6 text-terminal-accent animate-flicker" />
            <span className="text-sm md:text-lg font-bold">CYBERSEC PORTFOLIO SIM</span>
            <div className="hidden md:flex space-x-2">
              <div className="w-3 h-3 bg-terminal-text rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-terminal-cyan rounded-full animate-pulse delay-100"></div>
              <div className="w-3 h-3 bg-terminal-accent rounded-full animate-pulse delay-200"></div>
            </div>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4 text-xs md:text-sm">
            <div className="flex items-center space-x-1 md:space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">THREAT LEVEL: </span>
              <span>ELEVATED</span>
            </div>
            <div className="flex items-center space-x-1 md:space-x-2">
              <Zap className="w-4 h-4" />
              <span>{currentTime.toLocaleTimeString()}</span>
            </div>
            <button
              onClick={resetSimulation}
              className="text-xs text-terminal-text hover:text-terminal-cyan transition-colors"
              title="Reset Simulation"
            >
              [RESET]
            </button>
          </div>
        </div>
      </motion.div>

      {/* Main terminal area */}
      <div ref={terminalRef} className="flex-1 p-4 md:p-6 overflow-y-auto max-h-[calc(100vh-120px)] md:max-h-[calc(100vh-80px)]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {children}
        </motion.div>
      </div>

      {/* Status bar */}
      <motion.div 
        className="border-t border-terminal-border bg-terminal-surface px-4 md:px-6 py-2 text-xs"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-0">
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-terminal-cyan">STATUS: OPERATIONAL</span>
            <span className="hidden md:inline">|</span>
            <span className="text-terminal-warning">MODE: SIMULATION</span>
          </div>
          <div className="flex items-center space-x-1 md:space-x-2">
            <AlertTriangle className="w-4 h-4 text-terminal-accent" />
            <span className="text-terminal-accent">PORTFOLIO TEMPLATE</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};