import { CardsContainer } from "../CardsContainer/CardsContainer";
import { Filters } from "../Filters/Filters";
import { Navbar } from "../Navbar/Navbar";

export const Home = () => {
  return (
    <>
      <Navbar />
      <Filters />
      <CardsContainer />
    </>
  );
};
