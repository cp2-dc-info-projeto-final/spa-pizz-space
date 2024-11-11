<script>
    import axios from 'axios';
  
    let nomeS = '';
    let descricao = '';
    let preco = '';
    let error = null;
    let success = null;
    let status = 'ativo';
    let precoError = '';
  
    const api_base_url = 'http://localhost:3000';
    const axiosInstance = axios.create({
      withCredentials: true,
      baseURL: api_base_url,
      headers: {
        Accept: 'application/json',
      },
    });
  
    const cadastrarServico = async () => {
      try {
        const res = await axiosInstance.post('/servicos/novo', {
          nomeS,
          descricao,
          preco,
          status,
        });
        success = res.data.message;
        error = null; // Limpa o erro se a requisição for bem-sucedida
        // Limpa os campos após o sucesso
        nomeS = '';
        descricao = '';
        preco = '';
        status = 'ativo';
      } catch (err) {
        error = err.response?.data?.message || err.message;
        success = null; // Limpa a mensagem de sucesso em caso de erro
      }

      const validatePreco = () => {
    precoError = ''; // Limpar mensagem de erro a cada validação
    const precoNumber = parseFloat(preco);

    if (isNaN(precoNumber)) {
      precoError = 'O preço deve ser um número válido.';
    } else if (precoNumber <= 0) {
      precoError = 'O preço deve ser maior que zero.';
    }

    return !precoError;

  };

  <main>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <h2>Cadastrar Serviço</h2>
    {#if error}
      <div class="alert alert-danger">{error}</div>
    {/if}
    {#if success}
      <div class="alert alert-success">{success}</div>
    {/if}

    <form on:submit|preventDefault={cadastrarServico}>
      <div class="mb-3">
        <label for="nome" class="form-label">Nome</label>
        <input
        type="text" 
        id="nome" 
        class="form-control" 
        bind:value={nomeS} 
        required
         />
      </div>
      <div class="status">
        Status do Serviço: <span class="{status}">{status}</span>
      </div>
      <div class="mb-3">
        <label for="descricao" class="form-label">Descrição</label>
        <textarea id="descricao" class="form-control" bind:value={descricao} required></textarea>
      </div>
      <div class="mb-3">
        <label for="preco" class="form-label">Preço</label>
        <input
        type="number" 
        id="preco" 
        class="form-control" 
        bind:value={preco} 
        required
         />

         <div class="mb-3">
          <label for="preco" class="form-label">Preço</label>
          <input
            type="number"
            id="preco"
            class="form-control"
            bind:value={preco}
            required
            min="0.01" 
            step="0.01"
            on:input={validatePreco}
          />
          {#if precoError}
            <div class="text-danger">{precoError}</div>
          {/if}
        </div>

         <div class="mb-3">
          <label for="status" class="form-label">Status</label>
          <select id="status" class="form-select" bind:value={status}>
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="em-manutencao">Em Manutenção</option>
          </select>
        </div>
    
        </div>
    </form>
  </main>
</script>