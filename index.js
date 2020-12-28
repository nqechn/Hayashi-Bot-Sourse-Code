// Discord bot implements
const discord = require("discord.js");
const client = new discord.Client(); // Response for Uptime Robot
const DD = new Date(
  Date.now() + (new Date().getTimezoneOffset() + 9 * 60) * 60 * 1000
);

const Year = DD.getFullYear();
const Month = DD.getMonth() + 1;
const Day = DD.getDate();
const Hours = DD.getHours();
const Minutes = DD.getMinutes();
const Seconds = DD.getSeconds();
const ytdl = require("ytdl-core");
const sgc_name = 'super-global-chat';
const gateway_id = '707158257818664991';
const fs = require("fs");

 const { ReactionController } = require('discord.js-reaction-controller')
 const prefix = 'h!'
 const pf = 'h!';
 
const http = require("http");
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(
      "Hayashi Bot Status:\n\nPing: " +
        client.ws.ping +
        "ms\n\nGuilds: " +
        client.guilds.cache.size +
        "Guilds\n\nMember: " +
        Year +
        "/" +
        Month +
        "/" +
        Day +
        " " +
        Hours +
        ":" +
        Minutes +
        ":" +
        Seconds
    );
  })
  .listen(3000); //いじるときいってくれー By おにちゃん

client.on("ready", message => {
  client.user.setPresence({
    activity: {name:" ｜ Server : "+client.guilds.cache.size+" ｜ Discord.js ｜ "
    }
  });
  console.log("bot is ready!");
});



	client.on('message', async message => {
   if (message.content.startsWith('h!ban') && message.guild) {
   	if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('エラー : BANする権限がありません')
     if (message.mentions.members.size !== 1) return message.channel.send('エラー : BANするメンバーを1人指定してください')
     const member = await message.mentions.members.first().ban()
     message.channel.send(`${member.user.tag}をBANしました`)
   }
   if (message.content.startsWith('h!kick') && message.guild) {
   	if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send('エラー : KICKする権限がありません')
     if (message.mentions.members.size !== 1) return message.channel.send('エラー : KICKするメンバーを1人指定してください')
     const member = await message.mentions.members.first().kick()
     message.channel.send(`${member.user.tag}をKICKしました`)
   }
    })
 
    client.on('message', message => {
    if (message.channel.name === '林グローバル')
    {
        if (message.author.bot) return;
        if (message.attachments.size <= 0)
        {
            message.delete()
        }
        var dic = {}
        dic["userId"] = BigInt(message.author.id);
        dic["userName"] = message.author.username;
        dic["userDiscriminator"] = message.author.discriminator;
        dic["userAvatar"] = message.author.avatar;
        dic["isBot"] = message.author.bot;
        dic["guildId"] = BigInt(message.guild.id);
        dic["guildName"] = message.guild.name;
        dic["guildIcon"] = message.guild.icon;
        dic["channelId"] = BigInt(message.channel.id);
        dic["channelName"] = message.channel.name;
        dic["messageId"] = BigInt(message.id);
        dic["content"] = message.content;
        arr = []
        if (message.attachments.size > 0) {
            message.attachments.forEach(attachment =>
            {
                arr.push(encodeURIComponent(attachment.proxyURL))
            });
            dic["attachmentsUrl"] = arr;
        }
        const JSONbig = require('json-bigint');
        var json = JSONbig.stringify(dic);
        var channel = client.channels.cache.get(gateway_id);
        channel.send(json)

        client.channels.cache.forEach(channel =>
        {
            if (message.attachments.size <= 0)
            {
                const embed = new discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setDescription(message.content)
                    .setColor('RANDOM')
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                if (channel.name === '林グローバル')
                {
                    channel.send(embed)
                    return;
                }
                return;
            }
            if (!message.attachments.forEach(attachment =>
            {
                const embed = new discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL())
                    .setImage(attachment.url)
                    .setDescription(attachment.url)
                    .setColor('RANDOM')
                    .setFooter(message.guild.name, message.guild.iconURL())
                    .setTimestamp()
                if (channel.name === '林グローバル')
                {
                    channel.send(embed)
                    return;
                }
                return;
            }));
            return;
        });
    }

    if (message.channel.id === gateway_id && message.author != client.user)
    {
        if (!message.author.bot) return;
        const JSONbig = require('json-bigint');
        var dic = JSONbig.parse(message.content);
        client.channels.cache.forEach(channel =>
        {
            if (!("attachmentsUrl" in dic))
            {
                const embed = new discord.MessageEmbed()
                    .setAuthor(dic["userName"]+dic["userDiscriminator"], `https://media.discordapp.net/avatars/${dic["userId"]}/${dic["userAvatar"]}.png?size=1024`)
                    .setDescription(dic["content"])
                    .setColor('RANDOM')
                    .setFooter(dic["guildName"], `https://media.discordapp.net/icons/${dic["guildId"]}/${dic["guildIcon"]}.png?size=1024`)
                    .setTimestamp()
                if (channel.name === '林グローバル')
                {
                    channel.send(embed)
                    return;
                }
                return;
            }
            if ("attachmentsUrl" in dic){
                dic["attachmentsUrl"].forEach(attachment => {
                    console.log(decodeURIComponent(attachment));
                    const embed = new discord.MessageEmbed()
                        .setAuthor(dic["userName"]+dic["userDiscriminator"], `https://media.discordapp.net/avatars/${dic["userId"]}/${dic["userAvatar"]}.png?size=1024`)
                        .setImage(decodeURIComponent(attachment))
                        .setDescription(dic["content"])
                        .setColor('RANDOM')
                        .setFooter(dic["guildName"], `https://media.discordapp.net/icons/${dic["guildId"]}/${dic["guildIcon"]}.png?size=1024`)
                        .setTimestamp()

                    if (channel.name === '林グローバル')
                    {
                        channel.send(embed)
                        return;
                    }
                    return;
                });
            }
            return;
        });
    }
})

