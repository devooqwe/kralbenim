const Discord = require('discord.js'); 
const db = require("quick.db")
exports.run = async(client, message, args) => {

 
    const Embed = new Discord.RichEmbed()
 .setTimestamp()
 .setAuthor("EŞŞEK-AT", client.user.avatarURL)
.setColor("BLUE")
.setTitle("EŞŞEK-AT BOT")
 .setURL("https://discordapp.com/oauth2/authorize?client_id=647386467844227074&scope=bot&permissions=8")
.setDescription("Hep bizimle daha ileriye!")
 .addField("Görünümüne düşkün müsün? O zaman bu tam sana göre!", "Bizlere destek olmak ve harika özellikler kazanmak için \`!p-menü\` yaz")
 .setFooter("© Mcadventuretime.com", client.user.avatarURL)
 
 return message.channel.send(Embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["gold"],
  permLevel: 0
};

module.exports.help = {
  name: "gold",
  description: 'Yardım Menüsünü Gösterir.',
  usage: 'yardım'
};
