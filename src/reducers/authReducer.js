const initalState = {
    isSignedin : false,
    user : {
        id : Math.random()*1203232
    }
}

export default (state=initalState,action) => {
    switch(action.type) {
        case 'SIGNIN_USER' : return {
            user : action.payload,
            isSignedin : true
        }
        case 'SIGNOUT_USER' : return {
            user : {
                id : Math.random()*1203232
            },
            isSignedin : false
        }
        default : return state
    }
    
}