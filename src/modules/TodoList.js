import Storage from "./Storage";
import isWithinInterval from "date-fns/isWithinInterval";
import compareAsc from "date-fns/compareAsc";

export default class TodoList {
  static getTasksFor(attribute) {
    const allTasks = Storage.getTasksList();
    let filteredTasks;
    if (attribute === "Today") {
      filteredTasks = this.filterTasksForToday(allTasks);
    } else if (attribute === "Tomorrow") {
      filteredTasks = this.filterTasksForTomorrow(allTasks);
    } else if (attribute === "This week") {
      filteredTasks = this.filterTasksForWeek(allTasks);
    } else if (attribute === "All tasks") {
      filteredTasks = this.getAllTasks(allTasks);
    } else {
      filteredTasks = this.filterTasksByProject(allTasks, attribute) 
    }

    filteredTasks.sort(function (a, b) {
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

    return filteredTasks;
  }

  static filterTasksForToday(allTasks) {
    const filteredTasks = [];
    const todayDate = new Date();

    for (let task of allTasks) {
      task = JSON.parse(task);
      const taskDate = new Date(task.dueDate).setHours(0,0,0,0);

      if (compareAsc(taskDate, todayDate) < 1) {
        filteredTasks.push(task);
      }
    }

    return filteredTasks;
  }

  static filterTasksForTomorrow(allTasks) {
    const filteredTasks = [];
    const tomorrowDate = new Date();
    tomorrowDate.setDate(new Date().getDate() + 1);

    for (let task of allTasks) {
      task = JSON.parse(task);
      const taskDate = new Date(task.dueDate);

      if (taskDate.toDateString() == tomorrowDate.toDateString()) {
        filteredTasks.push(task);
      }
    }

    return filteredTasks;
  }

  static filterTasksForWeek(allTasks) {
    const filteredTasks = [];
    const todayDate = new Date();
    const endOfWeekDate = new Date();
    todayDate.setDate(new Date().getDate() - 1);
    endOfWeekDate.setDate(new Date().getDate() + 7);

    for (let task of allTasks) {
      task = JSON.parse(task);
      const taskDate = new Date(task.dueDate);

      if (
        isWithinInterval(taskDate, { start: todayDate, end: endOfWeekDate })
      ) {
        filteredTasks.push(task);
      }
    }

    return filteredTasks;
  }

  static getAllTasks(allTasks) {
    const filteredTasks = [];

    for (let task of allTasks) {
      task = JSON.parse(task);
      filteredTasks.push(task);
    }

    return filteredTasks;
  }

  static filterTasksByProject(allTasks, projectName) {
    const filteredTasks = [];

    for (let task of allTasks) {
      task = JSON.parse(task);
      if (task.project === projectName) {
        filteredTasks.push(task);
      }
    }

    return filteredTasks;
  }

  static removeTask([taskName, taskProject, taskDueDate]) {
    const allTasks = Storage.getTasksList()
    for (const i in allTasks) {
      const element = JSON.parse(allTasks[i]);
      if (element.name == taskName && element.project == taskProject && element.dueDate == taskDueDate){
        allTasks.splice(i, 1)
      }
    }

    Storage.updateTasks(allTasks)
  }

  static removeProject(projectName) {
    const allProjects = Storage.getProjectslist()
    const allTasks = Storage.getTasksList()

    for (const i in allProjects) {
      const project = allProjects[i]
      if (project === projectName) allProjects.splice(i, 1)
    }

    for (const i in allTasks) {
      const element = JSON.parse(allTasks[i]);
      if (element.project == projectName){
        allTasks.splice(i, 1)
      }
    }

    Storage.updateProjects(allProjects)
    Storage.updateTasks(allTasks)

  }

}
 