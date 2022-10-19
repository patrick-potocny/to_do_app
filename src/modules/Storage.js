export default class Storage {
  static initStorage() {
    const currentProjects = localStorage.getItem("projects");
    if (currentProjects == null) {
      this.updateProjects([]);
      this.updateTasks([])
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
    this.updateProjects(currentProjectsList);
  }

  static removeProject(projectName) {
    const currentProjectsList = this.getProjectslist();
    currentProjectsList.splice(currentProjectsList.indexOf(projectName), 1);
    this.updateProjects(currentProjectsList);
  }

  static updateProjects(list){
    localStorage.setItem("projects", JSON.stringify(list));
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
    this.updateTasks(currentTasksList)
  }

  static updateTasks(list){
    localStorage.setItem("tasks", JSON.stringify(list));
  }

}
