import React from "react";
import './VoiceCommand.scss'
const VoiceCommandHelper = () => {
  return (
    <div className="helper">
      <div className="helper-container">
          <h3 className="helper__heading">Voice Commands</h3>
        <div className="helper-list">
          <div className="helper-list-item">1.{' '}  <span className='command-helper'>Mute me</span> : Mute Mic</div>
          <div className="helper-list-item">2. {' '}  <span className='command-helper'>Turn on my mic</span> : Unmute Mic</div>
          <div className="helper-list-item">
            3. {' '}  <span className='command-helper'>Start my video</span> : To start Camera
          </div>
          <div className="helper-list-item">
            4.{' '} <span className='command-helper'>Stop my video.</span> : To stop Camera   
          </div>
          <div className="helper-list-item">
            5.{' '}   <span className='command-helper'>Share my screen.</span> : To start Screenshare 
          </div>
          <div className="helper-list-item">
            6. {' '} <span className='command-helper'>Stop sharing my screen.</span> : To stop ScreenShare 
          </div>
          <div className="helper-list-item">
            7. {' '}  <span className='command-helper'>Help me</span> : Shows valid voice commands 
          </div>
          <div className="helper-list-item">
            8. {' '}  <span className='command-helper'>Goodbye.</span> : Stop Voice Recognition 
          </div>
          </div>
        <div className="end-text-helper">This Helper window will close automatically in 15s</div>

        </div>
      </div>
  
  );
};

export default VoiceCommandHelper;
