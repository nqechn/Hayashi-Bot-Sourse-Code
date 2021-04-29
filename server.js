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
const fs = require("fs");
const fetch = require("node-fetch");

 const prefix = 'h!'
 const pf = 'h!';
 
const http = require("http");
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end(
      "Hayashi Bot Status\n\nPing: " +
        client.ws.ping +
        "ms\n\nGuilds: " +
        client.guilds.cache.size +
        "Guilds\n\nNow: " +
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
    activity: {name:"｜ Server : "+client.guilds.cache.size+" ｜ Discord.js ｜ "
    }
  });
  console.log("Bot Starting Now");
  console.log('Logined ' + client.user.tag + '(' + client.user.id + ')' );
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

 const handleReaction = async (channelID, messageID, callback) => {
    const channel = await client.channels.fetch(channelID)
    const message = await channel.messages.fetch(messageID)
    const collector = message.createReactionCollector(() => true)
    collector.on('collect', (reaction, user) => callback(reaction, user))
 }

client.on('message', async message => {
    const re = new RegExp('https://discordapp.com/channels/([0-9]{18})/([0-9]{18})/([0-9]{18})')
    const results = message.content.match(re)
    if (!results) {
        return
    }
    const guild_id = results[1]
    const channel_id = results[2]
    const message_id = results[3]
  
    const channel = client.channels.cache.get(channel_id);
    if (!channel){
      return;
    }
    channel.messages.fetch(message_id)
.then( msg => message.channel.send(msg.content) )
    .catch(console.error);
});

