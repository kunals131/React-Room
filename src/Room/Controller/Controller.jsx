import React, { useState } from "react";

import { connect } from "react-redux";
import "./Controller.scss";
import { setMic, setVideo } from "../../actions";
import {
  startVideo,
  stopVideo,
  startAudio,
  stopAudio,
  leaveConference,
} from "../Voxeet/VoxeetUtils";


const Controller = ({
  controls,
  changeBackground,
  setVideo,
  setMic,
  setConference,
  participants,
  showSidebar
}) => {
  const [Link, setLink] = useState(false);

  const handleSidebar = ()=>{
    showSidebar((prev)=>{
      return !prev;
    })
  }

  const controlVideo = async (state) => {
    setVideo(state);
    if (state === false) {
      const res = await stopVideo();
      console.log(res);
    } else {
      const res = await startVideo();
      console.log(res);
    }
  };

  const controlMic = async (state) => {
    setMic(state);
    if (state === false) {
      const res = await stopAudio();
      console.log(res);
    } else {
      const res = await startAudio();
      console.log(res);
    }
  };

  const copyLink = ()=>{
    let url = window.location.origin;
    url+=`/?name=Guest&meetid=${234}`;
    navigator.clipboard.writeText(url);
    setLink(true);
    setTimeout(()=>setLink(false),2000);

  }

  return (
    <div className="controller">
      <div className="controller-container">
        <div className="controller__left">
          <div className="controller__left-item" onClick={copyLink}>
            <i className="copy icon"></i> {Link?'Copied!':'Invite Link'}
          </div>
        </div>
        <div className="controller__center">
          <div
            className="controller__center-item"
            onClick={() => controlVideo(!controls.video)}
          >
            <i
              className={controls.video ? "fas fa-video" : "fas fa-video-slash"}
            ></i>
          </div>
          <div
            className="controller__center-item"
            onClick={() => controlMic(!controls.mic)}
          >
            <i
              className={
                controls.mic ? "fas fa-microphone" : "fas fa-microphone-slash"
              }
            ></i>
          </div>

          <div className="controller__center-item">
            <i
              className={
                controls.screenShare
                  ? "fas fa-window-maximize"
                  : "fas fa-window-close"
              }
            ></i>
          </div>
  
        </div>
        <div className="controller__right">
          <div
            className="controller__center-item controlbtn" onClick={handleSidebar}
          >
            <i className="fab fa-ethereum"></i>
          </div>
          
        </div>
      </div>
      
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    controls: state.controls,
  };
};

export default connect(mapStateToProps, {
  setVideo,
  setMic,

})(Controller);
