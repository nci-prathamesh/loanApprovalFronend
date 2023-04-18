import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

export default function Home() {
    const [users, setUsers] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("http://localhost:8080/user/users");
        console.log(result.data);
        setUsers(result.data);
    };
    const deleteUser = async (id) => {
        await axios.delete(`http://localhost:8080/user/user/${id}`);
        loadUsers();
    }

    return (
        <div className='container'>
            <div className='py-4'>
                <table className="table border shadow table-primary table-striped">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">First Name</th>
                            <th scope="col">Middle Name</th>
                            <th scope="col">Last Name</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.userFirstName}</td>
                                    <td>{user.userMiddleName}</td>
                                    <td>{user.userLastName}</td>
                                    <td>
                                        <Link type="button" className="btn btn-primary mx-2"
                                            to={`/viewuser/${user.id}`}>View</Link>
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
