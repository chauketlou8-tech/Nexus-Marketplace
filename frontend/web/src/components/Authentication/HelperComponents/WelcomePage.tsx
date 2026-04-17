import { GraduationCap, ShieldCheck } from "lucide-react"
import Logo from "../../shared/Logo.tsx";

export default function WelcomePage() {
    return (
        <div className="flex flex-col items-start justify-center w-full gap-5">
            <Logo/>
            <div className="flex flex-col items-start justify-center w-full gap-2">
                <div className="flex items-center justify-start rounded-[2rem] w-full gap-4">
                <span>
                    <ShieldCheck />
                </span>

                    <div>
                        <h3>Verified Students Only</h3>
                        <p>Only UCT students with @myuct.ac.za emails can join. Safe and trusted.</p>
                    </div>
                </div>

                <div className="flex items-center justify-start rounded-[2rem] w-full gap-4">
                <span>
                    <GraduationCap />
                </span>

                    <div>
                        <h3>Academic-Focused</h3>
                        <p>Find textbooks by course code, connect with tutors, and access student services.</p>
                    </div>
                </div>

                <div className="flex items-center justify-start rounded-[2rem] w-full gap-4">
                <span>
                    <ShieldCheck />
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