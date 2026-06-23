import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Authentication from "./pages/Authentication.tsx";
import Home from "./pages/Home.tsx";
import Listing from "./pages/Listing.tsx";
import Profile from "./pages/Profile.tsx";
import type { User } from "./components/shared/User.ts";

function App() {

    const [currUser, setCurrUser] = useState<User>(() => {
        const saved = sessionStorage.getItem("currUser");
        return saved ? JSON.parse(saved) : null;
    });

    return (
      <Routes>
          {/*@ts-ignore*/}
          <Route path="/" element={< Authentication setCurrUser={setCurrUser} user={currUser}/> } />
          <Route path="/Home" element={ <Home user={currUser} /> } />
          <Route path="/listItem" element={ <Listing/> } />
          <Route path={`/user/profile/id=${currUser.id}`} element={ <Profile/> } />
      </Routes>
  )
}

export default App
