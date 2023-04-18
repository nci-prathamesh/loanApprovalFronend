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
                            <th scope="col">User Id</th>
                            <th scope="col">Status</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.userId}</td>
                                    <td>{user.status}</td>
                                    <td>
                                        <Link type="button" className="btn btn-primary mx-2"
                                            to={`/adminUserDetails/${user.id}`}>View</Link>
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
