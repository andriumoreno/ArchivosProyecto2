import {Link} from 'react-router-dom';
const Narbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Administrador</h1>
            <div className="link">
                <Link to="/Admin/Jornadas">Jornadas</Link>
                <Link to="/Admin/Temporadas" >Temporadas</Link>
                <Link to="/Admin/Recompensas" >Recompensas</Link>
                <Link to="/Admin/Crud" >CRUD-Deportes</Link>
                <Link to="/Admin/Reportes" >Reportes</Link>
            </div>
        </nav>
     );
}

export default Narbar;