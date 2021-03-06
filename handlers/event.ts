import { Message } from 'discord.js';
import fs from 'fs';
import { Bot, Client } from '../types';

//IF YOU WISH TO HANDLE MORE EVENTS, BE SURE TO ADD THEM IN initEvents(client, bot)
//adding anything here would require a full bot restart!!
//examples for channelCreate/Delete, GuildCreate/Delete are shown
//if you need to add other events, copy the formatting and use this cheatsheet for reference
// https://gist.github.com/koad/316b265a91d933fd1b62dddfcc3ff584

function initEvents(client: Client, bot: Bot) {
  client.on('message', (message: Message) => {
    if (!message.guild) return;
    try {
      client.events.get('message')?.func(bot, message);
    } catch (err) {
      console.error(err);
    }
  });

  client.on('ready', () => {
    try {
      client.events.get('ready')?.func(bot);
    } catch (err) {
      console.error(err);
    }
  });
}

const event = (client: Client, reload: boolean, bot: Bot) => {
  // read event directory
  fs.readdir('./events/', (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter((f) => /\.(js|ts)$/i.test(f));

    if (jsfiles.length <= 0) {
      console.log('There are no events to load');
      return;
    }

    if (!reload) console.log(`Loading ${jsfiles.length} events...`);

    jsfiles.forEach(async (files, index) => {
      // if ((f == "logs.js" || f == "smartwarnings.js") && reload) return; //never reloads logs events
      if (reload) delete require.cache[require.resolve(`../events/${files}`)];
      let pull = (await import(`../events/${files}`)).default;
      client.events.set(pull.name, pull);
      if (!reload) console.log(`${index + 1}: ${files} loaded!`);
    });
  });

  if (!reload) initEvents(client, bot);
};

export default event;
