import React, { useContext, useState } from "react";
import '../../styles/Login.css';
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../utlis/storage-utils";
import { loginToAccount } from "../../utlis/api-utils";
import { UserList } from "../../contexts/PostViewContext";

export default function LoginForm() {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const [loginUser, setLoginUser] = useState({
        email: "",
        password: ""
    })

    const [error, setError] = useState({
        email: "",
        password: ""
    });
    const { addUser } = useContext(UserList);
    function onFormSubmit(e) {
        e.preventDefault();

        setLoader(false);
        loginToAccount(loginUser)
            .then(res => {
                // console.log(res);
                if (res.status === "Success") {
                    setToken(res.token);
                    addUser(res.user);
                    setLoginUser({
                        email: "",
                        password: ""
                    });
                    setLoader(true);
                    navigate("/posts/all");
                }
                else {
                    setLoader(true);
                    if (res.field) {
                        setError(ex => ({ ...ex, [res.field]: res.message }));
                    }
                    else alert("Failed to log-in, ", res.message);
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
                            LogIn to Get Started
                        </h1>
                    </div>
                    <div className='login-right-section'>
                        <div className="login-form-container">
                            <form onSubmit={onFormSubmit} className="login-form">
                                <div className="login-field-container">
                                    <input type="email" id="email" name="email" required onChange={e => {
                                        setLoginUser(ex => ({ ...ex, email: e.target.value }));
                                        setError(ex => ({ ...ex, email: "" }));
                                    }} />
                                    <label htmlFor="email">Email...</label>
                                    {error.email && <span className="error">*{error.email}</span>}
                                </div>
                                <div className="login-field-container">
                                    <input type="password" id="password" minLength={8} name="password" required onChange={e => {
                                        setLoginUser(ex => ({ ...ex, password: e.target.value }));
                                        setError(ex => ({ ...ex, password: "" }));
                                    }} />
                                    <label htmlFor="name">Password...</label>
                                    {error.password && <span className="error">*{error.password}</span>}
                                </div>
                                <div className="login-btn-container" >
                                    <button type="submit">{loader ? "Log-In" : <span className="login-loader"></span>}</button>
                                    <p>Don't have an account?<Link to={"/register"}>Sign-Up</Link></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}