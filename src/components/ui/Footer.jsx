export default function Footer() {
  return (
    <footer className="border-t border-theme bg-theme-secondary px-6 py-3
                       flex items-center justify-between flex-shrink-0">
      <span className="text-xs text-theme-muted font-mono">
        © {new Date().getFullYear()} Aanchal Singh. All rights reserved.
      </span>
      <span className="text-xs text-theme-muted hidden sm:block">
        Built with <span className="text-primary-500">♥</span> using React + Groq AI
      </span>
    </footer>
  )
}
