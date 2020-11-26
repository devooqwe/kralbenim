const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async(client, message, args) => {
  if(message.author.id !== message.guild.owner.user.id) return message.channel.send('Yeterli Yetkiye Sahip Görünmüyorsun! '+client.emojis.get('647760202875142154'))
  if (db.has(`premium_${message.guild.id}`) == true) {
    message.channel.send(`<@${message.author.id}> Maalesef Premium Süresi Bitmiştir. Hizmetimizden Memnun Olduysanız Tekrar Alabilirsiniz \`!premium\``)
  } else {
  
   if(!args[0] || isNaN(args[0])) return message.channel.send(`Ayarlamam İçin Bir Sayı Yazmalısın`);
  await db.set(`klimit31_${message.guild.id}`, args[0])
  message.reply(`Kanal Hassasiyeti **${args[0]}** Rakamına Ayarlanmıştır. Bu Rakamı Kimseyle Paylaşmayın
**ÖNEMLİ LÜTFEN OKUYUN**
!koruma Yazıp Kullanımını Detaylıca Öğreniniz Yoksa bir İşe Yaramaz!
`);
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'koruma-kanallimit',
  description: 'Kanal limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};