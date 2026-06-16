import { state } from './config.js'
import { renderApp } from './fetch-data.js'
state.count++

console.log(state)

const filterLocation = document.querySelector('#filter-location')
const filterTechnology = document.querySelector('#tech-checkboxes-container')
const filterExperience = document.querySelector('#filter-experience-level')
const filterSearch = document.getElementById('empleos-search-input')

const mensaje = document.querySelector('#filter-selected-value')

let empleosOriginales = [];

filterLocation.addEventListener('change', filtrarEmpleos)
filterTechnology.addEventListener('change', filtrarEmpleos)
filterExperience.addEventListener('change', filtrarEmpleos)
filterSearch.addEventListener('input', filtrarEmpleos)

function filtrarEmpleos() {

  const jobs = document.querySelectorAll('.job-listing-card')

  //GUARDA json original en la primera filtracion
  if (empleosOriginales.length === 0) {
    empleosOriginales = [...state.empleos];
  }

  const checkedBox = filterTechnology.querySelectorAll('input[name="tech"]:checked');
  const techSelected = Array.from(checkedBox).map(cb => cb.value);


  const selectedLocation = filterLocation.value
  const selectedExperience = filterExperience.value
  const searchText = filterSearch.value.toLowerCase().trim();

  if (selectedLocation || techSelected || selectedExperience || searchText) {
    mensaje.textContent = `Filtros activos: ${selectedLocation} ${techSelected} ${selectedExperience}`
  } else {
    mensaje.textContent = ''
  }

  //con filter() generamos un array nuevo (al igual que con map()) pero con elementos que
  //satisfagan unas condiciones
  state.empleos = empleosOriginales.filter(job => {
    

    //podriamos aplicar ** OPTIONAL CHAINING ** para comprobar que existe data en el json y evitar posibles errores
    const modalidad = job.data.modalidad || ""
    const nivel = job.data.nivel || ""
    const titulo = job.titulo.toLowerCase() || ""

    const techArray = job.data?.technology || []

    const matchesLocation = selectedLocation === '' || selectedLocation === modalidad
    const matchesTech = techSelected.length === 0 || techSelected.some(tech => techArray.includes(tech));
    // const matchesTech = techSelected.length === 0 || techSelected.every(tech => techArray.includes(tech));


    const matchesExperience = selectedExperience === '' || selectedExperience === nivel
    const matchText = searchText === "" || titulo.includes(searchText);

    const isShown = matchesLocation && matchesTech && matchesExperience && matchText

    return isShown;
  })

  //redirigimos a la pag1 tras filtras y ejecutamos el render
  state.currentPage = 1;
  renderApp();

}

