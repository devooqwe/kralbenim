const Discord = require('discord.js')
const fs = require('fs');
const ms = require("ms")
const db = require('quick.db')
exports.run = async (client, msg, args) => {

  const members = msg.guild.members.filter(member => /(.cf|.gg|.me|.com|.io|.tk|.ml|.ga|.gq|.com|.net|.org|.biz|.info|.eu|.nl|.tv|.cc|.me|.mobi|.name|.ws|.academy|.accountant|.accountants|.xyz|.actor|.agency|.apartments|.apartments|.bilgi|.garden|.xyz|.gov)/g.test(member.user.username))

            msg.channel.send(members.map(member => {
              if (!member.user.username.includes("|")) {
              return `${member}`                
              }

            }).join("\n") || "Kimse oynuyor yerine reklam koymamış.")

};



exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['reklam-taraması'],
    permLevel: 0,
}

exports.help = {
    name: 'reklamtaraması',
    description: 'Sunuzunuzu Tanıtmak İçin En Uygun Kod!',
    usage: 'sunucutanıt'
}
