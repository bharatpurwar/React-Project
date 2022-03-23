import React, { useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "../login/Login.css";
//import { useHistory } from "react-router-dom";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Register = (props) => {
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [city, setCity] = useState('');
    const [age, setAge] = useState(NaN);
    const [email, setEmail] = useState('');
    const [openSuccess, setOpenSuccess] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState("");

    function ValidateEmail(inputText)
    {
        var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if(inputText.match(mailformat))
        {
        return true;
        }
        else
        {
        return false;
        }
    }

    function ValidatePassword() {
        
        if (password.length < 6) {
            setMessage("Your password must be at least 6 characters");
            return false;
        }
        if (password.search(/[a-z]/i) < 0) {
            setMessage("Your password must contain at least one letter."); 
            return false;
        }
        if (password.search(/[0-9]/) < 0) {
            setMessage("Your password must contain at least one digit.");
            return false;
        }
        return true;
    }
    const Register = async () => {
        if(firstname===""||lastname===""||city===""||age===""||email===""||password==="")
        {
            setMessage("some fields missing");
            setOpenError(true);
        }
        else if(age<=0 || age>=125)
        {
            setMessage("invalid age");
            setOpenError(true);
        }
        else if(!ValidateEmail(email)){
            setMessage("You have entered an invalid email address!");
            setOpenError(true);
        }
        else if(!ValidatePassword()){
            setOpenError(true);
        }
        else{
            await fetch('http://localhost:9000/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({firstname, lastname, city, age, email, password})
            })
            .then(res => res.json())
            .then(data => {
                if(data.status === 200){
                    setMessage(data.message);
                    setOpenSuccess(true);
                    //props.history.push("/login");
                }
                else if(data.status === 409){
                    setMessage(data.message);
                    setOpenError(true);
                    //props.history.push("/register");
                }
            })
        }

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSuccess(false);
        setOpenError(false);
    };

    return (
        <div id="loginform">
            <h2 id="headerTitle">Register</h2>
            <p>Fill the form below to create a new account</p>
            <div>
                <div className="row loginrow">
                    {/* <label>First Name</label> */}
                    <input id="firstname" type="text" onChange={(e) => setFirstName(e.target.value)} placeholder="firstname" />
                </div>
                <div className="row loginrow">
                    {/* <label>Last Name</label> */}
                    <input id="lastname" type="text" onChange={(e) => setLastName(e.target.value)}  placeholder="lastname" />
                </div>
                <div className="row loginrow">
                    {/* <label>City</label> */}
                    <input id="city" type="text" onChange={(e) => setCity(e.target.value)} placeholder="city" />
                </div>
                <div className="row loginrow">
                    {/* <label>Email</label> */}
                    <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email" />
                </div>
                <div className="row loginrow">
                    {/* <label>Age</label> */}
                    <input id="age" type="number" onChange={(e) => setAge(e.target.value)} placeholder="age" />
                </div>
                
                <div className="row loginrow">
                    <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                </div>
                <div id="button" className="row loginrow" data-testid="registerBtn" >
                    <button onClick={Register}>Register</button>
                </div>
                <Snackbar open={openSuccess} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
                    <Alert id="success" onClose={handleClose} severity="success">
                        {message}
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={7000} onClose={handleClose}>
                    <Alert id="error" onClose={handleClose} severity="error">
                        {message}
                    </Alert>
                </Snackbar>
            </div>

        </div>
   
    )
}

export default Register;