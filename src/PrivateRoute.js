import React from 'react'

import {connect} from 'react-redux'
import { Redirect, Route } from 'react-router-dom'

const PrivateRoute = ({ component: Component, authStatus, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = authStatus.isSignedin;
  console.log(isLoggedIn)

  // if (!isLoggedIn) alert('Please Login/Signup to continue!');

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/authenticate', state: { from: props.location } }} />
        )
      }
    />
  )
}

const mapStateToProps = (state)=>{
  return {
    authStatus : state.authStatus,
  }
}

export default connect(mapStateToProps)(PrivateRoute)