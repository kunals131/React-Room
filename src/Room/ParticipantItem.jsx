import React, { useEffect, useRef, useCallback, useState } from "react";
import "./ParticipantItem.scss";
import { connect } from "react-redux";
import { conference } from "@voxeet/voxeet-web-sdk";

const ParticipantItem = ({ participant, isSelf, controls }) => {
  const ref = useRef();
  const { id, stream, isVideo } = participant;
  const videoRef = useRef();
  const [speakingState, setSpeakingState] = useState(false);
  useEffect(() => {
    const timer = setInterval(() => {
      conference.isSpeaking(participant.participant, (isSpeaking) => {
        if (isSpeaking) {
          setSpeakingState(true);
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
    navigator.attachMediaStream(videoRef.current, stream);
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
        speakingState ? "5px solid lightgreen" : "none"
      }}`}</style>
      
      <div className={`participantItem ${participant.id}`} ref={ref}>
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
