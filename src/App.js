import { useState, useEffect, useRef } from "react";
import { HiPlus, HiSun, HiMoon } from "react-icons/hi";
import { FaRegPaperPlane } from "react-icons/fa";
//import { motion, AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import loading from "react-useanimations/lib/loading";
import UseAnimations from "react-useanimations";
import useLocalStorage from "use-local-storage";

import "./normal.css";
import "./App.css";

import WelcomeScreen from "./components/Chat/WelcomeScreenHeader";
// import ChatMessage from "./components/Chat/ChatMessage";

function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [currentModel, setCurrentModel] = useState(() => {
    const savedModel = localStorage.getItem("currentModel");
    return savedModel !== null ? savedModel : "text-davinci-003";
  });
  const [chatLog, setChatLog] = useState([]);
  // const [apiKey, setApiKey] = useState(() => {
  //   const savedApiKey = localStorage.getItem("apiKey");
  //   return savedApiKey !== null ? savedApiKey : "";
  // });

  const defaultDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const [theme, setTheme] = useLocalStorage(
    "theme",
    defaultDark ? "dark" : "light"
  );

  const switchTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  function clearChat() {
    setChatLog([]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);
    setIsInitial(false);
    setIsLoading(true);

    const messages = chatLogNew.map((message) => message.message).join("\n");

    const response = await fetch("cgpt2-5.glitch.me/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
        currentModel: currentModel,
      }),
    });

    setIsLoading(false);

    const data = await response.json();

    await setChatLog([
      ...chatLogNew,
      { user: "gpt", message: `${data.message}` },
    ]);
    localStorage.setItem("chatLog", JSON.stringify(chatLogNew));
    console.log(data.message);
  }

  const SideMenu = (e) => {
    return (
      <motion.aside
        className="sidemenu"
        initial={{ x: 1 }}
        animate={{ x: 0 }}
        key="aside"
      >
        <div>
          <div className="sidemenu-button" onClick={clearChat}>
            <HiPlus />
            New chat
          </div>
          <div>
            <h3>Models</h3>
            <select
              className="dropdown"
              onChange={(e) => {
                setCurrentModel(e.target.value);
                localStorage.setItem(setCurrentModel, e.target.value);
                console.log(currentModel);
              }}
              value={currentModel}
            >
              <option value="text-davinci-003">Text - Davinci 3</option>
              <option value="code-cushman-001'">Code - Cushman</option>
            </select>
          </div>
        </div>
        {theme === "light" ? (
          <div className="sidemenu-button" onClick={switchTheme}>
            <HiSun />
            Light Mode
          </div>
        ) : (
          <div className="sidemenu-button" onClick={switchTheme}>
            <HiMoon />
            Dark Mode
          </div>
        )}
      </motion.aside>
    );
  };

  return (
    <div className="App" data-theme={theme}>
      {/* {apiKey !== "" && ( */}
      <SideMenu
        clearChat={clearChat}
        setCurrentModel={setCurrentModel}
        currentModel={currentModel}
      />
      {/* )} */}
      <motion.section className="chatbox">
        <div className="topmenu">
          <div className="sidemenu-button" onClick={clearChat}>
            <HiPlus />
          </div>
          <select
            className="dropdown"
            onChange={(e) => {
              setCurrentModel(e.target.value);
              localStorage.setItem(setCurrentModel, e.target.value);
              console.log(currentModel);
            }}
            value={currentModel}
          >
            <option value="text-davinci-003">Davinci 3</option>
            <option value="code-cushman-001'">Cushman</option>
          </select>
          <div className="sidemenu-button" onClick={switchTheme}>
            <HiSun size="32px" />
          </div>
        </div>
        {/* {isInitial && apiKey === "" ? (
            <WelcomeScreen setApiKey={setApiKey} apiKey={apiKey} />
          ) : (
            ""
          )} */}
        {isInitial && <WelcomeScreen />}
        <motion.div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              user={message.user}
            />
          ))}
        </motion.div>
        {/* {apiKey !== "" && ( */}
        <motion.div className="chat-input-holder">
          <form className="inputForm" onSubmit={handleSubmit}>
            <input
              className="chat-input-textarea"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            {!isLoading ? (
              <FaRegPaperPlane
                size="24px"
                style={{ cursor: "pointer" }}
                onClick={handleSubmit}
              />
            ) : (
              <UseAnimations
                animation={loading}
                size={24}
                strokeColor={"white"}
              />
            )}
          </form>
        </motion.div>
        {/* )} */}
      </motion.section>
    </div>
  );
}

const ChatMessage = (message, index) => {
  const messageRef = useRef(null);
  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messageRef]);

  if (message.user === "gpt") {
    return (
      <div className="chat-message-gpt">
        <motion.div
          ref={messageRef}
          key={index}
          className="messageChatgpt"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 3 }}
        >
          {message.message}
        </motion.div>
      </div>
    );
  } else
    return (
      <div className="chat-message">
        <motion.div
          ref={messageRef}
          key={index}
          className="message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          {message.message}
        </motion.div>
      </div>
    );
};

export default App;
