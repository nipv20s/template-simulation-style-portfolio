import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Project {
  id: string;
  title: string;
  description: string;
  scenario: string;
  stack: string[];
  demoUrl?: string;
  githubUrl?: string;
  threat: 'low' | 'medium' | 'high' | 'critical';
  learningPoints: string[];
}

export interface Scenario {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  choices: Choice[];
  unlockedProject?: string;
}

export interface Choice {
  id: string;
  text: string;
  description: string;
  consequence: string;
  unlocks?: string;
}

interface SimState {
  currentScenario: string | null;
  completedScenarios: string[];
  unlockedProjects: string[];
  scenarios: Scenario[];
  projects: Project[];
  showProject: string | null;
  missionComplete: boolean;
  setCurrentScenario: (scenarioId: string | null) => void;
  completeScenario: (scenarioId: string, projectId?: string) => void;
  setShowProject: (projectId: string | null) => void;
  initializeData: () => void;
}

// TEMPLATE DATA - Replace with your own projects and scenarios
const templateProjects: Project[] = [
  {
    id: 'secure-auth-system',
    title: 'Multi-Factor Authentication Portal',
    description: 'Enterprise-grade authentication system with biometric integration and zero-trust architecture',
    scenario: 'Successfully bypassed traditional login systems by exploiting session management vulnerabilities, leading to the development of this hardened authentication portal.',
    stack: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'WebAuthn', 'JWT'],
    demoUrl: 'https://your-demo-url.com',
    githubUrl: 'https://github.com/yourusername/secure-auth',
    threat: 'high',
    learningPoints: [
      'Session hijacking prevention techniques',
      'Biometric authentication implementation',
      'Zero-trust security architecture',
      'Advanced threat detection algorithms'
    ],
  },
  {
    id: 'network-monitor',
    title: 'Real-time Network Security Monitor',
    description: 'AI-powered network monitoring system that detects anomalies and potential intrusions in real-time',
    scenario: 'After gaining network access, developed this comprehensive monitoring solution to demonstrate both offensive reconnaissance and defensive capabilities.',
    stack: ['Python', 'TensorFlow', 'React', 'WebSockets', 'Docker', 'Elasticsearch'],
    demoUrl: 'https://your-demo-url.com',
    githubUrl: 'https://github.com/yourusername/network-monitor',
    threat: 'critical',
    learningPoints: [
      'Machine learning for anomaly detection',
      'Real-time data processing and visualization',
      'Network traffic analysis techniques',
      'Automated incident response systems'
    ],
  },
  {
    id: 'social-engineering-toolkit',
    title: 'Security Awareness Training Platform',
    description: 'Interactive platform for training employees to recognize and respond to social engineering attacks',
    scenario: 'Following successful social engineering campaigns, created this educational platform to help organizations build human-centered security defenses.',
    stack: ['Vue.js', 'Express.js', 'MongoDB', 'Socket.io', 'Chart.js'],
    demoUrl: 'https://your-demo-url.com',
    githubUrl: 'https://github.com/yourusername/security-training',
    threat: 'medium',
    learningPoints: [
      'Psychology of social engineering attacks',
      'Gamification in security education',
      'Behavioral analytics and reporting',
      'Phishing simulation and tracking'
    ],
  },
  {
    id: 'mobile-security-scanner',
    title: 'Mobile Application Security Scanner',
    description: 'Automated tool for identifying security vulnerabilities in mobile applications',
    scenario: 'Developed after discovering critical vulnerabilities in mobile apps during penetration testing engagements.',
    stack: ['React Native', 'Python', 'FastAPI', 'SQLite', 'Docker'],
    demoUrl: 'https://your-demo-url.com',
    githubUrl: 'https://github.com/yourusername/mobile-scanner',
    threat: 'high',
    learningPoints: [
      'Mobile application security testing',
      'Static and dynamic analysis techniques',
      'OWASP Mobile Top 10 vulnerabilities',
      'Automated security assessment tools'
    ],
  },
];

