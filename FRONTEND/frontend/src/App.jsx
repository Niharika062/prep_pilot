import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home"
import Interview from "./pages/interview"
import Report from "./pages/report"
import Login from "./pages/login"
import Signup from "./pages/signup"

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