### Trabajo que se entrego como proyecto final de materia en "Programacion N Capas" e "Ingenieria de Software".

# Guanaco Business

Pagina web de compra de boletos para eventos socioculturales varios.

### Esta aplicación permite:
	Para los clientes:
	- Registrarse e Iniciar sesión con correo y contraseña.
	- Ver cartelera de eventos por categoria y eventos proximos.
	- Compra de boletos.
	- Capacidad de transferir boletos a otra persona mediante un codigo Qr.
	- Ver historial de ordenes realizadas.
	- Ver los tickets comprados.
	
	Para los distintos tipos de trabajadores:
	- Creacion y edicion de eventos.
	- Creacion y edicion de tiers de boletos de un evento.
	- Capacidad de asignar personal a eventos.
	- Capacidad de dar y quitar permisos a los usuarios registrados.
	- Validación de boletos mediante el escaneo de codigos Qr.
	- Deshabilitar eventos.
	- Deshabilitar cuentas de usuario.
	
Para la realizacion del cliente web se hizo uso del framework ReactJs, ademas de las librerias de: "axios" para la realizacion de peticiones
al server, "react-qr-code" para la creacion de Qr's, "uuid" para la creacion de codigos para generar sus correspondientes Qr's.

Para la realización del Server se hizo uso de Spring Boot en su version 3.1.0, ademas de las librerias de: Jpa y 
el driver de PostgreSql para manejar base de datos, "Spring Web" para la creacion de controladores web, 
"Spring Validation" para validar la integridad de los datos recibidos del cliente, "Spring Security" para la encriptacion de contraseñas
y asegurar los controladores mediante el uso de autenticacion, "Json Web Token" para la creacion y validacion de Tokens de autenticación.
