import { useState } from 'react'

import Pagination from '../components/Pagination'
import { SearchFormSection } from '../components/SearchFormSection';


import { JobListings } from '../components/JobsListings';
import jobsData from '../data.json';




const RESOULTS_PER_PAGE = 5

export function SearchPage() {

    const [filters, setFilters] = useState({
        search: '',
        technology: '',
        location: '',
        experienceLevel: ''

    })
    const [textToFilter, setTextToFilter] = useState('')
    const [currentPage, setCurrentPage] = useState(1)

    //filtramos por los filtros que haya
    /*
    evaluamos cada objeto del json 
    si se cumplen las condiciones, con '.filter' añadimos ese objeto al array 'jobsFilteredByFilters'
    */
    const jobsFilteredByFilters = jobsData.filter(job => {
        const matchFilters = (
            (filters.technology === "" || job.data.technology === (filters.technology)) &&
            (filters.location === "" || job.data.modalidad == filters.location) &&
            (filters.experienceLevel === "" || job.data.nivel == filters.experienceLevel)
        )

        const matchText = (
            filters.search === "" || job.titulo.toLowerCase().includes(filters.search.toLowerCase())
        )

        return matchFilters && matchText
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
    )
}
