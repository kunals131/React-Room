import React, { useState } from "react";
import "./Header.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


const Header = (props) => {
  const [logout, setLogout] = useState(false);

  if (logout)
    return (
      <Redirect
        to={{
          pathname: `/room/${props.id}/ended`,
          state: { id: "123" },
        }}
      />
    );
  return (
    <header className="next__header">
      <div className="next__header__content">
        <div className="next__header__content__user">
          <p className={`next__header__content__user-name`}>
            <i className="user icon"></i>{" "}
            {props.authStatus.isSignedin?props.authStatus.user.name:props.name}
          </p>
        </div>
        <div
          className="next__header__content__leave"
          onClick={() => setLogout(true)}
        >
          <i className="sign out alternate icon" />
          Leave Class
        </div>
      </div>
    </header>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    authStatus : state.authStatus,

  };
};

export default connect(mapStateToProps)(Header);
