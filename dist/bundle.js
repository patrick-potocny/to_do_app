/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/Storage */ \"./src/modules/Storage.js\");\n/* harmony import */ var _modules_Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Task */ \"./src/modules/Task.js\");\n/* harmony import */ var _modules_UI__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/UI */ \"./src/modules/UI.js\");\n\n\n\n\nlocalStorage.clear();\n_modules_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].initStorage();\n_modules_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addProject(\"Test project\");\n_modules_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addProject(\"Test project 2\");\n_modules_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addTask(new _modules_Task__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Task 1\", \"no-project\", \"10-18-2022\"));\n_modules_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addTask(new _modules_Task__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Task 2\", \"Test project\", \"10-17-2022\"));\n_modules_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addTask(new _modules_Task__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Task 3\", \"Test project 2\", \"10-10-2022\"));\n_modules_UI__WEBPACK_IMPORTED_MODULE_2__[\"default\"].loadUI();\n\n\n//# sourceURL=webpack://to_do_app/./src/index.js?");

/***/ }),

/***/ "./src/modules/Storage.js":
/*!********************************!*\
  !*** ./src/modules/Storage.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Storage)\n/* harmony export */ });\nclass Storage {\n  static initStorage() {\n    const currentProjects = localStorage.getItem(\"projects\");\n    if (currentProjects == null) {\n      localStorage.setItem(\"projects\", JSON.stringify([]));\n      localStorage.setItem(\"tasks\", JSON.stringify([]));\n    }\n  }\n\n  static getProjectslist() {\n    const currentProjects = localStorage.getItem(\"projects\");\n    const currentProjectsList = JSON.parse(currentProjects);\n    return currentProjectsList;\n  }\n\n  static addProject(projectName) {\n    const currentProjectsList = this.getProjectslist();\n    currentProjectsList.push(projectName);\n    localStorage.setItem(\"projects\", JSON.stringify(currentProjectsList));\n  }\n\n  static removeProject(projectName) {\n    const currentProjectsList = this.getProjectslist();\n    currentProjectsList.splice(currentProjectsList.indexOf(projectName), 1);\n    localStorage.setItem(\"projects\", JSON.stringify(currentProjectsList));\n  }\n\n  static getTasksList() {\n    const currentTasks = localStorage.getItem(\"tasks\");\n    const currentTasksList = JSON.parse(currentTasks);\n    return currentTasksList;\n  }\n\n  static addTask(taskObj) {\n    const currentTasksList = this.getTasksList()\n    const task = JSON.stringify(taskObj)\n    currentTasksList.push(task)\n    localStorage.setItem('tasks', JSON.stringify(currentTasksList))\n  }\n}\n\n\n//# sourceURL=webpack://to_do_app/./src/modules/Storage.js?");

/***/ }),

/***/ "./src/modules/Task.js":
/*!*****************************!*\
  !*** ./src/modules/Task.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Task)\n/* harmony export */ });\nclass Task {\n  constructor(name, project, dueDate = 'No date') {\n    this.name = name\n    this.project = project\n    this.dueDate = dueDate\n  }\n\n  setName(name) {\n    this.name = name\n  }\n\n  getName() {\n    return this.name\n  }\n\n  setProject(project) {\n    this.project = project\n  }\n\n  getProject() {\n    return this.project\n  }\n\n  setDate(dueDate) {\n    this.dueDate = dueDate\n  }\n\n  getDate() {\n    return this.dueDate\n  }\n\n  getDateFormatted() {\n    const day = this.dueDate.split('/')[0]\n    const month = this.dueDate.split('/')[1]\n    const year = this.dueDate.split('/')[2]\n    return `${month}/${day}/${year}`\n  }\n}\n\n//# sourceURL=webpack://to_do_app/./src/modules/Task.js?");

/***/ }),

/***/ "./src/modules/TodoList.js":
/*!*********************************!*\
  !*** ./src/modules/TodoList.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ TodoList)\n/* harmony export */ });\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ \"./src/modules/Storage.js\");\n\n\nclass TodoList {\n  static tasksFor(tasksDate) {\n    if (tasksDate === \"Today\") {\n      const allTasks = _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getTasksList();\n      const todayTasks = [];\n      for (let task of allTasks) {\n        task = JSON.parse(task);\n        const taskDate = new Date(task.dueDate);\n        const todayDate = new Date();\n        if (taskDate.toDateString() <= todayDate.toDateString()) {\n          todayTasks.push(task);\n        }\n      }\n      \n      todayTasks.sort(function (a, b) {\n        return new Date(a.dueDate) - new Date(b.dueDate);\n      });\n      console.log(todayTasks);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://to_do_app/./src/modules/TodoList.js?");

/***/ }),

