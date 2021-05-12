import { useEffect, useState } from 'react';
import {Table,Container} from 'reactstrap'
import {useParams} from 'react-router-dom';
const TableUser = ({refresh}) => {
  const {id} = useParams();
  const [data, setData]=useState(null)
  useEffect(()=>{
    fetch(`http://localhost:8000/getBets/${id}`,{
      method:'GET'
    })
    .then(res =>{
      return res.json();
    })
    .then(data =>{
      setData(data)
      console.log(data)
    })
    .catch(err => console.log(err))
  },[refresh])
    return ( 
        <div className="Table">
            <Container>
            <Table>
            <thead>
              <tr>
                <th>Evento:</th>
                <th>Mi Pronostico:</th>
                <th>Resultado</th>
              </tr>
            </thead>
            {data && <tbody> 
              {data.map((dato)=>(
                <tr key={dato.idsport}>
                <td>{dato.event}</td>
                <td>{dato.pronos}</td>
                <td>{dato.result}</td>
                </tr>
              ))}        
            </tbody>
            }
          </Table>
          </Container>
        </div>
    );
}
 
export default TableUser;