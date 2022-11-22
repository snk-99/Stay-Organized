
(() => {
    const userDropdown = $q('#user-dropdown');
    const usersTodos = $q("#users-todos")


    function getUsers() {
        return fetch('http://localhost:8083/api/users')
            .then(response => response.json())
            .then(users => {
                loadUserDropdown(users)
            })
    }

    function loadUserDropdown(users) {
        userDropdown.innerText = ""
        let option = new Option("Choose A User...");
        userDropdown.appendChild(option);

        users.forEach(user => {
            let option = new Option(user.name, user.id);
            userDropdown.appendChild(option);
            console.log(option)
        });
    }

    function loadtodos(userId) {
        return fetch('http://localhost:8083/api/todos/byuser/' + userId)
            .then(response => response.json())
            .then(todos => {
                fillTodosList(todos)
            })
    }

    function fillTodosList(todos) {
        console.log(todos)
    }

    function userSelectedId() {
        const userId = userDropdown.value
        loadtodos(userId)
    }


    window.onload = () => {
        getUsers()
        userDropdown.onchange = userSelectedId;
    }
})()