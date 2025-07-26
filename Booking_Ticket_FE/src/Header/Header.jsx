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

    const handleLogin = (type) => {
        navigate("/Login", { state: { type } });
    };

    const handleLogout = () => {
        setUser(null);
        axios.post('http://localhost:8099/auth/logout', {}, {
            withCredentials: true
        }).then(() => {
            console.log("Logout successful");
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
            } else {
                setUser(null);
            }
        } catch (err) {
            setUser(null);
            console.error("Auth failed:", err);
        }
    };

    useEffect(() => {
        handleAuth();
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
                        <select className="form-select" style={{ width: '150px', height: '38px', border: '1px solid black' }}>
                            <option>TP. HCM</option>
                            <option>Hà Nội</option>
                            <option>Đà Nẵng</option>
                        </select>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/')}>Trang chủ</span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/Movies')}>Phim</span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/Theater')}>Rạp</span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/Ranking')}>Xếp hạng phim</span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={handleNavigate('/Member')}>Thành viên</span>
                            <span className="nav-link active" style={{ cursor: 'pointer' }} onClick={() => handleLogin('register')}>Đăng ký thành viên</span>
                        </div>
                    </div>

                    <form className="d-flex justify-content-end" role="search" onSubmit={e => e.preventDefault()}>
                        <input className="form-control me-2" type="search" placeholder="Tìm phim..." aria-label="Search" />
                        <button className="btn btn-primary" type="submit">Tìm</button>
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Header;
