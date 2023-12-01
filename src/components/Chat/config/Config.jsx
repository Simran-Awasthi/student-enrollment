import { createChatBotMessage } from "react-chatbot-kit";
import CustomMsg from "../ChatBot/CustomMsg";
import Slot from "../widgets/Slot";
import CountDown from "../widgets/countdown";
const config = {
  initialMessages: [
    createChatBotMessage(`Hello welcome to student info system`, {
      widget: "gotIt",
    }),
  ],
  widgets: [
    {
      widgetName: "gotIt",
      widgetFunc: (props) => <CustomMsg {...props} />,
    },
    {
      widgetName: "slot",
      widgetFunc: (props) => <Slot {...props} />,
    },
    {
      widgetName: "countDown",
      widgetFunc: (props) => <CountDown {...props} />,
    },
  ],
  customComponents: {},
  customStyles: {
    botMessageBox: {
      backgroundColor: "#4c33cd",
    },
    chatButton: {
      backgroundColor: "#4c33cd",
    },
  },
};

export default config;
