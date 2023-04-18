import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function
    () {

    const { id } = useParams();
    const userId="";

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

    const [loanapplication, setLoanapplication] = useState([]);

    useEffect(() => {
        loadUser();
        
    }, []);

    const loadUser = async () => {
        const result = await axios.get(`http://localhost:8080/user/user/${id}`);
        
        setUser(result.data);
        userId=result.data.id;
        loadApplications();
    };

    const loadApplications= async ()=>{
        const result = await axios.get(`http://localhost:8080/loanapplication/loanapplications/${user.userId}`);
        console.log("loadApplications");
        console.log(result);
        setLoanapplication(result.data);
        };
        const deleteUser = async (id) => {
            await axios.delete(`http://localhost:8080/user/user/${id}`);
            loadApplications();
        };
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='fw-semibold text-primary text-center'> User Details</h2>
                    <div className='card'>
                        <div className='card-header'>Details of User -
                        <h4>{user.userId}</h4>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>First : </b>
                                    {user.userFirstName}
                                </li>
                                <li className='list-group-item'>
                                    <b>Middle Name : </b>
                                    {user.userMiddleName}
                                </li>
                                <li className='list-group-item'>
                                    <b>Last Name : </b>
                                    {user.userLastName}
                                </li>
                                <li className='list-group-item'>
                                    <b>Gender : </b>
                                    {user.userGender}
                                </li>
                                <li className='list-group-item'>
                                    <b>Phone Number : </b>
                                    {user.phoneNumber}
                                </li>
                                <li className='list-group-item'>
                                    <b>Email Address : </b>
                                    {user.email}
                                </li>
                                
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-primary my-2' to={`/loanapplication/${user.id}`}>Apply For Loan</Link>
                    <Link className='btn btn-secondary my-4' to={"/"}>Back to Home</Link>
                </div>
            </div>
            <div className='py-4'>
                <table className="table border shadow table-primary table-striped">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Loan Used For</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Tenure</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loanapplication.map((app, index) => (
                                <tr>
                                    <th scope="row">{app.applicationId}</th>
                                    <td>{app.loanUsedFor}</td>
                                    <td>{app.loanAmount}</td>
                                    <td>{app.expectedTenure}</td>
                                    <td>{app.status}</td>
                                    <td>
                                        <Link type="button" className="btn btn-primary mx-2"
                                            to={`/viewloanapplication/${app.applicationId}`}>View</Link>
                                        <Link type="button" className="btn btn-outline-primary mx-2"
                                            to={`/updateuser/${user.id}`}>Update</Link>
                                        <button type="button" className="btn btn-danger mx-2"
                                            onClick={() => deleteUser(user.id)}
                                        >Delete</button>
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}
