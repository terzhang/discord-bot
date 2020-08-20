import { OWNER_ID } from './env/admin.secret';
import { BOT_TOKEN } from './env/bot.secret';

const config = {
  admins: [OWNER_ID], //put the "admins" of the bot here, this will give them access to commands marked with `adminOnly: true`
  token: BOT_TOKEN, //bot's login token from the discord developer page
  prefix: '.', //prefix that the command calls should start with
};
export default config;
//any changes to this file will require a full bot restart to update
