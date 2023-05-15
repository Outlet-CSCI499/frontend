import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PasswordInput, TextInput, Checkbox, Button } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { Login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Fill in all required fields.");
    } else {
      Login(email, password);
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
