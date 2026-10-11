# CS Visualizer 🎓

> Learn software engineering concepts visually — with animated step-by-step diagrams powered by AI.

**🌐 Live site: [cs-visualizer-aanchal.netlify.app](https://cs-visualizer-aanchal.netlify.app)**

[![Netlify Status](https://api.netlify.com/api/v1/badges/c59c41ec-b609-42f4-b638-231d736a33ec/deploy-status)](https://app.netlify.com/projects/cs-visualizer-aanchal/deploys)

---

## Features

- 🤖 **AI-powered** — type any concept and Groq AI generates a step-by-step animated diagram instantly
- 📊 **Animated diagrams** — step through each concept one frame at a time with play/pause controls
- 🌙 **Dark & Light theme** — toggle between themes, persists across sessions
- 📱 **Mobile responsive** — works on phones, tablets, and desktops
- 🔍 **Search & filter** — find concepts by name or category
- 💻 **Code examples** — see real code alongside each diagram step
- ⚡ **Instant fallback** — auto-retries with multiple AI models if one is unavailable

## Live Demo

👉 **[https://cs-visualizer-aanchal.netlify.app](https://cs-visualizer-aanchal.netlify.app)**

## Concepts Covered

| Category | Concepts |
|----------|----------|
| Data Structures | Binary Search Tree, Linked List |
| Algorithms | Bubble Sort, Binary Search |
| Design Patterns | Observer, Singleton |
| System Design | Load Balancer, Caching |
| Programming | Recursion |

> Plus any concept you can think of — just type it in the Ask AI bar!

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18 + Vite |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Diagrams | Mermaid.js |
| AI | Groq API (Llama / GPT-OSS) |
| Icons | Lucide React |
| Deployment | Netlify |

## Getting Started Locally

```bash
git clone https://github.com/Aaanchalsingh/cs-visualizer.git
cd cs-visualizer

# Requires Node 18+
npm install

# Add your Groq API key (free at https://console.groq.com)
cp .env.example .env
# Edit .env and set VITE_GROQ_API_KEY=your_key_here

npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Adding New Concepts

Edit `src/data/concepts.js` and add a new object:

```js
{
  id: 'my-concept',
  title: 'My Concept',
  emoji: '🚀',
  category: 'Algorithms',  // Data Structures | Algorithms | Design Patterns | System Design | Programming
  difficulty: 'Beginner',  // Beginner | Intermediate | Advanced
  description: 'Short description shown on the card.',
  steps: [
    {
      title: 'Step title',
      explanation: 'What is happening in this step.',
      diagram: `graph LR\n  A["Node"] --> B["Node 2"]`,  // Mermaid syntax
      code: `# Optional code example`,
    },
  ],
}
```

## Roadmap

- [ ] Share a concept via URL
- [ ] Chrome extension wrapper
- [ ] More built-in concepts (graphs, DP, microservices, etc.)
- [ ] Export diagram as PNG/SVG

---

© 2026 Aanchal Singh. All rights reserved.
