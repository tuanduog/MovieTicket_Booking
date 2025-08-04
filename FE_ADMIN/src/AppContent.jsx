// AppContent.jsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Homepage from "./Home/Home";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import Movies from "./Movies/Movies";
import Ranking from "./Ranking/Ranking";
import Theater from "./Theater/Theater";
import Member from "./Member/Member";
import Movie_add from "./Movies/Movie_detail";
import TicketCanelRequest from "./Booking/Booking";
import PaymentInfo from "./Payment/Payment_info";
import Login from "./Auth/Login";
import Up from "./up";
import Filter from "./Search/Filter";
import NavBar from "./NavBar/NavBar";
import Movie_edit from "./Movies/Movies_edit";
import ShowTime from "./Showtime/Showtime";  
import Showtime_add from "./Showtime/Showtime_add";
import Showtime_edit from "./Showtime/Showtime_edit";
import Theater_add from "./Theater/Theater_add";
import Theater_edit from "./Theater/Theater_edit";
function AppContent() {
  const location = useLocation();


  const navigate = useNavigate();
  // Kiểm tra xác thực người dùng
const [user, setUser] = React.useState(null);

 useEffect(() => {
  const checkAuth = async () => {
    try {
      const res = await axios.get('http://localhost:8099/auth/introspect', {
        withCredentials: true,
      });

      if (res.data.status !== 200) {
        navigate('/Login');
        return;
      }

      setUser(res.data);
    } catch (err) {
      console.error('Not authenticated');
      setUser(null);
      navigate('/Login');
    }
  };

  checkAuth();
}, [location.pathname]);

// Chỉ lưu khi user thay đổi
useEffect(() => {
  if (user) {
    localStorage.setItem('user', JSON.stringify({user}));
  }
}, [user]);

  // const existing = localStorage.getItem('user');

  // if (!existing) {
 // }

  
  // Ẩn navbar nếu là trang login
  const shouldHideNavbar = location.pathname === '/Login';
  const shouldHideHeader = location.pathname === '/Login' || location.pathname === '/up';
  return (
    <>
      { !shouldHideHeader &&< Header />}
      { !shouldHideNavbar &&< NavBar />}
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Movies" element={<Movies />} />
        <Route path="/Ranking" element={<Ranking />} />
        <Route path="/Theater" element={<Theater />} />
        <Route path="/Member" element={<Member />} />
        <Route path="/Movie_add" element={<Movie_add />} />
        <Route path="/TicketCanelRequest" element={<TicketCanelRequest />} />
        <Route path="/Payment_info" element={<PaymentInfo />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/up" element={<Up />} />
        <Route path="/Filter" element={<Filter />} />
        <Route path="/Movies_edit" element={<Movie_edit />} />
        <Route path="/Showtime" element={<ShowTime/>}/>
        <Route path="/Showtime_add" element={<Showtime_add/>}/>
        <Route path="/Showtime_edit" element={<Showtime_edit/>}/>
        <Route path="/Theater_add" element={<Theater_add/>}/>
        <Route path="/Theater_edit" element={<Theater_edit/>}/>

      </Routes>
      <Footer />
    </>
  );
}

export default AppContent;
