
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap"
import { userInstance } from "../../config/axios";
import { toast } from 'react-toastify';
import moment from "moment";

const RegsiterPage = () => {
    const [firstname, setFirstName] = useState('')
    const [lastname, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dob, setDob] = useState('')
    const [phone, setPhone] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            window.location.href = "/welcome"
        }
    }, [])

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const validate = (date) => {
        var eighteenYearsAgo = moment().subtract(18, "years");
        var birthday = moment(date);

        if (!birthday.isValid()) {
            return false;
        }
        else if (eighteenYearsAgo.isAfter(birthday)) {
            return true;
        }
        else {
            return false;
        }
    }

    const validatePhoneNumber = (input_str) => {
        var re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        return re.test(input_str);
    }

    const SaveData = async () => {
        if (firstname && lastname && email && password && dob && phone) {
            if (validateEmail(email)) {
                if (validate(dob)) {
                    if (validatePhoneNumber(phone)) {
                        const signupPayload = {
                            firstname,
                            lastname,
                            email,
                            password,
                            dob,
                            phone,
                        }
                        const response = await userInstance.post('/users/signup', signupPayload)
                        const { code, msg } = response.data
                        console.log(response)
                        if (code === 200) {
                            toast.success(msg, { containerId: "B" })
                            window.location.href = '/login'
                        } else {
                            toast.error(msg, { containerId: "B" })
                        }
                    } else {
                        toast.error("Please enter valid phone no", { containerId: "B" });
                    }
                } else {
                    toast.error("Please enter correct date", { containerId: "B" });
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
                <h1>Registration</h1>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter firstname"
                            value={firstname} onChange={(e) => setFirstName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>DOB</Form.Label>
                        <Form.Control type="date" placeholder="Date of birth" value={dob} onChange={(e) => setDob(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label>Phone No</Form.Label>
                        <Form.Control type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>
                    <a href="/login">Login</a>
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

export default RegsiterPage;