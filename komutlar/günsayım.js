const Discord = require("discord.js");
const moment = require("moment");

exports.run = async (client, message, args) => {
  let pingUye = message.mentions.users.first() || message.author;
  const pingDiscordTarih = new Date().getTime() - pingUye.createdAt.getTime();
  const pingSunucuTarih =
    new Date().getTime() -
    message.guild.members.get(pingUye.id).joinedAt.getTime();
  const pingGün = moment
    .duration(pingDiscordTarih)
    .format("D [gün], hh [saat], mm [dakika'dır]");
  const pingGün2 = moment
    .duration(pingSunucuTarih)
    .format("D [gün], hh [saat], mm [dakika'dır]");
  message.channel.send(
    `:100: \`${pingGün}\` **discord**'a kayıtlı.\n:100: \`${pingGün2}\` **sunucu**muz'a üye.`
  );
};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["günsayim"],
  permLevel: 0
};

exports.help = {
  name: "günsayım321312",
  description:
    "Discord'a Kayıtlı Olduğunuz ve Bulunduğunuz Sunucuya Kayıtlı Olduğunuz Zaman.",
  usage: "günsayim"
};
