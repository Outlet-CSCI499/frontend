import "./index.scss";
import LogoTitle from "../../assets/images/logo-outlet1.png";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="heading">
        <h1>Welcome to</h1>
        <img src={LogoTitle} alt="Outlet"></img>
      </div>
      <div className="registration">
        <input
          type="button"
          className="navButton"
          value={"Login"}
          onClick={() => navigate("/Login")}
        ></input>
        <input
          type="button"
          className="navButton"
          value={"Sign Up"}
          onClick={() => navigate("/SignUp")}
        ></input>
        <input
          type="button"
          className="navButton"
          value={"News"}
          onClick={() => navigate("/NewsPage")}
        ></input>
        <input
          type="button"
          className="navButton"
          value={"Posts"}
          onClick={() => navigate("/posts")}
        ></input>
      </div>
    </>
  );
};

export default Home;
