import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./Home2.scss";
import { motion } from "framer-motion";

import { setActivity } from "../../actions";
import { connect } from "react-redux";



const InputVariant = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      type: "spring",
      ease: "easeIn",
    },
  },
};




const MainDivVariant = {
  exit: {
    x: "-100vw",
  },
  hidden: {
    opacity : 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggar : 1
    },
  },
};

const AnimateHeading = {
  visible : {
    color: ["#0af", "#6C63FF", "#464370", "rgba(276,276,276,0.4)"],
    transition: {
          duration: 5,
          type: "spring",
          stiffness: 200,
          damping: 17,
          repeat: Infinity,
          repeatType: "reverse",
        }
  }
}



const Home2 = ({ setActivity }) => {
  const history = useHistory();
  useEffect(() => setActivity(false));

  const routeChange = (path) => {
    history.push(path);
  };
  const handleCreate = () => {
    const id = Math.floor(Math.random() * 21244343);
    routeChange(`/room/${id}`);
  };

  const [showLabel, setShowLabel] = useState(false);
  const [join, setJoin] = useState(false);
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = input;
    routeChange(`/room/${id}`);
  };

  
  return (
    <motion.div  variants={MainDivVariant} animate='visible' initial='hidden' className="Home">
      <div className="Home__container">
        <div className="Home__left">
          <div className="Home__left__text-part">
            <motion.div variants={AnimateHeading} animate="visible" className="Home__left__text-part__heading">REACT ROOM</motion.div>
            <div className="Home__left__text-part__subheading">
              Future of Communication, Powered by Dolby
            </div>
          </div>
          <div className="Home__left-buttons">
            <button onClick={handleCreate} className="Home__left-buttons-1">Create Room</button>
            <button onClick={()=>setJoin(!join)} className="Home__left-buttons-2">Join Room</button>
          </div>
          <form onSubmit={handleSubmit} className="Home__left-input">
           { showLabel&&<motion.label  animate={{x : 0,opacity : 1}} initial={{x : -150, opacity : 0}} transition = {{type : 'spring', duration : 1}}  className="Home__left-label" htmlFor="id">Enter Join Id</motion.label>}

            {join&&<motion.input placeholder="Enter Room Id & Hit Enter!" variants={InputVariant} exit='hidden' animate='visible' initial='hidden' onFocus={()=>setShowLabel(true)} onBlur={()=>setShowLabel(false)} type="text" value={input} id="id" onChange={(e)=>setInput(e.target.value)} />}
          </form>
        </div>
        <div className="Home__right">
          <div className="Home__right-img">
            <img src={'https://res.cloudinary.com/insight-byte/image/upload/v1638211462/undraw_conference_call_b0w6_2_urmtx7.svg'} className='Home__right-img-main' alt="" />
          </div>
        </div>
      </div>
      <div className="square-Home"></div>

    </motion.div>
  );
};

export default connect(null, {
  setActivity,
})(Home2);
