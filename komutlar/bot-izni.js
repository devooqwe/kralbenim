const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) => {
	if (!db.fetch(`antiraidK_${message.guild.id}`)) return
  if(!args[0]) {
		
		message.channel.send(`Bir bot **ID**'si yazmalısın!`)
		return
	}
  
  if(!client.users.has(args[0])) {
					message.channel.send(`Bu **ID**'ye ait kullanıcı bulamadım'!`)
		return
	}
  
  if(!client.users.get(args[0]).bot) {
		message.channel.send(`Bu kişi bot değil!`)
		return
	}
  		
  message.channel.send(`Başarıyla bota izin verdiniz.`)
	
  db.set(`botizin_${message.guild.id}.${args[0]}`, "aktif")
  
};

exports.conf = {
	enabled: true,
	guildOnly: true,
	aliases: ["bot-izni-ver", "botizniver", "botizniver"],
	permLevel: '4',
	kategori: 'yetkili'
}

exports.help = {
	name: 'bot-izniver',
	description: '',
	usage: ''
}