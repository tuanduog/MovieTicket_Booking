import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Auth/Login.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function Login() {
    const location = useLocation();
    const [rightPanelActive, setRightPanelActive] = useState(false);
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({
      username: '',
      email: '',
      password: '',
      retypePassword: '',
      birthday: '',
      phone: ''
    });    
    let navigate = useNavigate();
    const handleLoginChange = e => {
      setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = e => {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    };

  const handleLoginSubmit = async e => {
    e.preventDefault();
    try {
    const res = await axios.post('http://localhost:8099/auth/login', loginData, {
      withCredentials: true
    });        if (res.data.status === 200) {
              navigate('/');
              console.log("Login successful"); 
              alert("Đăng nhập thành công");
            } else {
              alert("Đăng nhập không thành công, vui lòng kiểm tra lại tài khoản hoặc mật khẩu.");

        }
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  
  const handleRegisterSubmit = async e => {
  e.preventDefault();
  if (registerData.password !== registerData.retypePassword) {
    alert('Mật khẩu nhập lại không khớp!');
    return;
  }
  try {
    const res = await axios.post('http://localhost:8099/auth/register', registerData, {
      withCredentials: true
    });
    // Xử lý kết quả đăng ký
    if (res.status === 200) {
      alert('Đăng ký thành công!');
      setRightPanelActive(false); // Quay lại đăng nhập sau khi đăng ký thành công
    } else {
      alert('Đăng ký không thành công, vui lòng thử lại.');
    }
    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
  };
    useEffect(() => {
    if(location.state?.type === 'register'){
        setRightPanelActive(true);
    } else {
        setRightPanelActive(false);
    }
  },[location.state]);
  return (
    <div className={styles.authContainer}>
      <div className={`${styles.containers} ${rightPanelActive ? styles.rightPanelActive : ''}`} id="container">
        <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
          <form onSubmit={handleRegisterSubmit}>
            <h1 style={{paddingTop: '200px'}}>Đăng ký</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>hoặc dùng tài khoản của bạn</span>
            <input type="text" name="username" placeholder="Tên đăng nhập" value={registerData.username} onChange={handleRegisterChange} />
            <input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} />
            <input type="password" name="password" placeholder="Mật khẩu" value={registerData.password} onChange={handleRegisterChange} />
            <input type="password" name="retypePassword" placeholder="Nhập lại mật khẩu" value={registerData.retypePassword} onChange={handleRegisterChange} />
            <input type="date" name="birthday" value={registerData.birthday} onChange={handleRegisterChange} />
            <input type="text" name="phone" placeholder="Số điện thoại" value={registerData.phone} onChange={handleRegisterChange} />
            <button type="submit" style={{marginTop: '20px', marginBottom: '10px'}}>Đăng ký</button>
          </form>
        </div>

        <div className={`${styles.formContainer} ${styles.signInContainer}`}>
          <form onSubmit={handleLoginSubmit}>
            <h1>Đăng nhập</h1>
            <div className={styles.socialContainer}>
              <a href="#" className={styles.social}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles.social}><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className={styles.social}><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>hoặc dùng tài khoản của bạn</span>
            <input type="text" name="username" placeholder="Tên đăng nhập" value={loginData.username} onChange={handleLoginChange} />
            <input type="password" name="password" placeholder="Mật khẩu" value={loginData.password} onChange={handleLoginChange} />
            <a href="#">Quên mật khẩu?</a>
            <button>Đăng nhập</button>
          </form>
        </div>

        <div className={styles.overlayContainer}>
          <div className={styles.overlay}>
            <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
              <h1>Xin chào!</h1>
              <p>Bạn đã có tài khoản?</p>
              <button className={styles.ghost} onClick={() => setRightPanelActive(false)}>Đăng nhập</button>
            </div>
            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <h1>Xin chào!</h1>
              <p>Bạn chưa có tài khoản sao?</p>
              <button className={styles.ghost} onClick={() => setRightPanelActive(true)} >Đăng ký ngay</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;