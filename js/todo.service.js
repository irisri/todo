
var gTodos = _createTodos();
var gTodosFilter = 'all';
var gSort = 'created';

function getTodosForDisaply() {
    // sortToDosBeforeDisplay();
    if (gTodosFilter === 'all') {
        sortToDosBeforeDisplay(gTodos)
        return gTodos;
    }

    var todos = gTodos.filter(function (todo) {
        return (gTodosFilter === 'done' && todo.isDone) ||
            (gTodosFilter === 'active' && !todo.isDone)
    })
    sortToDosBeforeDisplay(todos)
    return todos;
}

function sortToDosBeforeDisplay(todos) {
    if (gSort === 'created') todos.sort((toDoA, toDoB) => toDoA.time - toDoB.time);
    else if (gSort === 'importance') todos.sort((toDoA, toDoB) => toDoB.importence - toDoA.importence);
    else todos.sort(compare);
}

function compare(a, b) {
    // Use toUpperCase() to ignore character casing
    var toDoA = a.txt.toUpperCase();
    var toDoB = b.txt.toUpperCase();

    let comparison = 0;
    if (toDoA > toDoB) {
        comparison = 1;
    } else if (toDoA < toDoB) {
        comparison = -1;
    }
    return comparison;
}


function setFilter(filterBy) {
    gTodosFilter = filterBy;
}

function setSort(sortBy) {
    gSort = sortBy;
}

function toggleTodo(todoId) {
    var todo = gTodos.find(function (todo) {
        return todo.id === todoId
    })
    todo.isDone = !todo.isDone;
    saveToStorage('todos', gTodos)
}

function removeTodo(todoId) {
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId
    })
    gTodos.splice(idx, 1)
    saveToStorage('todos', gTodos)
}

function addTodo(txt, importence, time) {
    if (importence > 3) importence = 3;
    if (importence < 1) importence = 1;
    var todo = _createTodo(txt, importence, time);
    gTodos.unshift(todo)
    saveToStorage('todos', gTodos)
}

function getTodosCount() {
    return gTodos.length;
}

function getActiveTodosCount() {
    var activeTodos = gTodos.filter(function (todo) { return !todo.isDone })
    return activeTodos.length
}

function _createTodos() {
    var todos = loadFromStorage('todos')
    if (!todos || !todos.length) {
        var txts = ['Master CSS', 'Learn HTML', 'Become JS Ninja'];
        // todos = txts.map(_createTodo);
        todos = txts.map(txt => {
            return _createTodo(txt);
        })
        saveToStorage('todos', todos)
    }
    return todos;
}

function _createTodo(txt, importence = 0, time = Date.now()) {
    return {
        id: _makeId(),
        txt: txt,
        isDone: false,
        importence: importence,
        time: time
    }
}

function _makeId(length = 3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function sortByParam(todos) {
    todos.sort(function (todo1, todo2) {
        if (gSort === 'txt') {
            var toDoA = a.txt.toUpperCase();
            var toDoB = b.txt.toUpperCase();
            if (toDoA > toDoB) {
                return 1;
            } else if (toDoA < toDoB) {
                return -1;
            }
            return 0;
        } else {
            return todo1[gSort] - todo2[gSort]
        }
    })
}