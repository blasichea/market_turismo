const url = "http://localhost:3000/login";

/* var user = document.getElementById("us");
var pass = document.getElementById("pass"); */





function loguer() {
	var user = document.getElementById("us").value;
	var pass = document.getElementById("pass").value;
	var data = {usuario: user, password: pass};
	console.log(data);
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
				localStorage.setItem("token", response);
			} else {
				console.log('Success:', response);
			}
		})
		.catch(error => console.error('Error:', error));
		
}