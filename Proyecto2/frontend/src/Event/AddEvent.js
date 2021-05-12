import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import {useEffect, useState} from 'react'
import DateTimePicker from 'react-datetime-picker';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


const AddEvents = ({isOpen,isClose,onEventAdded}) => {

    const[homeTeam,setHome]=useState('')
    const[visitTeam,setVisit]=useState('')

    const[start,setStart]=useState(new Date())
    const[end,setEnd]=useState(new Date())
    const[sports,setSports]=useState(null)

    const[ backgroundColor, setColor] =useState('gray')
    const[ idsport, setId]=useState('')
    const display ='block'

    const [dropdownOpen, setDropdownOpen] = useState(true);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const eventObj={start,end,homeTeam,visitTeam,idsport,backgroundColor}

    const createEvent = (event) =>{
        let title = homeTeam+" vs "+visitTeam
        event.preventDefault();
        onEventAdded({
            title,
            start,
            end,
            backgroundColor,
            display
        })
        isClose();
        fetch(`http://localhost:8000/createEvent`,{
          method:'POST',
          body: JSON.stringify(eventObj)
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
    }

    
    const handleSelect =(sport)=>{
        setColor(sport['color'])
        setId(sport.idsport)
        console.log(backgroundColor)
        console.log(idsport)
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
                console.log(data)
            })
            .catch(err => console.log(err))
    },[])

    return ( 
        <Modal show={isOpen} onHide={isClose}>
        <Modal.Header >
            <h1>Crear Evento</h1>
        </Modal.Header>
        <Modal.Body>
            <div className="createEvent">
                <label>Equipo De Casa:</label>
                <input placeholder="Equipo de casa" value={homeTeam} onChange={e=> setHome(e.target.value)} /> 
                <label>Equipo De Visita:</label>
                <input placeholder="Equipo de visita" value={visitTeam} onChange={e=> setVisit(e.target.value)} /> 
                <label>Inicio:</label>
                <DateTimePicker onChange={setStart} value={start}/>
                <label>Fin:</label>
                <DateTimePicker onChange={setEnd} value={end}/>
                <label>Deporte:</label>
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        Deporte
                    </DropdownToggle>
                   {sports && 
                    <DropdownMenu>
                    {sports.map((sport)=>(
                        <DropdownItem onClick={()=>handleSelect(sport)} >{sport.name}</DropdownItem>
                    ))}
                    </DropdownMenu>
                    }
                </Dropdown>
            </div>      
        </Modal.Body>
        <Modal.Footer>
            <button onClick={createEvent}>CrearEvento</button>
        </Modal.Footer>
        </Modal>
    );
}
 
export default AddEvents;