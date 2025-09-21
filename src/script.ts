const todoInput = document.getElementById("todo-input") as HTMLInputElement;
const todoForm = document.getElementById("todo-form") as HTMLFormElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;
const doneList = document.getElementById("done-list") as HTMLUListElement;

type Todo = {
    id: number
    text: string
}
let todos: Todo[] = [];
let doneTasks: Todo[] = [];

const renderTask = (): void =>{
    todoList.innerHTML = '';
    doneList.innerHTML ='';

    todos.forEach((todo) : void => {
       const li = createTodoElement(todo, false);
       todoList.appendChild(li); 
    });

    doneTasks.forEach((todo): void =>{
        const li = createTodoElement(todo, true)
        doneList.appendChild(li);
    })
}

const getTodoText = ():string =>{
    return todoInput.value.trim();
}

const addTodo = (text: string): void =>{
    todos.push({id : Date.now(), text: text});
    //입력창 초기화
    todoInput.value = '';
    renderTask();
}

const completeTodo = (todo: Todo) : void => {
    todos = todos.filter((x): Boolean => x.id !== todo.id)
    doneTasks.push(todo);
    renderTask();
}

const deleteTodo = (todo: Todo): void => {
    doneTasks = doneTasks.filter((x): Boolean => x.id !== todo.id)
    renderTask();
}

/*
동적으로 어떻게 만들 수 있을까?
<ul id="todo-list">
    <li class="todo-container__todo-list-element">
        <p class="todo-container__todo-list-element-text">123</p>
        <button class="todo-container__todo-list-element-button">완료</button>
    </li>
</ul>
*/

//완료되면 true, 안되면 false
const createTodoElement = (todo: Todo, isDone: boolean) : HTMLElement => {
    //<li> 만들기
    const li = document.createElement('li');
    li.classList.add('todo-container__todo-list-element');
    
    //<p> 만들기
    const p = document.createElement('p');
    p.classList.add('todo-container__todo-list-element-text');
    p.textContent = todo.text;

    //<buton> 만들기
    const button = document.createElement('button');
    button.classList.add('todo-container__todo-list-element-button');

    if (isDone){
        button.textContent = '삭제';
        button.style.backgroundColor = 'red';
    } else{
        button.textContent = '완료';
        button.style.backgroundColor = 'rgb(124, 224, 88)'
    }

    button.addEventListener('click', ():void =>{
        if (isDone){
            deleteTodo(todo);
        } else{
            completeTodo(todo);
        }
    })

    //Node : html의 요소
    //appendChild는 Node를 인자로 받음
    li.appendChild(p)
    li.appendChild(button)
    return li;
}

todoForm.addEventListener('submit', (event: Event):void =>{
    event.preventDefault();
    const text = getTodoText();
    if (text){
        addTodo(text);
    }
})
