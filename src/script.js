import "./styles.css";
import { domProjectsManager } from "./projectManager"; // importa la funcion principal para manejar los proyectos
import { renderItemDialogAddNew } from "./addTaskItemDialog"; // importa la plantilla para renderizar el dialog para crear una nueva task
import { renderTaskDialog } from "./taskDialog"; // importa la plantilla para renderizar el dialog para editar una task

class domIndividualProject {
    constructor() {
        this.controller = new domProjectsManager();
        this.autoLogic = this.dialogLogic();
        this.aa = this.asd(); // para crear elemento ficticios
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
    
    renderDialog(id) { //* renderiza el proyecto actual
        const currentProject = this.controller.getIndividualProject(id); //consigue el proyecto individual

        const projectTitle = document.querySelector(".project__dialog-headerAndButtons h2");
        projectTitle.textContent = currentProject.name

        const addButton = document.querySelector(".add-task")
        addButton.dataset.id = id; //asigna el id del proyecto actual al boton "add";
        
        //! ----------------------------------
        addButton.addEventListener("click", () => { // asigna un event listener que ejecuta la funcion para renderizar la version de creacion
            renderItemDialogAddNew(id); // el id asignado es el mismo que el del proyecto actual para poder agregar la task al proyecto
            this.itemDialogLogic(); // asigna eventListener a los elemento del dialog despues de haber sido creado
        });

        const list = document.querySelector(".project__dialog-list");
        list.innerHTML = " ";

        currentProject.content.forEach(obj => { // pasa por cada TASK del PROYECTO actual y crea sus componentes
            const toDo = document.createElement("li");
            toDo.classList.add("to-do");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.classList.add("todo__check");

            const task = document.createElement("button");
            task.classList.add("todo__button");
            task.dataset.id = obj.id; //! asigna el id de LA TASK al boton
            task.textContent = obj.title;
            task.addEventListener("click", (e) => { //cuando demos click a la task se ejecuta la funcion que renderiza el dialog y asigna el id de la TASK
                console.log(e.target)
                this.taskHandler(e.id);
            })

            toDo.appendChild(checkbox);
            toDo.appendChild(task)

            list.appendChild(toDo);
        })
    }

    addTask(id, title, description, date, priority) { 
        const currentProject = this.controller.getIndividualProject(id); // toma el current proyect
        currentProject.addItem(title, description, date, priority); // usa la funcion addItem y agrega los datos
        
        console.log(currentProject);
        
        this.renderDialog(id); //vuelve a renderizar
    }


    // ASSINGING ADDEVENT LISTENER TO EACH OF THE DIALOGS
    itemDialogLogic() { //! se ejecuta al dar click al ADDBUTON
        const itemDialogAddTask = document.querySelector(".item__dialog-addTask"); // selecciona el boton dentro de la v1 del dialog para agregar tasks
        itemDialogAddTask.addEventListener("click", (e) => { // agrega un event listener
            //toma los datos del formulario
            e.preventDefault();
            const title = document.querySelector("#Title");
            const description = document.querySelector("#Description");
            const dueDate = document.querySelector("#dueDate");
            const priority = document.querySelector("#Priority");
            const id = e.target.dataset.id;
            
            // llama a la funcion addTask
            this.addTask(id, title.value, description.value, dueDate.value, priority.value);
            const itemDialog = document.querySelector(".item__dialog");
            itemDialog.close();
        })
    }

    taskHandler(id) { //! solo se ejecuta al dar click a una task
        const currentProject = this.controller.getIndividualProject(id);
        
        const taskDialog = document.querySelector(".item__dialog");
        renderTaskDialog(id);
        taskDialog.showModal();
    }

    dialogLogic() { //! se ejecuta automaticamente
        const dialog = document.querySelector(".project__dialog") // selecciona el dialog
        const closeDialog = document.querySelector(".project__dialog-close"); // boton para cerrar el dialog del proyecto
        closeDialog.addEventListener("click", () => dialog.close());

        const openProjectDialog = document.querySelector(".todo__projects-wrapper"); 
        openProjectDialog.addEventListener("click", e => { // al abrir un proyecto, asigna el id del PROYECTO y lo renderiza
            const id = e.target.parentElement.dataset.id;
            this.renderDialog(id);
        })

        const openItemDialog = document.querySelector(".add-task");
        openItemDialog.addEventListener("click", e => { // al darle click a una task desplega la v2 de edicion
            const itemDialog = document.querySelector(".item__dialog");
            itemDialog.showModal();
        })
    }
}

const start = new domIndividualProject();


