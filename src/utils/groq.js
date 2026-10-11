const API_KEY = import.meta.env.VITE_GROQ_API_KEY
const API_URL = 'https://api.groq.com/openai/v1/chat/completions'

// Models tried in order — falls back if one is unavailable
// Updated Oct 2026 — llama-3.3-70b and llama-3.1-8b moved to Enterprise
const MODEL_FALLBACK_CHAIN = [
  'openai/gpt-oss-120b',   // 120B, 500 t/s, free tier
  'openai/gpt-oss-20b',    // 20B, 1000 t/s, free tier (fastest)
  'qwen/qwen3.8-27b',      // 27B, 450 t/s, free tier
]

const MAX_RETRIES = 3
const RETRY_DELAY_MS = 1500

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/**
 * Call Groq API with automatic retry on 503/429 and model fallback.
 */
async function callGroq(model, prompt) {
  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.4,
        max_tokens: 4096,
      }),
    })

    if (res.ok) {
      const data = await res.json()
      return data?.choices?.[0]?.message?.content ?? ''
    }

    const err = await res.json().catch(() => ({}))
    const status = res.status
    const message = err?.error?.message ?? ''

    // 429 = rate limit, 503 = overloaded → retry with backoff
    if (status === 429 || status === 503) {
      if (attempt < MAX_RETRIES) {
        await sleep(RETRY_DELAY_MS * attempt)
        continue
      }
      throw { type: 'overloaded', message }
    }

    // 404 or decommissioned (400) → try next model
    if (status === 404 || status === 400 && err?.error?.code === 'model_decommissioned') {
      throw { type: 'unavailable', message }
    }

    throw { type: 'error', message: message || `Groq API error ${status}` }
  }
}

/**
 * Ask Groq (Llama 3.3) to generate a step-by-step concept explanation
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

  let lastError = null

  for (const model of MODEL_FALLBACK_CHAIN) {
    try {
      const raw = await callGroq(model, prompt)

      const cleaned = raw
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim()

      try {
        return JSON.parse(cleaned)
      } catch {
        throw new Error('Model returned invalid JSON. Try rephrasing your question.')
      }
    } catch (err) {
      if (err?.type === 'unavailable') {
        lastError = err.message
        continue
      }
      if (err?.type === 'overloaded') {
        lastError = 'overloaded'
        continue
      }
      throw new Error(err?.message ?? 'Something went wrong. Please try again.')
    }
  }

  throw new Error(
    lastError === 'overloaded'
      ? 'Groq is rate-limited right now. Please try again in a moment.'
      : 'No available model found. Please try again later.'
  )
}
