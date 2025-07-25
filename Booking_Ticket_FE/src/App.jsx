import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./Home/Home";
import Header from "./Header/Header";
import Footer from './Footer/Footer';
import Movies from './Movies/Movies';
import Ranking from "./Ranking/Ranking";
import Theater from "./Theater/Theater";
import Member from "./Member/Member";
import Movie_detail from "./Movies/Movie_detail";
<<<<<<< HEAD
import Login from "./Auth/Login";
=======
import Booking from "./Booking/Booking";
import PaymentInfo from "./Payment/Payment_info";
>>>>>>> e8e6b6ff2c0a304dabd0248e7643b8404533edb5

function App() {
  return (  
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/Movies" element={<Movies/>}></Route>
        <Route path="/Ranking" element={<Ranking/>}></Route>
        <Route path="/Theater" element={<Theater/>}></Route>
        <Route path="/Member" element={<Member/>}></Route>
        <Route path="/Movie_detail" element={<Movie_detail/>}></Route>
<<<<<<< HEAD
        <Route path="/Login" element={<Login/>}></Route>
=======
        <Route path="/Booking" element={<Booking/>}></Route>
        <Route path="/Payment_info" element={<PaymentInfo/>}></Route>
>>>>>>> e8e6b6ff2c0a304dabd0248e7643b8404533edb5
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}

export default App;