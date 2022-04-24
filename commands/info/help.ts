import { Bot, Client, Command } from '../../types';

import Discord, { Message } from 'discord.js';

type EmbedFields = any[];

function getAll(client: Client, message: Message, prefix: string) {
  let reacts = [':tools:', ':information_source:'];
  let embedfields = [] as EmbedFields;

  client.categories.forEach((category: string) => {
    if (category === 'hidden') return;
    embedfields.push([
      category,
      client.commands
        .filter((cmd) => cmd.category === category)
        .map((cmd) => `\`${cmd.name}\``)
        .join(', '),
    ]);
  });

  for (var i = 0; i < embedfields.length; i++) {
    embedfields[i][0] = `${reacts[i]} ${
      embedfields[i][0][0].toUpperCase() + embedfields[i][0].substring(1)
    }`;
  }
  //FIX change image to bot pfp auto link
  var embedded = new Discord.MessageEmbed().setColor('RANDOM');

  if (message.guild)
    embedded.setAuthor(
      `Bot Commands`,
      message.guild.iconURL({ dynamic: true })!,
      ''
    );

  embedfields.forEach((b) => {
    embedded.addField(b[0], b[1], true);
  });
  message.channel.send(
    {
      embeds: [
        embedded.setFooter(
          `Use ${prefix}help <command> for more info on a specific command\n[Command count: ` +
          client.commands.size +
        ']'
        )
      ]
    }
  );
}
function getCMD(client: Client, message: Message, input: string) {
  const embed = new Discord.MessageEmbed();
  let cmd = client.commands.get(input.toLowerCase());

  let info = `No information found for command **${input.toLowerCase()}**`;
  // no command found -> check if an alias is given instead
  if (!cmd) {
    const alias = client.aliases.get(input.toLowerCase());
    // found alias -> attempt to get command from alias
    if (alias) {
      cmd = client.commands.get(alias);
    }
    // still no command found
    if (!cmd) {
      return message.channel.send({embeds: [ embed.setColor('RED').setDescription(info)]});
    }
  }

  info = `
  ${cmd.name ? '**Command name**: ' + cmd.name : ''}
  ${
    cmd.aliases
      ? '**Aliases**: ' + cmd.aliases.map((a: string) => `\`${a}\``).join(', ')
      : ''
  }
  ${cmd.description ? `**Description**: ${cmd.description}` : ''}
  `;

  if (cmd.usage) {
    info += `\n**Usage**: ${cmd.usage}`;
    embed.setFooter(`Syntax: <> = required, [] = optional`);
  }

  return message.channel.send({embeds: [ embed.setColor('GREEN').setDescription(info) ]});
}

const help: Command & { usage: string } = {
  name: 'help',
  aliases: ['h'],
  category: 'info',
  adminOnly: false,
  description: "Returns all commands, or one specific command's info",
  usage: '[command | alias]',
  run: async (bot: Bot) => {
    let { client, message, args, prefix } = bot;
    if (args[0]) return getCMD(client, message, args[0]);
    else return getAll(client, message, prefix);
  },
};
export default help;
