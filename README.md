# Práctica Final Backend

Este proyecto corresponde a la práctica final de la asignatura **Programación Web 2 - Servidor**. Contiene una implementación completa de un servidor backend utilizando Node.js, Express y MongoDB, con funcionalidades de autenticación, manejo de usuarios, compañías y subida de archivos.

## Tecnologías utilizadas

- Node.js
- Express
- MongoDB con Mongoose
- JSON Web Tokens (JWT)
- Multer (para la subida de archivos)
- Express-validator (para validaciones)
- Bcrypt.js (para encriptar contraseñas)

## Funcionalidades

- Registro y login de usuarios con JWT
- Roles de usuario (admin, guest, etc.)
- Verificación por código
- Asociar usuarios a compañías
- Crear, actualizar y eliminar compañías
- Subida de logos de compañía
- Registro y manejo de invitados
- Solicitud y cambio de contraseñas
- Soft delete y restauración de usuarios
- Hard delete de usuarios

## Estructura del proyecto

```bash
.
├── controllers         # Controladores con lógica de negocio
├── middleware          # Middlewares de autenticación y validación
├── models              # Modelos de MongoDB con Mongoose
├── routes              # Rutas del API
├── storage             # Carpeta donde se almacenan archivos subidos
├── validators          # Validadores de usuario
├── utils               # Funciones de utilidad (como manejo de errores)
├── app.js              # Punto de entrada del servidor
└── .env                # Variables de entorno
```



## Como entrar? 

1. Clonar este repositotio.
2. Crear un refresh token de outlook usando azure y obtener el client id (crea un client_secret si te lo piden).
3. Crear un cluster en mongo atlas
5. Rellenar los datos de .env
6. Instalar las dependencias con npm -i
7. Levantar el repositorio con app.js
