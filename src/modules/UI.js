import Storage from "./Storage";
import Task from "./Task";
import TodoList from "./TodoList";

export default class Ui {
  static loadUI() {
    this.loadProjects();
    this.loadTasks();
  }

  static loadProjects() {
    const projectsList = Storage.getProjectslist();
    const projectsUl = document.getElementById("projects-list");
    projectsUl.innerHTML = `<li><a href="#" class="list-link" id="add-project">+ Add New Project</a></li>`;
    for (const project of projectsList) {
      projectsUl.innerHTML += `<li><a href="#" class="list-link">${project}</a></li>`;
    }

    this.addProjectButtons();
  }

  static addProjectButtons() {
    const addProject = document.getElementById("add-project");
    addProject.addEventListener("click", this.addProjectPopup);
  }

  static addProjectPopup() {
    const projectName = prompt("Name of project:", "Project Name");
    if (projectName) {
      Storage.addProject(projectName);
      // Put in "Ui.load...." bcs this. didnt work and idk why
      Ui.loadProjects();
    }
  }

  static loadTasks() {
    TodoList.tasksFor("Today");
    this.addTaskButtons();
  }

  static addTaskButtons() {
    const addTask = document.getElementById("add-task");
    addTask.addEventListener("click", this.addTaskPopup);
  }

  static addTaskPopup() {
    // check if addTasks popup exists
    if (document.getElementsByClassName("task-focus")[0]) {
      return;
    }

    let tasksList = document.getElementById("tasks-list");
    const tasksListHtml = tasksList.innerHTML;
    const popup = `
    <div class="task task-focus">
    <div class="left-side">
      <input class="task-input" type="text" name="task-name" id="task-name" maxlength="50"/>
    </div>
    <div class="right-side">
      <div class="task-divider"></div>
      <select class="task-input" name="project-select" id="task-project">
        <option value="no-project">No Project</option>
      </select>
      <div class="task-divider"></div>
      <input class="task-input" type="date" name="due-date" id="due-date" />
      <button class="task-btn task-confirm" id="task-confirm">
        <img src="./images/checkmark-svgrepo-com.svg" alt="Add" />
      </button>
      <button class="task-btn task-cancel" id="task-cancel">
        <img src="./images/x-lg-svgrepo-com.svg" alt="Cancel" />
      </button>
    </div>
    </div>`;
    tasksList.innerHTML = popup + tasksListHtml;

    Ui.updateDropdown();

    const taskConfirm = document.getElementById("task-confirm");
    const taskCancel = document.getElementById("task-cancel");
    taskConfirm.addEventListener("click", Ui.addTask);
    taskCancel.addEventListener(
      "click",
      () => (tasksList.innerHTML = tasksListHtml)
    );

    document.getElementById("task-name").focus();
  }

  static addTask() {
    const name = document.getElementById("task-name").value;
    const projectName = document.getElementById("task-project").value;
    let dueDate = document.getElementById("due-date").value;

    if (name === "") {
      alert("Task cannot be empty");
      return;
    }

    if (dueDate === "") {
      alert("Set date");
      return;
    }

    const task = new Task(name, projectName, dueDate);
    Storage.addTask(task);
    document.getElementsByClassName("task-focus")[0].remove();
  }

  static updateDropdown() {
    // add current projects to dropdown
    const projectsList = Storage.getProjectslist();
    const taskSelect = document.getElementById("task-project");
    for (const i in projectsList) {
      const option = document.createElement("option");
      option.value = [i];
      option.innerText = projectsList[i];
      taskSelect.appendChild(option);
    }
  }
}
