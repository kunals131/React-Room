import React from "react";
import "./ParticipantGrid.scss";
import ParticipantItem from "../ParticipantItem";
const ParticipantGrid = (props) => {
  
  const len = props.participantList.length;
  return (
    <>
    <style>
      {
        `.pg__container-items{
          display : grid;
          grid-template-columns : repeat(${len>4?4:len}, ${len>4?len:0.2}fr);
          ${len>4?'grid-gap:25px':''}
        }`
      }
      </style>
    <div className="pg">
      <div className="pg__container">
        <div className="pg__container-items">
          {props.participantList.map((participant)=>{
            return <ParticipantItem participant={participant}/>
          })}
    
        </div>
      </div>
    </div>
    </>
  );
};

export default ParticipantGrid;
