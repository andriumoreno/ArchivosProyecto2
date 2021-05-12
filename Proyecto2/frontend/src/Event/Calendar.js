import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import AddEvent from './AddEvent'
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal,ModalBody,FormGroup,ModalFooter,ModalHeader} from 'reactstrap'
import { createRef, useEffect, useState } from 'react'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



const Calendar = () => {
    const[isOpen,setIsOpen] =useState(false)
    const[openEdit,setOpenEdit]=useState(false)
    const[events,setEvents]=useState(null)
    const calendarRef = createRef()
    const[event, setEvent]=useState(null)
    const[resultH, setResultH]=useState('')
    const[resultV, setResultV]=useState('')
    const[id,setId]=useState('')

    const eventObj={resultH,resultV,id}


    const handleDateClick = (arg) => { // bind with an arrow function
        console.log('precionaste un dia');     
    }

    const handleEventClick = (info)=>{
        setOpenEdit(true)
        setEvent(info.event)
        console.log(info.event.title)
        console.log(info.event.backgroundColor)
    }

    const onEventAdded = (event) =>{
        let CalendarApi = calendarRef.current.getApi()
        CalendarApi.addEvent(event)
        console.log(CalendarApi.getDate())
    }

    const cancelEdit = ()=>{
        setOpenEdit(false)
    }

    const createEvent = ()=>{
        setIsOpen(true)
    }

    const updateEvent = () =>{
        setOpenEdit(false)
        setId(event.id)
        console.log(id)
        fetch(`http://localhost:8000/updateEvent`,{
          method:'POST',
          body: JSON.stringify(eventObj)
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
    },[isOpen,openEdit])

    return ( 
        <div className="control">
            <AddEvent isOpen={isOpen} isClose={()=>setIsOpen(false)} onEventAdded={(event) => onEventAdded(event)}/> 
            <FullCalendar
                initialView="dayGridMonth"
                themeSystem="bootstrap"
                eventDisplay="block"
                displayEventTime={false}
                ref={calendarRef}
                customButtons={{
                    myCustomButton: {
                      text: 'Nuevo Evento',
                      click: function() {
                        createEvent()
                      }
                    }
                  }}
                headerToolbar ={{
                    left: "prev,next myCustomButton",
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
                <div><h3>Ingresar Resultado</h3></div>
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
 
export default Calendar;