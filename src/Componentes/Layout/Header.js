import React from 'react';
import { Link } from 'react-router-dom';
import CerrarSession from './CerrarSession';

const Header = ({session}) => {

    let barra = (session.obtenerUsuario) ? <NavegacionAutenticado></NavegacionAutenticado> : <NavegacionNoAutenticado></NavegacionNoAutenticado>

    return(
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
            <div className="container">
                {barra}
            </div>
        </nav>
    )
};

const NavegacionNoAutenticado = () => (
    <h3 to="/" className="navbar-brand text-light font-weight-bold">
                CRM
    </h3>
)

const NavegacionAutenticado = () => (
    <React.Fragment>
        <Link to="/" className="navbar-brand text-light font-weight-bold">
                CRM
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navegacion" aria-controls="navegacion" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navegacion">
                <ul className="navbar-nav ml-auto text-right">
                    <li className="nav-item dropdown mr-md-2 mb-2 mb-md-0">
                        <button className="nav-link dropdown-toggle btn btn-block btn-success" data-toggle="dropdown">
                            Clientes
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navegacion">
                            <Link to="/clientes" className="dropdown-item">
                                Ver Clientes
                            </Link>
                            <Link to="/clientes/nuevo" className="dropdown-item">
                                Nuevo Cliente
                            </Link>
                        </div>
                    </li>
                    <li className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle btn btn-block btn-success" data-toggle="dropdown">
                           Productos
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navegacion">
                            <Link to="/productos" className="dropdown-item">
                                Ver Productos
                            </Link>
                            <Link to="/productos/nuevo" className="dropdown-item">
                                Nuevo Productos
                            </Link>
                        </div>
                    </li>
                    <CerrarSession></CerrarSession>
                </ul>
            </div>
    </React.Fragment>
)

export default Header;