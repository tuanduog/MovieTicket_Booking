import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

function History() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const user = JSON.parse(localStorage.getItem('user') || "null");
    const bookingInfo = JSON.parse(localStorage.getItem('bookingInfo') || "null");
    const combos = localStorage.getItem('selectedCombos') || '';
    const totalPrice = localStorage.getItem("price");
    const chair = localStorage.getItem('chairString');
    const status = query.get("status");
    const cancel = query.get("cancel");
    const code = query.get("code");

    const [bookings, setBookings] = useState([]);

    let showTimeId = null;
    let date = null;
    let formattedDate = null;
    if(bookingInfo){
        showTimeId = bookingInfo.time?.showTimeId;
        date = bookingInfo.date;
        const [day, month] = date.split("/").map(Number);
        const year = new Date().getFullYear();
        formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    }

    const new_booking = user && bookingInfo ? {
        chair: chair,
        totalPrice: totalPrice,
        combo: combos,
        date: formattedDate,
        user: {
            userId: user.userId
        },
        showTime: {
            showTimeId: showTimeId
        }
    } : null;

    const [hasAdded, setHasAdded] = useState(false);

    useEffect(() => {
        const addBooking = async () => {
            if (hasAdded && !new_booking) return;
            if (status === "PAID" && cancel === "false" && code === "00") {
                try {
                    const checkRes = await axios.get(`http://localhost:8099/booking/check-booking`, {
                        params: {
                            userId: user.userId,
                            showTimeId: showTimeId,
                            chair: chair
                        },
                        withCredentials: true
                    });

                    if (checkRes.data === false) {
                        const res = await axios.post(
                            "http://localhost:8099/booking/add-booking",
                            new_booking,
                            { withCredentials: true }
                        );
                        if (res.status === 200) {
                            console.log("Đặt vé thành công:", res.data);
                            setHasAdded(true);
                            window.location.reload();
                        }
                    } else {
                        console.warn("Vé đã được đặt trước đó.");
                    }
                } catch (error) {
                    console.error("Add booking failed:", error);
                }
            } else {
                console.warn("Thanh toán không hợp lệ, không thêm booking.");
            }
        };

        addBooking();
    }, [hasAdded]);


    useEffect(() => {
        const fetchBooking = async () => {
            try {
                const res = await axios.get(`http://localhost:8099/booking/get-userbooking/${user.userId}`,
                    { withCredentials: true }
                );
                setBookings(res.data);
            } catch (error) {
                console.error("Get user booking failed", error);
            }
        };

        fetchBooking();
    }, []);

    return (
        <div className="container mt-5" style={{paddingBottom: (bookings.length === 1 || bookings.length === 0) ? '170px' : '0px'}}>
            <h2 className="mb-4 fw-bold text-primary">Lịch sử đặt vé</h2>

            {bookings.map((booking) => (
                <div key={booking.bookingId} className="card mb-4 shadow border-0" style={{ backgroundColor: "#e6f4ea" }}>
                    <div className="row g-0 align-items-center">
                        <div className="col-md-3 p-3 text-center">
                            <img
                                src={booking.movieImage}
                                alt="picture"
                                className="img-fluid rounded shadow-sm"
                                style={{ maxHeight: "150px", objectFit: "cover" }}
                            />
                        </div>

                        <div className="col-md-7 p-3">
                            <h5 className="fw-bold text-dark mb-3" style={{ fontSize: "1.25rem" }}>
                                {booking.movieName}
                            </h5>
                            <div className="row text-dark">
                                <div className="col-6 mb-2">
                                    <p className="mb-1"><strong>Rạp:</strong> {booking.theaterName}, {booking.theaterLocation}</p>
                                    <p className="mb-1"><strong>Phòng:</strong> {booking.roomName}</p>
                                    <p className="mb-1"><strong>Ghế:</strong> {booking.chair}</p>
                                </div>
                                <div className="col-6 mb-2">
                                    <p className="mb-1"><strong>Suất chiếu:</strong> {booking.startTime} - {booking.date}</p>
                                    <p className="mb-1"><strong>Combo:</strong> {booking.combo}</p>
                                    <p className="mb-1"><strong>Giá vé:</strong> {booking.totalPrice}đ</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-2 d-flex flex-column justify-content-center align-items-center p-3">
                            <span className="badge bg-success fs-6 px-3 py-2">Đã thanh toán</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default History;
