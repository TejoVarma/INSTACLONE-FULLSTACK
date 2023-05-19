import React, { useState } from "react";
import '../../styles/Login.css';
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../../utlis/api-utils";

export default function SignUpForm() {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState("");

    function onFormSubmit(e) {
        e.preventDefault();

        setLoader(false);
        addNewUser(newUser)
            .then(res => {
                if (res.status === "Success") {
                    setNewUser({
                        name: "",
                        email: "",
                        password: ""
                    });
                    setLoader(true);
                    navigate("/login");
                }
                else {
                    setLoader(true);
                    if (res.field)
                    {
                        setError(res.message);
                    } 
                    else 
                    {
                        alert("Failed to register, ", res.message);
                    }
                }
            })
            .catch(err => alert(err.message))
    }
    return <>
        <div className='landing-main'>
            <div className='login-matte-black'>
                <div className="login-heading-container">
                    <h1 className="login-heading">InstaClone</h1>
                </div>
                <div className="login-container">
                    <div className='login-left-section'>
                        <h1 className="login">
                            SignUp to Get Started
                        </h1>
                    </div>
                    <div className='login-right-section'>
                        <div className="login-form-container">
                            <form onSubmit={onFormSubmit} className="login-form">
                                <div className="login-field-container">
                                    <input type="text" id="name" name="name" required onChange={e=>{
                                        setNewUser(data=>({
                                            ...data,
                                            name : e.target.value
                                        }));
                                    }}/>
                                    <label htmlFor="name">Name...</label>
                                </div>
                                <div className="login-field-container">
                                    <input type="email" id="email" name="email" required onChange={e=>{
                                        setNewUser(data=>({
                                            ...data,
                                            email : e.target.value
                                        }));
                                        setError("");
                                    }}/>
                                    <label htmlFor="email">Email...</label>
                                    {error.email && <span className="error">*{error.email}</span>}
                                </div>
                                <div className="login-field-container">
                                    <input type="password" id="password" minLength={8} name="password" required onChange={e=>{
                                        setNewUser(data=>({
                                            ...data,
                                            password : e.target.value
                                        }));
                                        setError("");
                                    }}/>
                                    <label htmlFor="name">Password...</label>
                                    {error.password && <span className="error">*{error.password}</span>}
                                </div>
                                <div className="login-btn-container" >
                                    <button type="submit">{loader ? "SignUp" : <span className="loader"></span>}</button>
                                    <p>Already have an account?<Link to={"/login"}>LogIn</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}