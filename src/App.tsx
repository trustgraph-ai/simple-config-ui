
import { useState, useEffect } from 'react';
import SimpleEditor from './simple-editor/SimpleEditor';
import './App.scss';
import {
    onAuthStateChange, signin, register as authRegister, logout
} from './auth';

const App = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // noauth - Not auth'd
    // notverf - Not verified
    // awaitverf - Waiting for verification to complete
    // auth - logged in & verified
    const [authState, setAuthState] = useState("noauth");

    useEffect(
       () => {

            onAuthStateChange(
                (state, auth) => {
                   console.log("AUTHSTATE", state);
                   setAuthState(state);
                }
            );
       }, []
    );

    const submit = () => {

        console.log("SUBMIT");
        signin(username, password).then(
            () => console.log("SIGNIN WORKED")
        );

    }

    const register = () => {
        authRegister(username, password).then(
            () => console.log("REGISTER WORKED")
        );
    }

    return (

       <>

       {
           authState == "not-authenticated" && ( <>

               <div>
                   Username:
                   <input
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
               </div>
               <div>
                   Password:
                   <input
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
               </div>
               <div>
                    <button onClick={() => submit()}>Submit</button>
               </div>
               <div>
                    <button onClick={() => register()}>Register</button>
               </div>
               <div>
                    <button onClick={() => logout()}>Signout</button>
               </div>

               <div>
                   Authstate: {authState}
               </div>

           </> )
       }

       {
           authState == "not-verified" && ( <>
              <div>Not verified</div>
           </>)
       }

       {
           authState == "authenticated" && <SimpleEditor/>
       }

               <div>
                   Authstate: {authState}
               </div>

       </>

  )
}

export default App;

