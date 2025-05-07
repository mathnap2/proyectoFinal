function validateLogin() {
    const isLoggedIn = !!sessionStorage.user;
    const currentPath = window.location.pathname;  // Solo la ruta del archivo

    // Si NO está logueado y NO está en login.html → forzar ir al login
    if (!isLoggedIn && !currentPath.endsWith('/login.html')) {
        alert("Favor de iniciar sesión");
        window.location.href = './login.html';
    }

    // Si está logueado y está en login.html → enviarlo al home
    if (isLoggedIn && currentPath.endsWith('/login.html')) {
        window.location.href = './home.html';
    }
}

validateLogin();
