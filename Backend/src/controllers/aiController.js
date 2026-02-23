const geminiService = require("../services/aiService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

// Crisis keywords
const crisisKeywords = [
  "suicide",
  "kill myself",
  "self harm",
  "want to die",
  "end my life",
  "no reason to live",
  "hopeless",
];

const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body; 

    if (!message || typeof message !== "string") {
      return errorResponse(res, 400, "Valid message is required");
    }

    const lowerMessage = message.toLowerCase();

    // 🚨 Crisis Detection
    const isCrisis = crisisKeywords.some((keyword) =>
      lowerMessage.includes(keyword)
    );

    if (isCrisis) {
      return successResponse(res, 200, "Crisis detected", {
        reply:
          "I'm really sorry you're feeling this way. You are not alone. Please reach out to a mental health professional immediately. In India, call Kiran Helpline: 9152987821.",
        riskLevel: "severe",
      });
    }

    const reply = await geminiService.generateChatResponse(message);

    // Basic emotional classification
    let riskLevel = "low";

    if (
      lowerMessage.includes("stress") ||
      lowerMessage.includes("anxious") ||
      lowerMessage.includes("sad")
    ) {
      riskLevel = "moderate";
    }

    return successResponse(res, 200, "AI response generated", {
      reply,
      riskLevel,
    });

  } catch (error) {
    console.error("AI Chat Error:", error.message);
    return errorResponse(
      res,
      500,
      error.message || "AI service is temporarily unavailable."
    );
  }
};

module.exports = {
  chatWithAI,
};




const analyzeMood = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return errorResponse(res, 400, "Text is required");
    }

    const analysis = await geminiService.analyzeMoodFromText(text);

    return successResponse(res, 200, "Mood analyzed", analysis);

  } catch (error) {
    return errorResponse(res, 500, error.message || "Analysis failed");
  }
};

module.exports = {
  chatWithAI,
  analyzeMood,
};
