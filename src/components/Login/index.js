import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PasswordInput, TextInput, Checkbox, Button } from "@mantine/core";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const login = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    console.log(login);

    if (login.hasOwnProperty("user")) {
      console.log("success");
      navigate("/posts");
    } else {
      console.log("failed");
    }
  };

  return (
    <>
      <div className="loginContainer">
        <div className="loginForm">
          <div className="loginText">Log In</div>
          <TextInput
            placeholder="Email"
            label="Email"
            size="xl"
            value={email}
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            size="xl"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <Checkbox
            label="Remember Me"
            color="gray"
            checked={rememberMe}
            onChange={(event) => setRememberMe(event.currentTarget.checked)}
            size="xl"
          />
          <Button color="gray" radius="xl" size="xl" onClick={handleLogin}>
            Log In
          </Button>
          <div className="loginSignUp">
            Don't have an account? <Link to="/signup">Sign Up</Link>.
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
