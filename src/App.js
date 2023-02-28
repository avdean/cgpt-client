import { useState } from "react";
import { HiPlus, HiSun, HiMoon } from "react-icons/hi";
import { motion } from "framer-motion";

import useLocalStorage from "use-local-storage";

import "./normal.css";
import "./App.css";

import WelcomeScreen from "./components/Chat/WelcomeScreenHeader";
import ChatInput from "./components/Chat/ChatInput";
import ChatMessage from "./components/Chat/ChatMessage";
import SideMenu from "./components/Chat/SideMenu";

function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [currentModel, setCurrentModel] = useState(() => {
    const savedModel = localStorage.getItem("currentModel");
    return savedModel !== null ? savedModel : "text-davinci-003";
  });
  const [chatLog, setChatLog] = useState([]);

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

    const response = await fetch("https://cgpt2-5.glitch.me/", {
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

  return (
    <div className="App" data-theme={theme}>
      <SideMenu
        clearChat={clearChat}
        setCurrentModel={setCurrentModel}
        currentModel={currentModel}
      />
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
              <option value="text-davinci-003">Text - Davinci 3</option>
              <option value="text-davinci-002">Text - Davinci 2</option>
              <option value="text-davinci">Text - Davinci 1</option>
              <option value="text-ada">Text - Ada</option>
              <option value="code-cushman-001">Code - Cushman</option>
          </select>
          {theme === "light" ? (
          <div className="sidemenu-button" onClick={switchTheme}>
            <HiSun />
          </div>
        ) : (
          <div className="sidemenu-button" onClick={switchTheme}>
            <HiMoon />
          </div>
        )}
        </div>
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
        <ChatInput
          handleSubmit={handleSubmit}
          input={input}
          setInput={setInput}
          isLoading={isLoading}
        />
      </motion.section>
    </div>
  );
}

export default App;
