function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.points, task.done);
    });
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTaskToDOM(text, points, done) {
    const todoList = document.getElementById('todo-item');
    const taskDiv = document.createElement('div');
    taskDiv.className = 'flex justify-between items-center bg-gray-700 px-4 py-2 mt-5 rounded-md mb-2';
    if (done) {
        taskDiv.classList.add('line-through');
    }
    const taskText = document.createElement('span');
    taskText.textContent = `${text} (${points} points)`;
    const buttonsDiv = document.createElement('div');
    const doneButton = document.createElement('button');
    doneButton.textContent = 'Done';
    doneButton.className = 'text-green-500 mr-2';
    doneButton.addEventListener('click', function() {
        markDone(taskDiv);
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'text-red-500';
    deleteButton.addEventListener('click', function() {
        deleteTask(taskDiv);
    });
    buttonsDiv.appendChild(doneButton);
    buttonsDiv.appendChild(deleteButton);
    taskDiv.appendChild(taskText);
    taskDiv.appendChild(buttonsDiv);
    todoList.appendChild(taskDiv);
}

function addTask() {
    const text = document.getElementById('todo-text').value.trim();
    const points = document.getElementById('todo-points').value.trim();
    if (text === '' || points === '') {
        alert('Please enter both task and points.');
        return;
    }
    const task = { text, points, done: false };
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    saveTasks(tasks);
    addTaskToDOM(text, points, false);
    document.getElementById('todo-text').value = '';
    document.getElementById('todo-points').value = '';
}

function markDone(taskDiv) {
    taskDiv.classList.toggle('line-through');
    const taskText = taskDiv.querySelector('span').innerText;
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.findIndex(task => task.text === taskText);
    tasks[index].done = !tasks[index].done;
    saveTasks(tasks);
}

function deleteTask(taskDiv) {
    const taskText = taskDiv.querySelector('span').innerText;
    const tasks = JSON.parse(localStorage.getItem('tasks'));
    const index = tasks.findIndex(task => task.text === taskText);
    tasks.splice(index, 1);
    saveTasks(tasks);
    taskDiv.remove();
}

document.getElementById('addTaskButton').addEventListener('click', addTask);
loadTasks();