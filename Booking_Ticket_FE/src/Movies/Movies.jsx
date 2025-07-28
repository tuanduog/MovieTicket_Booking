import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Movies.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function Movies () {
    const [nowShowing, setNowShowing] = useState(true);
    const navigate = useNavigate();

    const [showingNow, setShowingNow] = useState([]);
    const [commingSoon, setCommingSoon] = useState([]);
    const handleMovieDetails = (id) => {
        navigate("/Movie_detail", { state: { id }});
    }
    const fetchMovies = async () => {
        try {
            const res = await axios.get("http://localhost:8099/auth/getAll-movies");
            const s1 = res.data.filter(movie => movie.showing === "Đang chiếu");
            const c1 = res.data.filter(movie => movie.showing === "Sắp chiếu");
            console.log(res.data);
            setShowingNow(s1);
            setCommingSoon(c1);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách phim", error);
        }
    }
    useEffect(() => {
        fetchMovies();
    },[]);
    return (
        <div>
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
                    <div className="row d-flex justify-content-center" style={{ maxWidth: '1400px', gap: '24px' }}>
                    {showingNow.map((movie) => (
                        <div className="col-md-2 mb-4" key={movie.movieId}>
                            <div
                                className="card h-100 shadow-sm border-0"
                                style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease',
                                }}
                            >
                                <img
                                src={movie.image}
                                className="card-img-top"
                                alt={movie.movieName}
                                style={{
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                }}
                                />
                                <div className="card-body px-3 py-2">
<<<<<<< HEAD
                                <h6 className={`card-title pb-2 fw-bold ${styles.ellipsis} `} style={{color: '#0d6efd', cursor: 'pointer'}} onClick={() => handleMovieDetails(movie.movieId)}>
                               
=======
                                <h6 className="card-title pb-2 fw-bold" style={{color: '#0d6efd', cursor: 'pointer'}} onClick={() => handleMovieDetails(movie.movieId)}>
>>>>>>> 82091f1bd45bace2d179e7cdd4a7634b25ca928e
                                    {movie.movieName}
                                </h6>
                            <p className={`mb-1 ${styles.ellipsis}`} style={{ fontSize: '14px' }}>
    <strong>Thể loại:</strong> {movie.genre}
</p>
                                <p className="mb-2" style={{ fontSize: '14px' }}>
                                    <strong>Thời lượng:</strong> {movie.duration}
                                </p>
                                <a href="#" className="btn btn-primary btn-sm w-100 rounded" >
                                    Đặt vé
                                </a>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                ): (
                    <div className="row d-flex justify-content-center" style={{ maxWidth: '1400px', gap: '24px' }}>
                    {commingSoon.map((movie) => (
                        <div className="col-md-2 mb-4" key={movie.movieId}>
                           <div
                                className="card h-100 shadow-sm border-0"
                                style={{
                                borderRadius: '12px',
                                overflow: 'hidden',
                                transition: 'transform 0.3s ease',
                                }}
                            >
                                <img
                                src={movie.image}
                                className="card-img-top"
                                alt={movie.movieName}
                                style={{
                                    height: '300px',
                                    objectFit: 'cover',
                                    borderRadius: '12px',
                                }}
                                />
                                <div className="card-body px-3 py-2">
<<<<<<< HEAD
                                <h6 className={`card-title pb-2 fw-bold ${styles.ellipsis} `} style={{color: '#0d6efd', cursor: 'pointer'}} onClick={() => handleMovieDetails(movie.movieId)}>
                               
=======
                                <h6 className="card-title pb-2 fw-bold" style={{color: '#0d6efd', cursor: 'pointer'}} onClick={() => handleMovieDetails(movie.movieId)}>
>>>>>>> 82091f1bd45bace2d179e7cdd4a7634b25ca928e
                                    {movie.movieName}
                                </h6>
                            <p className={`mb-1 ${styles.ellipsis}`} style={{ fontSize: '14px' }}>
    <strong>Thể loại:</strong> {movie.genre}
</p>
                                <p className="mb-2" style={{ fontSize: '14px' }}>
                                    <strong>Thời lượng:</strong> {movie.duration}
                                </p>
                                <a href="#" className="btn btn-primary btn-sm w-100 rounded" >
                                    Đặt vé
                                </a>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Movies;
