//aqui podriamos usar el mitico window.addevenlistener('load' ...)
//pero en el script de empleos pusimos el 'type="module"'


const botones = document.querySelectorAll('.button-apply-job');
const jobsList = document.querySelector('.jobs-listings');

/*
const ubicacion = document.querySelector('#filter-location');
const technology = document.querySelector('#filter-technology');
const experience = document.querySelector('#filter-experience-level');


const jobs = document.querySelectorAll('.job-listing-card');
*/


jobsList.addEventListener('click', function (event) {
    const elemento = event.target;
    if (elemento.classList.contains('button-apply-job')) {
        elemento.textContent = "Aplicado!";
        elemento.classList.add('is-applied');
        elemento.disabled = true;
    }
});

/*
ubicacion.addEventListener('change', function () {
    const valueSelected = ubicacion.value;

    jobs.forEach(job => {
        console.log(job.dataset.modalidad);
        const modalidad = job.dataset.modalidad;

        if (valueSelected === "" || valueSelected === modalidad) {
            job.style.display = 'flex';
        } else {
            job.style.display = 'none';
        }
    });
});
*/

/*
ubicacion.addEventListener('change', filtrarEmpleos);
technology.addEventListener('change', filtrarEmpleos);

function filtrarEmpleos() {
    const jobs = document.querySelectorAll('.job-listing-card');

    const ubicacionVal = ubicacion.value;
    const techVal = technology.value;

    jobs.forEach(job => {
        const modalidad = job.dataset.modalidad || "";
        const tech = job.dataset.tech || "";

        const techArray = tech.split(' ');

        const coincideUbicacion = ubicacionVal === "" || ubicacionVal === modalidad;
        const coincideTech = techVal === "" || techArray.includes(techVal);


        if (coincideTech && coincideUbicacion) {
            job.classList.remove('is-hidden');

        } else {
            job.classList.add('is-hidden');
        }

        // const isShown = selectedValue === '' || selectedValue === modalidad
        // toggle con un segundo parámetro booleano
        // Si isShown es false, añade la clase
        // Si isShown es true, quita la clase
        // job.classList.toggle('is-hidden', !isShown)
    })
}*/



