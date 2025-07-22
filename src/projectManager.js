import { ManageProjects } from "./classLogic";

class domProjectsManager {
    constructor() {
        this.projectManager = new ManageProjects();
        this.domAdding();
        this.renderProjects();
    }

    renderProjects() {
        const whole = this.projectManager.getAllProjects();
        const projectsWrapper = document.querySelector(".todo__projects-wrapper");
        const dialog = document.querySelector(".project__dialog")
        projectsWrapper.innerHTML = " ";

        whole.forEach(obj => {
            const project = document.createElement("div");
            project.classList.add("todo__project");
            project.dataset.id = obj.id
            
            const projectOpen = document.createElement("button");
            projectOpen.classList.add("project__button");
            projectOpen.addEventListener("click", () => dialog.showModal());

            const projectTitle = document.createElement("h2");
            projectTitle.textContent = obj.name;

            const projectHowMuchCont = document.createElement("p");
            projectHowMuchCont.textContent = `${obj.length} tasks`;

            project.appendChild(projectOpen);
            project.appendChild(projectTitle);
            project.appendChild(projectHowMuchCont);

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

    getIndividualProject(id) {
        return this.projectManager.getProject(id);
    }

    domAdding() {
        const addButton = document.querySelector(".create-project");
        const nameInput = document.querySelector(".project-name");
        addButton.addEventListener("click", () => {
            const name = nameInput.value;
            this.addProject(name);
        })
    }

    saveLocal() {
        this.projectManager.saveLocal();
    }
}

export {domProjectsManager}