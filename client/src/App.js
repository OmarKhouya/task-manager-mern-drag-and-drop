import Main from "./Pages";
import SideBar from "./Template/sideBar";
import About from "./Pages/About";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter className="">
      <div className="main-body">
        <SideBar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/About" element={<About />} />
            <Route
              path="*"
              element={
                <div
                  className="d-flex justify-content-center align-items-center"
                  style={{ minHeight: "80vh" }}
                >
                  <h1 className="text-muted">404 || NOT FOUND</h1>
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
