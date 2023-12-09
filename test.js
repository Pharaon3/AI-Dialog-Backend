
const OpenAI = require("openai");

const openai = new OpenAI();

async function requestLinkedin() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Give me a simple linkedin post contents."}],
    model: "gpt-3.5-turbo",
  });
  console.log("linkedin post: " + completion?.choices[0]?.message?.content);
}
requestLinkedin();