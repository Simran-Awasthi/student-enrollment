import { useDispatch } from "react-redux";
import { ENROLL } from "../states/reducers";

export default function EnterEnrollment() {
  const dispatch = useDispatch();
  const Enroll = () => {
    dispatch(ENROLL(true));
  };
  return (
    <div className="p-4 flex items-center h-full">
      <div className="flex gap-2 flex-col w-full h-[200px] items-center justify-center rounded-md">
        <p className=" w-full p-2 flex items-start font-serif font-semibold">
          Enter into student info system.
        </p>
        <button
          type="submit"
          className="w-full flex text-center p-2  rounded-md border-none  bg-blue-500"
          onClick={Enroll}
        >
          Enroll Now
        </button>
      </div>
    </div>
  );
}
