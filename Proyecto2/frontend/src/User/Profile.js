import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const Profile = () => {
    const {id} = useParams();
    const[showUpdate, setUpdate] = useState(false);
    const[userData, setUserData] = useState(null);

    const[fristname, setFristName]= useState('')
    const[lastname,setLastName] = useState('')
    const[email, setEmail] = useState('')
    const[password,setPassword]=useState('')

    const update ={ fristname,lastname,email,password}

    const handleshowUpdate = ()=>{
        setUpdate(true)
    }

    const handlehideUpdate = ()=>{
        fetch(`http://localhost:8000/updateUser/${id}`,{
        method:'POST',
        body: JSON.stringify(update)
        })
        .then(response => response.text())
        .then((text) => {
            if(text==='fail'){
                toast.error('something went wrong!');
            }else{
                console.log(text);
            }
        })
        .catch(err => console.log(err))
        setUpdate(false)
    }

    useEffect(()=>{
        fetch(`http://localhost:8000/getUser/${id}`,{
            method:'GET'
        })
        .then(res =>{
            return res.json();
        })
        .then(data =>{
            setUserData(data);
        })
        .catch(err => console.log(err))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[showUpdate])

    return ( 
        <div className="profileArea">
            { userData &&   
            <div className="content">
                    <div className="userProfile">
                        <img src={require('./logo192.png').default}alt=""/>
                        <h1>User name</h1>
                        <label>{userData.fristname}</label>
                        <h1>Membrecia</h1>
                        <label>Expirada</label>
                    </div>
                    {!showUpdate && 
                   <div className="userData"> 
                        <div className="rowC">
                            <h1>Nombre Completo:</h1>
                            <h2>{userData.fristname+" "+userData.lastname}</h2>
                        </div>   
                        <div className="rowC">
                            <h1>Correo Electronico:</h1>
                            <h2>{userData.email}</h2>
                        </div>  
                        <div className="rowC">
                            <h1>Fecha de Cumpleaños:</h1>
                            <h2>{userData.birthday}</h2>  
                        </div> 
                        <button onClick={handleshowUpdate}>Editar</button>
                    </div>
                    }
                    {showUpdate &&
                    <div className="userData"> 
                        <div className="rowC">
                            <h1>Nombre:</h1>
                            <input type="text" value={fristname} onChange={e=>{setFristName(e.target.value)}}/>
                        </div>   
                        <div className="rowC">
                            <h1>Apellido:</h1>
                            <input type="text" value={lastname} onChange={e=>{setLastName(e.target.value)}}/>
                        </div>  
                        <div className="rowC">
                            <h1>Correo Electronico:</h1>
                            <input type="email" value={email} onChange={e=>{setEmail(e.target.value)}}/>
                        </div>  
                        <div className="rowC">
                            <h1>Contraseña:</h1>
                            <input type="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>
                        </div> 
                        <button onClick={handlehideUpdate}>Guardar Cambios</button>
                    </div>
                    }
                
                </div> 
            }  
                <div className="payment">
                        <h1>Seleccione su Membrecia</h1>
                        <select >
                            <option value="Gold">Gold</option>
                            <option value="Silver">Silver</option>
                            <option value="Bronze">Bronze</option>
                        </select>
                        <button>Pagar Membrecia</button>
                </div>
        </div>  
    );
}
 
export default Profile;

/*
 
*/ 