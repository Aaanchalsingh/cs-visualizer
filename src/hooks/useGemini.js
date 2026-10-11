import { useState, useCallback } from 'react'
import { generateConcept } from '../utils/gemini.js'

/**
 * Hook that wraps the Gemini API call with loading + error state.
 *
 * Usage:
 *   const { generate, concept, loading, error, reset } = useGemini()
 *   await generate("how does a red-black tree work")
 */
export function useGemini() {
  const [concept, setConcept]   = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error,   setError]     = useState(null)

  const generate = useCallback(async (topic) => {
    if (!topic.trim()) return
    setLoading(true)
    setError(null)
    setConcept(null)
    try {
      const result = await generateConcept(topic)
      // Give it a unique id so it doesn't clash with static concepts
      result.id = `ai-${Date.now()}`
      setConcept(result)
    } catch (err) {
      setError(err.message ?? 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setConcept(null)
    setError(null)
    setLoading(false)
  }, [])

  return { generate, concept, loading, error, reset }
}
