const txtTask=document.getElementById("task-input");
let tasksArray=[];
const listContainer = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");

taskForm.addEventListener("submit",(e)=>{
    e.preventDefault();
const task = txtTask.value.trim();
    if (task === "") {
        return;
    }
    addTask(task);
    txtTask.value = "";
})

document.addEventListener('DOMContentLoaded',()=>{
    RanderTasks();
})


function SaveTask(TaskArray)
{
    const Key="todoList_tasks";

    localStorage.setItem(Key,JSON.stringify(TaskArray));
}
function addTask(userInputText)
{
    
const newTask = {
    id: Date.now(),
    title: userInputText,   
    isCompleted: false    
}
tasksArray.push(newTask);
 SaveTask(tasksArray);
 RanderTasks();
}
function toggleTask(id)
{
    tasksArray = tasksArray.map(task => {
        if (task.id === id) {
            return { ...task, isCompleted: !task.isCompleted };
        }
        return task;
    });
    SaveTask(tasksArray);
    RanderTasks();
}
function deleteTask(id) {
    tasksArray = tasksArray.filter(task => task.id !== id);
    SaveTask(tasksArray);
    RanderTasks();
}
function RepresentTasks(taskId,taskTitle,isCompleted)
{
   const taskItem = document.createElement('li');
        taskItem.classList.add("task-item");
        const taskLabel=document.createElement('label');
        taskLabel.classList.add("task-label");
         const taskCheckbox=document.createElement("input");
         taskCheckbox.type="checkbox"
         taskCheckbox.classList.add("task-checkbox");
         taskCheckbox.checked=isCompleted;
         taskCheckbox.addEventListener('change',()=>{
            toggleTask(taskId);
         });
        const customCheckbox = document.createElement('span');
        customCheckbox.classList.add("custom-checkbox");
        const taskText = document.createElement('span');
        taskText.classList.add("task-text");
        taskText.textContent = taskTitle;
        taskLabel.appendChild(taskCheckbox);
        taskLabel.appendChild(customCheckbox);
        taskLabel.appendChild(taskText);

        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add("delete-btn");
        deleteBtn.innerHTML = `
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
        `;
        deleteBtn.addEventListener('click', () => {
        deleteTask(taskId);
    });
        taskItem.appendChild(taskLabel);
        taskItem.appendChild(deleteBtn);
        return taskItem;
}
function RanderTasks()
{
    listContainer.innerHTML = "";
    const savedData = localStorage.getItem('todoList_tasks');
     tasksArray = savedData ? JSON.parse(savedData) : [];
    tasksArray.forEach(element => {
        const item=RepresentTasks(element.id,element.title,element.isCompleted);
        listContainer.appendChild(item);
    })
}