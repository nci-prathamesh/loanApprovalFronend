import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function AddUser() {

    let navigate = useNavigate();
    const [useridCheck, setUseridCheck] = useState("");
    const [validUser, setvalidUser] = useState("false");

    const [useridValidationMessage, setUseridValidationMessage] = useState("");

    const [user, setUser] = useState({
        userId: "",
        password: ""
    });

    function reset(e) {
        e.preventDefault();
        setUser({ userId: "", password: "" });
      }

      const onInputChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        });
    };

    

    const { userId,password } = user;

    function onSubmit(e){
        console.log(e);
        e.preventDefault();
        loadUser(e.target[0].value,e.target[1].value);
    };

    async function loadUser(userId,password){
        console.log(userId);
        const result = await axios.get(`http://x21213313-env.eba-p4pauu4j.us-east-2.elasticbeanstalk.com/user/login/${userId}/${password}`);
        console.log(result.data.u);
        setUser(result.data);
        if(result.data.userType=="1"){
            navigate(`/adminView/${result.data.id}`);
        }
        else{
            navigate(`/viewuser/${result.data.id}`);
        }
        
    };
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='fw-semibold text-primary text-center'> Login Here</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your first name'
                                name='userId'
                                value={userId}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='userFirstName' className='form-label'>
                                Enter UserId
                            </label>
                            <p style={{backgroundColor: useridCheck}}>{useridValidationMessage}</p>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"password"}
                                className="form-control"
                                placeholder='Enter your first name'
                                name='password'
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='userFirstName' className='form-label'>
                                Enter Password
                            </label>
                        </div>
                        <button name="submit" type="submit" className='btn btn-outline-primary mx-2'>Sign In</button>
                        <Link name="submit" to="/adduser" className='btn btn-outline-primary mx-2'>Sign Up</Link>
                        <button name="cancel" type="reset" to="/" onClick={reset} className='btn btn-outline-secondary mx-2'>Cancel</button>
                    </form>
                </div>
            
            </div>
            <div><h4>ADMIN LOGIN</h4> ID-admin   PASSWORD- admin</div><br/>
            <>USER LOGIN : Id-test2 PW- test2</>
        </div>
    )
}
