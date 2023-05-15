import React from "react";
import { useContext, useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
  const [currentUser, setCurrentUser] = useState(cookies.auth);
  const navigate = useNavigate();

  const SignUp = async (email, password, username, firstName) => {
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
  };

  const Login = async (email, password) => {
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
      setCurrentUser(login); // set Current user
      setCookie("auth", login);
      console.log(currentUser);
      navigate("/NewsPage");
    } else {
      console.log("failed");
    }
  };

  const Logout = () => {
    removeCookie("auth");
    setCurrentUser(null);
    console.log(cookies.auth);
    navigate("/");
  };

  const value = {
    currentUser,
    SignUp,
    Login,
    Logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
