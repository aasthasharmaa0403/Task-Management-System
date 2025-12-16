const readline = require('readline');
const {
    addTask,
    viewTasks,
    editTask,
    deleteTask,
    markCompleted,
    sortTasks
} = require('./taskService');
const { loginUser } = require('./userService');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter username: ', (username) => {
    const userId = loginUser(username);
    showMenu(userId);
});

function showMenu(userId) {
    console.log(`
1. Add Task
2. View Tasks
3. Edit Task
4. Delete Task
5. Mark Completed
6. Sort Tasks
0. Exit
`);

    rl.question('Choose option: ', (choice) => {
        switch (choice) {
            case '1':
                rl.question('Title: ', title => {
                    rl.question('Description: ', desc => {
                        rl.question('Priority (low/medium/high): ', priority => {
                            rl.question('Due Date (YYYY-MM-DD): ', due => {
                                addTask(title, desc, priority, due, userId);
                                showMenu(userId);
                            });
                        });
                    });
                });
                break;

            case '2':
                console.log(viewTasks(userId));
                showMenu(userId);
                break;

            case '3':
                rl.question('Task ID: ', id => {
                    rl.question('New Title: ', title => {
                        editTask(Number(id), { title });
                        showMenu(userId);
                    });
                });
                break;

            case '4':
                rl.question('Task ID: ', id => {
                    deleteTask(Number(id));
                    showMenu(userId);
                });
                break;

            case '5':
                rl.question('Task ID: ', id => {
                    markCompleted(Number(id), true);
                    showMenu(userId);
                });
                break;

            case '6':
                rl.question('Sort by (priority/completed): ', type => {
                    console.log(sortTasks(type, userId));
                    showMenu(userId);
                });
                break;

            case '0':
                rl.close();
                break;
        }
    });
}
