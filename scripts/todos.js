
(() => {
    const $q = (s) => document.querySelector(s);
    const userDropdown = $q('#user-dropdown');
    const usersTodos = $q("#users-todos")

    function loadUserDropdown(users) {
        userDropdown.innerText = ""
        let option = new Option("Choose A User...");
        userDropdown.appendChild(option);

        users.forEach(user => {
            let option = new Option(user.name);
            userDropdown.appendChild(option);
        });
    }

    function getUsers() {
        return fetch('http://localhost:8083/api/users')
            .then(response => response.json())
            .then(users => {
                loadUserDropdown(users)
            })
    }

    function loadtodos() {
        return fetch('http://localhost:8083/api/todos/')
            .then(response => response.json())
            .then(todos => {
                todos.forEach(todo => {
                    usersTodos.innerText = todo.description;
                    console.log(todo)
                });
            })
    }

    function getUserId() {
        const params = new URLSearchParams(location.search);
        return params.get("id");
    }

    const id = getUserId();
    console.log(id);

    window.onload = () => {
        loadtodos()
        getUsers()
    }
})()