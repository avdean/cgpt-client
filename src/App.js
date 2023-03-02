import { useState } from "react";
import { motion } from "framer-motion";
import useLocalStorage from "use-local-storage";

import "./normal.css";
import "./App.css";

import WelcomeScreen from "./components/Chat/WelcomeScreenHeader";
import ChatMessage from "./components/Chat/ChatMessage";

import SideMenu from "./components/UI/SideMenu";
import ChatInput from "./components/UI/ChatInput";
import TopMenu from "./components/UI/TopMenu";

function App() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitial, setIsInitial] = useState(true);
  const [error, setError] = useState(false);
  const [showSidemenu, setShowSidemenu] = useState(false);

  const [currentModel, setCurrentModel] = useState(() => {
    const savedModel = localStorage.getItem("currentModel");
    return savedModel !== null ? savedModel : "text-davinci-003";
  });

  const [currentServer, setCurrentServer] = useState(() => {
    const savedServer = localStorage.getItem("myServer");
    return savedServer !== null ? savedServer : "";
  });
  const [chatLog, setChatLog] = useLocalStorage("chatLog", []);

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

  function toggleSideMenu() {
    setShowSidemenu(!showSidemenu);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: `${input}` }];
    setInput("");
    setChatLog(chatLogNew);
    setIsInitial(false);
    setIsLoading(true);

    const messages = chatLogNew.map((message) => message.message).join("\n");

    const response = await fetch(currentServer, {
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
      {currentServer !== "" && !error && (
        <SideMenu
          clearChat={clearChat}
          setCurrentModel={setCurrentModel}
          currentModel={currentModel}
          theme={theme}
          switchTheme={switchTheme}
          showSidemenu={showSidemenu}
          toggleSideMenu={toggleSideMenu}
        />
      )}
      <motion.section className="chatbox">
        <TopMenu
          toggleSideMenu={toggleSideMenu}
          currentModel={currentModel}
          theme={theme}
          switchTheme={switchTheme}
        />
        {isInitial && currentServer === "" && (
          <WelcomeScreen
            setCurrentServer={setCurrentServer}
            currentServer={currentServer}
            error={error}
            setError={setError}
            setIsInitial={setIsInitial}
          />
        )}
        <motion.div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.message}
              user={message.user}
            />
          ))}
        </motion.div>

        {currentServer !== "" && !error && (
          <ChatInput
            handleSubmit={handleSubmit}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        )}
      </motion.section>
    </div>
  );
}

export default App;
