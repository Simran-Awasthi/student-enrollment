import "react-chatbot-kit/build/main.css";
import "./App.css";
import { Navigate, Routes, Route } from "react-router";
import { useSelector } from "react-redux";
import EnterEnrollment from "./components/EnterEnrollment";
import Home from "./components/Home";

function App() {
  const { register, detail } = useSelector((state) => state.checker);
  return (
    <div className="flex py-2 w-full justify-center">
      <div className="max-w-xs w-full border border-black h-auto">
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
          {/* <Route
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
          /> */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
