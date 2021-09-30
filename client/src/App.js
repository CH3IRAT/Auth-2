import './App.css';
import { Route ,Switch} from 'react-router';
import {Home} from "./components/Home/Home"
import Signup from "./components/Signup/Signup"
import SignIn from "./components/Signup/SignIn"
import Dashbord from './components/Dashbord/Dashbord';
import {PrivateRoute} from "./components/Router/PrivateRoute"

function App() {
  return (
    <div>
      <Switch>
      <Route exact path="/" component={Home}/>
      <Route path ="/register" component={Signup}/>
      <Route path ="/login" component={SignIn}/>
      <PrivateRoute path="/Dashboard" component={Dashbord}/>
</Switch>
      
    </div>
  );
}

export default App;
