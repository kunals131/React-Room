import React, { useState } from "react";
import "./Header.scss";

import Submenu from "./Submenu";
import { connect } from "react-redux";

const Header = (props) => {
  const [showMenu, setShowMenu] = useState(false);




  return (
    <header className="header" >
      <div className="header__content" style={{color : 'white'}}>
        <a href="/" style={{fontSize : '1.2rem'}}>
        <span style={{fontWeight : 'bold'}}>React</span> Room
        </a >
        <div className="header__content__user" onClick={()=>setShowMenu(!showMenu)}>
         
          <p className={`header__content__user-name${showMenu&&' activez'}`}><i className="user icon"></i>{' '}{props.name}</p>
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
