import ElementList from "./ElementList.js";

const addButton = document.querySelector(".addTask");
const taskList = document.querySelector(".list");
const closeNewTaskButton = document.querySelector(".close-new-task");
const overlay = document.querySelector(".overlay");
const newTaskTitleInput = document.querySelector(".title-input");
const newTaskDifInput = document.querySelector(".diff-selector");
const newTaskDescriptionInput = document.querySelector(".text-input");
const newTaskAdd = document.querySelector(".new-task-add-button");
const viewOverlay = document.querySelector(".view-overlay");
const viewTitle = document.querySelector(".view-title");
const viewDescryption = document.querySelector(".view-descryption");
const viewCloseButton = document.querySelector(".close-view");
const editSelect = document.querySelector(".sort-tasks");
const progresBar = document.querySelector(".progres-bar");
const hardProgres = document.querySelector(".hard-progres-bar");
const midProgres = document.querySelector(".mid-progres-bar");
const lowProgres = document.querySelector(".low-progres-bar");

let newTaskList = [];
let idCounter = 0;
let editTaskFlag = false;
let targetElement = null;

function alterProgresBar() {
  let allTasks = newTaskList.length;
  let doneTasks = 0;
  let allHardTasks = 0;
  let doneHardTasks = 0;
  let allMidTasks = 0;
  let doneMidTasks = 0;
  let allLowTasks = 0;
  let doneLowTasks = 0;

  for (let i = 0; i < newTaskList.length; i++) {
    if (newTaskList[i].completed === true) {
      doneTasks++;
    }

    if (newTaskList[i].difficulty === "1") {
      allLowTasks++;
      if (newTaskList[i].completed === true) {
        doneLowTasks++;
      }
    }

    if (newTaskList[i].difficulty === "2") {
      allMidTasks++;
      if (newTaskList[i].completed === true) {
        doneMidTasks++;
      }
    }

    if (newTaskList[i].difficulty === "3") {
      allHardTasks++;
      if (newTaskList[i].completed === true) {
        doneHardTasks++;
      }
    }
  }

  let percent = Math.trunc((doneTasks / allTasks) * 100);
  let lowPercent;
  let midPercent;
  let hardPercent;

  if (allLowTasks === 0) {
    lowPercent = "100%";
  } else lowPercent = Math.trunc((doneLowTasks / allLowTasks) * 100);

  if (allMidTasks === 0) {
    midPercent = "100%";
  } else midPercent = Math.trunc((doneMidTasks / allMidTasks) * 100);

  if (allHardTasks === 0) {
    hardPercent = "100%";
  } else hardPercent = Math.trunc((doneHardTasks / allHardTasks) * 100);

  progresBar.style.background = `radial-gradient(
    closest-side,
    rgb(255, 255, 255) 85%,
    transparent 80% 100%
  ),conic-gradient(rgb(255, 55, 149) ${percent}%, pink 0)`;
  progresBar.textContent = `${percent}%`;

  lowProgres.style.background = `radial-gradient(
    closest-side,
    rgb(255, 255, 255) 85%,
    transparent 80% 100%
  ),conic-gradient(rgb(125, 238, 190) ${lowPercent}%, rgb(180, 223, 205) 0)`;
  lowProgres.textContent = `${lowPercent}%`;

  midProgres.style.background = `radial-gradient(
    closest-side,
    rgb(255, 255, 255) 85%,
    transparent 80% 100%
  ),conic-gradient(rgb(100, 203, 255) ${midPercent}%, rgb(167, 226, 255) 0)`;
  midProgres.textContent = `${midPercent}%`;

  hardProgres.style.background = `radial-gradient(closest-side, white 80%, transparent 80% 100%),
  conic-gradient(rgb(220, 50, 50) ${hardPercent}%, rgb(220, 120, 120) 0)`;
  hardProgres.textContent = `${hardPercent}%`;
}

function closeAll() {
  newTaskDifInput.value = `1`;
  newTaskDescriptionInput.value = ``;
  newTaskTitleInput.value = ``;

  editTaskFlag = false;
  overlay.style.display = "none";
}

function displayTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  for (let i = 0; i < newTaskList.length; i++) {
    if (newTaskList[i].completed === false) {
      taskList.appendChild(newTaskList[i].returnElement());
    }
  }
}

editSelect.addEventListener("change", function () {
  switch (editSelect.value) {
    case `1`:
      newTaskList.sort((a, b) => a.id - b.id);
      break;
    case `2`:
      newTaskList.sort((a, b) => a.id - b.id);
      newTaskList = newTaskList.reverse();
      break;
    case `3`:
      newTaskList.sort((a, b) => a.difficulty - b.difficulty);
      break;
    case `4`:
      newTaskList.sort((a, b) => a.difficulty - b.difficulty);
      newTaskList = newTaskList.reverse();
      break;
  }
  displayTasks();
});

// przycisk zamykający okenko dodawania zadania
closeNewTaskButton.addEventListener("click", function () {
  closeAll();
});

// przycisk otwierający okenko dodawania zadania
addButton.addEventListener("click", function () {
  overlay.style.display = "flex";
  newTaskAdd.textContent = "Add task";
});

// przycisk dodający zadanie
newTaskAdd.addEventListener("click", function () {
  if (newTaskTitleInput.value === `` || newTaskDescriptionInput.value === ``) {
    alert("Musisz wypełnić wszystkie pola!!!");
  } else {
    if (editTaskFlag) {
      for (let i = 0; i < newTaskList.length; i++) {
        if (targetElement.id === newTaskList[i].id) {
          newTaskList[i].alterElement(
            newTaskTitleInput.value,
            newTaskDescriptionInput.value,
            newTaskDifInput.value
          );
        }
      }
    } else {
      idCounter++;
      const title = newTaskTitleInput.value;
      const description = newTaskDescriptionInput.value;
      const difficulty = newTaskDifInput.value;

      const taskElement = new ElementList(
        `${idCounter}`,
        title,
        description,
        difficulty
      );
      newTaskList.push(taskElement);
    }
    closeAll();
    displayTasks();
    alterProgresBar();
  }
});

// przycisk complete
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("complete-button")) {
    targetElement = event.target.closest("li");

    for (let i = 0; i < newTaskList.length; i++) {
      if (targetElement.id === newTaskList[i].id) {
        newTaskList[i].completed = true;
      }
    }
  }
  displayTasks();
  alterProgresBar();
});

// przycisk włączający okenko edycji zadania
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("edit-task-button")) {
    targetElement = event.target.closest("li");
    editTaskFlag = true;
    overlay.style.display = "flex";
    newTaskAdd.textContent = "Edit task";

    for (let i = 0; i < newTaskList.length; i++) {
      if (targetElement.id === newTaskList[i].id) {
        newTaskTitleInput.value = newTaskList[i].title;
        newTaskDescriptionInput.value = newTaskList[i].description;
        newTaskDifInput.value = newTaskList[i].difficulty;
      }
    }
  }
});

// przycisk wyświetlający task
taskList.addEventListener("click", function (event) {
  if (event.target.classList.contains("view-button")) {
    targetElement = event.target.closest("li");
    viewOverlay.style.display = "flex";

    for (let i = 0; i < newTaskList.length; i++) {
      if (targetElement.id === newTaskList[i].id) {
        viewTitle.textContent = newTaskList[i].title;
        viewDescryption.textContent = newTaskList[i].description;
      }
    }
  }
});

// przycisk zamykający task
viewCloseButton.addEventListener("click", function () {
  viewOverlay.style.display = "none";
});
