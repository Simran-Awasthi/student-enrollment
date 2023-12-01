import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AGE, NAME } from "../../../states/reducers"; // Assuming setAge and setName are the action creators for AGE and NAME

const MyMessageParser = ({ children, actions }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.checker);

  const handleInput = (message) => {
    if (name.length === 0) {
      if (!message.match(/\d/)) {
        if (message.length > 2) {
          dispatch(NAME(message));
          actions.showAgeInputMessage();
        } else {
          actions.showCustomResponse("Name is too short.");
        }
      } else {
        actions.showCustomResponse("Name must include letters.");
      }
    } else {
      if (!isNaN(message)) {
        dispatch(AGE(message));
        actions.showThankYouMessage();
      } else {
        actions.showCustomResponse("Age must include digits.");
      }
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: handleInput,
          actions,
        });
      })}
    </div>
  );
};

export default MyMessageParser;
