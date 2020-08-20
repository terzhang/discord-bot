import { Client as client, Collection, Message } from 'discord.js';

export interface Command {
  name: string;
  aliases?: string[];
  category: 'dev' | 'prod' | string;
  adminOnly: false | boolean;
  description: string;
  usage?: string;
  run: (bot: Bot) => Promise<any>;
}

export interface Function {
  name: string;
  response: (
    message: Message,
    desc: string,
    ok: boolean,
    noDelete: boolean
  ) => Promise<void>;
  formatTime: (time: number) => string;
  autoAlign: (align: any[], char?: string, lock?: number) => string;
}

export type ReadyEvent = (bot: Bot) => void;
export type MessageEvent = (bot: Bot, message: Message) => void;
export type Event = {
  name: string;
  func: ReadyEvent | MessageEvent;
};

/** a collection of key-value with key is a string,
 * and value is a NodeRequire (i.e. ts or js file) */
type Commands = Collection<string, Command>;
type Aliases = Collection<string, string>;
type Events = Collection<string, Event>;
type Functions = Collection<string, Function>;

type Loaders = (client: Client, reload: boolean) => void;

export interface Client extends client {
  loadCmds: Loaders;
  loadFunctions: Loaders;
  loadEvents: Loaders;
  commands: Commands;
  aliases: Aliases;
  events: Events;
  functions: Functions;
  categories: string[];
}

export interface Bot {
  client: Client;
  config: {
    admins: string[];
    token: string;
    prefix: string;
  };
  prefix: string;
  message: Message;
  args: string[];
}

export const enum fileType {
  functions = 'functions',
  commands = 'commands',
  events = 'events',
}
