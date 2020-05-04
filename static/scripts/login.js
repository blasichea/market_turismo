var user = document.forms.usuario;
var pass = document.forms.password;

var datos = {usuario: user, password: pass};

function loguer() {
	fetch("http://localhost:3000/login", {
		headers: {
			'Accept': 'application/json',
			"Content-Type": "application/json",
			"async": true,
  			"crossDomain": true,
		},
		
		method: "POST",
        body: JSON.stringify(datos)
    })
        .then(response => {
            return response.json();
        })
        .then(res => {
			console.log(res.token);
			localStorage.setItem("token", res.token);
			fetch("http://localhost:3000?" + res.token);
		})
		
}