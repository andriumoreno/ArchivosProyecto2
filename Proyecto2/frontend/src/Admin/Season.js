import NavbarAdmin from './NavbarAdmin'
import {Table,Modal,ModalBody,ModalFooter,ModalHeader,Container} from 'reactstrap'
const Season = () => {
    return (
        <div className="Season">
            <div className="NavbarUser">
                <NavbarAdmin/>
            </div>
            <div className="Table">
            <Container>
            <Table>
            <thead>
              <tr>
                <th>Posicion</th>
                <th>ID</th>
                <th>Nombre</th>
                <th>P10</th>
                <th>P5</th>
                <th>P3</th>
                <th>P0</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>         
            </tbody>
          </Table>
          </Container>
            </div>
        </div>
    );
}
    
export default Season;
