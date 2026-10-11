const API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

/**
 * Ask Gemini to generate a step-by-step concept explanation
 * with Mermaid diagrams for each step.
 *
 * @param {string} topic - e.g. "how a hash map works"
 * @returns {Promise<object>} - parsed concept object matching our data shape
 */
export async function generateConcept(topic) {
  const prompt = `You are an expert software engineering educator.
A user wants to visually understand: "${topic}"

Return a JSON object (no markdown, no code fences, raw JSON only) with this exact shape:
{
  "id": "unique-kebab-case-id",
  "title": "Concept Title",
  "emoji": "single relevant emoji",
  "category": "one of: Data Structures | Algorithms | Design Patterns | System Design | Programming",
  "difficulty": "one of: Beginner | Intermediate | Advanced",
  "description": "One sentence description shown on the card.",
  "steps": [
    {
      "title": "Step title",
      "explanation": "2-3 sentence plain English explanation of this step.",
      "diagram": "valid Mermaid diagram definition string (graph TD/LR, sequenceDiagram, or classDiagram). Use simple node labels, avoid special chars in node text except parentheses and quotes.",
      "code": "optional short code example, or empty string"
    }
  ]
}

Rules:
- Produce 3 to 5 steps that build on each other progressively.
- Each diagram must be valid Mermaid syntax. Prefer graph TD or graph LR for most concepts.
- Keep node labels short (under 20 chars). Wrap labels with quotes if they contain spaces: A["My Label"]
- Do NOT wrap the response in markdown code fences. Return raw JSON only.
- Do NOT include comments inside the JSON.`

  const res = await fetch(`${API_URL}?key=${API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 4096,
      },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message ?? `Gemini API error: ${res.status}`)
  }

  const data = await res.json()
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

  // Strip any accidental markdown fences
  const cleaned = raw
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim()

  try {
    return JSON.parse(cleaned)
  } catch {
    throw new Error('Gemini returned invalid JSON. Try rephrasing your question.')
  }
}
