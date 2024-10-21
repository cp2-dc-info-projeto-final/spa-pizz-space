aaaaaaaaS <script>
  // import { onMount } from 'svelte';
  import axios from "axios";
  let nome = "";
  let email = "";
  let data_nasc = "";
  let num_cell = "";
  let senha = "";
  let conf_senha = "";
  let error = null;
  let resultado = null;
  let usuarios = null;
  let colunas_usuarios = null;
  const api_base_url = "http://localhost:3000";

  const getDataHelloWorld = async () => {
    try {
      let res = await axios.get(api_base_url + "/hello", {
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

  const carregarUsuarios = async () => {
    try {
      let res = await axios.get(api_base_url + "/usuarios", {
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

  const cadastrarUsuario = async () => {
    try {
      let res = await axios.post(
        api_base_url + "/usuarios/novo",
        {
          nome,
          email,
          data_nasc,
          num_cell,
          senha,
          conf_senha,
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
      carregarUsuarios();
    } catch (err) {
      error =
        "Erro ao enviar dados: " + err.response?.data?.message || err.message;
      resultado = null; // Limpa o resultado em caso de erro
    }
    
  };

  carregarUsuarios();
</script>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <div class="div1">
    <div>
      <h2>Cadastrar Usuário</h2>
      <form on:submit|preventDefault={cadastrarUsuario}>
        <div class="form-group col-md-4">
          <label for="nome">Nome:</label>
          <input
            class ="form-control"
            type="text"
            id="nome"
            bind:value={nome}
            placeholder="Digite o nome"
            required
          />
        </div>
        <div class="form-group col-md-4">
          <label for="email">Email:</label>
          <input
            class="form-control"
            type="email"
            id="email"
            bind:value={email}
            placeholder="Digite o email"
            required
          />
        </div>
        <div class="form-group col-md-4">
          <label for="data_nasc">Data de nascimento:</label>
          <input
            class="form-control"
            type="date"
            id="data_nasc"
            bind:value={data_nasc}
            placeholder="00/00/0000"
            required
          />
        </div>
        <div class="form-group col-md-4">
          <label for="num_cell">Número de celular:</label>
          <input
            class="form-control"
            type="num"
            id="num_cell"
            bind:value={num_cell}
            placeholder="Digite seu número de celular"
            required
          />
        </div>
        <div class="form-group col-md-4">
          <label for="senha">Senha:</label>
          <input
            class="form-control"
            type="password"
            id="senha"
            bind:value={senha}
            placeholder="Digite a senha"
            required
          />
        </div>
        <div class="form-group col-md-4">
          <label for="conf_senha">Confirme a Senha:</label>
          <input
            class="form-control"
            type="password"
            id="conf_senha"
            bind:value={conf_senha}
            placeholder="Confirme a senha"
            required
          />
        </div>
        <div>
          <button type="submit">Cadastrar</button>
        </div>
      </form>

      {#if error}
        <p style="color: red;">{error}</p>
      {/if}
      {#if resultado && resultado.message}
        <p style="color: green;">{resultado.message}</p>
      {/if}
    </div>
  </div>
</main>
