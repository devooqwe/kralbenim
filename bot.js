const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const weather = require('weather-js')
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const request = require('request');
const snekfetch = require('snekfetch');
const queue = new Map();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');

let komutum = JSON.parse(fs.readFileSync("./komut.json", "utf8"));

client.cmdd = komutum

let komutum2 = JSON.parse(fs.readFileSync("./otocevap.json", "utf8"));

client.cmddd = komutum2

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping tamamdır.");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});


client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 5;
    return permlvl;
};

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`antiraidK_${member.guild.id}`);
  if (!kanal) return;
      const gözelkanal = client.channels.get(kanal) 
      if (!gözelkanal) return
  if (member.user.bot == true) {
  if (db.fetch(`botizin_${member.guild.id}.${member.id}`) == "aktif") {
  gözelkanal.send("**"+member.user.username + "** adlı bota bir yetkili izin verdi eğer kaldırmak istiyorsanız **!bot-izni-kaldır botunid**.")
  } else {
  gözelkanal.send("**" + member.user.username + "** adlı botu güvenlik amacı ile uzaklaştırdım. Tekrar geldiğinde uzaklaştırılmasını istemiyorsanız **!bot-izni-ver botunid**")
  member.ban()
}
  }
});


client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`otoRK_${member.guild.id}`);
  let rol = await db.fetch(`otoRL_${member.guild.id}`);
  let mesaj = db.fetch(`otoRM_${member.guild.id}`);
  if (!rol) return;

  if (!mesaj) {
    client.channels.get(kanal).send(":loudspeaker: :inbox_tray: Otomatik Rol Verildi Seninle Beraber `" + member.guild.memberCount + "` Kişiyiz! Hoşgeldin! `" + member.user.username + "`");
    return member.addRole(rol);
  }

  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `${member.user}`).replace("-uyetag-", `${member.user.tag}`).replace("-rol-", `${member.guild.roles.get(rol).name}`).replace("-server-", `${member.guild.name}`).replace("-uyesayisi-", `${member.guild.memberCount}`).replace("-botsayisi-", `${member.guild.members.filter(m => m.user.bot).size}`).replace("-bolge-", `${member.guild.region}`).replace("-kanalsayisi-", `${member.guild.channels.size}`);
    member.addRole(rol);
    return client.channels.get(kanal).send(mesajs);
     }
});

client.on("guildMemberAdd", async member => {
  let kanal = await db.fetch(`kayitKanal_${member.guild.id}`);
    let mesaj = db.fetch(`kayitGM_${member.guild.id}`);
  if (!kanal) return;

  if (!mesaj) {
    client.channels.get(kanal).send(":loudspeaker: :inbox_tray: Selam! `" + member.user.username + "`!kayıtol yazarak kayıt olabilirsin!");
    
  }

  if (mesaj) {
    var mesajs = mesaj.replace("-uye-", `${member.user.username}`).replace("-uyetag-", `${member.user.tag}`);
    return client.channels.get(kanal).send(mesajs);
     }
});




client.on("guildMemberAdd", async member => {
  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  if (!kanal) return;
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
    const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacHG_${member.guild.id}`)
    ///....

  ///....
  if (!mesaj) {
    return client.channels.get(kanal).send(":loudspeaker: :inbox_tray: Kullanıcı Katıldı! `" + sayaç + "` Kişi Olmamıza `" + sonuç + "` Kişi Kaldı `" + member.guild.memberCount + "` Kişiyiz!" + client.emojis.get("647746144155467786") + "`" + member.user.username + "`");
  }

  if (member.guild.memberCount == sayaç) {
    return client.channels.get(kanal).send(`:loudspeaker: Sayaç Sıfırlandı! \`${member.guild.memberCount}\` Kişiyiz!`)
    await db.delete(`sayacK_${member.guild.id}`)
    await db.delete(`sayacS_${member.guild.id}`)
    await db.delete(`sayacHG_${member.guild.id}`)
    await db.delete(`sayacBB_${member.guild.id}`)
  }
  if (mesaj) {
    const mesaj31 = mesaj.replace("-uyetag-", `${member.user.tag}`).replace("-server-", `${member.guild.name}`).replace("-uyesayisi-", `${member.guild.memberCount}`).replace("-botsayisi-", `${member.guild.members.filter(m => m.user.bot).size}`).replace("-bolge-", `${member.guild.region}`).replace("-kanalsayisi-", `${member.guild.channels.size}`).replace("-kalanuye-", `${sonuç}`).replace("-hedefuye-", `${sayaç}`)
    return client.channels.get(kanal).send(mesaj31);
    
  }
});

client.on("guildMemberRemove", async member => {

  const kanal = await db.fetch(`sayacK_${member.guild.id}`);
  const sayaç = await db.fetch(`sayacS_${member.guild.id}`);
  const sonuç = sayaç - member.guild.memberCount;
  const mesaj = await db.fetch(`sayacBB_${member.guild.id}`)
  if (!kanal) return;
  if (!sayaç) return;
    ///....

  if (!mesaj) {
    return client.channels.get(kanal).send(":loudspeaker: :outbox_tray: Kullanıcı Ayrıldı. `" + sayaç + "` Kişi Olmamıza `" + sonuç + "` Kişi Kaldı `" + member.guild.memberCount + "` Kişiyiz!" + client.emojis.get("647760202875142154") + "`" + member.user.username + "`");
      }

  if (mesaj) {
    const mesaj31 = mesaj.replace("-uye-", `${member.user.tag}`).replace("-server-", `${member.guild.name}`).replace("-uyesayisi-", `${member.guild.memberCount}`).replace("-botsayisi-", `${member.guild.members.filter(m => m.user.bot).size}`).replace("-bolge-", `${member.guild.region}`).replace("-kanalsayisi-", `${member.guild.channels.size}`).replace("-kalanuye-", `${sonuç}`).replace("-hedefuye-", `${sayaç}`)
    return client.channels.get(kanal).send(mesaj31);
  }
});

