class ElementList {
  constructor(id, title, description, difficulty) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.difficulty = difficulty;
    this.completed = false;

    this.newTask = this.createElement();
  }

  createElement() {
    const newTask = document.createElement("li");
    const newTaskCon = document.createElement("div");
    const newFirstTaskCon = document.createElement("div");
    const newTaskTitle = document.createElement("p");
    const newEditTaskButton = document.createElement("button");
    const newSecondTaskCon = document.createElement("div");
    const newTaskDescription = document.createElement("p");
    const newThirdTaskCon = document.createElement("div");
    const newViewButton = document.createElement("button");
    const newCompleteButton = document.createElement("button");
    const newDifStrap = document.createElement("div");
    const newInfoCon = document.createElement("div");
    const neweditIcon = document.createElement("img");

    newTaskCon.classList.add("task-con");
    newFirstTaskCon.classList.add("first-task-con");
    newTaskTitle.classList.add("task-title");
    newEditTaskButton.classList.add("edit-task-button");
    newSecondTaskCon.classList.add("second-task-con");
    newTaskDescription.classList.add("task-description");
    newThirdTaskCon.classList.add("third-task-con");
    newViewButton.classList.add("view-button");
    newCompleteButton.classList.add("complete-button");
    newDifStrap.classList.add("dif-strap");
    newInfoCon.classList.add("info-task");
    neweditIcon.classList.add("edit-icon");
    newTask.id = this.id;

    newTaskTitle.textContent = this.title;
    newTaskDescription.textContent = this.description;
    newViewButton.textContent = "View Task";
    newCompleteButton.textContent = "Completed";
    neweditIcon.src = `icons\\pencil.png`;

    switch (this.difficulty) {
      case `1`:
        newDifStrap.style.backgroundColor = "rgb(125,238,190)";
        break;
      case `2`:
        newDifStrap.style.backgroundColor = "rgb(100,203,255)";
        break;
      case `3`:
        newDifStrap.style.backgroundColor = "rgb(220, 50, 50)";
        break;
    }

    newTask.appendChild(newTaskCon);
    newTaskCon.appendChild(newDifStrap);
    newTaskCon.appendChild(newInfoCon);
    newInfoCon.appendChild(newFirstTaskCon);
    newFirstTaskCon.appendChild(newTaskTitle);
    newFirstTaskCon.appendChild(newEditTaskButton);
    newEditTaskButton.appendChild(neweditIcon);
    newInfoCon.appendChild(newSecondTaskCon);
    newSecondTaskCon.appendChild(newTaskDescription);
    newInfoCon.appendChild(newThirdTaskCon);
    newThirdTaskCon.appendChild(newViewButton);
    newThirdTaskCon.appendChild(newCompleteButton);

    return newTask;
  }

  returnElement() {
    return this.newTask;
  }

  returnId() {
    return this.id;
  }

  alterElement(newTitle, newDescription, newDiff) {
    this.title = newTitle;
    this.description = newDescription;
    this.difficulty = newDiff;
    this.newTask = this.createElement();
  }
}

export default ElementList;
