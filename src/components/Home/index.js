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
    </>
  );
};

export default Home;
