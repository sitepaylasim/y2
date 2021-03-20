const { MessageEmbed } = require('discord.js')
const datab = require('quick.db')
const ms = require('ms')
const moment = require("moment");
const { parseZone } = require("moment");

exports.run =  async (client, message, args) => {
  
if(!['721359314731663401'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) 
return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} bu komutu kullanmak için yetkin bulunmamakta. <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));
  
const tag = ''   
const erkekrol = message.guild.roles.cache.find(r => r.id === '709154288378839150') 
const erkekrol2 = message.guild.roles.cache.find(r => r.id === '800209817129582692')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '716722516701478923')
const genelchat = message.guild.channels.cache.find(c => c.id === '709143949226410005')
const savelog = message.guild.channels.cache.find(c => c.id === '800209495744970822')


if(!erkekrol) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`1. Erkek rolü ayarlanmamış / Yanlış id girilmiş kayıt işlemine devam edilemiyor. <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));
if(!erkekrol2) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`2. Erkek rolü ayarlanmamış / Yanlış id girilmiş kayıt işlemine devam edilemiyor. <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));
if(!kayıtsız) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kayıtsız rolü ayarlanmamış / Yanlış id girilmiş kayıt işlemine devam edilemiyor. <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));

const member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]));
if(!member) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${message.author} Bir kullanıcı belirtir misin ? <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));
let name = args[1]
let age = Number(args[2])
if(!name) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir isim belirtmelisin. <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));
if(!age) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bir yaş belirtmelisin. <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));
if(member.id === message.author.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Kendini kayıt edemezsin. <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));
if(member.id === client.user.id) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Bot kayıt edemezsin. <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));
if(member.id === message.guild.OwnerID) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Sunucu sahibini kayıt edemezsin. <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));
if(member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`Belirtilen kullanıcı sizden üst/aynı pozisyonda işleme devam edilemiyor. <a:cute13:796060385198866472>`)
.setColor('#ff0000')).then(x => x.delete({timeout: 5000}));
  
  
datab.add(`yetkili.${message.author.id}.kadin`, 1)
datab.add(`yetkili.${message.author.id}.toplam`, 1)
let alldata = datab.fetch(`yetkili.${message.author.id}.toplam`)

member.setNickname(`${tag} ${name} • ${age}`)
member.roles.add(erkekrol)
member.roles.add(erkekrol2)
member.roles.remove(kayıtsız)


message.channel.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic:true}))
.setDescription(`${member} ** üyesini ${message.author} kayıt etti. \n\n ${erkekrol}, ${erkekrol2} Rolleri Verildi. \n\n \`${tag} ${name} ${age}\` Olarak ismi güncellendi. **`)
.setFooter(`Toplam kayıtların : ${alldata}`)    
.setImage(`https://media.giphy.com/media/dri7YeaR8iWlBtGDjn/giphy.gif`)                     
.setColor('#ff0000'))

genelchat.send(`${member} Aramıza katıldı, hoş geldin umarım keyifli vakit geçirirsin. <a:kalpem:800219823735832586>`) 


savelog.send(new MessageEmbed()
.setAuthor(message.author.tag, message.author.avatarURL({dynamic: true}))
.setDescription(`• Yetkili: ${message.author} • \`${message.author.id}\`\n• Kullanıcı: ${member} \`${member.id}\`\n Güncel İsim: \`${tag} ${name} • ${age}\`\n• Roller: ${erkekrol}, ${erkekrol2} \n• Kanal: <#${message.channel.id}> • \`${message.channel.id}\`\n• Kayıtlar: \`${alldata}\` `)
.setColor('#ff0000'))


datab.push(`isim.${message.guild.id}`, {userID: member.id, isim: name, yas: age, role: erkekrol.id})}
exports.conf = {enabled: true, guildOnly: true, aliases: ['erkek', 'e', 'boy', 'man', 'adam'], permLevel: 0}
exports.help = {name: 'erkek', description: "Etiketlenen kişiyi erkek rolleriyle kayıt eder.", usage: '.erkek @etiket/id İsim Yaş'}