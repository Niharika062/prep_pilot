import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const roles = [
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "DevOps Engineer",
    "Mobile Developer",
    "UI/UX Designer"
]

function Home() {
    const [role, setRole] = useState("Frontend Developer")
    const [numberOfQuestions, setNumberOfQuestions] = useState(5)
    const [resume, setResume] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const startInterview = async () => {
        setLoading(true)
        const token = localStorage.getItem("token")

        let response;

        if (resume) {
            const formData = new FormData()
            formData.append("role", role)
            formData.append("numberOfQuestions", numberOfQuestions)
            formData.append("resume", resume)

            response = await axios.post("https://prep-pilot-zsek.onrender.com/api/session/start-with-resume", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                }
            })
        } else {
            response = await axios.post("https://prep-pilot-zsek.onrender.com/api/session/start", {
                role,
                numberOfQuestions
            }, {
                headers: { Authorization: `Bearer ${token}` }
            })
        }

        const { sessionId, questions } = response.data
        navigate(`/interview/${sessionId}`, { state: { question: questions } })
        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
            <div className="bg-gray-900 p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col gap-4">
                <h1 className="text-3xl font-bold text-center">PrepPilot</h1>
                <p className="text-gray-400 text-center text-sm">AI-powered voice interview practice</p>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Select Role</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-gray-800 p-3 rounded-lg outline-none">
                        {roles.map((r) => (
                            <option key={r} value={r}>{r}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Number of Questions</label>
                    <input type="number" value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(Number(e.target.value))} min={1} max={10} className="w-full bg-gray-800 p-3 rounded-lg outline-none" />
                </div>

                <div>
                    <label className="block text-sm text-gray-400 mb-2">Upload Resume (optional)</label>
                    <input type="file" accept=".pdf" onChange={(e) => setResume(e.target.files[0])} className="w-full bg-gray-800 p-3 rounded-lg outline-none" />
                </div>

                <button onClick={startInterview} disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white font-semibold py-3 rounded-lg transition">
                    {loading ? "Preparing Interview..." : "Start Interview"}
                </button>
            </div>
        </div>
    )
}

export default Home