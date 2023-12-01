import { useDispatch } from "react-redux";
import { ENROLL } from "../states/reducers";
import { Menu, PiIcon } from "lucide-react";
import Chat from "./Chat/index";

// this is the 2nd page i.e where student interacts with chatbot
export default function Home() {
  const dispatch = useDispatch();
  const unroll = () => {
    dispatch(ENROLL(false));
  };
  return (
    <div className="flex flex-col w-full">
      <div className="bg-white shadow-md flex justify-between py-2 px-3 text-black">
        <div className="w-12"></div>
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
