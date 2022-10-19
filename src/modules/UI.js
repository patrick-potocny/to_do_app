import Storage from "./Storage";
import Task from "./Task";
import TodoList from "./TodoList";
import format from "date-fns/format";

export default class Ui {
  static loadUI() {
    this.loadProjects();
    this.loadTasks("Today");
  }

  static loadProjects() {
    const projectsList = Storage.getProjectslist();
    const projectsUl = document.getElementById("projects-list");
    projectsUl.innerHTML = `<li><a href="#" class="list-link" id="add-project">+ Add New Project</a></li>`;
    for (const project of projectsList) {
      projectsUl.innerHTML += `<li><a href="#" class="list-link project">${project}</a></li>`;
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
      Ui.loadTasks(projectName);
      Ui.addProjectDelBtn();
      Ui.addProjectDelBtn();
      Ui.removeActiveLink();
    }
  }

  static loadTasks(attribute) {
    const tasks = TodoList.getTasksFor(attribute);
    this.showCurrentCategory(attribute);
    this.showTasks(tasks);

    this.addTaskButtons();
    this.addSidebarButtons();
  }

  static showCurrentCategory(attribute) {
    const xpath = `//a[text()='${attribute}']`;
    const matchingElement = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
    matchingElement.classList.add("list-link-active");
    const currentCategory = document.getElementById("current-category");
    currentCategory.innerText = attribute;
  }

  static showTasks(tasks) {
    let tasksDiv = document.getElementById("tasks-list");
    tasksDiv.innerHTML = "";
    for (const task of tasks) {
      tasksDiv.innerHTML += `
          <div class="task">
            <div class="left-side">
              <button class="task-btn task-delete">
                <img src="./images/checkmark-svgrepo-com.svg" alt="done" />
              </button>
              <div class="task-divider"></div>
              <p class="task-title task-data">${task.name}</p>
            </div>
            <div class="right-side">
              <div class="task-divider"></div>
              <p class="project-name task-data">${task.project}</p>
              <div class="task-divider"></div>
              <p class="due-date task-data">${format(
                new Date(task.dueDate),
                "d/M/y"
              )}</p>
              <button class="task-btn task-edit">
                <img src="./images/pencil-svgrepo-com.svg" alt="Delete" />
              </button>
              <button class="task-btn task-delete">
                <img src="./images/trash-svgrepo-com.svg" alt="Delete" />
              </button>
            </div>
          </div>
      `;
    }
  }

  static addSidebarButtons() {
    const categoryBtns = document.getElementsByClassName("category");
    for (const btn of categoryBtns) {
      btn.addEventListener("click", function () {
        Ui.removeActiveLink();
        Ui.loadTasks(btn.innerText);
      });
    }

    const projectBtns = document.getElementsByClassName("project");
    for (const btn of projectBtns) {
      btn.addEventListener("click", function () {
        Ui.removeActiveLink();
        Ui.loadTasks(btn.innerText);
        Ui.addProjectDelBtn();
      });
    }
  }

  static addProjectDelBtn() {
    const addTaskDiv = document.getElementsByClassName("task-list-btns")[0];
    const newHtml = `<button class="task-btn project-del">
                      <img src="./images/trash-svgrepo-com.svg" alt="Del Proj" id="del-project">
                      Delete Project
                    </button>
                    <button class="task-btn" id="add-task">+Add Task</button>`;
    addTaskDiv.innerHTML = newHtml;
    const delBtn = document.getElementsByClassName("project-del")[0];
    delBtn.addEventListener("click", function () {
      if (confirm("Do you want to delete this project and all it`s tasks?")) {
        const currentProject =
          document.getElementById("current-category").innerText;
        TodoList.removeProject(currentProject);
        Ui.loadUI();
        delBtn.remove();
      }
    });

    Ui.addTaskButtons();
  }

  static removeActiveLink() {
    const matchingElement =
      document.getElementsByClassName("list-link-active")[0];
    matchingElement.classList.remove("list-link-active");
  }

