import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);


//generate the summary of the blog

export const generateSummary = async (blogContent) => {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const prompt = `
  Summarize the following blog in 5 concise bullet points.

  Blog:
  ${blogContent}
  `;

  const result = await model.generateContent(prompt);

  return result.response.text();
};




export const askGeminiQuestion = async (
  blogContent,
  question,
  history = []
) => {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
  });

  const chatHistory = history
    .map(
      msg =>
        `${msg.role}: ${msg.text}`
    )
    .join("\n");

  const prompt = `
You are a blog assistant.

Answer only using information
from the blog.

BLOG:
${blogContent}

PREVIOUS CHAT:
${chatHistory}

CURRENT QUESTION:
${question}
`;

  const result =
    await model.generateContent(prompt);

  return result.response.text();
};

export const translateWithGemini =
async (
  content,
  language
) => {

  const model =
    genAI.getGenerativeModel({
      model:
      "gemini-2.5-flash"
    });

  const prompt = `
Translate the following blog
into ${language}.

Return only translated text.

CONTENT:
${content}
`;

  const result =
    await model.generateContent(
      prompt
    );

  return result.response.text();

};