import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Lock, Skull } from 'lucide-react';

interface IntroSequenceProps {
  onComplete: () => void;
}

export const IntroSequence: React.FC<IntroSequenceProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  const introSteps = [
    {
      icon: <Terminal className="w-16 h-16 text-terminal-accent animate-pulse" />,
      title: "PORTFOLIO SIMULATION LOADING",
      subtitle: "Initializing cybersecurity experience...",
      duration: 2000,
    },
    {
      icon: <Lock className="w-16 h-16 text-terminal-warning animate-bounce" />,
      title: "SCENARIOS LOADED",
      subtitle: "Preparing interactive security challenges...",
      duration: 2500,
    },
    {
      icon: <Skull className="w-16 h-16 text-terminal-text animate-pulse" />,
      title: "TEMPLATE READY",
      subtitle: "Customize this simulation with your own projects",
      duration: 3000,
    },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < introSteps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        onComplete();
      }
    }, introSteps[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  const currentIntro = introSteps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-terminal-bg flex items-center justify-center z-50"
    >
      <div className="text-center space-y-6 md:space-y-8 px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.2, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="flex justify-center mb-4 md:mb-6">
              {currentIntro.icon}
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl md:text-4xl font-bold text-terminal-text font-mono">
                {currentIntro.title}
              </h1>
              <p className="text-terminal-cyan text-sm md:text-lg animate-pulse">
                {currentIntro.subtitle}
              </p>
            </div>

            <div className="flex justify-center space-x-2">
              {introSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index <= currentStep ? 'bg-terminal-accent' : 'bg-terminal-border'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {showSkip && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              onClick={onComplete}
              className="text-terminal-text hover:text-terminal-cyan transition-colors text-sm"
            >
              [ENTER] Skip briefing
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Matrix-style background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-terminal-text opacity-10 font-mono text-xs"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: -20,
              opacity: 0 
            }}
            animate={{ 
              y: window.innerHeight + 20,
              opacity: [0, 0.5, 0] 
            }}
            transition={{ 
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2 
            }}
          >
            {Math.random().toString(2).substr(2, 8)}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};