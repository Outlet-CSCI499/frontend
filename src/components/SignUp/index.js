import "./index.scss";
import LogoTitle from "../../assets/images/logo-o.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else if (password === confirmPassword) {
      const signup = await fetch("http://localhost:3001/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          first_name: firstName,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          return data;
        });

      console.log(signup);

      if (signup.hasOwnProperty("user")) {
        console.log("success");
        navigate("/login");
      } else {
        console.log("failed");
      }
    }
  };

  return (
    <>
      <div className="signUpContainer">
        <div className="signUpForm">
          <h2 className="signUpText">Sign Up</h2>
          <div className="signUpBox">
            <label style={{ fontSize: 15 }}>Email</label>
            <br />
            <input
              type="email"
              className="emailBox"
              onChange={(email) => setEmail(email.target.value)}
            ></input>
            <br />
            <label style={{ fontSize: 15 }}>Username</label>
            <br />
            <input
              type="text"
              className="emailBox"
              onChange={(username) => setUsername(username.target.value)}
            ></input>
            <br />
            <label style={{ fontSize: 15 }}>First Name</label>
            <br />
            <input
              type="text"
              className="emailBox"
              onChange={(firstName) => setFirstName(firstName.target.value)}
            ></input>
            <br />
            <label style={{ fontSize: 15 }}>Password</label>
            <br />
            <input
              type="password"
              className="passwordBox"
              onChange={(password) => setPassword(password.target.value)}
            ></input>
            <br />
            <label style={{ fontSize: 15 }}>Confirm Password</label>
            <br />
            <input
              type="password"
              className="passwordBox"
              onChange={(confirmPassword) =>
                setconfirmPassword(confirmPassword.target.value)
              }
            ></input>
            <br />
            <input
              className="signUpButton"
              type="button"
              value="Create Account"
              onClick={() => handleSignUp()}
            ></input>
            <p className="loginText" style={{ fontSize: 15 }}>
              Already have an account?{" "}
              <Link style={{ fontSize: 15 }} to="/Login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