//Ban Limit
client.on("guildBanAdd", async(guild, user) => {
  const entry = await guild.fetchAuditLogs({type: 'MEMBER_BAN_ADD'}).then(audit => audit.entries.first())
  let banlimit = await db.fetch(`banlimit31_${guild.id}`)
  let kullanıcıban = await db.fetch(`banlimitP31_${entry.executor.id}`)
  const log = db.fetch(`korumaLog_${guild.id}`); 
    if(banlimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        
        await db.add(`banlimitP31_${entry.executor.id}`, 1)
        
        client.channels.get(log).send(`\`${user.id}\` - \`${user.tag}\` kişisi ${entry.executor} tarafından **${entry.reason ? entry.reason : "girilmedi"}** nedeni ile yasaklandı! \n${entry.executor} Banları: ${kullanıcıban}`)
        
        if(kullanıcıban >= banlimit) {
        
          try {
                guild.kick(entry.executor.id, "Ban Limit")
client.channels.get(log).send(`Sunucundan bir yetkili ban limitine ulaştı ve sunucudan atıldı ! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)          } catch(err) { }
          db.delete(`banlimitP31_${entry.executor.id}`)
        }
      }
    }
  
})


//Kanal Limit
client.on("channelDelete", async(channel) => {
  const guild = channel.guild;
  const entry = await guild.fetchAuditLogs({type: 12}).then(audit => audit.entries.first())
  let kanallimit = await db.fetch(`klimit31_${guild.id}`)
  let kullanıcılimit = await db.fetch(`klimitP31_${entry.executor.id}`)
  const log = db.fetch(`korumaLog_${guild.id}`); 
    if(kanallimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        
        await db.add(`klimitP31_${entry.executor.id}`, 1)
        
        client.channels.get(log).send(`\`${channel.name}\` adlı kanal ${entry.executor} tarafından silindi!`)
        
        if(kullanıcılimit >= kanallimit) {
                  try {
            client.channels.get(log).send(`Sunucundan bir yetkili kanal limitine ulaştı ve sunucudan atıldı ! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)
            guild.kick(entry.executor.id, "Kanal Limit")
            
          } catch(err) { }
          db.delete(`klimitP31_${entry.executor.id}`)
        }
      }
    }
  
})

//Rol Limit
client.on("roleDelete", async(role) => {
  const guild = role.guild;
  const entry = await guild.fetchAuditLogs({type: 32}).then(audit => audit.entries.first())
  let kanallimit = await db.fetch(`rlimit31_${guild.id}`)
  let kullanıcılimit = await db.fetch(`rlimitP31_${entry.executor.id}`)
  const log = db.fetch(`korumaLog_${guild.id}`); 
    if(kanallimit) {
      if(entry.executor.id !== guild.owner.user.id) {
        
        await db.add(`rlimitP31_${entry.executor.id}`, 1)
        
        client.channels.get(log).send(`\`${role.name}\` adlı rol ${entry.executor} tarafından silindi!`)
        
        if(kullanıcılimit >= kanallimit) {
                  try {
            client.channels.get(log).send(`Sunucundan bir yetkili rol limitine ulaştı ve sunucudan atıldı ! İşte bilgileri => \n\n\`Kullanıcı:\`  ${entry.executor} | ${entry.executor.id} \n\`Discord'a ve Sunucuya Katılım Tarihi:\` \n• **Discord:** ${moment(entry.executor.createdAt).format('DD/MM/YYYY | HH:mm:ss')} • **Sunucu:** ${moment(guild.member(entry.executor).joinedAt).format('DD/MM/YYYY | HH:mm:ss')}`)
            guild.kick(entry.executor.id, "Rol Limit")
            
          } catch(err) { }
          db.delete(`rlimitP31_${entry.executor.id}`)
        }
      }
    }
  
})



//
client.on('guildMemberAdd',async member => {
  let user = client.users.get(member.id);
  let chan = client.channels.get(db.fetch(`guvenlik${member.guild.id}`)) 
       const Canvas = require('canvas')
       const canvas = Canvas.createCanvas(360,100);
       const ctx = canvas.getContext('2d');
  
  const resim1 = await Canvas.loadImage('https://i.hizliresim.com/gPMMrQ.png')
    const resim2 = await Canvas.loadImage('https://i.hizliresim.com/9YZZaO.png')
    const kurulus = new Date().getTime() - user.createdAt.getTime();
    
    var kontrol;
      if (kurulus > 1296000000) kontrol = resim1
    if (kurulus < 1296000000) kontrol = resim2

  const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
  ctx.drawImage(kontrol,0,0,canvas.width, canvas.height)
  ctx.beginPath();
	ctx.lineWidth = 4;
  ctx.fill()
	ctx.lineWidth = 4;
  ctx.arc(180, 46, 36, 0, 2 * Math.PI);
	ctx.clip();
  ctx.drawImage(avatar, 143,10, 73, 72  );

   
       const attachment = new Discord.Attachment(canvas.toBuffer(), 'STARKs-güvenlik.png');
    chan.send(attachment)
});

 

client.on("message", message => {

  if (!message.guild) return;
   

  
        let komutum = client.cmddd
        if(komutum[message.guild.id]) {
            for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
                if(message.content.startsWith(Object.keys(komutum[message.guild.id][i])[0])) {
                  message.channel.send(komutum[message.guild.id][i][Object.keys(komutum[message.guild.id][i])])
                }
            }
        } 
});


  


client.on("message",async  message => {

  if (!message.guild) return;
  
let prefix = "-"

  
        let komutum = client.cmdd
        if(komutum[message.guild.id]) {
            for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
                if(message.content.startsWith(prefix + Object.keys(komutum[message.guild.id][i])[0])) {
                    const logkanal = db.fetch(`rolkomut-${Object.keys(komutum[message.guild.id][i])[0]}-logkanal_${message.guild.id}`)
                    const yetkirol = db.fetch(`rolkomut-${Object.keys(komutum[message.guild.id][i])[0]}-rolyetki_${message.guild.id}`)
                    const srol = db.fetch(`rolkomut-${Object.keys(komutum[message.guild.id][i])[0]}-srol_${message.guild.id}`)
                    const vrol = db.fetch(`rolkomut-${Object.keys(komutum[message.guild.id][i])[0]}-vrol_${message.guild.id}`)
                    const kisi = message.mentions.users.first()
                    if (!kisi) return message.reply(`Hata: Kullanıcı Bulunamadı.
Örnek Kullanım : !${Object.keys(komutum[message.guild.id][i])[0]} @Mahmut`)
                    if (!logkanal) return message.reply(`Log Kanalı Ayarlanmamış Bu Komutu Tüm Özellikleri Ayarlamadan Kullanamazsınız
Düzenleme Komutu: !rol-düzenle mahmut`)
                  if (!yetkirol) return message.reply(`Rol Yöneticisi Ayarlanmamış Bu Komutu Tüm Özellikleri Ayarlamadan Kullanamazsınız
Düzenleme Komutu: !rol-düzenle mahmut`)
                    if (!vrol) return message.reply(`Verilecek Rol Ayarlanmamış Bu Komutu Tüm Özellikleri Ayarlamadan Kullanamazsınız
Düzenleme Komutu: !rol-düzenle mahmut`)
                  
                  if (!srol) {
           if (message.member.roles.has(yetkirol)) {       
                  message.guild.members.get(kisi.id).addRole(vrol)
                  const embed = new Discord.RichEmbed()
                  .setDescription(":robot: Ayarlanılan Rol Başarıyla Verildi :robot:")
                  .setColor("GREEN")
                  .addField(":star: Rolü Veren Kişi", message.author)
                  .addField(":star: Rolü Alan Kişi", kisi)
                  .addField(`${client.emojis.get("647746144155467786")}: Verildi`, message.guild.roles.get(vrol).name)
                  message.channel.send(embed) 
                  return client.channels.get(logkanal).send(embed)
             } else {
               if (message.member.roles.has(yetkirol)) {       
                  message.guild.members.get(kisi.id).removeRole(srol)
                 message.guild.members.get(kisi.id).addRole(vrol)
                  const embed = new Discord.RichEmbed()
                  .setDescription(":robot: Ayarlanılan Rol Başarıyla Verildi :robot:")
                  .setColor("GREEN")
                  .addField(":star: Rolü Veren Kişi", message.author)
                  .addField(":star: Rolü Alan Kişi", kisi)
                  .addField(`${client.emojis.get("647746144155467786")}: Verildi`, message.guild.roles.get(vrol).name)
                 message.channel.send(embed) 
                  client.channels.get(logkanal).send(embed)
                 
                 const embed2 = new Discord.RichEmbed()
                  .setDescription(":robot: Ayarlanılan Rol Başarıyla Silindi :robot:")
                  .setColor("RED")
                  .addField(":star: Rolü Silinen Kişi", kisi)
                  .addField(`${client.emojis.get("647746144155467786")}: Silindi`, message.guild.roles.get(vrol).name)
                 message.channel.send(embed2) 
                 return client.channels.get(logkanal).send(embed2)
             }
             }
                } else {
    return message.reply("Rol Vermek İçin Sunucu Sahibinin Ayarladığı Role Sahip Olmalısınız.")
  } 
                  } 
            }
  
    }
});


client.on("message",async  message => {

  if (!message.guild) return;
  
let prefix = "-"

  
        let komutum = client.cmdd
        if(komutum[message.guild.id]) {
            for (var i = 0; i < Object.keys(komutum[message.guild.id]).length; i++) {
                if(message.content.startsWith(prefix + Object.keys(komutum[message.guild.id][i])[0]+"sil")) {
                    const logkanal = db.fetch(`rolkomut-${Object.keys(komutum[message.guild.id][i])[0]}-logkanal_${message.guild.id}`)
                    const yetkirol = db.fetch(`rolkomut-${Object.keys(komutum[message.guild.id][i])[0]}-rolyetki_${message.guild.id}`)
                    const srol = db.fetch(`rolkomut-${Object.keys(komutum[message.guild.id][i])[0]}-srol_${message.guild.id}`)
                    const vrol = db.fetch(`rolkomut-${Object.keys(komutum[message.guild.id][i])[0]}-vrol_${message.guild.id}`)
                    const kisi = message.mentions.users.first()
                    if (!kisi) return message.reply(`Hata: Kullanıcı Bulunamadı.
Örnek Kullanım : !${Object.keys(komutum[message.guild.id][i])[0]} @Mahmut`)
                    if (!logkanal) return message.reply(`Log Kanalı Ayarlanmamış Bu Komutu Tüm Özellikleri Ayarlamadan Kullanamazsınız
Düzenleme Komutu: !rol-düzenle mahmut`)
                  if (!yetkirol) return message.reply(`Rol Yöneticisi Ayarlanmamış Bu Komutu Tüm Özellikleri Ayarlamadan Kullanamazsınız
Düzenleme Komutu: !rol-düzenle mahmut`)
                    if (!vrol) return message.reply(`Verilecek Rol Ayarlanmamış Bu Komutu Tüm Özellikleri Ayarlamadan Kullanamazsınız
Düzenleme Komutu: !rol-düzenle mahmut`)
                  
                  
           if (message.member.roles.has(yetkirol)) {       
                  message.guild.members.get(kisi.id).addRole(vrol)
                  const embed2 = new Discord.RichEmbed()
                  .setDescription(":robot: Ayarlanılan Rol Başarıyla Silindi :robot:")
                  .setColor("RED")
                  .addField(":star: Rolü Silinen Kişi", kisi)
                  .addField(`${client.emojis.get("647746144155467786")}: Silindi`, message.guild.roles.get(vrol).name)
                 message.channel.send(embed2) 
                 return client.channels.get(logkanal).send(embed2)
             }  else {
    return message.reply("Rol Vermek İçin Sunucu Sahibinin Ayarladığı Role Sahip Olmalısınız.")
  } 
                  } 
            }
  
    }
});



client.on("message", async msg => {
    let i = db.has(`otobsilici_${msg.channel.id+msg.guild.id}`)
       if (i == true) {   
              let kanal = db.fetch(`otobsilici_${msg.channel.id+msg.guild.id}`)

  if (msg.channel.id != kanal.id) {
  if (msg.content.length > 0) {

    if(msg.author.bot === true){
      msg.delete(10000).then(
      
      )
    }
  }
          }
        }
})


client.on("message", async message => {
  
  const kanal = db.fetch(`utsK_${message.channel.id+message.guild.id}`)
  
  if (message.channel.id == kanal) {
             
    if (message.author.bot == true) {
      return message.delete(10000)
    }
let uwu = false;
            while (!uwu) {
                const response = await message.channel.awaitMessages(neblm => neblm.author.bot === true, { max: 1, time: 30000 });
                if (response) uwu = true
                }
                if (uwu) {
                try {
                 message.delete(10000)
            } catch(e) {
            message.channel.send(':warning: Bir hata var!')
        }
    } else return console.log('Hata var')
  }
})

client.on("message", msg => {
  const reklama = db.fetch(`linkK_${msg.channel.id}`)
  if (!reklama) return
  var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if (regex.test(msg.content) == true) {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
      return;
    }
    
   msg.delete()
    const Embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setAuthor("MC-EŞŞEK", client.user.avatarURL)
    .setDescription(`${msg.author} Reklam Yasak Bunu Bilmiyormusun! ${client.emojis.get("649299260906405919")}`)
    msg.channel.send(Embed).then(sil => sil.delete(3000))
  }
})

