const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const config = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Start loading commands
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith('/')) return;

  const args = message.content.substr(1).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
  }

});
// End loading commands

client.login(config.token);
