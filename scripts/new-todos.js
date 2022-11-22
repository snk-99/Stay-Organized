
(() => {
    const userDropdown = $q('#user-dropdown');
    const categoryDropdown = $q('#category-dropdown');


    function getUsers() {
        return fetch('http://localhost:8083/api/users')
            .then(response => response.json())
            .then(users => {
                loadUserDropdown(users);
            })
    }

    function getCategories() {
        return fetch('http://localhost:8083/api/categories')
            .then(response => response.json())
            .then(categories => {
                loadCategoriesDropdown(categories);
            })
    }


    function loadCategoriesDropdown(categories) {
        categoryDropdown.innerText = ""
        let option = new Option("Choose A category...");
        categoryDropdown.appendChild(option);

        categories.forEach(category => {
            let option = new Option(category.name, category.id);
            categoryDropdown.appendChild(option);
            // console.log(option)
        });
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




    window.onload = () => {
        getUsers();
        // userDropdown();
        getCategories()
    }
})()