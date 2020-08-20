import { Bot, Event } from '../types';

function runAll(bot: Bot): void {
  login(bot);
}
function login(bot: Bot): void {
  const { client } = bot;
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  console.log('');
  console.log(`   Logged in as ${client.user!.tag}!   `);
  console.log('');
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
}

const ready: Event = {
  name: 'ready',
  func: runAll,
};
export default ready;
