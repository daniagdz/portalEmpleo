import Header from './components/Header'
import Footer from './components/Footer'

import { Routes, Route } from 'react-router'

import { HomePage } from './pages/Home.jsx';
import { SearchPage } from './pages/Search.jsx';
import { Contact } from './pages/Contact.jsx';
import {NotFoundPage} from './pages/NotFoundPage';



function App() {
    return (
        <>
            <Header />
            {/* 
            Inclusion del element Route que en funcion del 'path establecido 
                nos lleva a una pagina
            */}
            <Routes>
                <Route path ="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </>
    )
}

export default App