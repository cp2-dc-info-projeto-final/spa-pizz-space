CREATE TABLE usuario(
    nome text NOT NULL, 
    email text NOT NULL UNIQUE,
    data_nasc date NOT NULL,
    num_cell numeric NOT NULL UNIQUE,
    senha text NOT NULL
    );
