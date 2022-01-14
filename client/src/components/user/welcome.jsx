import React, {useState, useEffect} from "react";
import { Button } from "react-bootstrap";
import { userInstance } from "../../config/axios";
import moment from "moment";

const Welcome = () => {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const LogOut = async () => {
        let now = moment().format();
        const loginPayload = {
            _id: localStorage.getItem('userid'),
            date : now,
        }
        const response = await userInstance.post('/users/logout', loginPayload)
        const { code } = response.data
        console.log(response)
        if (code === 200) {
            localStorage.removeItem('token')
            localStorage.removeItem('userid')
            window.location.href = '/'
        }
    }

    useEffect(() => {
            getUserById()
    }, [])

    const getUserById = async () => {
        const signupPayload = {
            _id: localStorage.getItem('userid'),
        }
        const response = await userInstance.post('/admin/getUser', signupPayload)
        const { code, find } = response.data
        console.log(response)
        if (code === 200) {
            setFirstName(find.firstname);
            setLastName(find.lastname);
        }
    }


    return (
        <div className="admin-page">
            Welcome {firstname} {lastname}
            <Button onClick={LogOut}>Logout</Button>
        </div>

    )


}

export default Welcome;