# Cybersecurity Portfolio Simulation Template

An interactive cybersecurity portfolio experience that transforms traditional project showcases into an engaging simulation. Visitors navigate through realistic attack scenarios to unlock detailed project presentations, creating an immersive way to demonstrate security expertise.

## 🎯 Features

- **Interactive Scenarios**: Navigate through realistic cybersecurity attack scenarios
- **Project Unlocks**: Complete scenarios to reveal detailed project showcases
- **Terminal Aesthetic**: Authentic hacker terminal interface with animations
- **Responsive Design**: Optimized for all devices from mobile to desktop
- **Template Ready**: Easy to customize with your own projects and scenarios
- **Educational**: Learn about security concepts through interactive storytelling

## 🚀 Quick Start

1. **Fork this repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/yourusername/cybersec-portfolio-template.git
   cd cybersec-portfolio-template
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Start development server**
   ```bash
   npm run dev
   ```

## 🛠 Customization

### Adding Your Projects

Edit `src/store/useSimStore.ts` and replace the `templateProjects` array with your own projects:

```typescript
const yourProjects: Project[] = [
  {
    id: 'your-project-id',
    title: 'Your Project Title',
    description: 'Brief description of your project',
    scenario: 'How this project relates to the security scenario',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    demoUrl: 'https://your-demo-url.com',
    githubUrl: 'https://github.com/yourusername/your-project',
    threat: 'high', // low, medium, high, critical
    learningPoints: [
      'Key security insight 1',
      'Key security insight 2',
      // ...
    ],
  },
  // Add more projects...
];
```

### Customizing Scenarios

Update the `templateScenarios` array in the same file:

```typescript
const yourScenarios: Scenario[] = [
  {
    id: 'your-scenario',
    title: 'Your Scenario Title',
    description: 'Description of the security scenario',
    icon: '🔒', // Choose an appropriate emoji
    completed: false,
    choices: [
      {
        id: 'choice-1',
        text: 'Choice description',
        description: 'Detailed explanation',
        consequence: 'What happens when this choice is made',
        unlocks: 'project-id-to-unlock', // optional
      },
      // Add more choices...
    ],
  },
  // Add more scenarios...
];
```

### Styling and Branding

- **Colors**: Modify the color scheme in `tailwind.config.js`
- **Fonts**: Update font imports in `index.html`
- **Content**: Customize welcome messages and text in `src/App.tsx`
- **Favicon**: Replace `public/favicon.svg` with your own

## 📱 Responsive Design

The template is fully responsive with:
- Mobile-first design approach
- Flexible layouts that adapt to screen size
- Touch-friendly interactions
- Optimized typography scaling
- Collapsible navigation elements

## 🎨 Design System

### Colors
- **Background**: Dark terminal theme (`#0a0a0a`)
- **Primary**: Terminal green (`#00ff41`)
- **Accent**: Cyber red (`#ff0040`)
- **Secondary**: Cyan (`#00ffff`)
- **Warning**: Yellow (`#ffff00`)

### Typography
- **Primary Font**: IBM Plex Mono
- **Fallbacks**: JetBrains Mono, Courier New, monospace

### Animations
- Scanline effects
- Glitch transitions
- Typewriter effects
- Pulse animations

## 🔧 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **State Management**: Zustand
- **Build Tool**: Vite
- **Icons**: Lucide React

## 📦 Project Structure

```
src/
├── components/
│   ├── IntroSequence.tsx    # Opening animation sequence
│   ├── ProjectUnlock.tsx    # Project showcase modal
│   ├── ScenarioEngine.tsx   # Main scenario logic
│   └── TerminalUI.tsx       # Terminal interface wrapper
├── store/
│   └── useSimStore.ts       # State management and data
├── App.tsx                  # Main application component
├── main.tsx                 # Application entry point
└── index.css               # Global styles
```

## 🚀 Deployment

The template can be deployed to any static hosting service:

- **Netlify**: Connect your GitHub repo for automatic deployments
- **Vercel**: Import your project for instant deployment
- **GitHub Pages**: Use GitHub Actions for automated deployment

Build command: `npm run build`
Output directory: `dist`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this template for your own portfolio!

## 🎯 Examples

Check out these portfolios built with this template:
- [Add your portfolio here after customization]

## 💡 Tips

- **Content Strategy**: Focus on real projects that demonstrate security skills
- **Scenario Design**: Make scenarios realistic but educational
- **Performance**: Optimize images and animations for smooth experience
- **SEO**: Update meta tags and descriptions for better discoverability

---

**Ready to create your own cybersecurity portfolio simulation?** Fork this template and start customizing!