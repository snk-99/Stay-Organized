
(() => {
    const userDropdown = $q('#user-dropdown');
    const todoList = $q("#todo-list");


    function getUsers() {
        return fetch('http://localhost:8083/api/users')
            .then(response => response.json())
            .then(users => {
                loadUserDropdown(users);
            })
    }

    function loadUserDropdown(users) {
        userDropdown.innerText = ""
        let option = new Option("Choose A User...");
        userDropdown.appendChild(option);

        users.forEach(user => {
            let option = new Option(user.name, user.id);
            userDropdown.appendChild(option);
            // console.log(option)
        });
    }

    function loadtodos(userId) {
        return fetch('http://localhost:8083/api/todos/byuser/' + userId)
            .then(response => response.json())
            .then(todos => {
                fillTodosList(todos);
            })
    }

    function createToDoCard(todo) {
        const cardDiv = document.createElement("div");
        const descriptionElement = document.createElement("p");
        const categoryElement = document.createElement("p");
        const priorityElement = document.createElement("p");
        const deadlineElement = document.createElement("p");
        // const cardDiv = document.createElement("div");
        descriptionElement.innerText = todo.description
        categoryElement.innerText = todo.category
        priorityElement.innerText = todo.priority
        deadlineElement.innerText = todo.deadline

        cardDiv.append(descriptionElement, categoryElement, priorityElement, deadlineElement)
        return cardDiv
    }


    function fillTodosList(todos) {
        console.log(todos);
        todoList.innerText = ""
        todos.forEach(todo => {
            todoList.appendChild(createToDoCard(todo))
        })
    }

    function userSelectedId() {
        const userId = userDropdown.value;
        loadtodos(userId);
    }


    window.onload = () => {
        getUsers();
        userDropdown.onchange = userSelectedId;
    }
})()