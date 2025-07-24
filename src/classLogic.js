class ToDoItem {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this._dueDate = new Date(dueDate);

    this._check = false;
    this._id = crypto.randomUUID();
  }

  get dueDate() {
    return this._dueDate;
  }
  set dueDate(val) {
    this._dueDate = new Date(val);
  }

  get check() {
    return this._check;
  }
  set check(val) {
    return (this._check = val);
  }

  get id() {
    return this._id;
  }
}

class ToDoProject {
  constructor(name) {
    this.name = name;
    this.content = [];
    this._proyectId = crypto.randomUUID();
  }

  addItem(title, description, dueDate, priority) {
    const newItem = new ToDoItem(title, description, dueDate, priority);
    this.content.push(newItem);
  }

  delItem(id) {
    const idx = this.content.findIndex((obj) => obj.id === id);
    this.content.splice(idx, 1);
  }

  checkItem(id) {
    const idx = this.content.findIndex((obj) => obj.id === id);
    const value = this.content[idx].check;
    this.content[idx].check = !value;
  }

  getItem(id) {
    const idx = this.content.findIndex((obj) => obj.id === id);
    return this.content[idx];
  }

  get id() {
    return this._proyectId;
  }
}

class ManageProjects {
  constructor() {
    this.projects = this.getLocal(); // reconstruye desde localStorage
  }

  createProject(name) {
    const newProject = new ToDoProject(name);
    this.projects.push(newProject);
    this.saveLocal(); // guardar cambios
  }

  delProyect(id) {
    const idx = this.projects.findIndex((obj) => obj.id === id);
    if (idx !== -1) {
      this.projects.splice(idx, 1);
      this.saveLocal();
    }
  }

  getProject(id) {
    return this.projects.find((obj) => obj.id === id);
  }

  getAllProjects() {
    return this.projects;
  }

  saveLocal() {
    localStorage.setItem("allProjects", JSON.stringify(this.projects));
  }

  getLocal() {
    const raw = localStorage.getItem("allProjects");
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    // Reconstruir instancias reales de ToDoProject y ToDoItem
    return parsed.map((projectData) => {
      const project = new ToDoProject(projectData.name);
      project._proyectId = projectData._proyectId;

      projectData.content.forEach((taskData) => {
        const task = new ToDoItem(
          taskData.title,
          taskData.description,
          taskData._dueDate,
          taskData.priority
        );
        task._id = taskData._id;
        task._check = taskData._check;
        project.content.push(task);
      });

      return project;
    });
  }
}

export { ManageProjects, ToDoProject, ToDoItem };
