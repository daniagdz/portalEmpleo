import Header from './components/Header'
import Footer from './components/Footer'
import Pagination from './components/Pagination'

import { JobListings } from './components/JobsListings';
import jobsData from './data.json';

import { useState } from 'react'

const RESOULTS_PER_PAGE = 5

function App() {

    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = Math.ceil(jobsData.length / RESOULTS_PER_PAGE)

    const pageResoults = jobsData.slice( (currentPage -1) * RESOULTS_PER_PAGE, currentPage * RESOULTS_PER_PAGE)

    const handlePageChange = (page) => {
        console.log('current page: ', page)
        setCurrentPage(page);
    }



    return (
        <>
            <Header />

            <main>
                <section class="jobs-search">
                    <h1>Encuentra tu próximo trabajo</h1>
                    <p>Explora miles de oportunidades en el sector tecnológico.</p>

                    <form id="empleos-search-form" role="search">
                        <div class="search-bar">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                                class="icon icon-tabler icons-tabler-outline icon-tabler-search">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                                <path d="M21 21l-6 -6" />
                            </svg>

                            <input name="search" id="empleos-search-input" required type="text"
                                placeholder="Buscar trabajos, empresas o habilidades" />
                        </div>

                        <div class="search-filters">

                            <div id="tech-checkboxes-container">
                                <label><input type="checkbox" value="javascript" name="tech" /> JavaScript </label>
                                <label><input type="checkbox" name="tech" value="python" /> Python</label>
                                <label><input type="checkbox" name="tech" value="react" /> React</label>
                                <label><input type="checkbox" name="tech" value="node" /> Node.js</label>

                                <label><input type="checkbox" name="tech" value="java" /> Java</label>
                                <label><input type="checkbox" name="tech" value="csharp" /> C#</label>
                                <label><input type="checkbox" name="tech" value="C++" /> C++</label>
                                <label><input type="checkbox" name="tech" value="ruby" /> Ruby</label>
                                <label><input type="checkbox" name="tech" value="php" /> PHP</label>
                            </div>


                            <select name="location" id="filter-location">
                                <option value="">Ubicación</option>
                                <option value="remoto">Remoto</option>
                                <option value="cdmx">Ciudad de México</option>
                                <option value="guadalajara">Guadalajara</option>
                                <option value="monterrey">Monterrey</option>
                                <option value="barcelona">Barcelona</option>
                            </select>

                            <select name="experience-level" id="filter-experience-level">
                                <option value="">Nivel de experiencia</option>
                                <option value="junior">Junior</option>
                                <option value="mid">Mid-level</option>
                                <option value="senior">Senior</option>
                                <option value="lead">Lead</option>
                            </select>
                        </div>
                    </form>

                    <span id="filter-selected-value"></span>
                </section>

                <section>

                    <JobListings jobs={pageResoults} />

                    <nav class="pagination">

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}

                        />

                    </nav>
                </section>
            </main>

            <Footer />
        </>
    )
}

export default App