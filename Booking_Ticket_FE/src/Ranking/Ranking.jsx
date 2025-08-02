import React from "react";
import styles from "./Ranking.module.css";
import poster from "../assets/phim1.png"; // Thay bằng ảnh phim thực tế

function Ranking() {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>🎬 BẢNG XẾP HẠNG PHIM HOT</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Poster</th>
            <th>Tên Phim</th>
            <th>Lượt Xem</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={styles.rank}>1</td>
            <td><img src={poster} alt="Con Nít Quỷ" className={styles.poster} /></td>
            <td>Con Nít Quỷ</td>
            <td>1.2M</td>
          </tr>
          <tr>
            <td className={styles.rank}>2</td>
            <td><img src={poster} alt="Người Nhện: Đa Vũ Trụ" className={styles.poster} /></td>
            <td>Người Nhện: Đa Vũ Trụ</td>
            <td>980K</td>
          </tr>
          {/* <tr>
            <td className={styles.rank}>3</td>
            <td><img src={poster} alt="Lật Mặt 6" className={styles.poster} /></td>
            <td>Lật Mặt 6</td>
            <td className={styles.rating}>7.8</td>
            <td>750K</td>
          </tr> */}
        </tbody>
      </table>
    </div>
  );
}

export default Ranking;
