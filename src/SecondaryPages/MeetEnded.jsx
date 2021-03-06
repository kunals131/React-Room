import React, { useEffect } from 'react'
import {Button} from '@mui/material'
import { connect } from 'react-redux'
import {Link, useParams} from 'react-router-dom'
import './MeetEnded.scss'
import { leaveConference } from '../Room/Voxeet/VoxeetUtils'
import { setActivity } from '../actions'
import recognition from '../Room/Speech'



const MeetEnded = () => {
    const params = useParams();
    const roomPrev = params.roomid
    useEffect(()=>{
        leaveConference();
        console.log(params.roomid)
        console.log('Meet Ended')
        setActivity(false);
        recognition.stop();
        recognition.onend = () => {
            console.log('STOPED!!')
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    return (
        <div className='meet-ended-container'>
            <div className="content-meetend">
            <h1>You Left The Room!!</h1>
            <p>Thankyou for joining.</p>
            <div className="button">
            <Button variant="outlined" style={{borderColor : 'darkgrey',width : '120px', marginTop : '1rem', fontSize : '1.3rem'}} ><Link style={{color : 'black'}} to="/">Home</Link></Button>
            <div className="button-2">
            <Button variant="outlined" style={{borderColor : 'darkgrey',width : '500px', marginTop : '1rem', fontSize : '1.3rem'}} ><Link style={{color : 'black'}} to={`/room/${roomPrev}`}>Join Previous Room Again!</Link></Button>
            </div>
                
            </div>
            </div>
            
        </div>
    )
}

export default connect(null, {
    setActivity
})(MeetEnded)
