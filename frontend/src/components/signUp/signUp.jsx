import React, { useState } from "react";
import "./signUp.css"

export default function SignUp() {

    const [title, setTitle] = useState('Sign Up');
    const [disable, setDisable] = useState({signUp: false, signIn: true})

    function handleSignIn() {
        document.getElementById("nameField").style.maxHeight = "0";
        setTitle("Sign In");
        setDisable({signUp: true, signIn: false})
    }

    function handleSignUp() {
        document.getElementById("nameField").style.maxHeight = "60px";
        setTitle("Sign Up");
        setDisable({signIn: true, signUp: false})
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
                                <input type="text" placeholder="Name" />
                            </div>
                            <div className="input-field">
                                <i className="fa-solid fa-envelope"></i>
                                <input type="email" placeholder="Email" />
                            </div>
                            <div className="input-field">
                                <i className="fa-solid fa-lock" id="nameField"></i>
                                <input type="password" placeholder="Password" />
                            </div>
                            <p style={{color: "black"}}>Lost password <a href="">Click Here!</a></p>
                        </div>
                        <div className="btn-field">
                            <button type="button" id="signupBtn"
                            label="signUp"
                            onClick={handleSignUp}
                            className={disable.signUp ? "disable": ''}>Sign up</button>
                            
                            <button type="button" id="signinBtn"
                            label="signIn"
                            onClick={handleSignIn}
                            className={disable.signIn ? "disable": ''}>Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
            <script>
                {/* let signupBtn = document.getElementById("signupBtn");
      let signinBtn = document.getElementById("signinBtn");
      let nameField = document.getElementById("nameField");
      let title = document.getElementById("title");


      signinBtn.onclick = function(){
        nameField.style.maxHeight = "0";
        title.innerHTML = "Sign In";
        signupBtn.classList.add("disable");
        signinBtn.classList.remove("disable");
      }

      signupBtn.onclick = function(){
        nameField.style.maxHeight = "60px";
        title.innerHTML = "Sign In";
        signupBtn.classList.remove("disable");
        signinBtn.classList.add("disable");

      } */}

            </script>

        </div>
    )
}