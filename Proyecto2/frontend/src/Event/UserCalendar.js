import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import 'bootstrap/dist/css/bootstrap.css';
import {Button,Modal,ModalBody,FormGroup,ModalFooter,ModalHeader} from 'reactstrap'
import { createRef, useEffect, useState } from 'react'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Table from '../User/Table'
import {useParams} from 'react-router-dom';

const UserCalendar = () => {
    const {id} = useParams();
    const[openEdit,setOpenEdit]=useState(false)
    const[events,setEvents]=useState(null)
    const calendarRef = createRef()
    const[event, setEvent]=useState(null)
    const[resultH, setResultH]=useState('')
    const[resultV, setResultV]=useState('')
    const[idevent,setId]=useState('')

    const bet={resultH,resultV,idevent,id}


    const handleDateClick = (arg) => { // bind with an arrow function
        console.log('precionaste un dia');     
    }

    const handleEventClick = (info)=>{
        setOpenEdit(true)
        setEvent(info.event)
        console.log(info.event.title)
        console.log(info.event.backgroundColor)
        console.log(info.event.id)
        setId(info.event.id)
    }

    const cancelEdit = ()=>{
        setOpenEdit(false)
    }


    const updateEvent = () =>{
        setOpenEdit(false)    
        console.log(idevent)
        console.log(bet)
        fetch(`http://localhost:8000/createBet`,{
          method:'POST',
          body: JSON.stringify(bet)
        })
        .then(response => response.text())
        .then((text) => {
            if(text==='fail'){
                toast.error('Something went wrong!: UpdateEvent');
            }else{
                console.log(text);      
            }
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
        fetch(`http://localhost:8000/getEvents`,{
            method:'GET'
            })
            .then(res =>{
                return res.json();
            })
            .then(data =>{
                setEvents(data)
                console.log(data)
            })
            .catch(err => console.log(err))
    },[openEdit])

    return ( 
        <div className="control">
           <Table refresh={openEdit}/>
           <br />
           <br />
            <FullCalendar
                initialView="dayGridMonth"
                themeSystem="bootstrap"
                eventDisplay="block"
                displayEventTime={false}
                ref={calendarRef}
                headerToolbar ={{
                    left: "prev,next",
                    center: "title",
                    right: "dayGridMonth,timeGridWeek,timeGridDay"
                }}
                plugins={[ dayGridPlugin ,interactionPlugin,timeGridPlugin ]}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                events={events}
            />
            
            <Modal isOpen={openEdit} >
                <ModalHeader>
                <div><h3>Ingresar Pronostico</h3></div>
                </ModalHeader>
                <ModalBody>
                    <FormGroup>
                    <label>
                    Equipo de Casa:
                    </label>    
                    <input
                        className="form-control"
                        type="number"
                        value={resultH}
                        onChange={e=>{setResultH(e.target.value)}}
                    />
                    </FormGroup>          
                    <FormGroup>
                    <label>
                    Equipo de Visita:
                    </label>
                    <input
                        className="form-control"
                        type="number"   
                        value={resultV}
                        onChange={e=>{setResultV(e.target.value)}}   
                    />
                    </FormGroup>        
                </ModalBody>
                <ModalFooter>
                    <Button color="primary"onClick={updateEvent}>
                    Editar
                    </Button>
                    <Button color="danger" onClick={cancelEdit}>
                    Cancelar
                    </Button>
                </ModalFooter>
             </Modal>
        </div>
      
    );
}
 
export default UserCalendar;