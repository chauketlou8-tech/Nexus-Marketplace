import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Authentication from "./pages/Authentication.tsx";
import Home from "./pages/Home.tsx";
import type { User } from "./components/shared/Types/User.ts";

function App() {

    const [currUser, setCurrUser] = useState<User>({});


  return (
      <Routes>
          <Route path="/" element={< Authentication setCurrUser={setCurrUser}/> } />
          <Route path="/Home" element={ <Home user={currUser} /> } />
      </Routes>
  )
}

export default App
