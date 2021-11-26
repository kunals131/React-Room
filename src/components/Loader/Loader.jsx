import React from "react";
import './Loader.scss'
import Loader from 'react-loader-spinner'

const LoadinScreen = (props) => {
  return (
    <div className="container">
      <div className="loader__content">
      <Loader type="Puff" color="white" height={100} width={100} />
      <h4 className="loading__text">{props.text}</h4>
      </div>
    </div>
  );
};

export default LoadinScreen;
