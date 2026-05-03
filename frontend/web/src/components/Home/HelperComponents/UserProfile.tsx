import type { User } from "../../shared/Types/interface.ts"
import type { setBool } from "../../shared/Types/Types.ts";
import { X } from "lucide-react"


export default function UserProfile({user, setShowProfile}: { user: User, setShowProfile: setBool }) {
    void user

    return (
        <div className="w-full h-screen bg-black/30 backdrop-blur-[5px] fixed top-0 left-0 z-[9999999]">
            <div className="flex items-center justify-between w-full h-full">
                <div>
                    <h2>Settings</h2>
                </div>

                <X onClick={() => setShowProfile(false)}/>
            </div>
        </div>
    )
}