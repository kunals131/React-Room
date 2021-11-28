import React, {useRef} from "react";
import "./ParticipantGrid.scss";
import ParticipantItem from "../ParticipantItem";
const ParticipantGrid = (props) => {
  const screenShareRef = useRef();
  const len = props.participantList.length;
  return (
    <>
      <style>
        {`.pg__container-items{
          display : grid;
          grid-template-columns : repeat(${len > 4 ? 4 : len}, ${
          len > 4 ? len : 0.2
        }fr);
          ${len > 4 ? "grid-gap:25px" : ""}
        }`}
      </style>

      <div className="pg">
        <div className="pg__container">
          {!(props.isScreenShare || props.isPresenting) ? (
            <div className="pg__container-items">
              {props.participantList.map((participant) => {
                return (
                  <ParticipantItem
                    key={participant.id}
                    participant={participant}
                  />
                );
              })}
            </div>
          ) : (
            <div className="pg__container-2">
              <div className="pg__container-2-screenshare">
                {
                  <video
                    id="video-object"
                    className="participant-grid-item__video"
                    ref={screenShareRef}     
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                    }}
                    playsInline
                    autoPlay
                    muted
                  />
                }
              </div>
              <div className="pg__container-2-participants">
              {props.participantList.map((participant) => {
                return (
                  <ParticipantItem
                    key={participant.id}
                    isScreenShare={props.isScreenShare}
                    screenShareRef = {screenShareRef}
                    participant={participant}
                  />
                );
              })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ParticipantGrid;
