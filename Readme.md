# Market de Turismo

## Especificaciones
Se creó una seudo-tabla de **"usuarios"** y una de **"paquetes"**  
-  ***usuarios***  
	*usuario:* **string**,  
	*clave:* **string**,  
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

- ### **PUT a "/usuarios/:usuario" + token**  
	Para modificar las propiedades de un usuario.  
	Todos los usuarios pueden cambiar su propia contraseña.  
	Enviando:

		{ clave: "12345678" }

	Un administrador además puede cambiar la característica *"nivel"* y *"admin"* de cualquier usuario.

* * *

- ### **GET a "/usuarios/:usuario" + token**
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

- ### **GET a "/compras/:usuario" + token**  
	Va a devolver solo las compras del usuario **":usuario"**  

		{usuario:"nombre de usuario", compras: [array de compras]}

* * *

- ### **GET a "/login"**  
	Con esta operación se obtiene la página de login.  
	No hace falta enviar token.

* * *

- ### **POST a "/login"**  
	Con esta ruta se puede loguear al usuario y recibir un tooken de seguridad.  
	Enviar:  

		{ usuario: "nombre de usuario", clave: "********" }

	Para recibir:  

		{ usuario: "nombre de usuario", token: "ias7d752glejhasi7sdfljg" }  

* * *

- ### **GET a "/" + token**  
	Obtiene la página principal

* * *

- ### **GET a "/administrar" + token**  
	A esta ruta solo puede acceder un administrador.
	Obtendrá la página de administración de usuarios, compras y paquetes.

* * *

### **Archivos HTML, CSS y JS**  
- Los archivos *HTML* deben estar dentro de una carpeta **"static"**  
- Los archivos *CSS* van dentro de **"static/css"**  
	Utilizar el mismo nombre que el archivo HTML.  
	ej: *index.css*  

- Los archivos *JS* van dentro de **"static/scripts"**  
	Utilizar el mismo nombre que el archivo HTML.  
	ej: *index.js*

- Los archivos de imagenes van dentro de **"static/assets"**  
