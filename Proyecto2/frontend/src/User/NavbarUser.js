import { Link ,useParams} from "react-router-dom"

const NavbarUser = () => {
    const {id} = useParams();

    return (  
        <nav className="navbaruser">
            <h1>Quinielas.com</h1>
            <div className="link">
                <Link to={`/User/${id}/Profile`}>Perfil</Link>
                <Link to={`/User/${id}/Events`}>Eventos</Link>
                <Link to="/">Recompensas</Link>
                <Link to="/Login">LogOut</Link>
            </div>
        </nav>
    );
}
 
export default NavbarUser ;