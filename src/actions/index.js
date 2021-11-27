export const setUser = (name)=>{
    return {
        type : 'SET_USER',
        payload : name
    };
}



export const setRole = (role)=>{
    return {
        type : 'SET_ROLE',
        payload : role,
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