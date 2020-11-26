const Discord = require('discord.js');
const db = require('quick.db')


exports.run = async(client, message, args) => {
  
  
  const sayi = args[0]
  if (sayi > 400) return message.reply("En Az `1 - 100` Arasında Bir Tam Sayı Değeri Girmelisiniz.")

  let messages = await message.channel.fetchMessages({
    limit: 400
  });

     let mesaj = await message.channel.bulkDelete(messages, true);
  
  if (!mesaj.size) {
    return message.reply("En Az `1 - 100` Arasında Bir Tam Sayı Değeri Girmelisiniz.")
  }


    message.reply(`${mesaj.size} Adet Mesaj Başarı İle Uzaya Fırlatıldı. :rocket:`)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["sil"],
  permLevel: 2
};

exports.help = {
  name: 'temizle',
  description: 'Ban limiti.',
  usage: 'banlimit',
  kategori: 'yetkili'
};