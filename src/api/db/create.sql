CREATE TABLE usuario(
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT,
    nome text NOT NULL, 
    email text NOT NULL UNIQUE,
    data_nasc date NOT NULL,
    num_cell numeric NOT NULL,
    senha text NOT NULL
    );
