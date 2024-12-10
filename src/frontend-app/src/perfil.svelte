<script>
    import { onMount } from 'svelte';
    import axios from "axios";
    let error = null;
    let resultado = null;
    let usuarioLogado = null;
    let usuarios = null;
    let colunas_usuarios = null;
    const api_base_url = "http://localhost:3000";

    const axiosInstance = axios.create({
        withCredentials: true,
        baseURL: api_base_url,
        responseType: "json",
        headers: {
            Accept: "application/json",
        }
    });

    const carregarUsuarios = async () => {
    try {
      let res = await axiosInstance.get(api_base_url + "/usuarios ", {
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

    const buscarUsuarioLogado = async () => {
      try {
          const res = await axiosInstance.get('/usuarios/me');
          console.log(res.data);
          usuarioLogado = res.data.usuario; // Armazena os dados do usuário
          error = null; // Limpa o erro se a requisição for bem-sucedida
      } catch (err) {
          error = err.response?.data?.message || err.message;
          usuarioLogado = null; // Limpa os dados em caso de erro
      }
    };

  const logout = async () => {
    try {
      let res = await axiosInstance.post("/logout");
      resultado = res.data;

      // Redirecionar para página de login após logout
      if (resultado && resultado.status === "success") { 
            window.location.href = "/login.html";  
      }
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      error = "Erro ao buscar dados: " + err.response?.data?.message || err.message;
      console.error(err);
      resultado = null; // Limpa o resultado em caso de erro
    }
  };

  // Busca os dados do usuário logado e lista dos usuários quando o componente é inicializado
  onMount(() => {
    buscarUsuarioLogado();
    carregarUsuarios();
  }); 

</script>

<main>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <div class="form-container">
      <div class="form">
        {#if error}
            <p style="color: red;">{error}</p>
        {:else if usuarioLogado}
            <h2>Dados do Usuário Logado</h2>
            
            <p><strong>ID:</strong> {usuarioLogado.idUsuario}</p>
            <p><strong>Nome:</strong> {usuarioLogado.nome}</p>
            <p><strong>E-mail:</strong> {usuarioLogado.email}</p>

            <button on:click={logout}>Logout</button>
            
        {:else}
            <p>Carregando dados do usuário...</p>
        {/if}
      </div>
    </div>
</main>