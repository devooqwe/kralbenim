const Discord = require('discord.js');
const db = require('quick.db')
const fs = require("fs")
const ms = require("ms")
const Jimp = require("jimp")
exports.run = async (client, message,args) => {

   
  if (db.fetch(`goldpuan_${message.author.id}`) >= 45000) {
let kod31 = "";
  kod31 = (kod31 + Math.floor(Math.random() * 46));
  
 
 const kod32 = require("useful-tools").hesapla(`${db.fetch(`goldpuan_${message.author.id}`)}-5000`)
 db.add(`goldsure_${message.author.id}`, kod31)
 db.set(`goldpuan_${message.author.id}`, kod32)
    var user = message.author; 
  
  Jimp.read(`https://cdn.discordapp.com/attachments/655408338640699434/663057139199377422/depositphotos_66010155-stock-illustration-treasure-chest.jpg`, async(err, image) => {
    await image.resize(794, 598)
        var font = await Jimp.loadFont(Jimp.FONT_SANS_128_WHITE);
        await image.print(font, 125, 309, kod31 + " GÜN");
    Jimp.read(user.avatarURL, async(err, avatar) => {
        await avatar.resize(275, 275) 
      await image.composite(avatar, 269, 39).write(`./resimler/gold/gold-${message.author.id}.png`);
        setTimeout(function() {
            message.reply(`Bravo! **Garnet Kasadan! (${kod31})** Gün Gold Üye Kazandın Azim İle Yapamıyacağın Pek Birşey Yok Sanırım Gold Üyeni Verdim Artık Kullanabilirsin Hayırlı Olsun.`)
            return message.channel.send(new Discord.Attachment(`./resimler/gold/gold-${message.author.id}.png`));
        }, 1000);
      });
    return
    });


    
  } else {
  return message.reply("Puanınız Yetersizdir.")  
  }
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['pgarnet', "garnetkasa", "pgarnetkasa"],
  permLevel: 0
};

module.exports.help = {
  name: 'p-garnet',
  description: '',
  usage: ''
};