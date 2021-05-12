import 'bootstrap/dist/css/bootstrap.css';
import {Table, Button, Container,Modal,ModalBody,FormGroup,ModalFooter,ModalHeader} from 'reactstrap'
import NavbarAdmin from './NavbarAdmin'
import {useState,useEffect} from 'react'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';




const CrudSport = () => {
    const [openCreate, setOpenCreate] = useState(false)
    const [openEdit, setOpenEdit] = useState(false)
    const [sportName, setSportName] = useState('')
    const [sportColor, setSportColor] = useState('')
    const [id,setId]=useState('')

    const [sports, setSports] = useState(null)
    const sport ={sportName,sportColor}


    const createSport = ()=>{
      setOpenCreate(true)
    }

    const cancelCreate =()=>{
        setOpenCreate(false)
    }

    const insertSport = () =>{
        fetch(`http://localhost:8000/createSport`,{
          method:'POST',
          body: JSON.stringify(sport)
        })
        .then(response => response.text())
        .then((text) => {
            if(text==='fail'){
                toast.error('Something went wrong!: insertSport');
            }else{
                console.log(text);      
            }
        })
        .catch(err => console.log(err))
        clearFields()
        setOpenCreate(false)
    }

    const editSport =(dato)=>{
        setOpenEdit(true)   
        setId(dato.idsport) 
    }

    const cancelEdit =() =>{
        setOpenEdit(false)
    }

    const updateSport =()=>{
      fetch(`http://localhost:8000/updateSport/${id}`,{
          method:'POST',
          body: JSON.stringify(sport)
        })
        .then(response => response.text())
        .then((text) => {
            if(text==='fail'){
                toast.error('Something went wrong!: insertSport');
            }else{
                console.log(text);     
            }
        })
        .catch(err => console.log(err))
        clearFields()
        setOpenEdit(false)   
    }

    const clearFields=()=>{
        setSportColor('')
        setSportName('')
    }

    const deleteSport = (dato)=>{
        console.log(dato.idsport)
        fetch(`http://localhost:8000/deleteSport/${dato.idsport}`,{
          method:'POST'
        })
        .then(response => response.text())
        .then((text) => {
            if(text==='fail'){
                toast.error('Something went wrong!: deleteSport');
            }else{
                console.log(text);     
                toast.info('Deleted!')
                var newlist = sports.filter((sport)=> sport.idsport!==dato.idsport)
                setSports(newlist)
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
      fetch(`http://localhost:8000/getSport`,{
        method:'GET'
        })
        .then(res =>{
            return res.json();
        })
        .then(data =>{
            setSports(data)
        })
        .catch(err => console.log(err))
    },[openCreate,openEdit])

    return ( 
        <div className="crudSports">
            <NavbarAdmin/>
            <Container>
        <br />
          <Button color="success" onClick={createSport}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Color</th>
                <th>Foto</th>
                <th>Opciones</th>
              </tr>
            </thead>
            {sports &&
            <tbody>
              {sports.map((dato)=>(
                  <tr key={dato.idsport}>
                  <td>{dato.idsport}</td>
                  <td>{dato.name}</td>
                  <td>{dato.color}</td>
                  <td>{"foto"}</td>
                  <td>
                    <Button color="primary" onClick={()=>{editSport(dato)}}>
                    Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=>{deleteSport(dato)}}>
                    Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
            }
          </Table>
         
        </Container>

        <Modal isOpen={openEdit}>
          <ModalHeader>
           <div><h3>Editar Deporte</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Nombre del deporte:
              </label>    
              <input
                className="form-control"
                type="text"
                value={sportName}
                onChange={e=>setSportName(e.target.value)}
              />
            </FormGroup>          
            <FormGroup>
              <label>
                Color del deporte
              </label>
              <input
                className="form-control"
                type="text"      
                value={sportColor} 
                onChange ={e=>setSportColor(e.target.value)}
              />
            </FormGroup>        
            <FormGroup>
              <label>
                Imagen: 
              </label>
              <input
                className="form-control"
                type="file"
                
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary"onClick={updateSport}>
              Editar
            </Button>
            <Button color="danger" onClick={cancelEdit}>
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={openCreate}>
          <ModalHeader>
           <div><h3>Insertar Deporte</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>
                Nombre del deporte: 
              </label>    
              <input
                className="form-control"       
                type="text"
                value={sportName}
                onChange={e=>setSportName(e.target.value)}
              />
            </FormGroup>        
            <FormGroup>
              <label>
                Color del deporte: 
              </label>
              <input
                className="form-control"
                type="text"
                value={sportColor}
                onChange={e=>setSportColor(e.target.value)}
              />
            </FormGroup>         
            <FormGroup>
              <label>
                Imagen: 
              </label>
              <input
                className="form-control"
                type="file"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"  
              onClick={insertSport}     
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={cancelCreate}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        </div>
     
      
    );
}
 
export default CrudSport;