function toggleForms() {
    var registerDiv = document.getElementById('register-div');
    var loginDiv = document.getElementById('login-div');
    var button = document.getElementById('toggle-button');

    if (registerDiv.style.display === 'none' || getComputedStyle(registerDiv).display === 'none') {
        registerDiv.style.display = 'block';
        loginDiv.style.display = 'none';
        button.textContent = 'Iniciar Sesión';
    } else {
        registerDiv.style.display = 'none';
        loginDiv.style.display = 'block';
        button.textContent = 'Registrarse';
    }
}