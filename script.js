let input = document.querySelector(".input");
let button = document.querySelector("button");

function cargarCiudad(input) {
  let ciudad = input;

  document.querySelector(".container").style.visibility = "visible";

  $.getJSON(
    `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&lang=es&appid=fdd533266e28101881f610f2b8f1ebe1`,
    function (data) {
      document.querySelector("#ciudad").textContent = data.name;
      let temperatura = document.querySelector("#temperatura").textContent =
      Math.round(data.main.temp - 273.15);
      document.querySelector("#temperatura").innerHTML += "<sup>°C</sup>";
      document.querySelector(
        "#wicon"
      ).src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
      document.querySelector("#descripcion").textContent =
        data.weather[0].description;
      console.dir(data);
    }
  )  .fail(function(){
        alert (`${ciudad} ciudad no encontrada`);
      })   
}

document.querySelector("button").addEventListener("click", function () {
  if (!document.querySelector("input").value) {
    alert("Debe ingresar una ciudad");
  } else {
    let ciudad = document.querySelector("input").value.split(" ").join("%20");
    document.querySelector("input").value = "";
    cargarCiudad(ciudad);
  }
});

document.body.addEventListener("keydown", function (info) {
  if (info.key === "Enter") {
    if (!document.querySelector("input").value) {
      alert("Debe ingresar una ciudad");
    } else {
      let ciudad = document.querySelector("input").value.split(" ").join("%20");
      document.querySelector("input").value = "";
      cargarCiudad(ciudad);
    }
  }
});
