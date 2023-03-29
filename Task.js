export class Task {
  constructor() {
    this.div = document.createElement("div");
    this.doneButton = document.createElement("button");
    this.deleteButton = document.createElement("button");
    this.li = document.createElement("li");
    this.date = document.createElement("p");

    this.div.classList.add("task");
    this.doneButton.textContent = "Wykonane";
    this.doneButton.classList.add("done");
    this.deleteButton.textContent = "Usuń";
    this.deleteButton.classList.add("toDoDelete");
    this.date.classList.add("taskDate");
  }
}
