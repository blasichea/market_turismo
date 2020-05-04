const url = "http://localhost:3000/login";

function loguer() {
	var user = document.getElementById("us").value;
	var pass = document.getElementById("pass").value;
	var data = {usuario: user, password: pass};

	fetch(url, {
		method: 'POST', // or 'PUT'
		body: JSON.stringify(data), // data can be `string` or {object}!
		headers:{
			'Content-Type': 'application/json'
		}
		}).then(res => res.json())
		.then(response => {
			
			const {token} = response;
			if (token) {
				localStorage.setItem("token", response.token);
				location.replace("http://localhost:3000?token=" + token);
			} else {
				alert(response);
			}
		})
		.catch(error => console.error('Error:', error));
}