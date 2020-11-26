const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  


message.channel.send(`MC-EŞŞEK Botun Sunucunuzu Böyle Koruması İçin YÖNETİCİ Yetkisi Olmalı Ve Sonrasında Kendiliğinden Saldırıları Önler.
https://youtu.be/QTE84_-4jb0`) 
  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'spambotkorumasi',
  description: 'sayaç', 
  usage: 'sayaç'
};
