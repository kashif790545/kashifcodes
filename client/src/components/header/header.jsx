import React from "react";
import { Button } from "react-bootstrap";

const Header = () => {

    const LogOut = () => {
        localStorage.removeItem('admintoken')
        window.location.href = "/adminlogin"
    }
    return (
        <div className="header">
            <Button onClick={() => LogOut()}>LogOut</Button>
            <Button onClick={() => window.location.href = "/adduser"}>Add User</Button>
            <Button onClick={() => window.location.href = "/logs"}>Logs</Button>
        </div>


    )


}

export default Header;