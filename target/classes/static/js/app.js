// URL base para backend
const BASE_URL = "/api/auth";

document.addEventListener("DOMContentLoaded", () => {
    // Detectar qué página estamos para asignar eventos
    if (document.getElementById("loginForm")) {
        setupLogin();
    }
    if (document.getElementById("registerForm")) {
        setupRegister();
    }
    if (document.getElementById("logoutBtn")) {
        setupMain();
    }
});

function setupLogin() {
    const form = document.getElementById("loginForm");
    const message = document.getElementById("loginMessage");

    form.addEventListener("submit", async e => {
        e.preventDefault();
        const username = form.username.value.trim();
        const password = form.password.value.trim();

        const res = await fetch(`${BASE_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        const data = await res.json();

        if(data.success){
            // Guardar usuario en sessionStorage para main
            sessionStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "main.html";
        } else {
            message.textContent = data.message || "Error en el login";
        }
    });
}

function setupRegister() {
    const form = document.getElementById("registerForm");
    const message = document.getElementById("registerMessage");

    form.addEventListener("submit", async e => {
        e.preventDefault();
        const user = {
            nombre: form.nombre.value.trim(),
            edad: parseInt(form.edad.value),
            estadoCivil: form.estadoCivil.value,
            username: form.username.value.trim(),
            password: form.password.value.trim()
        };

        const res = await fetch(`${BASE_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user)
        });

        const data = await res.json();

        if(data.success){
            message.style.color = "green";
            message.textContent = data.message;
            setTimeout(() => {
                window.location.href = "login.html";
            }, 1500);
        } else {
            message.style.color = "red";
            message.textContent = data.message || "Error en el registro";
        }
    });
}

function setupMain() {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    document.getElementById("userName").textContent = user.nombre;
    document.getElementById("userEdad").textContent = user.edad;
    document.getElementById("userEstadoCivil").textContent = user.estadoCivil;

    const logoutBtn = document.getElementById("logoutBtn");
    logoutBtn.addEventListener("click", () => {
        sessionStorage.removeItem("user");
        window.location.href = "login.html";
    });
}
