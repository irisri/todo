console.log('Hi');

function onInit() {
    renderTodos();
}

function renderTodos() {
    var todos = getTodosForDisaply();
    if (!todos || todos.length === 0) {
        var addInfo;
        if (getTodosCount() === 0) addInfo = '';
        else if (getActiveTodosCount() === 0) addInfo = ' active';
        else addInfo = ' Done';
        var message = `No${addInfo} todos` // No Active Todos, No Done Todos
        return document.querySelector('.todo-list').innerHTML = `<h2>${message}</h2>`;
    }
    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone) ? 'done' : '';
        return `<li onclick="onTodoClicked('${todo.id}')" class="${className}">
                    ${todo.txt}
                    <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
                </li>`
    })
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
    document.querySelector('.total-count').innerText = getTodosCount();
    document.querySelector('.active-count').innerText = getActiveTodosCount();

}

function onTodoClicked(todoId) {
    toggleTodo(todoId);
    renderTodos();
}

function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();
    var isConfirm = confirm('Are you sure?')
    if (isConfirm) removeTodo(todoId)
    renderTodos();
}

function onAddTodo() {
    var timeStemp = new Date();
    var elTxts = document.querySelectorAll('input');
    var inputs = [];
    elTxts.forEach(elTxt => inputs.push(elTxt.value));
    if (!inputs[0] || !inputs[1]) {
        alert('You forgot somthing!');
        return;
    }
    addTodo(inputs[0], +inputs[1], timeStemp);
    elTxts.forEach(elTxt => elTxt.value = '');
    renderTodos();
    // var elTxt = document.querySelector('input')
    // var txt = elTxt.value;
    // addTodo(txt)
    // elTxt.value = '';
    // renderTodos();
}

function onSetFilter(filterBy) {
    setFilter(filterBy);
    renderTodos();
}

function onSort(sortBy) {
    setSort(sortBy);
    renderTodos()
}