import React ,{useState} from 'react'
import { useHistory } from "react-router";
import { registeruser } from "../../js/actions/user";
import { useDispatch } from "react-redux";


import './SignUp.css'
const Signup = () => {

  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handlechange= () => {
    history.push("/login")  }


  return (
    <div>
          
          <div>

        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="styles.css" />
        <div className="signupFrm">
          <div className="wrapper">
            <form action className="form">
              <h1 className="title">Sign up</h1>
              <div className="inputContainer">
                <input type="text" className="input" placeholder="a" onChange={(e) => setName(e.target.value)} />
                <label htmlFor className="label"  >Name</label>
              </div>
              <div className="inputContainer">
                <input type="text" className="input" placeholder="a"   onChange={(e) => setLastName(e.target.value)}/>
                <label htmlFor className="label" >Lastname</label>
              </div>
              <div className="inputContainer">
                <input type="text" className="input" placeholder="a"  onChange={(e) => setEmail(e.target.value)} />
                <label htmlFor className="label" >Email</label>
              </div>
              <div className="inputContainer">
                <input type="password" className="input" placeholder="a"  onChange={(e) => setPassword(e.target.value)} />
                <label htmlFor className="label">Password</label>
              </div>
             

             <input className="submitBtn" defaultValue="Register       "   onClick={() =>
                          dispatch(
                            registeruser(
                              { name, lastname, email, password },
                              history
                            )
                          )
                        } />

                        already member ? <input className="submitBtn" defaultValue="Login" onClick={handlechange}/>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Signup
