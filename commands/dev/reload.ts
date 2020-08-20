import Discord from 'discord.js';
import { Bot } from '../../types';

/** restart the bot */
const reload = {
  name: 'reload',
  aliases: ['r'],
  category: 'dev',
  adminOnly: true,
  description: 'reloads the bot',
  run: async (bot: Bot) => {
    const { client, message /* , config */ } = bot;
    await client.loadCmds(client, true); //reload is true
    await client.loadEvents(client, true);
    await client.loadFunctions(client, true);

    const functions = client.functions.get('functions')?.autoAlign([
      [`\`${client.commands.size}\``, `Commands`],
      [`\`${client.aliases.size}\``, `Aliases`],
      [`\`${client.events.size}\``, `Events`],
      [`\`${client.functions.size}\``, `Functions`],
    ]);

    const embedded = new Discord.MessageEmbed()
      .setColor('#8DC685')
      .setTitle('Bot Reload Complete')
      .setDescription(functions);

    message.channel.send(embedded);
  },
};
export default reload;
