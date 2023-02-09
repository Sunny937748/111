/**
 * References:
 * https://www.youtube.com/watch?v=6oTDAyuQ5iw
 * https://github.com/the-debug-arena/login-registration/blob/main/src/components/login_component.js
 * */

import React from "react";
import "../styles/form.css";
import Google from "../img/google.png";
import Github from "../img/github.png";

const google = () => {
    window.open("http://localhost:3002/auth/google", "_self");
  };

  const github = () => {
    window.open("http://localhost:3002/auth/github", "_self");
  };

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    

    handleSubmit(e) {
        e.preventDefault();
        const {username, password} = this.state;
        console.log(username, password);
        fetch("http://localhost:3002/users/login-user", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "userLogin");
                localStorage.setItem("logStatus", "notLogged");

                if (data.status === "ok") {
                    alert("Login successful");
                    window.localStorage.setItem("logStatus", "logged");
                    window.localStorage.setItem("loggedUsername", username);
                    window.localStorage.setItem("token", data.data);
                    window.location.href = "/";
                }
            });
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        onChange={(e) => this.setState({username: e.target.value})}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => this.setState({password: e.target.value})}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </div>

                <p className="forgot-password text-right">
                    New here <a href="/sign-up">sign up!</a>
                </p>

                <div className="left">
                  <div className="loginButton google" onClick={google}>
                  <img src={Google} alt="" className="icon" />
                  Google
                  </div>
          
                  <div className="loginButton github" onClick={github}>
                  <img src={Github} alt="" className="icon" />
                  Github
                  </div>
                </div>

            </form>
        );
    }
}

export default Login;