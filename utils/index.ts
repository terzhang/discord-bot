import { readdirSync } from 'fs';
import path from 'path';
import { Client, fileType } from '../types';

let errors = '';

/** load and set the files in a given directory
 * @param {string} the file type to handle
 * @param {string} this must be an absolute path
 * @param {Client}
 * @param {boolean} whether to reload
 */
export const fileHandler = async (
  type: fileType,
  dirPath: string,
  client: Client,
  reload: boolean
): Promise<string> => {
  errors = '';

  // Filter files in sub-directories that only .js or .ts files would be loaded in to variable
  const dir = readdirSync(dirPath).filter(
    (f) => f.endsWith('.js') || f.endsWith('.ts')
  );
  // take each js/ts file in the directory...
  for (let file of dir) {
    const resolvePath = path.join('../', dirPath, file);

    if (reload) delete require.cache[require.resolve(resolvePath)];

    const pull = (await import(resolvePath)).default; // request file

    // If file have defined name inside,
    // set it as value in the specified type collection with its name as key  (index.js:8)
    if (pull.name) {
      client[type].set(pull.name, pull);
    } else {
      errors += `${file}\n`;
      continue;
    }

    // If file has aliases that are in an Array,
    // register each alias in to the aliases collection (index.js:9)
    // TODO: it's possible multiple types have the same alias name; check it.
    if (pull.aliases) {
      pull.aliases.forEach((alias: string) => {
        client.aliases.set(alias, pull.name); // adds it to functions
      });
    }
  }

  // should bubble errors up
  return errors;
  /* if (!errors) {
    console.log('Events: Build Success');
    return;
  } else {
    console.log('Errors:' + errors);
    return errors;
  } */
};
