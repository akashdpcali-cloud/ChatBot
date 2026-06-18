import Groq from 'groq-sdk'

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
})
const systemPrompt = {
  role: 'system',
  content: `You are a helpful assistant. Always format your responses clearly using:
- Bullet points for lists
- Numbered steps for instructions
- Short paragraphs for explanations
- Code blocks for any code
Keep responses clean, concise and well structured.`
}

export async function sendMessage(messages) {
  const lastTenMessages = messages.slice(-50)

  const response = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [systemPrompt, ...lastTenMessages],
  })
  return response.choices[0].message.content
}