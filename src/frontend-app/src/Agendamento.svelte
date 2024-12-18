<script>
  import axios from "axios";
  import Nav from "./componentes/Nav.svelte";
  axios.defaults.withCredentials = true;

  let idServico = '';
  let data = '';
  let horario = '';
  let servicos = [];
  let horariosDisponiveis = [];
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

  const horariosPadrao = [
    "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00"
  ];

  const carregarHorariosDisponiveis = async () => {
    if (!idServico || !data) {
      horariosDisponiveis = []; // Certifique-se de limpar a lista se faltar algum campo
      return;
    }

    const horariosOcupados = agendamentos
      .filter(a => a.id_servico === idServico && a.data === data)
      .map(a => a.horario);

    horariosDisponiveis = horariosPadrao.filter(h => !horariosOcupados.includes(h));
    console.log("Horários disponíveis:", horariosDisponiveis);
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

    if (new Date(data) < new Date()) {
      alert("A data não pode ser no passado.");
      return;
    }

    loading = true;
    try {
      const res = await axios.post(api_base_url + "/agendamentos", {
        id_servico: idServico,
        data: data,
        horario: horario,
      });
      alert("Serviço agendado com sucesso!");
    } catch (err) {
      console.error("Erro ao agendar serviço:", err.message);
      alert("Erro ao agendar o serviço. Tente novamente.");
    } finally {
      loading = false;
    }
  };

  const cancelarAgendamento = async (id) => {
    const confirmar = confirm("Você tem certeza que deseja cancelar este agendamento?");
    if (confirmar) {
      loading = true;
      try {
        const res = await axios.delete(`${api_base_url}/agendamentos/${id}`);
        alert("Agendamento cancelado com sucesso!");
        carregarAgendamentos(); // Recarrega os agendamentos após cancelamento
      } catch (err) {
        console.error("Erro ao cancelar agendamento:", err.message);
        alert("Erro ao cancelar o agendamento. Tente novamente.");
      } finally {
        loading = false;
      }
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
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2>Agendamento de Serviço</h2>
          <form on:submit|preventDefault={agendarServico}>
            <div class="mb-3">
              <label for="servico" class="form-label">Serviço:</label>
              <select id="servico" bind:value={idServico} class="form-select">
                <option value="" disabled={true} selected={idServico === ''}>Selecione um serviço</option>
                {#each servicos as servico}
                  <option value={servico.id}>{servico.nomeS}</option>
                {/each}
              </select>
            </div>
    
            <div class="mb-3">
              <label for="data" class="form-label">Data:</label>
              <input type="date" id="data" bind:value={data} class="form-control" on:change={carregarHorariosDisponiveis} />
            </div>
    
            <div class="mb-3">
              <label for="horario" class="form-label">Horário:</label>
              <select id="horario" bind:value={horario} class="form-select" disabled={!horariosDisponiveis.length}>
                <option value="" disabled selected>
                  {horariosDisponiveis.length > 0 ? "Selecione um horário" : "Nenhum horário disponível"}
                </option>
                {#each horariosDisponiveis as h}
                  <option value={h}>{h}</option>
                {/each}
              </select>
            </div>
    
            <button type="submit" disabled={loading}>
              {#if loading}
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Agendando...
              {:else}
                Agendar
              {/if}
            </button>
          </form>
          {#if loading}
            <div class="spinner-border mt-3" role="status">
              <span class="visually-hidden">Carregando...</span>
            </div>
          {/if}
        </div>
        
        <div class="col-md-6">
          <h2>Seus Agendamentos</h2><br>
          {#if agendamentos.length > 0}
            <ul class="list-group">
              {#each agendamentos as agendamento}
                <li class="list-group-item d-flex justify-content-between">
                  {agendamento.servico} - {agendamento.data} | {agendamento.horario}
                  <button class="btn btn-danger btn-sm" on:click={() => cancelarAgendamento(agendamento.id_agendamento)}>Cancelar</button>
                </li>
              {/each}
            </ul>
          {:else}
            <p>Você não tem agendamentos no momento.</p>
          {/if}
        </div>
      </div>
    </div>
  </div>
</main>