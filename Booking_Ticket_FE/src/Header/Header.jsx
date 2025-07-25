import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import logo from '../assets/vite-vite-logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const handleMovies = () => {
        navigate("/Movies");
    }
    const handleHome = () => {
        navigate("/");
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
    return (
        <div>
            <div className="topblack">
                <div className="d-flex justify-content-end align-items-center text-white pe-4" style={{ height: '40px', fontSize: '14px' }}>
                    <p className="mb-0 me-2" style={{cursor: 'pointer'}}>Đăng nhập</p>
                    <p className="mb-0">|</p>
                    <p className="mb-0 ms-2" style={{cursor: 'pointer'}}>Đăng ký</p>
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
