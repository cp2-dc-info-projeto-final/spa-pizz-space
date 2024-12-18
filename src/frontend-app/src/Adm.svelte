<script>
  import axios from "axios";
  import Nav from "./componentes/Nav.svelte"

  // Configuração global para enviar cookies com todas as requisições
  axios.defaults.withCredentials = true;

  let error = null;
  let resultado = null;
  let usuarios = null;
  let colunas_usuarios = null;
  let editandoId = null;  // Modificado para rastrear qual usuário está sendo editado
  let formData = {
    nome: '',
    email: '',
    data_nasc: '',
    num_cell: ''
  };

  const api_base_url = "http://localhost:3000";

  // Função para carregar os dados dos usuários
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
      error = null;
    } catch (err) {
      error = "Erro ao buscar dados: " + (err.response?.data?.message || err.message);
      console.error(err);
      usuarios = null;
    }
  };

  // Função para atualizar os dados do usuário
  const updateUsuario = async (id) => {
    try {
      let res = await axios.post(`${api_base_url}/usuarios/${id}`, formData, {
        headers: {
          Accept: "application/json",
        },
      });

      if (res.status === 200) {
        console.log('Usuário atualizado:', res.data);
        resetarFormulario(); // Limpa o formulário
        carregarUsuarios(); // Recarrega a lista de usuários
      } else {
        console.error('Erro ao atualizar o usuário:', res.statusText);
      }
    } catch (err) {
      error = "Erro ao atualizar o usuário: " + (err.response?.data?.message || err.message);
      console.error(err);
    }
  };

  // Função para alternar o modo de edição
  const alternar = (id) => {
    if (editandoId === id) {
      resetarFormulario();
      return;
    }
    editandoId = id;
    formData = {
      nome: usuarios.find(user => user.id_usuario === id)?.nome || '',
      email: usuarios.find(user => user.id_usuario === id)?.email || '',
      data_nasc: usuarios.find(user => user.id_usuario === id)?.data_nasc || '',
      num_cell: usuarios.find(user => user.id_usuario === id)?.num_cell || ''
    };
  };

  // Função para resetar o formulário
  const resetarFormulario = () => {
    formData = { nome: '', email: '', data_nasc: '', num_cell: '' };
    editandoId = null;
  };

  // Função para enviar o formulário
  const enviar = () => {
    console.log('Dados do formulário:', formData);
    if (editandoId) {
      updateUsuario(editandoId);
    }
    resetarFormulario(); // Fecha o formulário após o envio
  };

  // Função para deletar um usuário
  const deletarUsuario = async (id) => {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      try {
        let res = await axios.delete(`${api_base_url}/usuarios/${id}`, {
          headers: {
            Accept: "application/json",
          },
        });
        resultado = res.data;
        error = null;
        carregarUsuarios(); // Recarrega a lista de usuários
      } catch (err) {
        error = "Erro ao deletar usuário: " + (err.response?.data?.message || err.message);
        console.error(err);
      }
    }
  };

  carregarUsuarios(); // Carregar a lista de usuários ao iniciar
</script>


<main>
  <Nav/>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <div class="div1">
    <h2>Edição</h2>
    <div class="card">
      {#if usuarios}
        <table class="table table-bordered table-responsive">
          <thead>
            <tr>
              {#each colunas_usuarios as nome_coluna}
                <th>{nome_coluna}</th>
              {/each}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {#each usuarios as linha_usuario}
              <tr>
                {#each colunas_usuarios as atributo}
                  <td>{linha_usuario[atributo]}</td>
                {/each}
                <td>
                  <button class="btn btn-danger" on:click={() => deletarUsuario(linha_usuario.id_usuario)}>Remover</button>
                  <button class="btn btn-warning" on:click={() => alternar(linha_usuario.id_usuario)}>
                    {editandoId === linha_usuario.id_usuario ? 'Cancelar' : 'Editar'}
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}

      {#if editandoId !== null}
        <div class="form-container">
          <h3>Editar Usuário</h3>
          <form class="border p-5" on:submit|preventDefault={enviar}>
            <div class="mb-5">
              <label for="nome" class="form-label">Nome</label>
              <input type="text" id="nome" class="form-control" bind:value={formData.nome} required />
            </div>
            <div class="mb-5">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" class="form-control" bind:value={formData.email} required />
            </div>
            <div class="mb-5">
              <label for="data_nasc" class="form-label">Data de nascimento</label>
              <input type="date" id="data_nasc" class="form-control" bind:value={formData.data_nasc} required />
            </div>
            <div class="mb-5">
              <label for="num_cell" class="form-label">Número de celular</label>
              <input type="text" id="num_cell" class="form-control" bind:value={formData.num_cell} required />
            </div>
            <!--<div class="mb-3">
              <label for="senha" class="form-label">Senha</label>
              <input type="password" id="senha" class="form-control" bind:value={formData.senha} />
            </div>-->
            <button type="submit" class="btn btn-primary">Salvar</button>
          </form>
        </div>
      {/if}
    </div>
  </div>
</main>
