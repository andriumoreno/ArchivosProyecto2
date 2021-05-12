import Calendar from '../Event/Calendar'
import NavbarAdmin from './NavbarAdmin'
import {Button} from 'reactstrap'
import DatePicker from "react-datepicker";
import {useEffect, useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
toast.configure();




const SportWeek = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [seasonName,setSeasonName] = useState('')


    const [weekStart,setWeekStart]=useState(new Date())
    const [weekEnd,setWeekEnd] = useState(new Date())
    const [weekstatus,setWeekStatus] = useState('active')
    const [idseason,setIdSeason]=useState('')
    const [seasonObject,setSeasonObject]=useState(null)


    const nSeason={seasonName,startDate,endDate}
    const nWeek={weekStart,weekEnd,weekstatus,idseason}


    const newSeason = ()=>{
        let date = new Date(startDate)
        date.setMonth(date.getMonth()+1)
        setEndDate(date)
        setSeasonName(date.getFullYear()+"-Q")
        fetch('http://localhost:8000/createSeason',{
        method:'POST',
        body: JSON.stringify(nSeason)
        })
        .then(response => response.text())
        .then((text)=>{
            if(text==='fail'){
                toast.error('Incorrect password or email');
            }else{
                console.log(text)
            }
        })
        .catch(err => console.log(err))
        console.log(date)
    }

    const newWeek = ()=>{
        let date = new Date(weekStart)
        date.setDate(date.getDate() +7)
        setWeekEnd(date)
        console.log(date)
        setIdSeason(seasonObject['seasonid'])
        setWeekStatus('active')
        fetch('http://localhost:8000/createWeek',{
        method:'POST',
        body: JSON.stringify(nWeek)
        })
        .then(response => response.text())
        .then((text)=>{
            if(text==='fail'){
                toast.error('Incorrect password or email');
            }else{
                console.log(text)
            }
        })
        .catch(err => console.log(err))

    }

    useEffect(()=>{
        fetch(`http://localhost:8000/getSeason`,{
            method:'GET'
        })
        .then(res =>{
            return res.json();
        })
        .then(data =>{
           setSeasonObject(data)
        })
        .catch(err => console.log(err));
    },[])



    return (  
        <div className="sportWeek">
            <div className="NavbarAdmin">
            <NavbarAdmin/>
            <br />
            <br />
            <div className="rowC">
            <Button color='primary' size='lg' onClick={newSeason}>
            Nueva Temporada
            </Button>{" "}
            <div>
            <label >Inicio de temporada:</label>{" "}
            <br />
            <DatePicker selected={startDate} onChange={date => setStartDate(date)} />{" "}
            </div>
           <div>
           <label >Fin de temporada:</label>{" "}
           <br />
            <DatePicker selected={endDate} onChange={date => setEndDate(date)} />{" "} 
           </div>
            <div>
            <label >Id de temporada:</label>{" "}
            <br />
            <label >{seasonObject && seasonObject.seasonname}</label>
            </div>   
            <Button color='danger' size='lg'>
            Finalizar Temporada
            </Button>{" "}
            </div>
            <br />
            <br />
            <div className="rowC">
            <Button color='primary' size='lg' onClick={newWeek}>
            Nueva Jornada
            </Button>{" "}
            <div>
            <label >Inicio de Jornada:</label>{" "}
            <br />
            <DatePicker selected={weekStart} onChange={date => setWeekStart(date)} />{" "}
            </div>
            <div>
            <label >Fin de Jornada:</label>{" "}
            <br />
            <DatePicker selected={weekEnd} onChange={date => setWeekEnd(date)} />{" "}
            </div>
            <div>
            <label >Id de Jornada:</label>{" "}
            <label >{}</label>
            </div>
            <Button color='danger' size='lg'>
            Finalizar Semana
            </Button>{" "}
            </div>       
            <br />
            <br />
            </div>
            <div className="CalendarArea">
            <Calendar/>   
            </div>
        </div>
    );
}
 
export default SportWeek
;