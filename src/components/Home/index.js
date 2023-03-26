import "./index.scss";
import LogoTitle from "../../assets/images/logo-outlet1.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="heading">
        <h1>Welcome to</h1>
        <img src={LogoTitle} height={500} width={800}></img>
      </div>
      <div className="registration">
        <input
          type="button"
          className="loginButton"
          value={"Login"}
          onClick={() => navigate("/Login")}
        ></input>
        <input
          type="button"
          className="signButton"
          value={"Sign Up"}
          onClick={() => navigate("/SignUp")}
        ></input>
      </div>
    </>
  );
};

export default Home;
