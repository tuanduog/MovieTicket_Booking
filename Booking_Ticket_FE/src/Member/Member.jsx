import React from "react";
import { useState } from "react";
import styles from '../Member/Member.module.css';

function Member () {
    const [activeTab, setActiveTab] = useState('the');
    const tabs = [
    { key: 'info', label: 'THÔNG TIN TÀI KHOẢN' },
    { key: 'the', label: 'THẺ THÀNH VIÊN' },
    { key: 'hanhtrinh', label: 'LỊCH SỬ ĐẶT VÉ' },
    { key: 'diem', label: 'ĐIỂM TÍCH LŨY' },
    { key: 'voucher', label: 'VOUCHER' },
  ];

  return (
    <div className="container mt-5">
        <div className={`d-flex border-bottom ${styles.memberTabs}`}>
        {tabs.map((tab) => (
            <div
            key={tab.key}
            className={`${styles.tabItem} px-3 py-2 fw-bold text-uppercase ${activeTab === tab.key ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
            >
            {tab.label}
            </div>
        ))}
        </div>

    </div>
  );
}

export default Member;