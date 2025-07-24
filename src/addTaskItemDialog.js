function renderItemDialogAddNew(id) {
  const itemDialog = document.querySelector(".item__dialog");
  itemDialog.innerHTML = " ";
  itemDialog.innerHTML = `
        <form class="item__dialog-wrapper">

            <div class="item__dialog-item">
                <label for="Title">Title:</label>
                <input type="text" id="Title" class="item">
            </div>
            <div class="item__dialog-item">
                <label for="Description">Description:</label>
                <textarea name="Description" id="Description" class="item"></textarea>
            </div>
            <div class="item__dialog-item">
                <label for="dueDate">Due Date:</label>
                <input type="datetime-local" id="dueDate" class="item">
            </div>
            <div class="item__dialog-item">
                <label for="Priority">Priority:</label>
                <select name="Priority" id="Priority" class="item">
                    <option value="urgent">Urgent</option>
                    <option value="mid">Mid</option>
                    <option value="low">Low</option>
                </select>
            </div>
            <div class="item__dialog-item">
                <input type="submit" class="item__dialog-addTask" value="Add" data-id=${id}>
            </div>

        </form>
    `;
}

export { renderItemDialogAddNew };
