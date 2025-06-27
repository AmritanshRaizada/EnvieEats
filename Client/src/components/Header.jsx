import { logo } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = ({ darkMode, toggleDarkMode }) => {
  const [btnName, setbtnName] = useState("Login");

  return (
    <div className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="nav-items">
        <ul>
        <Link to="/"><li>Home</li></Link>
          <Link to="/about"><li>About Us</li></Link>
          <Link to="/contact"><li>Contact Us</li></Link>
          <Link to="/Grocery"><li>Grocery</li></Link>
          <li>Cart</li>
          <button onClick={toggleDarkMode} className="toggle-btn">
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button
            className="toggle-btn"
            onClick={() => {
              setbtnName(btnName === "Login" ? "Logout" : "Login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;

//two types of export default and named export
// export default Header; //default export
//import Header from "./Header"; //default import

// export {Header}; //named export
//import {Header} from "./Header"; //named import
