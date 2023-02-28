import React, { useRef } from "react";
import { motion } from "framer-motion";

const WelcomeScreen = (props) => {
  const serverInputRef = useRef();
  
  function handleServerSubmit(e) {
    e.preventDefault();
    const enteredServer = serverInputRef.current.value;

    if (!enteredServer.includes("glitch.me") || !enteredServer.includes("https://")) {
      props.setError(true);
      return;
    }
    props.setCurrentServer(enteredServer);
    localStorage.setItem("myServer", enteredServer);
    props.setError(false);
    console.log(enteredServer);
    props.setIsInitial(false);
  }

  const container = {
    hidden: {
      opacity: 0,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 0 },
    },
    visible: {
      opacity: 1,
      transition: { ease: [0.455, 0.03, 0.515, 0.955], duration: 5 },
    },
  };

  return (
    <motion.div
      className="welcome"
      key="welcome"
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <motion.div
        className="display"
        initial="hidden"
        animate="visible"
        variants={container}
      >
        <h1>DaVinci Client 2.0</h1>
        <p>
          This is a client that lets you speak to a number of OpenAI's models!
          You can read more about the different models at{" "}
          <a href="https://platform.openai.com/docs/models/overview">
            OpenAI's docs
          </a>
        </p>
        <p>However before you start, please link your server:</p>
        <div>
          <form className="inputForm" onSubmit={handleServerSubmit}>
            <label htmlFor="server">Insert your Glitch Server URL</label>
            <input type="text" ref={serverInputRef} />
          </form>
            {props.error && <p>Please enter a valid Glitch url.</p>}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
