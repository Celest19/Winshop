const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const url = "mongodb://localhost:27017";
const client = new MongoClient(url);


let db;

async function conectar(){
    await client.connect();
    db = client.db("winshop");
    console.log("MongoDB conectado");
    coleccion = db.collection("usuarios");
}

conectar();

app.get("/", (req,res)=>{
    res.send("Servidor funcionando");
    
});

app.listen(3000, ()=>{
    console.log("Servidor en puerto 3000");
});


/*Registro y login de usuarios*/

app.post("/register", async (req, res) => {
    console.log(req.body)
    const datos = req.body

    datos.rol = datos.rol.toLowerCase();

    const UsuariosRegistrados = await coleccion.findOne({correo: datos.correo});

    if(UsuariosRegistrados === null){
        await coleccion.insertOne(datos);
        res.send("Registro exitoso");
    }else{
        res.send("El usuario ya existe");
    }
})

// Login de usuario

app.post("/login", async (req, res) => {
    const usuarios = req.body

    const UsuariosRegistrados = await coleccion.findOne({correo: usuarios.correo});

    if(UsuariosRegistrados === null){
        return res.status(404).send("El usuario no existe");
    }else if(UsuariosRegistrados.password === usuarios.password){
        res.json(UsuariosRegistrados);
    }else{
        return res.status(401).send("El correo o la contraseña no coinciden");
    }
})