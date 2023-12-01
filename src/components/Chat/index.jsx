import Chatbot from "react-chatbot-kit";
import config from "./config/Config";
import MessageParser from "./ChatBot/MessageParser";
import ActionProvider from "./ChatBot/ActionProvider";
import "react-chatbot-kit/build/main.css";
import "./index.css";
//this is the chatbot confrigutation file

export default function Chat() {
  return (
    <div>
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
}
