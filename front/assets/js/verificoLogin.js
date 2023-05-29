const api_usuario = "http://localhost:3300/login";
const api_insertar = "http://localhost:3300/usuarios";
// login
const btnlogin = document.querySelector("#btnlogin");
const inemail = document.querySelector("#btnemail");
const inpassword = document.querySelector("#btnpassword");

btnlogin.addEventListener("click", (e) => {
  fetch(api_usuario)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
  e.preventDefault();
  fetch(api_usuario, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: inemail.value,
      PASSWORD: inpassword.value,
    }),
  }).then(() => {
    location.reload();
  });
});

//registro
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
    })
    .then((res) => {
      if (res === "true") {
        console.log(res);
      }
    });

  console.log(nombrer);
});