client.on("message", msg => {
  const reklama = db.fetch(`reklamK_${msg.channel.id}`)
  if (!reklama) return
    const kelime = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
  if (kelime.some(reklam => msg.content.includes(reklam))) {
    if (msg.member.hasPermission("BAN_MEMBERS")) {
      return;
    }
    
   msg.delete()
    const Embed = new Discord.RichEmbed()
    .setColor("BLUE")
    .setAuthor("MC-EŞŞEK", client.user.avatarURL)
    .setDescription(`${msg.author} Reklam Yasak Bunu Bilmiyormusun! ${client.emojis.get("649299260906405919")}`)
    msg.channel.send(Embed).then(sil => sil.delete(3000))
  }
})

client.on("message", async msg => {
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;
  let i = await db.fetch(`küfürE_${msg.channel.id}`)
    //
  if (i == 'aktif') {
      const kufur = ["abaza","abazan","aq","ağzınasıçayım","ahmak","am","amarım","ambiti","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","amcıkhoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoy","amınakoyarım","amınakoyayım","amınakoyim","amınakoyyim","amınas","amınasikem","amınasokam","amınferyadı","amını","amınıs","amınoglu","amınoğlu","amınoğli","amısına","amısını","amina","aminakoyarim","aminakoyayım","aminakoyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","aminoglu","amiyum","amk","amkafa","amkçocuğu","amlarnzn","amlı","amm","amna","amnda","amndaki","amngtn","amnn","amq","amsız","amsiz","amuna","ana","anaaann","anal","anan","anana","anandan","ananı","ananı","ananın","ananınam","ananınamı","ananındölü","ananınki","ananısikerim","ananısikerim","ananısikeyim","ananısikeyim","ananızın","ananızınam","anani","ananin","ananisikerim","ananisikerim","ananisikeyim","ananisikeyim","anann","ananz","anas","anasını","anasınınam","anasıorospu","anasi","anasinin","angut","anneni","annenin","annesiz","aptal","aq","a.q","a.q.","aq.","atkafası","atmık","avrat","babaannesikaşar","babanı","babanın","babani","babasıpezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bitch","bok","boka","bokbok","bokça","bokkkumu","boklar","boktan","boku","bokubokuna","bokum","bombok","boner","bosalmak","boşalmak","çük","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dölü","eben","ebeni","ebenin","ebeninki","ecdadını","ecdadini","embesil","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","geber","geberik","gebermek","gebermiş","gebertir","gerızekalı","gerizekalı","gerizekali","gerzek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","göt","götdeliği","götherif","götlalesi","götlek","götoğlanı","götoğlanı","götoş","götten","götü","götün","götüne","götünekoyim","götünekoyim","götünü","götveren","götveren","götverir","gtveren","hasiktir","hassikome","hassiktir","hassiktir","hassittir","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnesi","ipne","itoğluit","kahpe","kahpenin","kaka","kaltak","kancık","kancik","kappe","kavat","kavatn","kocagöt","koduğmunun","kodumun","kodumunun","koduumun","mal","malafat","malak","manyak","meme","memelerini","oc","ocuu","ocuun","0Ç","o.çocuğu","orosbucocuu","orospu","orospucocugu","orospuçoc","orospuçocuğu","orospuçocuğudur","orospuçocukları","orospudur","orospular","orospunun","orospununevladı","orospuydu","orospuyuz","orrospu","oruspu","oruspuçocuğu","oruspuçocuğu","osbir","öküz","penis","pezevek","pezeven","pezeveng","pezevengi","pezevenginevladı","pezevenk","pezo","pic","pici","picler","piç","piçinoğlu","piçkurusu","piçler","pipi","pisliktir","porno","pussy","puşt","puşttur","s1kerim","s1kerm","s1krm","sakso","salaak","salak","serefsiz","sexs","sıçarım","sıçtığım","sıkecem","sicarsin","sie","sik","sikdi","sikdiğim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinler","siksiz","siksok","siksz","sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktir","siktiret","siktirgit","siktirgit","siktirir","siktiririm","siktiriyor","siktirlan","siktirolgit","sittimin","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülalenizi","tasak","tassak","taşak","taşşak","s.k","s.keyim","vajina","vajinanı","xikeyim","yaaraaa","yalarım","yalarun","orospi","orospinin","orospının","orospı","yaraaam","yarak","yaraksız","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yrrak","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiin","ağzına","am","mk","amcık","amcıkağız","amcıkları","amık","amın","amına","amınakoyim","amınoğlu","amina","amini","amk","amq","anan","ananı","ananızı","ananizi","aminizi","aminii","avradını","avradini","anasını","b.k","bok","boktan","boşluk","dalyarak","dasak","dassak","daşak","daşşak","daşşaksız","durum","ensest","erotik","fahişe","fuck","g*t","g*tü","g*tün","g*tüne","g.t","gavat","gay","gerızekalıdır","gerizekalı","gerizekalıdır","got","gotunu","gotuze","göt","götü","götüne","götünü","götünüze","götüyle","götveren","götvern","guat","hasiktir","hasiktr","hastir","i.ne","ibne","ibneler","ibneliği","ipne","ipneler","it","iti","itler","kavat","kıç","kıro","kromusunuz","kromusunuz","lezle","lezler","nah","o.ç","oç.","okuz","orosbu","orospu","orospucocugu","orospular","otusbir","otuzbir","öküz","penis","pezevenk","pezevenkler","pezo","pic","piç","piçi","piçinin","piçler","pis","pok","pokunu","porn","porno","puşt","sex","s.tir","sakso","salak","sanane","sanane","sçkik","seks","serefsiz","serefsz","serefszler","sex","sıçmak","sıkerım","sıkm","sıktır","si.çmak","sicmak","sicti","sik","sikenin","siker","sikerim","sikerler","sikert","sikertirler","sikertmek","sikeyim","sikicem","sikiim","sikik","sikim","sikime","sikimi","sikiş","sikişken","sikişmek","sikm","sikmeyi","siksinler","siktiğim","siktimin","siktin","siktirgit","siktir","siktirgit","siktirsin","siqem","skiym","skm","skrm","sktim","sktir","sktirsin","sktr","sktroradan","sktrsn","snane","sokacak","sokarim","sokayım","sülaleni","şerefsiz","şerefsizler","şerefsizlerin","şerefsizlik","tasak","tassak","taşak","taşşak","travesti","yarak","yark","yarrağım","yarrak","yarramın","yarrk","yavşak","yrak","yrk","ebenin","ezik","o.ç.","orospu","öküz","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sperm","bok","aq","a.q.","amk","am","amına","ebenin","ezik","fahişe","gavat","gavurundölü","gerizekalı","göte","götü","götüne","götünü","lan","mal","o.ç.","orospu","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikilmiş","siktir","sperm","taşak","totoş","yarak","yarrak","bok","aq","a.q.","amk","am","ebenin","fahişe","gavat","gerizakalı","gerizekalı","göt","göte","götü","götüne","götsün","piçsin","götsünüz","piçsiniz","götünüze","kıçınız","kıçınıza","götünü","hayvan","ibne","ipne","kahpe","kaltak","lan","mal","o.c","oc","manyak","o.ç.","oç","orospu","öküz","pezevenk","piç","puşt","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikiim","siktim","siki","sikilmiş","siktir","siktir","sperm","şerefsiz","taşak","totoş","yarak","yarrak","yosma","aq","a.q.","amk","amına","amınakoyim","amina","ammına","amna","sikim","sikiym","sikeyim","siktr","kodumun","amık","sikem","sikim","sikiym","s.iktm","s.ikerim","s.ktir","amg","am.k","a.mk","amık","rakı","rak","oruspu","oc","ananın","ananınki","bacının","bacını","babanın","sike","skim","skem","amcık","şerefsiz","piç","piçinoğlu","amcıkhoşafı","amınasokam","amkçocuğu","amınferyadı","amınoglu","piçler","sikerim","sikeyim","siktiğim","siktiğimin","amını","amına","amınoğlu","amk","ipne","ibne","serefsiz","şerefsiz","piç","piçkurusu","götün","götoş","yarrak","amcik","sıçarım","sıçtığım","aq","a.q","a.q.","aq.","a.g.","ag.","amınak","aminak","amınag","aminag","amınıs","amınas","ananı","babanı","anani","babani","bacını","bacini","ecdadını","ecdadini","sikeyim","sulaleni","sülaleni","dallama","dangalak","aptal","salak","gerızekalı","gerizekali","öküz","angut","dalyarak","sikiyim","sikeyim","götüne","götünü","siktirgit","siktirgit","siktirolgit","siktirolgit","siktir","hasiktir","hassiktir","hassiktir","dalyarak","dalyarrak","kancık","kancik","kaltak","orospu","oruspu","fahişe","fahise","pezevenk","pezo","kocagöt","ambiti","götünekoyim","götünekoyim","amınakoyim","aminakoyim","amınak","aminakoyayım","aminakoyayim","amınakoyarım","aminakoyarim","aminakoyarim","ananısikeyim","ananisikeyim","ananısikeyim","ananisikeyim","ananisikerim","ananısikerim","ananisikerim","ananısikerim","orospucocugu","oruspucocu","amk","amq","sikik","götveren","götveren","amınoğlu","aminoglu","amınoglu","gavat","kavat","anneni","annenin","ananın","ananin","dalyarak","sikik","amcık","siktir","piç","pic","sie","yarram","göt","meme","dildo","skcem","skerm","skerim","skecem","orrospu","annesiz","kahpe","kappe","yarak","yaram","dalaksız","yaraksız","amlı","s1kerim","s1kerm","s1krm","sikim","orospuçocukları", "oç"]
      
      if (kufur.some(word => msg.content.toLowerCase().startsWith(word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
            msg.delete();  
const embed1 = new Discord.RichEmbed()
        .setColor("BLUE")
        .setDescription(`${msg.author} Küfür Etmemelisin**!** ${client.emojis.get("649299260906405919")}`)
                  return msg.channel.send(embed1).then(msg => msg.delete(3000));           
            }              
          } catch(err) {
            console.log(err);
          }
        }
         
    }
    
    if (!i) return;
    });

