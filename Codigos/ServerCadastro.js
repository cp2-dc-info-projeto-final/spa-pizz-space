const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const PORT = 8080;

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','Pagina_Cadastro.html' ));
});

app.post('/send-information', (req, res) => {
    const {nome, email, data_nasc, num_cell, senha, conf_senha} = req.body;
    if(nome.length < 1 || email.length < 1 || data_nasc.length < 1 || num_cell.length < 1 || senha.length < 1 || conf_senha.length < 1){
        res.status(200).json({
            status: 'failed',
            message: 'Por favor, preencha todos os campos corretamente!',
        });
    }
    else if(senha != conf_senha){
        res.status(200).json({
            status: 'failed',
            message: 'As senhas digitadas não são iguais!',
        });
    }
    else{
        // aqui vai o código para inserir os registros no banco de dados
        const db = new sqlite3.Database('./db/Banco.db', (err) => {
            if(err){
                return console.error(err.message);
            }
        console.log("Conectou com o banco de dados!");
        });

        db.run('INSERT INTO usuario(nome, email, data_nasc, num_cell, senha) VALUES (?, ?, ?, ?, ?)',
        [nome, email, data_nasc, num_cell, senha], (err) => {
            if(err){
                console.error(err.message);
            }
        });
        
        db.close((err) => {
            if(err){
                return console.error(err.message);
            }
                console.log("Fechou a conexão com o banco de dados!");
        });
        res.status(200).json({
            status: 'success',
            message: 'Registro feito com sucesso!',
            campos: req.body
        });
    }
});

app.listen(PORT, () => {
    console.log('Servidor iniciado na porta 8080');
});