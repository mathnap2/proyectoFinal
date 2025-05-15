function toggleForms() {
    let form_login = document.getElementById('formLogin'),
        form_register = document.getElementById('formRegister');

    if (form_register.style.display === 'none') {
        form_login.style.display = 'none';
        form_register.style.display = 'block';
    } else {
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
    .then(res => res.json())
    .then(response => {
        if (response.error || response.message === 'Usuario no encontrado' || response.message === 'Contraseña incorrecta') {
            throw new Error(response.message || 'Error al iniciar sesión');
        }
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        window.location.href = './home.html';
    })
    .catch(err => {
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
    .then(res => res.json())
    .then(response => {
        if (response.message === 'Correo ya registrado' || response.error) {
            throw new Error(response.message || response.error);
        }
        alert('Cuenta creada exitosamente 🎉');
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        window.location.href = './home.html';
    })
    .catch(err => {
        alert(err.message || 'Error al registrar usuario');
    });
}

function logout() {
    localStorage.clear();
    window.location.href = './login.html';
}

function deleteAccount() {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');

    if (!user || !token) {
        alert('Usuario no autenticado');
        return;
    }

    const confirmDelete = confirm("¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.");

    if (!confirmDelete) return;

    fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(res => {
        if (!res.ok) throw new Error("Error al eliminar la cuenta");
        return res.json();
    })
    .then(response => {
        alert("Cuenta eliminada correctamente 👋");
        localStorage.clear();
        window.location.href = "./login.html";
    })
    .catch(err => {
        alert(err.message || "Error inesperado al eliminar cuenta");
    });
}

function updateUserInfo(event) {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem('user'));
    const token = localStorage.getItem('token');
    if (!user || !token) {
        alert('Usuario no autenticado');
        return;
    }

    const newEmail = document.getElementById('newEmail').value.trim();
    const newPassword = document.getElementById('newPassword').value.trim();

    const updateObj = {};
    if (newEmail) updateObj.email = newEmail;
    if (newPassword) updateObj.password = newPassword;

    fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateObj)
    })
    .then(res => res.json())
    .then(result => {
        if (result.error) throw new Error(result.error);
        alert('Información actualizada correctamente ✅');
        const updatedUser = { ...user, ...updateObj };
        localStorage.setItem('user', JSON.stringify(updatedUser));
    })
    .catch(err => {
        alert(err.message || 'Error al actualizar');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('formLogin');
    const registerForm = document.getElementById('formRegister');
    const updateForm = document.getElementById('updateForm');

    if (loginForm) loginForm.addEventListener('submit', loginUser);
    if (registerForm) registerForm.addEventListener('submit', registerUser);
    if (updateForm) updateForm.addEventListener('submit', updateUserInfo);
});
