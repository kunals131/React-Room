import React, { useEffect, useState } from "react";
import Home from "./Pages/Home/Home";
import Header from "./components/Header/Header";
import { connect } from "react-redux";
import Loader from "./components/Loader/Loader";

import AuthView from "./Pages/AuthView/AuthView";
import StorageView from "./Pages/StorageView/StorageView";
import { Switch, Route, Redirect } from "react-router-dom";
import { auth, database, getUserWithId } from "./firebase/firebase.utils";
import { signinUser, signoutUser, setLoadingState } from "./actions";
import PrivateRoute from './PrivateRoute'
import RoomView from "./Room/RoomView";
import MeetEnded from "./SecondaryPages/MeetEnded";

import { onAuthStateChanged } from "@firebase/auth";
import { doc, getDoc } from "@firebase/firestore";
const App = ({
  signinUser,
  signoutUser,
  authStatus,
  isActive,
}) => {

  const [loading, setLoading] = useState(true);
  useEffect(() => setLoading(true), [])
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      getUserWithId(uid).then((res) => {
        signinUser(res);
        setLoading(false)
        console.log("status updated to signedin ");

      });

    } else {
      signoutUser();
      setLoading(false)


      console.log("status updated to signedout ");
    }
  });
  if (loading) return <Loader text="Checking authentication" />


  return (
    <>
      {!isActive && <Header />}
      {
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/authentication" exact>
            <AuthView />
          </Route>
          <Route path="/Storage" exact>
            {authStatus ? <StorageView /> : <Redirect to="/authentication" />}
          </Route>
          <Route path="/:roomid" exact>
            {/* {authStatus?<RoomView/>:<Redirect to="/authentication"/>} */}
            <RoomView />
          </Route>
          <Route path="/:roomid/ended" exact><MeetEnded /></Route>
        </Switch>
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isActive: state.isActive,
    authStatus: state.authStatus.isSignedin,

  };
};

export default connect(mapStateToProps, {
  signinUser,
  signoutUser,

})(App);
