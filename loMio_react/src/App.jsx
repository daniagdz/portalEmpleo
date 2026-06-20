import Header from './components/Header'
import Footer from './components/Footer'
import Pagination from './components/Pagination'

import { JobListings } from './components/JobsListings';
import jobsData from './data.json';

import { SearchFormSection } from './components/SearchFormSection';

import { useState } from 'react'

const RESOULTS_PER_PAGE = 5

function App() {

    const [filters, setFilters] = useState({
        technology: '',
        location: '',
        experienceLevel: ''

    })
    const [textToFilter, setTextToFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    //filtramos por los filtros que hayya
    const jobsFilteredByFilters = jobsData.filter(job => {
        return(
            (filters.technology === "" || job.data.technology === (filters.technology)) &&
            (filters.location === "" || job.data.modalidad == filters.location) &&
            (filters.experienceLevel === "" || job.data.nivel == filters.experienceLevel)
        )
    })


    //filtrado de datos tomando en cuenta el uso de filtros/selecciones del user
    const jobsWithFilter = textToFilter === "" ? jobsFilteredByFilters
        : jobsFilteredByFilters.filter(job => {
            return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
        })


    const totalPages = Math.ceil(jobsWithFilter.length / RESOULTS_PER_PAGE)


    //paginacion teniendo en cuenta el filtrado de datos
    const pageResoults = jobsWithFilter.slice((currentPage - 1) * RESOULTS_PER_PAGE, currentPage * RESOULTS_PER_PAGE)

    const handlePageChange = (page) => {
        console.log('current page: ', page)
        setCurrentPage(page);
    }


    const handleSearch = (filters) => {
        setFilters(filters)
        setCurrentPage(1)
    }

    const handleTextFilter = (newText) => {
        setTextToFilter(newText)
        setCurrentPage(1)
    }

    return (
        <>
            <Header />

            <main>
                <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

                <section>

                    <JobListings jobs={pageResoults} />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}

                    />
                </section>
            </main>

            <Footer />
        </>
    )
}

export default App