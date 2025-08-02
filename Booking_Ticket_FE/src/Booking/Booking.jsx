import React from "react";
import '../Booking/Booking.css';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useRef } from "react";
import axios from "axios";

function Booking () {
    const navigate = useNavigate();
    const [movieInfo, setMovieInfo] = useState({});
    const [time, setTime] = useState({});
    const [date, setDate] = useState("");
    const [selectedSeat, setSelectedSeat] = useState([]);
    const [othersSelecting, setOthersSelecting] = useState([]);
    const stompClient = useRef(null); // Dùng useRef để giữ stompClient ổn định
    const savedTheater = JSON.parse(localStorage.getItem("theater"));
    const [user, setUser] = useState("");
    const [timeLeft, setTimeLeft] = useState(() => {
        const storedTime = localStorage.getItem('timeLeft');
        return storedTime ? parseInt(storedTime, 10) : 600;
    });
    

    const seatPrices = {
        normal: 70000,
        vip: 100000,
        couple: 130000
    };

    const calculateTotal = () => {
        return selectedSeat.reduce((total, seat) => {
            const type = getSeatType(seat);
            return total + (seatPrices[type] || 0);
        }, 0);
    };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    useEffect(() => {
        const chairString = selectedSeat.join(', ');
        localStorage.setItem('chairString', chairString);
    }, [selectedSeat]);
    
    useEffect(() => {
    window.scrollTo(0, 0);
    const data = JSON.parse(localStorage.getItem("bookingInfo"));
    if (data) {
        setMovieInfo(data.movieInfo);
        setTime(data.time);
        setDate(data.date);
    }
    
    const fetchAuthAndConnect = async () => {
        try {
            const res = await axios.get('http://localhost:8099/auth/introspect', {
                withCredentials: true,
            });
            console.log("cc:", res.data.data?.username)
            if (res.data.status === 200 && res.data.data?.username) {
                console.log('kk',res.data.data)
                setUser(res.data.data);
                const socket = new SockJS("http://localhost:8099/wsocket");
                const client = new Client({
                    webSocketFactory: () => socket,
                    reconnectDelay: 5000,
                    debug: str => console.log("WebSocket Debug:", str),
                });

                client.onConnect = () => {
                    console.log("WebSocket connected");
                    client.subscribe(`/topic/seats/${data.time.showTimeId}`, (message) => {
                        const payload = JSON.parse(message.body);
                        if (payload.seat) {
                            setOthersSelecting((prev) => {
                                if (!prev.includes(payload.seat)) {
                                    return [...prev, payload.seat];
                                }
                                return prev;
                            });
                        }
                    });
                };

                client.activate();
                stompClient.current = client;
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("Auth failed:", err);
            setUser(null);
        }
    };

    fetchAuthAndConnect();

    return () => {
        console.log("Cleanup: WebSocket disconnecting...");
        stompClient.current?.deactivate();
    };
    }, []);
    useEffect(() => {
        if (timeLeft <= 0) {
            localStorage.removeItem("timeLeft");
            navigate("/");
        } else {
            localStorage.setItem('timeLeft', timeLeft);
        }

        const interval = setInterval(() => {
            setTimeLeft(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval); 
    }, [timeLeft]);

    const seatTypes = {
        vip: ['C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'D6', 'D7', 'D8', 'D9']
    };

    const getSeatType = (seat) => {
        const row = seat.charAt(0);
        if (seatTypes.vip.includes(seat)) return "vip";
        if (row === "G") return "couple";
        return "normal";
    };

    const handleSeatSelection = (seatNumber) => {
        setSelectedSeat((prev) => {
            const isSelected = prev.includes(seatNumber);
            let newSeats;

            if (isSelected) {
                newSeats = prev.filter(seat => seat !== seatNumber);
            } else {
                if (prev.length >= 8) {
                    setTimeout(() => {
                        alert("Bạn chỉ được chọn tối đa 8 ghế.");
                    }, 0);
                    return prev;
                }
                newSeats = [...prev, seatNumber];
            }
            if (
                stompClient.current &&
                stompClient.current.connected &&
                time?.showTimeId &&
                user?.userName
            ) {
                stompClient.current.publish({
                    destination: `/app/selectSeat/${time.showTimeId}`,
                    body: JSON.stringify({
                        seatCode: seatNumber,
                        showTimeId: time.showTimeId,
                        userName: user.userName,
                    }),
                });
            }

            return newSeats;
        });
    };

    const handlePaymentInfo = () => {
        if(selectedSeat.length > 0){
            const seatTypeList = selectedSeat.map(seat => getSeatType(seat));
            navigate("/Payment_info", {
            state: {
                total: calculateTotal(),
                // formattedTotal: calculateTotal().toLocaleString('vi-VN'),
                selectedSeats: selectedSeat,
                seatTypes: seatTypeList
            }
        });
        window.scrollTo(0, 0);
        } else {
            alert("Vui lòng chọn ít nhất 1 ghế");
        }
    };
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
                                            className={`seat ${type} ${
                                                selectedSeat.includes(seatNumber) 
                                                ? 'selected'
                                                : othersSelecting.includes(seatNumber)
                                                ? 'selecting'
                                                : ''}`}
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
                                Ghế VIP <span className="text-muted">( 100.000 VNĐ )</span>
                            </div>
                            <div>
                                <span className="seat couple me-2"></span> 
                                Ghế đôi <span className="text-muted">( 130.000 VNĐ )</span>
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
                            <h5 className="text-primary">{calculateTotal().toLocaleString('vi-VN')} VNĐ</h5>
                        </div>
                        <div>
                            <p className="fw-bold mb-1">⏳ Thời gian còn lại</p>
                            <h5 className="text-success">{formatTime(timeLeft)}</h5>
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
