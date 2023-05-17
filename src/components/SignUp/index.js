import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PasswordInput, TextInput, Checkbox, Button } from "@mantine/core";
import { useAuth } from "../../contexts/AuthContext";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const { SignUp } = useAuth();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword || !username) {
      alert("Fill in all required fields.");
    } else if (password !== confirmPassword) {
      alert("Passwords do not match");
    } else if (password === confirmPassword) {
      SignUp(email, password, username, firstName);
    }
  };

  return (
    <>
      <div className="signUpContainer">
        <div className="signUpForm">
          <div className="signUpText">Sign Up</div>
          <TextInput
            placeholder="Email"
            label="Email"
            size="xl"
            value={email}
            withAsterisk
            onChange={(event) => setEmail(event.currentTarget.value)}
          />
          <TextInput
            placeholder="Username"
            label="Username"
            size="xl"
            value={username}
            withAsterisk
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
          <PasswordInput
            placeholder="Password"
            label="Password"
            size="xl"
            value={password}
            withAsterisk
            onChange={(event) => setPassword(event.currentTarget.value)}
          />
          <PasswordInput
            placeholder="Confirm Password"
            label="Confirm Password"
            size="xl"
            value={confirmPassword}
            withAsterisk
            onChange={(event) => setConfirmPassword(event.currentTarget.value)}
          />
          <Button color="gray" radius="xl" size="xl" onClick={handleSignUp}>
            Sign Up
          </Button>
          <div className="signUpLogin">
            Already have an account? <Link to="/login">Log In</Link>.
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
