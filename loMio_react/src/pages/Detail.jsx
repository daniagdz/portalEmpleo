import { data, Navigate } from "react-router"
import { useParams, useNavigate } from "react-router"

import styles from './detail.module.css'

import { useEffect, useState } from "react"
import { Link } from "react-router"
import { NavLink } from "../components/NavLink"
import snarkdown from 'snarkdown'


function JobSection({ title, content }) {
    //funcion que renderiza el markdown de la api
    const htmlContent = snarkdown(content)
    return (
        <section className={`${styles.section} prose`}>
            <h2 className={styles.sectionTitle}>
                {title}
            </h2>

            <div className={`${styles.sectionContent} prose`} dangerouslySetInnerHTML={{
                __html: htmlContent
            }}>
            </div>
        </section>
    )
}

export default function JobDetail() {
    const { jobId } = useParams()
    const navigate = useNavigate()

    const [job, setJob] = useState(null)
    const [loading, setLoading] = useState(true)//con true no muestra mensaje para que al cargar no aparezca señal 'de que no hay curros'
    const [error, setError] = useState(null)

    useEffect(() => {

        //control de cancelacion de peticiones
        // por si navega a otra pag antes de la carga, evita memory leaks y updates de estado
        const controller = new AbortController()

        setLoading(true)
        setError(null)

        fetch(`https://jscamp-api.vercel.app/api/jobs/${jobId}`, {
            signal: controller.signal,
        })

            .then((response) => {
                //revisar si hay response porque fetch puede dar codigos error:
                //  400, 404 o 500 que entran directos al '.then'
                if (!response.ok) {
                    //creamos objeto con 2 props-> status y message
                    //saltan directos al catch
                    if (response.status === 404) {
                        throw { status: 404, message: 'La oferta no existe' }
                    }
                    if (response.status >= 500) {
                        throw { status: 500, message: 'Problema en los servidores' }
                    }

                    throw { status: response.status, message: 'Ha ocurrido un error al cargar los datos' }
                }

                return response.json()
            })
            .then(data => {
                setJob(data)
            })
            .catch((error) => {
                if (error.name === 'AbortError') return

                setError(error.status ? error : { status: 'NETWOR_ERROR', message: 'No hay conexion a internet' })
                setJob(null)
            })
            .finally(() => {
                setLoading(false)
            })

    }, [jobId])


    if (loading) {
        return (
            <div style={{ maxWidth: '1280PX', margin: '0 auto', padding: '0 1rem' }}>
                <div className={styles.loading}>
                    <p className={styles.loadingText}>Cargando ofertas...</p>
                </div>
            </div>

        )
    }

    if (!jobId || error) {
        return (
            <div className={styles.error} style={{ maxWidth: '1280PX', margin: '0 auto', padding: '0 1rem' }}>
                <div className={styles.error}>
                    <h1>Oferta no encontrada</h1>
                    <p>{error?.message || 'No hay codigo de error asignado para este fallo'}</p>
                    <button
                        className={styles.backButton}
                        onClick={() => navigate('/')}
                    >
                        Volver a los empleos
                    </button>
                </div>
            </div>
        )
    }
    return (

        <div style={{ maxWidth: '1280PX', margin: '0 auto', padding: '0 1rem' }}>
            <div className={styles.container}>
                {/* Breadcrumb */}
                <nav className={styles.breadcrumb}>
                    <Link
                        to='/search'
                        className={styles.breadcrumbButton}
                    >
                        Empleos
                    </Link>
                    <span className={styles.breadcrumbSeparator}>/</span>
                    <span className={styles.breadcrumbTitle}>
                        {job.titulo}
                    </span>
                </nav>

                {/* Header principal */}
                <header className={styles.header}>
                    <h1 className={styles.title}>
                        {job.titulo}
                    </h1>

                    <p className={styles.meta}>
                        {job.empresa} - {job.ubicacion}
                    </p>
                </header>

                <button className={styles.applyButton}>
                    Aplicar a esta oferta
                </button>

                {/* Aquí irán las secciones de contenido */}


                <JobSection title="Descripcion del puesto" content={job.content.description} />
                <JobSection title="Responsabilidades" content={job.content.requirements} />
                <JobSection title="Requisitos" content={job.content.requirements} />
                <JobSection title="Acerca de la empresa" content={job.content.about} />
            </div>
        </div >

    )

}