import { useEffect, useRef } from "react";
import {motion, AnimatePresence} from "framer-motion";

const ChatMessage = (props, index) => {
  const messageRef = useRef(null);
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messageRef]);

  if (props.user === "gpt") {
    return (
      <div className="chat-message-gpt">
        <AnimatePresence>
          <motion.div
            ref={messageRef}
            key={index}
            className="messageChatgpt"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            {props.message}
          </motion.div>
        </AnimatePresence>
      </div>
    );
  } else
    return (
      <div className="chat-message">
        <AnimatePresence>
          <motion.div
            ref={messageRef}
            key={index}
            className="message"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
          >
            {props.message}
          </motion.div>
        </AnimatePresence>
      </div>
    );
};

export default ChatMessage;