import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await axios.post("https://prep-pilot-zsek.onrender.com/api/auth/login", { email, password })
            localStorage.setItem("token", response.data.token)
            navigate("/home")
        } catch (error) {
            alert("Invalid credentials")
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
            <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-md flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-center">PrepPilot</h1>
                <p className="text-gray-400 text-center text-sm">Login to continue</p>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-800 p-3 rounded-lg outline-none" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-800 p-3 rounded-lg outline-none" />
                <button onClick={handleLogin} className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition">Login</button>
                <p className="text-center text-gray-400 text-sm">No account? <Link to="/signup" className="text-blue-400 hover:underline">Sign up</Link></p>
            </div>
        </div>
    )
}

export default Login