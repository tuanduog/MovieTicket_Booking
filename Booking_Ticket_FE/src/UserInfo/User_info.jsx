import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from '../UserInfo/User_info.module.css';
import { Modal, Button } from "react-bootstrap";

function UserInfo() {
    const [userInfo, setUserInfo] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const [language, setLanguage] = useState("");
    const [nationality, setNationality] = useState("");
    const [showDoiMK, setShowDoiMK] = useState(false);
    
    const handleClose = () => {
        setShowDoiMK(false);
    }

    const handleOpen = () => {
        setShowDoiMK(true);
    }
    const fetchUserProfile = async () => {
        try {
            const res = await axios.get(`http://localhost:8099/auth/get-Userprofile/${user.username}`, 
                {withCredentials: true}
            )
            console.log(res.data);
            setUserInfo(res.data);
        } catch (error){
            console.error("Lỗi lấy thông tin người dùng!", error);
        }
    }
    useEffect(() => {
        fetchUserProfile();
    },[]);
    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-md-3 text-center">
                    <img 
                        
                        alt="Profile" 
                        className="rounded-circle mb-3"
                    />
                    <ul className="list-unstyled">
                        <li className="mb-3 fw-bold">Thông tin tài khoản</li>
                        <li className="mb-3">Cài đặt</li>
                        <li className="mb-3" >Đăng xuất</li>
                    </ul>
                </div>

                <div className="col-md-9">
                    <h3 className="mb-4">Thông tin tài khoản</h3>
                    <form className="row g-3">
                        <div className="col-md-6">
                            <label className="form-label">Tên tài khoản</label>
                            <input type="text" className="form-control" />
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
                            </select>
                        </div>

                        <div className="col-12 d-flex justify-content-end mt-2">
                        <button type="button" className={`btn btn-link text-primary px-0 ${styles.doimk}`} onClick={handleOpen}>
                            Đổi mật khẩu
                        </button>
                        </div>
                        <div className="col-12 mt-4">
                            <button type="submit" className="btn btn-dark">Lưu thay đổi</button>
                        </div>
                    </form>
                </div>
            </div>
            <Modal show={showDoiMK} onHide={handleClose} centered>
    <Modal.Header closeButton>
        <Modal.Title>Đổi mật khẩu</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        
        <div className="row mb-3">
            <div className="col-4 mt-1">
                <label>Mật khẩu cũ: </label>
            </div>
            <div className="col-7">
                <input type="text" min="0" max="10" step="0.1" className="form-control" id="tx2" />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-4 mt-1">
                <label>Mật khẩu mới: </label>
            </div>
            <div className="col-7">
                <input type="text" min="0" max="10" step="0.1" className="form-control" id="gk" />
            </div>
        </div>
        <div className="row mb-3">
            <div className="col-4 mt-1">
                <label>Xác nhận mật khẩu: </label>
            </div>
            <div className="col-7">
                <input type="text" min="0" max="10" step="0.1" className="form-control" id="ck" />
            </div>
        </div>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="primary">
            Xác nhận
        </Button>
        <Button variant="secondary" onClick={handleClose}>
            Đóng
        </Button>
    </Modal.Footer>
</Modal>

        </div>
    );
}

export default UserInfo;
