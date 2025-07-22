import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.css';
import logo from '../assets/vite-vite-logo.png';
import { useState } from 'react';

function Homepage() {
    const [nowShowing, setNowShowing] = useState(true);

    return (
        <div>
            <div className={styles.topblack}>
                <div className="d-flex justify-content-end align-items-center text-white pe-4" style={{ height: '40px', fontSize: '14px' }}>
                    <p className="mb-0 me-2">Đăng nhập</p>
                    <p className="mb-0">|</p>
                    <p className="mb-0 ms-2">Đăng ký</p>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light shadow">
                <div className="container-fluid d-flex justify-content-start">
                    <a className="navbar-brand ms-3" href="/">
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
                            <a className="nav-link active" href="#">Trang chủ</a>
                            <a className="nav-link" href="#">Phim</a>
                            <a className="nav-link" href="#">Rạp</a>
                            <a className="nav-link" href="#">Xếp hạng phim</a>
                            <a className="nav-link" href="#">Thành viên</a>
                            <a className="nav-link" href="#">Liên hệ</a>
                        </div>
                    </div>
                    
                    <form className="d-flex justify-content-end" role="search">
                        <input className="form-control me-2" type="search" placeholder="Tìm phim..." aria-label="Search" />
                        <button className="btn btn-primary" type="submit">Tìm</button>
                    </form>
                </div>
            </nav>

            <div className={styles.banner}>
                <img src="https://dummyimage.com/1200x400/000/fff&text=Banner+Beta+Cineplex" alt="Banner" className="img-fluid w-100" />
            </div>

            <div className="container mt-5">
                <div className={styles['tab-wrapper']}>
                    <div
                        className={`${styles.tab} ${nowShowing ? styles.active : ''}`}
                        onClick={() => setNowShowing(true)}
                    >
                        Phim đang chiếu
                    </div>
                    <div
                        className={`${styles.tab} ${!nowShowing ? styles.active : ''}`}
                        onClick={() => setNowShowing(false)}
                    >
                        Phim sắp chiếu
                    </div>
                </div>

                {nowShowing ? (
                    <div className="row">
                    {[1, 2, 3, 4].map((i) => (
                        <div className="col-md-3 mb-4" key={i}>
                            <div className="card h-100">
                                <img src={`https://dummyimage.com/300x350/ccc/000&text=Phim+${i}`} className="card-img-top" alt={`Phim ${i}`} />
                                <div className="card-body">
                                    <h5 className="card-title">Phim {i}</h5>
                                    <p className="card-text">Mô tả ngắn của phim.</p>
                                    <a href="#" className="btn btn-primary w-100">Đặt vé</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                ): (
                    <div className="row">
                    {[1, 2, 3, 4].map((i) => (
                        <div className="col-md-3 mb-4" key={i}>
                            <div className="card h-100">
                                <img src={`https://dummyimage.com/300x350/ccc/000&text=Phim+${i}`} className="card-img-top" alt={`Phim ${i}`} />
                                <div className="card-body">
                                    <h5 className="card-title">Phimzz {i}</h5>
                                    <p className="card-text">Mô tả ngắn của phim.</p>
                                    <a href="#" className="btn btn-danger w-100">Đặt vé</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-dark text-white mt-5 p-4 text-center">
                © 2025 Beta Cineplex. All rights reserved.
            </footer>
        </div>
    );
}

export default Homepage;
