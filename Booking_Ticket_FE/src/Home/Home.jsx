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

function Homepage() {
    const [nowShowing, setNowShowing] = useState(true);
    const navigate = useNavigate();
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
                                    <h5 className={`card-title ${styles.cardTitleCustom}`}>Phimzz {i}</h5>
                                    <p className="card-text">Mô tả ngắn của phim.</p>
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
