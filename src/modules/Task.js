export default class Task {
  constructor(name, project, dueDate = 'No date') {
    this.name = name
    this.project = project
    this.dueDate = dueDate
  }
}