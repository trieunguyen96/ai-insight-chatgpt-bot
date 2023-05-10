require('dotenv').config()
const { Configuration, OpenAIApi } = require("openai");
const { getImage, getChat } = require("./Helper/functions");
const { Telegraf } = require("telegraf");

const configuration = new Configuration({
  apiKey: process.env.API,
});
const openai = new OpenAIApi(configuration);
module.exports = openai;

const bot = new Telegraf(process.env.TG_API);
bot.start((ctx) => ctx.reply("Xin chào, bạn có thể hỏi tôi bất cứ điều gì bằng cách dùng lệnh /hoi + <nội dung> hoặc /anh + <noi dung>"));

bot.help((ctx) => {
  ctx.reply(
    "Tôi có thể đáp ứng các lệnh \n /anh -> để tạo ra ảnh từ text \n /hoi -> để trao đổi với tôi "
  );
});



// Image command
bot.command("anh", async (ctx) => {
  const text = ctx.message.text?.replace("/anh", "Hãy tạo ra một hình ảnh theo phong cách ghibli studio hoặc steampunk hoặc anime hoặc photoreal, với nội dung:")?.trim().toLowerCase();

  if (text) {
   
    const res = await getImage(text);

    if (res) {
      ctx.sendChatAction("upload_photo");
      // ctx.sendPhoto(res);
      // ctx.telegram.sendPhoto()
      ctx.telegram.sendPhoto(ctx.message.chat.id, res, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } else {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      "Vui lòng điền nội dung sau /anh",
      {
        reply_to_message_id: ctx.message.message_id,
      }
    );
  }
});

// Chat command

bot.command("hoi", async (ctx) => {
  const text = ctx.message.text?.replace("/hoi", "")?.trim().toLowerCase();

  if (text) {
    ctx.sendChatAction("typing");
    const res = await getChat(text);
    if (res) {
      ctx.telegram.sendMessage(ctx.message.chat.id, res, {
        reply_to_message_id: ctx.message.message_id,
      });
    }
  } else {
    ctx.telegram.sendMessage(
      ctx.message.chat.id,
      "Vui lòng hỏi bất kỳ điều gì sau /hoi",
      {
        reply_to_message_id: ctx.message.message_id,
      }
    );
  
    //  reply("Please ask anything after /hoi");
  }
});



bot.launch();
