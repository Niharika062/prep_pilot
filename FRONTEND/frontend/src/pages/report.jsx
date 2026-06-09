import { useLocation, useNavigate } from "react-router-dom"

function Report() {
    const { state } = useLocation()
    const report = state?.report
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center p-6">
            <div className="bg-gray-900 p-10 rounded-2xl shadow-xl w-full max-w-3xl">
                <h1 className="text-4xl font-bold text-center mb-2">Interview Report</h1>
                <p className="text-gray-400 text-center mb-8">Here's your detailed feedback</p>

                <div className="bg-gray-800 rounded-lg p-6 whitespace-pre-wrap text-gray-200 leading-relaxed mb-8">
                    {report}
                </div>

                <button
                    onClick={() => navigate("/")}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
                >
                    Start New Interview
                </button>
            </div>
        </div>
    )
}

export default Report