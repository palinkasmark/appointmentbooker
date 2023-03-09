import "./App.css";
import Nav from "./components/Nav";
import SignUp from "./components/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Main from "./components/Main";
import Home from "./components/Home";
import ProtectedRoute from "./util/ProtectedRoute";

function App() {


  return (
    <div className="App">
      <Nav />


      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={
             <ProtectedRoute>
                <Home />
             </ProtectedRoute> 
          }/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
