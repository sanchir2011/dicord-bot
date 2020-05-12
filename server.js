const { Client, Attachment, RichEmbed } = require('discord.js');
const request = require('request');
const ytdl = require('ytdl-core-discord');
const search = require('youtube-search');
const jsonUpdate = require('json-update');
const fs = require('fs');
const queue = new Map();
const mainColor = 0xFF0000;

const botName = "Saturn BOT";
const version = "BETA";
const website = "bot.saturn.mn";
const botFounder = "by Sanchir";
const botFounderFullName = "Sanchir Enkhbold";
const discordUsername = "Insomnia SN#3757";

const footer = botName + " " + version + " " + botFounder + " '" + discordUsername + "' " + " - " + "http://" + website;

const client = new Client();

client.on('ready', () => {
  console.log(`Bot belen bollo!`);
});

client.on("guildMemberAdd", (member) => {
  const guild = member.guild;
  const user = member.user;

  var month = user.createdAt.getMonth() + 1;
  const date = user.createdAt.getFullYear() + " оны " + month + "-р сарын " + user.createdAt.getDate();

  const kicked = new RichEmbed()
    .setTitle("Тавтай морил, " + member.displayName + " ! 👋")
    .setColor(mainColor)
    .setThumbnail(user.defaultAvatarURL)
    .addField('Нэр', member.displayName, true)
    .addField('ID', member.id, true)
    .addField('Бүртгэл нээсэн огноо', date)
    .setFooter(footer);

  guild.channels.find(channel => channel.type === "text").send(kicked);
});

client.on("guildMemberRemove", (member) => {
  const guild = member.guild;
  const user = member.user;

  var month = member.joinedAt.getMonth() + 1;
  const date = member.joinedAt.getFullYear() + " оны " + month + "-р сарын " + member.joinedAt.getDate();

  const kicked = new RichEmbed()
    .setTitle("Aмжилттай серверээс гарлаа! 😐")
    .setColor(mainColor)
    .setAuthor(user.username, user.avatarURL)
    .addField('Нэр', member.displayName, true)
    .addField('ID', member.id, true)
    .addField('Бүлгэм', member.roles.map(function(role) {
      if(role.name != "@everyone"){
        return `${role.name}`;
      }
      else {
        return 'Энгийн хэрэглэгч';
      }
    }).join(' , '))
    .addField('Серверт нэгдсэн огноо', date)
    .setFooter(footer);

  guild.channels.find(channel => channel.type === "text").send(kicked);
});

client.on("emojiCreate", (emoji) => {
  const guild = emoji.guild;
  const name = emoji.name;
  const thisEmoji = client.emojis.find(e => e.name === name);

  const newEmoji = new RichEmbed()
    .setTitle(`Шинэ эможи нэмэгдлээ!`)
    .setColor(mainColor)
    .setDescription("Хэрэв та ашиглахыг хүсвэл `:" + name + ":` гэж бичнэ үү!")
    .setImage(emoji.url)
    .setFooter(footer);

  guild.channels.find(channel => channel.type === "text").send(newEmoji);
});

client.on("emojiDelete", (emoji) => {
  const guild = emoji.guild;
  const name = emoji.name;
  const thisEmoji = client.emojis.find(e => e.name === name);

  const newEmoji = new RichEmbed()
    .setTitle(`Эможи амжилттай устгагдлаа!`)
    .setColor(mainColor)
    .setImage(emoji.url)
    .setFooter(footer);

  guild.channels.find(channel => channel.type === "text").send(newEmoji);
});

client.on("guildCreate", guild => {
  const embed = new RichEmbed()
    .setTitle(botName + 'амжилттай серверт нэгдлээ! 👋')
    .setAuthor(discordUsername + ' "' + botFounderFullName + '" - Founder', 'https://cdn.discordapp.com/avatars/566944366732640276/23d8de6ec4ee4ac9608e953c2522035a.png', 'http://'+website+'/')
    .setDescription(botName + '-ыг ашиглаж байгаа танд маш их баярлалаа! Та манай BOT-ыг ашиглан серверээ удирдаж, дуу сонсож, цаг агаар болон бусад маш олон зүйлийг хийх боломжтой.')
    .setColor(0xFF0000)
    .addField('Ашиглах заавар', 'Та тусламж авахыг хүсвэл `!help` эсвэл `!tuslamj` гэж бичээрэй!')
    .addField('Хэл', 'Бид ашиглахад хялбар болгох үүднээс бүх коммандуудыг `Англи` болон `Монгол` хэл дээр ашиглах боломжтой болгосон байгаа.')
    .addField('Дэлгэрэнгүй', 'Бусад манай BOT-ын тухай дэлгэрэнгүй мэдээллийг http://'+website+' -ээс авна уу')
    .addField('Saturn Bot Team', 'Founder: Insomnia_NN#3757')
    .setFooter(footer);

    guild.channels.find(channel => channel.name === "general").send(embed);
})

