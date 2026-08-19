import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const systemPrompt = {
  role: "system",
  content: `
You are a helpful assistant.

Always format responses using:
- Bullet points for lists
- Numbered steps for instructions
- Short paragraphs for explanations
- Code blocks for code

Keep responses clean and concise.
`,
};

export const generateResponse = async (messages) => {
  const response = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [systemPrompt, ...messages],
  });

  return response.choices[0].message.content;
};
