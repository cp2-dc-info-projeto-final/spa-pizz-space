# Documento de Casos de Uso

## Lista dos casos de uso
- [CDU 01](#CDU-01): Cadastro de Administradores.
- [CDU 02](#CDU-02): Cadastro de Funcionários.
- [CDU 03](#CDU-03): Cadastro de Clientes.
- [CDU 04](#CDU-04): Login de Usuários.
- [CDU 05](#CDU-05): Cadastros de Serviços.
- [CDU 06](#CDU-06): Disponibilização de Datas e Horários.
- [CDU 07](#CDU-07): Agendamento de Serviços.
- [CDU 08](#CDU-08): Cancelamento de Serviços.
- [CDU 09](#CDU-09): Recuperar senha.
- [CDU 10](#CDU-10): Visualizar Perfil.
- [CDU 11](#CDU-11): Logout.

## Descrição dos Casos de uso
### CDU 01
Cadastro de Administradores

**Atores:** Administrador.

1. O administrador clica no botão "Novo administrador" na área de perfil.
2. O administrador é direcionado para a página de cadastro de administrador.
3. O administrador preenche os campos com os dados do novo administrador.
4. O administrador clica em "Realizar cadastro".
5. O sistema verifica se os dados são válidos.
6. Os dados do novo administrador são inseridos no banco de dados.
7. O sistema exibe a mensagem "Cadastro realizado com sucesso!".
8. O acesso à "Área do administrador / Perfil" é dado ao novo administrador cadastrado.

### CDU 02
Cadastro de Funcionários

**Atores:** Administrador.
 
1. O administrador clica no botão "Cadastrar Funcionário" na área de perfil.
2. O administrador é direcionado para a página de cadastro de funcionários.
3. O administrador insere os dados solicitados: nome completo, ID, especialidade, número de celular, email e senha.
4. O administrador finaliza o cadastro.
5. O sistema verifica se os dados são válidos.
6. O sistema registra as informações no banco de dados.
7. O sistema exibe a mensagem "Cadastro realizado com sucesso!".

### CDU 03
Cadastro de Clientes

**Atores:** Cliente.

1. O cliente clica no botão "Cadastro" na página inicial.
2. O cliente é encaminhado para a página de cadastro de clientes.
3. O cliente insere os dados solicitados: nome completo, CPF, data de nascimento, número de celular, email e senha.
4. O cliente finaliza o cadastro.
5. O sistema verifica se os dados são válidos.
6. O sistema registra os dados no banco de dados.
7. O sistema exibe a mensagem "Cadastro realizado com sucesso!".

### CDU 04
Login de Usuários

**Atores:** Cliente, Funcionário e Administrador

1. O usuário clica no botão "Login" na página inicial.
2. O usuário é direcionado para a página de login.
3. O usuário insere login e senha.    
4. O sistema verifica se os dados são válidos.
5. O sistema libera os acesso.
6. O sistema exibe a mensagem "Login concluído com sucesso!".

### CDU 05
Cadastros de Serviços

**Atores:** Administrador.

1. O administrador coloca o nome, tipo de serviço e descrição.
2. O sistema verifica se os dados são válidos.
4. O sistema insere o serviço no banco de dados.
5. Serviços são atualizados.
6. O sistema exibe a mensagem "Serviço cadastrado com sucesso!".

### CDU 06
Disponibilização de Datas e Horários

**Atores:** Administrador.

1. O administrador clica no botão "Cadastrar Datas e Horários" na área de perfil.
2. O administrador é direcionado para a página de cadastro de datas e horários.
3. O administrador seleciona uma determinada especialidade.
4. O administrador insere as datas disponíveis para a especialidade.
5. O administrador insere os horários disponíveis para a especialidade.
6. O administrador envia os dados.
7. O sistema verifica se os dados são válidos.
8. O sistema registra os dados no banco de dados.
9. O sistema exibe a mensagem: "Os dados inseridos (Horário/Data) foram adicionados ao banco de dados com sucesso!".
10. O calendário de agendamentos é atualizado.

### CDU 07
Agendamento de Serviços

**Atores:** Cliente.

1. O cliente clica em "Agendamento" na página inicial.
2. O cliente é encaminhado para a página de agendamento.
3. O cliente escolhe serviço e horário.
4. O cliente finaliza o agendamento.
5. O sistema verifica se os dados são válidos.
6. O sistema registra os dados no banco de dados.
7. O sistema exibe a mensagem: "Agendamento concluído com sucesso!".
8. O horário selecionado não ficará disponível para outros agendamentos.

### CDU 08
Cancelamento de Serviços

**Atores:** Cliente.

1. O usuário clica no botão "Cancelamento" na área de perfil.
2. O usuário escolhe o serviço que deseja cancelar.
3. O sistema verifica se os dados são válidos.
4. O cancelamento é concluído e as informações ficam disponíveis para agendamento novamente.

### CDU 09
Recuperar senha

**Atores:** Cliente.

1. O cliente clica no botão "Esqueceu a senha?" no formulário de login.
2. O cliente é direcionado para a página de confirmação do email.
3. O cliente insere o email.
4. O sistema verifica se os dados são válidos.
5. O sistema envia um código para o email do cliente.
6. O cliente é direcionado para a página de confirmação do código.
7. O cliente digita o código de verificação.
8. O sistema verifica se os dados são válidos.
9. O cliente é direcionado para a página de recuperação de senha.
10. O cliente digita nova senha.
11. O sistema registra a nova senha.

### CDU 10
Visualizar Perfil

**Atores:** Cliente, Funcionário e Administrador.

1. O usuário clica em "perfil".
2. O usuário é encaminhado para página de perfil.
3. O usuário tem acesso as respectivas informações:
    - Cliente:
      -  Nome completo do cliente
      -  CPF do cliente.
      -  Calendário com as informações de agendamento do cliente: data, horário, nome do funcionário, ID e especialidade.

    - Funcionário
      - Nome completo do funcionário.
      - ID do funcionário.
      - Calendário com as informações de agendamento do funcionário: data, horário, nome do cliente.

    - Administrador
      - Lista de Usuários.
      - Calendário com todos os agendamentos.
      - Cadastro de Funcionários.
      - Cadastro de Administradores.
      - Cadastro de Datas e Horários.
      - Cadastro de Serviços.
      - Cadastro de Especialidades.

### CDU 11
Logout

**Atores:** Cliente, Funcionário e Administrador.

1. O usuário clica em "Sair" na área de perfil.
2. O sistema encerra a sessão.
3. O sistema redireciona o usuário para a página inicial.
