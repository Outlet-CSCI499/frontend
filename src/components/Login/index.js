import "./index.scss";
import LogoTitle from "../../assets/images/logo-o.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const checkBoxHandler = (box) => {
    setRememberMe(box.target.checked);
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginForm">
          <h2 className="loginText">Login</h2>
          <div className="loginBox">
            <label style={{ fontSize: 15 }}>Email</label>
            <br />
            <input
              type="email"
              className="emailBox"
              value={email}
              onChange={(email) => setEmail(email.target.value)}
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
            <input
              className="rememberMe"
              type="checkbox"
              id="rememberMe"
              onChange={checkBoxHandler}
            ></input>
            <label style={{ fontSize: 15 }} for="rememberMe">
              Remember Me
            </label>
            <br />
            <input
              className="signInButton"
              type="button"
              value="Sign in"
              onClick={() => console.log(email, password, rememberMe)}
            ></input>
            <p className="signUpText" style={{ fontSize: 15 }}>
              Don't have an account?{" "}
              <Link style={{ fontSize: 15 }} to="/SignUp">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
