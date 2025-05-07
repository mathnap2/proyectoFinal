function toggleForms(){
    let form_login = document.getElementById('formLogin'),
    form_register = document.getElementById('formRegister');

    if(form_register.style.display == 'none'){
        form_login.style.display = 'none';
        form_register.style.display = 'block';
    }
    else{
        form_login.style.display = 'block';
        form_register.style.display = 'none';
    }
}

function loginUser(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries()))
    })
    .then(res => {
        if (!res.ok) throw new Error('Correo y/o contraseña incorrectos');
        return res.json();
    })
    .then(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location.href = './home.html';
    })
    .catch(err => {
        console.error('Error en login:', err);
        alert(err.message || 'Error al iniciar sesión');
    });
}

function registerUser(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    const password = data.get('password');
    const confirmPassword = data.get('confirmPassword');

    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden 🔐');
        return;
    }

    fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data.entries()))
    })
    .then(res => {
        if (!res.ok) return res.json().then(err => { throw err });
        return res.json();
    })
    .then(result => {
        alert('Cuenta creada exitosamente 🎉');
        sessionStorage.setItem('user', JSON.stringify(result.savedUser));
        window.location.href = './home.html';
    })
    .catch(err => {
        console.error('Error en registro:', err);
        alert(err.error || 'Error al registrar usuario 😢');
    });
}

function userIconClick(event) {
    const user = sessionStorage.getItem('user');

    if (user) {
        // Usuario logueado → ir a su perfil
        window.location.href = './profile.html';
    } else {
        // No logueado → ir al login
        window.location.href = './login.html';
    }
}

function logout(){
    sessionStorage.clear();
    window.location.href = './login.html';
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('formLogin');
    const registerForm = document.getElementById('formRegister');
    const userIcon = document.getElementById('userIcon');

    if (loginForm) loginForm.addEventListener('submit', loginUser);
    if (registerForm) registerForm.addEventListener('submit', registerUser);
    if (userIcon) userIcon.addEventListener('click', userIconClick);
});
