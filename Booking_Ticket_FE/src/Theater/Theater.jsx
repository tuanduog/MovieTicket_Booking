import React, { useEffect, useState } from "react";
import styles from "../Theater/Theater.module.css";
import cinemaImg from "../assets/rap.jpg";
import movie1 from "../assets/connitquy.jpg";
import movie2 from "../assets/lamgiauvoima.jpg";
import movie3 from "../assets/bikipluyenrong.jpg";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Theater() {
  const [theater, setTheater] = useState(JSON.parse(localStorage.getItem('theater')));

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedTheater = JSON.parse(localStorage.getItem('theater'));
      setTheater(updatedTheater);
    }, 500);
    return () => clearInterval(interval);
  })
  
  return (
    <div className={`container ${styles.wrapper} d-flex justify-content-center`}>
      <div className="row w-100" style={{ maxWidth: "1200px" }}>
        {/* Bên trái: Thông tin rạp */}
        <div className="col-lg-7 col-md-12 mb-4">
          <h2 className={`${styles.title}`}>{theater.theaterName}, {theater.theaterLocation}</h2>
          <img src={cinemaImg} alt="Beta Cinema" className={`img-fluid ${styles.cinemaImg}`} />
          <p className={styles.justify}>
            <strong>Rạp <em>{theater.theaterName}</em></strong> sở hữu nhiều phòng chiếu hiện đại, hàng trăm ghế ngồi với phong cách kiến trúc trẻ trung, năng động, phù hợp với xu hướng giải trí hiện đại. Giá vé hợp lý, chỉ từ 45.000đ.
          </p>
          <p className={styles.justify}>
            Nằm tại vị trí thuận tiện di chuyển, <strong><em>{theater.theaterName}</em></strong> là điểm đến lý tưởng dành cho giới trẻ nhờ không gian đẹp, dịch vụ tiện nghi và chất lượng hình ảnh, âm thanh đạt tiêu chuẩn quốc tế. Rạp được trang bị hệ thống màn chiếu và máy chiếu kỹ thuật số tiên tiến, mang lại trải nghiệm điện ảnh sống động và chân thực cho mọi khán giả.
          </p>

        </div>

        {/* Bên phải: Phim đang hot */}
        <div className="col-lg-5 col-md-12">
          <h3 className={`${styles.hotTitle} text-center mb-4`}>PHIM ĐANG HOT</h3>
          <div className="row">
            <div className="col-6 d-flex flex-column align-items-center">
              <div className={styles.movieCard}>
                <img src={movie1} alt="Mang Me Di Bo" className={`img-fluid ${styles.movieImg}`} />
                <p className={styles.movieName}>Con Nít Quỷ</p>
              </div>
            </div>
            <div className="col-6 d-flex flex-column align-items-center">
              <div className={styles.movieCard}>
                <img src={movie2} alt="Toan Tri Doc Gia" className={`img-fluid ${styles.movieImg}`} />
                <p className={styles.movieName}>Làm Giàu Với Ma 2</p>
              </div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-6 d-flex flex-column align-items-center">
              <div className={styles.movieCard}>
                <img src={movie3} alt="Toan Tri Doc Gia" className={`img-fluid ${styles.movieImg}`} />
                <p className={styles.movieName}>Bí Kíp Luyện Rồng</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theater;
