import { Routes, Route, Navigate } from "react-router-dom";
import { CardDetail } from "./components/CardDetail/CardDetail";
import { Home } from "./components/Home/Home";
import { Navbar } from "./components/Navbar/Navbar";

export const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<CardDetail />} />
      </Routes>
    </>
  );
};
