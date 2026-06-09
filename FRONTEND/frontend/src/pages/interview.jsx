import { useState } from "react"
import { useNavigate, useParams, useLocation } from "react-router-dom"
import axios from "axios"

function Interview() {
    const { sessionId } = useParams()
    const { state } = useLocation()
    const [currentQuestion, setCurrentQuestion] = useState(state?.question)
    const [isListening, setIsListening] = useState(false)
    const [transcript, setTranscript] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const startListening = () => {
        const recognition = new window.webkitSpeechRecognition()
        recognition.lang = "en-US"
        recognition.onresult = (event) => {
            setTranscript(event.results[0][0].transcript)
        }
        recognition.start()
        setIsListening(true)
        recognition.onend = () => setIsListening(false)
    }

    const submitAnswer = async () => {
    const token = localStorage.getItem("token")
    const response = await axios.post(
        `https://prep-pilot-zsek.onrender.com/api/session/${sessionId}/answer`,
        { answer: transcript },
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    )
    if (response.data.message === "Interview complete") {
        navigate("/report", { state: { report: response.data.report } })
    } else {
        setCurrentQuestion(response.data.question)
        setTranscript("")
    }
}

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
            <div className="bg-gray-900 p-10 rounded-2xl shadow-xl w-full max-w-2xl">
                <h2 className="text-sm text-blue-400 uppercase tracking-widest mb-4">Interview in Progress</h2>
                <p className="text-2xl font-semibold mb-8">{currentQuestion}</p>

                <div className="bg-gray-800 rounded-lg p-4 min-h-24 mb-6">
                    <p className="text-gray-400 text-sm mb-1">Your answer:</p>
                    <p className="text-white">{transcript || "Start speaking..."}</p>
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={startListening}
                        disabled={isListening}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-semibold py-3 rounded-lg transition"
                    >
                        {isListening ? "Listening..." : "🎤 Speak"}
                    </button>
                    <button
                        onClick={submitAnswer}
                        disabled={!transcript || loading}
                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-900 text-white font-semibold py-3 rounded-lg transition"
                    >
                        {loading ? "Submitting..." : "Submit Answer"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Interview