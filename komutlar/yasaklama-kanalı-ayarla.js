const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async(client, message, args) => {
if(message.author.id !== message.guild.owner.user.id) return message.channel.send('Yeterli Yetkiye Sahip Görünmüyorsun! '+client.emojis.get('647760202875142154'))
  const kanal = message.mentions.channels.first()
  
  if (!kanal)  {
    return message.channel.send(`
${client.emojis.get("647760202875142154")} Bu Özelliği Ayarlamam İçin Bir Kanal Etiketlemelisin Örnek: \`!yasaklama-kanal-ayarla #kanal\`
`)
  }
  message.channel.send(`${client.emojis.get("647746144155467786")} Ban Kayıt Kanalını ${kanal} Olarak Ayarladım.`)
  db.set(`yasaklamaKanal_${message.guild.id}`, kanal.id)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'yasaklama-kanal-ayarla',
  description: 'Ban limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};