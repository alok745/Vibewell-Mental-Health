import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const generateChatResponse = async (message) => {
  try {
   
    if (!message) {
      throw new Error("Message is required");
    }

    const userMessage =
      typeof message === "string"
        ? message
        : message.message || JSON.stringify(message);

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are VibeWell AI, a supportive and empathetic mental health assistant.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return completion.choices[0]?.message?.content || "I'm here for you.";

  } catch (error) {
    console.error("🔥 Groq Error:", error);
    throw new Error("AI service failed");
  }
};