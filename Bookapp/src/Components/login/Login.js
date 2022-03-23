import React, { useState } from "react";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import "./Login.css";
//import { useHistory } from "react-router-dom";
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginData, setLoginData] = useState({});
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");

    //let history = useHistory();
    const Login = async () => {
        if(email==="" || password===""){
            setMessage("email or password missing");
            setOpen(true);
        }
        else{
            await fetch('http://localhost:9000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({email, password})
            })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('token', data.access_token);
                setLoginData({...data})
                if(data.status === 200){
                    props.handleUserName(data.userData.firstname, true);
                    props.getEmail(data.userData.email);
                    props.history.push("/");
                }
                else if(data.status === 401){
                    //alert(data.message);
                    setMessage("invalid username or password")
                    setOpen(true);
                    props.history.push("/login");
                }
            })
        }

    }
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    return (
        <div id="loginform">
            <h2 id="headerTitle">Login</h2>
            <div>
                <div className="row loginrow">
                    <label>Email</label>
                    <input id="email" type="email" onChange={(e) => setEmail(e.target.value)} placeholder="email"/>
                </div>
                <div className="row loginrow">
                    <label>Password</label>
                    <input id="password" type="password" onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
                </div>
                <div id="button" onClick={Login} data-testid="loginBtn" className="row loginrow">
                    <button>Log in</button>
                </div>
            </div>
            <div id="alternativeLogin">
                <label>Or sign in with:</label>                
                <div id="iconGroup">
                    <a href="#" id="facebookIcon"></a>
                    <a href="#" id="twitterIcon"></a>
                    <a href="#" id="googleIcon"></a>
                </div>
            </div>
            <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} id="error" severity="error">
                    {message}
                </Alert>
            </Snackbar>
        </div>
        // <div classNameName="container mt-3">
        //     <div classNameName="row">
        //         <div classNameName="col-md-4 offset-md-4">
        //             <h2 classNameName="text-center mb-2">Login</h2>

        //             <div classNameName="mb-2">
        //                 <input type="email" onChange={(e) => setEmail(e.target.value)} classNameName="form-control" placeholder="email"/>
        //             </div>

        //             <div classNameName="mb-2">
        //                 <input type="password" onChange={(e) => setPassword(e.target.value)} classNameName="form-control" placeholder="Password"/>
        //             </div>

        //             <div classNameName="mb-2">
        //                 <button classNameName="btn btn-primary" onClick={Login}>Login</button>
        //             </div>

        //             <Snackbar open={open} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} autoHideDuration={3000} onClose={handleClose}>
        //                 <Alert onClose={handleClose} severity="error">
        //                     {message}
        //                 </Alert>
        //             </Snackbar>
        //         </div>
        //     </div>
        // </div>
    )
}

export default Login;