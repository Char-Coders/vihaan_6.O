import React, { useState } from "react";
import axios from "axios";
import "./signUp.css"
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const initValues = { name: "", email: "", password: "" };
    const [title, setTitle] = useState('Add User');
    const [disable, setDisable] = useState({ signUp: false, signIn: true })
    const [values, setValues] = useState(initValues)
    const navigate = useNavigate();

    function handleValueChange(e) {
        setValues(prevValues => ({ ...prevValues, [e.target.name]: e.target.value }))
    }

    function handleSignIn() {
        document.getElementById("nameField").style.maxHeight = "0";
        setTitle("Sign In");
        setDisable({ signUp: true, signIn: false })
    }

    function handleSignUp() {
        // document.getElementById("nameField").style.maxHeight = "60px";
        // setTitle("Sign Up");
        // setDisable({ signIn: true, signUp: false })

        console.log("hmm");
        axios.post("/api/register", values)
        .then(res => {
            if (res.status == 200) {
                navigate("/capture", {state: {name: values.name}});
            }
        })
    }

    function handleOnSubmit() {
        console.log("hmm");
        axios.post("/api/register", {

        })
    }

    return (
        <div>
            <div className="container">
                <div className="form-box">
                    <h1 id="title">{title}</h1>
                    <form>
                        <div className="input-group">
                            <div className="input-field" id="nameField">
                                <i className="fa-solid fa-user"></i>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    onChange={handleValueChange}
                                    value={values.name}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fa-solid fa-envelope"></i>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleValueChange}
                                    value={values.email}
                                />
                            </div>
                            <div className="input-field">
                                <i className="fa-solid fa-lock" id="nameField"></i>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    onChange={handleValueChange}
                                    value={values.password}
                                />
                            </div>
                            <p style={{ color: "black" }}>Lost password <a href="">Click Here!</a></p>
                        </div>
                        <div className="btn-field">
                            <button type="button" id="signupBtn"
                                label="signUp"
                                onClick={handleSignUp}
                                onSubmit={handleOnSubmit}
                                className={disable.signUp ? "disable" : ''}>Add</button>
                        </div>

                        {/* <div className="btn-field">
                            <button type="button" id="signupBtn"
                            label="signUp"
                            onClick={handleSignUp}
                            onSubmit={handleOnSubmit}
                            className={disable.signUp ? "disable": ''}>Sign up</button>
                            
                            <button type="button" id="signinBtn"
                            label="signIn"
                            onClick={handleSignIn}
                            className={disable.signIn ? "disable": ''}>Sign in</button>
                        </div> */}
                    </form>
                </div>
            </div>
        </div>
    )
}