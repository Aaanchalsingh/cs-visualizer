# CS Visualizer 🎓

> Learn software engineering concepts visually — with animated step-by-step diagrams.

## Features

- 📊 **Animated diagrams** — step through each concept one frame at a time
- 🔍 **Search & filter** — find concepts by name or category
- 💻 **Code examples** — see real code alongside each diagram step
- 🎨 **Dark UI** — easy on the eyes

## Concepts Covered

| Category | Concepts |
|----------|----------|
| Data Structures | Binary Search Tree, Linked List |
| Algorithms | Bubble Sort, Binary Search |
| Design Patterns | Observer, Singleton |
| System Design | Load Balancer, Caching |
| Programming | Recursion |

## Tech Stack

- **React 18** + **Vite**
- **Tailwind CSS** — styling
- **Framer Motion** — animations
- **Mermaid.js** — diagram rendering
- **Lucide React** — icons

## Getting Started

```bash
cd cs-visualizer

# Install dependencies (requires Node 18+)
npm install

# Start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Adding New Concepts

Edit `src/data/concepts.js` and add a new object following this shape:

```js
{
  id: 'my-concept',
  title: 'My Concept',
  emoji: '🚀',
  category: 'Algorithms',        // Data Structures | Algorithms | Design Patterns | System Design | Programming
  difficulty: 'Beginner',        // Beginner | Intermediate | Advanced
  description: 'Short description shown on the card.',
  steps: [
    {
      title: 'Step title',
      explanation: 'What is happening in this step.',
      diagram: `graph LR\n  A["Node"] --> B["Node 2"]`,   // Mermaid syntax
      code: `# Optional code example`,
    },
  ],
}
```

## Future Plans

- [ ] AI-powered: type any concept and Gemini generates the explanation + diagram
- [ ] More concepts (graphs, dynamic programming, microservices, etc.)
- [ ] Chrome extension wrapper
- [ ] Share a concept via URL
