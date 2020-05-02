# Market de Turismo

## Especificaciones

### Funcionamiento de Rutas

- ### **GET a "/compras" + token**  
Esta ruta chequeará que el token enviado pertenezca a un usuario administrador, dando error de ser negativo, de lo contrario retornará un array de objetos con el siguiente formato:

		array[{ usuario: "nombre de usuario", compras: [array de compras]}, { .... }]

- ### **GET a "/compras/:user" + token**  
	Va a devolver solo las compras del usuario **":user"**  

- ### **POST a "/login"**  
Con esta ruta se puede loguear al usuario y recibir un tooken de seguridad.  
Enviar:  
`{ usuario: "nombre de usuario", password: "********" }`

	Para recibir:  
`{ usuario: "nombre de usuario", token: "ias7d752glejhasi7sdfljg" }`


### **Archivos HTML, CSS y JS**  
- Los archivos *HTML* deben estar dentro de una carpeta **"static"**  
- Los archivos *CSS* van dentro de **"static/css"**  
	Utilizar el mismo nombre que el archivo HTML.  
	ej: *index.css*  

- Los archivos *JS* van dentro de **"static/scripts"**  
	Utilizar el mismo nombre que el archivo HTML.  
	ej: *index.js*
