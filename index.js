  // Response for Uptime Robot
const http = require('http');
http.createServer(function(request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Discord bot is active now \n');
}).listen(3000);

// Discord bot implements
const discord = require('discord.js');
const client = new discord.Client();

client.on('ready', message =>
{
    client.user.setPresence({ game: { name: 'h!help | Status | 導入Server : 7　グロチャ完成まじ嬉しい' } });  
  console.log('bot is ready!');
});

client.on('message', message =>
{
	if(message.isMemberMentioned(client.user))
	{
		message.reply( '呼んだ?' );
		return;
	}
});

if(process.env.DISCORD_BOT_TOKEN == undefined)
{
	console.log('please set ENV: DISCORD_BOT_TOKEN');
	process.exit(0);
}

client.login( process.env.DISCORD_BOT_TOKEN );

client.on('message', message =>
{
    if (message.channel.name === 'hayashi-chat')
    {
        if (message.author.bot) return;
        if (message.attachments.size <= 0)
        {
            message.delete()
        }
        client.channels.forEach(channel =>
        {
            if (message.attachments.size <= 0)
            {
                const embed = new discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setDescription(message.content)
                    .setColor(0x2C2F33)
                    .setFooter(message.guild.name, message.guild.iconURL)
                    .setTimestamp()
                if (channel.name === 'hayashi-chat')
                {
                    channel.send(embed)
                    return;
                }
                return;
            }
            if (!message.attachments.forEach(attachment =>
            {
                const embed = new discord.RichEmbed()
                    .setAuthor(message.author.tag, message.author.avatarURL)
                    .setImage(attachment.url)
                    .setDescription(attachment.url)
                    .setColor(0x686EDA)
                    .setFooter(message.guild.name, message.guild.iconURL)
                    .setTimestamp()
                if (channel.name === 'hayashi-chat')
                {
                   channel.send(embed)
                    return;
                }
                return;
            }));
            return;
        });
    }
});
 
client.on('message', message => {
  if (message.content === 'h!test') {
    const replyText = '正常に稼働しています。'

    return message.reply(replyText)
      .catch(console.error)
  }
})

client.on('message', message => {
  if (message.content === 'h!help') {
    const replyText = 'h!test=稼働しているかどうか調べるコマンドです。 h!helpはこれです()。【あいさつ系】h!hello=botがあいさつします。'

    return message.reply(replyText)
      .catch(console.error)
  }
})

client.on('message', message => {
  if (message.content === 'h!hello') {
    const replyText = 'こんにちは！今日も一日頑張ろう！'

    return message.reply(replyText)
      .catch(console.error)
  }
})

client.on('message', message => {
  if (message.content === 'h!導入') {
    const replyText = 'https://discordapp.com/api/oauth2/authorize?client_id=680640361957425169&permissions=2013785207&redirect_uri=https%3A%2F%2Fhayashi-homepage.theblog.me%2F&scope=bot'

    return message.reply(replyText)
      .catch(console.error)
  }
})

client.on('message', message => {
  if (message.content === 'おはよ') {
    const replyText = 'おはようございます！今日も頑張りましょう！'

    return message.reply(replyText)
      .catch(console.error)
  }
})

client.on('message', message => {
  if (message.content === 'おやすみ') {
    const replyText = '今日も頑張りましたね！おやすみなさい...'

    return message.reply(replyText)
      .catch(console.error)
  }
})

          
