import discord from 'discord.js';
import config from './config';
import fs from 'fs';
import { Bot, Client } from './types';
const { intents, prefix, token } = config;

const client = new discord.Client({
  intents,
  allowedMentions: { 
    parse: ['users', 'roles'], 
    repliedUser: true 
  },
  presence: {
    status: 'online',
    activities: [{
      name: `${prefix}help`,
      type: 'LISTENING'
    }]
  }
}) as Client;

/**
 * If you need to use other databases or apis that require credentials,
 * you should place them here and add them as a property in the bot object
 */

/**
 * Tips for database/storage
 * If you want a local SQL database, I highly recommend sqlite3
 *      https://www.sqlite.org/index.html https://www.npmjs.com/package/better-sqlite3
 *      npm i sqlite3 && better-sqlite3
 *
 * If you want to use a cloud no-sql database (syncable across multiple instances/bots), I recommend google firestore or mongoDB
 *      https://firebase.google.com/docs/firestore https://www.mongodb.com/
 */

const bot = { client, config, prefix } as unknown as Bot;
/**
 * These add commands, aliases, events, and functions to the client object
 * Discord Collections work like a Map/Dictionary Object
 * To get a specific function from the collection, use
 * client.xxxxxxx.get("name");
 */
client.commands = new discord.Collection();
client.aliases = new discord.Collection();
client.events = new discord.Collection();
client.functions = new discord.Collection();
client.categories = fs.readdirSync('./commands/');

/**
 * These functions are used to grab the handler modules in each corresponding folder
 * whenever the loadxxx() functions are called, the cache will be cleared of the previous data
 * and the new data will be loaded into the collections so you can update code without restarting the
 * entire bot
 */
client.loadCmds = async (client, reload) =>
  (await import(`./handlers/command`)).default(client, reload);
client.loadFunctions = async (client, reload) =>
  (await import(`./handlers/function`)).default(client, reload);
client.loadEvents = async (client, reload) =>
  (await import('./handlers/event')).default(client, reload, bot);
client.loadCmds(client, false);
client.loadFunctions(client, false);
client.loadEvents(client, false);

client.login(token);
export default bot;
