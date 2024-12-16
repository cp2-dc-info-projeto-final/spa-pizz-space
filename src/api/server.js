const dotenv = require('dotenv').config()
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require("bcryptjs")
const app = express();
app.use(express.json());
const port = 3000;
const databasePath = 'db/banco.db';
const { SECRET_ACCESS_TOKEN, NODE_ENV } = process.env;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Habilita apenas URL do frontend svelte
  credentials: true, 
}));

app.disable("x-powered-by");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Função auxiliar para conectar ao banco de dados
const connectToDatabase = () => {
  return new sqlite3.Database(databasePath, (err) => {
    if (err) {
      console.error(err.message);
      throw new Error('Não foi possível conectar ao banco de dados');
    }
  });
};

function geraAcessoJWT(idUsuario) {
  let payload = {
    idUsuario: idUsuario
  };
  return jwt.sign(payload, SECRET_ACCESS_TOKEN, {
    expiresIn: '20m',
  });
};

async function login(req, res) {
  let db = connectToDatabase();
  const { email, senha } = req.body;
  // recupera a senha do usuário que está tentando fazer login
  db.get('SELECT id_usuario, senha FROM usuario WHERE email = ?', [email], async (error, result) => {
    if (error) {
      console.log(error);
    }
    else if (result) {
      let idUsuario = result.id_usuario;
      console.log("idUsuario: "+result.id_usuario);
      let senhaCorreta = await bcrypt.compare(senha, result.senha)
      if (!senhaCorreta) {        
        console.log("Senha incorreta!");
        return res.status(401).json({
          status: 'failed',
          message: 'Login ou senha incorretos!',
        });
      }

      let options = {
        maxAge: 20 * 60 * 1000, // minutos * segundos * milissegundos = total 20 minutos
        httpOnly: true, // restringe acesso de js ao cookie
        secure: NODE_ENV === 'production' ? true : false, // secure ativado de acordo com ambiente (desenvolvimento/produção) para uso do https
        sameSite: "Lax", // habilita compartilhamento de cookie entre páginas
      };

      console.log(`secure: ${options.secure}`);

      const token = geraAcessoJWT(idUsuario); // gera um token de sessão para o usuário

      console.log(`Usuário ${email} logado com sucesso!\nToken: ${token}`);      
      

      // após realizar login, vá nas ferramentas do desenvolvedor do navegador, na aba Application, em Cookies, e veja o cookie SessionID
      res.cookie("SessionID", token, options); // preenche o token na resposta para ser utilizado pelo cliente nas próximas requisições
        res.status(200).json({
            status: "success",
            message: "Autenticação realizada com sucesso!",
        });
    }

    db.close((err) => {
      if (err) {
        console.log(err.message);
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

  });
}

// esta função é um middleware, uma chamada que vai entre duas chamadas para verificar se o usuário está logado
async function verificaToken(req, res, next) {  
  // se o token (variável SessionID) não estiver presente no cookie o usuário não está logado
  /*if (true) {
    next();
  } else {*/
    console.log("Verifica token");
    const token = req.cookies.SessionID;
    console.log("Verifica token: "+ token);
  if (!token) {
    console.log("Erro no token");
    return res.status(401).json({ 
      status: 'failed', 
      message: 'Você não está logado!'
    });
  }

  console.log(`token: ${token}`);
  console.log(`SECRET_ACCESS_TOKEN: ${SECRET_ACCESS_TOKEN}`);
  jwt.verify(token, SECRET_ACCESS_TOKEN, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'failed',
        message: 'Sessão expirada!',
      });
    } else {
      // o conteúdo decodificado do token é o id do usuário
      let {idUsuario} = decoded;
      console.log(`decoded: ${decoded}`);
      console.log(`idUsuario decoded: ${decoded.idUsuario}`);

      db = connectToDatabase();

      // recupera dados do usuário que está tentando fazer login
      db.get('SELECT id_usuario, nome, email FROM usuario WHERE id_usuario = ?', [idUsuario], async (error, result) => {
        if (error) {
          console.log(error)
        }
        else if (result) {
          const { id_usuario, nome, email } = result
          req.idUsuario = id_usuario
          req.email = email
          req.nome = nome

          db.close((err) => {
            if (err) {
              return console.error(err.message)
            }
            console.log('Fechou a conexão com o banco de dados.')
          });

          next();
        }
      });
    }   
  });
  // }
  
}

app.post("/login", login);

app.post('/logout', (req, res) => {
  // Limpa o cookie "SessionID" 
  res.clearCookie("SessionID");

  // Retorna uma resposta de sucesso
  res.status(200).json({
    status: 'success',
    message: 'Logout realizado com sucesso!'
  });
});

  

