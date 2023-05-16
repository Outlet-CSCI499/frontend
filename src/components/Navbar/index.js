import { Link, NavLink } from "react-router-dom";
import "./index.scss";
import logo from "../../assets/images/logo.png";
import { Menu, Button, Text } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faNewspaper,
  faUser,
  faArrowRightFromBracket,
  faFeatherPointed,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
const Navbar = () => {
  const { currentUser, Logout } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser);

  useEffect(() => {
    setIsLoggedIn(currentUser);
  }, [currentUser]);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>

      <div className="navLinks">
        {isLoggedIn && (
          <>
            <NavLink exact="true" activeclassname="active" to="/">
              <FontAwesomeIcon icon={faHome} size="2xl" />
              Home
            </NavLink>
            <NavLink exact="true" activeclassname="active" to="/posts">
              <FontAwesomeIcon icon={faFeatherPointed} size="2xl" />
              Posts
            </NavLink>
            <NavLink exact="true" activeclassname="active" to="/news">
              <FontAwesomeIcon icon={faNewspaper} size="2xl" />
              News
            </NavLink>
          </>
        )}
      </div>

      <div>
        {!isLoggedIn ? (
          <>
            <Link to="/posts">
              <Button color="blue" radius="xl" size="xl">
                Posts
              </Button>
            </Link>
            <Link to="/login">
              <Button color="gray" radius="xl" size="xl">
                Log In
              </Button>
            </Link>
          </>
        ) : (
          <Menu shadow="md" width={150}>
            <Menu.Target>
              <div className="userProfile">
                <FontAwesomeIcon icon={faUser} size="2xl" />
              </div>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                color="red"
                icon={
                  <FontAwesomeIcon icon={faArrowRightFromBracket} size="xl" />
                }
                onClick={Logout}
              >
                <div className="logout">Logout</div>
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        )}
      </div>
    </div>
  );
};

export default Navbar;
