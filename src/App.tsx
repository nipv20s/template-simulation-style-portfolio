import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TerminalUI } from './components/TerminalUI';
import { ScenarioEngine } from './components/ScenarioEngine';
import { ProjectUnlock } from './components/ProjectUnlock';
import { IntroSequence } from './components/IntroSequence';
import { useSimStore } from './store/useSimStore';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const { initializeData, unlockedProjects, completedScenarios } = useSimStore();

  useEffect(() => {
    initializeData();
  }, [initializeData]);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroSequence onComplete={handleIntroComplete} />;
  }

  return (
    <TerminalUI>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="space-y-6"
        >
          {/* Welcome message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="border border-terminal-accent bg-terminal-accent bg-opacity-5 p-4 md:p-6 rounded"
          >
            <h1 className="text-xl md:text-2xl font-bold text-terminal-accent mb-2">
              CYBERSECURITY PORTFOLIO SIMULATION
            </h1>
            <p className="text-sm md:text-base text-terminal-secondary">
              Welcome to an interactive cybersecurity portfolio experience. Navigate through realistic attack scenarios 
              to unlock detailed project showcases. Each successful mission reveals technical implementations and security insights.
            </p>
            <div className="mt-4 text-xs md:text-sm text-terminal-text opacity-70">
              Progress: {completedScenarios.length}/4 scenarios completed | {unlockedProjects.length} projects unlocked
            </div>
          </motion.div>

          {/* Main scenario engine */}
          <ScenarioEngine />

          {/* Project unlock modal */}
          <ProjectUnlock />
        </motion.div>
      </AnimatePresence>
    </TerminalUI>
  );
}

export default App;