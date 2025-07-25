import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import poster from '../assets/phim1.png';
import '../Movies/Movie_detail.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Movie_detail() {
    const [showModal, setShowModal] = useState(false);
    const [confirmPopup, setConfirmPopup] = useState(false);
    const navigate = useNavigate();
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const handleOpenModal = () => {
        setShowModal(true);
    }
    const handleCloseConfirm = () => {
        setConfirmPopup(false);
    }

    const handleOpenConfirm = () => {
        setConfirmPopup(true);
    }
    const handleBooking = () => {
        navigate('/Booking');
    }
    return (
        <div className="container mt-5">
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <span className="close-btn" onClick={handleCloseModal}>&times;</span>
                        <h3>LỊCH CHIẾU - CON NÍT QUỶ</h3>
                        <h4 className='d-flex justify-content-center mt-4 mb-4'>Rạp Beta Thanh Xuân</h4>
                        <div className="date-list" style={{fontSize: '18px'}}>
                            {["24", "25", "26", "27", "28", "29", "30", "31"].map((d, i) => (
                                <div key={i} className={i === 0 ? 'active' : ''}>{d}/07</div>
                            ))}
                        </div>
                        <h6>2D PHỤ ĐỀ</h6>
                        <div className="showtimes">
                            <div className="showtime" onClick={handleOpenConfirm}>
                            <div className="time">18:30</div>
                            <div className="seats">132 ghế trống</div>
                            </div>
                            <div className="showtime">
                                <div className="time">18:30</div>
                                <div className="seats">132 ghế trống</div>
                            </div>
                            <div className="showtime">
                                <div className="time">18:30</div>
                                <div className="seats">132 ghế trống</div>
                            </div>
                            <div className="showtime">
                                <div className="time">18:30</div>
                                <div className="seats">132 ghế trống</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {confirmPopup && (
            <div className="modal-overlay" onClick={handleCloseConfirm}>
                <div className="modal-box" onClick={e => e.stopPropagation()}>
                <span className="close-btn" onClick={handleCloseConfirm}>&times;</span>
                <h4 className='text-center mt-3'>BẠN ĐANG ĐẶT VÉ XEM PHIM</h4>
                <h3 className='text-center text-primary mb-4'>Tên phim</h3>

                <table className="table text-center">
                    <thead>
                    <tr>
                        <th>Rạp chiếu</th>
                        <th>Ngày chiếu</th>
                        <th>Giờ chiếu</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td><strong>Beta Thái Nguyên</strong></td>
                        <td><strong>24/07/2025</strong></td>
                        <td><strong>22:10</strong></td>
                    </tr>
                    </tbody>
                </table>

                <div className="text-center mt-4 mb-2">
                    <button className="btn btn-primary px-4" onClick={handleBooking}>
                    ĐỒNG Ý
                    </button>
                </div>
                </div>
            </div>
            )}

            <div className="row">
                <div className="col-md-3">
                    <img src={poster} alt="Poster phim" className="img-fluid rounded shadow" />
                </div>

                <div className="col-md-9">
                    <h2 className="mb-3">Tên phim: Người Bất Tử</h2>
                    <p><strong>Thể loại:</strong> Hành động, Kinh dị</p>
                    <p><strong>Thời lượng:</strong> 120 phút</p>
                    <p><strong>Khởi chiếu:</strong> 22/07/2025</p>
                    <p><strong>Đạo diễn:</strong> Victor Vũ</p>

                    <p className="mt-4">
                        <strong>Nội dung:</strong><br />
                        Bộ phim kể về hành trình bất tử kéo dài hàng trăm năm của một người đàn ông bí ẩn. Trong suốt cuộc đời, anh ta đã trải qua nhiều sự kiện và biến cố để tìm lại nhân tính.
                    </p>

                    <div className="mt-4 d-flex gap-3">
                        <button className="btn btn-primary" onClick={handleOpenModal}>
                            Đặt vé ngay
                        </button>
                        <a href="https://www.youtube.com/watch?v=example" target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger">
                            🎬 Xem trailer
                        </a>
                    </div>
                </div>
            </div>
            <div className="mt-5 p-4 rounded shadow" style={{ backgroundColor: '#f8f9fa' }}>
                <h4 className="mb-3">Bình luận</h4>
                <div className="mt-4">
                    <div class="row d-flex justify-content-center ps-5 pe-5">
                        <div class="col-12">
                            <div class="card">
                            <div class="card-body p-4">

                                <div class="row">
                                <div class="col">
                                    <div class="d-flex flex-start">
                                    <img class="rounded-circle shadow-1-strong me-3"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" width="65"
                                        height="65" />
                                    <div class="flex-grow-1 flex-shrink-1">
                                        <div>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <p class="mb-1">
                                            Maria Smantha <span class="small">- 2 hours ago</span>
                                            </p>
                                        </div>
                                        <p class="small mb-0">
                                            It is a long established fact that a reader will be distracted by
                                            the readable content of a page.
                                        </p>
                                        <div class="d-flex justify-content-between align-items-center">
                                            <div class="d-flex align-items-center">
                                                <a href="" class="link-muted me-2"><i class="fa-regular fa-s fa-thumbs-up"></i>132</a>
                                                <a href="" class="link-muted ps-2"><i class="fa-regular fa-thumbs-down"></i>15</a>
                                            </div>
                                            <a href=""><i class="fas fa-reply fa-xs"></i><span class="small"> Phản hồi</span></a>
                                        </div>
                                        </div>

                                        <div class="d-flex flex-start mt-4">
                                        <a class="me-3" href="#">
                                            <img class="rounded-circle shadow-1-strong"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(11).webp" alt="avatar"
                                            width="65" height="65" />
                                        </a>
                                        <div class="flex-grow-1 flex-shrink-1">
                                            <div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="mb-1">
                                                Simona Disa <span class="small">- 3 hours ago</span>
                                                </p>
                                            </div>
                                            <p class="small mb-0">
                                                letters, as opposed to using 'Content here, content here',
                                                making it look like readable English.
                                            </p>
                                            <div class="d-flex justify-content-between align-items-center">
                                            <div class="d-flex align-items-center">
                                                <a href="" class="link-muted me-2"><i class="fa-regular fa-thumbs-up"></i>132</a>
                                                <a href="" class="link-muted ps-2"><i class="fa-regular fa-thumbs-down"></i>15</a>
                                            </div>
                                            <a href=""><i class="fas fa-reply fa-xs"></i><span class="small"> Phản hồi</span></a>
                                            </div>
                                            </div>
                                        </div>
                                        </div>

                                        <div class="d-flex flex-start mt-4">
                                        <a class="me-3" href="#">
                                            <img class="rounded-circle shadow-1-strong"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(32).webp" alt="avatar"
                                            width="65" height="65" />
                                        </a>
                                        <div class="flex-grow-1 flex-shrink-1">
                                            <div>
                                            <div class="d-flex justify-content-between align-items-center">
                                                <p class="mb-1">
                                                John Smith <span class="small">- 4 hours ago</span>
                                                </p>
                                            </div>
                                            <p class="small mb-0">
                                                the majority have suffered alteration in some form, by
                                                injected humour, or randomised words.
                                            </p>
                                            <div class="d-flex justify-content-between align-items-center">
                                            <div class="d-flex align-items-center">
                                                <a href="" class="link-muted me-2"><i class="fa-regular fa-thumbs-up"></i>132</a>
                                                <a href="" class="link-muted ps-2"><i class="fa-regular fa-thumbs-down"></i>15</a>
                                            </div>
                                            <a href=""><i class="fas fa-reply fa-xs"></i><span class="small"> Phản hồi</span></a>
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
