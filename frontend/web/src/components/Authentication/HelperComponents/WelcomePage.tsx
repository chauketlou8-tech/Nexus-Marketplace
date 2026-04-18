import { GraduationCap, ShieldCheck } from "lucide-react"
import Logo from "../../shared/Logo.tsx";

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-start justify-center w-full gap-5">
            <Logo/>

            <div className="flex flex-col items-start justify-center w-full gap-2">
                <div className="flex items-center justify-start rounded-[2rem] pl-4 gap-4">
                    <span className="flex justify-between items-center p-3 bg-blue-200 rounded-[4px]">
                        <ShieldCheck width="20px" height="20px" className="text-blue-700" />
                    </span>

                    <div>
                        <h3>Verified Students Only</h3>
                        <p>Only UCT students with @myuct.ac.za emails can join. Safe and trusted.</p>
                    </div>
                </div>

                <div className="flex items-center justify-start rounded-[2rem] pl-4 gap-4">
                    <span className="flex justify-between items-center p-3 bg-purple-200 rounded-[4px]">
                        <GraduationCap width="20px" height="20px" className="text-purple-700" />
                    </span>

                    <div>
                        <h3>Academic-Focused</h3>
                        <p>Find textbooks by course code, connect with tutors, and access student services.</p>
                    </div>
                </div>

                <div className="flex items-center justify-start rounded-[2rem] pl-4 gap-4">
                    <span className="flex justify-between items-center p-3 bg-green-200 rounded-[4px]">
                        <ShieldCheck width="20px" height="20px" className="text-green-700" />
                    </span>

                    <div>
                        <h3>Smart Recommendations</h3>
                        <p>AI-powered suggestions based on your courses and campus activity.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}