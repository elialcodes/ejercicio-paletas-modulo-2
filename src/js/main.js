'use strict';

const containerPalette = document.querySelector('.js-container-main'); //contenedor para paletas normales
const containerFavorite = document.querySelector('.js-container-favorite'); //contenedor para paletas favoritas
const errorMesagge = document.querySelector('.js-message-error'); //parrafo para posible mensaje de error
const inputSearch = document.querySelector('.js-search-input');
const buttonSearchReset = document.querySelector('.js-search-reset-button');
const buttonFavoriteReset = document.querySelector('.js-favorite-reset-button');
let palettesList = []; //variable global declarada let para irla reasignando
let favoriteList = []; //variable global declarada con let para irla reasignando

//5. FUNCIÓN PARA AÑADIR/ELIMINAR PALETAS FAVORITAS:

function handleFavoritePalettes(event) {
  //detectamos la paleta seleccionada buscando que el id de la currentTarget coincida con el id de alguna paleta:
  const paletteSelected = palettesList.find((palette) => event.currentTarget.id === palette.id);

  //en la lista de favoritas, buscamos si el índice de la currentTarget coincide con el id de alguna paleta:
  const indexFavoritePalettes = favoriteList.findIndex((favoriteItem) => {
    return event.currentTarget.id === favoriteItem.id;
  });

  if (indexFavoritePalettes === -1) {
    favoriteList.push(paletteSelected);
  } else {
    favoriteList.splice(indexFavoritePalettes, 1);
  }
  renderPalettes(favoriteList, containerFavorite); //pintamos las paletas favoritas en el contenedor de favoritas
}

// 3. FUNCIÓN PARA PINTAR PALETAS con:
//argumento 1: el listado de paletas (el del fetch o el de localStorage)
//argumento 2: el contenedor donde pintarlas (puede ser el contenedor normal o el de favoritas)
//2 bucles anidados: el primero itera para pintar los 5 nombres (h3) de las paletas
//y el segundo itera dentro para pintar los 5 colores en las 5 paletas.
//Tras haber creado el contenido, del tirón lo pintamos con innerHTML.

function renderPalettes(palettes, container) {
  if (!container) {
    console.error('El contenedor no se encontró en el DOM.');
    return;
  }
  // Resto del código...

  let content = ''; //variable que se que va reasigando en cada iteración y va aumentando el contenido

  for (const palette of palettes) {
    content += `<div class="container__palette js-container__palette"  id="${palette.id}"><h3>${palette.name}</h3><div class="container__palette--colors">`;
    for (const color of palette.colors) {
      content += `<div class="color" style="background-color:#${color}"></div>`;
    }
    content += `</div></div>`;
  }
  container.innerHTML = content;

  //insertamos los eventos al pintarse las paletas en el html
  const containers = document.querySelectorAll('.js-container__palette'); //array de paletas
  for (const container of containers) {
    container.addEventListener('click', handleFavoritePalettes);
  }
  inputSearch.addEventListener('input', handleFilterPalettes); //evento de input
}

// 2. FUNCIÓN PARA PEDIR DATOS AL SERVIDOR para tener paletas la primera vez que abrimos la página
//y que después los guarda en localStore pasandolos a string:

function getDataApiAndPaint() {
  fetch(
    'https://beta.adalab.es/ejercicios-de-los-materiales/js-ejercicio-de-paletas/data/palettes.json'
  )
    .then((response) => response.json())
    .then((data) => {
      palettesList = data.palettes; //guardamos en la variable global el array de objetos (id, nombre, from y colors)
      renderPalettes(palettesList, containerPalette); //función pintar paletas (argumentos: datos del fetch y contenedor normal)
      localStorage.setItem('palettes', JSON.stringify(palettesList)); //guardamos los datos recibidos del fetch
    });
}

//constante para obtener los datos de localStorage y los parseamos a JSON.
const palettesSaved = JSON.parse(localStorage.getItem('palettes'));

// 1. CONDICIONAL QUE ARRANCA TODO EL CÓDIGO: si hay datos en localStorage (palettesSaved),
//llamamos a la función de pintar paletas con los datos del localStorage como argumento
// y si no hay datos guardados, llamamos a la función que ejecuta fetch:
if (palettesSaved !== null) {
  palettesList = palettesSaved; //metemos las paletas guardadas de localStorage en palettesList para tener datos con los que trabajar
  renderPalettes(palettesList, containerPalette); //las lista de paletas y el contenedor normal serán los argumentos utilizados
} else {
  getDataApiAndPaint(); //llamamos a la función del fetch, en la cual ya hay una llamada a la función pintar paletas
}

// 4. FUNCIÓN PARA FILTRAR PALETAS
//tomamos el valor del input, hacemos un filter que nos haga coincidir letras MAY y MIN y llamamos a
//pintar paletas con las paletas ya filtradas y el contenedor donde queremos pintarlas como argumentos.

function handleFilterPalettes() {
  const inputSearchValue = inputSearch.value;
  const filteredPalettes = palettesList.filter((palette) => {
    return palette.name.toLowerCase().includes(inputSearchValue.toLowerCase());
  });
  renderPalettes(filteredPalettes, containerPalette);
}

// 6. FUNCIÓN PARA RESET en el input de búsqueda

function handleResetSearchButton() {
  inputSearch.value = '';
  renderPalettes(palettesList, containerPalette);
}

buttonSearchReset.addEventListener('click', handleResetSearchButton);

// 7. FUNCIÓN PARA RESET en el contenedor de favoritos

function handleResetFavorites() {
  favoriteList = [];
  renderPalettes(favoriteList, containerFavorite);
}

buttonFavoriteReset.addEventListener('click', handleResetFavorites);
