class Task {
  constructor(id, title, description, priority, dueDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate || null;
    this.completed = false;
    this.createdAt = new Date().toISOString(); //covert date to string
  }
}

module.exports = Task;
