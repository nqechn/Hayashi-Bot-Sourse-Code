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
        client.users.cache.size +
        " Members\n\nTime: " +
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
    activity: {
      name:
        "h!help | Status | Server : " +
        client.guilds.cache.size +
        " | User : " +
        client.users.cache.size +
        " | discord.js"
    }
  });
  console.log("bot is ready!");
});

/*if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("please set ENV: DISCORD_BOT_TOKEN");
  process.exit(0);
}
*/

client.on("message", async message => {
  if (message.content === "h!invite") {
    const replyText =
      "```BOT招待↓``` https://discord.com/api/oauth2/authorize?client_id=680640361957425169&permissions=8&scope=bot ```このURL行ってね``` ";
    return message.reply(replyText).catch(console.error);
  }
  if (message.content === "おはよう") {
    const replyText = "おはようございます！今日も頑張りましょう！";

    return message.reply(replyText).catch(console.error);
  }
  if (message.content === "おやすみ") {
    const replyText = "今日も頑張りましたね！おやすみなさい...";

    return message.reply(replyText).catch(console.error);
  }
  if (message.content === "荒らし") {
    const replyText = "あらしはいけませんよ！ちんちん🤣🤣";

    return message.reply(replyText).catch(console.error);
  }
  if (message.content === "Hayashi-Twitter") {
    const replyText = "https://twitter.com/106996";

    return message.reply(replyText).catch(console.error);
  }
  if (message.content === "Hayashi-YouTube") {
    const replyText =
      "https://www.youtube.com/channel/UChYN8vgjseGCtOQGjTVEDzg";

    return message.reply(replyText).catch(console.error);
  }
  if (message.content === "w") {
    const replyText = "その心笑ってるね";

    return message.reply(replyText).catch(console.error);
  }
  if (message.content === "やっほー") {
    const reply = await message.channel.send("こんにちは");
    reply.react("👋");
  }
  if (message.content === "暇") {
    const reply = await message.channel.send("私はいつも暇です");
    reply.react("☹");
  }
  if (message.content === "h!gc_r") {
    const reply = await message.channel.send(
      "```🎊林グローバルチャット利用規約🎊``` ```その1 荒らしを行わない``` ```荒らした場合は即BANやミュートの処置をします😡``` ```(できる限り荒らし対策はしています)``` ```その2 暴言、または下ネタを言わない(例 死ねちんちん)``` ```相手を傷つける行為はまずやめよう☹``` ```その3 SELF BOT(荒らしのために使う悪質なBOT)を使わない``` ```使うこと自体がだめです😡``` ```上のルールを守って林グローバルチャットのご利用をお願いします🤭```"
    );
  }
  if (message.content === "h!official") {
    const reply = await message.channel.send(
      "```Official Server``` https://discord.gg/TWRZx6B"
    );
  }
  if (message.content.startsWith("h!play") && message.guild) {
    // メッセージから動画URLだけを取り出す
    const url = message.content.split(" ")[1];
    // まず動画が見つからなければ処理を止める
    if (!ytdl.validateURL(url)) return message.reply("動画が存在しません！");
    // コマンドを実行したメンバーのボイスチャンネル指定
    let channel = message.member.voice.channel;
    // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
    if (!channel)
      return message.reply("先にボイスチャンネルに参加してください！");
    const connection = await channel.join();
    // 動画の音源を取得
    const stream = ytdl(ytdl.getURLVideoID(url), { filter: "audioonly" });
    // 再生
    const dispatcher = connection.play(stream);

    // 再生が終了したら抜ける
    dispatcher.once("finish", () => {
      channel.leave();
    });
  }
  if (message.content === "h!help") {
    const embed = new discord.MessageEmbed()
      .setTitle("Help一覧でやんす😎")
      .addField("h!help", "このページです")
      .addField("h!ban", "h!ban @BANしたい人をメンションでできます")
      .addField("h!kick", "BANコマンドと同じ感じで((")
      .addField(
        "*-------------------------------------------------------*",
        "ここからはグローバルチャット関係です"
      )
      .addField("h!gc_r", "グローバルチャットの利用規約を表示します")
      .addField(
        "h!gc_agree",
        "グローバルチャットの利用規約に同意するコマンドです"
      )
      .addField(
        "林グローバルへの参加",
        "hayashi-chatというチャンネルを作成すればできます！"
      )
      .addField(
        "グローバルを抜けたい場合",
        "チャンネルを削除するか名前を変えればOKです👍"
      )
      .addField(
        "------------------------------------",
        "グローバルチャット関係終わり"
      )
      .addField(
        "導入リンク",
        "https://discord.com/api/oauth2/authorize?client_id=680640361957425169&permissions=8&scope=bot"
      )
      .addField("ぜひ導入お願いします🤭", "Have a fun life with Hayashi Bot!")
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
    );
    message.author.send(client.guilds.cache.map(a => a.name));
  }
  if (message.content === "h!ping") {
    let pi = client.ws.ping;
    message.channel.send(pi + "ms" + "です('ω')ノ");
    console.log(pi + "ms");
  }
});

