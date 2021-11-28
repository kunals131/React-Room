import React, { useState, useEffect } from "react";
import "./Header.scss";
import Logo from "../../assets/Logo.svg";
import UserIcon from "../../assets/usericon.svg";
import Submenu from "./Submenu";
import { connect } from "react-redux";

const Header = (props) => {
  const [showMenu, setShowMenu] = useState(false);




  return (
    <header className="header" >
      <div className="header__content" style={{color : 'white'}}>
        React Room
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
