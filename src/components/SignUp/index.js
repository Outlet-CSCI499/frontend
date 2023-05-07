import "./index.scss";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { PasswordInput, TextInput, Checkbox, Button } from "@mantine/core";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
