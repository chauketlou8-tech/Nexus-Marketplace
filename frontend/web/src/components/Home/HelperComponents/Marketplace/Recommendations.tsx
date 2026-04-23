import { Brain, Sparkle } from "lucide-react"

export default function RecommendationsPage() {
    return (
        <div className="flex flex-col justify-center items-center w-full px-4 py-2">
            <div className="flex flex-col items-center w-full px-4 py-2">
                <div className="flex justify-center items-center w-full px-4 py-2 gap-3">
                    <span className="h-8 w-8 sm:h-10 sm:w-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center">
                        <Brain className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </span>

                    <h2 className="text-black text-[30px] font-bold">Smart Recommendations</h2>
                </div>

                <span className="flex justify-center items-center w-full px-4 py-2 gap-3">
                    <Sparkle />
                    <h2>AI-Powered Suggestions</h2>
                </span>
                <p>Personalized recommendations based on your course and campus activity</p>
            </div>

            <div className="flex flex-col items-center justify-center text-gray-500 gap-2 py-8">
                <p className="text-sm">No recommendations available</p>
            </div>

            <div className="flex justify-center items-center w-full px-4 py-2 gap-3 border border-gray-200 z-[999] bg-blue-50/40 rounded-[5px]">
                <Sparkle />

                <div>
                    <h2>How Smart Recommendations Work</h2>
                    <p>Our AI analyzes your course registration, browsing history, and what similar students have purchased to suggest the most relevant textbooks, items, and services for you. The confidence score shows how well each recommendation matches your needs.</p>
                </div>
            </div>
        </div>
    )
}