# CRUD de Productos con Mongoose
## API de Tecnologia desarrollada en Node.js con Express.js y MongoDB
### Autor: José Barone

### Requisitos

1. **Configurar el proyecto:**
   - Inicializa un nuevo proyecto con `npm init`.
   - Instala las dependencias necesarias: `express`, `mongoose`, y `morgan`.
   - configura el package.json en "type": "module" y añade el script "start": "node --watch server.js", 

2. **Configurar Mongoose:**
   - Crea una conexión a MongoDB usando Mongoose.
   - Define un modelo de Mongoose para los productos tecnológicos con la estructura especificada.

3. **Crear el servidor Express:**
   - Configura un servidor Express.
   - Utiliza middleware para parsear JSON y loguear solicitudes HTTP.

4. **Implementar las rutas de la API:**
   - `GET /`: Devuelve un mensaje de bienvenida a la API.
   - `GET /productos`: Devuelve todos los productos. Permite filtrar por categoría mediante query string.
   - `GET /productos/:id`: Devuelve un producto por su ID.
   - `POST /productos`: Crea un nuevo producto.
   - `DELETE /productos/:id`: Elimina un producto por su ID.
   - `PATCH /productos/:id`: Actualiza parcialmente un producto por su ID.
   - `PUT /productos/:id`: Actualiza completamente un producto por su ID.

5. **Implementar 5 rutas adicionales:**
   - `GET /productos/importes/mayor/:importe`: Devuelve los productos con un importe mayor al especificado.
   - `GET /productos/importes/menor/:importe`: Devuelve los productos con un importe menor al especificado.
   - `GET /productos/categorias`: Devuelve una lista de todas las categorías disponibles.
   - `GET /productos/nombre/:nombre`: Devuelve los productos que coinciden con el nombre especificado (búsqueda parcial).
   - `GET /productos/rango/:min/:max`: Devuelve los productos cuyo importe esté dentro del rango especificado.
 
6. **Implementar 2 rutas mas para modificar y actualizar varios productos:** 
   - `GET /productos/bulk-update`: Actualizar múltiples productos
   - `GET /productos/bulk-delete`: Eliminar múltiples productos

### Entrega

- El trabajo va a estar subido en repositorio de GitHub 
#### https://github.com/Joseargentina/CRUD-de-productos-con-Mongoose-Jose
