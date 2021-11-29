import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import "./Home2.scss";
import { motion } from "framer-motion";
import { Redirect } from "react-router";
import { setActivity } from "../../actions";
import { connect } from "react-redux";

import AssetImage from '../../assets/undrawAssets.svg'
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
    x: "100vw",
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
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
    routeChange(`/${id}`);
  };

  const [showLabel, setShowLabel] = useState(false);
  const [join, setJoin] = useState(false);
  const [input, setInput] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const id = input;
    routeChange(`/${id}`);
  };

  //   <motion.div
  //   animate={{
  //     color: ["#0af", "#6C63FF", "#f4233f", "rgba(276,276,276,0.4)"],
  //   }}
  //   transition={{
  //     duration: 5,
  //     type: "spring",
  //     stiffness: 200,
  //     damping: 17,
  //     repeat: Infinity,
  //     repeatType: "reverse",
  //   }}
  //   className="Home__texts-heading"
  // >
  return (
    <div className="Home">
      <div className="Home__container">
        <div className="Home__left">
          <div className="Home__left__text-part">
            <motion.div variants={AnimateHeading} animate="visible" className="Home__left__text-part__heading">REACT ROOM</motion.div>
            <div className="Home__left__text-part__subheading">
              Future of Communication, Powered by Dolby
            </div>
          </div>
          <div className="Home__left-buttons">
            <button className="Home__left-buttons-1">Create  Meeting</button>
            <button className="Home__left-buttons-2">Join  Meeting</button>
          </div>
          <div className="Home__left-input">
            <input type="text" value="value" />
          </div>
        </div>
        <div className="Home__right">
          <div className="Home__right-img">
            <img src={AssetImage} className='Home__right-img-main' alt="" />
          </div>
        </div>
      </div>
      <div className="square-Home"></div>

    </div>
  );
};

export default connect(null, {
  setActivity,
})(Home2);