client.on("guildDelete", guild => {
  const embed = new RichEmbed()
    .setTitle(botName + ' амжилттай серверээс гарлаа! 👋')
    .setAuthor('Insomnia_NN#3757 - Founder', 'https://cdn.discordapp.com/avatars/566944366732640276/23d8de6ec4ee4ac9608e953c2522035a.png', 'http://'+website+'/')
    .setDescription(botName + '-ыг ашигласан танд баярлалаа!')
    .setColor(0xFF0000)
    .setFooter(footer);

    guild.channels.find(channel => channel.name === "general").send(embed);
})

// Ehlel

client.on('message', msg => {
  if(msg.author.bot === false){

    const serverQueue = queue.get(msg.guild.id);

    if(msg.content.startsWith("saturn") || msg.content.startsWith("Saturn")){

      let content = msg.content.substring(6);
      let arr = [];


      let eng = ['hi', 'Hi', 'hey', 'Hey'];
      let mgl = ['snu', 'Snu', 'snuu', 'Snuu', 'sainuu', 'Sainuu', 'sain uu', 'Sain uu'];
      arr = mgl.concat(eng);
      if(arr.some(word => word == content)){
        msg.channel.send("Сайн. Сайн уу? \:poop:");
      }


      eng = ['whats up', 'Whats up', 'what\'s up', 'What\'s up', 'whats up?', 'Whats up?', 'what\'s up?', 'What\'s up?'];
      mgl = ['yu bn', 'yu bndaa', 'yubn', 'yu bna', 'yu bnaa', 'yu bnda', 'yu baina', 'yu bain', 'Yu bn', 'Yubn', 'Yu baina', 'Yu bain', 'Yu bna', 'Yu bnaa', 'Yu bnda', 'Yu bndaa'];
      arr = mgl.concat(eng);
      if(arr.some(word => word == content)){
        msg.channel.send("Тайван даа. Чамаар юу байна даа?");
      }


      eng = ['time', 'Time'];
      mgl = ['tsag', 'Tsag'];
      arr = mgl.concat(eng);
      if(arr.some(word => word == content)){
        let now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        msg.channel.send("Цаг: " + hours + ":" + minutes);
      }


    } 
    else if(msg.content === "!help" || msg.content === "!tuslamj"  || msg.content === "!тусламж"){

      const embed = new RichEmbed()
        .setTitle(botName + ' ашиглах заавар! 😇')
        .setAuthor(discordUsername + ' "' + botFounderFullName + '" - Founder', 'https://cdn.discordapp.com/avatars/566944366732640276/23d8de6ec4ee4ac9608e953c2522035a.png', 'http://' + website + '/')
        .setDescription(botName + '-ыг ашиглаж байгаа танд маш их баярлалаа! Та манай BOT-ыг ашиглан серверээ удирдаж, дуу сонсож, цаг агаар болон бусад маш олон зүйлийг хийх боломжтой.')
        .setColor(0xFF0000)
        .addField('Хэрэглэгч гаргах ❌', 'Хэрэв та хэрэглэгч серверээс гаргахыг хүсвэл `!kick [Хэрэглэгчийн нэр]` эсвэл `!гаргах [Хэрэглэгчийн нэр]` гэж бичнэ үү.')
        .addField('Хэрэглэгч бандах ❌', 'Хэрэв та хэрэглэгч серверээс бандахыг хүсвэл `!ban [Хэрэглэгчийн нэр] [Шалтгаан]` эсвэл `!бан [Хэрэглэгчийн нэр] [Шалтгаан]` гэж бичнэ үү.')
        .addField('Role өгөх 🧑', 'Хэрэглэгчид role өгөхийг хүсвэл `!giveRole [Хэрэглэгчийн нэр] [Role нэр]` гэж бичнэ үү. Жич: Заавал хэрэглэгч болон role нэрийн MENTION хийнэ үү.')
        .addField('Дэлгэрэнгүй', 'Та дэлгэрэнгүй коммандуудыг http://'+website+'/commands хаягаар харах боломжтой.')
        .setFooter(footer);

      msg.channel.send(embed);


    } else if(msg.content.startsWith("!kick") || msg.content.startsWith("!gargah") || msg.content.startsWith("!гаргах") || msg.content.startsWith("!кик")){

      const user = msg.mentions.users.first();
      if (user) {
        const member = msg.guild.member(user);
        const guild = msg.guild;
        if (member) {
          const author = msg.author;
          const authorMember = msg.guild.member(author);
          if(authorMember.hasPermission('KICK_MEMBERS', false, false)){
            member.kick().then(() => {
              guild.channels.find(channel => channel.type === "text").send("Гаргасан админ: " + author.username);
            }).catch(err => {
              msg.reply('Уучлаарай, одоогоор гаргах боломжгүй байна');
              console.error(err);
            });
          } else {
            const notif = new RichEmbed()
              .setTitle('Танд энэ хэрэглэгчийг гаргах эрх байхгүй байна! 🛑')
              .setColor(mainColor)
              .setDescription("Зөвхөн энэ сервер дээрх `kick` эрхтэй хүмүүс л энэ үйлдлийг хийх боломжтой.")
              .setFooter(footer);

            msg.channel.send(notif);
          }
        } else {
          const notif = new RichEmbed()
            .setTitle('Энэ хэрэглэгч серверт байхгүй байна! 🛑')
            .setColor(mainColor)
            .setFooter(footer);

          msg.channel.send(notif);
        }
      } else {
        const notif = new RichEmbed()
          .setTitle('Гаргах хүнээ mention хийнэ үү! 🛑')
          .setColor(mainColor)
          .setDescription("Хэрэглэгч серверээс гаргахын тулд `!kick [Хэрэглэгч нэр]` эсвэл `!гаргах [Хэрэглэгч нэр]` гэж бичнэ үү. Хэрэглэгчийн нэрээ бичихдээ MENTION хийнэ үү.")
          .setFooter(footer);

        msg.channel.send(notif);
      }

    } else if(msg.content.startsWith("!ban") || msg.content.startsWith("!бан")){

      const content = msg.content;
      const words = content.split(' ');
      words.shift();
      words.shift();

      let reasonMain = words.map(function(word) {
        return `${word}`;
      }).join(' ');

      const user = msg.mentions.users.first();
      if (user) {
        const member = msg.guild.member(user);
        const guild = msg.guild;
        if (member) {
          const author = msg.author;
          const authorMember = msg.guild.member(author);
          if(authorMember.hasPermission('BAN_MEMBERS', false, false)){
            member.ban({
              reason: reasonMain
            }).then(() => {
              const banned = new RichEmbed()
                .setTitle(member.displayName + " бан авлаа! 🛑")
                .setColor(mainColor)
                .setThumbnail(user.defaultAvatarURL)
                .addField('Бан авсан', member.displayName, true)
                .addField('Бан хийсэн админ', authorMember.displayName, true)
                .addField('Шалтгаан', reasonMain)
                .setFooter(footer);

              guild.channels.find(channel => channel.type === "text").send(banned);
            }).catch(err => {
              msg.reply('Уучлаарай, одоогоор гаргах боломжгүй байна 🛑');
              console.error(err);
            });
          } else {
            const notif = new RichEmbed()
              .setTitle('Танд энэ хэрэглэгчийг гаргах эрх байхгүй байна! 🛑')
              .setColor(mainColor)
              .setDescription("Зөвхөн энэ сервер дээрх `ban` эрхтэй хүмүүс л энэ үйлдлийг хийх боломжтой.")
              .setFooter(footer);

            msg.channel.send(notif);
          }
        } else {
          const notif = new RichEmbed()
            .setTitle('Энэ хэрэглэгч серверт байхгүй байна! 🛑')
            .setColor(mainColor)
            .setFooter(footer);

          msg.channel.send(notif);
        }
      } else {
        const notif = new RichEmbed()
          .setTitle('Гаргах хүнээ mention хийнэ үү! 🛑')
          .setColor(mainColor)
          .setDescription("Хэрэглэгч серверээс гаргахын тулд `!ban [Хэрэглэгч нэр] [Шалтгаан]` эсвэл `!бан [Хэрэглэгч нэр] [Шалтгаан]` гэж бичнэ үү. Хэрэглэгчийн нэрээ бичихдээ MENTION хийнэ үү.")
          .setFooter(footer);

        msg.channel.send(notif);
      }

    } else if(msg.content.startsWith("!giveRole")){

      var member = msg.mentions.members.first();
      var role = msg.mentions.roles.first();

      if(member){
        if(role){
          if(msg.guild.roles.find(thisRole => thisRole.name === role.name)){
            var selectedRole = msg.guild.roles.find(thisRole => thisRole.name === role.name);
            member.addRole(selectedRole);

            const newRole = new RichEmbed()
              .setTitle(member.displayName + ' амжилттай ' + selectedRole.name + ' role-той боллоо. 😊')
              .setColor(mainColor)
              .setFooter(footer);

            msg.channel.send(newRole);
          }
        } else {
          const newRole = new RichEmbed()
            .setTitle(member.displayName + ' хэрэглэгчид өгөх role-оо оруулна уу! 🛑')
            .setColor(mainColor)
            .setDescription('Та энэ үйлдлийг зөв ашиглахын тулд `!addRole [Хэрэглэгчийн нэр] [Role нэр]` гэж оруулна уу. Хэрэглэгч болон Role нэрийн заавал MENTION хийнэ үү!')
            .setFooter(footer);

          msg.channel.send(newRole);
        }
      } else {
        const newRole = new RichEmbed()
          .setTitle('Та role өгөх хэрэглэгчийн нэрийн mention хийж оруулна уу! 🛑')
          .setColor(mainColor)
          .setDescription('Та энэ үйлдлийг зөв ашиглахын тулд `!addRole [Хэрэглэгчийн нэр] [Role нэр]` гэж оруулна уу. Хэрэглэгч болон Role нэрийн заавал MENTION хийнэ үү!')
          .setFooter(footer);

        msg.channel.send(newRole);
      }

    }
  }
});

client.login(<KEY_TOOKEN>);
