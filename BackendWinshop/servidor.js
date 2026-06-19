const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

let db;
let coleccion; // Declarada correctamente para evitar problemas de ámbito

async function conectar(){
    await client.connect();
    db = client.db("winshop");
    console.log("MongoDB conectado");
    coleccion = db.collection("usuarios");
}

conectar();

app.get("/", (req, res) => {
    res.send("Servidor funcionando");
});

app.listen(3000, () => {
    console.log("Servidor en puerto 3000");
});

// Obtener todos los usuarios
app.get("/usuarios", async (req, res) => {
    const usuarios = await coleccion.find().toArray();
    res.json(usuarios);
});

/* Registro y login de usuarios */

app.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const datos = req.body;

        // Normalizamos los datos a minúsculas para evitar duplicados por mayúsculas
        datos.correo = datos.correo.toLowerCase();
        datos.rol = datos.rol.toLowerCase();

        const UsuariosRegistrados = await coleccion.findOne({ correo: datos.correo });

        if (UsuariosRegistrados === null) {
            // 1. Insertamos el usuario en MongoDB
            const resultado = await coleccion.insertOne(datos);
            
            // 2. IMPORTANTE: Le agregamos al objeto 'datos' el _id que le asignó MongoDB nativamente
            datos._id = resultado.insertedId;

            // 3. Enviamos el objeto 'datos' completo. Tu JS ahora tendrá el nombre, correo y rol para loguearlo directo
            res.json(datos); 
            
        } else {
            // Si el usuario ya existe, devolvemos un 400 (Bad Request)
            res.status(400).json({ mensaje: "El usuario ya existe" });
        }
    } catch (error) {
        console.error("Error en registro:", error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
});

// Login de usuario
app.post("/login", async (req, res) => {
    try {
        const usuarios = req.body;
        const correoMinuscula = usuarios.correo.toLowerCase(); // Corregido el uso aquí
        
        const UsuariosRegistrados = await coleccion.findOne({ correo: correoMinuscula });

        if (UsuariosRegistrados === null) {
            return res.status(404).json({ mensaje: "El usuario no existe" });
        } else if (UsuariosRegistrados.password === usuarios.password) {
            // Enviamos el usuario completo. El frontend se encargará de remover la password si lo requiere
            res.json(UsuariosRegistrados);
        } else {
            return res.status(401).json({ mensaje: "El correo o la contraseña no coinciden" });
        }
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
});

// RUTA PARA ELIMINAR UN USUARIO
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const idUsuario = req.params.id; 
        
        // 1. Buscamos primero al usuario usando ObjectId nativo
        const usuarioAEliminar = await coleccion.findOne({ _id: new ObjectId(idUsuario) });

        if (!usuarioAEliminar) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // 2. ESCUDO DE SEGURIDAD
        if (usuarioAEliminar.rol === 'admin') {
            return res.status(403).json({ 
                mensaje: "Seguridad crítica: No está permitido eliminar cuentas de Administrador" 
            });
        }

        // 3. Borrado definitivo
        await coleccion.deleteOne({ _id: new ObjectId(idUsuario) });
        res.json({ mensaje: "Usuario eliminado correctamente de la base de datos" });

    } catch (error) {
        console.error("Error al eliminar:", error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
});

// RUTA PARA ACTUALIZAR ROL
app.put('/usuarios/:id', async (req, res) => {
    try {
        const idUsuario = req.params.id; 
        const nuevoRol = req.body.rol;
        
        // 1. Buscamos primero al usuario real para verificar su rol actual
        const usuarioAActualizar = await coleccion.findOne({ _id: new ObjectId(idUsuario) });

        if (!usuarioAActualizar) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // 2. ESCUDO DE SEGURIDAD
        if (usuarioAActualizar.rol === 'admin') {
            return res.status(403).json({ 
                mensaje: "Seguridad crítica: No está permitido cambiar cuentas de Administrador" 
            });
        }

        // 3. Actualización de rol
        await coleccion.updateOne(
            { _id: new ObjectId(idUsuario) }, 
            { $set: { rol: nuevoRol } }        
        );

        res.json({ mensaje: "Usuario actualizado correctamente en la base de datos" });

    } catch (error) {
        console.error("Error al actualizar:", error);
        res.status(500).json({ mensaje: "Hubo un error en el servidor" });
    }
});