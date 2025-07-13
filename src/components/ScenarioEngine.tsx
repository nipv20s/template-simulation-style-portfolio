import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimStore } from '../store/useSimStore';
import { ChevronRight, Target, AlertCircle, CheckCircle } from 'lucide-react';

export const ScenarioEngine: React.FC = () => {
  const {
    scenarios,
    completedScenarios,
    currentScenario,
    setCurrentScenario,
    completeScenario,
    missionComplete,
    unlockedProjects,
    resetSimulation,
  } = useSimStore();

  const [selectedChoice, setSelectedChoice] = useState<string>('');
  const [showConsequence, setShowConsequence] = useState(false);

  // Auto-restart timer effect - must be at top level to follow Rules of Hooks
  React.useEffect(() => {
    if (missionComplete) {
      const timer = setTimeout(() => {
        resetSimulation();
      }, 30000);

      return () => clearTimeout(timer);
    }
  }, [missionComplete, resetSimulation]);

  const activeScenario = scenarios.find(s => s.id === currentScenario);

  const handleChoiceSelect = (choiceId: string, unlocks?: string) => {
    setSelectedChoice(choiceId);
    setShowConsequence(true);
    
    setTimeout(() => {
      if (currentScenario) {
        completeScenario(currentScenario, unlocks);
      }
      setSelectedChoice('');
      setShowConsequence(false);
    }, 3000);
  };

  const getScenarioIcon = (iconEmoji: string) => {
    const iconMap: { [key: string]: React.ReactNode } = {
      '🎣': <Target className="w-6 h-6" />,
      '🏢': <AlertCircle className="w-6 h-6" />,
      '🖥️': <CheckCircle className="w-6 h-6" />,
    };
    return iconMap[iconEmoji] || <Target className="w-6 h-6" />;
  };

  if (missionComplete) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4 md:space-y-6 relative"
      >
        {/* Auto-restart countdown */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute top-0 right-0 text-xs text-terminal-text opacity-60"
        >
          Auto-restart in 30s
        </motion.div>

        <div className="text-terminal-text text-6xl animate-pulse">★</div>
        <h2 className="text-xl md:text-2xl font-bold text-terminal-cyan">SIMULATION COMPLETE</h2>
        <div className="border border-terminal-border bg-terminal-surface p-4 md:p-6 rounded">
          <p className="text-sm md:text-base text-terminal-secondary mb-4">
            Excellent work! You've successfully navigated through multiple cybersecurity scenarios and unlocked 
            all available projects. This template demonstrates how to create an engaging, interactive portfolio experience.
          </p>
          <div className="text-sm md:text-base text-terminal-text">
            <p>→ Scenarios Completed: {completedScenarios.length}/4</p>
            <p>→ Projects Unlocked: {unlockedProjects.length}</p>
            <p>→ Template Status: READY FOR CUSTOMIZATION</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
          <motion.button
            className="px-4 md:px-6 py-2 md:py-3 bg-terminal-cyan text-terminal-bg font-bold rounded hover:bg-opacity-80 transition-colors text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={resetSimulation}
          >
            RESTART SIMULATION
          </motion.button>
          
          <motion.button
            className="px-4 md:px-6 py-2 md:py-3 bg-terminal-accent text-terminal-bg font-bold rounded hover:bg-opacity-80 transition-colors text-sm md:text-base"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://github.com/nipv20s/template-simulation-style-portfolio', '_blank')}
          >
            FORK THIS TEMPLATE
          </motion.button>
        </div>
      </motion.div>
    );
  }

  if (!activeScenario) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 md:space-y-6"
      >
        <div className="border border-terminal-border bg-terminal-surface p-4 md:p-6 rounded">
          <h2 className="text-lg md:text-xl font-bold text-terminal-cyan mb-4">AVAILABLE SCENARIOS</h2>
          <p className="text-sm md:text-base text-terminal-secondary mb-4 md:mb-6">
            Select a cybersecurity scenario to explore. Each successful mission unlocks detailed project showcases 
            demonstrating real-world security implementations and methodologies.
          </p>
          
          <div className="grid gap-3 md:gap-4">
            {scenarios.map((scenario) => {
              const isCompleted = completedScenarios.includes(scenario.id);
              
              return (
                <motion.button
                  key={scenario.id}
                  className={`p-3 md:p-4 border rounded text-left transition-all ${
                    isCompleted 
                      ? 'border-terminal-text bg-terminal-text bg-opacity-10' 
                      : 'border-terminal-border hover:border-terminal-cyan hover:bg-terminal-cyan hover:bg-opacity-5'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => !isCompleted && setCurrentScenario(scenario.id)}
                  disabled={isCompleted}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 md:space-x-3 flex-1">
                      <div className={`${isCompleted ? 'text-terminal-text' : 'text-terminal-cyan'}`}>
                        {getScenarioIcon(scenario.icon)}
                      </div>
                      <div>
                        <h3 className={`text-sm md:text-base font-bold ${isCompleted ? 'text-terminal-text' : 'text-terminal-secondary'}`}>
                          {scenario.title}
                        </h3>
                        <p className={`text-xs md:text-sm ${isCompleted ? 'text-terminal-text opacity-70' : 'text-terminal-text opacity-60'}`}>
                          {scenario.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-terminal-text" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-terminal-cyan" />
                      )}
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 md:space-y-6"
    >
      <div className="border border-terminal-border bg-terminal-surface p-4 md:p-6 rounded">
        <div className="flex items-center space-x-2 md:space-x-3 mb-4">
          <div className="text-terminal-cyan">{getScenarioIcon(activeScenario.icon)}</div>
          <h2 className="text-lg md:text-xl font-bold text-terminal-cyan">{activeScenario.title}</h2>
        </div>
        <p className="text-sm md:text-base text-terminal-secondary mb-4 md:mb-6">{activeScenario.description}</p>

        <AnimatePresence mode="wait">
          {!showConsequence ? (
            <motion.div
              key="choices"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <h3 className="text-sm md:text-base font-bold text-terminal-text mb-3 md:mb-4">SELECT YOUR APPROACH:</h3>
              <div className="space-y-2 md:space-y-3">
                {activeScenario.choices.map((choice, index) => (
                  <motion.button
                    key={choice.id}
                    className="w-full p-3 md:p-4 border border-terminal-border hover:border-terminal-cyan hover:bg-terminal-cyan hover:bg-opacity-5 rounded text-left transition-all"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => handleChoiceSelect(choice.id, choice.unlocks)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start space-x-2 md:space-x-3">
                      <span className="text-terminal-cyan font-mono flex-shrink-0 mt-1">
                        [{String.fromCharCode(65 + index)}]
                      </span>
                      <div>
                        <p className="text-sm md:text-base font-bold text-terminal-secondary">{choice.text}</p>
                        <p className="text-xs md:text-sm text-terminal-text opacity-60">{choice.description}</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="consequence"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h3 className="text-sm md:text-base font-bold text-terminal-warning">EXECUTING SCENARIO...</h3>
              <div className="border border-terminal-warning bg-terminal-warning bg-opacity-10 p-3 md:p-4 rounded">
                <p className="text-sm md:text-base text-terminal-secondary">
                  {activeScenario.choices.find(c => c.id === selectedChoice)?.consequence}
                </p>
              </div>
              <div className="text-xs md:text-sm text-terminal-cyan animate-pulse">
                → Analyzing results...
                <br />
                → Processing outcome...
                <br />
                → Unlocking project showcase...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        className="text-sm md:text-base text-terminal-text hover:text-terminal-cyan transition-colors"
        onClick={() => setCurrentScenario(null)}
      >
        ← Back to scenario selection
      </button>
    </motion.div>
  );
};