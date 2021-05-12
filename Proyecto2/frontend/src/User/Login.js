import { useState } from "react";
import { toast } from "react-toastify";
import {useHistory} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


const Login = () => {
    const [name, setName] = useState (''); 
    const [password, setPassword] = useState('');
    const user = { name, password};
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('http://localhost:8000/userLogin', {
        method: 'POST',
        body: JSON.stringify(user)
        })
        .then(response => response.text())
        .then((text) => {
            if(text==='fail'){
                toast.error('Incorrect password or email');
            }else{
                console.log(text);
                history.push(`/User/${text}/Profile`);
            }
        })
        .catch(err => console.log(err))
    }


    return (  
        <div className="login">
        <h2>Log in</h2>
        <form onSubmit={handleSubmit}>
          <label > Email: </label>
          <input type="email" required value={name} onChange={(e)=>setName(e.target.value)}/>
          <label > contraseña: </label>
          <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <button>Log In</button>
        </form>
        </div>
    );
}
 
export default Login;