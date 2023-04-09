# Documentación de la API - Nombre del Proyecto (Backend)

## Índice

1. [Usuarios](#usuarios)
    - [Registro](#registro)
    - [Iniciar sesión](#iniciar-sesión)
    - [Confirmar cuenta](#confirmar-cuenta)
    - [Recuperar contraseña](#recuperar-contraseña)
    - [Validar token](#validar-token)
    - [Cambiar contraseña](#cambiar-contraseña)
    - [Perfil](#perfil)
2. [Empresas](#empresas)
    - [Listar empresas](#listar-empresas)
    - [Crear empresa](#crear-empresa)
    - [Obtener empresa](#obtener-empresa)
    - [Editar empresa](#editar-empresa)
    - [Eliminar empresa](#eliminar-empresa)
3. [Artículos](#artículos)
    - [Agregar artículo](#agregar-artículo)
    - [Editar artículo](#editar-artículo)
    - [Eliminar artículo](#eliminar-artículo)
    - [Enviar PDF de inventario](#enviar-pdf-de-inventario)

## Usuarios

### Registro

POST `/api/users`

Parámetros:
- `email` (string): Dirección de correo electrónico del usuario.
- `password` (string): Contraseña del usuario.

### Iniciar sesión

POST `/api/users/login`

Parámetros:
- `email` (string): Dirección de correo electrónico del usuario.
- `password` (string): Contraseña del usuario.

### Confirmar cuenta

GET `/api/users/confirm/:token`

### Recuperar contraseña

POST `/api/users/forgot-password`

Parámetros:
- `email` (string): Dirección de correo electrónico del usuario.

### Validar token

GET `/api/users/forgot-password/:token`

### Cambiar contraseña

POST `/api/users/forgot-password/:token`

Parámetros:
- `password` (string): Nueva contraseña del usuario.

### Perfil

GET `/api/users/profile`

## Empresas

### Listar empresas

GET `/api/companies`

### Crear empresa

POST `/api/companies`

Parámetros:
- `name` (string): Nombre de la empresa.
- `address` (string): Dirección de la empresa.
- `NIT` (string): NIT de la empresa.
- `phone` (string): Teléfono de la empresa.

### Obtener empresa

GET `/api/companies/:id`

### Editar empresa

PUT `/api/companies/:id`

Parámetros:
- `name` (string, opcional): Nombre de la empresa.
- `address` (string, opcional): Dirección de la empresa.
- `phone` (string, opcional): Teléfono de la empresa.

### Eliminar empresa

DELETE `/api/companies/:id`

## Artículos

### Agregar artículo

POST `/api/articles`

Parámetros:
- `itemName` (string): Nombre del artículo.
- `quantity` (number): Cantidad del artículo.
- `price` (number): Precio del artículo.

### Editar artículo

PUT `/api/articles/:id`

Parámetros:
- `itemName` (string, opcional): Nombre del artículo.
- `quantity` (number, opcional): Cantidad del artículo.
- `price` (number, opcional): Precio del artículo.
