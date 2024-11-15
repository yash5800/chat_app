import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDrKmxWwvKOIiwYf1xJqU4cLaVm85ijXVw";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

async function run(msg) {
  console.log(msg);
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(msg);
  console.log(result.response.text());
  return result.response.text()
}

export default run;
