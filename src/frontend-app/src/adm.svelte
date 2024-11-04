<script>
import axios from "axios";
let error = null;
let resultado = null;
let usuarios = null;
let colunas_usuarios = null;
let editando = false;
let formData = {
    nome: '',
    email: '',
    num_cell: '',
    senha: ''
  };
  
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

  const updateUsuario = async (id) => {
    console.log ("O id do usuario é: "+id);
  try {
      let res = await axios.post(`${api_base_url}/usuarios/${id}`, formData, {
        headers: {
          Accept: "application/json",
        },
      });

      // Verifica se a atualização foi bem-sucedida
      if (res.status === 200) {
        console.log('Usuário atualizado:', res.data);
        alternar(); // Fecha o formulário após o envio
      } else {
        console.error('Erro ao atualizar o usuário:', res.statusText);
      }
  resultado = res.data;
  error = null;
  // recarrega lista de usuários apresentada
  carregarUsuarios();
  } catch (err) {
      error =
      "Erro ao atualizar o usuário: " +
      (err.response?.data?.message || err.message);
      resultado = null;
  }
  };

  function alternar() {
    editando = !editando;
  }

  function enviar() {
    // Lógica para processar os dados do formulário
    console.log('Dados do formulário:', formData);
    updateUsuario();
    alternar(); // Fecha o formulário após o envio
  }


const deletarUsuario = async (id) => {
    console.log ("O id do usuario é: "+id);
  try {
    let res = await axios.delete(`${api_base_url}/usuarios/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });
    resultado = res.data;
    error = null;
    // recarrega lista de usuários apresentada
    carregarUsuarios();
  } catch (err) {
    error =
      "Erro ao deletar usuário: " +
      (err.response?.data?.message || err.message);
    resultado = null;
  }
  };

  carregarUsuarios();
</script>
<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <div class="div1">
    <div class="card">
        {#if usuarios}
          <table>
            <thead>
              <tr>
                {#each colunas_usuarios as nome_coluna}
                  <th>{nome_coluna}</th>
                {/each}
                <th></th>
              </tr><tr/>
            </thead>
            <tbody>
              {#each Object.values(usuarios) as linha_usuario}
                <tr>
                  {#each colunas_usuarios as atributo}
                    <td>{linha_usuario[atributo]}</td>
                  {/each}
                  <td>
                    <button on:click={() => deletarUsuario(linha_usuario.id_usuario)}>Remover</button>
                    <button on:click={alternar}>
                      {editando ? 'Cancelar' : 'Editar'}
                    </button>
                    {#if editando}
                      <div class="form-container">
                        <form on:submit|preventDefault={() => updateUsuario(linha_usuario.id_usuario)}>
                          <label>
                            Nome:
                            <input type="text" bind:value={formData.nome} required />
                          </label>
                          <label>
                            Email:
                            <input type="email" bind:value={formData.email} required />
                          </label>
                          <label>
                            Número de celular:
                            <input type="text" bind:value={formData.num_cell} required />
                          </label>
                          <label>
                            Senha:
                            <input type="password" bind:value={formData.senha} required />
                          </label>
                          <button type="submit">Salvar</button>
                        </form>
                      </div>
                    {/if}
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
    </div>
  </div>
</main>
