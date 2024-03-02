'use strict';

const containerPalette = document.querySelector('.js-container'); //contenedor con todas las paletas

//Función para pintar las paletas con 2 bucles anidados: el primero itera para pintar los 5 nombres (h3) de las paletas
//y el segundo itera para pintar los 5 colores en las 5 paletas.
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

//Función para pedir datos al servidor y llamar a la función para pintar paletas (renderPalettes)

fetch(
  'https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json'
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const palettes = data.palettes; //array de objetos con id, nombre, from y colors
    renderPalettes(palettes);
  });
