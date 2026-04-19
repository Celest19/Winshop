let formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    let correo = document.querySelector("input[name='correo']").value;
    let password = document.querySelector("input[name='password']").value;
    

    let usuarios = {
        correo,
        password,
    }



    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(usuarios),
    })

    if(res.ok){
        const data = await res.json();
        
        localStorage.setItem("usuarios", JSON.stringify(data));
        window.location.href = "../Estructura/Index.html";
    }else{
        const mensaje = await res.text();
        alert(mensaje)
    }
})