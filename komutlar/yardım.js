const Discord = require('discord.js'); 
 
exports.run = async(client, message, args) => {
 
 const Embed = new Discord.RichEmbed()
 .setTimestamp()
 .setAuthor("EŞŞEK-AT", client.user.avatarURL)
.setColor("BLUE")
.setTitle("EŞŞEK-AT BOT")
 .setURL("https://discordapp.com/oauth2/authorize?client_id=647386467844227074&scope=bot&permissions=8")
 .setDescription(`

**!yardım**, ile yardım alabilirsiniz.
Örnek komut kullanımı: \`!küfüraç\`
Botu davet etmek için: \`!davet\`
`)
 .addField("!komutlar (13)", `
herkesin kullanabileceği standart komutlar;
\`botbilgi\`,\`davet\`,\`oyver\`,\`gold\`,\`webpanel\`,\`sunucu-pp\`,\`profil\`,\`kredim\`,\`p-market\`,\`p-menü\`,\`puanım\`,\`ayarlar\`
`)
 .addField("!eğlence (9)", `
herkesin kullanabileceği eğlence komutları;
\`kralol\`,\`maymunol\`,\`yılanol\`,\`adamol\`,\`kediol\`,\`aşk\`,\`token\`,\`tokat\`
`)
 
 .addField("!moderasyon (13)", `
yetkililer için moderasyon komutları;
\`küfür\`,\`reklam\`,\`link engel\`,\`reklam kick\`,\`reklam isim ban\`,\`oto rol\`,\`sayaç\`,\`ban koruma sistemi\`,\`duyuru\`,\`oto cevap\`,\`mute sistemi\`,\`anti raid bot sistemi\`
`)
 
 .addField("!moderasyon 2 (12)", `
yetkililer için moderasyon komutlarının 2. bölümü;
\`sil\`,\`reklam taraması\`,\`resimli hg bb\`,\`sunucu tanıt\`,\`oto bot silici\`,\`ultra sohbet temizleyici\`,\`yavaş mod\`,\`duyuru\`,\`tag sistemi\`,\`rol sistemi\`,\`geçici oda sistemi\`,\`kayıt sistemi\`
`)
 
 .addField("!koruma (5)", `
Sunucunuz İçin Koruma Sistemleri.
\`sağ tık ban koruması\`,\`kanal silme koruması\`,\`rol silme koruması\`,\`sunucuya bot sokma koruması\`,\`güvenlik odası\`
`)
 .setFooter("© Mcadventuretime.com", client.user.avatarURL)
 message.channel.send(Embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["yardım","help","h","help"],
  permLevel: 0
};

module.exports.help = {
  name: 'yardım',
  description: 'Yardım Menüsünü Gösterir.',
  usage: 'yardım'
};
