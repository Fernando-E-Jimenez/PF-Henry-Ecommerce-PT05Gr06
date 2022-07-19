import { CardsContainer } from "../CardsContainer/CardsContainer";
import { Filters } from "../Filters/Filters";
import { Navbar } from "../Navbar/Navbar";
import { useAuth0 } from '@auth0/auth0-react';


export const Home = () => {
  return (
    <>
      <Filters />
      <CardsContainer />
    </>
  );
};
