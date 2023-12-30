document.addEventListener('DOMContentLoaded', function () {
    // Recupera o contador de recargas do localStorage ou define como 0 se não existir
    var reloadCount = parseInt(localStorage.getItem('reloadCount')) || 0;

    // Incrementa o contador
    reloadCount++;

    // Atualiza o contador no localStorage
    localStorage.setItem('reloadCount', reloadCount);

    // Verifica se a página foi recarregada duas vezes
    if (reloadCount === 3) {
        // Executa o comando desejado
        console.log('Comando executado na segunda recarga.');
        
        // Limpa o contador para que o comando não seja executado novamente
        localStorage.removeItem('reloadCount');
	// Limpar todos os dados armazenados no localStorage ao recarregar a página
	localStorage.removeItem('loggedIn');
    }

    // Restante do código...
    // Verifica se o usuário está autenticado antes de permitir o acesso às informações
    var isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn && window.location.pathname !== '/login.html') {
        // Se não estiver autenticado e não estiver na página de login, redireciona para a página de login
        window.location.href = 'login.html';
    }
});


function updateInfo() {
    var tipoSeringaSelect = document.getElementById("tipoSeringaSelect");
    var tipoSeringaInfo = document.getElementById("tipoSeringaInfo");

    var selectedTipoSeringa = tipoSeringaSelect.value;
    tipoSeringaInfo.textContent = "TIPO DE SERINGA - " + selectedTipoSeringa;
}

function iniciarTeste() {
    // Obter o tipo de seringa selecionado
    var tipoSeringaSelect = document.getElementById('tipoSeringaSelect');
    var tipoSeringa = tipoSeringaSelect.options[tipoSeringaSelect.selectedIndex].value;

    // Obter o tipo de comando selecionado (ml, ml/min ou rpm)
    var comandoOptions = document.getElementsByName('comando');
    var comandoSelecionado;

    for (var i = 0; i < comandoOptions.length; i++) {
        if (comandoOptions[i].checked) {
            comandoSelecionado = comandoOptions[i].value;
            break;
        }
    }

    // Obter o valor inserido na caixa de texto com base no comando selecionado
    var valorInput;
    switch (comandoSelecionado) {
        case 'ml':
            valorInput = document.getElementById('mlInput').value;
            break;
        case 'ml/min':
            valorInput = document.getElementById('mlMinInput').value;
            break;
        case 'rpm':
            valorInput = document.getElementById('rpmInput').value;
            break;
        default:
            valorInput = null;
    }

    // Verificar se todas as informações necessárias estão disponíveis
    if ((tipoSeringa!== null) && (comandoSelecionado!== null) && (valorInput.trim() !== '')) {
        // Lógica de exemplo: Imprimir informações no console
        console.log('Iniciando teste:');
        console.log('Tipo de seringa:', tipoSeringa);
        console.log('Comando selecionado:', comandoSelecionado);
        console.log('Valor inserido:', valorInput);

        // Lógica adicional: Aqui você adicionaria a lógica real para iniciar o teste
        // Por exemplo, você pode enviar esses dados para um servidor para processamento.
        var nome = comandoSelecionado;
	if(nome == 'ml'){
          nome = 'm'+valorInput;
        }
        else if(nome == 'ml/min'){
          nome = 'n'+valorInput;
        }else{
          nome = 'r'+valorInput;
        }

        if (nome) {
          var url = "https://database1.salomaobraga.repl.co/receber-dados";

          // Construa a URL com os parâmetros
          url += "?nome=" + encodeURIComponent(nome);

          // Faça uma solicitação HTTP usando XMLHttpRequest
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);

          // Lidere com a resposta da solicitação
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              // A resposta do servidor pode ser tratada aqui, se necessário
              console.log("Resposta do servidor:", xhr.responseText);
            }
          };

          // Envie a solicitação
          xhr.send();
        }
        // Avisar que o teste foi iniciado
        alert('Teste iniciado!');
    } else {
        // Avisar se algumas informações estão ausentes
        alert('Por favor, preencha todas as informações antes de iniciar o teste.');
    }
}