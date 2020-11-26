const Discord = require('discord.js'); 
const db = require("quick.db")
exports.run = async(client, message, args) => {

  if (!db.fetch(`goldpuan_${message.author.id}`)) {
    const Embed = new Discord.RichEmbed()
 .setTimestamp()
 .setAuthor("EŞŞEK-AT", client.user.avatarURL)
.setColor("BLUE")
.setTitle("EŞŞEK-AT BOT")
 .setURL("https://discordapp.com/oauth2/authorize?client_id=647386467844227074&scope=bot&permissions=8")

 .setDescription(`
${message.author}, senin puanın **0**
daha fazla puan kazanmak için !p-menü yazabilirsin.
`)
 .addField("!p-market | !p-menu", `
Puanınızı ve market menüsünü gösterir.

`)
 .addField("!p-topaz", `
5.000 puan karşılığında topaz kasa açarsınız.
İçinden rastgele 1-3 gün arası gold üye çıkar.
`)
 
 .addField("!p-yakut", `
10.000 puan karşılığı yakut kasa açarsınız.
İçinden rastgele 1-10 gün arası gold üye çıkar.
`)
 
 .addField("!p-garnet", `
45.000 puan karşılığı garnet kasa açarsınız.
İçinden rastgele (10-45) gün arası gold üye çıkar.
`)
 .setFooter("© Mcadventuretime.com", client.user.avatarURL)
 
 return message.channel.send(Embed)
  }
 const Embed = new Discord.RichEmbed()
 .setTimestamp()
 .setAuthor("EŞŞEK-AT", client.user.avatarURL)
.setColor("BLUE")
.setTitle("EŞŞEK-AT BOT")
 .setURL("https://discordapp.com/oauth2/authorize?client_id=647386467844227074&scope=bot&permissions=8")

 .setDescription(`
${message.author}, senin puanın **${db.fetch(`goldpuan_${message.author.id}`)}**
daha fazla puan kazanmak için !p-menü yazabilirsin.
`)
 .addField("!p-market | !p-menu", `
Puanınızı ve market menüsünü gösterir.

`)
 .addField("!p-topaz", `
5.000 puan karşılığında topaz kasa açarsınız.
İçinden rastgele 1-3 gün arası gold üye çıkar.
`)
 
 .addField("!p-yakut", `
10.000 puan karşılığı yakut kasa açarsınız.
İçinden rastgele 1-10 gün arası gold üye çıkar.
`)
 
 .addField("!p-garnet", `
45.000 puan karşılığı garnet kasa açarsınız.
İçinden rastgele (10-45) gün arası gold üye çıkar.
`)
 .setFooter("© Mcadventuretime.com", client.user.avatarURL)
 
 return message.channel.send(Embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["pmarket","pmenü","pmenu","p-menu", "p-menü"],
  permLevel: 0
};

module.exports.help = {
  name: 'p-market',
  description: 'Yardım Menüsünü Gösterir.',
  usage: 'yardım'
};
