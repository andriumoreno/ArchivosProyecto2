import {Link} from 'react-router-dom';
const Narbar = () => {
    return ( 
        <nav className="navbar">
            <h1>Quinielas.com</h1>
            <div className="link">
                <Link to="/Login">Log In</Link>
                <Link to="/NewUser" >Sing In</Link>
            </div>
        </nav>
     );
}

export default Narbar;