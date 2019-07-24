// jshint esversion: 6
"use strict";

// READ EXISTING TODOS FROM LOCAL STORAGE:
// Check for existing saved data (read data in local storage >>> read it >>> parse it to JS )
const getSavedTodos = () => {

    const todosJSON = localStorage.getItem('todoList');

    try {

        return todosJSON ? JSON.parse(todosJSON) : [];

    } catch (e) {

        return [];
    }


};

// Save the todos to locaLstorage
const saveTodos = todoList => localStorage.setItem('todoList', JSON.stringify(todoList));

const removeTodo = id => {

    const todoIndex = todoList.findIndex(todo => {

        return todo.id === id;
    });

    if (todoIndex > -1) {

        todoList.splice(todoIndex, 1);
    }


};

// Get unfinished todos
const getUnfinishedTodos = todoList => todoList.filter(todo => !todo.completed);


// Display todos
const displayTodos = () => {



    // Summary
    let todoTodos = getUnfinishedTodos(todoList);

    let unfinishedTodos = todoList.filter(todo => {

        return todo.text.toLowerCase().includes(filters.textSearch.toLowerCase());

    });


    document.querySelector('#what-left').textContent = `You have ${todoTodos.length} unfinished ${todoTodos.length === 1 ? 'todo' : 'todos'}`;
    document.querySelector('#what-left').classList.add('list-title');

    document.querySelector('#todo-list').innerHTML = '';

    if (!showUnfinished) {

        unfinishedTodos = unfinishedTodos.filter(todo => !todo.completed);

    }

    if (unfinishedTodos.length) {
        // Print a 'p' for each todo
        generateTodoDOM(unfinishedTodos);

    } else {

        const messageEmptyList = document.createElement('p');
        messageEmptyList.textContent = 'No Todos to show';
        document.querySelector('#todo-list').appendChild(messageEmptyList);

    }


};



// Generate the todos display in the dome
const generateTodoDOM = todos => {

    todos.forEach(todo => {

        const newTodo = document.createElement('label');
        const containerElement = document.createElement('div');
        const checkTodo = document.createElement('input');
        const spanElement = document.createElement('span');
        const removeButton = document.createElement('button');

        // Setup container
        newTodo.classList.add('list-item');
        containerElement.classList.add('list-item__container');
        newTodo.appendChild(containerElement);

        spanElement.textContent = todo.text;
        removeButton.textContent = 'remove';
        removeButton.classList.add('button', 'button--text');
        checkTodo.setAttribute('type', 'checkbox');
        checkTodo.checked = todo.completed;
        containerElement.appendChild(checkTodo);
        containerElement.appendChild(spanElement);
        newTodo.appendChild(removeButton);

        removeButton.addEventListener('click', () => {

            removeTodo(todo.id);
            saveTodos(todoList);
            displayTodos();

        });

        // Toggle the completed value for a given todo
        checkTodo.addEventListener('change', () => {

            todo.completed = !todo.completed;
            saveTodos(todoList);
            displayTodos();

        });

        // Setup container
        newTodo.classList.add('list-item');
        containerElement.classList.add('list-item__container');

        document.querySelector('#todo-list').appendChild(newTodo);

    });

};