client.on("message", async msg => {
  
  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;
  let i = await db.fetch(`küfürE_${msg.channel.id}`)
    //if (kufur.some(word => msg.content.startWith(word))) {}
  if (i == 'aktif') {
      const kufur = ["abaza","abazan","aq","ağzınasıçayım","ahmak","am","amarım","ambiti","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","amcıkhoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoy","amınakoyarım","amınakoyayım","amınakoyim","amınakoyyim","amınas","amınasikem","amınasokam","amınferyadı","amını","amınıs","amınoglu","amınoğlu","amınoğli","amısına","amısını","amina","aminakoyarim","aminakoyayım","aminakoyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","aminoglu","amiyum","amk","amkafa","amkçocuğu","amlarnzn","amlı","amm","amna","amnda","amndaki","amngtn","amnn","amq","amsız","amsiz","amuna","ana","anaaann","anal","anan","anana","anandan","ananı","ananı","ananın","ananınam","ananınamı","ananındölü","ananınki","ananısikerim","ananısikerim","ananısikeyim","ananısikeyim","ananızın","ananızınam","anani","ananin","ananisikerim","ananisikerim","ananisikeyim","ananisikeyim","anann","ananz","anas","anasını","anasınınam","anasıorospu","anasi","anasinin","angut","anneni","annenin","annesiz","aptal","aq","a.q","a.q.","aq.","atkafası","atmık","avrat","babaannesikaşar","babanı","babanın","babani","babasıpezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bitch","bok","boka","bokbok","bokça","bokkkumu","boklar","boktan","boku","bokubokuna","bokum","bombok","boner","bosalmak","boşalmak","çük","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dölü","eben","ebeni","ebenin","ebeninki","ecdadını","ecdadini","embesil","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","geber","geberik","gebermek","gebermiş","gebertir","gerızekalı","gerizekalı","gerizekali","gerzek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","göt","götdeliği","götherif","götlalesi","götlek","götoğlanı","götoğlanı","götoş","götten","götü","götün","götüne","götünekoyim","götünekoyim","götünü","götveren","götveren","götverir","gtveren","hasiktir","hassikome","hassiktir","hassiktir","hassittir","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnesi","ipne","itoğluit","kahpe","kahpenin","kaka","kaltak","kancık","kancik","kappe","kavat","kavatn","kocagöt","koduğmunun","kodumun","kodumunun","koduumun","mal","malafat","malak","manyak","meme","memelerini","oc","ocuu","ocuun","0Ç","o.çocuğu","orosbucocuu","orospu","orospucocugu","orospuçoc","orospuçocuğu","orospuçocuğudur","orospuçocukları","orospudur","orospular","orospunun","orospununevladı","orospuydu","orospuyuz","orrospu","oruspu","oruspuçocuğu","oruspuçocuğu","osbir","öküz","penis","pezevek","pezeven","pezeveng","pezevengi","pezevenginevladı","pezevenk","pezo","pic","pici","picler","piç","piçinoğlu","piçkurusu","piçler","pipi","pisliktir","porno","pussy","puşt","puşttur","s1kerim","s1kerm","s1krm","sakso","salaak","salak","serefsiz","sexs","sıçarım","sıçtığım","sıkecem","sicarsin","sie","sik","sikdi","sikdiğim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinler","siksiz","siksok","siksz","sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktir","siktiret","siktirgit","siktirgit","siktirir","siktiririm","siktiriyor","siktirlan","siktirolgit","sittimin","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülalenizi","tasak","tassak","taşak","taşşak","s.k","s.keyim","vajina","vajinanı","xikeyim","yaaraaa","yalarım","yalarun","orospi","orospinin","orospının","orospı","yaraaam","yarak","yaraksız","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yrrak","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiin","ağzına","am","mk","amcık","amcıkağız","amcıkları","amık","amın","amına","amınakoyim","amınoğlu","amina","amini","amk","amq","anan","ananı","ananızı","ananizi","aminizi","aminii","avradını","avradini","anasını","b.k","bok","boktan","boşluk","dalyarak","dasak","dassak","daşak","daşşak","daşşaksız","durum","ensest","erotik","fahişe","fuck","g*t","g*tü","g*tün","g*tüne","g.t","gavat","gay","gerızekalıdır","gerizekalı","gerizekalıdır","got","gotunu","gotuze","göt","götü","götüne","götünü","götünüze","götüyle","götveren","götvern","guat","hasiktir","hasiktr","hastir","i.ne","ibne","ibneler","ibneliği","ipne","ipneler","it","iti","itler","kavat","kıç","kıro","kromusunuz","kromusunuz","lezle","lezler","nah","o.ç","oç.","okuz","orosbu","orospu","orospucocugu","orospular","otusbir","otuzbir","öküz","penis","pezevenk","pezevenkler","pezo","pic","piç","piçi","piçinin","piçler","pis","pok","pokunu","porn","porno","puşt","sex","s.tir","sakso","salak","sanane","sanane","sçkik","seks","serefsiz","serefsz","serefszler","sex","sıçmak","sıkerım","sıkm","sıktır","si.çmak","sicmak","sicti","sik","sikenin","siker","sikerim","sikerler","sikert","sikertirler","sikertmek","sikeyim","sikicem","sikiim","sikik","sikim","sikime","sikimi","sikiş","sikişken","sikişmek","sikm","sikmeyi","siksinler","siktiğim","siktimin","siktin","siktirgit","siktir","siktirgit","siktirsin","siqem","skiym","skm","skrm","sktim","sktir","sktirsin","sktr","sktroradan","sktrsn","snane","sokacak","sokarim","sokayım","sülaleni","şerefsiz","şerefsizler","şerefsizlerin","şerefsizlik","tasak","tassak","taşak","taşşak","travesti","yarak","yark","yarrağım","yarrak","yarramın","yarrk","yavşak","yrak","yrk","ebenin","ezik","o.ç.","orospu","öküz","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sperm","bok","aq","a.q.","amk","am","amına","ebenin","ezik","fahişe","gavat","gavurundölü","gerizekalı","göte","götü","götüne","götünü","lan","mal","o.ç.","orospu","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikilmiş","siktir","sperm","taşak","totoş","yarak","yarrak","bok","aq","a.q.","amk","am","ebenin","fahişe","gavat","gerizakalı","gerizekalı","göt","göte","götü","götüne","götsün","piçsin","götsünüz","piçsiniz","götünüze","kıçınız","kıçınıza","götünü","hayvan","ibne","ipne","kahpe","kaltak","lan","mal","o.c","oc","manyak","o.ç.","oç","orospu","öküz","pezevenk","piç","puşt","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikiim","siktim","siki","sikilmiş","siktir","siktir","sperm","şerefsiz","taşak","totoş","yarak","yarrak","yosma","aq","a.q.","amk","amına","amınakoyim","amina","ammına","amna","sikim","sikiym","sikeyim","siktr","kodumun","amık","sikem","sikim","sikiym","s.iktm","s.ikerim","s.ktir","amg","am.k","a.mk","amık","rakı","rak","oruspu","oc","ananın","ananınki","bacının","bacını","babanın","sike","skim","skem","amcık","şerefsiz","piç","piçinoğlu","amcıkhoşafı","amınasokam","amkçocuğu","amınferyadı","amınoglu","piçler","sikerim","sikeyim","siktiğim","siktiğimin","amını","amına","amınoğlu","amk","ipne","ibne","serefsiz","şerefsiz","piç","piçkurusu","götün","götoş","yarrak","amcik","sıçarım","sıçtığım","aq","a.q","a.q.","aq.","a.g.","ag.","amınak","aminak","amınag","aminag","amınıs","amınas","ananı","babanı","anani","babani","bacını","bacini","ecdadını","ecdadini","sikeyim","sulaleni","sülaleni","dallama","dangalak","aptal","salak","gerızekalı","gerizekali","öküz","angut","dalyarak","sikiyim","sikeyim","götüne","götünü","siktirgit","siktirgit","siktirolgit","siktirolgit","siktir","hasiktir","hassiktir","hassiktir","dalyarak","dalyarrak","kancık","kancik","kaltak","orospu","oruspu","fahişe","fahise","pezevenk","pezo","kocagöt","ambiti","götünekoyim","götünekoyim","amınakoyim","aminakoyim","amınak","aminakoyayım","aminakoyayim","amınakoyarım","aminakoyarim","aminakoyarim","ananısikeyim","ananisikeyim","ananısikeyim","ananisikeyim","ananisikerim","ananısikerim","ananisikerim","ananısikerim","orospucocugu","oruspucocu","amk","amq","sikik","götveren","götveren","amınoğlu","aminoglu","amınoglu","gavat","kavat","anneni","annenin","ananın","ananin","dalyarak","sikik","amcık","siktir","piç","pic","sie","yarram","göt","meme","dildo","skcem","skerm","skerim","skecem","orrospu","annesiz","kahpe","kappe","yarak","yaram","dalaksız","yaraksız","amlı","s1kerim","s1kerm","s1krm","sikim","orospuçocukları", "oç"]
      if (msg.content.includes(" ")) {
      if (kufur.some(word => msg.content.toLowerCase().includes(" " + word))) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
            msg.delete();  
const embed1 = new Discord.RichEmbed()
        .setColor("BLUE")
        .setDescription(`${msg.author} Küfür Etmemelisin**!** ${client.emojis.get("649299260906405919")}`)
                  return msg.channel.send(embed1).then(msg => msg.delete(3000));           
            }              
          } catch(err) {
            console.log(err);
          }
        }
        } else {
         if (kufur.some(word => msg.content == word)) {
          try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();  
const embed1 = new Discord.RichEmbed()
        .setColor("BLUE")
        .setDescription(`${msg.author} Küfür Etmemelisin**!** ${client.emojis.get("649299260906405919")}`)
                  return msg.channel.send(embed1).then(msg => msg.delete(3000));           
            }              
          } catch(err) {
            console.log(err);
          }
        } 
        }
    }
    
    if (!i) return;
    });

