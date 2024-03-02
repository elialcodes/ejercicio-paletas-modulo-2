'use strict';

const containerPalette = document.querySelector('.js-container'); //contenedor con todas las paletas
const errorMesagge = document.querySelector('.js-message-error'); //parrafo para posible mensaje de error

//Función para pintar las paletas con 2 bucles anidados: el primero itera para pintar los 5 nombres (h3) de las paletas
//y el segundo itera dentro para pintar los 5 colores en las 5 paletas.
//Tras haber creado el contenido, del tirón lo pintamos con innerHTML.

function renderPalettes(palettes) {
  let content = '';
  for (const palette of palettes) {
    content += `<div class="container__palette"><h3>${palette.name}</h3><div class="container__palette--colors">`;
    for (const color of palette.colors) {
      content += `<div class="color" style="background-color:#${color}"></div>`;
    }
    content += `</div></div>`;
  }
  containerPalette.innerHTML = content;
}

//Función para pedir datos al servidor y que los guarda en localStore pasandolos a string:

function getDataApi() {
  fetch(
    'https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json'
  )
    .then((response) => response.json())
    .then((data) => {
      errorMesagge.innerHTML = '';
      console.log(data);
      const palettes = data.palettes; //array de objetos con id, nombre, from y colors
      localStorage.setItem('palettes', JSON.stringify(palettes)); //guardamos los datos recibidos del fetch
    })
    .catch(() => {
      errorMesagge.innerHTML = 'ERROR: Lo sentimos, ha habido un error';
    });
}

//constante para guardar los datos de localStorage y los parseamos a JSON:
const palettesSaved = JSON.parse(localStorage.getItem('palettes'));

//condicional que arranca todo el código: si hay datos en localStorage (palettesSaved),
//llamamos a la función de pintar paletas con los datos del localStorage como argumento
// y si no hay datos guardados, llamamos a la función que ejecuta fetch:
if (palettesSaved !== null) {
  renderPalettes(palettesSaved);
} else {
  getDataApi();
}
