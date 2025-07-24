import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Movies.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Movies () {
    const [nowShowing, setNowShowing] = useState(true);
    const navigate = useNavigate();
    const handleMovieDetails = () => {
        navigate("/Movie_detail");
    }
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
                    <div className="row">
                    {[1, 2, 3, 4].map((i) => (
                        <div className="col-md-3 mb-4" key={i}>
                            <div className="card h-100">
                                <img src={`https://dummyimage.com/300x350/ccc/000&text=Phim+${i}`} className="card-img-top" alt={`Phim ${i}`} />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.cardTitleCustom}`} onClick={handleMovieDetails}>Phim {i}</h5>
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
        </div>
    );
}

export default Movies;
