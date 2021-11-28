export const tempAuth = (name)=>{
    return {
        type : 'SET_TEMP_AUTH',
        payload : name
    }
}



export const setMic = (micState)=>{
    return {
        type : 'SET_MIC_STATE',
        payload : micState
    }
}

export const setVideo = (videoState)=>{
    return {
        type : 'SET_VIDEO_STATE',
        payload : videoState
    }
}

export const setScreenShare = (screenState)=>{
    return {
        type : 'SET_SCREEN_SHARE_STATE',
        payload : screenState
    }
}

export const signinUser = (user)=>{
    return {
        type : 'SIGNIN_USER',
        payload : user,
    }
}

export const signoutUser = ()=>{
    return {
        type : 'SIGNOUT_USER'
    }
}

export const setActivity = (activity)=>{
    return {
        type : 'SET_ACTIVITY',
        payload : activity
    }
}


export const setConference = (conference)=>{
    return {
        type : 'SET_CONFERENCE',
        payload : conference
    }
}

export const setPopupMessage = (message)=>{
    return {
        type : 'SET_MESSAGE',
        payload : message
    }
}

export const setVoiceRecog = (state)=>{
    return {
        type : 'SET_VOICE_RECOG',
        payload : state
    }
}

export const setIsPresenting = (state)=>{
    return {
        type : 'SET_IS_PRESENTING',
        payload : state
    }
}

export const setDolbyVoice = (state)=>{
    return {
        type : 'SET_DOLBY_VOICE',
        payload : state,
    }
}
export const setSpatialAudio = (state)=>{
    return {
        type : 'SET_SPATIAL_AUDIO',
        payload : state,
    }
}