// Get the form, input field, and task list elements
const taskForm = document.getElementById('task-form');
const taskDescription = document.getElementById('task-description');
const tasks = document.getElementById('tasks');

// Event listener for form submission
taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    addTask(taskDescription.value);
    taskDescription.value = '';
});

// Function to add a task
async function addTask(description) {
    const task = { description, completed: false };
    const response = await api.createTask(task);
    if (response.success) {
        tasks.appendChild(createTaskElement(response.task));
    } else {
        console.error(response.error);
    }
}

// Function to create a task element
function createTaskElement(task) {
    const li = document.createElement('li');
    li.textContent = task.description;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => editTask(task));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => deleteTask(task));

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTaskCompletion(task));

    li.appendChild(checkbox);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    return li;
}

// Function to edit a task
async function editTask(task) {
    const newDescription = prompt('Enter new task description', task.description);
    if (newDescription) {
        task.description = newDescription;
        const response = await api.updateTask(task);
        if (!response.success) {
            console.error(response.error);
        }
    }
}

// Function to delete a task
async function deleteTask(task) {
    const response = await api.deleteTask(task);
    if (response.success) {
        tasks.removeChild(document.getElementById(task.id));
    } else {
        console.error(response.error);
    }
}

// Function to toggle task completion
async function toggleTaskCompletion(task) {
    task.completed = !task.completed;
    const response = await api.updateTask(task);
    if (!response.success) {
        console.error(response.error);
    }
}

// Function to load tasks on page load
window.onload = async () => {
    const response = await api.getTasks();
    if (response.success) {
        response.tasks.forEach(task => tasks.appendChild(createTaskElement(task)));
    } else {
        console.error(response.error);
    }
};
