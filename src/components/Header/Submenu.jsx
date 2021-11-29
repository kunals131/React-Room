import React from "react";
import { Link } from "react-router-dom";
import { logoutUser } from "../../firebase/firebase.utils";


const handleLogout = ()=>{
  logoutUser();
}
const Submenu = ({isSignedin}) => {
  return (
    <div>
      <div class="ui vertical menu">
        <Link  class="item" to="/">
          Home
        </Link>
        {
          isSignedin?(
        <>
        <div  class="item" onClick={handleLogout}>
          Logout
        </div>
        </>
          ):(
            <Link  to="/authentication" class="item" >
            Authenticate
          </Link>
          )
}
  
      </div>
      
    </div>
  );
};

export default Submenu;
