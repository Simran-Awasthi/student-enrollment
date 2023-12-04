import { useRef } from "react";

export default function UniqueMessageBox(props) {
  const containerRef = useRef(null);

  const handleGotItClick = (e) => {
    // Trigger the "gotItMsg" action via props
    console.log(props.actions);
    props.actions.showGotItMessage();

    // Disable the button to prevent further clicks
    e.target.setAttribute("disabled", true);

    // Update the styling of the container when the button is clicked
    containerRef.current.classList.remove(
      "border-gray-400",
      "text-gray-500",
      "bg-white"
    );
    containerRef.current.classList.add(
      "text-white",
      "bg-[#00ff00]",
      "border-[#00ff00]"
    );
  };

  return (
    <div
      ref={containerRef}
      className="ml-16 border-2 px-2 py-1 rounded-md border-gray-400 text-gray-500 bg-white hover:border-[#ff00ff] hover:bg-[#ff00ff] hover:text-white w-min"
    >
      <button className="truncate" onClick={handleGotItClick}>
        Got It
      </button>
    </div>
  );
}
