// import Discord from "discord.js";

import { Bot } from 'types';

/**
 * ALL EVENTS MUST BE MANUALLY ADDED TO EVENT HANDLER!!
 * You must add a handler for each event in the initEvents function
 * in handlers/event.(js|ts) !!
 */

function runStuff(_bot: Bot, _eventParameter: any) {
  //run stuff here
}

function runAll(bot: Bot, eventParameter: any) {
  runStuff(bot, eventParameter);
  //add other functions that use the event
}

const event = {
  name: '', //name of the event (MUST MATCH THE FILE NAME minus the .js or .ts)
  func: runAll,
};
export default event;
