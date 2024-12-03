<script>
  import axios from "axios";

  let nome = '';
  let data = '';
  let horario = '';
  let agendamentos = [];
  let error = null;
  let resultado = null;
  let servicos = null;
  let colunas_servicos = null;
  const api_base_url = "http://localhost:3000";

    // Função para carregar os dados dos usuários
  const carregarServicos = async () => {
    try {
      let res = await axios.get(api_base_url + "/servicos", {
        responseType: "json",
        headers: {
          Accept: "application/json",
        },
      });
      servicos = res.data.servicos;
      colunas_servicos = Object.keys(servicos[0]);
      error = null;
    } catch (err) {
      error = "Erro ao buscar dados: " + (err.response?.data?.message || err.message);
      console.error(err);
      servicos = null;
    }
  };

    function agendar() {
    if (nome && data && horario) {
      agendamentos = [...agendamentos, { nome, data, horario }];
      nome = '';
      data = '';
      horario = '';
    } else {
      alert('Por favor, preencha todos os campos!');
    }
  }

  carregarServicos();
</script>

<main>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <h1>Agendamento</h1>
  <input type="text" bind:value={nome} placeholder="Nome" />
  <input type="date" bind:value={data} />
  <input type="time" bind:value={horario} />
  <button on:click={agendar}>Agendar</button>

  <h2>Agendamentos</h2>
  <ul>
    {#each agendamentos as agendamento}
      <li>{agendamento.nome} - {agendamento.data} {agendamento.horario}</li>
    {/each}
  </ul>
</main>