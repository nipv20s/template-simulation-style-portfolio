import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSimStore } from '../store/useSimStore';
import { X, ExternalLink, Github, Shield, AlertTriangle, Zap, Target } from 'lucide-react';

export const ProjectUnlock: React.FC = () => {
  const { showProject, setShowProject, projects } = useSimStore();
  
  const project = projects.find(p => p.id === showProject);

  if (!project) return null;

  const getThreatIcon = (threat: string) => {
    switch (threat) {
      case 'low': return <Shield className="w-5 h-5 text-terminal-text" />;
      case 'medium': return <AlertTriangle className="w-5 h-5 text-terminal-warning" />;
      case 'high': return <Zap className="w-5 h-5 text-terminal-accent" />;
      case 'critical': return <Target className="w-5 h-5 text-terminal-accent animate-pulse" />;
      default: return <Shield className="w-5 h-5" />;
    }
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'low': return 'text-terminal-text border-terminal-text';
      case 'medium': return 'text-terminal-warning border-terminal-warning';
      case 'high': return 'text-terminal-accent border-terminal-accent';
      case 'critical': return 'text-terminal-accent border-terminal-accent animate-pulse';
      default: return 'text-terminal-text border-terminal-text';
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-terminal-bg bg-opacity-90 backdrop-blur-sm z-50 flex items-center justify-center p-2 md:p-4"
        onClick={() => setShowProject(null)}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          className="bg-terminal-surface border border-terminal-border max-w-4xl w-full max-h-[95vh] md:max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="border-b border-terminal-border p-4 md:p-6 bg-terminal-bg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 md:space-x-3 flex-1">
                <div className="relative">
                  <div className="w-8 h-8 md:w-12 md:h-12 border-2 border-terminal-accent rounded bg-terminal-accent bg-opacity-10 flex items-center justify-center">
                    <span className="text-terminal-accent font-bold">!</span>
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-terminal-accent rounded-full animate-ping"></div>
                </div>
                <div>
                  <h2 className="text-lg md:text-2xl font-bold text-terminal-cyan">PROJECT UNLOCKED</h2>
                  <p className="text-xs md:text-sm text-terminal-text opacity-60">Access Level: GRANTED</p>
                </div>
              </div>
              <button
                onClick={() => setShowProject(null)}
                className="text-terminal-text hover:text-terminal-accent transition-colors flex-shrink-0"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6 space-y-4 md:space-y-6">
            {/* Project Header */}
            <div className="space-y-3 md:space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl md:text-3xl font-bold text-terminal-secondary flex-1 mr-2">{project.title}</h3>
                <div className={`flex items-center space-x-1 md:space-x-2 px-2 md:px-3 py-1 border rounded ${getThreatColor(project.threat)} flex-shrink-0`}>
                  {getThreatIcon(project.threat)}
                  <span className="text-xs md:text-sm font-bold uppercase">{project.threat}</span>
                </div>
              </div>
              
              <p className="text-sm md:text-lg text-terminal-text">{project.description}</p>
            </div>

            {/* Scenario Description */}
            <div className="border border-terminal-border bg-terminal-bg p-3 md:p-4 rounded">
              <h4 className="text-sm md:text-base font-bold text-terminal-cyan mb-2">PROJECT SCENARIO</h4>
              <p className="text-xs md:text-sm text-terminal-secondary italic">{project.scenario}</p>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-sm md:text-base font-bold text-terminal-cyan mb-2 md:mb-3">TECH STACK</h4>
              <div className="flex flex-wrap gap-1 md:gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 md:px-3 py-1 bg-terminal-text bg-opacity-10 border border-terminal-text rounded text-terminal-text text-xs md:text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Learning Points */}
            <div>
              <h4 className="text-sm md:text-base font-bold text-terminal-cyan mb-2 md:mb-3">KEY INSIGHTS</h4>
              <ul className="space-y-1 md:space-y-2">
                {project.learningPoints.map((point, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-2"
                  >
                    <span className="text-terminal-cyan flex-shrink-0 mt-1">▸</span>
                    <span className="text-xs md:text-sm text-terminal-secondary">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4 border-t border-terminal-border">
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 bg-terminal-cyan text-terminal-bg hover:bg-opacity-80 transition-colors font-bold rounded text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>VIEW DEMO</span>
                </motion.a>
              )}
              
              {project.githubUrl && (
                <motion.a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-2 px-4 md:px-6 py-2 md:py-3 border border-terminal-text text-terminal-text hover:bg-terminal-text hover:text-terminal-bg transition-colors font-bold rounded text-sm md:text-base"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-4 h-4" />
                  <span>VIEW CODE</span>
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};