import React from "react";
import './VoiceCommand.scss'
const VoiceCommandHelper = () => {
  return (
    <div className="helper">
      <div className="helper-container">
        <div className="helper-list">
          <div className="helper-list-item">1. Mute Mic : Stop my mic.</div>
          <div className="helper-list-item">2. Unmute Mic : Start my mic.</div>
          <div className="helper-list-item">
            3. To start Camera : Start my video.
          </div>
          <div className="helper-list-item">
            4. To stop Camera : Stop my video.
          </div>
          <div className="helper-list-item">
            5. To start Screenshare : Share my screen.
          </div>
          <div className="helper-list-item">
            6. To stop ScreenShare : Stop sharing my screen.
          </div>
          <div className="helper-list-item">
            7. Stop Voice Recognition : Goodbye.
          </div>
        </div>
        <div className="end-text-helper">This Helper window will close automatically in 15s</div>
      </div>
    </div>
  );
};

export default VoiceCommandHelper;
