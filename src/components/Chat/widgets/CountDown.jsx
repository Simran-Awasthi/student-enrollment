import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CountDown() {
  const [number, setNumber] = useState(5);
  const navigate = useNavigate();

  const decNumber = () => {
    setNumber(number - 1);
  };
  useEffect(() => {
    if (number != 0) {
      setTimeout(decNumber, 1000);
    }
    if (number === 0) {
      navigate("/detail");
    }
  }, [number]);

  return (
    <div className="flex w-full justify-start">
      <div className="bg-[#4c33cd] text-white  rounded-full py-2 px-3">
        {number} s
      </div>
    </div>
  );
}
