import { addSeconds } from "date-fns";

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
        return this._check = val;
    }

    get id() {
        return this._id;
    }
}

class ToDoProject {
    constructor(name) {
        this.name = name
        this.content = [];
        this._proyectId = crypto.randomUUID();
    }

    addItem(title, description, dueDate, priority) {
        const newItem = new ToDoItem(title, description, dueDate, priority);
        this.content.push(newItem);
    }

    delItem(id) {
        const idx = this.content.findIndex(obj => obj.id === id);
        this.content.splice(idx, 1);
    }

    checkItem(id) {
        const idx = this.content.findIndex(obj => obj.id === id);
        const value = this.content[idx].check;
        this.content[idx].check = !value
    }

    getItem(id) {
        const idx = this.content.findIndex(obj => obj.id === id);
        return this.content[idx]
    }

    get id() {
        return this._proyectId;
    }
}

class ManageProjects {
    constructor() {
        this.projects = [];
    }

    createProject(name) {
        const newProject = new ToDoProject(name);
        this.projects.push(newProject);
    }

    delProyect(id) {
        const idx = this.projects.findIndex(obj => obj.id === id);
        this.projects.splice(idx, 1);
    }

    getProject(id) {
        const idx = this.projects.findIndex(obj => obj.id === id);
        return this.projects[idx];
    }

    getAllProjects() {
        return this.projects.map(obj => obj);
    }
}

export {ManageProjects, ToDoProject, ToDoItem};