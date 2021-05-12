import Navbar from './User/Navbar';
import NewUser from './User/NewUser';
import Login from './User/Login';
import ProfileUser from './User/Profile';
import UserNavbar from './User/NavbarUser';
import Events from './Event/Events';
import Dashboard from './Admin/Dashboard';
import SportWeek from './Admin/SportWeek';
import Season from './Admin/Season'
import Rewards from './Admin/Rewards'
import CrudSport from './Admin/CRUDDeportes'
import UserEvents from './Event/UserEvents'

import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
          <Switch>
            <Route exact path="/Login">
              <Navbar/>
              <Login/>
            </Route>
            <Route exact path="/NewUser">
              <Navbar/>
              <NewUser/>
            </Route>
            <Route exact path="/User/:id/Profile">
              <UserNavbar/>
              <ProfileUser/>
            </Route>
            <Route exact path="/User/:id/Events">
              <UserNavbar/>
              <UserEvents/>
            </Route>
            <Route exact path="/Admin/Main">
              <Dashboard/>
            </Route>
            <Route exact path="/Admin/Jornadas">
              <SportWeek/>
            </Route>
            <Route exact path="/Admin/Temporadas">
              <Season/>
            </Route>
            <Route exact path="/Admin/Recompensas">
              <Rewards/>
            </Route>
            <Route exact path="/Admin/Crud">
              <CrudSport/>
            </Route>
          </Switch> 
      </div>
    </Router> 
  );
}

export default App;
