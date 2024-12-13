<script>
  import axios from "axios";
  import Nav from "./componentes/Nav.svelte";

  let idServico = '';
  let data = '';
  let horario = '';
  let servicos = [];
  let agendamentos = [];
  let loading = false; // Variável para controlar o estado de carregamento
  const api_base_url = "http://localhost:3000";

  // Carregar lista de serviços
  const carregarServicos = async () => {
    try {
      const res = await axios.get(api_base_url + "/servicos");
      servicos = res.data.servicos;
    } catch (err) {
      console.error("Erro ao carregar serviços:", err.message);
    }
  };

  // Função para carregar agendamentos
  const carregarAgendamentos = async () => {
    try {
      const res = await axios.get(api_base_url + "/agendamentos");
      agendamentos = res.data.agendamentos || [];
      console.log("Agendamentos carregados:", agendamentos);
    } catch (err) {
      console.error("Erro ao carregar agendamentos:", err.message);
    }
  };

  // Agendar serviço
  const agendarServico = async () => {
    if (!idServico || !data || !horario) {
      alert("Preencha todos os campos antes de agendar!");
      return;
    }

    loading = true;
    try {
      const res = await axios.post(api_base_url + "/agendamentos", {
        id: idServico,
        data,
        horario,
      });
      alert("Serviço agendado com sucesso!");
    } catch (err) {
      console.error("Erro ao agendar serviço:", err.message);
      alert("Erro ao agendar o serviço. Tente novamente.");
    } finally {
      loading = false;
    }
  };

  // Carregar serviços ao montar o componente
  carregarServicos();
  // Carregar os agendamentos ao montar o componente
  carregarAgendamentos();
</script>

<Nav/>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <div class="div1">
    <h1>Agendamento de Serviço</h1>
    <form on:submit|preventDefault={agendarServico}>
      <label for="servico">Serviço:</label>
      <select id="servico" bind:value={idServico}>
          <option disabled selected>Selecione um serviço</option>
          {#each servicos as servico}
              <option value={servico.id_servicos}>{servico.nomeS}</option>
          {/each}
      </select>

      <label for="data">Data:</label>
      <input type="date" id="data" bind:value={data} />

      <label for="horario">Horário:</label>
      <input type="time" id="horario" bind:value={horario} />

      <button type="submit" disabled={loading}>Agendar</button>
    </form>
    {#if loading}
      <p>Carregando...</p>
    {/if}
  </div>

  <div class="div1">
    <h2>Seus Agendamentos</h2>
    {#if agendamentos.length > 0}
      <ul>
        {#each agendamentos as agendamento}
          <li>{agendamento.servico} - {agendamento.data} {agendamento.horario}</li>
        {/each}
      </ul>
    {:else}
      <p>Você não tem agendamentos no momento.</p>
    {/if}
  </div>
</main>