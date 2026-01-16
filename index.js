const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
  ActivityType
} = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.TOKEN;

client.once(Events.ClientReady, (client) => {
  console.log(`✅ Bot is online als ${client.user.tag}`);

  client.user.setActivity("Murat's Shop", {
    type: ActivityType.Watching,
  });
});

client.on(Events.GuildMemberAdd, async (member) => {
  const channelId = '1434578266672468124';

  let channel;
  try {
    channel = await member.guild.channels.fetch(channelId);
  } catch (error) {
    console.error(`Welcomer: Channel ${channelId} kon niet worden opgehaald`, error);
    return;
  }

  if (!channel) return;

  const embed = new EmbedBuilder()
    .setTitle('Welkom! 🎉')
    .setDescription(`
Welkom **${member.user.username}** in **${member.guild.name}**! 🎉

We zijn blij dat je er bent!

📌 **Lees even de regels door:** <#1434578266672468128>
👀 **Neem een kijkje bij mededelingen:** <#1434578266672468131>
💬 **Zeg hallo tegen de mensen in:** <#1434578267561656469>
`)
    .setColor(0xFF0000)
    .setThumbnail(member.user.displayAvatarURL())
    .setTimestamp();

  try {
    const sentMessage = await channel.send({ embeds: [embed] });
    await sentMessage.react('👋');
    await sentMessage.react('🔥');
  } catch (error) {
    console.error('Welcomer: Kon embed of reacties niet verzenden', error);
  }
});


client.login(TOKEN);

