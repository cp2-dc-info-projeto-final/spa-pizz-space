<script>
    let nome = '';
    let data = '';
    let horario = '';
    let agendamentos = [];

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
</script>

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
