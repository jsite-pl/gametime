const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json');

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  
  // check if command is good
  if (msg.content.startsWith('/game')) {
  	
  	// go to Info Channel
  	var notifChannel = client.channels.get(config.notifChannel);

  	// send info message
    notifChannel.send('Gramy:');
    notifChannel.send(msg.content.replace('/game', msg.author.username+": "));
    
    // delete user message,
    msg.delete()
	  .then(msg => console.log(`Deleted message from ${msg.author.username}`))
	  .catch(console.error);
  }
});

client.login(config.token);
