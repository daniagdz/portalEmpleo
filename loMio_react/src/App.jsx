import Header from './components/Header'
import Footer from './components/Footer'

import { Routes, Route } from 'react-router'

//LAZYLOAD
import { lazy, Suspense } from 'react'; //no carga todo el contenido de golpe -> optimización


const HomePage = lazy( () => import('./pages/Home.jsx'))
const SearchPage = lazy( () => import('./pages/Search.jsx'))
const Contact = lazy( () => import('./pages/Contact.jsx'))
const NotFoundPage = lazy( () => import('./pages/NotFoundPage.jsx'))
const JobDetail = lazy( () => import('./pages/Detail.jsx'))

function App() {
    return (
        <>
            <Header />
            {/* 
            Inclusion del element Route que en funcion del 'path establecido 
                nos lleva a una pagina
            */}

            <Suspense fallback={<div style={{maxWidth: '1280px', margin: '0 auto', padding: '0 1rem'}}>
                    Cargando...
                </div>}>
                <Routes>
                    <Route path ="/" element={<HomePage />} />
                    <Route path="/search" element={<SearchPage />} />
                    <Route path="/contact" element={<Contact />} />

                {/* 
                ':jobId' -> identifica el id de la url para hacer la peticion a la api
                Este identificador debe coincidir con el usado en pag 'Details'
                */}
                    <Route path='/jobs/:jobId' element={ <JobDetail />} /> 
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Suspense>
            <Footer />
        </>
    )
}

export default App