var config = require('./config.json');
var Bot = require('node-telegram-bot-api');
var token = config.telegramToken;
var CronJob = require('cron').CronJob;
var bot = new Bot(token, {polling: true});

new CronJob(config.frequency, function() {
  var chatId = config.chatId;
  if (config.sendMessage) {
    bot.sendMessage(chatId, config.message);
  }
  if (config.sendSticker) {
    bot.sendSticker(chatId, config.sticker);
  }
}, null, true, 'America/Los_Angeles');

bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, `Your chat id is ${chatId}`);
  if (config.sendSticker) {
    bot.sendSticker(chatId, config.sticker);
  }
});
