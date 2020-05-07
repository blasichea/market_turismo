let botonUsuario = document.getElementById('botonUsuario');


let token = localStorage.getItem('token');
//const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoianVhbiIsImlhdCI6MTU4ODYwNzEyMn0.jpwRQ24HXLi6uN_BNTTy7cuMPSvItqJwp91Lxwd9Kfk';
const urlUsuario = 'http://localhost:3000/usuarios?token=';

function fetchToken(){

    fetch(urlUsuario + token)
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
       
        let convertido = JSON.stringify(data)
        let contenedor = document.getElementById('usCompras');

        contenedor.innerHTML = convertido;


    })
    .catch(function(err) {
        console.error(err);
    });

}

botonUsuario.addEventListener('click', fetchToken);


/**
 * 
 * 
 */