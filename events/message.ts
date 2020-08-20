// const Discord = require("discord.js");
import { Message } from 'discord.js';
import { Bot, Event } from '../types';

function runAll(bot: Bot, message: Message): void {
  runCommands(bot, message);
}

// Message typing: https://github.com/discordjs/discord.js/blob/master/typings/index.d.ts#L944
async function runCommands(bot: Bot, message: Message) {
  if (!message.guild || message.author.bot) return;

  const { client, config, prefix } = bot;

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);

  const cmd = args.shift()?.toLowerCase();

  const command =
    client.commands!.get(cmd!) ||
    client.commands!.get(client.aliases.get(cmd!)!);

  if (!command) {
    console.log('invalid command');
    return;
  }

  if (command.adminOnly && !config.admins.includes(message.author.id)) {
    return client!.functions
      .get('functions')
      ?.response(
        message,
        'This command requires bot owner permissions',
        false,
        false
      );
  }

  bot.message = message;
  bot.args = args;

  //add additional things you would like to pass to the command runners here
  try {
    await command.run(bot);
  } catch (err) {
    //accepts any error messages and returns to the user a custom message
    let errMsg: string = err.toString(); //just add `throw "?error message text"` anywhere in your code
    if (errMsg.startsWith('?')) {
      //prefix any thrown errors with a "?" to distinguish it from other errors
      client.functions
        .get('functions')
        ?.response(message, errMsg.replace(/\?/, ''), false, false);
    } else console.log(err); //should log to console any errors that are not purposely thrown
  }
}

const message: Event = {
  name: 'message',
  /* @ts-ignore */
  func: runAll,
};
export default message;
