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
      path.resolve(`../commands/${dir}`),
      client,
      reload
    );
  });
  if (!errors) {
    console.log('Commands: built successfully');
  } else console.log('Errors:\n' + errors);
};

/* let buildMsg = ''
//reload true on force reload
const command = async (client: Client, reload: boolean) => {
  buildMsg = '';
  readdirSync('./commands/').forEach((dir) => {
    //Getting folder "commands" and executing script with every sub-directory as parameter.
    const commands = readdirSync(`./commands/${dir}/`).filter(
      (f) => f.endsWith('.ts') || f.endsWith('.js')
    ); // Filter files in sub-directories that only .js or .ts files would be loaded in to variable

    //For file loaded in "commands" variable, take that file.
    for (let file of commands) {
      if (reload)
        delete require.cache[require.resolve(`../commands/${dir}/${file}`)];
      let pull = require(`../commands/${dir}/${file}`); //request file

      // If file have defined name inside, register it as command in to the collection (index.js:8)
      if (pull.name) {
        client.commands.set(pull.name, pull); //Key: Command, Value: File(.js) -> basically, if key is called, run value (file)
      } else {
        buildMsg += `${file}\n`;
        continue;
      }
      // If file has aliases and aliases are in an Array (List), register each alias in to the collection (index.js:9)
      if (pull.aliases)
        pull.aliases.forEach((alias: string) => {
          client.aliases.set(alias, pull.name); //adds it to commands
        });
    }
  });
  if (buildMsg.length == 0) console.log('Commands: Build Success');
  else console.log('Errors:\n' + buildMsg);
}; */

export default cmd;
