<script>
    import { onMount } from 'svelte';
    import axios from 'axios';
  
    let nome = '';
    let descricao = '';
    let preco = '';
    let error = null;
    let success = null;
  
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
          nome,
          descricao,
          preco,
        });
        success = res.data.message;
        error = null; // Limpa o erro se a requisição for bem-sucedida
        // Limpa os campos após o sucesso
        nome = '';
        descricao = '';
        preco = '';
      } catch (err) {
        error = err.response?.data?.message || err.message;
        success = null; // Limpa a mensagem de sucesso em caso de erro
      }
    };
  </script>
  
  <main>
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
        <input type="text" id="nome" class="form-control" bind:value={nome} required />
      </div>
      <div class="mb-3">
        <label for="descricao" class="form-label">Descrição</label>
        <textarea id="descricao" class="form-control" bind:value={descricao} required></textarea>
      </div>
      <div class="mb-3">
        <label for="preco" class="form-label">Preço</label>
        <input type="number" id="preco" class="form-control" bind:value={preco} required />
      </div>
      <button type="submit" class="btn btn-primary">Cadastrar Serviço</button>
    </form>
  </main>
  
  <style>
  </style>
  