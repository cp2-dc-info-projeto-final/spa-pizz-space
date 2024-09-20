const form = document.querySelector('.cadastro');
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const data_nasc = document.getElementById('data_nasc');
const num_cell = document.getElementById('num_cell');
const senha = document.getElementById('senha');
const conf_senha = document.getElementById('conf_senha');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        nome: nome.value,
        email: email.value,
        data_nasc: data_nasc.value,
        num_cell: num_cell.value,
        senha: senha.value,
        conf_senha: conf_senha.value
    };

    try{
        const response = await fetch('/send-information', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        if(result.status == 'failed'){
            document.getElementById('message').innerHTML = result.message;
        }
        else{
            document.getElementById('message').innerHTML = result.message;
            nome.value = '';
            email.value = '';
            data_nasc.value = '';
            num_cell.value = '';
            senha.value = '';
            conf_senha.value = '';
        }
    } catch (error){
        console.log('Error: ', error);
    }
});