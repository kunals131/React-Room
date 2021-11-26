export default  (state='Teacher' , action)=>{
    switch(action.type) {
        case 'SET_ROLE' : return {
            state : action.payload
        }
        default :
        return state;
    }

};