import { CardsContainer } from "../CardsContainer/CardsContainer";
import { Filters } from "../Filters/Filters";
import { Navbar } from "../Navbar/Navbar";
import { useAuth0 } from "@auth0/auth0-react";
import "./Home.css";

export const Home = () => {
  return (
    <div className="homeContainer">
      <Filters />
      <CardsContainer />
    </div>
  );
};
