import { motion } from "framer-motion";

const WelcomeScreen = (props) => {

  // async function handleSubmitApi(e) {
  //   e.preventDefault();
  //   await fetch("http://localhost:3080/api", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-api-key": props.apiKey,
  //     },
  //   });
  //   await fetch("http://localhost:3080/restart", {
  //     method: "POST",
  //   });
  // }

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

  // const onSubmitHandler = (e) => {
  //   e.preventDefault();
  //   props.setApiKey(e.target.value);
  //   localStorage.setItem("apiKey", e.target.value);
  //   console.log(props.ApiKey);
  //   // handleSubmitApi();
  // };

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
        </p>
        {/* <p>Please enter your OpenAI API Key to continue</p> */}
      </motion.div>
      {/* <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 5, delay: 2 }}
        key="keyInput"
        onSubmit={onSubmitHandler}
        value={props.apiKey}
        exit="exit"
      >
        Key: <input className="key-input-holder"></input>
      </motion.form> */}
    </motion.div>
  );
};

export default WelcomeScreen;
