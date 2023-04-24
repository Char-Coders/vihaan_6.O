import React from "react";
import "./home.css"

export default function Homepage() {

    return (
        <div>
    <div class="header">
        <nav>
            <img src="images/logo-removebg-preview.png" class="logo"/>
            <div>
                <button class="sign-up">Sign up</button>
                <button class="sign-in">Sign in</button>
            </div>
            <div class="header-content">
                <h1>Face Recognition Attendance System</h1>
                <h3>Fast and easy way to mark your attendance.</h3>
            </div>
        </nav>
    </div>
    <div class="features">
        <div class="row">
            <div class="text-col">
                <h2>Zero Interaction.</h2>
                <p>Needs zero physical interaction from a user.
                </p>
            </div>
            <div class="img-col">
                <img src="images/facial-recognition.jpg" alt=""/>
            </div>
        </div>
        <div class="row">
            <div class="img-col">
                <img src="images/stdasms.jpg" alt="" />
            </div>
            <div class="text-col">
                <h2>Attendence Systems.</h2>
                <p>Automates school attendence/office systems.</p>
            </div>
        </div>
        <div class="row">
            <div class="text-col">
                <h2>Smoother Check-Ins.</h2>
                <p>This automated system ensures smoother check-ins for events.</p>
            </div>
            <div class="img-col">
                <img src="images/red-snowflakes-christmas-menu-7--500x500.jpg" alt="" />
            </div>
        </div>
        <div class="row">
            <div class="img-col">
                <img src="images/student-management.jpg" alt="" />
            </div>
            <div class="text-col">
                <h2>Modular Data.</h2>
                <p>Trained data can be imported and exported by requirements.</p>
            </div>
        </div>
    </div>
    {/* --------------footer------------ */}
    <div class="copyright">
        <p>Copyright &#169; CharCoder. Made with by Anish, Lakshay, Shivansh, Vedant.</p>
      </div>

        </div>
    )
}