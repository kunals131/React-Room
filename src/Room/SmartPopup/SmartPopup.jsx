import React from 'react'
import './SmartPop.scss'

const SmartPopup = (props) => {
    return (
        <div className="popup">
            <div className="popup__content">
            <div className="popup__content__heading">Dolby Room</div>
            <p className="popup__content__sub">{props.text}</p>
            </div>
        </div>
    )
}

export default SmartPopup
