import './fetch-data.js';
import './filter.js';
import './devjobs-avatar-element.js';


const botones = document.querySelectorAll('.button-apply-job');
const jobsList = document.querySelector('.jobs-listings');

jobsList.addEventListener('click', function (event) {
    const elemento = event.target;
    if (elemento.classList.contains('button-apply-job')) {
        elemento.textContent = "Aplicado!";
        elemento.classList.add('is-applied');
        elemento.disabled = true;
    }
});