import { Routes, Route } from 'react-router-dom';
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";

function App() {


  return (
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="SignupPage" element={<SignupPage/>} />
      </Routes>
  )
}

export default App
