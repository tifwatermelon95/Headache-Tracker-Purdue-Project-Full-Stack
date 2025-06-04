import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';


const Home = (props) => {
    const navigate = useNavigate(); // Navigate to different routes
    const [name, setName] = useState(''); // State variable to store the user's name
    

    return (
        <div>
            <h1>Welcome to the Headache Tracker App!</h1>

            <div className = "login-form">
                <input type = "text" name = "username" placeholder = "Username" autocomplete= 'off' onChange={(event)=> {setName.target.value}}/>
                <input type = "password" name = "password" placeholder = "Password" autocomplete= 'off' onChange={(event)=> {setPassword.target.value}}/>
                <button onClick = {() => navigate('/login', {replace:true, state: name, password})}>Login</button>
                <button onClick = {() => navigate('/register', {replace:ture})}>Register</button>
            </div>

        </div>
    )


}

export default Home;
