const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar Pug como motor de template
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Rota para renderizar o template
app.get('/', (req, res) => {
    res.render('index');
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
