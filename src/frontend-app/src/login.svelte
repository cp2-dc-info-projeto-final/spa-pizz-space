<script>
  import axios from "axios";

  let email = "";
  let senha = "";
  let error = null;
  let usuarios = null;
  let colunas_usuarios = null;
  let resultado = null;

  const API_BASE_URL = "http://localhost:3000";

  const axiosInstance = axios.create({
        withCredentials: true,
        baseURL: API_BASE_URL,
        responseType: "json",
        headers: {
                Accept: "application/json",
            }
    });
    
    const loginUsuario = async () => {
      try {
        let res = await axiosInstance.post("/login",
          {
            email,
            senha
          }
        );

        resultado = res.data;

        // Redirecionar para uma página protegida após login bem-sucedido
        if (resultado && resultado.status === "success") { 
            window.location.href = "/index.html";  
        }
        error = null; // Limpa o erro se a requisição for bem-sucedida
      } catch (err) {
        error = err.response?.data?.message || err.message;
        resultado = null; // Limpa o resultado em caso de erro
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
            <label for="email">E-mail:</label>
            <input type="email" id="email" bind:value={email} required/>
            </div>
            <div> 
            <label for="password">Senha:</label>
            <input type="password" id="password" bind:value={senha} required/>
            </div>
            <button type="submit">Entrar</button>
    </div>
</main>