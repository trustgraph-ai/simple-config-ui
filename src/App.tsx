
import { useState, useEffect } from 'react';
import SimpleEditor from './simple-editor/SimpleEditor';
import SignIn from './SignIn';
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
           authState == "not-authenticated" && <SignIn/>
       }

       {
           authState == "not-verified" && ( <>
              <div>Not verified</div>
           </>)
       }

       {
           authState == "authenticated" && <SimpleEditor/>
       }

       </>

  )
}

export default App;

