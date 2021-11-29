import React, { useState } from 'react'
import ConfigurationModal from './ConfigurationModal';
import RoomView from './RoomView';




const Room = ({authStatus}) => {
    const [temporaryAuth, setTemporaryAuth] = useState(authStatus)
    const [inputName, setInputName] = useState('')

    return (
        <>
        {
            temporaryAuth?<RoomView inputName={inputName}/>:<ConfigurationModal setAuth={setTemporaryAuth} inputName={inputName} setInputName={setInputName}/>
        }
        </>
    )
}

export default Room
