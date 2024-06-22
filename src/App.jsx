// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

import { useState } from "react";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [route, setRoute] = useState("login");
  const [user, setUser] = useState("");

  return (
    <>
      {route == "login" && (
        <Login setUser={setUser} setRoute={setRoute}></Login>
      )}
      {route == "home" && (
        <Home user={user} setUser={setUser} setRoute={setRoute}></Home>
      )}
    </>
  );
}

export default App;
