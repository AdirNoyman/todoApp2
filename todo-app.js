// jshint esversion: 6
"use strict";

let todoList = getSavedTodos();

let filters = {

    textSearch: ''
};

let showUnfinished = true;

displayTodos();

document.querySelector('#search-todo').addEventListener('input', event => {

    filters.textSearch = event.target.value;
    displayTodos();
});

// Add new todo
document.querySelector('#addTodoForm').addEventListener('submit', event => {

    // prevent automatic refresh
    event.preventDefault();
    const text = event.target.elements.todoText.value.trim();
    console.log(text);

    if (text) {

        todoList.push({

            id: uuidv4(),
            text,
            completed: false

        });

        saveTodos(todoList);
        event.target.elements.todoText.value = '';
        // todoTodos = todoList.filter(todo => !todo.completed);
        displayTodos();
    }
});

document.querySelector('#unfinished').addEventListener('change', event => {

    showUnfinished = !event.target.checked;
    displayTodos();

});