app.get('/usuarios', verificaToken, (req, res) => {
  let db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Conectou no banco de dados!');
  });

  // Seleciona todos os usuários da tabela 'usuario'
  db.all('SELECT * FROM usuario', [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao consultar o banco de dados!',
        error: err.message
      });
    }

    // Fecha a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });
    
    // Retorna os dados dos usuários em formato JSON
    res.status(200).json({
      status: 'success',
      usuarios: rows
    });
  });
});

// Endpoint de cadastro de novos usuários
app.post('/usuarios/novo', (req, res) => {
  const { nome, email, senha, conf_senha, data_nasc, num_cell } = req.body;
  console.log(req);

  // Aqui começa a validação dos campos do formulário
  let erro = "";
  if (nome.length < 1 || email.length < 1 || senha.length < 1 || conf_senha.length < 1) {
    erro += 'Por favor, preencha todos os campos corretamente!';
  }
  if (senha != conf_senha) {
    erro += 'As senhas digitadas não são iguais!';
  }
  if (erro) {
    res.status(400).json({
      status: 'failed',
      message: erro,
    });
    
  } else {
    // aqui começa o código para inserir o registro no banco de dados
    let db = new sqlite3.Database(databasePath, (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Conectou no banco de dados!');
    });

    db.get('SELECT email FROM usuario WHERE email = ?', [email], async (error, result) => {
      if (error) {
        console.log(error);
      } else if (result) {
        db.close((err) => {
          if (err) {
            return console.error(err.message);
          }
          console.log('Fechou a conexão com o banco de dados.');
        });
        return res.status(400).json({
          status: 'failed',
          message: 'Este e-mail já está em uso!',
        });
      } else {
        let senha_criptografada = await bcrypt.hash(senha, 8);
        db.run('INSERT INTO usuario(nome, email, senha, data_nasc, num_cell) VALUES (?, ?, ?, ?, ?)', 
          [nome, email, senha_criptografada, data_nasc, num_cell], (error2) => {
            if (error2) {
              console.log(error2);
            } else {
              db.close((err) => {
                if (err) {
                  return console.error(err.message);
                }
                console.log('Fechou a conexão com o banco de dados.');
              });
              return res.status(201).json({
                status: 'success',
                message: 'Registro feito com sucesso!',
                campos: req.body,
              });
            }
          });
      }
    });
  }
});


// Endpoint para retornar todos os dados do usuário logado
app.get('/usuarios/me', verificaToken, (req, res) => {
  // recupera dados do usuário logado
  const usuarioLogado = {
    idUsuario: req.idUsuario,
    nome: req.nome,
    email: req.email
  }
  // Retorna os dados do usuário em formato JSON
  res.status(200).json({
      status: 'success',
      usuario: usuarioLogado // Retorna todos os dados do usuário
  });
});

app.post('/usuarios/:id_usuario', verificaToken, async (req, res) => {
  const { id_usuario } = req.params;
  const { nome, email, data_nasc, num_cell } = req.body;
  let db = connectToDatabase();
  console.log(`nome ${nome} email ${email} data_nasc ${data_nasc} num_cell ${num_cell} id_usuario ${id_usuario}`);
  db.run('UPDATE usuario SET nome = ?, email = ?, data_nasc = ?, num_cell = ? WHERE id_usuario = ?', 
    [nome, email, data_nasc, num_cell, id_usuario], function(err) {
      if (err) {
        return res.status(500).json({
          status: 'failed',
          message: `Erro ao tentar atualizar o usuário ${id_usuario}!`,
          error: err.message
        });
      }

      db.close();

      return res.status(200).json({
        status: 'success',
        message: `Usuário com id ${id_usuario} atualizado com sucesso!`
      });
    });
});

app.delete('/usuarios/:id_usuario', verificaToken, (req, res) => {
  const { id_usuario } = req.params;

  // Conectar ao banco de dados SQLite
  let db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao conectar ao banco de dados!',
        error: err.message
      });
    }
    console.log('Conectou no banco de dados!');
  });

  // Deletar o usuário pelo ID
  db.run('DELETE FROM usuario WHERE id_usuario = ?', [id_usuario], function (err) {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao tentar remover o usuário ${id_usuario}!',
        error: err.message
      });
    }
    // Fechar a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });

    // Retornar uma resposta de sucesso
    return res.status(200).json({
      status: 'success',
      message: `Usuário com id ${id_usuario} removido com sucesso!`
    });
  });
});

app.get('/servicos', (req, res) => {
  let db = new sqlite3.Database(databasePath, (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Conectou no banco de dados!');
  });

  // Seleciona todos os usuários da tabela 'usuario'
  db.all('SELECT * FROM servicos', [], (err, rows) => {
    if (err) {
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao consultar o banco de dados!',
        error: err.message
      });
    }

    // Fecha a conexão com o banco de dados
    db.close((err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Fechou a conexão com o banco de dados.');
    });
    
    // Retorna os dados dos usuários em formato JSON
    res.status(200).json({
      status: 'success',
      servicos: rows
    });
  });
});

