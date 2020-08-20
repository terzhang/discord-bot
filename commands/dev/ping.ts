import { Bot, Command } from '../../types';

/** ping the bot and return its latency */
const ping: Omit<Command, 'aliases'> = {
  name: 'ping',
  category: 'dev',
  adminOnly: true,
  description: "Returns bot's latency",
  run: async (bot: Bot) => {
    var { client, message /*, f */ } = bot;
    const msg = await message.channel.send(`Main bot Pinging...`);

    const timeDiff = msg.createdAt.getTime() - message.createdAt.getTime();
    const upTime = client.uptime
      ? client.functions.get('functions')!.formatTime(client.uptime)
      : 'uptime not avaiable.';

    await msg.edit(
      `Pong! \nAPI: \`${Math.round(
        client.ws.ping
      )}\`ms\nBot: \`${timeDiff}\`ms.\nUptime: ${upTime}`
    );
  },
};
export default ping;
