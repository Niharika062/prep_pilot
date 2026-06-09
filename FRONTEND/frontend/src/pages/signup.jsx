import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

function Signup() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSignup = async () => {
        try {
            const response = await axios.post("https://prep-pilot-zsek.onrender.com/api/auth/register", { name, email, password })
            localStorage.setItem("token", response.data.token)
            navigate("/home")
        } catch (error) {
            alert("Something went wrong")
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
            <div className="bg-gray-900 p-10 rounded-2xl w-full max-w-md flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-center">PrepPilot</h1>
                <p className="text-gray-400 text-center text-sm">Create your account</p>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="bg-gray-800 p-3 rounded-lg outline-none" />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-gray-800 p-3 rounded-lg outline-none" />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-gray-800 p-3 rounded-lg outline-none" />
                <button onClick={handleSignup} className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold transition">Sign Up</button>
                <p className="text-center text-gray-400 text-sm">Already have an account? <Link to="/" className="text-blue-400 hover:underline">Login</Link></p>
            </div>
        </div>
    )
}

export default Signup