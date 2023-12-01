import { useDispatch } from "react-redux";
import { ENROLL } from "../states/reducers";
import { Menu } from "lucide-react";
import logo from "../assets/logo.png";
import Chat from "./Chat/index";

export default function Home() {
  const dispatch = useDispatch();
  const unroll = () => {
    dispatch(ENROLL(false));
  };
  return (
    <div className="flex flex-col w-full ">
      <div className="bg-white  items-center border-[1.5px]  flex justify-between py-2 px-3 text-black ">
        <div className="w-24 ">
          <img src={logo} className="w-full" alt="" />
        </div>
        <button type="submit" className="text-2xl" onClick={unroll}>
          <Menu />
        </button>
      </div>
      <div className="w-full ">
        <Chat />
      </div>
    </div>
  );
}
