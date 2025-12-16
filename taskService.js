//add view edit delete tasks

const Task = require('./Task.js');
const { loadTasks, saveTasks } = require('./fileService');

let tasks = loadTasks();

function addTask(title, desc, priority, dueDate, userId) {
    const id = Date.now();
    const task = new Task(id, title, desc, priority, dueDate, userId);
    tasks.push(task);
    saveTasks(tasks);
}

function viewTasks(userId) {
    return tasks.filter(t => t.userId === userId);
}

function editTask(id, updates) {
    const task = tasks.find(t => t.id === id);
    if (!task) return;
    Object.assign(task, updates);
    saveTasks(tasks);
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks(tasks);
}

function markCompleted(id, status) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = status;
        saveTasks(tasks);
    }
}

function sortTasks(type, userId) {
    const userTasks = viewTasks(userId);

    if (type === 'priority') {
        const order = { high: 1, medium: 2, low: 3 };
        return userTasks.sort((a, b) => order[a.priority] - order[b.priority]);
    }

    if (type === 'completed') {
        return userTasks.sort((a, b) => a.completed - b.completed);
    }

    return userTasks;
}

function searchTasks(keyword, userId) {
    return tasks.filter(task =>
        task.userId === userId &&
        task.title.toLowerCase().includes(keyword.toLowerCase())
    );
}

function filterOverdueTasks(userId) {
    const today = new Date();

    return tasks.filter(task =>
        task.userId === userId &&
        task.dueDate &&
        new Date(task.dueDate) < today &&
        !task.completed
    );
}



module.exports = {
    addTask,
    viewTasks,
    editTask,
    deleteTask,
    markCompleted,
    sortTasks,
    searchTasks,
    filterOverdueTasks
};
