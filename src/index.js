import Storage from "./modules/Storage";
import Task from "./modules/Task";
import Ui from "./modules/UI";

localStorage.clear();
Storage.initStorage();
Storage.addProject("Test project");
Storage.addProject("Test project 2");
Storage.addTask(new Task("Task 2", "Test project", "2022-10-15"));
Storage.addTask(new Task("Task 1", "No Project", "2022-10-20"));
Storage.addTask(new Task("Task 3", "Test project", "2022-10-21"));
Ui.loadUI();
