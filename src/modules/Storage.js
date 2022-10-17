export default class Storage {
  static initStorage() {
    const currentProjects = localStorage.getItem("projects");
    if (currentProjects == null) {
      localStorage.setItem("projects", JSON.stringify([]));
      localStorage.setItem("tasks", JSON.stringify([]));
    }
  }

  static getProjectslist() {
    const currentProjects = localStorage.getItem("projects");
    const currentProjectsList = JSON.parse(currentProjects);
    return currentProjectsList;
  }

  static addProject(projectName) {
    const currentProjectsList = this.getProjectslist();
    currentProjectsList.push(projectName);
    localStorage.setItem("projects", JSON.stringify(currentProjectsList));
  }

  static removeProject(projectName) {
    const currentProjectsList = this.getProjectslist();
    currentProjectsList.splice(currentProjectsList.indexOf(projectName), 1);
    localStorage.setItem("projects", JSON.stringify(currentProjectsList));
  }

  static getTasksList() {
    const currentTasks = localStorage.getItem("tasks");
    const currentTasksList = JSON.parse(currentTasks);
    return currentTasksList;
  }

  static addTask(taskObj) {
    const currentTasksList = this.getTasksList()
    const task = JSON.stringify(taskObj)
    currentTasksList.push(task)
    localStorage.setItem('tasks', JSON.stringify(currentTasksList))
  }
}