const templateScenarios: Scenario[] = [
  {
    id: 'social-engineering',
    title: 'Social Engineering Campaign',
    description: 'Execute a sophisticated social engineering attack to gain initial access to target systems',
    icon: '🎭',
    completed: false,
    choices: [
      {
        id: 'generic-phishing',
        text: 'Deploy generic phishing campaign',
        description: 'Use standard phishing templates and mass distribution',
        consequence: 'Low success rate but demonstrates basic attack methodology. Security teams easily detect and block.',
        unlocks: undefined,
      },
      {
        id: 'spear-phishing',
        text: 'Craft targeted spear-phishing attack',
        description: 'Research targets and create personalized, convincing attacks',
        consequence: 'Moderate success rate with sophisticated social engineering techniques demonstrated.',
        unlocks: 'social-engineering-toolkit',
      },
      {
        id: 'advanced-pretext',
        text: 'Execute advanced pretexting scenario',
        description: 'Combine multiple attack vectors with detailed target research',
        consequence: 'High success rate showcasing advanced social engineering mastery and psychological manipulation.',
        unlocks: 'social-engineering-toolkit',
      },
    ],
    unlockedProject: undefined,
  },
  {
    id: 'technical-exploitation',
    title: 'Technical System Exploitation',
    description: 'Identify and exploit technical vulnerabilities in target infrastructure',
    icon: '💻',
    completed: false,
    choices: [
      {
        id: 'automated-scan',
        text: 'Run automated vulnerability scan',
        description: 'Use standard tools for basic vulnerability assessment',
        consequence: 'Identifies common vulnerabilities but lacks depth and may trigger security alerts.',
        unlocks: undefined,
      },
      {
        id: 'manual-testing',
        text: 'Conduct manual penetration testing',
        description: 'Perform detailed manual analysis and custom exploit development',
        consequence: 'Discovers complex vulnerabilities and demonstrates advanced technical skills.',
        unlocks: 'secure-auth-system',
      },
      {
        id: 'zero-day-research',
        text: 'Research and develop zero-day exploits',
        description: 'Identify previously unknown vulnerabilities and create custom exploits',
        consequence: 'Demonstrates cutting-edge security research capabilities and advanced threat simulation.',
        unlocks: 'secure-auth-system',
      },
    ],
    unlockedProject: undefined,
  },
  {
    id: 'network-infiltration',
    title: 'Network Infiltration & Reconnaissance',
    description: 'Gain network access and conduct comprehensive internal reconnaissance',
    icon: '🌐',
    completed: false,
    choices: [
      {
        id: 'passive-recon',
        text: 'Perform passive network reconnaissance',
        description: 'Gather information without directly interacting with target systems',
        consequence: 'Stealthy approach with limited information gathering but minimal detection risk.',
        unlocks: undefined,
      },
      {
        id: 'active-scanning',
        text: 'Execute active network scanning',
        description: 'Comprehensive network mapping and service enumeration',
        consequence: 'Detailed network intelligence gathered with moderate detection risk.',
        unlocks: 'network-monitor',
      },
      {
        id: 'advanced-persistence',
        text: 'Establish advanced persistent threat',
        description: 'Deploy sophisticated monitoring and maintain long-term access',
        consequence: 'Demonstrates advanced threat actor capabilities and comprehensive network understanding.',
        unlocks: 'network-monitor',
      },
    ],
    unlockedProject: undefined,
  },
  {
    id: 'mobile-security',
    title: 'Mobile Security Assessment',
    description: 'Evaluate mobile application and device security posture',
    icon: '📱',
    completed: false,
    choices: [
      {
        id: 'basic-app-test',
        text: 'Basic mobile app security testing',
        description: 'Standard security assessment using common tools',
        consequence: 'Identifies basic vulnerabilities but misses advanced attack vectors.',
        unlocks: undefined,
      },
      {
        id: 'comprehensive-analysis',
        text: 'Comprehensive mobile security analysis',
        description: 'Deep dive into app architecture, data flow, and device integration',
        consequence: 'Thorough security assessment revealing complex vulnerabilities and attack chains.',
        unlocks: 'mobile-security-scanner',
      },
      {
        id: 'custom-exploit-dev',
        text: 'Custom mobile exploit development',
        description: 'Develop novel attack techniques for mobile platforms',
        consequence: 'Cutting-edge mobile security research demonstrating advanced exploitation techniques.',
        unlocks: 'mobile-security-scanner',
      },
    ],
    unlockedProject: undefined,
  },
];

export const useSimStore = create<SimState>()(
  persist(
    (set, get) => ({
      currentScenario: null,
      completedScenarios: [],
      unlockedProjects: [],
      scenarios: [],
      projects: [],
      showProject: null,
      missionComplete: false,

      setCurrentScenario: (scenarioId) => set({ currentScenario: scenarioId }),

      completeScenario: (scenarioId, projectId) => {
        const state = get();
        const updatedScenarios = state.scenarios.map(scenario =>
          scenario.id === scenarioId
            ? { ...scenario, completed: true, unlockedProject: projectId }
            : scenario
        );
        
        const newUnlockedProjects = projectId && !state.unlockedProjects.includes(projectId)
          ? [...state.unlockedProjects, projectId]
          : state.unlockedProjects;

        const newCompletedScenarios = !state.completedScenarios.includes(scenarioId)
          ? [...state.completedScenarios, scenarioId]
          : state.completedScenarios;

        const missionComplete = newCompletedScenarios.length >= 3;

        set({
          scenarios: updatedScenarios,
          unlockedProjects: newUnlockedProjects,
          completedScenarios: newCompletedScenarios,
          missionComplete,
          currentScenario: null,
          showProject: projectId || null,
        });
      },

      setShowProject: (projectId) => set({ showProject: projectId }),

      initializeData: () => set({
        scenarios: templateScenarios,
        projects: templateProjects,
      }),

      resetSimulation: () => set({
        currentScenario: null,
        completedScenarios: [],
        unlockedProjects: [],
        showProject: null,
        missionComplete: false,
      }),
    }),
    {
      name: 'cybersec-sim-storage',
    }
  )
);