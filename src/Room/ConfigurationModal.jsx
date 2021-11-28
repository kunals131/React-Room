import React, {useState} from 'react'

import {Button, TextField} from '@mui/material';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { tempAuth } from '../actions';


import './ConfigurationModal.scss'

const buttonStyle = {
    background : 'black',
    color : 'white',
    marginTop : '1rem',
    '&:hover': {
        backgroundColor: 'rgba(0,0,0,0.8)',
        boxShadow: 'none',
      },
    width : '150px'
}

const checkboxStyle = {
    color: 'black',
   }

const ConfigurationModal = ({tempAuth, setAuth, ...props}) => {
    const [input, setInput] = useState('');
    const handleSubmit = ()=> {
        if (!props.inputName.length) {
            alert('Please Enter a valid Full Name!')
            return;
        }
        setAuth(true);

      
    }
    return (
        <div className="backdrop">
            <div className="modal">
                <div className="modal__heading">You are not Logged in!</div>
                <div className="modal__part-1">
               
                    <p>In hurry? Continue without Login</p>
                    <div className="modal__part-1-input">
                        <TextField value={props.inputName} onChange={(e)=>props.setInputName(e.target.value)} label="Full Name" fullWidth  variant="outlined"/>
                    </div>
                    <Button onClick={handleSubmit} variant="contained" style={buttonStyle}>Join</Button>
    
                <p className="foot-text-modal">or Navigate to  <Link to="/authentication">Login Page</Link></p>
                </div>
           
            </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    console.log(state);
    return {
        authStatus : state.authStatus,
        tempUser : state.tempUser
    }

}
export default connect(mapStateToProps, {
    tempAuth
})(ConfigurationModal);
