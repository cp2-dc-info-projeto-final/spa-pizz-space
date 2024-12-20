# Documento de Casos de Uso

## Lista dos casos de uso
- [CDU 01](#CDU-01): Cadastro de Clientes.
- [CDU 02](#CDU-02): Login de Usuários.
- [CDU 03](#CDU-03): Disponibilização de data e horário.
- [CDU 04](#CDU-04): Cadastros de Serviços.
- [CDU 05](#CDU-05): Agendamento de Serviços.
- [CDU 06](#CDU-06): Cancelamento de Serviços.
- [CDU 07](#CDU-07): Visualizar Perfil.
- [CDU 08](#CDU-08): Logout.

## Descrição dos Casos de uso

### CDU 01
Cadastro de Clientes

**Atores:** Cliente.

**Fluxo principal**

1. O cliente clica no botão "Cadastro" na página inicial.
2. O cliente é encaminhado para a página de cadastro de clientes.
3. O cliente insere os dados solicitados: nome completo, data de nascimento, número de celular, email e senha.
4. O cliente clica em "Realizar cadastro".
5. O sistema verifica se os dados são válidos.
6. O sistema registra os dados no banco de dados.
7. O sistema exibe a mensagem "Cadastro realizado com sucesso!".

**Fluxo alternativo A**

1. O cliente clica no botão "Cadastro" na página inicial.
2. O cliente é encaminhado para a página de cadastro de clientes.
3. O cliente insere os dados solicitados: nome completo, data de nascimento, número de celular, email e senha.
4. O cliente clica em "Realizar cadastro".
5. O sistema verifica se os dados são válidos.
6. As seguintes informações já estão cadastradas: email.
7. O sistema nega o cadastro.
8. O sistema exibe a mensagem "Este e-mail já está em uso!".

### CDU 02
Login de Usuários

**Atores:** Cliente

**Fluxo principal**

1. O usuário clica no botão "Login" na página inicial.
2. O usuário é direcionado para a página de login.
3. O usuário insere login e senha.    
4. O sistema verifica se os dados são válidos.
5. O sistema libera os acesso.
6. O sistema exibe a mensagem "Login concluído com sucesso!".
7. O sistema leva o usuário até a página de perfil.

**Fluxo alternativo A**

1. O cliente clica no botão "Login" na página inicial.
2. O cliente é direcionado para a página de login.
3. O cliente insere login e senha.
4. O sistema verifica se os dados são válidos.
5. A seguinte informação não está cadastrada: email.
6. O sistema nega acesso.
7. O sistema exibe a mensagem "Usuário Não Cadastrado".


**Fluxo Alternativo C**

1. O usuário clica em "Login" na página inicial.
2. O usuário é direcionado para a página de login.
3. O usuário insere os dados solicitadas.
4. O sistema verifica se os dados são válidos.
5. A senha informada está incorreta.
6. O sistema exibe a mensagem "Login ou senha incorretos!".
7. O usuário repete o processo de login.

### CDU 03
Cadastros de Serviços

**Atores:** Administrador.

**Fluxo principal**

1. O administrador insere nome, tipo de serviço e descrição.
2. O sistema verifica se os dados são válidos.
3. O sistema insere o serviço no banco de dados.
4. Serviços são atualizados.
5. O sistema exibe a mensagem "Serviço cadastrado com sucesso!".

**Fluxo Alternativo A**

1. O administrador insere nome, tipo de serviço e descrição.
2. O sistema verifica se os dados são válidos.
3. O sistema consulta o banco de dados.
4. Serviço já está cadastrado.
5. O sistema exibe a mensagem "Serviço já cadastrado".

### CDU 04
Disponibilização de Datas e Horários

**Atores:** Cliente

**Fluxo principal**

1. Datas e horários já são pré-determinados.

### CDU 05
Agendamento de Serviços

**Atores:** Cliente.

**Fluxo principal**

1. O cliente clica em "Agendamento" na página inicial.
2. O cliente é encaminhado para a página de agendamento.
3. O cliente escolhe o serviço, data e horário.
4. O cliente finaliza o agendamento.
5. O sistema verifica se os dados são válidos.
6. O sistema registra os dados no banco de dados.
7. O sistema exibe a mensagem: "Agendamento concluído com sucesso!".
8. O horário selecionado não ficará disponível para outros agendamentos.

**Fluxo alternativo A**

1. O cliente clica em "Agendamento" na página inicial.
2. O cliente é encaminhado para a página de agendamento.
3. O cliente escolhe horário já agendado.
4. O cliente finaliza o agendamento.
5. O sistema verifica se os dados são válidos.
6. O sistema emite a mensagem "Já existe um agendamento para este horário."


### CDU 06
Cancelamento de Serviços

**Atores:** Cliente.

**Fluxo principal**

1. O usuário clica no botão "Cancelamento" na área de agendamento.
2. O usuário escolhe o serviço que deseja cancelar.
3. O sistema verifica se os dados são válidos.
4. O cancelamento é concluído e as informações ficam disponíveis para agendamento novamente.

### CDU 07
Visualizar Perfil

**Atores:** Cliente

**Fluxo principal**

1. O usuário clica em "perfil".
2. O usuário é encaminhado para página de perfil.
3. O usuário tem acesso as respectivas informações:
    - Cliente:
      -  Nome completo do cliente
      -  ID do cliente.
      -  E-mail do cliente
    
### CDU 08
Logout

**Atores:** Cliente e Administrador.

**Fluxo principal**

1. O usuário clica em "Sair" na área de perfil.
2. O sistema encerra a sessão.
3. O sistema redireciona o usuário para a página inicial.
