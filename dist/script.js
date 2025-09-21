"use strict";
const todoInput = document.getElementById("todo-input");
const todoForm = document.getElementById("todo-form");
const todoList = document.getElementById("todo-list");
const doneList = document.getElementById("done-list");
let todos = [];
let doneTasks = [];
const renderTask = () => {
    todoList.innerHTML = '';
    doneList.innerHTML = '';
    todos.forEach((todo) => {
        const li = createTodoElement(todo, false);
        todoList.appendChild(li);
    });
    doneTasks.forEach((todo) => {
        const li = createTodoElement(todo, true);
        doneList.appendChild(li);
    });
};
const getTodoText = () => {
    return todoInput.value.trim();
};
const addTodo = (text) => {
    todos.push({ id: Date.now(), text: text });
    todoInput.value = '';
    renderTask();
};
const completeTodo = (todo) => {
    todos = todos.filter((x) => x.id !== todo.id);
    doneTasks.push(todo);
    renderTask();
};
const deleteTodo = (todo) => {
    doneTasks = doneTasks.filter((x) => x.id !== todo.id);
    renderTask();
};
const createTodoElement = (todo, isDone) => {
    const li = document.createElement('li');
    li.classList.add('todo-container__todo-list-element');
    const p = document.createElement('p');
    p.classList.add('todo-container__todo-list-element-text');
    p.textContent = todo.text;
    const button = document.createElement('button');
    button.classList.add('todo-container__todo-list-element-button');
    if (isDone) {
        button.textContent = '삭제';
        button.style.backgroundColor = 'red';
    }
    else {
        button.textContent = '완료';
        button.style.backgroundColor = 'rgb(124, 224, 88)';
    }
    button.addEventListener('click', () => {
        if (isDone) {
            deleteTodo(todo);
        }
        else {
            completeTodo(todo);
        }
    });
    li.appendChild(p);
    li.appendChild(button);
    return li;
};
todoForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = getTodoText();
    if (text) {
        addTodo(text);
    }
});
