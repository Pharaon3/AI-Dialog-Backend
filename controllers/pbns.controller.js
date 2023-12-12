const db = require("../models");
const Pbns = db.pbns;
const moment = require('moment');
require('dotenv').config();

var OPENAI_API_KEY   = process.env.OPENAI_API_KEY;
// Retrieve all products from the database.
exports.getLinkedin = async (req, res) => {
  const content = await requestLinkedin(req.body.title, req.body.content);
  const image = await requestLinkedinImage(req.body.title, req.body.content);
  res.status(200).send({ title: req.body.title, content: content, image: image });
};
exports.getTweet = async (req, res) => {
  const content = await requestTweet(req.body.title, req.body.content);
  res.status(200).send({ title: "Title", content: content });
};

// Find a single product with an id
exports.findOne = (req, res) => {
  res.status(200).send({ title: "Title", content: "Content" });
};

const OpenAI = require("openai");

const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

async function requestLinkedin(title, content) {
  const completion = await openai.chat.completions.create({
    messages: [{ 
      role: "system", 
      content: "Generate a unique and engaging LinkedIn post in Hebrew. Start with the title: " + title + " and the content: " + content + ". However, I want the new post to have a fresh perspective and unique insights. Focus on adding personal experiences, industry-specific details, or relevant anecdotes to make it distinct. Emphasize the importance of the topic and provide valuable information that will resonate with the LinkedIn audience. Please ensure that the tone is professional and appropriate for a business platform like LinkedIn."
    }],
    model: "gpt-3.5-turbo",
  });
  console.log("linkedin post: " + completion?.choices[0]?.message?.content);
  return completion?.choices[0]?.message?.content;
}

async function requestTweet(title, content) {
  const completion = await openai.chat.completions.create({
    messages: [{ 
      role: "system", 
      content: "Generate a unique and engaging Tweet in Hebrew with character limitation of tweet. Start with the title: " + title + " and the content: " + content + ". However, I want the new post to have a fresh perspective and unique insights. Focus on adding personal experiences, industry-specific details, or relevant anecdotes to make it distinct. Emphasize the importance of the topic and provide valuable information that will resonate with the LinkedIn audience. Please ensure that the tone is professional and appropriate for a business platform like LinkedIn."
    }],
    model: "gpt-3.5-turbo",
  });
  console.log("Tweet: " + completion?.choices[0]?.message?.content);
  return completion?.choices[0]?.message?.content;
}

async function requestLinkedinImage(title, content) {
  const image = await openai.images.generate({ prompt: "Generate a professional and visually appealing graphic to accompany the LinkedIn post below. The post is titled " + title + " and its content is as follows:" + content.substring(0, 500) });
  return image.data;
}