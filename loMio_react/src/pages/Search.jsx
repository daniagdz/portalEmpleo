import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

import Pagination from '../components/Pagination'
import { SearchFormSection } from '../components/SearchFormSection';

import { JobListings } from '../components/JobsListings';
//import jobsData from '../data.json'; ->movimos el data a /public

import { SpinnerLoad } from "../components/Spinner";

const RESOULTS_PER_PAGE = 5

const STORAGE_KEY = 'jobFilters'

const INITIAL_FILTERS = {
    search: '',
    technology: '',
    location: '',
    experienceLevel: ''
}

const getErrorMessage = (error, response) => {
    // Si el usuario no tiene conexión a internet
    if (!navigator.onLine) {
        return 'No tienes conexión a internet. Revisa tu red e inténtalo de nuevo.'
    }
    
    // Si tenemos respuesta del servidor pero falló
    if (response) {
        if (response.status === 404) {
            return 'No se encontró el recurso solicitado (Error 404).'
        }
        if (response.status >= 500) {
            return 'Error interno del servidor (Error 500). Inténtalo más tarde.'
        }
    }

    return error.message || 'Ha ocurrido un error inesperado al cargar los empleos.'
}


const useFilters = () => {
    const [searchParams, setSearchParams] = useSearchParams()

    const [filters, setFilters] = useState(() => {
        return {
            search: searchParams.get('search') || '',
            technology: searchParams.get('technology') || '',
            location: searchParams.get('location') || '',
            experienceLevel: searchParams.get('experience') || ''
        }
    })

    //en vez de pasar un valor inicial, le damos una funcion para que genere el estado incial
    const [textToFilter, setTextToFilter] = useState(() => searchParams.get('search') || '')

    const [currentPage, setCurrentPage] = useState(() => {
        const page = Number(searchParams.get('page'))
        return Number.isNaN(page) ? page : 1
    })

    const[jobs, setJobs] = useState([])
    const[error, setError] = useState(null)

    //estado de carga
    const [loading, setLoading] = useState(true)    

    //emular peticion API
    useEffect(() => {
        const fetchJobs = async() => {
            setLoading(true)
            setError(null)

            try{
                if(!navigator.onLine){
                    throw new Error('No hay conexion a Internet')
                }
                
                const response = await fetch('/data.json')
                if(!response.ok){
                    const customMsg = getErrorMessage(null, response)
                    throw new Error(customMsg) 
                }

                const data = await response.json()
                setJobs(data)
                await new Promise(resolve => setTimeout(resolve, 600))

            }catch(err){
                const message = getErrorMessage(err)
                setError(message)
            
            }finally{
                setLoading(false)
            }
        }

        fetchJobs()
    }, [filters, textToFilter, currentPage])

    // Sincroniza los filtros con la URL usando setSearchParams (estable, no provoca bucles)
    useEffect(() => {
        setSearchParams(() => {
            const params = new URLSearchParams()

            if (textToFilter) params.set('search', textToFilter)
            if (filters.technology) params.set('technology', filters.technology)
            if (filters.location) params.set('location', filters.location)
            if (filters.experienceLevel) params.set('experience', filters.experienceLevel)
            if (currentPage > 1) params.set('page', String(currentPage))

            return params
        })
    }, [filters, textToFilter, currentPage, setSearchParams])

    useEffect (() => {
        try{
            localStorage.setItem(STORAGE_KEY, JSON.stringify(filters))
            console.log('valores local storage:'+ localStorage.getItem(STORAGE_KEY))


        }catch(error){
            console.error("error al guardar filtros en LocalStorage", error)
        }
    }, [filters])


    const isFiltered =  filters.technology !== "" ||
                        filters.search !== "" ||
                        filters.location !== "" || 
                        filters.experienceLevel !== "" ||
                        textToFilter !== "";
    
    const handleClearFilters = () => {
        setFilters(INITIAL_FILTERS)
        setTextToFilter('')
        setCurrentPage(1)
        localStorage.removeItem(STORAGE_KEY)
        console.log('local storage borrado')
    }

    const handleRetry = () =>{
        window.location.reload()
    }

    //filtramos por los filtros que haya
    /*
    evaluamos cada objeto del json 
    si se cumplen las condiciones, con '.filter' añadimos ese objeto al array 'jobsFilteredByFilters'
    */
    //const jobsFilteredByFilters = jobsData.filter(job => {
    const jobsFilteredByFilters = jobs.filter(job => {
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


    return{
        filters,
        jobsWithFilter,
        pageResoults,
        totalPages,
        currentPage,
        isFiltered,
        loading,
        error,
        textToFilter,
        handleRetry,
        handlePageChange,
        handleSearch,
        handleTextFilter,
        handleClearFilters
    }
}


export function SearchPage() {

    const {
        filters,
        jobsWithFilter,
        pageResoults,
        totalPages,
        currentPage,
        isFiltered,
        loading,
        error,
        textToFilter,
        handleRetry,
        handlePageChange,
        handleSearch,
        handleTextFilter,
        handleClearFilters

    } = useFilters()

    const title = `Resultados: ${jobsWithFilter.length}, Página: ${currentPage}`

    return (
        <main>
            <title>{title}</title>

            <SearchFormSection 
                initialText ={textToFilter}
                initialFilters={filters}
                onSearch={handleSearch} 
                onTextFilter={handleTextFilter} 
                isFiltered={isFiltered}
                onClearFilters={handleClearFilters}
            />

            <section>
                {loading && <SpinnerLoad />}

                {!loading && error && (
                    <div className='error-container'>
                        <h2>Algo salió mal</h2>
                        <p>{error}</p>
                        <button
                            type='button'
                            className='btn-retry'
                            onClick={handleRetry}
                        >
                            Reintentar
                        </button>
                    </div>
                )}
                
                {!loading && !error && 
                    (<>
                        <JobListings jobs={pageResoults} />

                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}

                        />
                    </>)
                }
                
                
            </section>
        </main>
    )
}