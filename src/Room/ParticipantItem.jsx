import React, { useEffect, useRef, useCallback, useState } from "react";
import "./ParticipantItem.scss";
import { connect } from "react-redux";
import recognition from "./Speech";
import { conference } from "@voxeet/voxeet-web-sdk";

const ParticipantItem = ({ participant, isSelf, controls,...props }) => {
  const ref = useRef();
  const { id, stream, isVideo } = participant;
  const videoRef = useRef();
  const [isCamera, setIsCamera] = useState(false);
  const [speakingState, setSpeakingState] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      conference.isSpeaking(participant.participant, (isSpeaking) => {
        if (isSpeaking) {
          if (!speakingState){
          setSpeakingState(true);
          }
      
          // console.log('Eee')
        } else {
          setSpeakingState(false);
        }
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);
  const setupVideo = useCallback(({ stream }) => {
    if (stream.type==='ScreenShare' && (controls.screenShare || controls.isPresenting)) {
      navigator.attachMediaStream(props.screenShareRef.current, stream);
      return;
    }
    navigator.attachMediaStream(videoRef.current, stream);
    setIsCamera(true);
  }, []);

  // watcher for stream
  useEffect(() => {
    if (isVideo) {
      setupVideo({ stream });
    }
  }, [isVideo, stream, ref, id, setupVideo]);

  return (
    <>
      <style>{`.${participant.id}{border : ${
        speakingState ? "4px solid lightgreen" : "none"
      }}`}</style>
      
      <div ref={ref} className={`participantItem ${participant.id} ${(controls.screenShare || controls.isPresenting)?'screenshared':''}`} ref={ref}>
        {isVideo ? (
          <video
            id="video-object"
            className="participant-grid-item__video"
            ref={videoRef}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            playsInline
            autoPlay
            muted
          />
        ) : (
          <i className="fas fa-video-slash" />
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return { controls: state.controls };
};

export default connect(mapStateToProps)(ParticipantItem);
