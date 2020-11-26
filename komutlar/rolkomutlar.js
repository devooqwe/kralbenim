const Discord = require('discord.js');
const db = require('quick.db')
const fs = require('fs')
exports.run = async (client, message,args) => {

  
	var str = ''                   
       let komutlar = client.cmdd
        if(!komutlar[message.guild.id]) {
            str = "Sunucu içi özel komut bulunmuyor."
          
        } else {
            for (var i = 0; i < komutlar[message.guild.id].length; i++) {
                str += Object.keys(komutlar[message.guild.id][i])+"\n"
              const embed = new Discord.RichEmbed()
                    .setDescription(":robot: Sunucuya Ayarlı Komutlar. :robot:")
                    .setColor("GREEN")
                    .addField(`:star: Komut`, "!" + Object.keys(komutlar[message.guild.id][i]) + " @üye")
                    .addField(`:arrow_left:  Üyeden Geri Almak İçin`, "!" + Object.keys(komutlar[message.guild.id][i]) + "sil @üye")
                    .addField(`:star: Silmek İçin`, "!rol-komut-sil " + Object.keys(komutlar[message.guild.id][i]))
                    return message.channel.send(embed)
            }
        }

                    
  
     
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rol-komutları'],
  permLevel: 0
};

module.exports.help = {
  name: 'rolkomutları',
  description: '',
  usage: ''
};