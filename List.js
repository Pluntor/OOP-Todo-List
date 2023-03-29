import { Task } from "./Task.js";
export class List {
  constructor() {
    this.toDoTasks = [];
    this.doneTasks = [];
  }

  addTask(value, inputDateFieldValue) {
    this.task = new Task();
    this.task.li.innerHTML = `${value} `;
    this.task.div.append(
      this.task.li,
      this.task.doneButton,
      this.task.deleteButton,
      this.task.date
    );
    this.task.date.textContent = inputDateFieldValue;
    this.toDoTasks.push(this.task.div);
  }

  doneTask(index) {
    this.doneTasks.push(this.toDoTasks[index]);
    this.toDoTasks.splice(index, 1);
  }

  deleteToDoTask(index) {
    this.toDoTasks.splice(index, 1);
  }

  deleteDoneTask(index) {
    this.doneTasks.splice(index, 1);
  }
}