app.post('/servicos', async (req, res) => {
  const { nomeS, descricao, preco } = req.body;

  const validarCampos = () => {
    if (!nomeS || nomeS.length < 1) return 'Nome é obrigatório.';
    if (!descricao || descricao.length < 1) return 'Descrição é obrigatória.';
    if (isNaN(preco) || parseFloat(preco) <= 50) return 'Preço deve ser maior que 50.';
    return null;
  };
  console.log('oi')
  const erro = validarCampos();
  if (erro) {
    return res.status(400).json({
      status: 'failed',
      message: erro,
    });
  }

  // Conectar ao banco de dados
  let db = connectToDatabase();

  // Verificar se o serviço já existe
  db.get('SELECT nomeS FROM servicos WHERE nomeS = ?', [nomeS], (err, row) => {
    if (err) {
      db.close();
      return res.status(500).json({
        status: 'failed',
        message: 'Erro ao verificar o serviço!',
        error: err.message,
      });
    }
    
    if (row) {
      db.close();
      return res.status(400).json({
        status: 'failed',
        message: 'Já existe um serviço com este nome!',
      });
    } else {
      // Inserir novo serviço
      db.run('INSERT INTO servicos(nomeS, descricao, preco) VALUES (?, ?, ?)', [nomeS, descricao, preco], (error) => {
        if (error) {
          db.close();
          return res.status(500).json({
            status: 'failed',
            message: 'Erro ao adicionar serviço!',
            error: error.message,
          });
        }
        db.close();
        return res.status(200).json({
          status: 'success',
          message: 'Registro feito com sucesso!',
          campos: req.body,
        });
      });
    }
  });
});

// Endpoint para deletar serviço pelo ID
app.delete('/servicos/:id', verificaToken, (req, res) => {
  const { id } = req.params;

  let db = connectToDatabase();

  // Deletar o serviço
  db.run('DELETE FROM servicos WHERE id = ?', [id], function (err) {
    if (err) {
      db.close();
      return res.status(500).json({
        status: 'failed',
        message: `Erro ao tentar remover o serviço ${id}!`,
        error: err.message,
      });
    }
    db.close();
    return res.status(200).json({
      status: 'success',
      message: `Serviço com id ${id} removido com sucesso!`
    });
  });
});

// Endpoint para atualizar serviço
app.post('/servicos/:id', verificaToken, async (req, res) => {
  const { id } = req.params;
  const { nomeS, descricao, preco } = req.body;

  let db = connectToDatabase();

  // Atualizar o serviço
  db.run('UPDATE servicos SET nomeS = ?, descricao = ?, preco = ? WHERE id = ?', 
    [nomeS, descricao, preco || null, id], function (err) {
      if (err) {
        db.close();
        return res.status(500).json({
          status: 'failed',
          message: `Erro ao tentar atualizar o serviço ${id}!`,
          error: err.message,
        });
      }

      db.close();
      return res.status(200).json({
        status: 'success',
        message: `Serviço com id ${id} atualizado com sucesso!`
      });
    });
});

app.post('/agendamentos', (req, res) => {
  console.log("Entrou em agendamentos");
  const { id, data, horario } = req.body;
  const id_usuario = req.idUsuario; // Recuperado do middleware `verificaToken`
  console.log(id + " " + data + " " + horario);

  if (!id|| !data || !horario) {
      return res.status(400).json({
          status: 'failed',
          message: 'Preencha todos os campos obrigatórios!',
      });
  }

  let db = connectToDatabase();

  db.run(
      'INSERT INTO agendamentos (id_usuario, id, data, horario) VALUES (?, ?, ?, ?)',
      [id_usuario, id, data, horario],
      function (err) {
          if (err) {
              db.close();
              return res.status(500).json({
                  status: 'failed',
                  message: 'Erro ao criar o agendamento!',
                  error: err.message,
              });
          }

          db.close();
          res.status(201).json({
              status: 'success',
              message: 'Agendamento criado com sucesso!',
              agendamento: {
                  id_agendamento: this.lastID,
                  id_usuario,
                  id,
                  data,
                  horario,
              },
          });
      }
  );
});

app.get('/agendamentos', verificaToken, (req, res) => {
  const id_usuario = req.idUsuario;

  let db = connectToDatabase();

  db.all(
      `SELECT a.id_agendamento, a.data, a.horario, s.nomeS AS servico
       FROM agendamentos a
       JOIN servicos s ON a.id = s.id
       WHERE a.id_usuario = ?`, //talvez o erro esteja aqui!
      [id_usuario],
      (err, rows) => {
          if (err) {
              db.close();
              return res.status(500).json({
                  status: 'failed',
                  message: 'Erro ao buscar agendamentos!',
                  error: err.message,
              });
          }

          db.close();
          res.status(200).json({
              status: 'success',
              agendamentos: rows,
          });
      }
  );
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


