<script>
  import axios from "axios";

  // Configuração global para enviar cookies com todas as requisições
  axios.defaults.withCredentials = true;

  let error = null;
  let resultado = null;
  let usuarios = null;
  let nomeS = '';
  let descricao = '';
  let preco = '';
  let servicos = null;
  let colunas_usuarios = null;
  let colunas_servicos = null;
  let editandoId = null;  // Modificado para rastrear qual usuário está sendo editado
  let formData = {
    nome: '',
    email: '',
    data_nasc: '',
    num_cell: ''
  };
  let formDataServico = {
    nomeS: '',
    descricao: '',
    preco: '',
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

  const carregarServicos = async () => {
    try {
      let res = await axios.get(api_base_url + "/servicos", {
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

  const updateServico = async (id) => {
    try {
      let res = await axios.post(`${api_base_url}/servicos/${id}`, formDataServico, {
        headers: {
          Accept: "application/json",
        },
      });

      if (res.status === 200) {
        console.log('Serviço atualizado:', res.data);
        resetarForm(); // Limpa o formulário
        carregarServicos(); // Recarrega a lista de usuários
      } else {
        console.error('Erro ao atualizar o serviço:', res.statusText);
      }
    } catch (err) {
      error = "Erro ao atualizar o serviço: " + (err.response?.data?.message || err.message);
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

  const alternarServico = (id) => {
    if (editandoId === id) {
      resetarForm();
      return;
    }
    editandoId = id;
    formDataServico = {
      nomeS: servicos.find(user => user.id_servicos === id)?.nomeS || '',
      descricao: servicos.find(user => user.id_servicos === id)?.descricao || '',
      preco: servicos.find(user => user.id_servicos === id)?.preco || ''
    
    };
  };

  // Função para resetar o formulário
  const resetarFormulario = () => {
    formData = { nome: '', email: '', data_nasc: '', num_cell: '' };
    editandoId = null;
  };

  const resetarForm = () => {
    formDataServico = { nomeS: '',descricao: '', preco: ''};
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

  const enviarServico = () => {
    console.log('Dados do formulário:', formDataServico);
    if (editandoId) {
      updateServico(editandoId);
    }
    resetarForm(); // Fecha o formulário após o envio
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

  const deletarServico = async (id) => {
    if (confirm('Tem certeza que deseja excluir este serviço?')) {
      try {
        let res = await axios.delete(`${api_base_url}/servicos/${id}`, {
          headers: {
            Accept: "application/json",
          },
        });
        resultado = res.data;
        error = null;

        carregarServicos(); // Recarrega a lista de usuários
      } catch (err) {
        error = "Erro ao deletar serviço: " + (err.response?.data?.message || err.message);
        console.error(err);
      }
    }
  };

  carregarUsuarios(); // Carregar a lista de usuários ao iniciar
  carregarServicos();
</script>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <div class="div1">
    <div class="card">
      {#if usuarios}
        <table class="table table-bordered">
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

  <div class="div1">
    <div class="card">
      {#if servicos}
        <table class="table table-bordered">
          <thead>
            <tr>
              {#each colunas_servicos as nome_coluna}
                <th>{nome_coluna}</th>
              {/each}
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {#each servicos as linha_servico}
              <tr>
                {#each colunas_servicos as atributo}
                  <td>{linha_servico[atributo]}</td>
                {/each}
                <td>
                  <button class="btn btn-danger" on:click={() => deletarServico(linha_servico.id_servicos)}>Remover</button>
                  <button class="btn btn-warning" on:click={() => alternarServico(linha_servico.id_servicos)}>
                    {editandoId === linha_servico.id_servicos ? 'Cancelar' : 'Editar'}
                  </button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}

      {#if editandoId !== null}
        <div class="form-container">
          <h3>Editar Serviço</h3>
          <form class="border p-5" on:submit|preventDefault={enviarServico}>
            <div class="mb-5">
              <label for="nomeS" class="form-label">Nome do serviço</label>
              <input type="text" id="nomeS" class="form-control" bind:value={formDataServico.nomeS} required />
            </div>
            <div class="mb-5">
              <label for="descricao" class="form-label">Descrição</label>
              <input type="text" id="descricao" class="form-control" bind:value={formDataServico.descricaol} required />
            </div>
            <div class="mb-5">
              <label for="preco" class="form-label">Preço</label>
              <input type="num" id="preco" class="form-control" bind:value={formDataServico.preco} required />
            </div>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </form>
        </div>
      {/if}
    </div>
  </div>
</main>