  static addTaskButtons() {
    const addTask = document.getElementById("add-task");
    addTask.addEventListener("click", this.addTaskPopup);

    const taskDeleteBtns = document.getElementsByClassName("task-delete");
    for (const btn of taskDeleteBtns) {
      btn.addEventListener("click", function () {
        TodoList.removeTask(Ui.getTaskData(btn));
        Ui.loadTasks(document.getElementById("current-category").innerText);
      });
    }

    const editTaskBtns = document.getElementsByClassName("task-edit");
    for (const btn of editTaskBtns) {
      btn.addEventListener("click", function () {
        Ui.editTask(btn);
      });
    }
  }

  static editTask(btn) {
    const taskData = Ui.getTaskData(btn);
    TodoList.removeTask(taskData);
    btn.parentElement.parentElement.remove();
    Ui.addTaskPopup(taskData)
  }

  static getTaskData(btn) {
    const taskDiv = btn.parentElement.parentElement;
    const taskDataEl = taskDiv.getElementsByClassName("task-data");
    const taskData = [];
    for (const data of taskDataEl) {
      taskData.push(data.innerText);
    }
    const [taskName, taskProject, taskDueDate] = taskData;

    const dueDateList = taskDueDate.split("/");
    const formatedDueDate = `${dueDateList[2]}-${dueDateList[1]}-${dueDateList[0]}`;

    return [taskName, taskProject, formatedDueDate];
  }

  static addTaskPopup(taskData) {
    // check if addTasks popup exists
    if (document.getElementsByClassName("task-focus")[0]) {
      return;
    }

    let taskName = '';
    let taskProject = false;
    let formatedDueDate = '';
    if (Symbol.iterator in Object(taskData)) {
      [taskName, taskProject, formatedDueDate] = taskData;
    }

    let tasksList = document.getElementById("tasks-list");
    const tasksListHtml = tasksList.innerHTML;
    const popup = `
    <div class="task task-focus">
    <div class="left-side">
      <input value="${taskName}" class="task-input" type="text" name="task-name" id="task-name" maxlength="50"/>
    </div>
    <div class="right-side">
      <div class="task-divider"></div>
      <select class="task-input" name="project-select" id="task-project">
        <option value="No Project">No Project</option>
      </select>
      <div class="task-divider"></div>
      <input class="task-input" type="date" name="due-date" id="due-date" value="${formatedDueDate}"/>
      <button class="task-btn task-confirm" id="task-confirm">
        <img src="./images/checkmark-svgrepo-com.svg" alt="Add" />
      </button>
      <button class="task-btn task-cancel" id="task-cancel">
        <img src="./images/x-lg-svgrepo-com.svg" alt="Cancel" />
      </button>
    </div>
    </div>`;
    tasksList.innerHTML = popup + tasksListHtml;

    Ui.updateDropdown(taskProject);

    const taskConfirm = document.getElementById("task-confirm");
    const taskCancel = document.getElementById("task-cancel");
    taskConfirm.addEventListener("click", () => Ui.addTask());
    taskCancel.addEventListener("click", function () {
      if (taskName != ''){
        Ui.addTask(taskName, taskProject, formatedDueDate)
      }
      Ui.loadTasks(document.getElementById('current-category').innerText)
    });

    document.getElementById("task-name").focus();
  }

  static addTask(taskName=false, projectName=false, dueDate=false) {
    if (taskName == false){
      taskName = document.getElementById("task-name").value;
      projectName = document.getElementById("task-project").value;
      dueDate = document.getElementById("due-date").value;
    }

    if (taskName === "") {
      alert("Task cannot be empty");
      return;
    }

    if (dueDate === "") {
      alert("Set date");
      return;
    }

    const task = new Task(taskName, projectName, dueDate);
    Storage.addTask(task);
    document.getElementsByClassName("task-focus")[0].remove();

    const currentCat = document.getElementById("current-category").innerText;
    Ui.loadTasks(currentCat);
  }

  static updateDropdown(projectName) {
    // add current projects to dropdown
    const projectsList = Storage.getProjectslist();
    const taskSelect = document.getElementById("task-project");
    for (const i in projectsList) {
      const option = document.createElement("option");
      option.value = projectsList[i];
      option.innerText = projectsList[i];
      if (projectName === projectsList[i]) option.setAttribute('selected', true)
      taskSelect.appendChild(option);
    }
  }
}
