import "./index.scss";
import LogoTitle from "../../assets/images/logo-outlet1.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="heading">
        <h1>Welcome to</h1>
        <img src={LogoTitle}></img>
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
        <input
          type="button"
          className="newsButton"
          value={"News"}
          onClick={() => navigate("/NewsPage")}
        ></input>
      </div>
    </>
  );
};

export default Home;
