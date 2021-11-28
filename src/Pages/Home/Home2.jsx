import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./Home2.scss";
import { motion } from "framer-motion";
import { Redirect } from "react-router";
import { setActivity } from "../../actions";
import { connect } from "react-redux";
const InputVariant = {
    hidden : {
        opacity : 0,
        y : -100,
    }
    ,
    visible : {
        opacity : 1,
        y : 0,
        transition : {
            duration : 1,
            type : 'spring',
            ease : 'easeIn'
            
        }
    }
}

const MainDivVariant = {
    exit : {
        x : '-100vw'
    },
    hidden : {
        x : '100vw',
        opacity : 0,
    },
    visible : {
        x : 0,
        opacity : 1,
        transition : {
            duration : 0.5
        }
    },
 
}

const Home2 = ({setActivity}) => {
    const history = useHistory();
    useEffect(()=>setActivity(false))

    const routeChange = (path) =>{  
      history.push(path);
    }
    const handleCreate = ()=>{
        const id = Math.floor(Math.random()*21244343);
        routeChange(`/${id}`);
    }

  const [showLabel, setShowLabel] = useState(false);
  const [join, setJoin] = useState(false);
  const [input,setInput] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = input;
    routeChange(`/${id}`);
  };
  return (
    <div  className="Home">
      <motion.div variants={MainDivVariant}exit="exit" initial="hidden" animate="visible" className="Home__container">
        <div className="Home__texts">
          <motion.div
            animate={{
              color: ["#0af", "#6C63FF", "#f4233f", "rgba(276,276,276,0.4)"],
            }}
            transition={{
              duration: 5,
              type: "spring",
              stiffness: 200,
              damping: 17,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="Home__texts-heading"
          >
            REACT ROOM
          </motion.div>
          <div className="Home__texts-subheading">
            Future of Communication | powered by Dolby
          </div>
        </div>
        <div className="Home__controls">
          <div className="Home__controls-button">
            <button onClick={handleCreate} className="Home__controls-button-1">Create Room</button>
          </div>
          <div className="Home__controls-button">
            <button
              className="Home__controls-button-1"
              onClick={() => setJoin(!join)}
            >
              Join Room
            </button>
          </div>
        </div>
        <div className="Home-form">
          <form onSubmit={handleSubmit}>
            <div className="Home-form__controls">
              {showLabel && (
                <motion.label
                  initial={{ x: -150, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  htmlFor="joinid"
                  className="Home-form__controls-label"
                >
                  ENTER ROOM ID
                </motion.label>
              )}
              {join && (
                <motion.input
                variants={InputVariant}
                initial="hidden"
                animate="visible"
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                transition={{duration : 1,}}
                  onBlur={() => setShowLabel(false)}
                  onFocus={() => setShowLabel(true)}
                  placeholder="Enter Room Id and Hit Enter!"
                  type="text"
                  className="Home-form__controls-input"
                  id="joinid"
                />
              )}
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default connect(null, {
    setActivity
  })(Home2);
  