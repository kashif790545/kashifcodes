import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import LoginPage from "./components/user/login";
import RegsiterPage from "./components/user/register";
import AdminLogin from "./components/admin/adminlogin";
import List from "./components/admin/userslist";
import AddUser from "./components/admin/adduser";
import Welcome from "./components/user/welcome";
import Logs from "./components/admin/logs";
import "react-toastify/dist/ReactToastify.css";
import "./App.css"
function App() {

  const UserRequireAuth = ({ children, redirectTo }) => {
    let isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }

  const AdminRequireAuth = ({ children, redirectTo }) => {
    let isAuthenticated = localStorage.getItem("admintoken");
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
  return (

    <><Router>
      <React.Fragment>
        <Routes>
          <Route
            exact
            path={'/'}
            element={<RegsiterPage />} />
          <Route
            exact
            path={'/welcome'}
            element={
              <UserRequireAuth redirectTo="/login">
                <Welcome />
              </UserRequireAuth>
            }
          />
          <Route
            exact
            path={'/login'}
            element={<LoginPage />} />
          <Route
            exact
            path={'/adminlogin'}
            element={<AdminLogin />} />
          <Route
            exact
            path={'/list'}
            element={
              <AdminRequireAuth redirectTo="/adminlogin">
                <List />
              </AdminRequireAuth>
            }
          />
          <Route
            exact
            path={'/adduser'}
            element={
              <AdminRequireAuth redirectTo="/adminlogin">
                <AddUser />
              </AdminRequireAuth>
            }
          />

            <Route
            exact
            path={'/logs'}
            element={
              <AdminRequireAuth redirectTo="/adminlogin">
                <Logs />
              </AdminRequireAuth>
            }
          />
        </Routes>
      </React.Fragment>
    </Router><ToastContainer /></>
  );
}

export default App;
