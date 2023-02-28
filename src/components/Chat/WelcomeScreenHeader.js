import { motion } from "framer-motion";

const WelcomeScreen = (props) => {

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
          This is a client that lets you speak to a number of OpenAI's models! You can read more about the different models at <a href="https://platform.openai.com/docs/models/overview">OpenAI's docs</a>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;
