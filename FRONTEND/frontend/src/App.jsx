import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Interview from "./pages/Interview"
import Report from "./pages/Report"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/interview/:sessionId" element={<Interview />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App