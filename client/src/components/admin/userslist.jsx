
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap"
import { userInstance } from "../../config/axios";
import moment from "moment";
import Header from "../../components/header/header";
import { toast } from 'react-toastify';

const List = () => {
    const [userList, serUserList] = useState([]);


    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const response = await userInstance.get('/admin/users')
        const { code, find } = response.data
        console.log(response)
        if (code === 200) {
            serUserList(find);
        }
    }

    const deleteUser = async (data) => {
        const pay = {
            _id: data
        }
        const response = await userInstance.post('/admin/deleteUser', pay)
        const { code } = response.data
        console.log(response)
        if (code === 200) {
            toast.success('User Deleted', { containerId: "B" })
            getData()
        }
    }


    return (
        <div className="container">

            <><Header></Header><Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Dob</th>
                        <th>Phone</th>
                        <th>Last Login</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {userList && userList.map((el, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{el.firstname}</td>
                            <td>{el.lastname}</td>
                            <td>{el.email}</td>
                            <td>{el.dob}</td>
                            <td>{el.phone}</td>
                            <td>{el.lastLogin ? moment(el.lastLogin).format("dddd, MMMM Do YYYY, h:mm:ss a"): ''}</td>
                            <td>
                                <Button variant="secondary" onClick={(e) => window.location.href = `/adduser?data=${el._id}`}>
                                    Edit
                                </Button>
                            </td>
                            <td>
                                <Button variant="danger" onClick={() => deleteUser(el._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table></>
        </div>
    )
}

export default List;