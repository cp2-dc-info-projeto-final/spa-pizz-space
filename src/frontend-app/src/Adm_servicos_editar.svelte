<script>
  import axios from "axios";
  import Nav from "./componentes/Nav.svelte";

  const api_base_url = "http://localhost:3000";
  axios.defaults.withCredentials = true;

  let servicos = [];
  let error = null;
  let resultado = null;
  let colunas_servicos = ['nomeS', 'descricao', 'preco'];
  let editandoId = null;
  let formDataServico = {
    nomeS: '',
    descricao: '',
    preco: '',
  };

  // Função para carregar os serviços da API
  const carregarServicos = async () => {
    try {
      const res = await axios.get(`${api_base_url}/servicos`, {
        responseType: "json",
        headers: {
          Accept: "application/json",
        },
      });
      servicos = res.data.servicos;
      error = null; // Limpa o erro se a requisição for bem-sucedida
    } catch (err) {
      error = "Erro ao buscar dados: " + (err.response?.data?.message || err.message);
      console.error(err);
      servicos = []; // Limpa os dados em caso de erro
    }
  };

  // Função para atualizar um serviço
  const updateServico = async (id) => {
    try {
      const res = await axios.post(`${api_base_url}/servicos/${id}`, formDataServico, {
        headers: {
          Accept: "application/json",
        },
      });
      console.log (res)

      if (res.status === 200) {
        console.log('Serviço atualizado:', res.data);
        resetarForm(); // Limpa o formulário
        carregarServicos(); // Recarrega a lista de serviços
      } else {
        console.error('Erro ao atualizar o serviço:', res.statusText);
      }
    } catch (err) {
      error = "Erro ao atualizar o serviço: " + (err.response?.data?.message || err.message);
      console.error(err);
    }
  };

  // Função para alternar entre editar e visualizar
  const alternarServico = (id) => {
  console.log('Alternando para o serviço com ID:', id);
  if (editandoId === id) {
    resetarForm();
    return;
  }
  editandoId = id;
  const servico = servicos.find(s => s.id === id);
  if (servico) {
    formDataServico = {
      nomeS: servico.nomeS,
      descricao: servico.descricao,
      preco: servico.preco
    };
  }
};

  // Função para resetar o formulário
  const resetarForm = () => {
    formDataServico = { nomeS: '', descricao: '', preco: '' };
    editandoId = null;
  };

  // Função para enviar o serviço (editar ou adicionar)
  const enviarServico = () => {
  console.log('Dados do formulário:', formDataServico);
  if (editandoId) {
    console.log('Editando serviço com ID:', editandoId);
    updateServico(editandoId);
  } else {
    console.log('Adicionando novo serviço');
  }
  resetarForm(); // Fecha o formulário após o envio
};

  // Função para deletar um serviço
  const deletarServico = async (id) => {
  if (confirm('Tem certeza que deseja excluir este serviço?')) {
    try {
      console.log('Deletando serviço com ID:', id); // Verifica o ID passado
      const res = await axios.delete(`${api_base_url}/servicos/${id}`, {
        headers: {
          Accept: "application/json",
        },
      });
      
      // Verifica a resposta da API
      console.log('Resposta da API ao deletar serviço:', res);
      
      resultado = res.data; // Aqui você armazena o resultado da exclusão, caso precise de algum retorno
      error = null; // Limpa o erro, se houver
      carregarServicos(); // Recarrega a lista de serviços após deletar
    } catch (err) {
      error = "Erro ao deletar serviço: " + (err.response?.data?.message || err.message);
      console.error('Erro ao deletar o serviço:', err);
    }
  }
};

  // Carregar os serviços ao inicializar o componente
  carregarServicos();
</script>
  <Nav/>
<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

  <div class="div1">
    <h2>Edição de serviços</h2>
    <div class="card">
      {#if servicos && servicos.length > 0}
        <table class="table table-bordered table-responsive">
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
                  <td>{linha_servico[atributo]}</td> <!-- Acesso de forma dinâmica aos dados -->
                {/each}
                <td>
                  <button class="btn btn-danger" on:click={() => deletarServico(linha_servico.id)}>Remover</button>
                  <button class="btn btn-warning" on:click={() => alternarServico(linha_servico.id)}>
                    {editandoId === linha_servico.id ? 'Cancelar' : 'Editar'}
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
              <input type="text" id="descricao" class="form-control" bind:value={formDataServico.descricao} required />
            </div>
            <div class="mb-5">
              <label for="preco" class="form-label">Preço</label>
              <input type="number" id="preco" class="form-control" bind:value={formDataServico.preco} required />
            </div>
            <button type="submit" class="btn btn-primary">Salvar</button>
          </form>
        </div>
      {/if}
    </div>
  </div>
</main>
