# Company Register (Backend)

## Introducción

El backend de esta aplicación maneja la autenticación de usuarios, el registro y la gestión de empresas, y la gestión de inventarios. Utiliza MongoDB como base de datos y proporciona una API para interactuar con los datos.

## Instalación y configuración

1. Asegúrese de tener Node.js y npm (gestor de paquetes de Node.js) instalados en su sistema
2. Clone el repositorio y navegue hasta la carpeta del backend.
3. Ejecute `npm install` para instalar las dependencias necesarias.
4. Copie y configure el archivo `.env.example` como `.env`, estableciendo las variables de entorno necesarias, incluidos los detalles de conexión de MongoDB y las credenciales de AWS SES (u otro servicio de correo electrónico) para el envío de PDFs por correo electrónico.
5. Inicie el servidor ejecutando `npm run dev`.

## Pruebas

Ejecute `npm test` para ejecutar las pruebas unitarias y de integración.

## API y rutas disponibles

La API expone las siguientes rutas:
- Autenticación (iniciar sesión, cerrar sesión, registro de usuarios)
- Empresas (listar, crear, editar, eliminar)
- Inventario (listar, crear, editar, eliminar, enviar PDF por correo electrónico)

Puede encontrar más información sobre las rutas y los parámetros requeridos en la documentación de la API incluida en el proyecto.
