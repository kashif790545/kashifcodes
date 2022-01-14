import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap"
import { userInstance } from "../../config/axios";
import { toast } from 'react-toastify';
const AdminLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (localStorage.getItem('admintoken')) {
            window.location.href = "/list"
        }
    }, [])
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const SaveData = async () => {
        if (email && password) {
            if (validateEmail(email)) {
        const loginPayload = {
            email,
            password,
        }
        const response = await userInstance.post('/admin/adminlogin', loginPayload)
        const { code, token, msg } = response.data
        console.log(response)
        if (code === 200) {
            toast.success(msg, { containerId: "B" })
            localStorage.setItem('admintoken', token)
            window.location.href = '/list'
        } else {
            toast.error(msg, { containerId: "B" })
        }
    } else {
        toast.error('Please check your email', { containerId: "B" })
    }
} else {
    toast.error('Please fill all feilds', { containerId: "B" })
}
    }

    return <div className="container">
        <div className="row">
        <div className="signup-form">
            <h1>Admin Login</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <div className="signup-btn">
                <Button variant="primary" onClick={SaveData}>
                    Submit
                </Button>
                </div>
            </Form>
            </div>
        </div>
    </div>
}

export default AdminLogin;