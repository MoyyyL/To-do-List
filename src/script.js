import "./styles.css";
import { domProjectsManager } from "./projectManager";
import { renderItemDialogAddNew } from "./addTaskItemDialog";
import { renderTaskDialog } from "./taskDialog";

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
        addButton.addEventListener("click", () => {
            renderItemDialogAddNew(id);
            this.itemDialogLogic();
        });

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
            task.dataset.id = obj.id; //!
            task.textContent = obj.title;
            task.addEventListener("click", (e) => {
                console.log(e.target)
                this.taskHandler(e.id);
            })

            toDo.appendChild(checkbox);
            toDo.appendChild(task)

            list.appendChild(toDo);
        })
    }

    addTask(id, title, description, date, priority) {
        const currentProject = this.controller.getIndividualProject(id);
        currentProject.addItem(title, description, date, priority);
        
        console.log(currentProject);
        
        this.renderDialog(id);
    }


    // ASSINGING ADDEVENT LISTENER TO EACH OF THE DIALOGS
    itemDialogLogic() {
        const itemDialogAddTask = document.querySelector(".item__dialog-addTask");
        itemDialogAddTask.addEventListener("click", (e) => {
            e.preventDefault();
            const title = document.querySelector("#Title");
            const description = document.querySelector("#Description");
            const dueDate = document.querySelector("#dueDate");
            const priority = document.querySelector("#Priority");
            const id = e.target.dataset.id;
            
            this.addTask(id, title.value, description.value, dueDate.value, priority.value);
            const itemDialog = document.querySelector(".item__dialog");
            itemDialog.close();
        })
    }

    taskHandler(id) {
        const currentProject = this.controller.getIndividualProject(id);
        
        const taskDialog = document.querySelector(".item__dialog");
        renderTaskDialog(id);
        taskDialog.showModal();
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

        const openItemDialog = document.querySelector(".add-task");
        openItemDialog.addEventListener("click", e => {
            const itemDialog = document.querySelector(".item__dialog");
            itemDialog.showModal();
        })
    }
}

const start = new domIndividualProject();


