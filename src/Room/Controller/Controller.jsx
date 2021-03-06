import React, { useEffect, useState } from "react";
import { commands, cleanUp } from "../SmartPopup/smartFunctions";

import { connect } from "react-redux";
import "./Controller.scss";
import {
  setMic,
  setVideo,
  setVoiceRecog,
  setPopupMessage,
  setScreenShare,
} from "../../actions";
import { motion } from "framer-motion";
import VoiceCommandHelper from "../SmartPopup/VoiceCommandHelper";

import {
  startVideo,
  stopVideo,
  startAudio,
  stopAudio,
  startScreenShare,
  stopScreenShare,
} from "../Voxeet/VoxeetUtils";
import recognition from "../Speech";

const helperVariant = {
  hidden: {
    x: -200,
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
  },
};

const Controller = ({
  controls,
  changeBackground,
  setVideo,
  setMic,
  setConference,
  participants,
  showSidebar,
  conf,
  popupMessage,
  user,
  setVoiceRecog,
  setPopupMessage,
  setScreenShare,
}) => {
  const [Link, setLink] = useState(false);
  const [recog, setRecog] = useState(false);
  const [showHelper, setShowHelper] = useState(false);

  const handleSidebar = () => {
    showSidebar((prev) => {
      return !prev;
    });
  };

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

  const controlScreenShare = async (state) => {
    if (state) {
      if (controls.isPresenting) {
        setPopupMessage("Presentation is already going on!");
        return;
      }
      setScreenShare(state);
      await startScreenShare();
      console.log("Screen share started!");
    } else {
      setScreenShare(state);
      await stopScreenShare();
      console.log("screenshare stopped!");
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

  const copyLink = () => {
    let url = window.location.origin;
    url += `/room/${conf}`;
    let text = `${user} has invited to join React Room : ${url}`;
    navigator.clipboard.writeText(text);
    setLink(true);
    setTimeout(() => setLink(false), 2000);
  };

  const handleTasks = async (task) => {
    switch (task) {
      case "TURN_ON_MIC": {
        await controlMic(true);
        setPopup("Mic Turned On");
        return true;
      }
      case "TURN_OFF_MIC": {
        await controlMic(false);
        setPopup("Mic Turned Off");
        return true;
      }
      case "TURN_OFF_VIDEO": {
        await controlVideo(false);
        setPopup("VIDEO TURNED OFF!");
        return true;
      }
      case "TURN_ON_VIDEO": {
        await controlVideo(true);
        setPopup("Video Turned On");
        return true;
      }
      case "STOP_VOICE_RECOG": {
        controlVoiceRecog(false);
        return true;
      }
      case "START_SCREEN_SHARE": {
        await controlScreenShare(true);
        return true;
      }
      case "STOP_SCREEN_SHARE": {
        await controls(false);
        return true;
      }
      case "HELPME" : {
        setShowHelper(true);
        return true;
      }

      default:
        return false;
    }
  };

  useEffect(()=>{
    setTimeout(()=>setShowHelper(false), 15000);
  }, [showHelper])

  const setPopup = (message) => {
    if (popupMessage) {
      setTimeout(() => {
        setPopupMessage(message);
      }, 1500);
    } else {
      setPopupMessage(message);
    }
  };

  const compareCommands = async (transcript) => {
    for (let c of commands) {
      for (let idx of c.match) {
        if (transcript.includes(idx)) {
          if (c.task) {
            const ans = await handleTasks(c.task);
            if (ans) return;
          }
        }
      }
    }
  };

  recognition.onresult = (e) => {
    let current = cleanUp(e.results[0][0].transcript);
    console.log("confiedence : " + e.results[0][0].confidence);
    setPopup(e.results[0][0].transcript);
    compareCommands(current);
  };

  const controlVoiceRecog = (state) => {
    setVoiceRecog(state);

    if (state) {
      setPopup("SAY 'HELP ME'");
      if (!recog) {
        recognition.start();
      }
      recognition.onend = () => {
        // setPopup('Still Listening...')
        recognition.start();
      };
      setRecog(true);
    } else {
      recognition.stop();
      recognition.onend = () => {
        setRecog(false);
      };
      setPopup("I hope to meet you soon! ");
    }
  };

  return (
    <div className="controller">
      <div className="controller-container">
        <div className="controller__left">
          <div className="controller__left-item" onClick={copyLink}>
            <i className="copy icon"></i> {Link ? "Copied!" : "Invite Link"}
          </div>
        </div>
        <div className="controller__center">
          <div
            title="Video Camera"
            className="controller__center-item"
            onClick={() => controlVideo(!controls.video)}
          >
            <i
              className={controls.video ? "fas fa-video" : "fas fa-video-slash"}
            ></i>
          </div>
          <div
            title="Microphone"
            className="controller__center-item"
            onClick={() => controlMic(!controls.mic)}
          >
            <i
              className={
                controls.mic ? "fas fa-microphone" : "fas fa-microphone-slash"
              }
            ></i>
          </div>

          <div
            title="Screen Share"
            className="controller__center-item"
            onClick={() => controlScreenShare(!controls.screenShare)}
          >
            <i
              className={
                controls.screenShare
                  ? "fas fa-window-maximize"
                  : "bi bi-arrow-up-square-fill"
              }
            ></i>
          </div>
        </div>
        <div className="controller__right">
          <div
            title="Menu"
            className="controller__center-item controlbtn"
            onClick={handleSidebar}
          >
            <i className="fab fa-ethereum"></i>
          </div>
          <div
            title="Voice Controls"
            className="controller__center-item controlbtn"
            onClick={() => controlVoiceRecog(!controls.voiceRecog)}
          >
            <i
              className={
                controls.voiceRecog ? "fab fa-teamspeak" : "bi bi-robot"
              }
            ></i>
          </div>
        </div>
      </div>
      {showHelper && (
        <motion.div
          variants={helperVariant}
          animate="visible"
          initial="hidden"
          className="voiceCommandHelper"
        >
          <VoiceCommandHelper />
        </motion.div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    controls: state.controls,
    user: "kunal",
    popupMessage: state.popupMessage,
  };
};

export default connect(mapStateToProps, {
  setVideo,
  setMic,
  setPopupMessage,
  setVoiceRecog,
  setScreenShare,
})(Controller);
