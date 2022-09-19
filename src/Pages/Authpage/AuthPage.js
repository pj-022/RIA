import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./AuthPage.css";
import "bootstrap/dist/css/bootstrap.css";
import { toast } from "react-toastify";
import ImageUploader from "../../components/imageUploader/ImageUploader";

const AuthPage = (props) => {

  const [selected, setSelected] = useState("login");

  useEffect(() => {
    localStorage.removeItem("token")
    localStorage.removeItem("Username")
  }, [])


  return (
    <div className="auth">
      {/* <Alert /> */}
      <div className="info">
        <h1>Right Internet Application </h1>
        <h5 className="lead mx-1">for Bloggers, Write All you can, Penn Yourself Here</h5>
      </div>
      <div className="container authpage">
        <div>
          {selected == "login" && <Login setSelected={setSelected} baseUrl={props.baseUrl} />}
          {selected == "signup" && <Signup setSelected={setSelected} baseUrl={props.baseUrl} />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

function Login(props) {
  let history = useHistory();
  const [creds, setcreds] = useState({ email: "", password: "" });

  const onChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${props.baseUrl}api/auth/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: creds.email, password: creds.password }),
    });
    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authtoken)
      history.push("/home");
    } else {
      toast.error("Invalid Credentials! Try Again")
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>

        <h2>Login</h2>
        <div className="form-group my-4">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={creds.email} aria-describedby="emailHelp" required placeholder="Enter email" />
        </div>
        <div className="form-group my-4">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={creds.password} autoComplete="on" required minLength={8} placeholder="Password" />
        </div>
        {/* <div className="form-group form-check my-4">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1"> Remember me</label>
        </div> */}
        <button type="submit" className="btn btn-primary my-2">Log-In</button><br />
        <a className="link" onClick={() => { props.setSelected("signup"); }}>New here? SignUp here</a>
      </form>
    </div>
  );
}

function Signup(props) {
  const ref = useRef(null)
  const [creds, setcreds] = useState({ username: "", email: "", password: "", fullname: "", job: "", bio: "", image: "" });
  const [images, setImage] = useState()
  const [validUsername, setValidUsername] = useState(false)
  const [validEmail, setValidEmail] = useState(false)
  const [next, setNext] = useState(false)

  const onChange = (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
  };

  const onChangeUsername = async (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
    const response = await fetch(`${props.baseUrl}api/auth/checkuser/1`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: e.target.value })
    })
    const json = await response.json()
    if (json.success) {
      setValidUsername(true)
    }
    else {
      setValidUsername(false)
    }
  }
  const onChangeEmail = async (e) => {
    setcreds({ ...creds, [e.target.name]: e.target.value });
    const response = await fetch(`${props.baseUrl}api/auth/checkuser/0`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: e.target.value })
    })
    const json = await response.json()
    if (json.success) {
      setValidEmail(true)
    }
    else {
      setValidEmail(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validEmail && validUsername) {
      setNext(true)
    }
    else {
      toast.warn("Username/Email Already Registered")
    }
  }

  const finalSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${props.baseUrl}api/auth/createuser/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: creds.username, email: creds.email, password: creds.password, fullname: creds.fullname, job: creds.job, bio: creds.bio, image: images }),
    });
    const json = await response.json();
    if (json.success) {
      toast.success("SuccessFully Registered")
      ref.current.click()
    } else {
      if (images) {
        toast.error("Some Error Occured. Try Again")
      } else {
        toast.error("Profile Picture is Required")
      }
    }
  }

  return (
    <div className="SignUp">

      {!next && <form onSubmit={handleSubmit}>
        <h2>SignUp</h2>
        <div className="form-group my-4">
          <label htmlFor="username">Username</label>
          <input type="text" className="form-control" style={validUsername ? { borderColor: "green" } : (creds.username.length ? { borderColor: "red" } : { borderColor: "" })} id="username" name="username" onChange={onChangeUsername} value={creds.username} aria-describedby="Username" required minLength={5} placeholder="Enter Username" />
          <small className="form-text text-muted" style={validUsername && creds.username ? { display: "none" } : (creds.username.length ? { display: "block" } : { display: "none" })}>{(creds.username).length > 5 ? "Username Already Taken. Try a Different One" : "Username Should have atleast 5 Characters"}</small>
        </div>
        <div className="form-group my-4">
          <label htmlFor="email">Email Address</label>
          <input type="email" className="form-control" style={validEmail ? { borderColor: "green" } : (creds.email.length ? { borderColor: "red" } : { borderColor: "" })} id="email" name='email' onChange={onChangeEmail} value={creds.email} aria-describedby="emailHelp" required placeholder="Enter Email" />
          <small id="emailHelp" className="form-text text-muted">{validEmail ? "We'll never share your email with anyone else." : <> {creds.email.length ? "Invalid Email or Already Registered" : "We'll never share your email with anyone else."} </>}</small>
        </div>
        <div className="form-group my-4">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" name='password' style={creds.password.length > 8 ? { borderColor: "green" } : (creds.password.length ? { borderColor: "red" } : { borderColor: "" })} onChange={onChange} value={creds.password} autoComplete="on" required minLength={8} placeholder="Password" />
          <small className="form-text text-muted" style={(creds.password).length > 8 ? { display: "none" } : (creds.password.length ? { display: "block" } : { display: "none" })}>Password Should have atleast 8 Characters</small>
        </div>
        <button type="submit" className="btn btn-primary my-2">Next &#8594;</button><br />
        <a className="link" ref={ref} onClick={() => { props.setSelected("login"); }}>Already a member? Login here</a>
      </form>}

      {/* //! FORM PART2 Starts Here */}

      {next && <form onSubmit={finalSubmit}>
        <h2>SignUp</h2>
        <div className="form-row my-4">
          <div className="form-group my-3 profilePicture">
            <label htmlFor="propic">Profile Picture</label>
            <ImageUploader setImage={setImage} image={images} />
          </div>
          <div className="form-group my-3">
            <label htmlFor="fullname">Full Name</label>
            <input type="text" className="form-control" id="fullname" name="fullname" required value={creds.fullname} onChange={onChange} placeholder="Fullname..." />
          </div>
          <div className="form-group my-3">
            <label htmlFor="jobD">Job Designation</label>
            <input type="text" className="form-control" id="job" name="job" required value={creds.job} onChange={onChange} placeholder="Web Developer, Data Scientist etc..." />
          </div>
        </div>
        <div className="form-group my-3">
          <label htmlFor="Bio">Bio</label>
          <textarea className="form-control" id="bio" name="bio" style={{ maxHeight: 220, minHeight: 80 }} required value={creds.bio} onChange={onChange} placeholder="Max 250 Characters" maxLength={250}></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Sign in</button><br />
        <a className="link" ref={ref} onClick={() => { props.setSelected("login"); }}>Already a member? Login here</a>
      </form>}
    </div>
  );
}
