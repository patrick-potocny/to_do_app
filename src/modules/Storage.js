export default class Storage {
  static initStorage() {
    const currentProjects = localStorage.getItem("projects");
    if (currentProjects == null) {
      localStorage.setItem("projects", JSON.stringify([]));
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

  static addTask(taskObj) {
    console.log(JSON.stringify(taskObj));
    localStorage.setItem(taskObj.name, JSON.stringify(taskObj));
  }
}
