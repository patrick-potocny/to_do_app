import Storage from "./Storage";

export default class TodoList {
  static tasksFor(tasksDate) {
    if (tasksDate === "Today") {
      const allTasks = Storage.getTasksList();
      const todayTasks = [];
      for (let task of allTasks) {
        task = JSON.parse(task);
        const taskDate = new Date(task.dueDate);
        const todayDate = new Date();
        if (taskDate.toDateString() <= todayDate.toDateString()) {
          todayTasks.push(task);
        }
      }
      
      todayTasks.sort(function (a, b) {
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
      console.log(todayTasks);
    }
  }
}
