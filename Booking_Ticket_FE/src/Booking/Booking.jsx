import React from "react";
import '../Booking/Booking.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Booking () {
    const navigate = useNavigate();
    const [movieInfo, setMovieInfo] = useState({});
    const [time, setTime] = useState({});
    const [date, setDate] = useState("");
    const [selectedSeat, setSelectedSeat] = useState([]);
    const savedTheater = JSON.parse(localStorage.getItem('theater'));
    useEffect(() => {
        window.scrollTo(0, 0);
        const data = JSON.parse(localStorage.getItem('bookingInfo'));
        console.log('Data from localStorage:', data);
        if (data) {
            setMovieInfo(data.movieInfo);
            setTime(data.time);
            setDate(data.date);
        }
    }, []);
    const seatTypes = {
        vip: ['D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'E6', 'E7', 'E8', 'E9']
    };

    const getSeatType = (seat) => {
        const row = seat.charAt(0);
        if (seatTypes.vip.includes(seat)) return 'vip';
        if (row === 'G') return 'couple';
        return 'normal';
    };
    const handleSeatSelection = (seatNumber) => {
        setSelectedSeat((prev) => {
            const isSelected = prev.includes(seatNumber);

            if (isSelected) {
                return prev.filter(seat => seat !== seatNumber);
            } else {
                if (prev.length >= 8) {
                    alert("Bạn chỉ được chọn tối đa 8 ghế.");
                    return prev;
                }

                return [...prev, seatNumber];
            }
            }
        );
    }
    const handlePaymentInfo = () => {
        navigate("/Payment_info");
    }

    return (
        <div className="container mt-4">
            <div className="d-flex flex-wrap p-4 ticket-booking-container gap-5 justify-content-center">
                
                {/* Khu vực chọn ghế */}
                <div className="seating-layout">
                    <div className="screen text-center mb-4">MÀN HÌNH CHIẾU</div>

                    <div className="seat-grid">
                        {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((row) => (
                            <div className="seat-row" key={row}>
                                {Array.from({ length: 14 }, (_, i) => {
                                    const seatNumber = `${row}${i + 1}`;
                                    const seatIndex = i + 1;
                                    const type = getSeatType(seatNumber);

                                    if (type === 'couple' && seatIndex % 2 === 0) return null;

                                    return (
                                        <div
                                            key={seatNumber}
                                            className={`seat ${type} ${selectedSeat.includes(seatNumber) ? 'selected' : ''}`}
                                            onClick={() => handleSeatSelection(seatNumber)}
                                            style={{ cursor: 'pointer', ...(type === 'couple' ? { width: '80px' } : {}) }}
                                        >
                                            {seatNumber}
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    <div className="legend mt-4">
                        <h6 className="mb-2 fw-bold col-2">Loại ghế:</h6>
                        <div className="d-flex flex-wrap gap-4">
                            <div>
                                <span className="seat normal me-2"></span> 
                                Ghế thường  <span className="text-muted">( 70.000 VNĐ )</span>
                            </div>
                            <div>
                                <span className="seat vip me-2"></span> 
                                Ghế VIP <span className="text-muted">( 90.000 VNĐ )</span>
                            </div>
                            <div>
                                <span className="seat couple me-2"></span> 
                                Ghế đôi <span className="text-muted">( 150.000 VNĐ )</span>
                            </div>
                        </div>
                    </div>
                    <div className="legend mt-4">
                        <h6 className="mb-3 fw-bold col-2">Tình trạng:</h6>
                        <div className="d-flex flex-wrap gap-3">
                            <div><span className="seat empty"></span> Ghế trống</div>
                            <div><span className="seat selected"></span> Đang chọn</div>
                            <div><span className="seat sold"></span> Đã bán</div>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between mt-4 px-2">
                        <div>
                            <p className="fw-bold mb-1">Tổng tiền</p>
                            <h5 className="text-primary">0 VNĐ</h5>
                        </div>
                        <div>
                            <p className="fw-bold mb-1">Thời gian còn lại</p>
                            <h5 className="text-success">6:03</h5>
                        </div>
                    </div>
                </div>

                {/* Khu vực thông tin phim */}
                <div className="ticket-summary">
                    <img src={movieInfo.image} className="img-fluid mb-3 rounded" alt="Poster" width={220} />
                    <h5 className="fw-bold text-primary fs-3 mb-2">{movieInfo.movieName}</h5>
                    <p className="text-muted fst-italic mb-3"><strong>2D Phụ đề</strong></p>
                    <ul className="list-unstyled lh-lg">
                        <li><strong className="text-dark">Thể loại:</strong> {movieInfo.genre}</li>
                        <li><strong className="text-dark">Thời lượng:</strong> {movieInfo.duration}</li>
                        <li><strong className="text-dark">Rạp chiếu:</strong> {savedTheater.theaterName}</li>
                        <li><strong className="text-dark">Ngày chiếu:</strong> {date}/2025</li>
                        <li><strong className="text-dark">Giờ chiếu:</strong> {time?.startTime?.slice(0, 5)}</li>
                        <li><strong className="text-dark">Phòng chiếu:</strong> {time?.roomName?.roomName}</li>
                        <li><strong className="text-dark">Ghế ngồi:</strong> 
                            {selectedSeat.length === 0 ? (
                                <span className="badge bg-secondary"></span>
                            ) : (
                                <div className="mt-2">
                            {[...Array(Math.ceil(selectedSeat.length / 4))].map((_, rowIndex) => (
                                <div className="d-flex flex-wrap mb-1" key={rowIndex}>
                                {selectedSeat
                                    .slice(rowIndex * 4, rowIndex * 4 + 4)
                                    .map((seat) => (
                                    <span
                                        key={seat}
                                        className="badge bg-secondary me-2"
                                        style={{ width: '45px', textAlign: 'center' }}
                                    >
                                        {seat}
                                    </span>
                                    ))}
                                </div>
                            ))}
                            </div>
                            )}
                        </li>
                    </ul>
                    <hr />
                    <button className="btn btn-primary w-100 mt-2" onClick={handlePaymentInfo}>TIẾP TỤC</button>
                </div>
            </div>
        </div>
    );
}

export default Booking;
