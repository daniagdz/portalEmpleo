import React from 'react';

function Header() {
    return (
        <header>
            <h2>devjobs</h2>
            
            <nav>
                <a href="#">Inicio</a>
                <a href="#">Empleos</a>
                <a href="#">Compañías</a>
                <a href="#">Salarios</a>
            </nav>

            <div>
                <a href="#">Publicar Empleo</a>
                <div className="devjobs-avatar"></div>
            </div>
        </header>
    );
}

export default Header;