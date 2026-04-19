let form = document.getElementById("formRegistro");


form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let nombre = document.querySelector("input[name='nombre']").value;
    let usuario = document.querySelector("input[name='usuario']").value;
    let password = document.querySelector("input[name='password']").value;
    let correo = document.querySelector("input[name='correo']").value;
    let rol = document.querySelector("select").value;
    

    let datos = {
        nombre,
        correo,
        usuario,
        password,
        rol,
    }


    const res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(datos),
    })

    let respuesta = await res.text();
    alert(respuesta);
    window.location.href = "../Estructura/Index.html";
})