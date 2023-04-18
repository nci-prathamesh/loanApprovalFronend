import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

export default function AddUser() {

    let navigate = useNavigate();
    const [useridCheck, setUseridCheck] = useState("");
    const [passwordMatch, setPasswordMatch] = useState({
        passwordMatchMessage: "",
        passwordMatchFlag: ""
    });

    const [useridValidationMessage, setUseridValidationMessage] = useState("");
    //data
    const [user, setUser] = useState({
        userId: "",
        userFirstName: "",
        userMiddleName: "",
        userLastName: "",
        userGender: "",
        useridValid: false,
        phoneNumber: "",
        email: "",
        password: "",
        confirmPassword: "",
        userType: ""
    });
    //reset
    function reset(e) {
        e.preventDefault();
        setUser({
            userId: "",
            userFirstName: "",
            userMiddleName: "",
            userLastName: "",
            userGender: "",
            useridValid: false,
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: "",
            userType: ""
        });
    }
    //literal for values
    const {
        userId,
        userFirstName,
        userMiddleName,
        userLastName,
        userGender,
        phoneNumber,
        email,
        password,
        confirmPassword,
        userType
    } = user
    const [open, setOpen] = React.useState(false);
  
    const handleClickToOpen = () => {
      setOpen(true);
    };
    
    const handleToClose =async () => {
        const result = await axios.get(`http://localhost:8080/user/useridExist/${userId}`);
       setOpen(false);
      navigate(`/viewuser/${result.data.id}`);
    };
    const onInputChange = (e) => {
        setUser({
            ...user, [e.target.name]: e.target.value
        });
        //console.log(e);
        if (e.target.name == "userId" && e.target.value != "") {
            validateUserId(e.target.value);
        };

        if (e.target.name == "confirmPassword" && e.target.value != "") {
            confirmPasswordValidator(e.target.value);
        };

    };

    async function confirmPasswordValidator(confirmPassword) {
        console.log(user.userId);
        if (confirmPassword == user.password) {
            setPasswordMatch({
                passwordMatchMessage: "Password Match",
                passwordMatchFlag: "green"
            });
        }
        else {
            setPasswordMatch({
                passwordMatchMessage: "Password Not Match",
                passwordMatchFlag: "red"
            });
        }
        //    console.log("result");
        //     console.log("uuuu");
    };

    async function validateUserId(userid) {
        //    console.log(user.userId);
        const result = await axios.get(`http://localhost:8080/user/useridExist/${userid}`);
        //    console.log("result");
        setUseridCheck(result.data.userId);
        //    console.log((result.data.userId).length);
        //    console.log(result.data=='');
        if (result.data == '') {
            setUseridValidationMessage("User Id accepted");
            setUseridCheck("green");
            //      console.log("useridValidationMessage");
        }
        else {
            setUseridValidationMessage("User Id not available");
            setUseridCheck("red");
        }
        //     console.log("uuuu");
    };



    const onSubmit = async (e) => {
        setOpen(true);
        e.preventDefault();
        await axios.post("http://localhost:8080/user/user", user);
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='fw-semibold text-primary text-center'> Register User</h2>
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
                                User Id
                            </label>
                            <p style={{ color: useridCheck }}>{useridValidationMessage}</p>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your Password'
                                name='password'
                                value={password}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='password' className='form-label'>
                                Enter Password
                            </label>
                            <p style={{ color: passwordMatch.passwordMatchFlag }}></p>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your first name'
                                name='confirmPassword'
                                value={confirmPassword}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='confirmPassword' className='form-label'>
                                Confirm Password
                            </label>
                            <p style={{ color: passwordMatch.passwordMatchFlag }}>{passwordMatch.passwordMatchMessage}</p>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your first name'
                                name='userFirstName'
                                value={userFirstName}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='userFirstName' className='form-label'>
                                First Name
                            </label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your middle name'
                                name='userMiddleName'
                                value={userMiddleName}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='userMiddleName' className='form-label'>
                                Middle Name
                            </label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your last name'
                                name='userLastName'
                                value={userLastName}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='userLastName' className='form-label'>
                                Last Name
                            </label>
                        </div>
                        <div className="row g-2 mb-3">
                            <div className="form-floating  col-md-6">
                                <select className="form-select" name="userGender" value={userGender} onChange={(e) => onInputChange(e)}>
                                    <option defaultValue>Select Gender</option>
                                    <option value="1">Female</option>
                                    <option value="2">Male</option>
                                    <option value="3">Other</option>
                                </select>
                                <label htmlFor="userGender">Gender</label>
                            </div>
                        </div>
                        <div className="row g-2 mb-3">
                            <div className="form-floating  col-md-6">
                                <select className="form-select" name="userType" value={userType} onChange={(e) => onInputChange(e)}>
                                    <option defaultValue>Select User Type</option>
                                    <option value="1">Admin</option>
                                    <option value="2">Private</option>
                                    <option value="3">Guest</option>
                                </select>
                                <label htmlFor="userType">User Type</label>
                            </div>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter Phone Number'
                                name='phoneNumber'
                                value={phoneNumber}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='userLastName' className='form-label'>
                                Phone Number
                            </label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter Email Id'
                                name='email'
                                value={email}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='userLastName' className='form-label'>
                                Email Id
                            </label>
                        </div>
                        <button name="submit" type="submit" className='btn btn-outline-primary mx-2'>Submit</button>
                        <button name="cancel" type="reset" to="/" onClick={reset} className='btn btn-outline-secondary mx-2'>Reset</button>
                        <Link name="cancel" to="/" className='btn btn-outline-secondary mx-2'>Cancel</Link>

                        <Dialog open={open} onClose={handleToClose}>
                            <DialogTitle className="text-success w-50 p-3 rounded">{"Registration Done"}</DialogTitle>
                            <DialogActions >
                                <Button className="btn btn-success" onClick={handleToClose}
                                    color="primary" autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                            </Dialog>
                    </form>
                </div>

            </div>
        </div>
    )
}
