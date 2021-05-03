// Discord bot implements
const discord = require("discord.js");
const client = new discord.Client(); // Response for Uptime Robot

const ytdl = require("ytdl-core");
const fs = require("fs");

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
  client.user.setActivity("Server:"+client.guilds.cache.size+"", { type: 'LISTENING' })
console.log("Bot Starting Now");
  console.log('Logined ' + client.user.tag + '(' + client.user.id + ')')
})

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
      if (message.content === "h!github") {
    const embed = new discord.MessageEmbed()
        .setTitle("お、おう...")
        .addField("こ、ここから行けるで...", "https://github.com/Hayashi1209/Hayashi-Bot-Sourse-Code")
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
        if (message.content === "h!about") {
    const embed = new discord.MessageEmbed()
        .setTitle("Hayashi_Bot Admin_team 2021")
        .addField("Hayashi's Twitter", "https://twitter.com/106996")
            .addField("Hayashi's YouTube", "https://www.youtube.com/c/Hayashi1209")
        .addField("Hayashi's Discord", "Hayashi#4183")
        .addField("Hayashi Bot Official Server", "https://discord.gg/xUarYBWeZS")
            .addField("Next↓", "h!about2")
              .setColor("RANDOM")
    .setTimestamp();
      message.channel.send(embed);
  }
          if (message.content === "h!about2") {
    const embed = new discord.MessageEmbed()
        .setTitle("Hayashi_Bot Admin_team 2021")
        .addField("Onichan's Twitter", "https://twitter.com/onichan_devlop")
            .addField("Onichan's YouTube", "https://www.youtube.com/channel/UCPzucWHbjElatx0KOOoOsdA")
        .addField("Onichan's Twitch", "https://www.twitch.tv/onichan_jp")
        .addField("Onichan's Spotify", "https://open.spotify.com/user/ivuve0hjb8d1k8oli7ybv0opp")
            .addField("Onichan's GitHub", "https://github.com/onichanet")
            .addField("Onichan's Discord", "Onichan XD#7947")
           .addField("Hayashi Bot Official Server", "https://discord.gg/xUarYBWeZS")
            .addField("Next↓", "h!about3")
              .setColor("RANDOM")
    .setTimestamp();
      message.channel.send(embed);
  }
  if (message.content == "h!about3") {
        const embed = new discord.MessageEmbed()
        .setTitle("Hayashi_Bot Admin_team 2021")
            .addField("Ayu's Twitter", "https://bit.ly/ayu_twitter")
        .addField("Ayu's YouTube", "https://bit.ly/ayu_youtube")
                .addField("Ayu's GitHub", "https://bit.ly/ayu-github")
                        .addField("Ayu's Fantia", "https://bit.ly/ayu_fantia")
        .addField("Ayu's Discord", "ayu0907#5208")
                .addField("Ayu's Discord Server", "https://bit.ly/ayu_discordserver")
           .addField("Hayashi Bot Official Server", "https://discord.gg/xUarYBWeZS")
              .setColor("RANDOM")
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
      if (message.content === "ねる") {
    const embed = new discord.MessageEmbed()
        .setTitle("おやすみー！")
        .addField("今日も元気で過ごせましたか？", "明日も1日元気に過ごしましょう！")
              .setColor("GREEN")
                    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp();
      message.channel.send(embed);
  }
      if (message.content === "ねるー") {
    const embed = new discord.MessageEmbed()
        .setTitle("おやすみー！")
        .addField("今日も元気で過ごせましたか？", "明日も1日元気に過ごしましょう！")
              .setColor("GREEN")
                    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp();
      message.channel.send(embed);
  }
      if (message.content === "寝るわ") {
    const embed = new discord.MessageEmbed()
        .setTitle("おやすみー！")
        .addField("今日も元気で過ごせましたか？", "明日も1日元気に過ごしましょう！")
              .setColor("GREEN")
                    .setAuthor(message.author.tag, message.author.avatarURL())
    .setTimestamp();
      message.channel.send(embed);
  }
      if (message.content === "ねるわ") {
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
        .addField("下ネタを言ったり、喧嘩したりしない", "他の人もみることができるチャットでだからです。")
        .addField("SELF BOTを使用しない", "セルフボットとは荒らしなどのために使用される悪質なBOTです。")
        .addField("荒らし目的のサーバーの宣伝は禁止です", "あかんで")
        .addField("このルールを守って使用をお願いします", "ﾌﾞｩｧｧｧｧｧｧｧｧｧﾝ")
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
          .addField("h!invite", "導入リンクを表示します")
            .addField("h!poll", "投票をします")
              .addField("h!github", "た、ためにならんで...??")
                  .addField("h!about", "開発者の情報表示する...よ...??")
        .addField("h!guilds", "Hayashi Botが導入されているサーバーをDMへ送信します")
      .addField("導入リンク","https://discord.com/api/oauth2/authorize?client_id=789094587632189462&permissions=8&scope=bot")
    .addField("ぜひ導入お願いします🤭", "Have a fun life with Hayashi Bot!")
                .setAuthor(message.author.tag, message.author.avatarURL())
    .setColor("RANDOM")
      .setTimestamp();
    message.channel.send(embed);
  }
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
                .addField("h!play", "YouTubeの動画を再生します(不安定)")
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
        msg.channel.send(client.users.get(gbana[0]).tag +"(" +client.users.get(gbana[0]) +")をGbanしました。")
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
  msg.channel.send(client.users.get(gbana[0]).tag +"(" +client.users.get(gbana[0]) +")をGbanしました。")
  }
})


client.on('message', async message => {
    if (!message.content.startsWith(prefix)) return
    const [command, ...args] = message.content.slice(prefix.length).split(' ')
    if (command === 'poll') {
      const [title, ...choices] = args
      if (!title) return message.channel.send('エラー : タイトルを指定してください')
      const emojis = ['🇦', '🇧', '🇨', '🇩']
      if (choices.length < 2 || choices.length > emojis.length)
        return message.channel.send(`エラー : 選択肢は2から${emojis.length}つを指定してください`)
      const poll = await message.channel.send({
        embed: {
          title: title,
          color: 'RANDOM',
          description: choices.map((c, i) => `${emojis[i]} ${c}`).join('\n')
        }
      });
      emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji))
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

client.on('message', async message => {
  if (message.content === 'h!clean') {
	if (!message.member.hasPermission('MESSAGE_MANAGE')) return message.channel.send('エラー : メッセージを管理する権限を持っていません。')
    // コマンドが送信されたチャンネルから直近100件(上限)メッセージを取得する
     const messages = await message.channel.messages.fetch({ limit: 100 })
     // ボット以外が送信したメッセージを抽出
        const filtered = messages.filter(message => !message.author.bot) //AHAHAHAHAHAHAHAHAHA
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

client.login('Nzg5MDk0NTg3NjMyMTg5NDYy.X9tDmg.vT2Yoz3hsqhxnKRufBvBXe0WnEg');