client.on("message", message => {
  if (message.author.bot) {
    return;
  }
  if (message.channel.type == "dm") {
    return;
  }
  if (message.content == prefix+"globalchatjoin") {
    if (!message.channel.permissionsFor(message.guild.me).has("MANAGE_WEBHOOKS")) {
      message.channel.send("Webhookを作成する権限がありません。")
      return;
    }
    message.channel.createWebhook('林ボットグローバル').then(webhook => {
      var webhookinfo = {
        "id": webhook.id,
        "token": webhook.token,
        "channel": message.channel.id
      }
      var savedata = JSON.stringify(webhookinfo);
      try {
        fs.mkdirSync(`globalchatfiles/${message.guild.id}/`, { recursive: true });
        fs.writeFileSync(`globalchatfiles/${message.guild.id}/webhook.json`, savedata);
        //成功すれば、Webhookが保存されます。
      }
      catch (error) {
        message.channel.send("参加できませんでした。権限をもう一回確認してみてください。")
        return;
      }
      var sentchannelid = webhook.channel
      const webhooks = new discord.WebhookClient(webhook.id, webhook.token)
      webhooks.send("新林グローバルに参加しました。")
      //ほかのサーバーに参加通知を送る
      //サーバーごとにファイルを読み込んで、webhookで送信する。
      client.guilds.cache.forEach(guild => {
        try {
          var webhookjoined = JSON.parse(fs.readFileSync(`globalchatfiles/${guild.id}/webhook.json`))
        } catch (err) {
          return;
          //参加していなければ、そのサーバーはパスする。
        }
        var channelid = webhookjoined.channel
        try {
          client.channels.cache.get(channelid).id
        }
        catch (error) {
          return;
          //チャンネルが削除されていたら、動作をキャンセルするコード。
        }
        var webhookid = webhookjoined.id
        var webhooktoken = webhookjoined.token
        if (message.channel.id == sentchannelid) return;
        if (message.guild.id == guild.id) return;
        try {
          new discord.WebhookClient(webhookid, webhooktoken).send(message.guild.name + "が、グローバルチャットに参加しました。", { username: "グローバルチャットマネージャー", disableMentions: "all"})
        } catch (error) {

        }
      })
      //webhookは、チャンネルごとに10個までしか作れないので、作成できなかった場合には、参加成功メッセージが来ない仕組み。
    }).catch(console.error);
  } 
});
client.on("message", message => {
  if (message.author.bot) {
    return;
  }
  try {
    const guild_webhook = JSON.parse(fs.readFileSync(`globalchatfiles/${message.guild.id}/webhook.json`))
    var sentchannelid = guild_webhook.channel
  } catch (error) {
    return;
    //読み取れなかった場合、ほとんどの場合は参加していないのでリターンする。
  }
  if (message.channel.id == sentchannelid) {
    message.react('⌚')
     message.react('✅')
    //サーバーごとにファイルを読み込んで、webhookで送信する。
    client.guilds.cache.forEach(guild => {
      try {
        var webhook = JSON.parse(fs.readFileSync(`globalchatfiles/${guild.id}/webhook.json`))
      } catch (err) {
        return;
        //参加していなければ、そのサーバーはパスする。
      }
      var channelid = webhook.channel
      try {
        client.channels.cache.get(channelid).id
      }
      catch (error) {
        return;
        //チャンネルが削除されていたら、動作をキャンセルするコード。
      }
      var webhookid = webhook.id
      var webhooktoken = webhook.token
      const serverwebhook = new discord.WebhookClient(webhookid, webhooktoken)
      if (message.channel.id == channelid) return;
      if (message.guild.id == guild.id) return;
      try {
        serverwebhook.send(message.content, { username: message.author.tag, avatarURL: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.png`, disableMentions: "all"})
      } catch (error) {
      }
    })
  }
});

client.on('message', async message => {
  if (message.content === "h!invite") {
    const embed = new discord.MessageEmbed()
        .setTitle("導入につきまして")
        .addField("導入サーバーが減ってしまったため導入をお願いします", "導入リンクは下から！")
        .addField("導入リンク", "https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot") 
                    .setAuthor(message.author.tag, message.author.avatarURL())
        .setTimestamp();
      message.channel.send(embed);
  }
  if (message.content === "おはよう") {
    const embed = new discord.MessageEmbed()
        .setTitle("おはよー！")
        .addField("今日も元気でいいですね", "1日元気に過ごしましょう！")
              .setColor("GREEN")
                    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp();
      message.channel.send(embed);
  }
    if (message.content === "おは") {
    const embed = new discord.MessageEmbed()
        .setTitle("おはよー！")
        .addField("今日も元気でいいですね", "1日元気に過ごしましょう！")
              .setColor("GREEN")
                    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp();
      message.channel.send(embed);
  }
      if (message.content === "おはよー") {
    const embed = new discord.MessageEmbed()
        .setTitle("おはよー！")
        .addField("今日も元気でいいですね", "1日元気に過ごしましょう！")
              .setColor("GREEN")
                    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp();
      message.channel.send(embed);
  }
      if (message.content === "おはー！") {
    const embed = new discord.MessageEmbed()
        .setTitle("おはよー！")
        .addField("今日も元気でいいですね", "1日元気に過ごしましょう！")
              .setColor("GREEN")
                    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp();
      message.channel.send(embed);
  }
      if (message.content === "おはよー！") {
    const embed = new discord.MessageEmbed()
        .setTitle("おはよー！")
        .addField("今日も元気でいいですね", "1日元気に過ごしましょう！")
              .setColor("GREEN")
                    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp();
      message.channel.send(embed);
  }
  if (message.content === "おやすみ") {
   const embed = new discord.MessageEmbed()
        .setTitle("おやすみー！")
        .addField("今日も元気で過ごせましたか？", "明日も1日元気に過ごしましょう！")
              .setColor("GREEN")
                   .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp();
      message.channel.send(embed);
  }
    if (message.content === "寝る") {
    const embed = new discord.MessageEmbed()
        .setTitle("おやすみー！")
        .addField("今日も元気で過ごせましたか？", "明日も1日元気に過ごしましょう！")
              .setColor("GREEN")
                    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp();
      message.channel.send(embed);
  }
    if (message.content == 'h!reload') {
      	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('エラー : あなたはBAN権限を持ってないため実行できません')
      const ban_setup = await client.guilds.cache.get('789088752915054592').fetchBans()
    await Promise.all(ban_setup.map(baninfo => message.guild.members.ban(baninfo.user,{reason:baninfo.reason})))
    message.channel.send("BAN情報を同期しました。")
  }
  if (message.content === "h!gc_r") {
          const embed = new discord.MessageEmbed()
        .setTitle("Hayashi Global Chat利用規約")
        .addField("荒らし行為は絶対禁止です", "した場合は即GBANです")
        .addField("下ネタを言ったり、喧嘩したりしない", "他の人もみることができますので迷惑行為ですのでやめましょう！")
        .addField("SELF BOTを使用しない", "セルフボットとは荒らしなどのために使用される悪質なBOTです")
        .addField("YouTubeとBit.lyの宣伝は禁止です", "会話をしよう！")
        .addField("このルールを守って使用をお願いします", "導入リンクは下から！")
        .addField("導入リンク", "https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")
                          .setAuthor(message.author.tag, message.author.avatarURL())
              .setColor("GREEN")  
        .setTimestamp();
      message.channel.send(embed);
  }
  if (message.content === "h!of_s") {
    const embed = new discord.MessageEmbed()
        .setTitle("Q.林ボットに不具合があったら？")
        .addField("それなら公式サーバーへ行こう！", "https://discord.gg/TWRZx6B")
        .addField("導入リンク", "https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")          
    .setColer('GREEN')    
    .setTimestamp();
      message.channel.send(embed);
  }
  if (message.content === "h!help") {
    const embed = new discord.MessageEmbed()
      .setTitle("困った時はこれ一つ！ヘルプ一覧！")
    .addField("h!help", "このページです")
        .addField("h!gc_help", "グローバルチャットの時使えるコマンドなどを表示します")
        .addField("h!ad_help", "管理人が使えるコマンド一覧を表示します")
    .addField("h!of_s", "公式サーバーを表示します")
          .addField("h!play", "h!play その動画のURL を貼るだけでできます！")
          .addField("h!invite", "導入リンクを表示します")
    .addField("h!poll", "投票したいときに使ってください！")
    .addField("h!timer", "秒数をいうだけでタイマーをかけてくれます")
        .addField("h!guilds", "Hayashi Botが導入されているサーバーをDMへ送信します")
      .addField("導入リンク","https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")
    .addField("ぜひ導入お願いします🤭", "Have a fun life with Hayashi Bot!")
                .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor("GREEN")
      .setTimestamp();
    message.channel.send(embed);
  }
          if (message.content === "h!guilds") {
    message.channel.send(
      "Hayashi Botが導入されているサーバー一覧をDMへ送信しました",
      {
        split: true
      }
    )
    message.author.send(client.guilds.cache.map(a => a.name));
  }
})

var adamin = "788734535562297365"; //adaminw
client.on("message", async msg => {
  if (msg.content.startsWith("h!gban")) {
    if (msg.author.bot) return;
    if (msg.author.id !== adamin) return msg.channel.send("エラー : あなたは林ボットの管理者ではありません。");
    var gbana = msg.content.split(" ");
    gbana.shift();
    if (gbana[0] == undefined)
      return msg.channel.send("エラー : IDを入力してください。");
    if (gbana[1] == undefined)
      return msg.channel.send("エラー : GBANの理由を入力してください。");
    client.guilds.cache.forEach(guild =>
      guild.members.ban(gbana[0], { reason: gbana[1] })
    );
    msg.channel.send(client.users.get(gbana[0]).tag +"(" +client.users.get(gbana[0]) +")をGbanしました");
  }
})

  client.on('message', message => {    
   if (!message.content.startsWith(prefix)) return
   const [command, ...args] = message.content.slice(prefix.length).split(' ')
   if (command === 'poll') {
     const [title, ...choices] = args
     if (!title) return message.channel.send('タイトルを指定してください')
     const emojis = ['🇦', '🇧', '🇨', '🇩']
     if (choices.length < 2 || choices.length > emojis.length)
       return message.channel.send(`選択肢は2から${emojis.length}つを指定してください`)
     const poll = message.channel.send({
       embed: {
         title: title,
         description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n')
       }
     });
     emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
   }
 })

 client.on('message', message => {
   if (!message.content.startsWith(prefix)) return
   const [command, ...args] = message.content.slice(prefix.length).split(' ')
 
   if (command === 'timer') {
     // 引数から待ち時間を取り出す
     const seconds = Number(args[0])
     message.channel.send(`タイマーを${seconds}秒に設定しました。`)
     setTimeout(() => {
       message.reply(`${seconds}秒経ちました`)
     }, seconds * 1000) // setTimeoutに指定するのはミリ秒なので秒数に1000を掛ける
   }
 })

client.on('message', async message => {
   if (message.mentions.users.has(client.user.id)) {
     message.channel.send('```Hayashi Botのプレフィックスはh!です```')
   }
  if (message.content === 'h!clean') {
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('管理人権限持ってないやん！！！恥ずかしくないの？(煽り')
    // コマンドが送信されたチャンネルから直近100件(上限)メッセージを取得する
     const messages = await message.channel.messages.fetch({ limit: 100 })
     // ボット以外が送信したメッセージを抽出
        const filtered = messages.filter(message => !message.author.bot) 
     // それらのメッセージを一括削除
     message.channel.bulkDelete(filtered)
   }
 });

 const channelId2Dispatcher=new Map();
 client.on('message', async msg => {
   // メッセージが "!yt" からはじまっていてサーバー内だったら実行する
   if (msg.content.startsWith('h!play') && msg.guild) {
     // メッセージから動画URLだけを取り出す
     const url = msg.content.split(' ')[1];
     // まず動画が見つからなければ処理を止める
     if (!ytdl.validateURL(url)) return msg.channel.send('Not Found :(');
     // コマンドを実行したメンバーのボイスチャンネル指定
     let channel = msg.member.voice.channel;
     // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
     if (!channel) return msg.channel.send('Join the voice channel first :(');
     // チャンネルに参加
     const connection = await channel.join();
     // 動画の音源を取得
     const stream = ytdl(ytdl.getURLVideoID(url), { filter: 'audioonly' });
  // 再生
     const dispatcher = connection.play(stream)
     channelId2Dispatcher.set(channel.id,dispatcher);
     // 再生が終了したら抜ける
     dispatcher.once('finish', () => {
       channelId2Dispatcher.delete(channel.id);
       channel.leave()
     });
   }else if(msg.content.startsWith('h!pause')){
     const dispatcher = channelId2Dispatcher.get(msg.member.voice.channel.id);
     if(!dispatcher){
      return;
     }
     dispatcher.pause();
   }else if(msg.content.startsWith('h!resume')){
     const dispatcher = channelId2Dispatcher.get(msg.member.voice.channel.id);
     if(!dispatcher){
      return;
     }
     dispatcher.resume();
   }
 })

client.on('message', async message => {
if (message.content.startsWith("h!dm")){
const [unko, ...args] = message.content.slice(3).split(' ')
const arg = message.content.split(" ")[1];
const user = client.users.cache.get(arg);
if (!arg) return message.channel.send("エラー : IDが入力されていません");
if (!user) return message.channel.send("エラー : 指定されたIDの人物が見つかりません");
message.author.id !== args[0]
{client.users.cache
.get(args[0]).send({embed: {
color:"RANDOM",description: `${message.member}からのメッセージ\n${message.content.split(' ').slice(2).join(' ')}` }})}
    message.channel.send(`${user.tag}にメッセージを送信しました`);
}})


    client.on('message', message => {
   if (message.content === 'h!ad_help') {
     const embed = new discord.MessageEmbed()
       .setTitle('管理人が使える！コマンド一覧だよ！')
    .addField("h!ban", "h!ban @BANしたい人をメンションでできます")
      .addField("h!kick", "h!kick @KICKしたい人をメンションでできます")
          .addField("h!clean", "メッセージを一括で削除できます")
              .addField("h!reload", "林ボット公式サーバーでBANしてる人たちをあなたのサーバーでもBANします")
           .addField("導入リンク","https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")
    .addField("ぜひ導入お願いします🤭", "Have a fun life with Hayashi Bot!")
       .setColor('GREEN')
                     .setAuthor(message.author.tag, message.author.avatarURL())
       .setTimestamp()
     message.channel.send(embed)
   }
   if (message.content === 'h!gc_help') {
     const embed = new discord.MessageEmbed()
       .setTitle('グローバルチャットのための！コマンド一覧だよ！')
    .addField("h!gc_r", "グローバルチャットの利用規約を表示します")
.addField("スーパーグローバルチャットへの参加", "林グローバルというチャンネル作成すればできます。")
     .addField("い   つ   も   の", "参加したいチャンネルでh!globalchatjoinを実行すればできます。")
           .addField("導入リンク","https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")
    .addField("ぜひ導入お願いします🤭", "Have a fun life with Hayashi Bot!")
       .setColor('GREEN')
                     .setAuthor(message.author.tag, message.author.avatarURL())
       .setTimestamp()
     message.channel.send(embed)
   }
 })

module.exports = function(message, client, args, sb, sd, ud, gud, setBot, serverData, userData, guildUserData, ErrorMsg, SystemMsg, Discord){
  if (gud.authority > 7) {
    const fetch = require('node-fetch');
    const fs = require("fs");
    const file = message.attachments.first()
    const fName = file.name
    fetch(file.url, {method: 'GET'}) 
     .then((res) => res.buffer())
     .then((buffer) => {
       function write(filePath, buffer) {
        var result = false;
        try {
          fs.writeFileSync(filePath, buffer);
          message.channel.send('やりますねえ');
          return true;
        } catch(err) {
          console.log(err)
          return false;
        } 
       }
       write("./commands/" + fName, buffer)
     }) 
    console.log(file)
  }
}

client.login( process.env.DISCORD_BOT_TOKEN );
