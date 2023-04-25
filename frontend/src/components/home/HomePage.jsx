import React from "react";
import "./home.css"

export default function Homepage() {

    return (
        <div>
            <div className="header">
                <nav>
                    <img src="/home/logo-removebg-preview.png" className="logo" />
                    <div>
                        <a href="/adduser"><button className="sign-up">Add User</button></a>
                    </div>
                    <div className="header-content">
                        <h1>Face Recognition Attendance System</h1>
                        <h3>Fast and easy way to mark your attendance.</h3>
                    </div>
                </nav>
            </div>
            <div className="features">
                <div className="row">
                    <div className="text-col">
                        <h2>Zero Interaction.</h2>
                        <p>Needs zero physical interaction from a user.
                        </p>
                    </div>
                    <div className="img-col">
                        <img src="/home/facial-recognition.jpg" alt="" />
                    </div>
                </div>
                <div className="row">
                    <div className="img-col">
                        <img src="/home/stdasms.jpg" alt="" />
                    </div>
                    <div className="text-col">
                        <h2>Attendence Systems.</h2>
                        <p>Automates school attendence/office systems.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="text-col">
                        <h2>Smoother Check-Ins.</h2>
                        <p>This automated system ensures smoother check-ins for events.</p>
                    </div>
                    <div className="img-col">
                        <img src="/home/red-snowflakes-christmas-menu-7--500x500.jpg" alt="" />
                    </div>
                </div>
                <div className="row">
                    <div className="img-col">
                        <img src="/home/student-management.jpg" alt="" />
                    </div>
                    <div className="text-col">
                        <h2>Modular Data.</h2>
                        <p>Trained data can be imported and exported by requirements.</p>
                    </div>
                </div>
            </div>
            {/* --------------footer------------ */}
            <div className="copyright">
                <p>Copyright &#169; CharCoder. Made with by Anish, Lakshay, Shivansh, Vedant.</p>
            </div>

        </div>
    )
}