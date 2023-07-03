require('colors');

const showMenu = () => {
  return new Promise(resolve => {
    console.clear();
    console.log('==================='.green);
    console.log('Select an option'.red);
    console.log('===================\n'.green);
    console.log(`${'1.'.red} Create task`);
    console.log(`${'2.'.red} List task`);
    console.log(`${'3.'.red} List completed tasks`);
    console.log(`${'4.'.red} List remaining tasks`);
    console.log(`${'5.'.red} Complete task(s)`);
    console.log(`${'6.'.red} Delete task`);
    console.log(`${'0.'.red} Exit \n`);

    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question('Select an option: ', opt => {
      readline.close();
      resolve(opt);
    });
  });
};

const pause = () => {
  return new Promise(resolve => {
    const readline = require('readline').createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    readline.question(`\nPress ${'ENTER'.red} to continue\n`, opt => {
      readline.close();
      resolve();
    });
  });
};

module.exports = {
  showMenu,
  pause,
};
