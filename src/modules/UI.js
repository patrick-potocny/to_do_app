import Storage from "./Storage";

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
    Storage.addProject(projectName);
    // Put in "Ui.load...." bcs this didnt work and idk why
    Ui.loadProjects();
  }

  static loadTasks() {
    console.log(JSON.parse(localStorage.getItem('Test task')).name)
  }
}
