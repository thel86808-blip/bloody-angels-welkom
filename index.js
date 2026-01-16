const http = require('http');
const {
  Client,
  GatewayIntentBits,
  Events,
  EmbedBuilder,
  ActivityType
} = require('discord.js');

/* ======================
   DISCORD CLIENT
====================== */
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const TOKEN = process.env.TOKEN;
const PORT = process.env.PORT || 3000;

/* ======================
   HTTP SERVER (RENDER)
====================== */
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Bot is online 🚀');
}).listen(PORT, () => {
  console.log(`🌐 HTTP server draait op poort ${PORT}`);
});

/* ======================
   READY EVENT
====================== */
client.once(Events.ClientReady, (client) => {
  console.log(`✅ Bot is online als ${client.user.tag}`);

  client.user.setActivity("Murat's Shop", {
    type: ActivityType.Watching,
  });
});

/* ======================
   WELCOME EVENT
====================== */
client.on(Events.GuildMemberAdd, async (member) => {
  const channelId = '1379163957201338468';

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

📌 **Lees even de [Regels](https://discord.com/channels/1364329816605593781/1379700039676329994)**
👀 **Neem een kijkje bij [Mededeling](https://discord.com/channels/1364329816605593781/1451610921314025697)**
💬 **Praat met mensen in [Chat](https://discord.com/channels/1364329816605593781/1367568892171522068)**
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

/* ======================
   LOGIN
====================== */
client.login(TOKEN);




