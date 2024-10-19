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
    origin: 'http://127.0.0.1:5173/', // Habilita apenas URL do frontend svelte
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
      expiresIn: '5m',
    });
  };

  async function login(req, res) {
    let db = connectToDatabase();
  
    const { email, senha } = req.body;
  
    // recupera a senha do usuário que está tentando fazer login
    db.get('SELECT id_usuario, senha FROM usuario WHERE email = ?', [email], async (error, result) => {
      if (error) {
        console.log(error)
      }
      else if (result) {
        let idUsuario = result.id_usuario;
        let senhaCorreta = await bcrypt.compare(senha, result.senha)
        if (!senhaCorreta) {
          return res.status(401).json({
            status: 'failed',
            message: 'Login ou senha incorretos!',
          });
        }
        let options = {
          maxAge: 5 * 60 * 1000, // minutos * segundos * milissegundos = total 20 minutos
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
      };
  

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

  app.post('/usuarios/novo', verificaToken, (req, res) => {
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
      res.status(500).json({
        status: 'failed',
        message: erro,
      });
    }
    else {
      // aqui começa o código para inserir o registro no banco de dados
      let db = new sqlite3.Database(databasePath, (err) => {
        if (err) {
          return console.error(err.message);
        }
        console.log('Conectou no banco de dados!');
      });
      db.get('SELECT email FROM usuario WHERE email = ?', [email], async (error, result) => {
        if (error) {
          console.log(error)
        }
        else if (result) {
          db.close((err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log('Fechou a conexão com o banco de dados.');
          });
          return res.status(500).json({
            status: 'failed',
            message: 'Este e-mail já está em uso!',
          });
        } else {
          let senha_criptografada = await bcrypt.hash(senha, 8)
          db.run('INSERT INTO usuario(nome, email, senha, data_nasc, num_cell) VALUES (?, ?, ?, ?, ?)', [nome,
            email, senha_criptografada, data_nasc, num_cell], (error2) => {
              if (error2) {
                console.log(error2)
              } else {
                db.close((err) => {
                  if (err) {
                    return console.error(err.message);
                  }
                  console.log('Fechou a conexão com o banco de dados.');
                });
                return res.status(200).json({
                  status: 'success',
                  message: 'Registro feito com sucesso!',
                  campos: req.body
                });
              }
            });
        }
      });
    }
  });

  app.delete('/usuarios/:id_usuario', verificaToken, (req, res) => {
    const { id_usuario } = req.params;
    console.log("chegou aqui: "+id_usuario);

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

  app.post('/usuarios/:id_usuario', verificaToken, async (req, res) => {
    const { id_usuario } = req.params;
    const { nome, email, senha, num_cell } = req.body;

    let db = connectToDatabase();

    // Se a senha está sendo atualizada, hash ela
    let senha_criptografada = senha ? await bcrypt.hash(senha, 8) : undefined;

    db.run('UPDATE usuario SET nome = ?, email = ?, num_cell = ?, senha = ? WHERE id_usuario = ?', 
      [nome, email, num_cell, senha_criptografada || null, id_usuario], function(err) {
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
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    });