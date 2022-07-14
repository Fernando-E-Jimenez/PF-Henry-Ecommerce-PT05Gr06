import { CardsContainer } from "../CardsContainer/CardsContainer";
import { Filters } from "../Filters/Filters";
import { Navbar } from "../Navbar/Navbar";
import { useAuth0 } from '@auth0/auth0-react';



function LoginButton() {
  const {
    isAuthenticated,
    loginWithRedirect,
  } = useAuth0();

  return !isAuthenticated && (
    <button onClick={loginWithRedirect}>Log in</button>
  );
}

export const Home = () => {
  return (
    <>
      <Filters />
      <CardsContainer />
      <LoginButton/>
    </>
  );
};
