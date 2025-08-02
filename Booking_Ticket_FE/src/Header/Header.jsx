import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Header.css';
import logo from '../assets/vite-vite-logo.png';

function Header() {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(null);

    const [name, setName] = useState('');

    const handleLogin = (type) => {
        navigate("/Login", { state: { type } });
    };

    const handleFilter = (e) => {
        e.preventDefault();
        navigate("/Filter", { state: { name } });
    };

    const[theater, setTheater] = useState([]);
    const[locations, setLocation] = useState([]);
    const handleTheater = async (location) => {
        const url = `http://localhost:8099/theaters/getTheaterByLocation?Location=${encodeURIComponent(location)}`;
        try {
            const res = await axios.get(url, {
                withCredentials: true
            });
            if (res.data.status === 200) {
                setTheater(res.data.data);
                // thông tin rạp
            } else {
                setTheater([]);
            }
        } catch (err) {
            setTheater([]);
            console.error("Fetch theaters failed:", err);
        }
    };

     const handleLocations = async () => {
        try {
            const res = await axios.get('http://localhost:8099/theaters/getLocations', {
                withCredentials: true
            });
            if (res.data.status === 200) {
                setLocation(Array.isArray(res.data.data) ? res.data.data : []);
                // địa điểm rạp
                console.log(res.data.data);
            } else {
                setLocation([]);
            }
        } catch (err) {
            setUser(null);
            console.error("Fetch locations failed:", err);
        }
    };

    const handleLogout = () => {
        setUser(null);
        axios.post('http://localhost:8099/auth/logout', {}, {
            withCredentials: true
        }).then(() => {
            console.log("Logout successful");
            localStorage.removeItem('state');
            navigate('/');
        }).catch(err => {
            console.error("Logout failed", err);
        });
    };

    const handleAuth = async () => {
        try {
            const res = await axios.get('http://localhost:8099/auth/introspect', {
                withCredentials: true
            });
            console.log("Auth response:", res.data);

            if (res.data.status === 200) {
                setUser(res.data); // Dữ liệu user nằm ngay trong res.data
                localStorage.setItem('user', JSON.stringify(res.data.data));
            } else {
                setUser(null);
            }
        } catch (err) {
            setUser(null);
            console.error("Auth failed:", err);
        }
    };
    const [selectedLocation, setSelectedLocation] = useState(""); // địa điểm đã chọn
    const [selectedTheater, setselectedTheater] = useState(""); // thông tin các rạp

    useEffect(() => {
        handleAuth();
        handleLocations();
    }, [location.pathname]);

    const handleNavigate = (path) => () => navigate(path);

    return (
        <div>
            {/* Topbar */}
            <div className="topblack">
                <div className="d-flex justify-content-end align-items-center text-white pe-4" style={{ height: '40px', fontSize: '14px' }}>
                    {!user ? (
                        <>
                            <p className="mb-0 me-2" style={{ cursor: 'pointer' }} onClick={() => handleLogin('login')}>Đăng nhập</p>
                            <p className="mb-0">|</p>
                            <p className="mb-0 ms-2" style={{ cursor: 'pointer' }} onClick={() => handleLogin('register')}>Đăng ký</p>
                        </>
                    ) : (
                        <div className="dropdown">
                            <span className="mb-0 me-2 fs-6" style={{ cursor: 'pointer' }} data-bs-toggle="dropdown">
                                Xin chào {user && user.data && user.data.username ? user.data.username : 'Tài khoản'}! <i className="bi bi-caret-down-fill"></i>
                            </span>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><button className="dropdown-item" onClick={handleNavigate('/profile')}>Thông tin cá nhân</button></li>
                                <li><button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            {/* Navbar */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid d-flex justify-content-start">
                    <span className="navbar-brand ms-3" style={{ cursor: 'pointer' }} onClick={handleNavigate('/')}>
                        <img src={logo} height="50px" alt="Logo" />
                    </span>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>

 <div className="d-flex align-items-center ms-4 me-4">
  {/* Dropdown chọn location - Ẩn nếu đã chọn rạp */}
  {!selectedTheater && (
    <select
      className="form-select"
      style={{ width: '150px', height: '38px', border: '1px solid black' }}
      value={selectedLocation}
      onChange={e => {
        const loc = e.target.value;
        setSelectedLocation(loc);
        handleTheater(loc);
      }}
    >
      <option value="">Chọn địa điểm</option>
      {Array.isArray(locations) &&
        locations.map((loc, idx) => (
          <option key={idx} value={loc}>
            {loc}
          </option>
        ))}
    </select>
  )}

  {/* Dropdown chọn rạp */}
  {theater.length > 0 && (
    <div className="ms-4">
      <select
        className="form-select"
        style={{ width: '180px', height: '38px', border: '1px solid black' }}
        value={selectedTheater}
        onChange={e => {
            const selectedValue = e.target.value;
            setselectedTheater(selectedValue);

            const selectedObj = theater.find(t => t.theaterId.toString() === selectedValue);
            if(selectedObj){
                localStorage.setItem('theater', JSON.stringify({
                    theaterId: selectedObj.theaterId,
                    theaterName: selectedObj.theaterName,
                    theaterLocation: selectedObj.theaterLocation
                }))
            }
            }
        }
      >
        <option value="">Chọn rạp</option>
        {Array.isArray(theater) &&
          theater.map((theaterItem, idx) => (
            <option key={idx} value={theaterItem.theaterId}>
              {theaterItem.theaterName}
            </option>
          ))}
      </select>
    </div>
  )}
</div>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/')}>Trang chủ</span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/Movies')}>Phim</span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/Theater')}>Rạp</span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/Ranking')}>Xếp hạng phim</span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/Member')}>Hội viên</span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/Booking_history')}>Lịch sử đặt vé</span>
                        </div>
                    </div>

                    <form className="d-flex justify-content-end" role="search" onSubmit={handleFilter}>
                        <input className="form-control me-2" type="search" placeholder="Tìm phim..." aria-label="Search"  value={name}
    onChange={(e) => setName(e.target.value)} />
                        <button className="btn btn-primary" type="submit">Tìm</button>
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Header;
