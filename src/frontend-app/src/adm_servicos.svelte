<script>
   let error = null;
    let success = null;
    let precoError = null;
    let status = 'ativo';
  let servico = { nomeS: '', descricao: '', preco: 0.01 };

  function validatePreco(event) {
        const value = event.target.value;
        if (value <= 0) {
            precoError = 'O preço deve ser maior que zero.';
        } else {
            precoError = null;
        }
    }

  async function cadastrarServico() {
      try {
          const response = await fetch('http://localhost:3000/services', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(servico)
          });
          if (!response.ok) {
              throw new Error('Erro ao salvar o serviço');
          }
          success = 'Serviço cadastrado com sucesso!';
            error = null;
            // Resetar o formulário
            servico = { nomeS: '', descricao: '', preco: 0.01 };
            status = 'ativo';
        } catch (err) {
            error = err.message;
            success = null;
      }
  }
</script>

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
      bind:value={servico.nomeS} 
      required
        />
    </div>

    <div class="mb-3">
      <label for="descricao" class="form-label">Descrição</label>
      <textarea
        id="descricao"
        class="form-control"
        bind:value={servico.descricao}
        required
      ></textarea>
    </div>

    <div class="mb-3">
      <label for="preco" class="form-label">Preço</label>
      <input
        type="number"
        id="preco"
        class="form-control"
        bind:value={servico.preco}
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
      <select
        id="status"
        class="form-select"
        bind:value={status}
      >
        <option value="ativo">Ativo</option>
        <option value="inativo">Inativo</option>
        <option value="em-manutencao">Em Manutenção</option>
      </select>
    </div>

    <button type="submit" class="btn btn-primary">Cadastrar Serviço</button>
  </form>
</main>