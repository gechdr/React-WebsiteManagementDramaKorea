/* eslint-disable react/prop-types */
import { useState } from "react";
import { drama, actor } from "../assets/drakor.json";
import ListDrama from "./ListDrama";
import textureBG from "../assets/textureBG.jpg";
import AddDrama from "./AddDrama";
import DetailDrama from "./DetailDrama";

function Home({ user, setUser, setRoute }) {
  const [dramas, setDramas] = useState(drama);
  const [actors, setActors] = useState(actor);
  const [routeUser, setRouteUser] = useState("home");
  const [index, setIndex] = useState(-1);

  const handleLogout = () => {
    setRoute("login");
    setUser("");
  };

  return (
    <>
      <div
        className="container-fluid p-0"
        style={{
          minHeight: "100vh",
          backgroundImage: `url(${textureBG})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <nav
          className="navbar navbar-expand-l"
          style={{ backgroundColor: "#000000" }}
        >
          <div className="container-fluid">
            <h1 className="navbar-brand text-white fs-2 px-4" href="#">
              Welcome, {user}!
            </h1>
            <button
              className="text-white fs-4 border-0 rounded-3 py-2 px-4"
              type="submit"
              style={{ backgroundColor: "#7c2023" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </nav>

        {/* Content */}

        {routeUser == "home" && (
          <ListDrama
            dramas={dramas}
            user={user}
            setRouteUser={setRouteUser}
            setIndex={setIndex}
          ></ListDrama>
        )}
        {routeUser == "addDrama" && (
          <AddDrama
            dramas={dramas}
            setDramas={setDramas}
            setRouteUser={setRouteUser}
            actors={actor}
          ></AddDrama>
        )}
        {routeUser == "detail" && (
          <DetailDrama
            dramas={dramas}
            index={index}
            setRouteUser={setRouteUser}
            setIndex={setIndex}
            actors={actors}
          ></DetailDrama>
        )}
      </div>
    </>
  );
}

export default Home;
