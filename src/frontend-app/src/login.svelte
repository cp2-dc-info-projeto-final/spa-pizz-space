<script>
    import axios from "axios";

    let email = "";
    let senha = "";
    let error = null;
    let usuarios = null;
    let colunas_usuarios = null;
    
    function handleSubmit(event) {
      event.preventDefault();
    };
    
    const carregarUsuarios = async () => {
    try {
      let res = await axios.get("/usuarios", {
        responseType: "json",
        headers: {
          Accept: "application/json",
        },
      });
      usuarios = res.data.usuarios;
      colunas_usuarios = Object.keys(usuarios[0]);
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      error = "Erro ao buscar dados: " + err.response?.data?.message || err.message;;
      console.error(err);
      usuarios = null; // Limpa o resultado em caso de erro
    }
  };
  
  </script>

<main>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <div class="login-container">
        <h2>Login</h2>
        <form on:submit={handleSubmit}>
            <div>
            <label for="email">Email:</label>
            <input type="email" id="email" bind:value={email} required/>
            </div>
            <div> 
            <label for="password">senha:</label>
            <input type="password" id="password" bind:value={senha} required/>
            </div>
            <button type="submit">Entrar</button>
    </div>
</main>