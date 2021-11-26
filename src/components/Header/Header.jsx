import React, { useState, useEffect } from "react";
import "./Header.scss";
import Logo from "../../assets/Logo.svg";
import UserIcon from "../../assets/usericon.svg";
import Submenu from "./Submenu";
import { connect } from "react-redux";

const Header = (props) => {
  const [showMenu, setShowMenu] = useState(false);


  const style = {
    backgroundColor: props.backgroundColor,
    // boxShadow: "1px 1px 30px 10px rgba(0,0,0,0.1)",
  };

  return (
    <header className="header" style={style}>
      <div className="header__content">
        <img src={Logo} alt="" className="header__content__logo" />
        <div className="header__content__user" onClick={()=>setShowMenu(!showMenu)}>
          <img src={UserIcon} alt="" className="header__content__user-icon" />
          <p className={`header__content__user-name${showMenu&&' activez'}`}>{props.name}</p>
        </div>
      </div>

      {showMenu && (
        <div className="submenu">
          <Submenu isSignedin={props.isSignedin} setShowMenu={setShowMenu}></Submenu>
        </div>
      )}
    </header>
  );
};

const mapStateToProps = (state)=>{
  return {
    name : state.authStatus.isSignedin?state.authStatus.user.name:'Guest',
    isSignedin : state.authStatus.isSignedin
  }
}
export default connect(mapStateToProps)(Header);
