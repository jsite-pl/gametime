const config = require('../config.json');
const Discord = require("discord.js");

exports.run = (client, message, args, level) => {
  let question = args.slice(0).join(" ");

  // if no question, return an error with tip, how to use that command
  if(args.length == 0)
  return message.reply('**Nieprawidłowy format:** `/game <wiadomość>`') // Invalid format: /game <message>

  const embed = new Discord.RichEmbed()
    .setTitle("Gramy!") // Message Title
    .setColor("#EF8D00")
    .setDescription(`${question}\n\nOznacz czy będziesz grać:\n:thumbsup: - Tak, będę\n:shrug: - Nie wiem\n:thumbsdown: - Nie, nie będę`) // {QUESTION} Make react: :thumbsup: - if you will play, :shrug: - if you dont know, :thumbsdown: - if you will not play
    .setFooter(`Info podesłał: ${message.author.username}`, `${message.author.avatarURL}`) // Author: {USERNAME}

  // send message with initial reacts
  var notifChannel = client.channels.get(config.notifChannel);
  notifChannel.send({embed})
    .then((msg) => 
      msg.react('👍')
      .then(() => msg.react('🤷'))
      .then(() => msg.react('👎'))
      .catch(() => console.error('Emoji failed to react')))
    .catch(() => console.error('Send message failed'))
  

  // delete user message,
  message.delete()
    .then(msg => console.log(`Deleted message from ${msg.author.username}`))
    .catch(console.error);

}
