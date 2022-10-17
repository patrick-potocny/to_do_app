import Storage from "./modules/Storage";
import Task from "./modules/Task";
import Ui from "./modules/UI";

localStorage.clear();
Storage.initStorage();
Storage.addProject("Test project");
Storage.addProject("Test project 2");
Storage.addTask(new Task("Task 1", "no-project", "10-18-2022"));
Storage.addTask(new Task("Task 2", "Test project", "10-17-2022"));
Storage.addTask(new Task("Task 3", "Test project 2", "10-10-2022"));
Ui.loadUI();
