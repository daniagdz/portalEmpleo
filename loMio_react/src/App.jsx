import Header from './components/Header'
import Footer from './components/Footer'

import { Route } from './components/Route.jsx';

import { HomePage } from './pages/Home.jsx';
import { SearchPage } from './pages/Search.jsx';
import { Contact } from './pages/Contact.jsx';


function App() {


    return (
        <>
            <Header />

            {/* 
            Inclusion del component Route que en funcion del 'path establecido 
                nos lleva a una pagina
            */}
            <Route path ="/" component={HomePage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/contact" component={Contact} />

            <Footer />
        </>
    )
}

export default App