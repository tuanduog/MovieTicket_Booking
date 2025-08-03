import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function UserInfo() {
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-3 text-center">
                    <img 
                        src="https://via.placeholder.com/100" 
                        alt="Profile" 
                        className="rounded-circle mb-3"
                    />
                    <ul className="list-unstyled">
                        <li className="mb-3 fw-bold">Thông tin tài khoản</li>
                        <li className="mb-3">Cài đặt</li>
                        <li className="mb-3">Đăng xuất</li>
                    </ul>
                </div>

                <div className="col-md-9">
                    <h3 className="mb-4">Thông tin tài khoản</h3>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Tên tài khoản</label>
                            <input type="text" className="form-control" defaultValue="Ben Sherman" />
                        </div>
                        
                        <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" defaultValue="ben.sherman@gmail.com" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Số điện thoại</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Giới tính</label>
                            <select className="form-select">
                                <option>Nam</option>
                                <option>Nữ</option>
                                <option>Khác</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ngày sinh</label>
                            <div className="d-flex gap-2">
                                <select className="form-select">
                                    <option>July</option>
                                </select>
                                <select className="form-select">
                                    <option>30</option>
                                </select>
                                <select className="form-select">
                                    <option>1999</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Ngôn ngữ</label>
                            <select className="form-select">
                                <option>English</option>
                                {/* Add more languages if needed */}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label className="form-label">Quốc tịch</label>
                            <select className="form-select">
                                <option>English</option>
                                {/* Add more languages if needed */}
                            </select>
                        </div>

                        <div className="col-md-6 d-flex flex-column justify-content-end">
                            
                            <div className="form-check form-switch">
                                <input className="form-check-input" type="checkbox" />
                                <label className="form-check-label">Đổi mật khẩu</label>
                            </div>
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-dark">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
