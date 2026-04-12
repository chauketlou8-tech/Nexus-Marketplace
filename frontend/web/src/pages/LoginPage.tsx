import WelcomePage from "../components/WelcomePage.tsx";
import Form from "../components/LoginForm.tsx"

export default function LoginPage() {
    return (
        <div className="flex items-center justify-between bg-blue-50/20 rounded-[2rem] p-[2rem] px-[8rem] gap-5 w-full min-h-screen">
            <WelcomePage />
            <Form/>
        </div>
    )
}