# Market de Turismo

## Especificaciones
Se creó una seudo-tabla de **"usuarios"** y una de **"paquetes"**  
-  ***usuarios***  
	*usuario:* **string**,  
	*password:* **string**,  
	*admin:* **boolean**,  
	*nivel:* **int**,  
	*compras:* **array**  

-  ***paquetes***  
	*destino:* **string**,  
	*img:* **string**,  
	*descripcion:* **string**,  
	*precio:* **int**  

* * *

### Funcionamiento de Rutas

- ### **POST a "/paquetes" + token**  
	Un adminisrador puede agregar paquetes enviando un JSON:

		{
			destino: "nombre de destino",
			img: "nombre de la imagen.jpg"
			descripcion: "Describir el destino",
			precio: 99999
		}
	***ATENCION!***: si el destino ya existe se sobreescribirá.  
	Un **"destino"** se compara con otro, solo en sus literales. Los espacios serán ignorados.  

* * *

- ### **GET a "/paquetes" + token**  
	Lo puede pedir cualquier usuario logueado.  
	Devuelve:  
	
		{paquete, paquete, paquete, ...}

* * *
- ### **GET a "/paquetes/:destino" + token**  
	Un usuario logueado recibirá todos los paquetes con destino **":destino"**  
		
		array[paquete, paquete, ...]

* * *

- ### **PUT a "/usuarios/:user" + token**  
	Para modificar las propiedades de un usuario.  
	Todos los usuarios pueden cambiar su propia contraseña.  
	Enviando:

		{ password: "12345678" }

* * *

- ### **GET a "/usuarios/:user" + token**
	Esta información la puede pedir el mismo usuario o un administrador.  
	Devuelve:  
		
		{usuario: valor, admin: valor, nivel: valor, compras: []}

* * *

- ### **GET a "/usuarios" + token**
	Chequea permiso de administrador y devuelve un array con los nombres de todos los usuarios.

		array["string","string", ...]

* * *

- ### **GET a "/compras" + token**  
	Esta ruta chequeará que el token enviado pertenezca a un usuario administrador, dando error de ser negativo, de lo contrario retornará un array de objetos con el siguiente formato:

		array[{ usuario: "nombre de usuario", compras: [array de compras]}, ...]

* * *

- ### **GET a "/compras/:user" + token**  
	Va a devolver solo las compras del usuario **":user"**  

		{usuario:"nombre de usuario", compras: [array de compras]}

* * *

- ### **POST a "/login"**  
	Con esta ruta se puede loguear al usuario y recibir un tooken de seguridad.  
	Enviar:  

		{ usuario: "nombre de usuario", password: "********" }

	Para recibir:  

		{ usuario: "nombre de usuario", token: "ias7d752glejhasi7sdfljg" }  

* * *

### **Archivos HTML, CSS y JS**  
- Los archivos *HTML* deben estar dentro de una carpeta **"static"**  
- Los archivos *CSS* van dentro de **"static/css"**  
	Utilizar el mismo nombre que el archivo HTML.  
	ej: *index.css*  

- Los archivos *JS* van dentro de **"static/scripts"**  
	Utilizar el mismo nombre que el archivo HTML.  
	ej: *index.js*
