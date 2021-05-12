import { useState } from "react";
import {useHistory} from 'react-router-dom'

const NewUser = () => {
  const [fristname, setFristName] = useState (''); 
  const [lastname , setLastName] = useState('');
  const [email , setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthday, setBirthday ] = useState('2000-01-01');
  const nuser = { fristname, lastname ,email ,password ,birthday};
  const history = useHistory()

  const handleSubmit = (e) =>{ 
    e.preventDefault();
    fetch('http://localhost:8000/newUser',{
    method:'POST',
    body: JSON.stringify(nuser)
    })
    .then(response => response.text())
    .then((text)=>{
      console.log(text)
      history.push(`/Login`);
    })
    .catch(err => console.log(err))
  }


    return (  
        <div className="create">
        <h2>Sing In</h2>
        <form onSubmit={handleSubmit}>
          <label > Nombre: </label>
          <input type="text" required value={fristname} onChange={(e)=>setFristName(e.target.value)}/>
          <label > Apellido: </label>
          <input type="text" required value={lastname} onChange={(e)=>setLastName(e.target.value)}/>
          <label > Email: </label>
          <input type="email" required value={email} onChange={(e)=>setEmail(e.target.value)}/>
          <label > Contraseña: </label>
          <input type="password" required value={password} onChange={(e)=>setPassword(e.target.value)}/>
          <label > Fecha de nacimiento: </label>
          <input type="date" required value={birthday} onChange={(e)=>setBirthday(e.target.value)}/>
          <label > Foto de perfil:</label>
          <input type="file" />
          <button>Create Account</button>
        </form>
      </div>
    );
}
 


export default NewUser;

