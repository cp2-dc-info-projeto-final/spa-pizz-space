# Documento de Casos de Uso

## Lista dos casos de uso
- [CDU 01](#CDU-01): Cadastro de Administradores.
- [CDU 02](#CDU-02): Cadastro de Clientes.
- [CDU 03](#CDU-03): Login de Usuários.
- [CDU 04](#CDU-04): Cadastros de Serviços.
- [CDU 05](#CDU-05): Disponibilização de Datas e Horários.
- [CDU 06](#CDU-06): Agendamento de Serviços.
- [CDU 07](#CDU-07): Cancelamento de Serviços.
- [CDU 08](#CDU-08): Recuperar senha.
- [CDU 09](#CDU-09): Visualizar Perfil.
- [CDU 10](#CDU-10): Logout.

## Descrição dos Casos de uso
### CDU 01
Cadastro de Administradores

**Atores:** Administrador.

**Fluxo principal**

1. O administrador clica no botão "Novo administrador" na área de perfil.
2. O administrador é direcionado para a página de cadastro de administrador.
3. O administrador preenche os campos com os dados do novo administrador.
4. O administrador clica em "Realizar cadastro".
5. O sistema verifica se os dados são válidos.
6. Os dados do novo administrador são inseridos no banco de dados.
7. O sistema exibe a mensagem "Cadastro realizado com sucesso!".
8. O acesso à "Área do administrador / Perfil" é dado ao novo administrador cadastrado.
  
**Fluxo alternativo A**

1. O administrador clica no botão "Novo administrador" na área de perfil.
2. O administrador é direcionado para a página de cadastro de administrador.
3. O administrador preenche os campos com os dados do novo administrador.
4. O administrador clica em "Realizar cadastro".
5. O sistema verifica se os dados são válidos.
6. O sistema informa que os dados já estão registrados.
7. O sistema nega o cadastro.

### CDU 02
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
6. As seguintes informações já estão cadastradas: telefone ou email.
7. O sistema nega o cadastro.
8. O sistema exibe a mensagem "Os dados inseridos já estão cadastrados".

### CDU 03
Login de Usuários

**Atores:** Cliente, Funcionário e Administrador

**Fluxo principal**

1. O usuário clica no botão "Login" na página inicial.
2. O usuário é direcionado para a página de login.
3. O usuário insere login e senha.    
4. O sistema verifica se os dados são válidos.
5. O sistema libera os acesso.
6. O sistema exibe a mensagem "Login concluído com sucesso!".

**Fluxo alternativo A**

1. O cliente clica no botão "Login" na página inicial.
2. O cliente é direcionado para a página de login.
3. O cliente insere login e senha.
4. O sistema verifica se os dados são válidos.
5. A seguinte informação não está cadastrada: email.
6. O sistema nega acesso.
7. O sistema exibe a mensagem "Usuário Não Cadastrado".
8. O cliente é encaminhado para a página de cadastro.

**Fluxo alternativo B**

1. Administrador/Funcionário clica em "Login" na página inicial.
2. Administrador/Funcionário é encaminhado para a página de login.
3. Administrador/Funcionário insere os dados solicitadas.
4. O sistema verifica se os dados são válidos.
5. A seguinte informação não está cadastrada:
   - Administrador
     - Nome de Usuário.

   - Funcionário
     - ID.

7. O sistema nega acesso.
8. O sistema exibe a mensagem "Usuário Não Cadastrado".

**Fluxo Alternativo C**

1. O usuário clica em "Login" na página inicial.
2. O usuário é direcionado para a página de login.
3. O usuário insere os dados solicitadas.
4. O sistema verifica se os dados são válidos.
5. A senha informada está incorreta.
6. O sistema exibe a mensagem "Senha Inválida".
7. O usuário repete o processo de login.

### CDU 04
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

### CDU 05
Disponibilização de Datas e Horários

**Atores:** Administrador.

**Fluxo principal**

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

**Fluxo Alternativo A**

1. O administrador clica no botão "Cadastrar Datas e Horários" na área de perfil.
2. O administrador é direcionado para a página de cadastro de datas e horários.
3. O administrador seleciona uma determinada especialidade.
4. O administrador insere as datas disponíveis para a especialidade.
5. O administrador insere os horários disponíveis para a especialidade.
6. O administrador envia os dados.
7. O sistema verifica se os dados são válidos.
8. O horário inserido já está cadastrado ou já possui um agendamento.
9. O sistema não permite a atualização.
10. O sistema exibe a mensagem: "Este horário já está cadastrado ou já possui um agendamento".    


### CDU 06
Agendamento de Serviços

**Atores:** Cliente.

**Fluxo principal**

1. O cliente clica em "Agendamento" na página inicial.
2. O cliente é encaminhado para a página de agendamento.
3. O cliente escolhe o serviço e horário.
4. O cliente finaliza o agendamento.
5. O sistema verifica se os dados são válidos.
6. O sistema registra os dados no banco de dados.
7. O sistema exibe a mensagem: "Agendamento concluído com sucesso!".
8. O horário selecionado não ficará disponível para outros agendamentos.

**Fluxo alternativo A**

1. O cliente clica em "Agendamento" na página inicial.
2. O cliente é encaminhado para a página de agendamento.
3. O cliente escolhe o serviço e horário.
4. O cliente finaliza o agendamento.
5. O sistema verifica se os dados são válidos.
6. O cliente não possui cadastro ou não está logado.
7. O sistema exibe a mensagem: "Realize o Cadastro/Login!".
8. O cliente é direcionado para a página de cadastro/login.


### CDU 07
Cancelamento de Serviços

**Atores:** Cliente.

**Fluxo principal**

1. O usuário clica no botão "Cancelamento" na área de perfil.
2. O usuário escolhe o serviço que deseja cancelar.
3. O sistema verifica se os dados são válidos.
4. O cancelamento é concluído e as informações ficam disponíveis para agendamento novamente.

### CDU 08
Recuperar senha

**Atores:** Cliente.

**Fluxo principal**

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

**Fluxo alternativo A**

1. O cliente clica no botão "Esqueceu a senha?" no formulário de login.
2. O cliente é direcionado para a página de confirmação do email.
3. O cliente insere o email.
4. O sistema verifica se os dados são válidos.
5. O email não está cadastrado.
6. O sistema exibe a mensagem: "Email inválido!".
7. O cliente é redirecionado para a página de confirmação de email.

### CDU 09
Visualizar Perfil

**Atores:** Cliente, Funcionário e Administrador.

**Fluxo principal**

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

### CDU 10
Logout

**Atores:** Cliente, Funcionário e Administrador.

**Fluxo principal**

1. O usuário clica em "Sair" na área de perfil.
2. O sistema encerra a sessão.
3. O sistema redireciona o usuário para a página inicial.
