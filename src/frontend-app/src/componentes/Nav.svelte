<html lang="pt-br">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Página</title>
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
            <a class="nav-item nav-link" href="servicos.html">Serviço</a>
            <a class="nav-item nav-link" href="agendamento.html">Agendamento</a>
            <div class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Edição
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="adm_servico.html">Edição de serviço</a>
                <a class="dropdown-item" href="adm.html">Edição de usuário</a>
              </div>
            </div>
          </div>
        </div>
    </nav>
      
  </body>
</html>
