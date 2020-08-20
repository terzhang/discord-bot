// import Discord from "discord.js";

async function globalfunction1() {
  //do stuff
}
function globalfunction2() {
  //do stuff
}

const functions = {
  name: '', //must match the file name minus the .js
  globalfunction1,
  globalfunction2,
};
export default functions;
