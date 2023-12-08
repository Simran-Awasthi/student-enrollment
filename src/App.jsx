import "react-chatbot-kit/build/main.css";
import NotFound from "./NotFound";
import { Navigate, Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import EnterEnrollment from "./components/EnterEnrollment";
import Home from "./components/Home";
import Detail from "./components/Detail";

function App() {
  const { register, detail } = useSelector((state) => state.checker);
  return (
    <div>
      <div className=" flex py-2 w-full  justify-center  rounded-md  ">
        <div className="max-w-xs w-full border-[1px] border-black h-[463]">
          <Routes>
            <Route
              path="/login"
              element={register ? <Navigate to="/" /> : <EnterEnrollment />}
              exact
            />
            <Route
              path="/"
              element={register ? <Home /> : <Navigate to="/login" />}
              exact
            />
            <Route
              path="/detail"
              element={
                register && detail ? (
                  <Detail />
                ) : register ? (
                  <Navigate to="/" />
                ) : (
                  <Navigate to="/login" />
                )
              }
              exact
            />
            <Route path="//" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
