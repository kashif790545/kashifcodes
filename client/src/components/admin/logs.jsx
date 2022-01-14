
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap"
import { userInstance } from "../../config/axios";
import Header from "../../components/header/header";

const Logs = () => {
    const [userList, serUserList] = useState([]);

    useEffect(() => {
        getData()
    }, [])
    const getData = async () => {
        const response = await userInstance.get('/admin/logs')
        const { code, find } = response.data
        console.log(response)
        if (code === 200) {
            serUserList(find);
        }
    }



    return (
        <div className="container">

            <><Header></Header><Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Message</th>
                        <th>Timing</th>
                    </tr>
                </thead>
                <tbody>
                    {userList && userList.map((el, i) => (
                        <tr>
                            <td>{i + 1}</td>
                            <td>{el.msg}</td>
                            <td>{el.date}</td>
                        </tr>
                    ))}

                </tbody>
            </Table></>
        </div>
    )
}

export default Logs;