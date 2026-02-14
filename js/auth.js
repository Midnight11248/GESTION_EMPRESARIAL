document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                setCurrentUser(user);
                window.location.href = "dashboard.html";
            } else {
                alert("Credenciales incorrectas");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const role = document.getElementById("role").value;

            const users = getUsers();

            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password,
                role
            };

            users.push(newUser);
            saveUsers(users);

            alert("Usuario registrado");
            window.location.href = "index.html";
        });
    }
});
