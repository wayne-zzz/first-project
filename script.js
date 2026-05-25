const addBtn = document.getElementById("plusSign");
const closeBtn = document.getElementById("closeSign");
const taskBar = document.getElementById("taskBar");
const dueBar = document.getElementById("dueBar");
const priBar = document.getElementById("priBar");
const taskCtr = document.getElementById("taskCtr");
const taskCheckedCtr = document.getElementById("taskCheckedCtr");
const inputBar = document.getElementById("inputBar");
const createBtn = document.getElementById("createBtn");
const editBtn = document.getElementById("editBtn");
const uneditBtn = document.getElementById("uneditBtn");
const selectedSort = document.getElementById("sort");
const currentDate = document.getElementById("date");

function updateDate(){
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const now = new Date().toLocaleDateString(undefined, options);
    currentDate.textContent = `Date: ${now}`;
}

updateDate();

const retrievedCheckedData = localStorage.getItem('savedCheckedTasks');
const retrievedChecked = JSON.parse(retrievedCheckedData) || [];

var checkedArray = [...retrievedChecked];

const retrievedData = localStorage.getItem('savedTasks');
const retrievedTasks = JSON.parse(retrievedData) || [];

var taskArray = [...retrievedTasks];


var Index = taskArray.reduce((max, task) => {
    return Math.max(max, task.id);
}, 0);

let editMode = false;


// '+' button functionality
addBtn.addEventListener('click', (e) => {
    
    // 1. Toggling '+' and 'close' buttons
    addBtn.style.display = "none"; 
    closeBtn.style.display = "";
    
    // 2. Task bar appears
    taskBar.style.display = "";
    
    // 3. All tasks dim out
    taskCtr.style.opacity = "0.5";
})


// 'Add' button functionality
createBtn.addEventListener('click', (e) => {
    
    const x = inputBar.value;
    const y = dueBar.value;
    const z = priBar.value;
    
    //Error message when any bar is empty
    if(x.trim() === "" || y.trim() === "" || z.trim() === ""){
        inputBar.setAttribute('placeholder', 'Task bar empty! Please enter a task before adding');
        priBar.setAttribute('placeholder', 'Priority bar empty! Please enter a number before adding');
        return;
    }
    
    // For tracking Index purposes
    Index += 1;
    
    // Adding task into Array
    taskArray.push({
        id: Index,
        Task: x, 
        Due: y, 
        Priority: Number(z)
    });
    
    // Render tasks
    updateApp();
    
    // Reseting Input bar
    inputBar.value = '';
    
    // Reseting Due bar
    dueBar.value = '';
    
    // Reseting Priority bar
    priBar.value = '';
    
    // Resets placeholder
    resetPlaceholders();
    
});


// Functionality of 'close' button for '+'
closeBtn.addEventListener('click', (e) => {
    
    // Toggling of '+' and 'close' buttons
    closeBtn.style.display = "none"; 
    addBtn.style.display = "";
    
    // Hiding of Task bar
    taskBar.style.display = "none";
    
    // Undim of tasks
    taskCtr.style.opacity = "1";
    
    // Resets placeholder
    resetPlaceholders();
    
});


// Functionality of 'EDIT' button
editBtn.addEventListener('click', (e) => {
    
    // Toggles buttons
    editBtn.style.display = "none";
    uneditBtn.style.display = "";
    
    // Resets placeholder
    resetPlaceholders();
    
    // Shows tool buttons
    editMode = true;
    renderTasks();
    
});


// Functionality of CANCEL button
uneditBtn.addEventListener('click', (e) => {
    
    // Toggles buttons
    uneditBtn.style.display = "none";
    editBtn.style.display = "";
    
    // Hides tool buttons
    editMode = false;
    renderTasks();
});