client.on('messageUpdate', async (oldMsg, newMsg) => {  
if (!oldMsg.guild) return;
  if (oldMsg.author.bot) return;
  let i = await db.fetch(`küfürE_${oldMsg.channel.id}`)
  
  if (i == 'aktif') {
      const kufur = ["abaza","abazan","aq","ağzınasıçayım","ahmak","am","amarım","ambiti","ambiti","amcığı","amcığın","amcığını","amcığınızı","amcık","amcıkhoşafı","amcıklama","amcıklandı","amcik","amck","amckl","amcklama","amcklaryla","amckta","amcktan","amcuk","amık","amına","amınako","amınakoy","amınakoyarım","amınakoyayım","amınakoyim","amınakoyyim","amınas","amınasikem","amınasokam","amınferyadı","amını","amınıs","amınoglu","amınoğlu","amınoğli","amısına","amısını","amina","aminakoyarim","aminakoyayım","aminakoyayim","aminakoyim","aminda","amindan","amindayken","amini","aminiyarraaniskiim","aminoglu","aminoglu","amiyum","amk","amkafa","amkçocuğu","amlarnzn","amlı","amm","amna","amnda","amndaki","amngtn","amnn","amq","amsız","amsiz","amuna","ana","anaaann","anal","anan","anana","anandan","ananı","ananı","ananın","ananınam","ananınamı","ananındölü","ananınki","ananısikerim","ananısikerim","ananısikeyim","ananısikeyim","ananızın","ananızınam","anani","ananin","ananisikerim","ananisikerim","ananisikeyim","ananisikeyim","anann","ananz","anas","anasını","anasınınam","anasıorospu","anasi","anasinin","angut","anneni","annenin","annesiz","aptal","aq","a.q","a.q.","aq.","atkafası","atmık","avrat","babaannesikaşar","babanı","babanın","babani","babasıpezevenk","bacına","bacını","bacının","bacini","bacn","bacndan","bitch","bok","boka","bokbok","bokça","bokkkumu","boklar","boktan","boku","bokubokuna","bokum","bombok","boner","bosalmak","boşalmak","çük","dallama","daltassak","dalyarak","dalyarrak","dangalak","dassagi","diktim","dildo","dingil","dingilini","dinsiz","dkerim","domal","domalan","domaldı","domaldın","domalık","domalıyor","domalmak","domalmış","domalsın","domalt","domaltarak","domaltıp","domaltır","domaltırım","domaltip","domaltmak","dölü","eben","ebeni","ebenin","ebeninki","ecdadını","ecdadini","embesil","fahise","fahişe","feriştah","ferre","fuck","fucker","fuckin","fucking","gavad","gavat","geber","geberik","gebermek","gebermiş","gebertir","gerızekalı","gerizekalı","gerizekali","gerzek","gotlalesi","gotlu","gotten","gotundeki","gotunden","gotune","gotunu","gotveren","göt","götdeliği","götherif","götlalesi","götlek","götoğlanı","götoğlanı","götoş","götten","götü","götün","götüne","götünekoyim","götünekoyim","götünü","götveren","götveren","götverir","gtveren","hasiktir","hassikome","hassiktir","hassiktir","hassittir","ibine","ibinenin","ibne","ibnedir","ibneleri","ibnelik","ibnelri","ibneni","ibnenin","ibnesi","ipne","itoğluit","kahpe","kahpenin","kaka","kaltak","kancık","kancik","kappe","kavat","kavatn","kocagöt","koduğmunun","kodumun","kodumunun","koduumun","mal","malafat","malak","manyak","meme","memelerini","oc","ocuu","ocuun","0Ç","o.çocuğu","orosbucocuu","orospu","orospucocugu","orospuçoc","orospuçocuğu","orospuçocuğudur","orospuçocukları","orospudur","orospular","orospunun","orospununevladı","orospuydu","orospuyuz","orrospu","oruspu","oruspuçocuğu","oruspuçocuğu","osbir","öküz","penis","pezevek","pezeven","pezeveng","pezevengi","pezevenginevladı","pezevenk","pezo","pic","pici","picler","piç","piçinoğlu","piçkurusu","piçler","pipi","pisliktir","porno","pussy","puşt","puşttur","s1kerim","s1kerm","s1krm","sakso","salaak","salak","serefsiz","sexs","sıçarım","sıçtığım","sıkecem","sicarsin","sie","sik","sikdi","sikdiğim","sike","sikecem","sikem","siken","sikenin","siker","sikerim","sikerler","sikersin","sikertir","sikertmek","sikesen","sikey","sikeydim","sikeyim","sikeym","siki","sikicem","sikici","sikien","sikienler","sikiiim","sikiiimmm","sikiim","sikiir","sikiirken","sikik","sikil","sikildiini","sikilesice","sikilmi","sikilmie","sikilmis","sikilmiş","sikilsin","sikim","sikimde","sikimden","sikime","sikimi","sikimiin","sikimin","sikimle","sikimsonik","sikimtrak","sikin","sikinde","sikinden","sikine","sikini","sikip","sikis","sikisek","sikisen","sikish","sikismis","sikiş","sikişen","sikişme","sikitiin","sikiyim","sikiym","sikiyorum","sikkim","sikleri","sikleriii","sikli","sikm","sikmek","sikmem","sikmiler","sikmisligim","siksem","sikseydin","sikseyidin","siksin","siksinler","siksiz","siksok","siksz","sikti","siktigimin","siktigiminin","siktiğim","siktiğimin","siktiğiminin","siktii","siktiim","siktiimin","siktiiminin","siktiler","siktim","siktimin","siktiminin","siktir","siktiret","siktirgit","siktirgit","siktirir","siktiririm","siktiriyor","siktirlan","siktirolgit","sittimin","skcem","skecem","skem","sker","skerim","skerm","skeyim","skiim","skik","skim","skime","skmek","sksin","sksn","sksz","sktiimin","sktrr","skyim","slaleni","sokam","sokarım","sokarim","sokarm","sokarmkoduumun","sokayım","sokaym","sokiim","soktuğumunun","sokuk","sokum","sokuş","sokuyum","soxum","sulaleni","sülalenizi","tasak","tassak","taşak","taşşak","s.k","s.keyim","vajina","vajinanı","xikeyim","yaaraaa","yalarım","yalarun","orospi","orospinin","orospının","orospı","yaraaam","yarak","yaraksız","yaraktr","yaram","yaraminbasi","yaramn","yararmorospunun","yarra","yarraaaa","yarraak","yarraam","yarraamı","yarragi","yarragimi","yarragina","yarragindan","yarragm","yarrağ","yarrağım","yarrağımı","yarraimin","yarrak","yarram","yarramin","yarraminbaşı","yarramn","yarran","yarrana","yarrrak","yavak","yavş","yavşak","yavşaktır","yrrak","zigsin","zikeyim","zikiiim","zikiim","zikik","zikim","ziksiin","ağzına","am","mk","amcık","amcıkağız","amcıkları","amık","amın","amına","amınakoyim","amınoğlu","amina","amini","amk","amq","anan","ananı","ananızı","ananizi","aminizi","aminii","avradını","avradini","anasını","b.k","bok","boktan","boşluk","dalyarak","dasak","dassak","daşak","daşşak","daşşaksız","durum","ensest","erotik","fahişe","fuck","g*t","g*tü","g*tün","g*tüne","g.t","gavat","gay","gerızekalıdır","gerizekalı","gerizekalıdır","got","gotunu","gotuze","göt","götü","götüne","götünü","götünüze","götüyle","götveren","götvern","guat","hasiktir","hasiktr","hastir","i.ne","ibne","ibneler","ibneliği","ipne","ipneler","it","iti","itler","kavat","kıç","kıro","kromusunuz","kromusunuz","lezle","lezler","nah","o.ç","oç.","okuz","orosbu","orospu","orospucocugu","orospular","otusbir","otuzbir","öküz","penis","pezevenk","pezevenkler","pezo","pic","piç","piçi","piçinin","piçler","pis","pok","pokunu","porn","porno","puşt","sex","s.tir","sakso","salak","sanane","sanane","sçkik","seks","serefsiz","serefsz","serefszler","sex","sıçmak","sıkerım","sıkm","sıktır","si.çmak","sicmak","sicti","sik","sikenin","siker","sikerim","sikerler","sikert","sikertirler","sikertmek","sikeyim","sikicem","sikiim","sikik","sikim","sikime","sikimi","sikiş","sikişken","sikişmek","sikm","sikmeyi","siksinler","siktiğim","siktimin","siktin","siktirgit","siktir","siktirgit","siktirsin","siqem","skiym","skm","skrm","sktim","sktir","sktirsin","sktr","sktroradan","sktrsn","snane","sokacak","sokarim","sokayım","sülaleni","şerefsiz","şerefsizler","şerefsizlerin","şerefsizlik","tasak","tassak","taşak","taşşak","travesti","yarak","yark","yarrağım","yarrak","yarramın","yarrk","yavşak","yrak","yrk","ebenin","ezik","o.ç.","orospu","öküz","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sperm","bok","aq","a.q.","amk","am","amına","ebenin","ezik","fahişe","gavat","gavurundölü","gerizekalı","göte","götü","götüne","götünü","lan","mal","o.ç.","orospu","pezevenk","piç","puşt","salak","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikilmiş","siktir","sperm","taşak","totoş","yarak","yarrak","bok","aq","a.q.","amk","am","ebenin","fahişe","gavat","gerizakalı","gerizekalı","göt","göte","götü","götüne","götsün","piçsin","götsünüz","piçsiniz","götünüze","kıçınız","kıçınıza","götünü","hayvan","ibne","ipne","kahpe","kaltak","lan","mal","o.c","oc","manyak","o.ç.","oç","orospu","öküz","pezevenk","piç","puşt","salak","serefsiz","sik","sikkırığı","sikerler","sikertmek","sikik","sikiim","siktim","siki","sikilmiş","siktir","siktir","sperm","şerefsiz","taşak","totoş","yarak","yarrak","yosma","aq","a.q.","amk","amına","amınakoyim","amina","ammına","amna","sikim","sikiym","sikeyim","siktr","kodumun","amık","sikem","sikim","sikiym","s.iktm","s.ikerim","s.ktir","amg","am.k","a.mk","amık","rakı","rak","oruspu","oc","ananın","ananınki","bacının","bacını","babanın","sike","skim","skem","amcık","şerefsiz","piç","piçinoğlu","amcıkhoşafı","amınasokam","amkçocuğu","amınferyadı","amınoglu","piçler","sikerim","sikeyim","siktiğim","siktiğimin","amını","amına","amınoğlu","amk","ipne","ibne","serefsiz","şerefsiz","piç","piçkurusu","götün","götoş","yarrak","amcik","sıçarım","sıçtığım","aq","a.q","a.q.","aq.","a.g.","ag.","amınak","aminak","amınag","aminag","amınıs","amınas","ananı","babanı","anani","babani","bacını","bacini","ecdadını","ecdadini","sikeyim","sulaleni","sülaleni","dallama","dangalak","aptal","salak","gerızekalı","gerizekali","öküz","angut","dalyarak","sikiyim","sikeyim","götüne","götünü","siktirgit","siktirgit","siktirolgit","siktirolgit","siktir","hasiktir","hassiktir","hassiktir","dalyarak","dalyarrak","kancık","kancik","kaltak","orospu","oruspu","fahişe","fahise","pezevenk","pezo","kocagöt","ambiti","götünekoyim","götünekoyim","amınakoyim","aminakoyim","amınak","aminakoyayım","aminakoyayim","amınakoyarım","aminakoyarim","aminakoyarim","ananısikeyim","ananisikeyim","ananısikeyim","ananisikeyim","ananisikerim","ananısikerim","ananisikerim","ananısikerim","orospucocugu","oruspucocu","amk","amq","sikik","götveren","götveren","amınoğlu","aminoglu","amınoglu","gavat","kavat","anneni","annenin","ananın","ananin","dalyarak","sikik","amcık","siktir","piç","pic","sie","yarram","göt","meme","dildo","skcem","skerm","skerim","skecem","orrospu","annesiz","kahpe","kappe","yarak","yaram","dalaksız","yaraksız","amlı","s1kerim","s1kerm","s1krm","sikim","orospuçocukları", "oç"]
      if (kufur.some(word => oldMsg.content.toLowerCase().includes(word))) {

      try {
          if (!oldMsg.member.hasPermission("BAN_MEMBERS")) {
              newMsg.delete();
              
        const embed1 = new Discord.RichEmbed()
        .setColor("BLUE")
        .setDescription(`${oldMsg.author} Ben Zeki Bir Botum Mesajını Editlersende Küfür Edemezsin**!** ${client.emojis.get("649299260906405919")}`)

                  return oldMsg.channel.send(embed1).then(msg => msg.delete(3000));
          }              
        } catch(err) {
          console.log(err);
        }
      }
  }
  if (!i) return;
});

