/**
 * Code snippets:
 * https://github.com/the-debug-arena/login-registration/blob/main/src/components/signup_component.js
 * */

import React from "react";
import "../styles/form.css";

class Signup extends React.Component {
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
        // ? sometimes these log info won't show on the Console.
        console.log(username, password);

        fetch("http://localhost:3002/users/register", {
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
                console.log(data, "userRegister");
            });
    }

    render() {
        return (
            <form className="form" onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="mb-3">
                    <label>Username</label>
                    <input
                        type="text"
                        required={true}
                        minLength={3}
                        className="form-control"
                        placeholder="Username"
                        onChange={(e) => this.setState({username: e.target.value})}
                    />
                </div>

                <div className="mb-3">
                    <label>Password</label>
                    <input
                        type="password"
                        required={true}
                        minLength={6}
                        className="form-control"
                        placeholder="Enter password"
                        onChange={(e) => this.setState({password: e.target.value})}
                    />
                </div>

                <div className="d-grid">
                    <button type="submit" className="btn btn-primary">
                        Sign Up
                    </button>
                </div>

                <p className="forgot-password text-right">
                    Already registered <a href="/sign-in">sign in?</a>
                </p>
            </form>
        );
    }
}

export default Signup;
