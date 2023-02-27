import loading from "react-useanimations/lib/loading";
import UseAnimations from "react-useanimations";
import { FaRegPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

const ChatInput = (props, handleSubmit, theme) => {
  return (
    <motion.div className="chat-input-holder">
      <form className="inputForm" onSubmit={props.handleSubmit}>
        <input
          className="chat-input-textarea"
          rows="1"
          value={props.input}
          onChange={(e) => props.setInput(e.target.value)}
        />
        {!props.isLoading ? (
          <FaRegPaperPlane
            size="24px"
            style={{ cursor: "pointer" }}
            onClick={handleSubmit}
          />
        ) : !theme === "light" ? (
          <UseAnimations animation={loading} size={24} strokeColor={"white"} />
        ) : (
          <UseAnimations animation={loading} size={24} strokeColor={"black"} />
        )}
      </form>
    </motion.div>
  );
};

export default ChatInput;
