import { readdirSync } from 'fs'; //declare FileStream
import path from 'path';
import { fileHandler } from '../utils';
import { Client, fileType } from '../types';
let errors = '';

const cmd = (client: Client, reload: boolean) => {
  errors = '';
  readdirSync('./commands/').forEach(async (dir) => {
    errors = await fileHandler(
      fileType.commands,
      path.resolve(`./commands/${dir}`),
      client,
      reload
    );
  });
  if (!errors) {
    console.log('Commands built successfully');
  } else console.log('Command error:\n' + errors);
};

export default cmd;
