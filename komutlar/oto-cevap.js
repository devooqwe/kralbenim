const Discord = require('discord.js'); 
const db = require('quick.db'); 
const fs = require('fs'); 
exports.run = async (client, message, args) => { 
  const customArgs = args.join(' ').split(" - ")
  let x = customArgs[1]
  let prefix = "!"
	if(!customArgs[0]) {
    
		message.channel.send("Lütfen eklemek istediğiniz komutu yazın.\nÖrnek : **`"+prefix+"oto-cevap-ekle komut - açıklama`**")
		return
	}

	if(!customArgs.slice(1).join(" - ")) {
    
		message.channel.send("Lütfen komut açıklamasını yazın.\nÖrnek : **`"+prefix+"oto-cevap-ekle komut - açıklama`**")
		return
	}

	if (client.commands.has(customArgs[0]) || client.aliases.has(customArgs[0])) {
		
    message.channel.send("Botun var olan bir komutunu özel otocevap olarak ekleyemezsiniz.")
		return
	}

	var array = []
	var kontrol2 = []
	let komutlar = client.cmddd
	var altkomut = ''

	if(komutlar[message.guild.id]) {
		for (var i = 0; i < Object.keys(komutlar[message.guild.id]).length; i++) {
			if(customArgs[0] === Object.keys(komutlar[message.guild.id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(komutlar[message.guild.id][i])[0]}": "${customArgs.slice(1).join(" - ").replace("\n", "\\n")}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(komutlar[message.guild.id][i])[0]}": "${komutlar[message.guild.id][i][Object.keys(komutlar[message.guild.id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol2.push(Object.keys(komutlar[message.guild.id][i])[0].toString())
		}
		if(!kontrol2.includes(customArgs[0])) {
			array.push(JSON.parse(`{"${customArgs[0]}": "${customArgs.slice(1).join(" - ").replace("\n", "\\n")}"}`))
			komutlar[message.guild.id] = array

			fs.writeFile("./otocevap.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			const embed = new Discord.RichEmbed()
				.setAuthor("Yeni özel otocevap oluşturuldu!")
			  .setDescription(`Artık \`${customArgs[0]}\` yazdığınızda bot \`${customArgs.slice(1).join(" - ")}\` olarak karşılık verecektir.`)
				.setColor("BLUE")
			message.channel.send({embed})
			return
		} else {
			komutlar[message.guild.id] = array

			fs.writeFile("./otocevap.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			const embed = new Discord.RichEmbed()
				.setAuthor(`${customArgs[0]} adlı özel otocevap güncellendi!`)
				.setDescription(`Artık \`${customArgs[0]}\` yazdığınızda bot \`${customArgs.slice(1).join(" - ")}\` olarak karşılık verecektir.`)
				.setColor("BLUE")
			message.channel.send({embed})
			return
		}
	} else {
		array.push(JSON.parse(`{"${customArgs[0]}": "${customArgs.slice(1).join(" - ")}"}`))
		komutlar[message.guild.id] = array

		fs.writeFile("./otocevap.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
		})

		const embed = new Discord.RichEmbed()
			.setAuthor("Yeni özel otocevap oluşturuldu!")
			.setDescription(`Artık \`${customArgs[0]}\` yazdığınızda bot \`${customArgs.slice(1).join(" - ")}\` olarak karşılık verecektir.`)
			.setColor("BLUE")
		message.channel.send({embed})
		return
	}
   
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["oto-cevap-ekle"],
  permLevel: 0
};

exports.help = {
  name: 'otocevapekle',
  description: 'Ban limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};