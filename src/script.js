import "./styles.css";
import { domProjectsManager } from "./projectManager";

class domIndividualProject {
    constructor() {
        this.controller = new domProjectsManager();
        this.autoLogic = this.dialogLogic();
        this.aa = this.asd();
    }

    asd() {
        this.controller.addProject("proyecto piloto"); //crea proyecto
        this.controller.addProject("ya llego sech"); //otro proyecto
        const all = this.controller.projectManager.getAllProjects() //consigue todos los proyectos
        all[0].addItem("elpepe", "asd", "1-1-2010", "sex"); // agrega tasks al primer proyecto
        all[0].addItem("tilin", "asd", "1-1-2010", "sex");
        all[0].addItem("sech", "asd", "1-1-2010", "sex");

        all[1].addItem("asd", "sech", "1-1-2020", "sex");
    }
    
    renderDialog(id) {
        const currentProject = this.controller.getIndividualProject(id);

        const projectTitle = document.querySelector(".project__dialog-headerAndButtons h2");
        projectTitle.textContent = currentProject.name

        const addButton = document.querySelector(".add-task")
        addButton.dataset.id = id;

        const list = document.querySelector(".project__dialog-list");
        list.innerHTML = " ";

        currentProject.content.forEach(obj => {
            const toDo = document.createElement("li");
            toDo.classList.add("to-do");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("todo__check");

            const task = document.createElement("button");
            task.classList.add("todo__button");
            task.textContent = obj.title;

            toDo.appendChild(checkbox);
            toDo.appendChild(task)

            list.appendChild(toDo);
        })
    }

    addTask(id) {
        const currentProject = this.controller.getIndividualProject(id);
        currentProject.addItem("ababa", "asd", "1-1-2222", "asd"); // provisional en lo que hago la logica de captacion de la informacion

        this.renderDialog(id);
    }

    dialogLogic() {
        const dialog = document.querySelector(".project__dialog")
        const closeDialog = document.querySelector(".project__dialog-close");
        closeDialog.addEventListener("click", () => dialog.close());

        const openProjectDialog = document.querySelector(".todo__projects-wrapper");
        openProjectDialog.addEventListener("click", e => {
            const id = e.target.parentElement.dataset.id;
            this.renderDialog(id);
        })

        const dialogAddTask = document.querySelector(".add-task");
        dialogAddTask.addEventListener("click", e => {
            const id = e.target.dataset.id;
            this.addTask(id);
        })
    }
}

const start = new domIndividualProject();


