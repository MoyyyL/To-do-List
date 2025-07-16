import "./styles.css";
import { ManageProjects, ToDoProject, ToDoItem } from "./classLogic";
import {FormatDate} from "./timeManagement";

class domProjectsManager {
    constructor() {
        this.projectManager = new ManageProjects();
    }

    renderProjects() {
        const whole = this.projectManager.getAllProjects();
        const projectsWrapper = document.querySelector(".todo__projects-wrapper");
        projectsWrapper.innerHTML = " ";
        
        whole.forEach(obj => {
            const project = document.createElement("div");
            project.classList.add("todo__project");
            project.dataset.id = obj.id
            //todo EDITAR EL INNER HTML POR CREATE ELEMENTS
            project.innerHTML = `
                <button class="project__button"></button>
                <h2>${obj.name}</h2>
                <ul class="project__list">
                    <li class="to-do">
                        <input type="checkbox" id="1"> //! neeed acces to individual id
                        <label for="1">Opcion 1</label> //!
                    </li>
                </ul>
            `;

            projectsWrapper.appendChild(project);
        })
    }

    addProject(name) {
        this.projectManager.createProject(name);
        this.renderProjects();
    }

    delProject(id) {
        this.projectManager.delProyect(id);
        this.renderProjects();
    }
}