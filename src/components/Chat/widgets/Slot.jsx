import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

const DAYs = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHs = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const today = new Date();
const di = today.getDay();
const DATEs = today.getDate();
const mi = today.getMonth();

const Slot = (props) => {
  const [selectedSlot, setSelectedSlot] = useState({
    day: "",
    date: "",
    time: "",
  });
  const morningRef = useRef(null);
  const noonRef = useRef(null);
  const dateRef = useRef(null);
  const DaDate = [
    {
      date: DATEs + 0 + " " + MONTHs[mi],
      day: DAYs[di],
      id: "date1",
    },
    {
      date: DATEs + 1 + " " + MONTHs[mi],
      day: DAYs[di + 1],
      id: "date2",
    },
    {
      date: DATEs + 2 + " " + MONTHs[mi],
      day: DAYs[0],
      id: "date3",
    },
  ];

  const disableAllButtons = (buttonsRef) => {
    buttonsRef.current.childNodes.forEach((button) => {
      button.setAttribute("disabled", true);
    });
  };

  const handleButtonClick = (event, slotArray) => {
    const clickedButton = event.target;
    const buttonContainer = clickedButton.parentElement;
    const slotType = buttonContainer.id;

    disableAllButtons(slotType === "morning" ? noonRef : morningRef);

    slotArray.forEach((slot) => {
      const buttonId = slot.id;
      const button = document.getElementById(buttonId);

      if (buttonId === clickedButton.id) {
        button.classList.remove("border-gray-500", "text-gray-200", "bg-white");
        button.classList.add("text-white", "bg-[#0000ff]", "border-[#0000ff]");
        slot.handler();
      } else {
        button.classList.add("border-gray-500", "text-gray-200", "bg-white");
        button.classList.remove(
          "text-white",
          "bg-[#0000ff]",
          "border-[#0000ff]"
        );
      }

      button.setAttribute("disabled", true);
    });

    props.actions.showNameInputMessage();
  };

  const handleMorningButtonClick = (event) => {
    handleButtonClick(event, morning);
  };

  const handleNoonClick = (event) => {
    handleButtonClick(event, noon);
  };

  const morning = [
    {
      text: "09:00AM",
      handler: () => setSelectedSlot({ ...selectedSlot, time: "09:00AM" }),
      id: "mtime1",
    },
    {
      text: "10:00AM",
      handler: () => setSelectedSlot({ ...selectedSlot, time: "10:00AM" }),
      id: "mtime2",
    },
    {
      text: "11:00AM",
      handler: () => setSelectedSlot({ ...selectedSlot, time: "11:00AM" }),
      id: "mtime3",
    },
    {
      text: "12:00AM",
      handler: () => setSelectedSlot({ ...selectedSlot, time: "12:00AM" }),
      id: "mtime4",
    },
  ];

  const noon = [
    {
      text: "02:00PM",
      handler: () => setSelectedSlot({ ...selectedSlot, time: "02:00PM" }),
      id: "ntime1",
    },
    {
      text: "03:00PM",
      handler: () => setSelectedSlot({ ...selectedSlot, time: "03:00PM" }),
      id: "ntime2",
    },
    {
      text: "04:00PM",
      handler: () => setSelectedSlot({ ...selectedSlot, time: "04:00PM" }),
      id: "ntime3",
    },
    {
      text: "05:00PM",
      handler: () => setSelectedSlot({ ...selectedSlot, time: "05:00PM" }),
      id: "ntime4",
    },
  ];

  const handleDateButtonClick = (event) => {
    const clickedButton = event.target;
    const buttonId = clickedButton.id;
    const dateSlot = DaDate.find((date) => date.id === buttonId);
    if (dateSlot) {
      setSelectedSlot({
        ...selectedSlot,
        date: dateSlot.date,
        day: dateSlot.day,
      });
    }

    props.actions.showNameInputMessage();
  };

  useEffect(() => {
    const { day, date, time } = selectedSlot;
    if (day && date && time) {
      props.actions.afterSlotMsg(date, day, time);
    }
  }, [selectedSlot]);

  const renderButtons = (slotArray, handleClick) => {
    return slotArray.map((option) => (
      <button key={option.id} id={option.id} onClick={handleClick}>
        {option.text}
      </button>
    ));
  };

  const renderDateButtons = DaDate.map((option) => (
    <button key={option.id} id={option.id} onClick={handleDateButtonClick}>
      <p>{option.date}</p>
      <p>{option.day}</p>
    </button>
  ));

  return (
    <div className="flex flex-col gap-6 pt-4 pb-2">
      <div className="w-full flex items-center relative justify-center font-medium">
        <div
          className="flex justify-between items-center"
          id="dates"
          ref={dateRef}
        >
          <button className=" text-3xl absolute left-[6px] ">
            <ArrowLeft />
          </button>
          <div className="flex  gap-8 " id="dayDates">
            {renderDateButtons}
          </div>
          <button className="text-3xl absolute right-[6px]">
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 font-medium">
        <p className="text-gray-500 ">Morning</p>
        <div className="flex justify-between" id="morning" ref={morningRef}>
          {renderButtons(morning, handleMorningButtonClick)}
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 font-medium" id="noon">
        <p className="text-gray-500 ">Noon</p>
        <div className="flex justify-between" id="noon" ref={noonRef}>
          {renderButtons(noon, handleNoonClick)}
        </div>
      </div>
    </div>
  );
};

export default Slot;
