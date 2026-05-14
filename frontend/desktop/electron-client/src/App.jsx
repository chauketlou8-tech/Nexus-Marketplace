import { Routes, Route } from 'react-router-dom';
import Authentication from "./pages/Authentication.jsx";
import Home from "./pages/Home.jsx";
import { useState } from "react";

function App() {

    const [currUser, setCurrUser] = useState(null);

  return (
      <Routes>
          <Route path="/" element={< Authentication setCurrUser={setCurrUser} user={currUser}/> } />
          <Route path="/Home" element={ <Home user={currUser} /> } />
      </Routes>
  )
}

export default App
