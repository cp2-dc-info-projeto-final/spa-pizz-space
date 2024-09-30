<script>
import axios from "axios";
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
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        {/if}
    </div>
</main>