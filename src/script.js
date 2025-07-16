import "./styles.css";
import { ManageProjects, ToDoProject, ToDoItem } from "./classLogic";
import {FormatDate} from "./timeManagement";

class domProjectsManager {
    constructor() {
        this.projectManager = new ManageProjects();
    }

    renderProjects() {
        const whole = this.projectManager.getAllProjects();
        
    }
}