const Discord = require('discord.js');
const db = require('quick.db')
const fs = require('fs')
exports.run = async (client, message,args) => {

  let komutum = client.cmdd
        if(komutum[message.guild.id]) {
            for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
              if (!args[0]) return message.reply(`Bir Veri Girmelisin Boşluğu Silemem Örnek \`!rol-komut-sil komutismi\``)
              if(args[0] === Object.keys(komutum[message.guild.id][i])[0]) {
                   
                    db.delete(`rolkomut-${args[0]}-logkanal_${message.guild.id}`)
                    db.delete(`rolkomut-${args[0]}-rolyetki_${message.guild.id}`)
                    db.delete(`rolkomut-${args[0]}-vrol_${message.guild.id}`)
const komut = args[0]
  
	let komutlar = client.cmdd
	if(komutlar[message.guild.id]) {
		if(komutlar[message.guild.id].length === 1) {
			if(Object.keys(komutlar[message.guild.id][0])[0].toString() === komut) {
				delete komutlar[message.guild.id]
				fs.writeFile("./komut.json", JSON.stringify(komutlar), (err) => {
					console.log(err)
				})
				return
			}
		}
		for (var i = 0; i < komutlar[message.guild.id].length; i++) {
			if(Object.keys(komutlar[message.guild.id][i])[0].toString() === komut) {
				komutlar[message.guild.id].splice(i, 1);
				fs.writeFile("./komut.json", JSON.stringify(komutlar), (err) => {
					console.log(err)
				})
				return
			}
		}
	}
                    return message.reply("Komutunuz Başarı İle Silindi!")
                } else {
                 return message.reply(`Bir Veri Girmelisin Boşluğu Silemem Örnek \`!rol-komut-sil komutismi\``)
                }
            }
        }
     
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolkomutsil'],
  permLevel: 0
};

module.exports.help = {
  name: 'rol-komut-sil',
  description: '',
  usage: ''
};