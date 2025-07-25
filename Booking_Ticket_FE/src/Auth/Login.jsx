import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const [rightPanelActive, setRightPanelActive] = useState(false);
 const [loginData, setLoginData] = useState({ username: '', password: '' });
const [registerData, setRegisterData] = useState({
  username: '',
  email: '',
  password: '',
  retypePassword: '',
  birthday: '',
  phone: ''
});    let navigate = useNavigate();
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
});        if (res.status === 200) {
              navigate('/');
              console.log("Login successful"); 
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
  return (
    <div className={`containers mt-5 ${rightPanelActive ? ' right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form action="#" onSubmit={handleRegisterSubmit}>
          <h1>Tạo tài khoản</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your Email for registration</span>
          <input type="text" name="username" placeholder="Username" value={registerData.username} onChange={handleRegisterChange} />
  <input type="email" name="email" placeholder="Email" value={registerData.email} onChange={handleRegisterChange} />
  <input type="password" name="password" placeholder="Password" value={registerData.password} onChange={handleRegisterChange} />
  <input type="password" name="retypePassword" placeholder="Retype Password" value={registerData.retypePassword} onChange={handleRegisterChange} />
  <input type="date" name="birthday" placeholder="Ngày sinh" value={registerData.birthday} onChange={handleRegisterChange} />
  <input type="text" name="phone" placeholder="Số điện thoại" value={registerData.phone} onChange={handleRegisterChange} />
  <button type="submit">Đăng ký</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#" onSubmit={handleLoginSubmit}>
          <h1>Đăng nhập</h1>
          <div className="social-container">
            <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
            <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
          </div>
          <span>or use your account</span>
         <input
  type="text"
  name="username"
  placeholder="Username"
  value={loginData.username}
  onChange={handleLoginChange}
/>
<input
  type="password"
  name="password"
  placeholder="Password"
  value={loginData.password}
  onChange={handleLoginChange}
/>
          <a href="#">Quên mật khẩu?</a>
          <button>Đăng nhập</button>
        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Xin chào!</h1>
            <p>Bạn đã có tài khoản?</p>
            <button className="ghost" onClick={() => setRightPanelActive(false)}>Đăng nhập</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Xin chào!</h1>
            <p>Bạn chưa có tài khoản sao?</p>
            <button className="ghost" onClick={() => setRightPanelActive(true)}>Đăng ký ngay</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;