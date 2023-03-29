import { List } from "./List.js";
import { Filter } from "./Filter.js";

class Start {
  constructor(date) {
    this.inputField = document.getElementById("input");
    this.inputDateField = document.getElementById("toDoDate");
    this.form = document.getElementById("submit");
    this.toDoUl = document.querySelector('[data-id="toDoList"]');
    this.doneUl = document.querySelector('[data-id="doneList"]');
    this.toDoDiv = document.querySelector("div.todo");
    this.doneDiv = document.querySelector("div.done");
    this.toDoCounter = document.querySelector("span.toDoCounter");
    this.doneCounter = document.querySelector("span.doneCounter");
    this.inputDateAttr = {
      date,
    };

    this.list = new List();
    this.filter = new Filter();
  }

  setDateAttr() {
    const dateAttr = {
      min: this.inputDateAttr.date,
      value: this.inputDateAttr.date,
    };
    return dateAttr;
  }

  init() {
    this.inputField.addEventListener("input", this.filterTasks);
    this.form.addEventListener("submit", this.addTaskToList);

    for (let i in this.setDateAttr()) {
      this.inputDateField.setAttribute(i, this.setDateAttr()[i]);
    }
  }

  generateLists() {
    this.generateDoneList();
    this.generateToDoList();
  }

  addTaskToList = (e) => {
    e.preventDefault();
    this.inputField.value !== "" && this.inputField.value !== null
      ? this.list.addTask(this.inputField.value, this.inputDateField.value)
      : alert("Podaj jakąś wartość!");
    this.generateLists();
    this.inputField.value = "";
    this.highlight();
    document
      .querySelectorAll(".toDoDelete")
      .forEach((button) =>
        button.addEventListener("click", this.deleteTaskFromList)
      );
    document
      .querySelectorAll(".done")
      .forEach((button) =>
        button.addEventListener("click", this.moveToDoneList)
      );
  };

  generateToDoList() {
    this.toDoUl.textContent = "";
    this.list.toDoTasks.forEach((task, index) => {
      task.dataset.key = index;
      this.toDoUl.appendChild(task);
    });
    let toDoProgress =
      this.list.toDoTasks.length /
      (this.list.doneTasks.length + this.list.toDoTasks.length);
    this.toDoCounter.textContent = this.toDoUl.childElementCount;
    this.toDoDiv.textContent = this.toDoUl.childElementCount;
    if (this.list.toDoTasks.length === 0) {
      this.toDoDiv.style.width = "0.7vw";
    } else this.toDoDiv.style.width = `${toDoProgress.toFixed(2) * 100}%`;
  }

  deleteTaskFromList = (e) => {
    this.index = e.target.parentNode.dataset.key;
    this.list.deleteToDoTask(this.index);
    this.generateLists();
  };

  moveToDoneList = (e) => {
    this.index = e.target.parentNode.dataset.key;
    this.list.doneTask(this.index);
    e.target.remove();
    this.generateLists();
    document
      .querySelectorAll(".doneDelete")
      .forEach((button) =>
        button.removeEventListener("click", this.deleteTaskFromList)
      );
    document
      .querySelectorAll(".doneDelete")
      .forEach((button) =>
        button.addEventListener("click", this.deleteTaskFromDoneList)
      );
  };

  generateDoneList() {
    this.doneUl.textContent = "";
    this.list.doneTasks.forEach((task, index) => {
      task.dataset.key = index;
      task.firstChild.nextSibling.classList.add("doneDelete");
      task.firstChild.nextSibling.classList.remove("toDoDelete");
      this.doneUl.appendChild(task);
    });
    let doneProgress =
      this.list.doneTasks.length /
      (this.list.doneTasks.length + this.list.toDoTasks.length);
    this.doneCounter.textContent = this.doneUl.childElementCount;
    this.doneDiv.textContent = this.doneUl.childElementCount;
    if (this.list.doneTasks.length === 0) {
      this.doneDiv.style.width = "0.7vw";
    } else this.doneDiv.style.width = `${doneProgress.toFixed(2) * 100}%`;
  }

  deleteTaskFromDoneList = (e) => {
    this.index = e.target.parentNode.dataset.key;
    this.list.deleteDoneTask(this.index);
    this.generateLists();
  };

  filterTasks = () => {
    this.toDoUl.textContent = "";
    this.filter.filterTask(this.list.toDoTasks, this.inputField.value);
    this.filter.filteredTasks.forEach((task, index) => {
      task.dataset.key = index;
      this.toDoUl.appendChild(task);
    });
    this.highlight();
    this.toDoCounter.textContent = this.toDoUl.childElementCount;
  };

  highlight() {
    this.filter.highlightTask(
      this.inputField.value.trim(),
      document.querySelectorAll("li")
    );
  }
}

window.onload = function () {
  const date = new Date().toISOString().slice(0, 10);
  // console.log(date);
  const start = new Start(date);
  start.init();
};
