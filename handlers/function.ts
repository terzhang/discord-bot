import path from 'path';
import { fileHandler } from '../utils';
import { Client, fileType } from '../types';

const func = async (client: Client, reload: boolean) => {
  const errors = await fileHandler(
    fileType.functions,
    path.resolve('./functions'),
    client,
    reload
  );
  if (!errors) {
    console.log('Functions built successfully');
  } else {
    console.log('Function errors: \n' + errors);
  }
};

export default func;
