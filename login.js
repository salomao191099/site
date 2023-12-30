function validateLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');

    // Lista de usuários válidos
    var validUsers = {
        'salomao': 'cct',
        'ingrid': 'cct',
        'admin': 'cct'
    };

    // Verifica se o usuário e a senha correspondem a um usuário válido
    if (validUsers.hasOwnProperty(username) && validUsers[username] === password) {
        // Armazena o estado de login no armazenamento local
        localStorage.setItem('loggedIn', 'true');

        // Redireciona para a página principal (indexForm.html) após o login bem-sucedido
        window.location.href = 'indexForm.html';
        return false; // Evita que o formulário seja enviado
    } else {
        errorMessage.textContent = 'Usuário ou senha inválidos.';
        return false; // Evita que o formulário seja enviado
    }
}
