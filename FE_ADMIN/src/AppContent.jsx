// AppContent.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Homepage from "./Home/Home";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Movies from "./Movies/Movies";
import Ranking from "./Ranking/Ranking";
import Theater from "./Theater/Theater";
import Member from "./Member/Member";
import Movie_add from "./Movies/Movie_detail";
import Booking from "./Booking/Booking";
import PaymentInfo from "./Payment/Payment_info";
import Login from "./Auth/Login";
import Up from "./up";
import Filter from "./Search/Filter";
import NavBar from "./NavBar/NavBar";

function AppContent() {
  const location = useLocation();
  const hideNavbarRoutes = ["/Login"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      <Header />
      {!shouldHideNavbar && <NavBar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/Theater" element={<Theater />} />
        <Route path="/Member" element={<Member />} />
        <Route path="/Movie_add" element={<Movie_add />} />
        <Route path="/Booking" element={<Booking />} />
        <Route path="/Payment_info" element={<PaymentInfo />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/up" element={<Up />} />
        <Route path="/Filter" element={<Filter />} />
      </Routes>
      <Footer />
    </>
  );
}

export default AppContent;
