const db = require("../models");
const Pbns = db.pbns;
const moment = require('moment');
// Retrieve all products from the database.
exports.getLinkedin = async (req, res) => {
  const content = await requestLinkedin(req.body.title, req.body.content);
  const image = await requestLinkedinImage(req.body.title, content);
  res.status(200).send({ title: req.body.title, content: content, image: image });
};
exports.getTwitter = async (req, res) => {
  const content = await requestTweet(req.body.title, req.body.content);
  res.status(200).send({ title: "Title", content: content });
};

// Find a single product with an id
exports.findOne = (req, res) => {
  res.status(200).send({ title: "Title", content: "Content" });
};

const OpenAI = require("openai");

const openai = new OpenAI();

async function requestLinkedin(title, content) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Give me a simple linkedin post contents in Hebew. Title is " + title + " and content is similar to : " + content }],
    model: "gpt-3.5-turbo",
  });
  console.log("linkedin post: " + completion?.choices[0]?.message?.content);
  return completion?.choices[0]?.message?.content;
}

async function requestTweet(title, content) {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Give me a simple Tweet post contents with character limitation of Twitter in Hebew. Title is " + title + " and content is similar to: " + content }],
    model: "gpt-3.5-turbo",
  });
  console.log("Tweet: " + completion?.choices[0]?.message?.content);
  return completion?.choices[0]?.message?.content;
}

async function requestLinkedinImage (title, content) {
  const image = await openai.images.generate({ prompt: "Give me a simple linkedin post image. Title is " + title + " and content is : " + content });
  console.log(image.data);
  return image.data;
}