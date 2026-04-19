# Documentación del Proyecto E-commerce Winshop

## 📌 Descripción del Proyecto
El presente proyecto consiste en el desarrollo de una aplicación web tipo e-commerce, la cual permite el registro e inicio de sesión de usuarios, así como la visualización y futura gestión de productos, mediante una interfaz conectada a un servidor backend y una base de datos.

---

## 🎯 Objetivo
Desarrollar una plataforma web tipo e-commerce que permita a los usuarios registrarse e iniciar sesión, así como visualizar productos disponibles dentro del sistema.

Se plantea implementar un sistema de roles, diferenciando entre clientes y vendedores. Los clientes podrán navegar y consultar productos, mientras que los vendedores tendrán la capacidad de gestionar productos mediante operaciones básicas de tipo CRUD (crear, leer, actualizar y eliminar).

El proyecto se desarrollará utilizando tecnologías web modernas tanto en el frontend como en el backend, junto con una base de datos para el almacenamiento de la información.

---

## 🛠 Tecnologías Utilizadas

### Frontend
- HTML (estructura de la página)
- CSS (diseño visual)
- JavaScript (interactividad y lógica)

### Backend
- Node.js
- Express (framework para la creación del servidor y manejo de rutas)

### Base de Datos
- MongoDB

---

## 📁 Estructura del Proyecto

El proyecto está dividido en dos partes principales:

### 🔹 Frontend
Se organizó en tres carpetas:
- **Estructura:** contiene los archivos HTML
- **Diseño:** contiene los estilos CSS
- **Funcionalidad:** contiene la lógica en JavaScript

### 🔹 Backend
- Servidor desarrollado con Node.js
- Definición y manejo de rutas HTTP para el registro e inicio de sesión de usuarios, con proyección a la integración de rutas para la gestión de productos
- Conexión a una base de datos MongoDB para el almacenamiento, consulta y validación de la información de usuarios

---

## ⚙️ Funcionalidades

- Registro de usuarios mediante formulario
- Inicio de sesión con validación de credenciales
- Verificación de existencia de usuario en la base de datos
- Manejo de respuestas del sistema según el resultado (éxito o error)
- Redirección del usuario al iniciar sesión correctamente
- Visualización de productos (funcionalidad proyectada)
- Implementación de roles de usuario (cliente y vendedor)
- Gestión de productos por parte del vendedor mediante operaciones CRUD (funcionalidad proyectada)

---

## 🧠 Lógica del Sistema

El sistema funciona a través de formularios en el frontend, los cuales capturan la información del usuario y la envían al servidor mediante peticiones HTTP utilizando el método POST.

El backend recibe los datos, los procesa y realiza consultas a la base de datos para:

- Verificar si el usuario ya se encuentra registrado
- Almacenar nuevos usuarios en la base de datos
- Validar las credenciales ingresadas en el proceso de inicio de sesión

Una vez realizada la validación, el sistema identifica el rol del usuario (cliente o vendedor), lo cual determina las acciones que puede realizar dentro de la aplicación.

En el caso del cliente, este podrá visualizar los productos disponibles. Por otro lado, el vendedor tendrá acceso a funcionalidades adicionales que le permitirán gestionar productos mediante operaciones CRUD (crear, leer, actualizar y eliminar).

Finalmente, el servidor genera una respuesta que es enviada al cliente, determinando el comportamiento de la aplicación, como mostrar mensajes al usuario o redirigirlo a diferentes vistas según su rol.

El sistema está diseñado de forma modular, permitiendo la futura integración y ampliación de funcionalidades relacionadas con la gestión de productos y control de acceso según el tipo de usuario.

---

## 🧾 Estándares de Codificación

Se aplicaron las siguientes buenas prácticas:

- Uso de **camelCase** para nombrar variables
- Nombres descriptivos para funciones y variables
- Separación del código según su función (HTML, CSS y JavaScript)
- Organización del proyecto en carpetas

---

## 🔄 Control de Versiones

Se utilizó Git como herramienta de control de versiones para gestionar los cambios del proyecto, permitiendo llevar un seguimiento de las modificaciones realizadas durante el desarrollo.

Permite:
- Guardar versiones del código
- Controlar modificaciones realizadas
- Facilitar la organización del proyecto

---

## 📊 Tabla de Cambios

| Fecha | Cambio | Descripción |
|------|------|------------|
| 01/04 | Inicio | Creación de la estructura del proyecto |
| 02/04 | Backend | Configuración del servidor y base de datos |
| 03/04 | Registro | Implementación del registro de usuarios |
| 04/04 | Login | Implementación del inicio de sesión |

---

## ✅ Conclusión

El desarrollo de este proyecto ha permitido integrar conocimientos de frontend, backend y bases de datos, logrando una aplicación funcional con sistema de autenticación de usuarios.

Actualmente, el sistema cuenta con funcionalidades de registro e inicio de sesión, estableciendo la base para la implementación de un e-commerce más completo.

Se proyecta la integración de nuevas funcionalidades, como la gestión de productos y el control de acceso mediante roles de usuario.

Durante el desarrollo se aplicaron buenas prácticas de programación y organización, así como el uso de herramientas como Git para el control de versiones del proyecto.