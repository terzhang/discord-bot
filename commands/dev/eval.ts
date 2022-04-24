// const Discord = require('discord.js');
import { Bot, Command } from '../../types';
import util from 'util';

const run = async (bot: Bot) => {
  let { message, /* args, client, config, */ prefix } = bot;

  if (!message) {
    console.log('cannot run message is undefined');
  }

  let code = message.content.replace(`${prefix}eval`, '').trim();
  // check if it's in the right format
  if (/(^\`{3}js(\n|\s)*).+((\n|\s)*\`{3}$)/g.test(code)) {
    code = code.replace(/(^\`{3}js(\n|\s)*)|((\n|\s)*\`{3}$)/g, ''); //allows the usage of the js code block in discord (```js...```)
  } else {
    await message.channel.send('Invalid code block.');
    return;
  }

  // TODO: using eval is dangerous, make it safe
  const result = new Promise((resolve, _reject) => resolve(eval(code)));

  return result
    .then((output: any) => {
      // let original = output;
      if (typeof output !== 'string') {
        output = util.inspect(output, { depth: 1 });
      }
      if (output.includes(message.client.token)) {
        output = output.replace(message.client.token, 'TOK3N'); //replaces the token
      }
      message.channel.send(output.substring(0, 1900)
        //cuts response message short of discord message limit of 2000 chars
      );
    })
    .catch((err: Error) => {
      let outputError = err.toString();

      if (message.client.token && outputError.includes(message.client.token)) {
        outputError = outputError.replace(message.client.token, 'T0K3N'); //replaces the token
      }

      message.channel.send(outputError);
    });
};

const evaluate: Command = {
  name: 'eval',
  aliases: ['ev'],
  category: 'dev',
  adminOnly: true,
  description: 'evaluates javascript code',
  run,
};

export default evaluate;
