import { Routes, Route } from 'react-router-dom';
import Authentication from "./pages/Authentication.tsx";
import Home from "./pages/Home.tsx";

function App() {


  return (
      <Routes>
          <Route path="/" element={< Authentication/> } />
          <Route path="/Home" element={ <Home/> } />
      </Routes>
  )
}

export default App
