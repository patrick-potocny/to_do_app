import Storage from "./modules/Storage";
import Task from "./modules/Task";
import Ui from "./modules/UI";

localStorage.clear();
Storage.initStorage();
Storage.addProject("Test project");
const testTask = new Task("Test task", "Test project", "2022-10-15");
Storage.addTask(testTask);
Ui.loadUI();
console.log(localStorage);
