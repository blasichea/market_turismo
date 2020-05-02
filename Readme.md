# Market de Turismo

## Especificaciones

### Funcionamiento de Rutas

- GET a "/compras"  
Esta ruta chequeará que el token enviado pertenezca a un usuario administrador, dando error de ser negativo, de lo contrario retornará un array de objetos con el siguiente formato:

		array[{ usuario: "nombre de usuario", compras: [array de compras]}, { .... }]

- POST a "/login"  
Con esta ruta se puede loguear al usuario y recibir un tooken de seguridad.  
Enviar:  
`{ usuario: "nombre de usuario", password: "********" }`

	Para recibir:  
`{ usuario: "nombre de usuario", token: "ias7d752glejhasi7sdfljg" }`


### Archivos HTML, CSS y JS  
- Los archivos *HTML* deben estar dentro de una carpeta **"static"**  
- Los archivos *CSS* van dentro de **"static/styles"**  
	Utilizar el mismo nombre que el archivo HTML.  
	ej: *index.css*  

- Los archivos *JS* van dentro de **"static/scripts"**  
	Utilizar el mismo nombre que el archivo HTML.  
	ej: *index.js*
