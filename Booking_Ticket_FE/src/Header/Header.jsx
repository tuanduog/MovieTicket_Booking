import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from '../assets/vite-vite-logo.png';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import 'bootstrap-icons/font/bootstrap-icons.css';

function Header() {
    const navigate = useNavigate();
    const handleMovies = () => {
        navigate("/Movies");
    }
    const handleHome = () => {
        navigate("/");
    }
    const handleLogin = () => {
        navigate("/Login");
    }
    const handleRegister = () => {
        navigate("/Login");
        document.querySelector('.right-panel-active').classList.toggle('right-panel-active');
    }
    const handleRanking = () => {
        navigate("/Ranking");
    }
    const handleTheater = () => {
        navigate("/Theater");
    }
    const handleMember = () => {
        navigate("/Member");
    }

    const [user, setUser] = useState(null);
    const handleLogout = () => {
        setUser(null);

        axios.post('http://localhost:8099/auth/logout', {}, {
            withCredentials: true
        }).then(res => {
            console.log("Logout successful");
            navigate('/');
        }).catch(err => {
            console.error("Logout failed", err);
        }
        );
    };
    const handleAuth = async () => {
    try {
        const res = await axios.get('http://localhost:8099/auth/introspect', {
            withCredentials: true
        });
        console.log(res.status);
        if (res.data.status === 200) {
            setUser(res.data);
            console.log("User authenticated:", res.data);
        } else {
            setUser(null);
            console.log(res.data);
        }
    } catch (err) {
        setUser(null);
        console.error(err);
    }
};

 useEffect(() => {
        handleAuth();
    }, [location.pathname]); // Chạy khi đường dẫn thay đổi
    return (
        <div>
             <div className="topblack">
                <div className="d-flex justify-content-end align-items-center text-white pe-4" style={{ height: '40px', fontSize: '14px' }}>
                    {!user ? (
                        <>
                            <p className="mb-0 me-2" style={{cursor: 'pointer'}} onClick={handleLogin}>Đăng nhập</p>
                            <p className="mb-0">|</p>
                            <p className="mb-0 ms-2" style={{cursor: 'pointer'}} onClick={handleRegister}>Đăng ký</p>
                        </>
                    ) : (
                        <div className="dropdown">
                            <span className="mb-0 me-2 fs-6" style={{cursor: 'pointer'}} data-bs-toggle="dropdown">
                            Xin chào {user && user.data && user.data.username ? user.data.username : 'Tài khoản'}! <i className="bi bi-caret-down-fill"></i>

                            </span>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li><button className="dropdown-item" onClick={() => navigate('/profile')}>Thông tin cá nhân</button></li>
                                <li><button className="dropdown-item" onClick={handleLogout}>Đăng xuất</button></li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid d-flex justify-content-start">
                    <a className="navbar-brand ms-3" onClick={handleHome}>
                        <img src={logo} height="50px" alt="Logo" />
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="d-flex align-items-center ms-4 me-4">
                        <select className="form-select" style={{ width: '150px', height: '38px', border: '1px solid black'}}>
                            <option>TP. HCM</option>
                            <option>Hà Nội</option>
                            <option>Đà Nẵng</option>
                        </select>
                    </div>

                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <a className="nav-link active" href="" onClick={handleHome}>Trang chủ</a>
                            <a className="nav-link active" href='' onClick={handleMovies}>Phim</a>
                            <a className="nav-link active" href="" onClick={handleTheater}>Rạp</a>
                            <a className="nav-link active" href="" onClick={handleRanking}>Xếp hạng phim</a>
                            <a className="nav-link active" href="" onClick={handleMember}>Thành viên</a>
                            <a className="nav-link active" href="">Đăng ký thành viên</a>
                        </div>
                    </div>
                    
                    <form className="d-flex justify-content-end" role="search">
                        <input className="form-control me-2" type="search" placeholder="Tìm phim..." aria-label="Search" />
                        <button className="btn btn-primary" type="submit">Tìm</button>
                    </form>
                </div>
            </nav>
        </div>
    );
}

export default Header;
