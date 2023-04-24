import React from "react";
import "./signUp.css"

export default function SignUp() {

    return (
        <div>
            <div class="container">
      <div class="form-box">
        <h1 id="title">Sign Up</h1>
        <form>
          <div class="input-group">
            <div class="input-field" id="nameField">
                <i class="fa-solid fa-user"></i>
                <input type="text" placeholder="Name"/>
            </div>
            <div class="input-field">
                <i class="fa-solid fa-envelope"></i>
                <input type="email" placeholder="Email"/>
            </div>
            <div class="input-field">
                <i class="fa-solid fa-lock" id="nameField"></i>
                <input type="password" placeholder="Password"/>
            </div>
            <p>Lost password <a href="">Click Here!</a></p>
          </div>
          <div class="btn-field">
            <button type="button" id="signupBtn">Sign up</button>
            <button type="button" id="signinBtn" class="disable ">Sign in</button>
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