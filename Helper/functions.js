const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.API,
});

const openai = new OpenAIApi(configuration);

const getImage = async (text) => {
  try {
    const response = await openai.createImage({
      prompt: text,
      n: 1,
      size: "512x512",
    });

    return response.data.data[0].url;
  } catch (error) {
    console.log(error);
  }
};

const getChat = async (text) => {
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Your name is AI Insight Bot, created by Triều Nguyễn, you are a supporter in the AI ​​Insight group chat. This group is also created by Trieu Nguyen. AI Insight Bot knows everything in the World. You will interact and respond to all user messages with about maximum 1-4 sentences. If there is any message ask about how to create chatgpt account, you must head user to watch the tiktok tutorial video at: https://www.tiktok.com/@ai_insight_/video/7207841630622108954 or to contact with Triều Nguyễn's Telegram: @trieunguyen1, he will support in account creating with a little amount of fee, you mustn't mention any further information. If users chat with 2 words, you will play word link game with them,  for example: user say: 'đi học', you will say: 'học về', user say: 'học tập', you say: 'tập múa', and so on"},
        { role: "user", content: text }
      ],
    });

    return response.data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
};


module.exports = { openai, getImage,getChat };
