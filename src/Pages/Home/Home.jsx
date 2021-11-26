import React, { useEffect } from "react";
import "./Home.scss";
import {connect} from 'react-redux'
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import HomeIllustration from '../../assets/Home-illustration.svg'
import { setActivity } from "../../actions";
// import Particles from 'react-particles'


const buttonStyle1 =  {
    backgroundColor : '#6C63FF',
    height : '3rem',
    fontSize : '1rem'

}

const buttonStyle2 =  {
    borderColor : '#6C63FF',
    color : '#6C63FF',
    marginLeft : '1rem',
    height : '3rem',
    fontSize : '1rem'

}



const Home = ({setActivity}) => {
  useEffect(()=>setActivity(false))
  return (
    <>
      
        <main className='main'>
          <div className="main__text">
              <div className="main__text__headings">
            <h1 className="main__text__headings-heading">
              Smart Online Classroom, <br /> Powered by Dolby.
            </h1>
            <p className="main__text__headings-subheading">
              Smart classroom is a hackathon project which aims to provide a
              reliable solution for online education.
            </p>
            </div>
            <div className="main__text__buttons">
                <Button style={buttonStyle1} variant="contained">Create Room</Button>
                <TextField style={buttonStyle2} variant="outlined" label = "Join Room"/>
            </div>
          </div>
          <div className="main__image-container">
          <img src={HomeIllustration} alt="" className="main__image-container__image" />
          </div>
        </main>
        <div className="foot">
            <div className="foot-line">
                <hr />
            </div>
            <div className="foot-text">
                Code available at <span className='foot-text-link'>www.github.com/kunals131</span>
            </div>
        </div>
        <div className="foot-end">
            <p>Developed with ♥ & React by Kunal Sangtiani</p>
        </div>
   
    </>
  );
};

export default connect(null, {
  setActivity
})(Home);
