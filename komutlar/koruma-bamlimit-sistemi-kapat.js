const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async(client, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.channel.send('(Kurucu Olda Gel Aslan)Yeterli Yetkiye Sahip Görünmüyorsun! '+client.emojis.get('647760202875142154'))
  if (db.has(`premium_${message.guild.id}`) == false) {
    message.channel.send(`<@${message.author.id}> Maalesef Premium Süresi Bitmiştir. Hizmetimizden Memnun Olduysanız Tekrar Alabilirsiniz \`!premium\``)
  } else {
  if (!db.fetch(`banlimit31_${message.guild.id}`)) return message.channel.send(`${client.emojis.get('647760202875142154')} Olmayan Birşeyi Silemem :)
Kısaca Zaten Kapalıymış Kanka :rose:`)
  db.delete(`banlimit31_${message.guild.id}`)
  message.channel.send(`:ok_hand: Koruma Ban Sistemi Sunucunuz İçin Veritabanından Silinmiştir.`);
  }
  };

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'koruma-banlimit-sistemi-kapat',
  description: 'Ban limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};