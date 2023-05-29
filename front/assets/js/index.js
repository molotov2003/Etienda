//variables de entorno

const urlApi = "http://localhost:3300/";
const api_insertar = "http://localhost:3300/usuarios";
//DOM
let email = document.querySelector("#email");
let password = document.querySelector("#password");
let btnEnviar = document.querySelector("#btnenviar");

//evento

btnEnviar.addEventListener("click", (e) => {
  e.preventDefault(); //previene el reenio del formulario
  fetch(urlApi + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      PASSWORD: password.value,
    }),
  })
    .then((res) => {
      return res.text();
    })
    .then((res) => {
      if (res === "true") {
        window.location = "http://127.0.0.1:5500/front/dashboard.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: '<a href="">Why do I have this issue?</a>',
        });
      }
    });
});


const btnergistro = document.querySelector("#btnregistro");
const nombrer = document.querySelector("#nombrer");
const emailr = document.querySelector("#emailr");
const passwordr = document.querySelector("#passwordr");
const direccionr = document.querySelector("#direccionr");
const ciudadr = document.querySelector("#ciudadr");
const zonapostalr = document.querySelector("#zonapostalr");
const telefonor = document.querySelector("#telefonor");
const adminr = document.querySelector("#adminr");

btnergistro.addEventListener("click", (e) => {
  fetch(api_insertar)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
  e.preventDefault();
  fetch(api_insertar, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: nombrer.value,
      email: emailr.value,
      PASSWORD: passwordr.value,
      direccion: direccionr.value,
      ciudad: ciudadr.value,
      zonaPostal: zonapostalr.value,
      telefono: telefonor.value,
      esAdmin: adminr.value,
    }),
  })
    .then((res) => {
      return res.text();
     console.log(res)
    })
    .then((res) => {
      if (res === "true") {
        console.log(res);
      }
    });

  console.log(nombrer);
});
