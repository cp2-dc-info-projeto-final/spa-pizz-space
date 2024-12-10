<script>
    import axios from "axios";
  
    // Configuração global para enviar cookies com todas as requisições
    axios.defaults.withCredentials = true;
  
  let nomeS = '';
  let descricao = '';
  let preco = '';
  let servicos = null;
  let error = null;
  let resultado = null;
  let colunas_servicos = null;
  let editandoId = null;
  let formDataServico = {
    nomeS: '',
    descricao: '',
    preco: '',
  };

  const api_base_url = "http://localhost:3000";

  const carregarServicos = async () => {  
    try {
      let res = await axios.get(api_base_url + "/usuarios", {
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

  const alternarServico = (id) => {
    if (editandoId === id) {
      resetarForm();
      return;
    }
    editandoId = id;
    formDataServico = {
      nomeS: servicos.find(user => user.id === id)?.nomeS || '',
      descricao: servicos.find(user => user.id === id)?.descricao || '',
      preco: servicos.find(user => user.id === id)?.preco || ''
    
    };
  };

  const resetarForm = () => {
    formDataServico = { nomeS: '',descricao: '', preco: ''};
    editandoId = null;
  };

  const enviarServico = () => {
    console.log('Dados do formulário:', formDataServico);
    if (editandoId) {
      updateServico(editandoId);
    }
    resetarForm(); // Fecha o formulário após o envio
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

  carregarServicos();
</script>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

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
