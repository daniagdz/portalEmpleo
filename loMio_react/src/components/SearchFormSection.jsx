import { useId, useState, useRef } from "react"


//Hook que implementa lógica de filtrado
const useSearchForm = ({ idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter, onClearFilters}) => {
    
    const [searchText, setSearchText] = useState('')
    //valor persistente entre renderizados, que una segunda vez modificado no renderiza de nuevo
    const timeoutId = useRef(null)

    const handleSumbit = (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        //si el evento (e) proviene del "form escrito" lo ignormaos
        //evitamos ejecucion no deseada al cambiar filtros o no darle a enter
        if(e.target.name === idText){
            return
        }

        const filters = {
            search: formData.get(idText),
            technology: formData.get(idTechnology),
            location: formData.get(idLocation),
            experienceLevel: formData.get(idExperienceLevel)
        }

        console.log(filters)

        onSearch(filters)
    }


    const handleChangeText = (e) => {
        const text = e.target.value
        setSearchText(text) //update del input

        //si existe un timeout se elimina para generar luego uno "desde 0" y no acumular peticiones
        if(timeoutId.current){
            clearTimeout(timeoutId.current)
        }
        //DEBOUNCE: cancelar el timeout previo y crea el nuevo -> generamos cola donde solo hay 1 timeout
        timeoutId.current = setTimeout( () =>{
            onTextFilter(text)
        }, 300)
        
    }

    const handleReset = (e) =>{
        setSearchText('')
        
        if(e.target.form){
            e.target.form.reset()
        }

        if(onClearFilters){
            onClearFilters();
        }
    }


    return{
        searchText,
        handleSumbit,
        handleChangeText,
        handleReset
    }
}




export function SearchFormSection({ onSearch, onTextFilter, isFiltered, onClearFilters, initialFilters ={} }) {


    //Esto son 'HOOKs'. Se encargan de generar un identificador unico
    const idText = useId()
    const idTechnology = useId()
    const idLocation = useId()
    const idExperienceLevel = useId()

    //pasamos valores al hook de filtrado
    const {

        searchText,
        handleSumbit, 
        handleChangeText,
        handleReset
    } = useSearchForm({idText, idTechnology, idLocation, idExperienceLevel, onSearch, onTextFilter, onClearFilters})


    return (
        <>
            <section className="jobs-search">
                <h1>Encuentra tu próximo trabajo</h1>
                <p>Explora miles de oportunidades en el sector tecnológico.</p>

                <form id="empleos-search-form" role="search" onChange={handleSumbit}>
                    <div className="search-bar">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-search">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>

                        <input 
                            name={idText} id="empleos-search-input" 
                            type="text"
                            placeholder="Buscar trabajos, empresas o habilidades"
                            onChange={handleChangeText}
                            defaultValue={initialFilters.search}
                        />
                    </div>

                    <div className="search-filters">

                        <select name={idTechnology} id="filter-technology" >
                            <option value="">Tecnología</option>
                            <option value="javascript">JavaScript</option>
                            <option value="python">Python</option>
                            <option value="react">React</option>
                            <option value="node">Node.js</option>
                            <option value="mobile">Mobile</option>
                        </select>


                        <select name={idLocation} id="filter-location" >
                            <option value="">Ubicación</option>
                            <option value="remoto">Remoto</option>
                            <option value="cdmx">Ciudad de México</option>
                            <option value="guadalajara">Guadalajara</option>
                            <option value="monterrey">Monterrey</option>
                            <option value="barcelona">Barcelona</option>
                        </select>

                        <select name={idExperienceLevel} id="filter-experience-level" >
                            <option value="">Nivel de experiencia</option>
                            <option value="junior">Junior</option>
                            <option value="mid">Mid-level</option>
                            <option value="senior">Senior</option>
                            <option value="lead">Lead</option>
                        </select>

                        {
                            isFiltered && (
                            <button
                                type="button"
                                onClick={handleReset}
                                className="btn-clear-filter"
                            >
                                Limpiar filtros
                            </button>
                            )
                        }
                    </div>
                </form>

                <span id="filter-selected-value"></span>
            </section>
        </>
    )
}