/***/ "./src/modules/UI.js":
/*!***************************!*\
  !*** ./src/modules/UI.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Ui)\n/* harmony export */ });\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ \"./src/modules/Storage.js\");\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ \"./src/modules/Task.js\");\n/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoList */ \"./src/modules/TodoList.js\");\n\n\n\n\nclass Ui {\n  static loadUI() {\n    this.loadProjects();\n    this.loadTasks();\n  }\n\n  static loadProjects() {\n    const projectsList = _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjectslist();\n    const projectsUl = document.getElementById(\"projects-list\");\n    projectsUl.innerHTML = `<li><a href=\"#\" class=\"list-link\" id=\"add-project\">+ Add New Project</a></li>`;\n    for (const project of projectsList) {\n      projectsUl.innerHTML += `<li><a href=\"#\" class=\"list-link\">${project}</a></li>`;\n    }\n\n    this.addProjectButtons();\n  }\n\n  static addProjectButtons() {\n    const addProject = document.getElementById(\"add-project\");\n    addProject.addEventListener(\"click\", this.addProjectPopup);\n  }\n\n  static addProjectPopup() {\n    const projectName = prompt(\"Name of project:\", \"Project Name\");\n    if (projectName) {\n      _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addProject(projectName);\n      // Put in \"Ui.load....\" bcs this. didnt work and idk why\n      Ui.loadProjects();\n    }\n  }\n\n  static loadTasks() {\n    _TodoList__WEBPACK_IMPORTED_MODULE_2__[\"default\"].tasksFor(\"Today\");\n    this.addTaskButtons();\n  }\n\n  static addTaskButtons() {\n    const addTask = document.getElementById(\"add-task\");\n    addTask.addEventListener(\"click\", this.addTaskPopup);\n  }\n\n  static addTaskPopup() {\n    // check if addTasks popup exists\n    if (document.getElementsByClassName(\"task-focus\")[0]) {\n      return;\n    }\n\n    let tasksList = document.getElementById(\"tasks-list\");\n    const tasksListHtml = tasksList.innerHTML;\n    const popup = `\n    <div class=\"task task-focus\">\n    <div class=\"left-side\">\n      <input class=\"task-input\" type=\"text\" name=\"task-name\" id=\"task-name\" maxlength=\"50\"/>\n    </div>\n    <div class=\"right-side\">\n      <div class=\"task-divider\"></div>\n      <select class=\"task-input\" name=\"project-select\" id=\"task-project\">\n        <option value=\"no-project\">No Project</option>\n      </select>\n      <div class=\"task-divider\"></div>\n      <input class=\"task-input\" type=\"date\" name=\"due-date\" id=\"due-date\" />\n      <button class=\"task-btn task-confirm\" id=\"task-confirm\">\n        <img src=\"./images/checkmark-svgrepo-com.svg\" alt=\"Add\" />\n      </button>\n      <button class=\"task-btn task-cancel\" id=\"task-cancel\">\n        <img src=\"./images/x-lg-svgrepo-com.svg\" alt=\"Cancel\" />\n      </button>\n    </div>\n    </div>`;\n    tasksList.innerHTML = popup + tasksListHtml;\n\n    Ui.updateDropdown();\n\n    const taskConfirm = document.getElementById(\"task-confirm\");\n    const taskCancel = document.getElementById(\"task-cancel\");\n    taskConfirm.addEventListener(\"click\", Ui.addTask);\n    taskCancel.addEventListener(\n      \"click\",\n      () => (tasksList.innerHTML = tasksListHtml)\n    );\n\n    document.getElementById(\"task-name\").focus();\n  }\n\n  static addTask() {\n    const name = document.getElementById(\"task-name\").value;\n    const projectName = document.getElementById(\"task-project\").value;\n    let dueDate = document.getElementById(\"due-date\").value;\n\n    if (name === \"\") {\n      alert(\"Task cannot be empty\");\n      return;\n    }\n\n    if (dueDate === \"\") {\n      alert(\"Set date\");\n      return;\n    }\n\n    const task = new _Task__WEBPACK_IMPORTED_MODULE_1__[\"default\"](name, projectName, dueDate);\n    _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addTask(task);\n    document.getElementsByClassName(\"task-focus\")[0].remove();\n  }\n\n  static updateDropdown() {\n    // add current projects to dropdown\n    const projectsList = _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProjectslist();\n    const taskSelect = document.getElementById(\"task-project\");\n    for (const i in projectsList) {\n      const option = document.createElement(\"option\");\n      option.value = [i];\n      option.innerText = projectsList[i];\n      taskSelect.appendChild(option);\n    }\n  }\n}\n\n\n//# sourceURL=webpack://to_do_app/./src/modules/UI.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;