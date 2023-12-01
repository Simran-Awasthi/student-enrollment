import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { ENROLL } from "../states/reducers";
import logo from "../assets/logo.png";
import { Menu } from "lucide-react";

export default function Detail() {
  const dispatch = useDispatch();
  const unroll = () => {
    dispatch(ENROLL(false));
  };
  const { name, age } = useSelector((state) => state.checker);
  return (
    <div className="flex flex-col w-full h-full gap-4 p-2 justify-between ">
      <div className=" w-full flex justify-between  text-black border-[1.5px]">
        <div className="w-24  flex">
          <img src={logo} className="" alt="" />
        </div>
        <button type="submit" className="text-2xl" onClick={unroll}>
          <Menu />
        </button>
      </div>
      <div className=" h-full items-center justify-center flex text-center text-lg font-medium">
        Your name {name} aged {age} has been added to student system. You may
        now exit.
      </div>
    </div>
  );
}
