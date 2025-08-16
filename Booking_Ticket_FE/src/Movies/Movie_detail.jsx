import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../Movies/Movie_detail.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function Movie_detail() {
    const [showModal, setShowModal] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const [movieInfo, setMovieInfo] = useState([]);
    const [showTrailer, setShowTrailer] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [showDates, setShowDates] = useState([]);
    const [showTime, setShowTime] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState([]);
    const [rating, setRating] = useState(0); // Số sao được chọn
    const [hover, setHover] = useState(0); 
    const savedTheater = JSON.parse(localStorage.getItem('theater'));
    const [showChoseLocation, setShowChoseLocation] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(""); // địa điểm đã chọn
    const [selectedTheater, setselectedTheater] = useState(""); // thông tin các rạp
    const[theater, setTheater] = useState([]);
    const[locations, setLocation] = useState([]);
    // const trailerUrl = "https://www.youtube.com/watch?v=BGS4l3xEc-0";
    // const embedUrl = trailerUrl.replace("watch?v=", "embed/"); // đổei sang link nhúng
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleOpenModal = () => {
        if(localStorage.getItem('theater') === null){
            setShowChoseLocation(true);
            return;
        }
        const select = generateAvailableShowDates(movieInfo.releaseDate, movieInfo.dateShow);
        setShowDates(select);
        setSelectedIndex(0);
        setSelectedDate(select[0]);
        fetchShowTime(movieInfo.movieId);
        setShowModal(true);
    }
    const handleCloseConfirm = () => {
        setConfirmPopup(false);
    }
    const handleOpenConfirm = () => {
        setConfirmPopup(true);
    }
    const handleCloseTrailer = () => {
        setShowTrailer(false);
    }
    const handleBooking = (movieInfo, date, time) => {
        // console.log('Booking:', { movieInfo, date, time });
        const user = sessionStorage.getItem('state');
        const bookingInfo = {
            movieInfo, date, time
        };
        localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
        if(!user){
            navigate("/Login");
        } else {
            localStorage.removeItem('timeLeft');
            navigate('/Booking');
            window.scrollTo(0, 0);
        }
    }

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
            console.error("Fetch locations failed:", err);
        }
    };

    useEffect(() => {
            handleLocations();
    }, [location.pathname]);

    const generateAvailableShowDates = (releasedDateStr, numberOfDays) => {
        const today = new Date();
        const releasedDate = new Date(releasedDateStr);
        const showDates = [];

        const endDate = new Date(releasedDate);
        endDate.setDate(endDate.getDate() + numberOfDays - 1);

        let current = new Date(Math.max(today, releasedDate));

        let count = 0;
        while (current <= endDate && count < 7) {
            const formatted = `${current.getDate().toString().padStart(2, '0')}/${(current.getMonth() + 1)
            .toString()
            .padStart(2, '0')}`;
            showDates.push(formatted);
            current.setDate(current.getDate() + 1);
            count++;
        }

        return showDates;
    };
    const fetchShowTime = async (movieId) => {
            try {
                const res = await axios.get(`http://localhost:8099/auth/get-showtime/${movieId}`);
    
                console.log('showtime:',res.data);
                setShowTime(res.data);
            } catch (error){
                console.error("Lỗi khi lấy phim", error);
            }
    }
    const updateOrCreateRate = async (starValue, movieId) => { //
        const userStr = sessionStorage.getItem('user');
        if(userStr){
            const user = JSON.parse(userStr);
            try {
            const res = await axios.put(`http://localhost:8099/reviews/update-Rate/${movieId}/${user.userId}`, 
                {starValue},
                { withCredentials: true }
            )
                console.log(res.data);
                setRating(starValue);
            } catch(error){
                console.error("Update rate that bai", error);
            }
        } else {
            navigate("/Login");
        }
    }
    const fetchReview = async () => {
        const userStr = sessionStorage.getItem('user');
        if(userStr){
            try {
                const movieId = location.state?.id;
                const user = JSON.parse(userStr);
                const res = await axios.get(`http://localhost:8099/reviews/get-Review/${movieId}/${user.userId}`,
                    { withCredentials: true }
            )
                setRating(res.data.point);
                
            } catch (error) {
                console.error("fetch review that bai", error);
            }
        } else {
            console.log("Chưa đăng nhập");
        }
    }
    useEffect(() => {
        fetchReview();
    },[]);
    const fetchMovie = async () => {
        try {
            const id = location.state?.id;

            const res = await axios.get(`http://localhost:8099/movie/get-movie/${id}`);
            setMovieInfo(res.data);
            console.log(res.data.trailerUrl);
        } catch (error){
            console.error("Lỗi khi lấy thông tin phim:", error);
        }
    }
    useEffect(() => {
        window.scrollTo(0, 0);
        fetchMovie();
    },[]);
    
    return (
        <div className="container mt-5">
        {showChoseLocation && (
                <div className="overlay">
                    <div className="popup">
                        {/* Nút đóng */}
                        <button className="closeBtn" onClick={() => setShowChoseLocation(false)}>
                        &times;
                        </button>

                        {/* Nội dung */}
                        <div className="content">
                        <div className="formRow" style={{ marginBottom: '35px', marginLeft: '20px', marginRight: '20px' }}>
                            <div className="formGroup">
                            <label>Tỉnh/ Thành phố</label>
                            <select
                            style={{ fontSize: '14px'}}
                            value={selectedLocation}
                            onChange={e => {
                                const loc = e.target.value;
                                setSelectedLocation(loc);
                                handleTheater(loc);
                            }}
                            >
                                <option value="">Chọn Tỉnh/ Thành phố</option>
                                {Array.isArray(locations) &&
                                    locations.map((loc, idx) => (
                                    <option key={idx} value={loc}>
                                        {loc}
                                    </option>
                                    ))}
                            </select>
                            </div>

                            <div className="formGroup">
                            <label>Tên rạp</label>
                            <select style={{ fontSize: '14px' }}
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
                                    }));
                                    setShowChoseLocation(false);
                                }

                            }}>
                                <option value="">Chọn rạp</option>
                                {Array.isArray(theater) &&
                                theater.map((theaterItem, idx) => (
                                    <option key={idx} value={theaterItem.theaterId}>
                                    {theaterItem.theaterName}
                                    </option>
                                ))}
                            </select>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            )}
            {showTrailer && (
            <div className="modal-overlay" onClick={handleCloseTrailer}>
                {/* <span className="close-btn fs-3" onClick={handleCloseTrailer}>&times;</span> */}
                <div
                className="modal-box p-3 rounded shadow"
                style={{ maxWidth: '800px', width: '90%' }}
                onClick={(e) => e.stopPropagation()}
                >
                <div className="ratio ratio-16x9">
                    <iframe // nhúng youtube
                    width="100%"
                    height="400"
                    // src={embedUrl}
                    src={movieInfo.trailerUrl}
                    title="YouTube Trailer"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    ></iframe>
                </div>
                </div>
            </div>
            )}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-box p-4 rounded shadow" onClick={(e) => e.stopPropagation()}>
                        <span className="close-btn fs-3" onClick={handleCloseModal}>&times;</span>

                        <h3 className="text-uppercase text-center fw-bold mb-3" style={{ color: '#0d6efd' }}>
                        LỊCH CHIẾU - {movieInfo.movieName}
                        </h3>

                        <h5 className="text-center mb-4 text-secondary">{savedTheater.theaterName}</h5>

                        <div className="date-list d-flex justify-content-center gap-2 flex-wrap mb-4">
                        {showDates.map((dateStr, i) => (
                            <div
                            key={i}
                            onClick={() => {
                                setSelectedIndex(i);
                                setSelectedDate(dateStr);
                            }}
                            className={`date-item px-3 py-2 rounded ${i === selectedIndex ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                            style={{ cursor: 'pointer', minWidth: '60px', textAlign: 'center' }}
                            >
                            {dateStr}
                            </div>
                        ))}
                        </div>


                        <h6 className="text-uppercase fw-bold mb-3 text-muted text-center">2D Phụ Đề</h6>

                        <div className="showtimes d-flex flex-wrap gap-3 justify-content-center">
                            {showTime.length === 0 ? (
                                <div>Không có lịch chiếu</div>
                            ) : (
                                showTime.map((time, index) => (
                                    <div
                                        key={index}
                                        className="showtime"
                                        onClick={() => {
                                            handleOpenConfirm();
                                            setSelectedTime(time);
                                        }}
                                    >
                                        <div className="time fw-bold fs-5 mb-1">
                                            {time.startTime.slice(0, 5)} {/* Format HH:mm */}
                                        </div>
                                        <div className="seats text-muted" style={{fontSize: '13px'}}>91 ghế ngồi</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
            {confirmPopup && (
                <div className="modal-overlay" onClick={handleCloseConfirm}>
                <div className="modal-box p-4 rounded shadow" onClick={(e) => e.stopPropagation()}>
                    <span className="close-btn fs-3" onClick={handleCloseConfirm}>&times;</span>

                    <h5 className="text-center text-uppercase mt-3 mb-2 text-muted">
                    Bạn đang đặt vé xem phim
                    </h5>
                    <h3 className="text-center text-primary fw-bold mb-4">
                    {movieInfo.movieName || "Tên phim"}
                    </h3>

                    <table className="table table-bordered text-center align-middle shadow-sm mb-4">
                    <thead className="table-light">
                        <tr>
                        <th>Rạp chiếu</th>
                        <th>Ngày chiếu</th>
                        <th>Giờ chiếu</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td><strong>{savedTheater.theaterName}</strong></td>
                        <td><strong>{selectedDate}/2025</strong></td>
                        <td><strong>{selectedTime.startTime.slice(0, 5)}</strong></td>
                        </tr>
                    </tbody>
                    </table>

                    <div className="text-center">
                    <button
                        className="btn btn-success px-5 py-2 fw-bold"
                        onClick={() => handleBooking(movieInfo, selectedDate, selectedTime)}
                    >
                        ĐỒNG Ý
                    </button>
                    </div>
                </div>
            </div>
            )}

            <div className="row">
                <div className="col-md-3">
                    <img src={movieInfo.image} alt="Poster phim" className="img-fluid rounded shadow" />
                </div>

                <div className="col-md-9">
                    <h2 className="mb-3">Tên phim: {movieInfo.movieName}</h2>
                    <p><strong>Thể loại:</strong> {movieInfo.genre}</p>
                    <p><strong>Thời lượng:</strong> {movieInfo.duration}</p>
                    <p><strong>Khởi chiếu:</strong> {new Date(movieInfo.releaseDate).toLocaleDateString('vi-VN')}</p>
                    <p><strong>Đạo diễn:</strong> {movieInfo.director}</p>

                    <div>
                        <strong>Nội dung:</strong><br />
                        <p style={{fontSize: '15px', paddingTop: '4px'}}>{movieInfo.movieDescription}</p>
                    </div>
                    <div style={{ display: "inline-block" }}>
                    <span
                        style={{
                        fontWeight: "600",
                        fontSize: "16px",
                        color: "#333",
                        marginRight: "10px",
                        }}
                    >
                        Đánh giá phim:
                    </span>
                    {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        const isFilled = starValue <= (hover || rating);

                        return (
                        <i
                            key={index}
                            className={`fa-${isFilled ? "solid" : "regular"} fa-star`}
                            style={{
                            fontSize: "22px",
                            marginRight: "5px",
                            cursor: "pointer",
                            color: isFilled ? "gold" : "gray",
                            }}
                            onClick={() => updateOrCreateRate(starValue, movieInfo.movieId)}
                            onMouseEnter={() => setHover(starValue)}
                            onMouseLeave={() => setHover(0)}
                        ></i>
                        );
                    })}
                    </div>

                    <div className="mt-4 d-flex gap-3">
                        <button className="btn btn-primary" onClick={handleOpenModal}>
                            Đặt vé ngay
                        </button>
                        <a className="btn btn-outline-danger" onClick={() => setShowTrailer(true)}>
                            🎬 Xem trailer
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-5 p-4 rounded shadow" style={{ backgroundColor: '#f8f9fa' }}>
                <h4 className="mb-3">Bình luận</h4>
                <div className="mt-4">
                    <div className="row d-flex justify-content-center ps-5 pe-5">
                        <div className="col-12">
                            <div className="card">
                            <div className="card-body p-4">

                                <div className="row">
                                <div className="col">
                                    <div className="d-flex flex-start">
                                    <img className="rounded-circle shadow-1-strong me-3"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" width="65"
                                        height="65" />
                                    <div className="flex-grow-1 flex-shrink-1">
                                        <div>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <p className="mb-1">
                                            Bình gold <span className="small">- 2 giờ trước</span>
                                            </p>
                                        </div>
                                        <p className="small mb-0">
                                            Phim này thật sự rất hay
                                        </p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <a href="" className="link-muted me-2"><i className="fa-regular fa-s fa-thumbs-up"></i>132</a>
                                                <a href="" className="link-muted ps-2"><i className="fa-regular fa-thumbs-down"></i>15</a>
                                            </div>
                                            <a href=""><i className="fas fa-reply fa-xs"></i><span className="small"> Phản hồi</span></a>
                                        </div>
                                        </div>

                                        <div className="d-flex flex-start mt-4">
                                        <a className="me-3" href="#">
                                            <img className="rounded-circle shadow-1-strong"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp" alt="avatar"
                                            width="65" height="65" />
                                        </a>
                                        <div className="flex-grow-1 flex-shrink-1">
                                            <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                Hiếu thứ hai <span className="small">- 3 giớ trước</span>
                                                </p>
                                            </div>
                                            <p className="small mb-0">
                                                Phim thể hiện được cho câu nói "Trình là gì?" 
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <a href="" className="link-muted me-2"><i className="fa-regular fa-thumbs-up"></i>132</a>
                                                <a href="" className="link-muted ps-2"><i className="fa-regular fa-thumbs-down"></i>15</a>
                                            </div>
                                            <a href=""><i className="fas fa-reply fa-xs"></i><span className="small"> Phản hồi</span></a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>

                                        <div className="d-flex flex-start mt-4">
                                        <a className="me-3" href="#">
                                            <img className="rounded-circle shadow-1-strong"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar"
                                            width="65" height="65" />
                                        </a>
                                        <div className="flex-grow-1 flex-shrink-1">
                                            <div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <p className="mb-1">
                                                Trịnh Trần Phương Tuấn (Meo meo) <span className="small">- 4 giớ trước</span>
                                                </p>
                                            </div>
                                            <p className="small mb-0">
                                                Phim này làm tôi rất cảm động, thấm đãm tình phụ tử, dù trong hoàn cảnh ngàn cân treo sợi
                                                tóc vẫn lo cho con, ko bỏ rơi con
                                            </p>
                                            <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <a href="" className="link-muted me-2"><i className="fa-regular fa-thumbs-up"></i>132</a>
                                                <a href="" className="link-muted ps-2"><i className="fa-regular fa-thumbs-down"></i>15</a>
                                            </div>
                                            <a href=""><i className="fas fa-reply fa-xs"></i><span className="small"> Phản hồi</span></a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className='mt-4 ms-5 me-5'></hr>
                <form className='mt-4 ps-5 pe-5'>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="3"
                            placeholder="Viết bình luận của bạn..."
                        ></textarea>
                    </div>
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className="btn btn-primary">Gửi bình luận</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Movie_detail;