client.on("message", message => {
  if (message.channel.name === "hayashi-chat") {
    if (message.author.bot) return;
    if (message.content.match(/bit.ly/)) {
      const embed = new discord.MessageEmbed()
        .setTitle("通知")
        .addField("🚫bit.lyのURLは送信禁止です", "会話をしようね")
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
    if (message.content.match(/youtu.be/)) {

      const embed = new discord.MessageEmbed()
        .setTitle("通知")
        .addField("🚫YouTubeのURLは送信禁止ですのでご注意を", "会話をしようね")
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
    if (message.content.match(/youtube.com/)) {

      const embed = new discord.MessageEmbed()
        .setTitle("通知")
        .addField("🚫YouTubeのURLは送信禁止ですのでご注意を", "会話をしようね")
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
        if (message.content.match(/Bit.ly/)) {
      const embed = new discord.MessageEmbed()
        .setTitle("通知")
        .addField("🚫bit.lyのURLは送信禁止です", "会話をしようね")
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
        if (message.content.match(/YOUTUBE.COM/)) {
      const embed = new discord.MessageEmbed()
        .setTitle("通知")
        .addField("🚫bit.lyのURLは送信禁止です", "会話をしようね")
        .setTimestamp();
      message.channel.send(embed);
      return;
    }
    if (message.attachments.size <= 0) {
      message.delete();
    }
    client.channels.cache.forEach(channel => {
      if (message.attachments.size <= 0) {
        const embed = new discord.MessageEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL())
          .setDescription(message.content)
          .setColor("RANDOM")
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
            .setColor("RANDOM")
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

const admin = "638217647380758538";
client.on("message", async msg => {
  if (msg.content.startsWith("h!gban")) {
    if (msg.author.bot) return;
    if (msg.author.id !== admin) return msg.channel.send("権限がありません。");
    var gbana = msg.content.split(" ");
    gbana.shift();
    if (gbana[0] == undefined)
      return msg.channel.send("IDを入力してください。");
    if (gbana[1] == undefined)
      return msg.channel.send("GBANの理由を入力してください。");
    client.guilds.cache.forEach(guild =>
      guild.members.ban(gbana[0], { reason: gbana[1] })
    );
    msg.channel.send(
      client.users.get(gbana[0]).tag +
        "(" +
        client.users.get(gbana[0]) +
        ")をGbanしました"
    );
  }
});

client.on("message", async message => {
  if (message.content.startsWith("h!gc_agree") && message.guild) {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send("権限がありません");

    message.guild.channels.create("hayashi-chat", {
      parent: message.channel.parent
    });

    // Create the attachment using MessageAttachfrment
    message.channel.send(
      "グローバルチャットの利用規約に同意されましたので使用許可します！"
    );
  }
});

client.on("guildDelete", async guild => {
  client.channels.cache
    .get("734339097103040533")
    .send("ボットが、**" + guild.name + "**から退出しました。");
});

client.login(process.env.DISCORO_BOT_TOKEN); //Token盗むなよー //Tokenここにかくｱﾎｶﾞいるんだよ

