import NavbarAdmin from './NavbarAdmin'
import {Table,Modal,ModalBody,ModalFooter,ModalHeader,Container} from 'reactstrap'
const Rewards = () => {
    return (
        <div className="Rewards">
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
                <th>Apellido</th>
                <th>Tier</th>
                <th>Total</th>
                <th>Ultimo</th>
                <th>Incremento</th>
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
    
export default Rewards;
