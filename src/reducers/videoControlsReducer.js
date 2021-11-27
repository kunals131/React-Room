const initialState = {
    mic : true,
    video : false,
    screenShare : false,
    conference : 'null',
    voiceRecog : false

}

export default (state = initialState, action)=>{
    switch(action.type) {
        case 'SET_MIC_STATE' : return {
            ...state, mic : action.payload
        } 
        case 'SET_VIDEO_STATE' : return {
            ...state, video : action.payload
        }
        case 'SET_SCREEN_SHARE_STATE' : return {
            ...state, screenShare : action.payload
        }
        case 'SET_CONFERENCE' : return {
            ...state, conference : action.payload
        }
        case 'SET_VOICE_RECOG' : return {
            ...state, voiceRecog : action.payload
        }
        default : 
        return state;
    }
}