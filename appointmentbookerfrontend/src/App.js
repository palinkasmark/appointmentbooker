import "./App.css";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";

function App() {
  return (
    <div className="App">
      <Nav />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
