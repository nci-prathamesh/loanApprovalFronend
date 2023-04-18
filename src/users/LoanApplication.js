import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate,useParams } from 'react-router-dom';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";

export default function LoanApplication() {

    const { userId } = useParams();
    const { id,setId } = useState();
    let navigate = useNavigate();
    const [useridCheck, setUseridCheck] = useState("");
    const [passwordMatch, setPasswordMatch] = useState({
        passwordMatchMessage: "",
        passwordMatchFlag: ""
    });

    const [useridValidationMessage, setUseridValidationMessage] = useState("");
    //data
    const [loanapplication, setLoanapplication] = useState({
        userId: "",
        loanAmount: "",
        expectedTenure:"",
        annualIncome: "",
        loanUsedFor: "",
        maritalStatus: "",
        address: "",
        city: "",
        state: "",
        userType: "",
        status:"pending"
    });
    //reset
    loanapplication.userId=userId;
    function reset(e) {
        e.preventDefault();
        setLoanapplication({
            loanAmount: "",
            expectedTenure:"",
            annualIncome: "",
            loanUsedFor: "",
            maritalStatus: "",
            address:"",
            city: "",
            state: "",
        });
    }
    //literal for values
    const {
        loanAmount,
        expectedTenure,
        annualIncome,
        loanUsedFor,
        maritalStatus,
        address,
        city,
        state,
        userType,
        status,
    } = loanapplication
    const [open, setOpen] = React.useState(false);
  
    const handleClickToOpen = () => {
      setOpen(true);
    };
    
    const handleToClose =async () => {
        const result = await axios.get(`http://localhost:8080/user/user/${userId}`);
     //   setId(result.data.id);
        console.log()
       setOpen(false);
      navigate(`/viewuser/${result.data.id}`);
    };
    const onInputChange = (e) => {
        setLoanapplication({
            ...loanapplication, [e.target.name]: e.target.value
        });

    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(loanapplication);
        await axios.post("http://localhost:8080/loanapplication/addloanapplication", loanapplication);
        setOpen(true);
    }
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='fw-semibold text-primary text-center'> Apply for Loan</h2>
                    <form onSubmit={(e) => onSubmit(e)}>
                    <h3>{userId}</h3>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your first name'
                                name='loanAmount'
                                value={loanAmount}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='userFirstName' className='form-label'>
                            Loan Amount in INR
                            </label>
                            <p style={{ color: useridCheck }}>{useridValidationMessage}</p>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your Password'
                                name='expectedTenure'
                                value={expectedTenure}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='expectedTenure' className='form-label'>
                            Expected Tenure in Months
                            </label>
                            <p style={{ color: passwordMatch.passwordMatchFlag }}></p>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your first name'
                                name='annualIncome'
                                value={annualIncome}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='annualIncome' className='form-label'>
                            Annual Income in INR
                            </label>
                            <p style={{ color: passwordMatch.passwordMatchFlag }}>{passwordMatch.passwordMatchMessage}</p>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your first name'
                                name='loanUsedFor'
                                value={loanUsedFor}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='loanUsedFor' className='form-label'>
                            Loan Used For
                            </label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your middle name'
                                name='address'
                                value={address}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='address' className='form-label'>
                                Address
                            </label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your last name'
                                name='city'
                                value={city}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='city' className='form-label'>
                            City
                            </label>
                        </div>
                        <div className='form-floating mb-3'>
                            <input type={"text"}
                                className="form-control"
                                placeholder='Enter your last name'
                                name='state'
                                value={state}
                                onChange={(e) => onInputChange(e)}
                            />
                            <label htmlFor='state' className='form-label'>
                            State
                            </label>
                        </div>
                        <div className="row g-2 mb-3">
                            <div className="form-floating  col-md-6">
                                <select className="form-select" name="maritalStatus" value={maritalStatus} onChange={(e) => onInputChange(e)}>
                                    <option defaultValue>Select Marital Status</option>
                                    <option value="1">Unmarried</option>
                                    <option value="2">Married</option>
                                    <option value="3">Saperated</option>
                                </select>
                                <label htmlFor="maritalStatus">Marital Status</label>
                            </div>
                        </div>
                        <button name="submit" type="submit" className='btn btn-outline-primary mx-2'>Apply</button>
                        <button name="cancel" type="reset" to="/" onClick={reset} className='btn btn-outline-secondary mx-2'>Reset</button>
                        <Link name="cancel" to={`/viewuser/${id}`} className='btn btn-outline-secondary mx-2'>Back to User</Link>

                        <Dialog open={open} onClose={handleToClose}>
                            <DialogTitle className="text-success w-50 p-3 rounded">{"Application Successful"}</DialogTitle>
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
