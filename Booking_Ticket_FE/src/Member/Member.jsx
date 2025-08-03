import React, { useState } from "react";
import styles from "../Member/Member.module.css";
import { useNavigate } from "react-router-dom";

function Member() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [agreed, setAgreed] = useState(false);

  const handleVipThang = () => {
    if (localStorage.getItem('state') === 'Login successful') {
      setSelectedPlan("vip_month");
      setShowConfirm(true);
    } else {
      navigate("/Login");
    }
  };

  const handleVipNam = () => {
    if (localStorage.getItem('state') === 'Login successful') {
      setSelectedPlan("vip_year");
      setShowConfirm(true);
    } else {
      navigate("/Login");
    }
  };

  const handleConfirm = () => {
    if (agreed) {
      navigate("/confirm-vip");
    }
  };

  const handleClose = () => {
    setShowConfirm(false);
    setAgreed(false);
    setSelectedPlan(null);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title} style={{ paddingBottom: "5px" }}>
        Các gói hội viên
      </h2>
      <div className={styles.cardContainer}>
        {/* Gói VIP Tháng */}
        <div className={`${styles.card} ${styles.vipMonth}`}>
          <h3 className={styles.name}>Gói VIP Tháng</h3>
          <p className={styles.price}>99.000đ/tháng</p>
          <ul className={styles.benefitList}>
            <li>✓ Xem không giới hạn</li>
            <li>✓ Ưu tiên đặt vé</li>
            <li>✓ Combo bắp nước giảm 20%</li>
          </ul>
          <div className={styles.buttonWrapper}>
            <button className={styles.subscribeBtn} onClick={handleVipThang}>Đăng ký</button>
          </div>
        </div>

        {/* Gói VIP Năm */}
        <div className={`${styles.card} ${styles.vipYear}`}>
          <h3 className={styles.name}>Gói VIP Năm</h3>
          <p className={styles.price}>899.000đ/năm</p>
          <ul className={styles.benefitList}>
            <li>✓ Tất cả quyền lợi VIP Tháng</li>
            <li>✓ Miễn phí 2 vé/tháng</li>
            <li>✓ Giảm 30% combo bắp nước</li>
            <li>✓ Quà sinh nhật đặc biệt</li>
          </ul>
          <div className={styles.buttonWrapper}>
            <button className={styles.subscribeBtn} onClick={handleVipNam}>Đăng ký</button>
          </div>
        </div>
      </div>

      {/* Popup xác nhận */}
      {showConfirm && (
        <div className={styles.overlay}>
          <div className={styles.confirmBox}>
            <h4>Xác nhận đăng ký</h4>
            <p>Bạn có chắc chắn muốn đăng ký gói {selectedPlan === "vip_month" ? "VIP Tháng" : "VIP Năm"} không?</p>
            <div className={styles.terms}>
              <div style={{ textAlign: "justify", fontSize: "14px", lineHeight: "1.6" }}>
                <p>
                  <strong>Điều khoản dịch vụ</strong>
                </p>

                <p>
                  Khi đăng ký gói hội viên, bạn đồng ý với các chính sách và điều kiện sau:
                </p>

                <ul style={{ paddingLeft: "20px", marginTop: "10px", marginBottom: "10px" }}>
                  <li>
                    Gói <strong>VIP Tháng</strong> có thời hạn sử dụng 30 ngày kể từ ngày thanh toán thành công và sẽ <strong>không tự động gia hạn</strong>.
                  </li>
                  <li>
                    Gói <strong>VIP Năm</strong> có thời hạn 12 tháng và đi kèm các ưu đãi bổ sung như <em>vé miễn phí hàng tháng</em> và <em>quà sinh nhật</em>.
                  </li>
                  <li>
                    Quyền lợi của hội viên <strong>chỉ áp dụng cho tài khoản đã đăng ký</strong> và <strong>không thể chuyển nhượng</strong>.
                  </li>
                  <li>
                    Mọi thông tin thanh toán và sử dụng sẽ được lưu trữ để đảm bảo quyền lợi cho bạn trong suốt thời gian sử dụng dịch vụ.
                  </li>
                  <li>
                    <strong>Không hoàn tiền</strong> sau khi đã đăng ký gói thành công, trừ trường hợp hệ thống gặp sự cố nghiêm trọng gây gián đoạn dịch vụ kéo dài.
                  </li>
                  <li>
                    Bạn đồng ý <strong>không chia sẻ tài khoản</strong> cho bên thứ ba và không sử dụng dịch vụ vào mục đích thương mại hoặc vi phạm pháp luật.
                  </li>
                  <li>
                    Việc <strong>vi phạm điều khoản</strong> có thể dẫn đến việc khóa tài khoản mà không hoàn lại chi phí đã thanh toán.
                  </li>
                </ul>

                <p>
                  Vui lòng đọc kỹ các điều khoản trên trước khi xác nhận. Bằng việc nhấn <strong>“Tôi đồng ý”</strong>, bạn xác nhận đã hiểu và chấp nhận toàn bộ điều kiện sử dụng dịch vụ.
                </p>
              </div>
              <label style={{display: 'flex', justifyContent: 'left'}}>
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
                <span style={{ marginLeft: "8px" }}>Tôi đồng ý với điều khoản dịch vụ</span>
              </label>
            </div>
            <div className={styles.buttonGroup}>
              <button onClick={handleClose} className={styles.cancelBtn}>Hủy</button>
              <button
                onClick={handleConfirm}
                disabled={!agreed}
                className={styles.confirmBtn}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Member;