const renderTasks = () => {
    
    taskCtr.replaceChildren();
    taskCheckedCtr.replaceChildren();

    const sortedTasks = sortTasksByCategory();
    
    sortedTasks.forEach((item) => {

        const leftSide = document.createElement('div');
        leftSide.className = 'leftSide';

        const rightSide = document.createElement('div');
        rightSide.className = 'rightSide';
        
        // To store Task and Editors in one div
        const taskDiv = document.createElement('div');
        taskDiv.className = 'taskDiv';
        
        // Creating Task
        const task = document.createElement('p');
        task.textContent = item.Task;
        
        const dueDate = document.createElement('p');
        dueDate.textContent = item.Due;
        
        // To store Editors in one div
        const editors = document.createElement('div');
        editors.className = 'editors'
        
        // Creating edit Editor
        const editTask = document.createElement('button');
        editTask.textContent = '✍️';
        
        // Creating delete Editor
        const deleteTask = document.createElement('button');
        deleteTask.textContent = '🗑️';
        
        // Creating checkbox
        const checkTask = document.createElement('input');
        checkTask.setAttribute('type', 'checkbox');

        checkTask.addEventListener('click', () => {
            if(checkTask.checked){
                taskArray = taskArray.filter(task => task.id !== item.id);
                checkedArray.push(item);

                updateApp();
            }
        })
        

        deleteTask.addEventListener('click', () => {
            taskArray = taskArray.filter(task => task.id !== item.id);
            
            updateApp();
        });
        
        
        editTask.addEventListener('click', () => {       
            const editedTask = prompt(
                "Edit task:",
                item.Task
            );

            if (editedTask === null) return;

            item.Task = editedTask;

            updateApp();
        });

        
        // Functionality of editMode
        if(editMode){
            editors.style.display = "inline";
        }
        else{
            editors.style.display = "none";
        }
        
        // Adding to index.html
        editors.appendChild(editTask);
        editors.appendChild(deleteTask);

        leftSide.appendChild(checkTask);
        leftSide.appendChild(task);

        rightSide.appendChild(dueDate);
        rightSide.appendChild(editors);

        taskDiv.appendChild(leftSide);
        taskDiv.appendChild(rightSide);
        
        taskCtr.appendChild(taskDiv);
        
    });

    checkedArray.forEach((item) => {
        
        const checkedTaskDiv = document.createElement('div');
        checkedTaskDiv.className = 'checkedTaskDiv';

        const checkedTask = document.createElement('p');
        checkedTask.textContent = item.Task;

        const checkedDue = document.createElement('p');
        checkedDue.textContent = item.Due;

        // Creating checkbox
        const uncheckTask = document.createElement('input');
        uncheckTask.setAttribute('type', 'checkbox');
        uncheckTask.checked = true;

        // Creating delete Editor
        const deleteCheckTask = document.createElement('button');
        deleteCheckTask.textContent = '🗑️';

        uncheckTask.addEventListener('click', () => {
            if(!uncheckTask.checked){
                checkedArray = checkedArray.filter(task => task.id !== item.id);
                taskArray.push(item);

                updateApp();
            }
        })
    

        deleteCheckTask.addEventListener('click', () => {
            checkedArray = checkedArray.filter(task => task.id !== item.id);
            
            updateApp();
        });

        
        // Functionality of editMode
        if(editMode){
            deleteCheckTask.style.display = "inline";
        }
        else{
            deleteCheckTask.style.display = "none";
        }

        checkedTaskDiv.appendChild(checkedTask);
        checkedTaskDiv.appendChild(checkedDue);
        checkedTaskDiv.appendChild(uncheckTask);
        checkedTaskDiv.appendChild(deleteCheckTask);

        taskCheckedCtr.appendChild(checkedTaskDiv);
        
    })

};



function resetPlaceholders(){
    // Resets input bar placeholder
    inputBar.setAttribute('placeholder', 'Enter task here');
    
    // Resets priority bar placeholder
    priBar.setAttribute('placeholder', 'Enter Priority here');
};


function sortTasksByCategory(){
    
    let sortedArray = [...taskArray];
    
    switch(selectedSort.value){
        case "Due_date":

            // Sort by 'Due', smallest to largest date
            sortedArray.sort((a, b) => {
                return new Date(a.Due) - new Date(b.Due);
            });
            
            break;
            
        case "Priority": 
            
            // Sort by 'Priority', smallest to largest number
            sortedArray.sort((a, b) => {
                return a.Priority - b.Priority;
            });
            
            break;
            
        };
        
        return sortedArray;
    };
    
    selectedSort.addEventListener('change', () => {
        updateApp();
    });

    const saveTasksStorage = () => {
        localStorage.setItem('savedTasks', JSON.stringify(taskArray));
    };
    
    const saveCheckedTasksStorage = () => {
        localStorage.setItem('savedCheckedTasks', JSON.stringify(checkedArray));
    };

    function updateApp(){
        renderTasks();
        saveTasksStorage();
        saveCheckedTasksStorage();
    }
    
    renderTasks();