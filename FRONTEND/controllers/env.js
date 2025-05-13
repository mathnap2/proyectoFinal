function validateLogin() {
    const token = localStorage.getItem('token');
    const currentPath = window.location.pathname;

    if (!token && !currentPath.endsWith('/login.html')) {
        alert("Favor de iniciar sesión");
        window.location.href = './login.html';
    }

    if (token && currentPath.endsWith('/login.html')) {
        window.location.href = './home.html';
    }
}

validateLogin();
