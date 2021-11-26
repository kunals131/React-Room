export default (state=false, action) =>{
    switch (action.type) {
        case 'SET_ACTIVITY':
            return action.payload
            break;
    
        default: return state
            break;
    }
}