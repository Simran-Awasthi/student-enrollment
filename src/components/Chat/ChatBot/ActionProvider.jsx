import React from "react";
import { createClientMessage } from "react-chatbot-kit";

const MyActionProvider = ({ createChatBotMessage, setState, children }) => {
  const updateState = (botMessage) => {
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const showSlotMessage = (date, day, time) => {
    const botMessage = createClientMessage(
      `Selected slot: ${date} ${day} ${time}`,
      {
        withAvatar: false,
        delay: 500,
      }
    );
    updateState(botMessage);
    setTimeout(showNameInputMessage, 1500);
  };

  const showNameInputMessage = () => {
    const botMessage = createChatBotMessage("Please enter your Name....", {
      withAvatar: false,
      delay: 500,
    });
    updateState(botMessage);
  };

  const showAgeInputMessage = () => {
    const botMessage = createChatBotMessage("Please enter your Age", {
      withAvatar: false,
      delay: 500,
    });
    updateState(botMessage);
  };

  const showThankYouMessage = () => {
    const botMessage = createChatBotMessage(
      "Thank you! The bot will exit in 5 seconds.",
      {
        widget: "countDown",
        withAvatar: false,
        delay: 500,
      }
    );
    updateState(botMessage);
  };

  const showGotItMessage = () => {
    const clientMessage = createClientMessage("Got it!", {
      withAvatar: false,
      delay: 500,
    });
    updateState(clientMessage);
    setTimeout(showSlotChoiceMessage, 1500);
  };

  const showSlotChoiceMessage = () => {
    const botMessage = createChatBotMessage("Please pick a slot", {
      widget: "slot",
      withAvatar: false,
      delay: 500,
    });
    updateState(botMessage);
  };

  const showCustomResponse = (message) => {
    const botMessage = createChatBotMessage(message, {
      withAvatar: false,
      delay: 500,
    });
    updateState(botMessage);
  };

  return (
    <div className="w-full h-auto  gap-10 flex">
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            showGotItMessage,
            showSlotMessage,
            showNameInputMessage,
            showAgeInputMessage,
            showThankYouMessage,
            showCustomResponse,
          },
        });
      })}
    </div>
  );
};

export default MyActionProvider;
