require('colors');
const {
  inquirerMenu,
  pause,
  readInput,
  deleteTaskList,
  confirm,
  showListedChecklist,
} = require('./helpers/inquirer');
const { saveDb, readDb } = require('./helpers/saveFile');
const Tasks = require('./models/Tasks');

const main = async () => {
  let opt = '';
  const tasks = new Tasks();

  const tasksDb = readDb();
  if (tasksDb) {
    // Load tasks
    tasks.loadTasksFromArray(tasksDb);
  }

  do {
    opt = await inquirerMenu(); // Prints menu
    switch (opt) {
      case '1':
        const desc = await readInput('Description: '); // Create option
        tasks.createTask(desc);
        break;
      case '2':
        tasks.fullList();
        break;
      case '3': // List completed
        tasks.listCompletedPending(true);
        break;
      case '4': // List pending
        tasks.listCompletedPending(false);
        false;
      case '5': // completed | pending
        const ids = await showListedChecklist(tasks.listArr);
        tasks.toggleCompleted(ids);
        break;
      case '6': // Delete
        const id = await deleteTaskList(tasks.listArr);
        if (id !== '0') {
          const ok = await confirm('Are you sure?');
          if (ok) {
            tasks.deleteTask(id);
            console.log('Task successfully deleted!');
          }
        }
        break;
    }
    saveDb(tasks.listArr);

    await pause();
  } while (opt !== '0');
};

main();
