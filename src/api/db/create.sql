CREATE TABLE usuario(
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome text NOT NULL, 
    email text NOT NULL UNIQUE,
    data_nasc date NOT NULL,
    num_cell numeric NOT NULL UNIQUE,
    senha text NOT NULL
    role text DEFAULT
    );

CREATE TABLE agendamentos (
    id_agendamento INTEGER PRIMARY KEY AUTOINCREMENT,
    id_usuario INTEGER NOT NULL,
    id_servico INTEGER NOT NULL,
    data DATE NOT NULL,
    horario TIME NOT NULL,
    UNIQUE (id_servico, data, horario),
    FOREIGN KEY (id_usuario) REFERENCES usuario (id_usuario) 
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_servico) REFERENCES servicos (id) 
        ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE servicos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nomeS TEXT NOT NULL,
  descricao TEXT NOT NULL,
  preco REAL NOT NULL
);
