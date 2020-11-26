const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async(client, message, args) => {
  const banl = db.fetch(`banlimit_${message.guild.id}`);
  const rol = db.fetch(`yasaklamaRol_${message.guild.id}`);
  const log = db.fetch(`yasaklamaKanal_${message.guild.id}`);
  if (!log) return
  if (!rol) return
  if (!banl) return
  
  if (message.member.roles.has(rol)) {
    const kisi = message.mentions.users.first()
    const sebep = args[1]
    if (!kisi) {
      return message.reply(`, Banlanıcak Kullanıcıyı Etiketlemelisin.
Etiketliyorsan Bu Hatayı Alıyorsan O Üyenin Görebildiği Bir Kanalda Banlamayı Denemelisin`)
    }
    
    if (!sebep) {
      return message.reply(`Hata: Sunucudan banlancak kişiyi veya ban sebebini yazmadın!`)
    }
    if (db.fetch(`banP_${message.author.id}`) >= banl) {
    message.channel.send(`<@${message.author.id}> **Hata:** Ban limitin doldu!`)  
    } else {
    client.channels.get(log).send(`${kisi} - <@${message.author.id}> Tarafından ${sebep} Nedeniyle Sunucudan Yasaklandı. ${client.emojis.get("647746144155467786")}`)  
    message.guild.ban(kisi.id, sebep)
    db.add(`banP_${message.author.id}`, 1)
    }
    
  } else {
    return message.reply("Ban Atabilmek İçin Sunucu Sahibinin Ayarladığı Role Sahip Olmalısınız.")
  } 
    
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yasakla"],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Ban limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};