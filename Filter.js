export class Filter {
  filterTask(tasks, value) {
    this.filteredTasks = tasks.filter((item) =>
      item.textContent.toLowerCase().includes(value.toLowerCase())
    );
  }

  highlightTask(searchedText, liText) {
    const searched = searchedText.toUpperCase();
    this.text = liText;
    this.regSearch = new RegExp(searched, "i");
    if (searched !== null) {
      for (let i = 0; i < this.text.length; i++) {
        this.text[i].innerHTML = this.text[i].innerText
          .toUpperCase()
          .replace(
            this.regSearch,
            `<span class="highlight">${searched}</span>`
          );
      }
    }
  }
}
