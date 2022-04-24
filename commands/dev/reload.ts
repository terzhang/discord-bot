import Discord from 'discord.js';
import { Bot } from '../../types';

/** restart the bot */
const reload = {
  name: 'reload',
  aliases: ['r'],
  category: 'dev',
  adminOnly: true,
  description: 'reloads the bot',
  run: (bot: Bot) => {
    const { client, message /* , config */ } = bot;
    client.loadCmds(client, true); //reload is true
    client.loadEvents(client, true);
    client.loadFunctions(client, true);

    const functions = client.functions.get('functions')?.autoAlign([
      [`\`${client.commands.size}\``, `Commands`],
      [`\`${client.aliases.size}\``, `Aliases`],
      [`\`${client.events.size}\``, `Events`],
      [`\`${client.functions.size}\``, `Functions`],
    ]);

    const embedded = new Discord.MessageEmbed()
      .setColor('#8DC685')
      .setTitle('Bot Reload Complete')
      .setDescription(functions || 'No functions found');

    message.channel.send({embeds : [embedded]});
  },
};
export default reload;
