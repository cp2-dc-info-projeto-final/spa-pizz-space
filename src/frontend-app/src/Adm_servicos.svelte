<script>
  import axios from "axios";
  import Nav from "./componentes/Nav.svelte";

  let nomeS = '';
  let descricao = '';
  let preco = '';
  let error = null;
  let resultado = null;
  let servicos = null;
  const api_base_url = "http://localhost:3000";

  const axiosInstance = axios.create({
    withCredentials: true,
    baseURL: api_base_url,
    responseType: "json",
    headers: {
          Accept: "application/json",
      }
  });

  const getDataHelloWorld = async () => {
    try {
      let res = await axiosInstance.get(api_base_url + "/hello", {
        responseType: "json",
        headers: {
          Accept: "application/json",
        },
      });
      resultado = res.data;
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      error = "Erro ao buscar dados: " + err.response?.data?.message || err.message;
      console.error(err);
      resultado = null; // Limpa o resultado em caso de erro
    }
  };

  const carregarServicos = async () => {
    try {
      let res = await axiosInstance.get(api_base_url + "/servicos ", {
        responseType: "json",
        headers: {
          Accept: "application/json",
        },
      });
      servicos = res.data.servicos;
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      error = "Erro ao buscar dados: " + err.response?.data?.message || err.message;;
      console.error(err);
      servicos = null; // Limpa o resultado em caso de erro
    }
  };

  const cadastrarServicos = async () => {
    try {
      let res = await axiosInstance.post(
        api_base_url + "/servicos/novo",
        {
          nomeS,
          descricao,
          preco
        },
        {
          headers: {
            Accept: "application/json",
          },
        },
      );
      resultado = res.data;
      error = null; // Limpa o erro se a requisição for bem-sucedida
      // recarrega lista de usuários apresentada
      carregarServicos();
    } catch (err) {
      error =
        "Erro ao enviar dados: " + err.response?.data?.message || err.message;
      resultado = null; // Limpa o resultado em caso de erro
    }
    
  };

  carregarServicos();
</script>

<main>
  <Nav />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <div class="div1">
    <div class="form-container">
      <h2>Cadastro de Serviço</h2>
      <form class="form" on:submit|preventDefault={cadastrarServicos}>
        <div class="form-group">
          <label for="nomeS">Nome do serviço:</label>
          <input
            class ="form-control"
            type="text"
            id="nomeS"
            bind:value={nomeS}
            placeholder="Digite o nome do serviço"
            required
          />
        </div><br>
        <div class="form-group">
          <label for="descricao">Descrição do serviço:</label>
          <input
            class="form-control"
            type="text"
            id="descricao"
            bind:value={descricao}
            placeholder="Digite uma descrição pro serviço"
            required
          />
        </div><br>
        <div class="form-group">
          <label for="preco">Preço do serviço:</label>
          <input
            class="form-control"
            type="num"
            id="preco"
            bind:value={preco}
            placeholder="Digite o preço do serviço"
            required
          />
        </div><br>
        <div>
          <button type="submit">Cadastrar serviço</button>
        </div>
      </form>
    </div>
    {#if error}
      <p style="color: red;">{error}</p>
    {/if}
    {#if resultado && resultado.message}
      <p style="color: green;">{resultado.message}</p>
    {/if}
  </div>
</main>
