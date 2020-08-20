import path from 'path';
import { fileHandler } from '../utils';
import { Client, fileType } from '../types';

const func = (client: Client, reload: boolean) => {
  const errors = fileHandler(
    fileType.functions,
    path.resolve('../functions'),
    client,
    reload
  );
  if (!errors) {
    console.log('Functions built successfully');
  } else {
    console.log('Errors: ' + errors);
  }
};

export default func;
