const Discord = require('discord.js');
const moment = require('moment')

const ayarlar = require('../ayarlar.json');

exports.run = (client, message, params) => {
  let aylar = {
			"01": "Ocak",
			"02": "Şubat",
			"03": "Mart",
			"04": "Nisan",
			"05": "Mayıs",
			"06": "Haziran",
			"07": "Temmuz",
			"08": "Ağustos",
			"09": "Eylül",
			"10": "Ekim",
			"11": "Kasım",
			"12": "Aralık"
    }
  
  let günler = {
      "0": "Pazar",
      "1": "Pazartesi",
      "2": "Salı",
      "3": "Çarşamba",
      "4": "Perşembe",
      "5": "Cuma",
      "6": "Cumartesi",
    }
      var ban = message.guild.fetchBans();
 let guild = message.guild;



   const embed = new Discord.RichEmbed()
   .setColor("15f153")
   .setAuthor(message.guild.name, message.guild.iconURL)
   .setThumbnail(message.guild.iconURL)
   .addField('İsim kısaltması:', message.guild.nameAcronym, true)
   .addField('Sunucu ID:', message.guild.id, true)  
   .addField('Ana kanal:', message.guild.defaultChannel,true)
   .addField('AFK kanalı:', message.guild.afkChannel, true)
   .addField('AFK Zaman Aşımı', `${message.guild.afkTimeout} saniye`,true)
   .addField('Güvenlik Seviyesi:', message.guild.verificationLevel, true)
   .addField('Ban Sayısı:',message.guild.fetchBans(bans => bans.size),false)
   .addField('Kanal Sayısı: ['+message.guild.channels.size+']', `:sound: ${message.guild.channels.filter(chan => chan.type === 'voice').size} :speech_balloon: ${message.guild.channels.filter(chan => chan.type === 'text').size}`, true)
   .addField('Üye Bilgisi : ['+message.guild.memberCount+']', `${client.emojis.get('647797624598036510')}${message.guild.members.filter(o => o.presence.status === 'offline').size} ${client.emojis.get('647797712045211673')}${message.guild.members.filter(o => o.presence.status === 'idle').size} ${client.emojis.get('647797747747127318')}${message.guild.members.filter(o => o.presence.status === 'online').size} ${client.emojis.get('647797797671927818')}${message.guild.members.filter(o => o.presence.status === 'dnd').size}`,false)
   .addField('Sunucu Bölgesi:', message.guild.region, true) 
   .addField('Rol sayısı',message.guild.roles.size,true)
   .addField('Sahibi:', message.guild.owner+``+`\n(`+message.guild.ownerID+`)`, true)//elleme
   .addField('Katılma Tarihi',  message.guild.owner.user.createdAt.toUTCString().replace("Nov", "Kasım").replace("Jan", "Ocak").replace("Feb", "Şubat").replace("Mar", "Mart").replace("Aug", "Ağustos").replace("Sep", "Eylül").replace("Oct", "Ekim").replace("Fri", "Cuma").replace("Mon", "Pazartesi").replace("Sun", "Pazar").replace("Sat", "Cumartesi").replace("Tue", "Salı").replace("Wed", "Çarşamba").replace("Thu", "Perşembe"), true)
   
   .addField('Oluşturma tarihi:', message.guild.createdAt.toDateString().replace("Nov", "Kasım").replace("Jan", "Ocak").replace("Feb", "Şubat").replace("Mar", "Mart").replace("Aug", "Ağustos").replace("Sep", "Eylül").replace("Oct", "Ekim").replace("Fri", "Cuma").replace("Mon", "Pazartesi").replace("Sun", "Pazar").replace("Sat", "Cumartesi").replace("Tue", "Salı").replace("Wed", "Çarşamba").replace("Thu", "Perşembe"), true)
  .setTimestamp()

 
   const roller = new Discord.RichEmbed()
   .setColor('15f153')
   .setDescription(`Tüm Roller: `+message.guild.roles.filter(r => r.name).map(r => r).join(', '))
   
   const emojiler = new Discord.RichEmbed()
   .setColor('15f153')
   .setDescription(`Tüm Emojiler:`+ message.guild.emojis.map(e=>e.toString()).join(" "))
   message.channel.send({embed});
   message.channel.send(roller);
   message.channel.send(emojiler)
 };

 exports.conf = {
   enabled: true,
   guildOnly: false,
   aliases: ["istatistik"],
   permLevel: 0
 };

 exports.help = {
   name: 'sunucubilgi',
   description: 'Kullanılan Yerdeki Sunucu Bilgilerini Gösterir.',
   usage: 'bilgi'
 };