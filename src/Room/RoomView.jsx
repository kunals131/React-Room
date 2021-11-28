import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import Header from "./Header";
import {
  setActivity,
  setLoadingState,
  setConference,
  setPopupMessage,
  setIsPresenting,
} from "../actions";
import ParticipantGrid from "./ParticipantGrid/ParticipantGrid";
import Controller from "./Controller/Controller";
import "./RoomView.scss";
import Loader from "../components/Loader/Loader";
import Sidebar from "./Sidebar/Sidebar";
import { conference, session, notification } from "@voxeet/voxeet-web-sdk";
import SmartPopup from "./SmartPopup/SmartPopup";
import ConfigurationModal from "./ConfigurationModal";

import {
  createConference,
  createSession,
  joinConference,
  leaveConference,
} from "./Voxeet/VoxeetUtils";

const RoomView = ({
  setActivity,
  user,
  isSignin,
  setConference,
  controls,
  setIsPresenting,
  setPopupMessage,
  tempUser,
  popupMessage, ...props
}) => {
  const [sidebar, setSidebar] = useState(false);
  const [loader, setLoader] = useState(true);
  const [participantList, setParticipantList] = useState([]);
  const [participantNameList, setParticipantNameList] = useState([]);
  const [Host, setHost] = useState({});
  const [conferenceId, setConferenceId] = useState("");
  const [background, setBackground] = useState("black");

  const bgStyle = {
    background:
      background === "black"
        ? "black"
        : `url(https://source.unsplash.com/1920x1080/?${background}) center center/cover`,
  };

  const params = new useParams();
  useEffect(() => {
    setActivity(true);
  }, []);

  useEffect(() => {
    const handleCreation = async () => {
      const Sname = isSignin?user.name:props.inputName;
      const Sid = isSignin?user.id:Math.floor(Math.random()*32323);
      await createSession(Sname, Sid);
      console.log("Created session with id " + Sname);
      const conf = await createConference(params.roomid);
      console.log(conf);
      console.log("Conference Created!");
      setConference(params.roomid);
      const joinConf ={audio : true, dolbyVoice : true}
      setConferenceId(params.roomid);
      const join = await joinConference(conf, joinConf);
      console.log("Joined Conference!");
      
      setLoader(false);
    };
    handleCreation();
    
  }, []);

  const fetchAndSetNames = async () => {
    const conf = await conference.fetch(conferenceId);
    let namelist = [];
    conf.participants.forEach((participant) => {
      namelist.push(participant.info.name);
    });
    setParticipantNameList(namelist);
  };

  const StreamUpdatedFunction = (participant, stream) => {
    console.log("STREAM UPDATED");
    fetchAndSetNames();
    if (stream.type === "ScreenShare") {
      setIsPresenting(true);
    }
    // if (stream.type === "screen-share") return;
    const index = participantList.findIndex((ele) => {
      return ele.id === participant.id;
    });
    if (index === -1) {
      let nameToAdd = "";
      if (session.participant.id === participant.id) {
        nameToAdd = `${participant.info.name} (You)`;
      } else {
        nameToAdd = participant.info.name;
      }
      const newParticipantDetails = {
        name: nameToAdd,
        id: participant.id,
        participant: participant,
        stream: stream,
        isVideo: stream.getVideoTracks().length > 0,
        isAudio: participant.audio,
        isInactive: false,
      };
      const newList = [...participantList, newParticipantDetails];
      setParticipantList(newList);
    } else {
      let participantFromList = participantList[index];
      const updatedDetails = {
        ...participantFromList,
        stream: stream,
        isVideo: stream.getVideoTracks().length > 0,
        isAudio: true,
      };
      const newList = [...participantList];
      newList[index] = updatedDetails;
      setParticipantList(newList);
    }
  };

  const streamRemovedFunction = (participant, stream) => {
    if (participant.status === "Left") return;
    console.log(stream);
    if (stream && stream.type === "ScreenShare") {
      setIsPresenting(false);
    }

    const index = participantList.findIndex((ele) => {
      return ele.id === participant.id;
    });
    const newDetails = {
      name: participant.info.name,
      id: participant.id,
      participant: participant,
      stream: stream,
      isVideo: false,
      isAudio: participant.audio,
      isInactive: true,
    };
    const newList = [...participantList];
    newList[index] = newDetails;
    setParticipantList(newList);
  };

  const participantUpdatedFunction = (participant, stream) => {
    if (participant.status === "Left") {
      for (let st of participant.streams) {
        if (st.type === "ScreenShare") {
          setIsPresenting(false);
        }
      }

      const newParticipantList = [...participantList].filter((el) => {
        return el.id !== participant.id;
      });
      setParticipantList(newParticipantList);
      setPopupMessage(`${participant.info.name} Left!`);
    }

    // const newParticipantList = [...participantList].filter((el) => {
    //   return el.id !== participant.id;
    // });
    // setParticipantList(newParticipantList);
  };

  useEffect(() => {
    console.log("Called!");
    conference.on("streamAdded", StreamUpdatedFunction);
    conference.on("streamUpdated", StreamUpdatedFunction);
    conference.on("streamRemoved", streamRemovedFunction);
    conference.on("participantUpdated", participantUpdatedFunction);
    conference.on("left", () => console.log("conference left"));
    notification.on("participantLeft", () => {
      console.log("left");
    });

    return () => {
      conference.off("streamAdded", StreamUpdatedFunction);
      conference.off("streamUpdated", StreamUpdatedFunction);
      conference.off("streamRemoved", streamRemovedFunction);
      conference.off("participantUpdated", participantUpdatedFunction);
    };
  }, [participantList]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log(conference.participants);
    const timer = setInterval(() => {
      participantList.map((participant) => {
        conference.isSpeaking(participant.participant, (isSpeaking) => {
          if (isSpeaking) {
            const newList = participantList.filter(
              (par) => par.id !== participant.id
            );
            let listToBeAdded = [participant, ...newList];
            setParticipantList(listToBeAdded);
          }
        });
      });
    }, 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (popupMessage !== "") {
      setTimeout(() => {
        setPopupMessage("");
      }, 2000);
    }
  }, [popupMessage]);

  return (
    <>
      {loader ? (
        <Loader text="Setting up Conference!" />
      ) : (
        <div className="roomview-container" style={bgStyle}>
          <Header name={props.inputName} id={conferenceId}></Header>
          <ParticipantGrid
            isPresenting={controls.isPresenting}
            isScreenShare={controls.screenShare}
            participantList={participantList}
          />
          <Controller conf={conferenceId} showSidebar={setSidebar}></Controller>
          {sidebar && (
            <Sidebar
              setBackground={setBackground}
              participantList={participantNameList}
            />
          )}
          {popupMessage && (
            <div className="smartpopup">
              <SmartPopup text={popupMessage} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    controls: state.controls,
    isActive: state.isActive,
    user: state.authStatus.user,
    tempUser : state.tempUser,
    isSignin: state.authStatus.isSignin,
    popupMessage: state.popupMessage,
  };
};

export default connect(mapStateToProps, {
  setActivity,
  setConference,
  setPopupMessage,
  setIsPresenting,
})(RoomView);
