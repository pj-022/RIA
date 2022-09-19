import './Header.css';
import 'bootstrap/dist/css/bootstrap.css';
import { CgProfile } from "react-icons/cg";
import { useLocation, useHistory } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Alert from '../Alert/Alert';
import logo from "../../images/RIA-logos_transparent.png"


const Header = (props) => {

  const [profile, setprofile] = useState(true)
  const location = useLocation();
  const history = useHistory();
  const [pname, setpname] = useState()
  useEffect(() => {
    if (location.pathname !== "/") {
      if (localStorage.getItem("token")) {
        setprofile(true)
        if (!localStorage.getItem("Username")) {
          async function fetchData() {
            const data = await fetch(`${props.baseUrl}api/auth/getuser/`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                authtoken: localStorage.getItem("token"),
              },
            });
            const jsonData = await data.json();
            if (jsonData.success) {
              localStorage.setItem("Username", jsonData.user.name)
              localStorage.setItem("userid", jsonData.user._id)
              setpname(jsonData.user.fullname)
              toast.success(`Logged in as ${jsonData.user.fullname}`)
            }
            else {
              history.push("/")
              toast.error(`Token Expired. Login Again`)
            }
          }
          fetchData()
        }
      }
      else {
        history.push("/")
        toast.error(`Login Required`)
      }
    }
    if (location.pathname === "/") {
      setprofile(false)
    }
  }, [location])



  return (
    <div className="Header">
      <Alert />
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <a className="navbar-brand"><img src={logo} style={{height: "110px", width: "110px"}}/></a>
          <ul className="navbar-nav mr-auto mobile">
            <li className="nav-item dropdown">
              <a className="nav-link" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="navbar-toggler-icon"></span>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item">Action</a>
                <a className="dropdown-item">Another action</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item">Something else here</a>
              </div>
            </li>
          </ul>
          {profile && (<button className="btn my-2 my-sm-0"><CgProfile style={{ width: 30, height: 30, marginRight: 5 }} />{pname}</button>)}
        </div>
      </nav>
    </div>
  );
}

export default Header;
