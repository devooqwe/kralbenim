const Discord = require('discord.js');
const db = require('quick.db')
const fs = require("fs")
const ms = require("ms")
exports.run = async (client, message,args) => {

   
      let kullanildii = JSON.parse(fs.readFileSync('./ghediye.json', 'utf8'));
  if (!kullanildii[message.author.id]) kullanildii[message.author.id] = {
    gunlukkullanim: 0
  }
  if (kullanildii[message.author.id].gunlukkullanim == 0)
  {
        
let kod31 = "1";
  let kod = "123456789"
  for(var k = 0; k < 3; k++) {
    kod31 = (kod31 + kod.charAt(Math.floor(Math.random() * kod.length)));
  }
 
  db.add(`goldpuan_${message.author.id}`, kod31)
  message.channel.send(`Uuu Şanslısın Ki Hesabına Tamı Tamına ${client.emojis.get("649963065697107978")} ${kod31} Puan Eklendi!
${client.emojis.get("649963065697107978")}  Unutma 24 Saat Sonra Tekrardan Alabilirsin :) !p-market ${client.emojis.get("649963065697107978")}
`)
  kullanildii[message.author.id].gunlukkullanim = 1
    
  fs.writeFile('./ghediye.json', JSON.stringify(kullanildii), (err) => {
      if (err) console.error(err)
    })
  return
  }
  setTimeout(async() => {
    kullanildii[message.author.id].gunlukkullanim = 0
    fs.writeFile('./ghediye.json', JSON.stringify(kullanildii), (err) => {
      if (err) console.error(err)
    })
  }, ms('1s'));
  
  if (kullanildii[message.author.id].gunlukkullanim == 1)
  {
  message.reply("Ödülünüzü Alabilmeniz İçin Henüz 24 Saat Beklemeniz Gerek Şuanki Puanınız: " + `\`${db.fetch(`goldpuan_${message.author.id}`)}\`` + client.emojis.get("649963065697107978"))
  }

}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['günlükhediyem', "günlükhediye", "günlük-hediye"],
  permLevel: 0
};

module.exports.help = {
  name: 'günlük-hediyem',
  description: '',
  usage: ''
};