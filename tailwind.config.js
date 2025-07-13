/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['IBM Plex Mono', 'JetBrains Mono', 'Courier New', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0a0a0a',
          surface: '#111111',
          border: '#1a1a1a',
          text: '#00ff41',
          secondary: '#ffffff',
          accent: '#ff0040',
          cyan: '#00ffff',
          warning: '#ffff00',
        },
      },
      animation: {
        'flicker': 'flicker 0.15s infinite linear alternate',
        'glitch': 'glitch 0.3s infinite',
        'scanline': 'scanline 2s infinite linear',
        'typewriter': 'typewriter 2s steps(40, end)',
      },
      keyframes: {
        flicker: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0.8' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100vh)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        typewriter: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};