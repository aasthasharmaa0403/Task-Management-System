const fs = require("fs");

const FILE = "./Task.json";

function loadTasks() {
    try {
        if (!fs.existsSync(path)) {
            return [];
        }

        const data = fs.readFileSync(path, 'utf-8').trim();

        if (!data) {
            return [];
        }

        return JSON.parse(data);
    } catch (error) {
        console.log('Error reading tasks file. Resetting file.');
        return [];
    }
}

// Save tasks to file
function saveTasks(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

module.exports = { loadTasks, saveTasks };
