import React, { useEffect, useState } from "react";
import styles from '../Payment/Payment_info.module.css';
import { FaPlus, FaMinus, FaUser } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import vnpay_logo from '../assets/vnpay_logo.png';
import momo_logo from '../assets/MoMo_Logo.png';
import { useLocation } from "react-router-dom";
import pic1 from '../assets/familycombo.png';
import pic2 from '../assets/sweetcombo.png';
import pic3 from '../assets/betacombo.png';

function PaymentInfo() {
  const userInfo = JSON.parse(localStorage.getItem('user'));
  const location = useLocation();
  const { total, selectedSeats, seatTypes } = location.state;
  const [totalPrice, setTotalPrice] = useState(total);
  const [voucher, setVoucher] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [text, setText] = useState("");
  const [textOk, setTextOk] = useState("");
  const [discount, setDiscount] = useState(false);
  const seatsWithType = selectedSeats.map((seat, index) => ({
    seat,
    type: seatTypes[index]
  }));

  const vipSeats = seatsWithType.filter(item => item.type === "vip");
  const normalSeats = seatsWithType.filter(item => item.type === "normal");
  const coupleSeats = seatsWithType.filter(item => item.type === "couple");
  const [comboCounts, setComboCounts] = useState({
    family: 0,
    sweet: 0,
    beta: 0
  });

  const handleIncrement = (key) => {
  setComboCounts(prev => {
    const updated = { ...prev, [key]: prev[key] + 1 };
    const newTotal = total + 
      updated.family * 113000 + 
      updated.sweet * 80000 + 
      updated.beta * 60000;
    setTotalPrice(newTotal);
    return updated;
  });
};

const handleDecrement = (key) => {
  setComboCounts(prev => {
    const updated = {
      ...prev,
      [key]: Math.max(0, prev[key] - 1)
    };
    const newTotal = total + 
      updated.family * 113000 + 
      updated.sweet * 80000 + 
      updated.beta * 60000;
    setTotalPrice(newTotal);
    return updated;
  });
};
const handleVoucher = () => {
  setShowAlert(true);
  if(voucher === 'DHDT01'){
    if(totalPrice < 200000){
      setText("Voucher không áp dụng được với đơn hàng của bạn!!");
      setTextOk("");
      setDiscount(false);
    } else {
      setTextOk("Áp dụng voucher thành công!!");
      setText("");
      setDiscount(true);
    }
  } else {
    setText("Nhập sai voucher!!");
    setTextOk("");
    setDiscount(false);
  }
}
  useEffect(() => {
    if(totalPrice < 200000){
      setDiscount(false);
    }
  })

  return (
    <div className={styles.container}>
      {/* Thông tin thanh toán */}
      <div className={styles.box}>
        <h5 className={styles.title}>
          <FaUser className={styles.icon} /> THÔNG TIN THANH TOÁN
        </h5>
        <div className={styles.infoRow}>
          <div><strong>Họ Tên:</strong> {userInfo.username}</div>
          <div><strong>Số điện thoại:</strong> {userInfo.phoneNumber}</div>
          <div><strong>Email:</strong> {userInfo.email}</div>
        </div>
        <hr />
        {vipSeats.length > 0 && (
          <div className={styles.infoRow}>
            <h6><strong>GHẾ VIP</strong></h6>
            <p className={styles.priceRow}>{vipSeats.length} x 100000 = {vipSeats.length * 100000} VNĐ</p>
          </div>
        )}
        {normalSeats.length > 0 && (
          <div className={styles.infoRow}>
            <h6><strong>GHẾ THƯỜNG</strong></h6>
            <p className={styles.priceRow}>{normalSeats.length} x 70000 = {normalSeats.length * 70000} VNĐ</p>
          </div>
        )}
        {coupleSeats.length > 0 && (
          <div className={styles.infoRow}>
            <h6><strong>GHẾ COUPLE</strong></h6>
            <p className={styles.priceRow}>{coupleSeats.length} x 130000 = {coupleSeats.length * 130000} VNĐ</p>
          </div>
        )}
      </div>

      {/* Combo ưu đãi */}
      <div className={styles.box}>
        <h5 className={styles.title}>
          <img
            src="https://img.icons8.com/ios/24/000000/popcorn.png"
            alt="combo"
            className={styles.icon}
          />
          COMBO ƯU ĐÃI
        </h5>

        <table className={styles.comboTable}>
          <thead>
            <tr>
              <th>Tên Combo</th>
              <th>Mô tả</th>
              <th>Số lượng</th>
            </tr>
          </thead>
          <tbody>
            {/* Combo 1 */}
            <tr>
              <td className={styles.comboInfo}>
                <img src={pic1} alt="Combo" className={styles.comboImg} />
                <span>Family Combo 113K</span>
              </td>
              <td>
                <span className={styles.discount}>TIẾT KIỆM 65K!!!</span><br />
                Gồm: 2 Bắp (69oz) + 4 Nước có gaz (22oz) + 2 Snack Oishi (80g) (22oz)
              </td>
              <td>
                <div className={styles.quantityControl}>
                  <button onClick={() => handleDecrement("family")}> <FaMinus /> </button>
                  <span>{comboCounts.family}</span>
                  <button onClick={() => handleIncrement("family")}> <FaPlus /> </button>
                </div>
              </td>
            </tr>

            {/* Combo 2 */}
            <tr>
              <td className={styles.comboInfo}>
                <img src={pic2} alt="Sweet Combo" className={styles.comboImg} />
                <span>Sweet Combo 80K</span>
              </td>
              <td>
                <span className={styles.discount}>TIẾT KIỆM 42K!!!</span><br />
                Gồm: 1 Bắp (69oz) + 2 Nước có gaz (22oz)
              </td>
              <td>
                <div className={styles.quantityControl}>
                  <button onClick={() => handleDecrement("sweet")}> <FaMinus /> </button>
                  <span>{comboCounts.sweet}</span>
                  <button onClick={() => handleIncrement("sweet")}> <FaPlus /> </button>
                </div>
              </td>
            </tr>
            {/* Combo 3 */}
            <tr>
              <td className={styles.comboInfo}>
                <img src={pic3} alt="Beta Combo" className={styles.comboImg} />
                <span>Beta Combo 60K</span>
              </td>
              <td>
                <span className={styles.discount}>TIẾT KIỆM 28K!!!</span><br />
                Gồm: 1 Bắp (69oz) + 1 Nước có gaz (22oz)
              </td>
              <td>
                <div className={styles.quantityControl}>
                  <button onClick={() => handleDecrement("beta")}> <FaMinus /> </button>
                  <span>{comboCounts.beta}</span>
                  <button onClick={() => handleIncrement("beta")}> <FaPlus /> </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      {/* mã giảm giá */}
       <div className={styles.box}>
        <h5 className={styles.title}>
          <FaUser className={styles.icon} /> MÃ GIẢM GIÁ
        </h5>
        <div className={styles.voucherInputRow}>
          <input type="text" placeholder="Mã Voucher" className={styles.voucherInput} value={voucher} onChange={(e) => setVoucher(e.target.value)}/>
          <button className={styles.voucherButton} onClick={handleVoucher}>ÁP DỤNG</button>
        </div>
        {showAlert && (
          <p style={{color: 'red', fontSize: '14px', marginTop: '-9px', fontStyle: 'italic'}}>
            {textOk || text}
          </p>
        )}
        <h6 className={styles.sectionLabel}>VOUCHER CỦA BẠN</h6>

        <table className={styles.voucherTable}>
          <thead>
            <tr>
              <th>Mã voucher</th>
              <th>Nội dung voucher</th>
              <th>Ngày hết hạn</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>DHDT01</td>
              <td>Giảm giá 10% cho đơn hàng trên 200K</td>
              <td>31/12/2025</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.box}>
        <strong style={{ display: 'block', marginBottom: '10px' }}>
          Tổng tiền: <span style={{ color: 'red' }}>{totalPrice.toLocaleString('vi-VN')} VNĐ</span>
        </strong>

        <strong style={{ display: 'block', marginBottom: '10px' }}>
          Số tiền được giảm: <span style={{ color: 'red' }}>{discount ? (totalPrice * 0.15).toLocaleString('vi-VN') : 0} VNĐ</span>
        </strong>

        <strong style={{ display: 'block' }}>
          Số tiền cần thanh toán: <span style={{ color: 'red' }}>{discount ? (totalPrice * 0.85) : totalPrice.toLocaleString('vi-VN')} VNĐ</span>
        </strong>
      </div>

        {/* phương thức thanh toán */}
        <div className={styles.box}>
        <h5 className={styles.title}>
            <FaUser className={styles.icon} /> PHƯƠNG THỨC THANH TOÁN
        </h5>

        <div className={styles.paymentMethods}>
            <label className={styles.paymentOption}>
            <input type="radio" name="payment" />
            <img src={momo_logo} alt="Momo" />
            <span>Thanh toán qua MoMo</span>
            </label>

            <label className={styles.paymentOption}>
            <input type="radio" name="payment" />
            <img src={vnpay_logo} alt="VNPay" />
            <span>Thanh toán qua VNPay</span>
            </label>
        </div>
        </div>

        <div className="d-flex justify-content-center">
            <button className="btn btn-primary w-75 mt-2">TIẾP TỤC</button>
        </div>
    </div>
  );
}

export default PaymentInfo;
