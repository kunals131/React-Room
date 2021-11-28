export default (state={user : null, id:null}, action)=>{
    switch(action.type) {
        case 'SET_TEMP_AUTH' : return {
            user : action.payload,
            id : Math.floor(Math.random()*123232)
        }
        default : return state;
    }
}