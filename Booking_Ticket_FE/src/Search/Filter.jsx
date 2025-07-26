import 'bootstrap/dist/css/bootstrap.min.css';
import styles from '../Auth/Login.module.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
function Filter() {
       const [nowShowing, setNowShowing] = useState(true);
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const navigate = useNavigate();
        const handleMovieDetails = () => {
        navigate("/Movie_detail");
    }
    const location = useLocation();
// ...existing code...
const [searchName, setSearchName] = useState('');
const [languages, setLanguages] = useState([]);
const [selectedLanguage, setSelectedLanguage] = useState('');
useEffect(() => {
    if (location.state?.name) {
        setSearchName(location.state.name);
    }
}, [location.state?.name]);
// Lấy danh sách ngôn ngữ (giả sử API trả về { status: 200, languages: [...] })
// useEffect(() => {
//     axios.get('http://localhost:8099/movies/getLanguages')
//         .then(res => {
//             if (res.data.status === 200) {
//                 setLanguages(res.data.languages || []);
//             } else {
//                 setLanguages([]);
//             }
//         })
//         .catch(() => setLanguages([]));
// }, []);
useEffect(() => {
    axios.get('http://localhost:8099/movies/getGenres')
        .then(res => {
            if (res.data.status === 200) {
                setGenres(res.data.data || []);
            } else {
                setGenres([]);
            }
        })
        .catch(() => setGenres([]));
}, []);

// Xử lý lọc phim khi thay đổi form
useEffect(() => {
    let url = 'http://localhost:8099/movies/get-products-multiple-searching-col?pageNo=0&pageSize=10';
    if (selectedGenre) url += `&search=genre:${encodeURIComponent(selectedGenre)}`;
    if (searchName) url += `&search=movieName:${encodeURIComponent(searchName)}`;
    // if (selectedLanguage) url += `language=${encodeURIComponent(selectedLanguage)}&`;

    axios.get(url)
        .then(res => {
            if (res.data.status === 200) {
                setMovies(res.data.data.items || []);
                console.log("Movies fetched successfully:", res.data.items);
            } else {
                setMovies([]);
            }
        })
        .catch(() => setMovies([]));
}, [selectedGenre, searchName]);

// ...existing code...
return (
    <div>
        <div className="container mt-5">
            {/* Form lọc phim */}
            <form className="mb-4" onSubmit={e => e.preventDefault()}>
                <div className="row g-2 align-items-center">
                    <div className="col-auto">
                        <label htmlFor="nameInput" className="col-form-label">Tên phim:</label>
                    </div>
                    <div className="col-auto">
                        <input
                            id="nameInput"
                            type="text"
                            className="form-control"
                            value={searchName}
                            onChange={e => setSearchName(e.target.value)}
                            placeholder="Nhập tên phim"
                        />
                    </div>
                    <div className="col-auto">
                        <label htmlFor="genreSelect" className="col-form-label">Thể loại:</label>
                    </div>
                    <div className="col-auto">
                        <select
                            id="genreSelect"
                            value={selectedGenre}
                            onChange={e => setSelectedGenre(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Tất cả</option>
                            {genres.map((genre) => (
                                <option key={genre} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-auto">
                        <label htmlFor="languageSelect" className="col-form-label">Ngôn ngữ:</label>
                    </div>
                    <div className="col-auto">
                        <select
                            id="languageSelect"
                            value={selectedLanguage}
                            onChange={e => setSelectedLanguage(e.target.value)}
                            className="form-select"
                        >
                            <option value="">Tất cả</option>
                            {languages.map((lang) => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </form>
<div className="row">
  {movies && movies.length > 0 ? (
    movies.map((movie, i) => (
      <div className="col-md-3 mb-4" key={movie.id || i}>
        <div className="card h-100">
          <img
            src={movie.image || `https://dummyimage.com/300x350/ccc/000&text=${movie.name || 'Phim'}`}
            className="card-img-top"
            alt={movie.movieName || `Phim ${i + 1}`}
          />
          <div className="card-body" onClick={handleMovieDetails}>
            <h5 className={`card-title ${styles.cardTitleCustom}`}>
              {movie.movieName || `Phim ${i + 1}`}
            </h5>
            <p className="card-text">
              Thể loại: {movie.genre || 'Không xác định'}
            </p>
              <p className="card-text">
              Thời lượng: {movie.duration || 'Không xác định'}
            </p>
            <p className="card-text">
              Mô tả: {movie.movieDescription || 'Không xác định'}
            </p>
            <a href="#" className="btn btn-primary w-100">Đặt vé</a>
          </div>
        </div>
      </div>
    ))
  ) : (
    <div className="col-12 text-center">
      <p style={{margin:"150px"}}>Không có phim nào phù hợp.</p>
    </div>
  )}
</div>
        </div>
    </div>
);

}

export default Filter;