client.on("message", message => {
  if (message.author.bot)
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
      webhooks.send("新林グローバルに参加しました。過疎化しないようにご協力をお願いします。")
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
          new discord.WebhookClient(webhookid, webhooktoken).send(message.guild.name + "が、グローバルチャットに参加しました。", { username: "HqYAsHI Global Manager", disableMentions: "all"})
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

 const GUILD = '789088752915054592' // 動作させるサーバーのID
 const CHANNEL = '835755140950654986' // 名前を変更するチャンネルのID
 
 // ボットがオフラインのときの変更は出来ないから、起動時に辻褄を合わせる
 client.on('ready', () => {
   const guild = client.guilds.cache.get(GUILD)
   const channel = guild.channels.cache.get(CHANNEL)
   channel.setName('メンバー数：'+ guild.memberCount)
 })
 
 // メンバーが参加したらチャンネル名を更新する
 client.on('guildMemberAdd', member => {
   // 指定したサーバーでのみ実行する
   if (member.guild.id === GUILD) {
     // チャンネルを取得して、名前を更新する
     const channel = member.guild.channels.cache.get(CHANNEL)
   channel.setName('メンバー数：'+ member.guild.memberCount)
   }
 })
 
 // メンバーが退出したらチャンネル名を更新する（処理は上と同じ）
 client.on('guildMemberRemove', member => {
   if (member.guild.id === GUILD) {
     const channel = member.guild.channels.cache.get(CHANNEL)
   channel.setName('メンバー数：'+ member.guild.memberCount)
   }
 })

client.on('message', async message => {
  if (message.content === "h!invite") {
    const embed = new discord.MessageEmbed()
        .setTitle("導入につきまして")
        .addField("導入サーバーが減ってしまったため導入をお願いします", "導入リンクは下から！")
        .addField("導入リンク", "https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot") 
           .addField("公式サーバーはこちら！", "https://discord.gg/N2Dux9BmjH")
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
  if (message.content === "h!gc_r") {
          const embed = new discord.MessageEmbed()
        .setTitle("Hayashi Global Chat利用規約")
        .addField("荒らし行為は絶対禁止です", "した場合は即GBANです")
        .addField("下ネタを言ったり、喧嘩したりしない", "他の人もみることができるチャットです。迷惑行為ですのでやめましょう！")
        .addField("SELF BOTを使用しない", "セルフボットとは荒らしなどのために使用される悪質なBOTです")
        .addField("SNSや動画配信サイトなどの宣伝は禁止です", "会話をしよう！")
        .addField("このルールを守って使用をお願いします", "またこのルールは新林グローバルでは有効になりません")
        .addField("導入リンク", "https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")
                          .setAuthor(message.author.tag, message.author.avatarURL())
              .setColor("GREEN")  
        .setTimestamp();
      message.channel.send(embed);
  }
  if (message.content === "h!help") {
    const embed = new discord.MessageEmbed() 
      .setTitle("困った時はこれ一つ！ヘルプ一覧！")
        .addField("h!gc_help", "グローバルチャットの時使えるコマンド一覧を表示します")
        .addField("h!ad_help", "管理人が使えるコマンド一覧を表示します")
    .addField("h!music_h", "ボイスチャンネルで使えるコマンド一覧を表示します")
       .addField("h!file", "テキストファイルの中身を取り出します")
          .addField("h!invite", "導入リンクを表示します")
    .addField("h!timer", "タイマーをかけてくれます")
        .addField("h!guilds", "Hayashi Botが導入されているサーバーをDMへ送信します")
      .addField("導入リンク","https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")
    .addField("ぜひ導入お願いします🤭", "Have a fun life with Hayashi Bot!")
                .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor("RANDOM")
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
        msg.channel.send(client.users.get(gbana[0]).tag +"(" +client.users.get(gbana[0]) +")をGbanしました")
  }
})

var adamin = "788734535562297365"; //adaminw
client.on("message", async msg => {
  if (msg.content.startsWith("h!ungban")) {
    if (msg.author.bot) return;
    if (msg.author.id !== adamin) return msg.channel.send("エラー : あなたは林ボットの管理者ではありません。");
        var gbana = msg.content.split(" ");
    gbana.shift();
    if (gbana[0] == undefined)
      return msg.channel.send("エラー : IDを入力してください。");
    client.guilds.cache.forEach(guild =>
      guild.members.unban(gbana[0] )
                               );
  msg.channel.send(client.users.get(gbana[0]).tag +"(" +client.users.get(gbana[0]) +")をGbanしました")
  }
})

var connections = {};
var speak_chs = {};
client.on('message', async message => {
    if (!message.guild) return;

    if (message.content === 'h!join') {
        if (message.member.voice.channel) {
            connections[message.author.id] = await message.member.voice.channel.join();
            message.channel.send("参加しました。");
        } else {
            message.channel.send('まずはじめにボイスチャンネルに入ってください。');
        }
    }
      if (message.content === 'h!JOIN') {
        if (message.member.voice.channel) {
            connections[message.author.id] = await message.member.voice.channel.join();
            message.channel.send("参加しました。");
        } else {
            message.channel.send('まずはじめにボイスチャンネルに入ってください。');
        }
    }
    if (message.content === "h!disconnect") {
        if (connections.hasOwnProperty(message.author.id)) {
            connections[message.author.id].channel.leave();
                      message.channel.send("退出しました。");
        }
    }
     if (message.content === "h!dc") {
        if (connections.hasOwnProperty(message.author.id)) {
            connections[message.author.id].channel.leave();
                      message.channel.send("退出しました。");
        }
    }
    if (message.content == "h!speak") {
        if (connections.hasOwnProperty(message.author.id)) {
            message.channel.send("このチャンネルを読み上げます。");
            speak_chs[message.channel.id] = {
                "author": message.author.id
            };
        } else {
            message.channel.send("ボイスチャンネルに入って、その後に`h!join`と入力してください。");
        }
    }
    if (message.content == "h!end") {
        if (speak_chs.hasOwnProperty(message.author.id)) {
            delete speak_chs[message.channel.id];
            message.channel.send("読み上げを終了します。");
        }
    }
    if (speak_chs.hasOwnProperty(message.channel.id)) {
        connections[speak_chs[message.channel.id].author].play("https://api.lainan.one/voice.wav?text="+message.content,{volume:2});
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
  if (message.content === 'h!clean') {
	if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('エラー : 管理人権限を持っていません')
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
     });
   }
   else if(msg.content.startsWith('h!pause')){
     const dispatcher = channelId2Dispatcher.get(msg.member.voice.channel.id);
     msg.channel.send('曲を停止しました');
     if(!dispatcher){
      return;
     }
     dispatcher.pause();
   }
   else if(msg.content.startsWith('h!resume')){
     const dispatcher = channelId2Dispatcher.get(msg.member.voice.channel.id);
     msg.channel.send('再生しました');
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
       .setTitle('管理人が使えるコマンド一覧だよ！')
    .addField("h!ban", "メンバーをBANします")
      .addField("h!kick", "メンバーをキックします")
          .addField("h!clean", "メッセージを一括で削除できます")
           .addField("導入リンク","https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")
    .addField("ぜひ導入お願いします🤭", "Have a fun life with Hayashi Bot!")
       .setColor('GREEN')
                     .setAuthor(message.author.tag, message.author.avatarURL())
       .setTimestamp()
     message.channel.send(embed)
   }
   if (message.content === 'h!gc_help') {
     const embed = new discord.MessageEmbed()
       .setTitle('グローバルチャットのためのコマンド一覧だよ！')
    .addField("h!gc_r", "グローバルチャットの利用規約を表示します")
     .addField("新林グローバル", "参加したいチャンネルでh!globalchatjoinを実行すればできます。")
           .addField("導入リンク","https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")
    .addField("ぜひ導入お願いします🤭", "Have a fun life with Hayashi Bot!")
       .setColor('GREEN')
                     .setAuthor(message.author.tag, message.author.avatarURL())
       .setTimestamp()
     message.channel.send(embed)
   }
       if (message.content === 'h!music_h') {
     const embed = new discord.MessageEmbed()
       .setTitle('ボイスチャンネルで使うコマンド一覧だよ！')
    .addField("h!join", "ボイスチャンネルに参加します")
               .addField("h!play", "音楽を再生します")
                    .addField("h!pause", "音楽を停止します")
                    .addField("h!resume", "停止していた音楽を再び再生します")
     .addField("h!disconnect", "ボイスチャンネルから退出します")
     .addField("h!speak", "文字を読み上げます")
           .addField("導入リンク","https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")
    .addField("ぜひ導入お願いします🤭", "Have a fun life with Hayashi Bot!")
       .setColor('GREEN')
                     .setAuthor(message.author.tag, message.author.avatarURL())
       .setTimestamp()
     message.channel.send(embed)
   }  
    })
      
      client.on("message", async message => {
   if (message.content.startsWith("h!file")) {
     if (message.attachments.size) {
       const fileURL = message.attachments.first().url;
       const responce = await fetch(fileURL);
       const body = await responce.text();
       message.channel.send(body);
     } else {
       message.channel.send("エラー : テキストファイルを選択してください");
     }
   }
 });

client.login( process.env.DISCORD_BOT_TOKEN );