client.on("message", msg => { 
   const linkK = db.has(`linkKR_${msg.guild.id}`)
  if (!msg.guild) return;
  if (!linkK) return;
    if (linkK === true) {
    var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if (regex.test(msg.content) == true) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) {
      msg.delete()
      if (db.fetch(`linkP_${msg.author.id}`) == 3) {
      db.delete(`linkP_${msg.author.id}`)
        
        msg.channel.send(msg.author.username + ` çok fazla reklam yaptığı için atıldı.`)
        return msg.guild.members.get(msg.author.id).kick()
      }
      if (db.fetch(`linkP_${msg.author.id}`) >= 3) {
      db.delete(`linkP_${msg.author.id}`)

        msg.channel.send(msg.author.username + ` çok fazla reklam yaptığı için atıldı.`)
        return msg.guild.members.get(msg.author.id).kick()
      }
      db.add(`linkP_${msg.author.id}`, 1)

        msg.reply(`Bu sunucuda **reklam kick sistemi** aktif **${db.fetch(`linkP_${msg.author.id}`)}/3**`)

    }
}
    }
});
client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms2 = require('parse-ms')
let timeout = 600000 //süresini dilediğiniz gibi kısaltabilirsiniz.
let dakdest = 1
let i = db.fetch(`goldsure_${msg.author.id}`)
          if (db.has(`goldsure_${msg.author.id}`) == true) {
    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms2(timeout - (Date.now() - dakdest));
    } else {
  if(msg.author.bot) return;   
  if (msg.content.length > 64) {
  var embed = new Discord.RichEmbed()
  .setAuthor(`MC-EŞŞEK`,`${msg.author.avatarURL || msg.author.displayAvatarURL}`)
  .setDescription(`${client.emojis.get("650068016012328961")} Hizzaya Geçin! Burada Bir Gold Üye Belirdi! <@${msg.author.id}>`)
  .setColor("BLUE")
  msg.channel.send(embed).then(message => {
    message.delete(4000)
  })

  }
};
          }
   else if (i == undefined) {           
          }
          if (!i) return;
        
});

client.on('ready', ()=>{
client.channels.get('671643268144168960')
})
//yönetici rol engel sistemi
client.on("roleUpdate", async(oldRole, newRole) => {

  let codeming = await db.fetch(`ceyöneticiengel_${oldRole.guild.id}`)
  if(!codeming) return
  if (oldRole.hasPermission("ADMINISTRATOR"))  return
   if (!oldRole.hasPermission("ADMINISTRATOR")) 
    if (newRole.hasPermission("ADMINISTRATOR")) {
      
      
   newRole.setPermissions(oldRole.permissions)   
      
      
    } else {
      return
    }  
    
  
  
});
//yönetici rol engel sistemi

client.login(ayarlar.token);
