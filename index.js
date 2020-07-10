// Discord bot implements
const discord = require("discord.js");
const client = new discord.Client();// Response for Uptime Robot

 const ytdl = require('ytdl-core')

const http = require("http");
http
  .createServer(function(request, response) {
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Bot is active now!! \n");
  })
  .listen(3000);

client.on("ready", message => {
  client.user.setPresence({game: {name:"h!help | Status | 導入Server : 35　　　導入鯖30超えました！40鯖目標です。"}
  }); console.log("bot is ready!");
});

if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}

client.login(process.env.DISCORD_BOT_TOKEN);

client.on("message", message => {
  if (message.content === "h!test") {
    const replyText = "正常に稼働しています。";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "h!hello") {
    const replyText = "こんにちは！今日も一日頑張ろう！";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "h!invite") {
    const replyText ="```BOT招待↓``` https://discord.com/oauth2/authorize?client_id=680640361957425169&permissions=2082471159&scope=bot ```このURL行ってね``` ";
    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "おはよう") {
    const replyText = "おはようございます！今日も頑張りましょう！";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "おやすみ") {
    const replyText = "今日も頑張りましたね！おやすみなさい...";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "林を起こす") {
    const replyText = "さっさと起きろよこの野郎";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "ちょっとなにいってるかわからない") {
    const replyText = "あなたの言動の方が訳わかりませんよ🤣🤣";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "荒らし") {
    const replyText = "あらしはいけませんよ！ちんちん🤣🤣";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "Hayashi-Twitter") {
    const replyText = "https://twitter.com/106996";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "野獣先輩") {
    const replyText ="イキスギィ！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "Hayashi-YouTube") {
    const replyText ="https://www.youtube.com/channel/UChYN8vgjseGCtOQGjTVEDzg";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", message => {
  if (message.content === "w") {
    const replyText = "その心笑ってるね";

    return message.reply(replyText).catch(console.error);
  }
});

client.on("message", async message => {
  if (message.content === "やっほー") {
    const reply = await message.channel.send("こんにちは");
    reply.react("👋");
  }
});

client.on("message", async message => {
  if (message.content === "暇") {
    const reply = await message.channel.send("私はいつも暇です");
    reply.react("☹");
  }
});

client.on("message", async message => {
  if (message.content === "h!globalkiyaku") {
    const reply = await message.channel.send("```🎊林グローバルチャット利用規約🎊``` ```その1 荒らしを行わない``` ```荒らした場合は即BANやミュートの処置をします😡``` ```(できる限り荒らし対策はしています)``` ```その2 暴言、または下ネタを言わない(例 死ねちんちん)``` ```相手を傷つける行為はまずやめよう☹``` ```その3 SELF BOT(荒らしのために使う悪質なBOT)を使わない``` ```使うこと自体がだめです😡``` ```上のルールを守って林グローバルチャットのご利用をお願いします🤭```"
    );
  }
});

client.on("message", async message => {
  if (message.content === "h!official") {
    const reply = await message.channel.send(
      "```Official Server``` https://discord.gg/TWRZx6B"
    );
  }
});

client.on("message", async message => {
  if (message.content === "h!agree") {
    const sent = await message.channel.send("```林グローバルチャットの利用規約に同意する場合は下のリアクションを押して下さい``` ```利用規約はh!globalkiyakuに書いてあります```"
    );
    // クリックするだけでリアクションできるように自身でリアクションをしておく
    const reaction = await sent.react("✅");
    // ユーザーの❌のみに反応するためのフィルターを定義しておく
    const filter = (reaction, user) =>
      reaction.emoji.name === "✅" && !user.bot;
    // リアクションを待ち受けて処理を実行する
    sent
      .awaitReactions(filter, { max: 5, time: 1, errors: ["time"] })
      .then(() => sent.channel.send("```🎊利用規約に同意されました！🎊```")) // リアクションがされたら送信したメッセージを削除する
      .catch(() => reaction.remove()); // リアクションされなかったら自身で付けたリアクションを消す
  }
});

client.on("message", async message => {
  if (message.content === "h!最近あった悲しい出来事") {
    const reply = await message.channel.send("ネタで死ねってコマンド作ったのにDMでとある人に注意されたこと...☹"
    );
  }
});

client.on("message", async message => {
  if (message.content === "h!kot") {
    const reply = await message.channel.send("神に決まってるだろ！ばかか？お前"
    );
  }
});

client.on("message", async message => {
  if (message.content === "h!hayashi") {
    const reply = await message.channel.send("このBOTの制作者です。他にもBOT作ってるので欲しいときは林のDMへ行ってくださいね。"
    );
  }
});

client.on("message", async message => {
  if (message.content === "h!ほもがきは臭いですか？") {
    const reply = await message.channel.send("臭いの前にきたない()");
  }
});

client.on("message", message => {
  if (message.channel.name === "hayashi-chat") {
    if (message.author.bot) return;
    if (message.attachments.size <= 0) {
      message.delete();
    }
    client.channels.cache.forEach(channel => {
      if (message.attachments.size <= 0) {
        const embed = new discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setDescription(message.content)
          .setColor('GREEN')
          .setFooter(message.guild.name, message.guild.iconURL())
          .setTimestamp();
        if (channel.name === "hayashi-chat") {
          channel.send(embed);
          return;
        }
        return;
      }
      if (
        !message.attachments.forEach(attachment => {
          const embed = new discord.MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setImage(attachment.url)
            .setDescription(attachment.url)
            .setColor('GREEN')
            .setFooter(message.guild.name, message.guild.iconURL())
            .setTimestamp();
          if (channel.name === "hayashi-chat") {
            channel.send(embed);
            return;
          }
          return;
        })
      );
      return;
    });
  }
});

 client.on('message', async msg => {
   // メッセージが "!yt" からはじまっていてサーバー内だったら実行する
   if (msg.content.startsWith('h!play') && msg.guild) {
     // メッセージから動画URLだけを取り出す
     const url = msg.content.split(' ')[1]
     // まず動画が見つからなければ処理を止める
     if (!ytdl.validateURL(url)) return msg.reply('動画が存在しません！')
     // コマンドを実行したメンバーのボイスチャンネル指定
     let channel = msg.member.voice.channel
     // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
     if (!channel) return msg.reply('先にボイスチャンネルに参加してください！')
     const connection = await channel.join()
     // 動画の音源を取得
     const stream = ytdl(ytdl.getURLVideoID(url), { filter: 'audioonly' })
     // 再生
     const dispatcher = connection.play(stream)
     
     // 再生が終了したら抜ける
     dispatcher.once('finish', () => {
       channel.leave()
     })
   }
 })

 client.on('message', message => {
   if (message.content === 'h!help') {
     const embed = new discord.MessageEmbed()
       .setTitle('Help一覧でやんす😎')
       .addField('h!test', '起動しているかどうか見るやつです(適当')
       .addField('h!help', 'このページです')
      .addField('h!hello', 'BOTがあいさつしてくれます！やさしいね！やったね！')
      .addField('h!ban', 'h!ban @BANしたい人をメンションでできます')
      .addField('h!kick', 'BANコマンドと同じ感じで((')
      .addField('*-------------------------------------------------------*', 'ここからはグローバルチャット関係です')
      .addField('h!globalkiyaku', 'グローバルチャットの利用規約を表示します')
      .addField('h!agree', 'グローバルチャットの利用規約に同意するコマンドです')
      .addField('林グローバルへの参加', 'hayashi-chatというチャンネルを作成すればできます！')
      .addField('グローバルを抜けたい場合', 'チャンネルを削除するか名前を変えればOKです👍')
 　　　.addField('------------------------------------', 'グローバルチャット関係終わり')
     .addField('導入リンク', 'https://discord.com/api/oauth2/authorize?client_id=680640361957425169&permissions=8&scope=bot')
      .addField('ぜひ導入お願いします🤭', 'Have a fun life with Hayashi Bot!')
       .setColor('GREEN')
       .setTimestamp()
 
     message.channel.send(embed)
   }
 })
