
<html lang="pt-br">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="shortcut icon" type="image/x-icon" href="/src/imagens/pizz-favicon.png">
        <title>Página de agendamento</title>
        <!-- Link do CSS do Bootstrap -->
        <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">

        <!-- Script do JavaScript do Bootstrap (necessário para o dropdown funcionar) -->
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.0.0/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    </head>
    <body>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
              <div class="navbar-nav">
                <a class="nav-item nav-link" href="index.html">Cadastro</a>
                <a class="nav-item nav-link" href="login.html">Login</a>
                <a class="nav-item nav-link" href="perfil.html">Perfil</a>
                <!-- Dropdown -->
                <div class="nav-item dropdown">
                  <a class="nav-link dropdown-toggle" href="servicos.html" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Serviços
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <a class="dropdown-item" href="servicos.html">Cadastro</a>
                      <a class="dropdown-item" href="adm.html">Edição</a>
                      <a class="dropdown-item" href="#">Opção 3</a>
                      <div class="dropdown-divider"></div>
                      <a class="dropdown-item" href="#">Configurações</a>
                  </div>
                </div>
                <a class="nav-item nav-link" href="adm.html">Edição</a>
                <a class="nav-item nav-link" href="agendamento.html">Agendamento</a>
              </div>
            </div>
        </nav>
        
    </body>
</html>
