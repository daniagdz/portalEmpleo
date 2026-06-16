import { state } from './config.js'

const jobsList = document.querySelector('.jobs-listings');
const paginationBox = document.querySelector('.pagination');

//let empleos = [];
const RESULTS_PER_PAGE = 3
//let currentPage = 1;

fetch('data.json')
    .then(response => response.json())
    .then(jobs => {
        state.empleos = jobs;
        renderApp();
    });


//exportamos funcion para que la use el filter
export function renderApp() {

    console.log('creando app..');
    jobsList.innerHTML = "";
    paginationBox.innerHTML = "";

    if (state.empleos.length === 0) {
        jobsList.innerHTML = '<p>No hay empleos disponibles por ahora.</p>'
        return
    }

    const indexStart = (state.currentPage - 1) * RESULTS_PER_PAGE;
    const indexEnd = indexStart + RESULTS_PER_PAGE;

    const jobsShow = state.empleos.slice(indexStart, indexEnd);
    const totalPages = Math.ceil(state.empleos.length / RESULTS_PER_PAGE)



    jobsShow.forEach(job => {
        const article = document.createElement('article');
        article.className = "job-listing-card";

        //asignamo los 'data-X' a los articles
        article.dataset.modalidad = job.data.modalidad;
        article.dataset.tech = job.data.technology;
        article.dataset.nivel = job.data.nivel;
        article.dataset.titulo = job.titulo.toLowerCase();

        article.innerHTML = `
                <div>
                    <h3>${job.titulo}</h3>
                    <small>${job.empresa} | ${job.ubicacion}</small>
                    <p>
                        ${job.descripcion}
                    </p>
                </div>
                <button class="button-apply-job">Aplicar</button>
            `;

        jobsList.appendChild(article);
    });


    //boton prev
    if(state.currentPage > 1){
        const btPrev = document.createElement('a');
        btPrev.href = "#";
        btPrev.textContent = "<<Prev";

        btPrev.addEventListener('click', function(e){
            e.preventDefault();
            state.currentPage--;
            renderApp();
        });
        paginationBox.appendChild(btPrev);
    }

    //numeracion pags
    for (let i = 1; i <= totalPages; i++) {

        const btPage = document.createElement('a');
        btPage.href = "#";
        btPage.textContent = i;

        if (i == state.currentPage) {
            btPage.classList.add('is-active');
        }
        
        btPage.addEventListener('click', function(e){
            e.preventDefault();
            state.currentPage = i;
            renderApp();
        });


        paginationBox.appendChild(btPage);
    }

    //boton next
    if(state.currentPage < totalPages){
        const btNext = document.createElement('a');
        btNext.href = "#";
        btNext.textContent = "Next>>";

        btNext.addEventListener('click', function(e){
            e.preventDefault();
            state.currentPage++;
            renderApp();
        });
        paginationBox.appendChild(btNext);
    }
}



