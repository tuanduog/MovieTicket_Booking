import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './Home.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import banner1 from '../assets/banner1.png';
import banner2 from '../assets/banner2.png';
import banner3 from '../assets/banner3.png';
import banner4 from '../assets/banner4.png';
import banner5 from '../assets/banner5.png';
import axios from 'axios';
import { useEffect } from 'react';

function Homepage() {
    const [nowShowing, setNowShowing] = useState(true);
    const navigate = useNavigate();

    const [showingNow, setShowingNow] = useState([]);
    const [commingSoon, setCommingSoon] = useState([]);
    const handleMovieDetails = () => {
        navigate("/Movie_detail");
    }

    const banners = [
    {
      id: 1,
      url: banner1,
    },
    {
      id: 2,
      url: banner2,
    },
    {
      id: 3,
      url: banner3,
    },
    {
        id: 4,
        url: banner4,
    }
    ,{
        id: 5,
        url: banner5,
    }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 4000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    }
    const fetchMovies = async () => {
        try {
            const res = await axios.get("http://localhost:8080/auth/getAll-movies");
        
            const s1 = res.data.filter(movie => movie.showing === "Đang chiếu");
            const c1 = res.data.filter(movie => movie.showing === "Sắp chiếu");

            setShowingNow(s1);
            setCommingSoon(c1);
        } catch (error) {
            console.error("Lỗi khi lấy danh sách phim", error);
        }
    }
    useEffect(() => {
        fetchMovies();
    })

    return (
        <div>
            <div className={styles.banner}>
            <Slider {...settings}>
                {banners.map((item) => (
                <div key={item.id}>
                    <img
                    src={item.url}
                    alt={`Banner ${item.id}`}
                    className="img-fluid w-100"
                    />
                </div>
                ))}
            </Slider>
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
                    {showingNow.map((movie) => (
                        <div className="col-md-3 mb-4" key={movie.movieId}>
                            <div className="card h-100">
                                <img src={`https://dummyimage.com/300x350/ccc/000&text=Phim`} className="card-img-top"/>
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.cardTitleCustom}`}>{movie.movieName}</h5>
                                    <p style={{margin: '0px', padding: '0px'}}>Thể loại: {movie.genre}</p>
                                    <p>Thời lượng: {movie.duration}</p>
                                    <a href="#" className="btn btn-primary w-100">Đặt vé</a>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                ): (
                    <div className="row">
                    {commingSoon.map((movie) => (
                        <div className="col-md-3 mb-4" key={movie.movieId}>
                            <div className="card h-100">
                                <img src={`https://dummyimage.com/300x350/ccc/000&text=Phim`} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className={`card-title ${styles.cardTitleCustom}`}>{movie.movieName}</h5>
                                    <p style={{margin: '0px', padding: '0px'}}>Thể loại: {movie.genre}</p>
                                    <p>Thời lượng: {movie.duration}</p>
                                    <a href="#" className="btn btn-primary w-100">Đặt vé</a>
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

export default Homepage;
