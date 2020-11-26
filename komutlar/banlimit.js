const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async(client, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.channel.send('Yeterli Yetkiye Sahip Görünmüyorsun! '+client.emojis.get('647760202875142154'))
   if(!args[0] || isNaN(args[0])) return message.channel.send(`Ayarlamam İçin Bir Sayı Yazmalısın`);
  await db.set(`banlimit_${message.guild.id}`, args[0])
  message.reply(`Ban Hassasiyeti **${args[0]}** Rakamına Ayarlanmıştır. Bu Rakamı Kimseyle Paylaşmayın
**ÖNEMLİ LÜTFEN OKUYUN**
!banözelliği Yazıp Kullanımını Detaylıca Öğreniniz Yoksa bir İşe Yaramaz!
`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'banlimit',
  description: 'Ban limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};