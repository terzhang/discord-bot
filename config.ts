import { OWNER_ID } from './env/admin.secret';
import { BOT_TOKEN } from './env/bot.secret';

import { Intents } from 'discord.js';

export default {
  admins: [OWNER_ID], //put the "admins" of the bot here, this will give them access to commands marked with `adminOnly: true`
  token: BOT_TOKEN, //bot's login token from the discord developer page
  prefix: '$', //prefix that the command calls should start with
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
  ],
}
//any changes to this file will require a full bot restart to update
