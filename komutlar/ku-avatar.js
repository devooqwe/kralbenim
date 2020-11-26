const Discord = require('discord.js');
const db = require('quick.db')
const Jimp = require('jimp')

exports.run = (client, message, args) => { 

 var user = message.mentions.users.first() || message.author; 
  
const embed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setDescription("<@" + user.id + ">")
.setColor("BLUE")
.setImage(user.avatarURL)
message.channel.send(embed)
};
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: ['avatar'], 
  permLevel: 0
};

exports.help = {
  name: 'pp',
  description: 'taslak', 
  usage: 'sayac-hg-msg'
};