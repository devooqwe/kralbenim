const Discord = require('discord.js');
const db = require('quick.db')
const fs = require('fs')
exports.run = async (client, message,args) => {

  let prefix = "-"

	
  let x = args[0]
  
	if(!args[0]) {
		message.channel.send("Lütfen eklemek istediğiniz komutu yazın.\nÖrnek : **`"+prefix+"komut-ekle komut`**")
		return
	}

	if (client.commands.has(args[0]) || client.aliases.has(args[0])) {
    message.channel.send("Botun var olan bir komutunu özel komut olarak ekleyemezsiniz.")
		return
	}

	var array = []
	var kontrol2 = []
	let komutlar = client.cmdd
	var altkomut = ''

	if(komutlar[message.guild.id]) {
		for (var i = 0; i < Object.keys(komutlar[message.guild.id]).length; i++) {
			if(args[0] === Object.keys(komutlar[message.guild.id][i])[0].toString()) {
				array.push(JSON.parse(`{"${Object.keys(komutlar[message.guild.id][i])[0]}": "${args.slice(1).join(" - ").replace("\n", "\\n")}"}`))
			} else {
				array.push(JSON.parse(`{"${Object.keys(komutlar[message.guild.id][i])[0]}": "${komutlar[message.guild.id][i][Object.keys(komutlar[message.guild.id][i])].replace("\n", "\\n")}"}`))
			}
			kontrol2.push(Object.keys(komutlar[message.guild.id][i])[0].toString())
		}
		if(!kontrol2.includes(args[0])) {
			array.push(JSON.parse(`{"${args[0]}": "${args.slice(1).join(" - ").replace("\n", "\\n")}"}`))
			komutlar[message.guild.id] = array

			fs.writeFile("./komut.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})

			message.channel.send(`
Rol Sistemi İçin Komutunuz Başarıyla Oluşturuldu Komutunuz **!${x}**

Komutu Kullanmak İçin Öncelikle Ayarlarını Yapmalısınız
Bu Komutu Ayarlamak İçin \`!rol-düzenle ${x}\` Yazınız
Tüm Komutları Görmek İçinde \`!rol-komutlar\` Komutunu Giriniz
Eğer Silmek İsterseniz \`!rol-komut-sil ${x}\`
`)
  
			return
		} else {
			komutlar[message.guild.id] = array

			fs.writeFile("./komut.json", JSON.stringify(komutlar), (err) => {
				console.log(err)
			})
message.channel.send(`
Rol Sistemi İçin Komutunuz Başarıyla Oluşturuldu Komutunuz **!${x}**

Komutu Kullanmak İçin Öncelikle Ayarlarını Yapmalısınız
Bu Komutu Ayarlamak İçin \`!rol-düzenle ${x}\` Yazınız
Tüm Komutları Görmek İçinde \`!rol-komutlar\` Komutunu Giriniz
Eğer Silmek İsterseniz \`!rol-komut-sil ${x}\`
`)
  
			return
		}
	} else {
		array.push(JSON.parse(`{"${args[0]}": "${args.slice(1).join(" - ")}"}`))
		komutlar[message.guild.id] = array

		fs.writeFile("./komut.json", JSON.stringify(komutlar), (err) => {
			console.log(err)
		})

		message.channel.send(`
Rol Sistemi İçin Komutunuz Başarıyla Oluşturuldu Komutunuz **!${x}**

Komutu Kullanmak İçin Öncelikle Ayarlarını Yapmalısınız
Bu Komutu Ayarlamak İçin \`!rol-düzenle ${x}\` Yazınız
Tüm Komutları Görmek İçinde \`!rol-komutlar\` Komutunu Giriniz
Eğer Silmek İsterseniz \`!rol-komut-sil ${x}\`
`)
  
		return
	}     
  
     
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['rolkomutoluştur'],
  permLevel: 0
};

module.exports.help = {
  name: 'rol-komut-oluştur',
  description: '',
  usage: ''
};