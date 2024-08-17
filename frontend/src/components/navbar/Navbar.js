import React, { useContext } from 'react';
import "./Navbar.css";
import { assets } from '../../assets/assets';
import {Link, useLocation, useNavigate} from "react-router-dom";
import { StoreContext } from '../../context/Storecontext';
import {HashLink} from "react-router-hash-link";
import { NavLink } from 'react-router-dom';


function Navbar({setShowLogin}) {

  const {getCartTotalAmount, token, setToken} = useContext(StoreContext);
  const navigate = useNavigate();
  const location = useLocation();

  const logout = ()=>{
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <div className='navbar'>
      <Link to="/"><img src={assets.logo} alt="logo" className='logo'/></Link>
      <ul className="navbar-menu">
        <HashLink smooth className={location.hash === "" && location.pathname === "/"? "active":"" } to="/">home</HashLink>
        <HashLink smooth className={location.hash === "#explore-menu" ? "active" : ""} to='/#explore-menu'>menu</HashLink>
        <HashLink smooth className={location.hash === "#app-download" ? "active" : ""} to='/#app-download'>mobile-app</HashLink>
        <HashLink smooth className={location.hash === "#footer" ? "active" : ""} to='/#footer'>contact us</HashLink>
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="search icon" />
        <div className="navbar-search-icon">
            <NavLink to="/cart"><img src={assets.basket_icon} alt="basket icon" /></NavLink>
            <div className={getCartTotalAmount()===0 ? "" : "dot"}></div>
        </div>
        {!token ? 
          <button onClick={()=>setShowLogin(true)}>
          sign in
          </button> : 
          <div className="navbar-profile">
            <img src={assets.profile_icon} alt="profile icon" />
            <ul className='nav-profile-dropdown'>
              <li>
                <Link to="/myorders">
                <img src={assets.bag_icon} alt="bag icon" />
                <p>Orders</p>
                </Link>
              </li>
              <hr />
              <li onClick={logout}>
                <img src={assets.logout_icon} alt="logout icon" />
                <p>Logout</p>
              </li>
            </ul>
          </div>
          }
      </div>
    </div>
  )
}

export default Navbar
