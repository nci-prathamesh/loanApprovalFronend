import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export default function
    () {

    const { applicationId } = useParams();
    let navigate = useNavigate();

        const [loanapplication, setLoanapplication] = useState({
        userId: "",
        applicationId:"",
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

    useEffect(() => {
        loadApplications();
    }, []);

    const handleToClose =async () => {
        console.log(loanapplication);
        const result = await axios.get(`http://localhost:8080/user/user/${loanapplication.userId}`);
        
        console.log(result);
      navigate(`/adminUserDetails/${result.data.id}`);
    };

    const loadApplications= async ()=>{
        const result = await axios.get(`http://localhost:8080/loanapplication/loanapplication/${applicationId}`);
        setLoanapplication(result.data);
        };
        const deleteUser = async (id) => {
            await axios.delete(`http://localhost:8080/user/user/${id}`);
            loadApplications();
        };

        const changeStatusApproved=async()=>{
            loanapplication.status="Approved";
            await axios.put(`http://localhost:8080/loanapplication/update/${applicationId}`, loanapplication);
            navigate(`/viewloanapplication/${applicationId}`);
        };
        const changeStatusRejected=async()=>{
            loanapplication.status="Rejected";
            await axios.put(`http://localhost:8080/loanapplication/update/${applicationId}`, loanapplication);
            navigate(`/viewloanapplication/${applicationId}`);
        };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border rounded p-4 mt-2 shadow'>
                    <h2 className='fw-semibold text-primary text-center'> Loan Application Details</h2>
                    <div className='card'>
                        <div className='card-header'>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                    <b>Application Id : </b>
                                    {applicationId}
                                </li>
                                <li className='list-group-item'>
                                    <b>Loan Amount : </b>
                                    {loanapplication.loanAmount}
                                </li>
                                <li className='list-group-item'>
                                    <b>Annual Income : </b>
                                    {loanapplication.annualIncome}
                                </li>
                                <li className='list-group-item'>
                                    <b>Tenure : </b>
                                    {loanapplication.expectedTenure}
                                </li>
                                <li className='list-group-item'>
                                    <b>Loan Used For : </b>
                                    {loanapplication.loanUsedFor}
                                </li>
                                <li className='list-group-item'>
                                    <b>Address : </b>
                                    {loanapplication.address}
                                </li>
                                <li className='list-group-item'>
                                    <b>City : </b>
                                    {loanapplication.city}
                                </li>
                                <li className='list-group-item'>
                                    <b>State : </b>
                                    {loanapplication.state}
                                </li>
                                <li className='list-group-item'>
                                    <b>Status : </b>
                                    {loanapplication.status}
                                </li>
                                <li>
                                
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className='btn btn-secondary my-4' onClick={handleToClose}>Back to User</Link>
                </div>
            </div>
        </div>
    )
}
