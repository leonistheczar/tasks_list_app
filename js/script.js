// Storing tags as variables

const text_input = document.getElementById('text');
const submit_input = document.getElementById('submit');
const filter_task = document.getElementById('filter-text');
const clearBtn = document.querySelector('.btn-black');
const addedTasks = document.querySelector('.task-box');
const task_form = document.querySelector('.task-form');
const task_list = document.querySelector('.task-box-list');

// Event Listeners Execution
document.addEventListener('DOMContentLoaded',  taskFromLocalStorage);
task_form.addEventListener('submit', addTask);
addedTasks.addEventListener('click', removeTask);
clearBtn.addEventListener('click', clearTasks);
filter_task.addEventListener('keyup', filterTasks);

// Events Functions

// Retrive tasks from LS
function taskFromLocalStorage() {
    var taskInputValue = text_input.value;
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else{
       tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(taskInputValue){
     // Create a particular div for every task
     const newDIV = document.createElement('div');
     newDIV.className = "task-box-item flex justify-between px-3 ";

     // Li tag (Task)
     var newTask = document.createElement('li');
     newTask.className = "task-list list-none text-l px-4 py-2";
     newTask.textContent = taskInputValue;

     // Delete a particular task (link)
     const deleteTask = document.createElement('a');
     deleteTask.className = "delete_task self-center";
     deleteTask.href = '#';
     
     // Delete a particular task (icon)
     const deleteIcon = document.createElement('i');
     deleteIcon.className = 'fa-solid fa-xmark fa-lg text-red-700';

     
     addedTasks.appendChild(newDIV);
     newDIV.appendChild(newTask);
     deleteTask.appendChild(deleteIcon);
     newDIV.appendChild(deleteTask);
    });
}

// Add Function
function addTask(e) {
    const taskInputValue = text_input.value.trim();
    if (taskInputValue !== "") {
        // Create a particular div for every task
        const newDIV = document.createElement('div');
        newDIV.className = "task-box-item flex justify-between px-3 ";

        // Li tag (Task)
        var newTask = document.createElement('li');
        newTask.className = "task-list list-none text-l px-4 py-2";
        newTask.textContent = taskInputValue;

        // Delete a particular task (link)
        const deleteTask = document.createElement('a');
        deleteTask.className = "delete_task mt-[8px] self-center";
        deleteTask.href = '#';
        
        // Delete a particular task (icon)
        const deleteIcon = document.createElement('i');
        deleteIcon.className = 'fa-solid fa-xmark fa-lg text-red-700';

        // Append all tags
        addedTasks.appendChild(newDIV);
        newDIV.appendChild(newTask);
        deleteTask.appendChild(deleteIcon);
        newDIV.appendChild(deleteTask);

        // Set to LS
        storeTaskInLocalStorage(taskInputValue);
    }
    else{
        alert('Field empty! No task added.'); 

    }
    // Set text field to empty again
    text_input.value = '';
    e.preventDefault();
}

// Persist the tasks to store in Local Storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else{
       tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    if (tasks !== "") {        
    tasks.push(task);
    localStorage.setItem('tasks' , JSON.stringify(tasks));
    }
}
// Remove a specific task
function removeTask(e) {
    const taskToRemove = e.target.parentElement.parentElement;
    if(e.target.parentElement.classList.contains('delete_task')){
        taskToRemove.remove();
    }
    removeTaskFromLocalStorage(taskToRemove);
    e.preventDefault();
}
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    }
    else{
       tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.firstChild.textContent === task)
        tasks.splice(index, 1);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks
function clearTasks(e) {
    if(e.target.classList.contains('btn-black')){
        if (confirm('Are you sure you want to remove all the tasks?')) {
            document.querySelector('.task-box').remove();
        }
    }
    localStorage.clear();
}

// Function to filter tasks
function filterTasks() {
     // Create a particular div for every task
     const newDIV = document.createElement('div');
     newDIV.className = "task-box-item flex justify-between px-3 ";
    // Get the filter value (converted to lowercase for case-insensitive matching)
    const filterValue = filter_task.value.toLowerCase();
    
    const tasks = document.querySelectorAll('.task-box-item')
    
    // Loop through each task
    Array.from(tasks).forEach(function(task) {
        // Get the text content of the task (converted to lowercase)
        const taskText = task.querySelector('.task-list').textContent.toLowerCase();
        
        // Check if the task text contains the filter value
        if (taskText.includes(filterValue)) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}


