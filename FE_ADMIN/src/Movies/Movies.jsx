import 'bootstrap/dist/css/bootstrap.min.css';
import { useState  } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
 import { Modal } from 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useEffect } from 'react';
import axios from 'axios';
import DataTable from "react-data-table-component";
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/boxicons/css/boxicons.min.css';
import '../assets/vendor/quill/quill.snow.css';
import '../assets/vendor/quill/quill.bubble.css';
import '../assets/vendor/remixicon/remixicon.css';
import '../assets/vendor/simple-datatables/style.css';
import '../assets/css/style.css';


import '../assets/vendor/apexcharts/apexcharts.min.js';
import '../assets/vendor/echarts/echarts.min.js';
import '../assets/vendor/chart.js/chart.umd.js';
import '../assets/vendor/php-email-form/validate.js';
import '../assets/vendor/bootstrap/js/bootstrap.bundle.min.js';
import '../assets/vendor/tinymce/tinymce.min.js';
import '../assets/vendor/quill/quill.js'
import '../assets/vendor/simple-datatables/simple-datatables.js'
import '../assets/js/main.js';
import {useRef} from 'react';
function Movies () {
     const navigate = useNavigate();

    const [movies, setMovies] = useState([]);

  // Gọi API
  useEffect(() => {
    axios.get('http://localhost:8099/movie/getAll-movies', { withCredentials: true })
      .then((res) => setMovies(res.data))
      .catch((err) => console.error(err));
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);
const handleEdit = (movie) => {
  navigate("/Movies_edit", { state: { movie } });
};

const openModal = (lmovie) => {
  setSelectedMovie(lmovie);
  const modal = new Modal(document.getElementById("detailModal"));
  modal.show();
};

const handleDeleteClick = (movie) => {

  const response = axios.delete("http://localhost:8099/movies/delete-Movies", {
      params: { id: movie.movieId },
      withCredentials: true,
    });
    alert("Thực hiện xoá " + movie.movieName + " thành công");
    window.location.reload();

  }
const columns = [
  {
    name: "ID",
    selector: row => row.movieId,
    sortable: true
  },
  {
    name: "Tên phim",
    selector: row => row.movieName,
    sortable: true
  },
  {
    name: "Thể loại",
    selector: row => row.genre,
    sortable: true
  }
  ,
  {
    name: "Thời lượng",
    selector: row => row.duration,
    sortable: true
  },
  {
    name: "Ngày phát hành",
    selector: row => row.releaseDate,
    sortable: true
  }
  ,
  {
    name: "Lựa chọn",
    cell: row => (
      <div>
        <button
          className="btn btn-sm btn-warning text-light me-1"
          onClick={() => handleEdit(row)}
        >
          <i className="bi bi-pen-fill"></i>
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => handleDeleteClick(row)}
        >
          <i className="bi bi-trash3-fill"></i>

        </button>
        <button
          className="btn btn-sm btn-secondary"
          onClick={() => openModal(row)}
        >
<i class="bi bi-info-circle-fill"></i>

        </button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    sortable: false
  }
];
  const [filterText, setFilterText] = useState("");

  const filteredMovies = movies.filter(
    movie =>
      movie.movieName &&
      movie.movieName.toLowerCase().includes(filterText.toLowerCase())
  );
  

    return (
        <div>
           <main id="main" className="main">

    <div className="pagetitle">
      <h1>Quản lý phim</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item active">Quản lý phim</li>
        </ol>
      </nav>
    </div>

    <section className="section">
      <div className="row">
        <div className="col-lg-12">

          <div className="card">
            <div className="card-body">
                <div className="d-flex">
                    <h5 className="card-title"></h5>
                 
                </div>
             <div className="container">
              <div className="row">
               <div className="col-md-8">
                 <button className="btn btn-success mb-3 ms-auto">
                <a className='text-light' href="/Movie_add">
                    <i className="bi bi-plus-circle-fill pe-1"></i>
                    Thêm phim mới</a>
                    </button>
                    </div>
              <div className="col-md-4">
              <input
        type="text"
        placeholder="Tìm phim..."
        className="form-control mb-3"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      </div>
      </div>
      <DataTable
        columns={columns}
        data={filteredMovies}
        pagination
        highlightOnHover
        selectableRows
      />
    </div>
              <div
        className="modal fade"
        id="detailModal"
        tabIndex="-1"
        aria-labelledby="detailModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            {selectedMovie && (
              <>
                <div className="modal-header">
                  <h5 className="modal-title" id="detailModalLabel">
                    {selectedMovie.movieName}
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p><strong>Ảnh bìa:</strong></p>
                  <img src={selectedMovie.image} alt="Ảnh" style={{ width: "200px" }} />
                  <p><strong>Thể loại:</strong> {selectedMovie.genre}</p>
                  <p><strong>Thời lượng:</strong> {selectedMovie.duration} phút</p>
                  <p><strong>Diễn viên:</strong> {selectedMovie.cast}</p> 
                  <p><strong>Trailer:</strong> {selectedMovie.trailerUrl}</p> 
                  <p><strong>Đạo diễn:</strong> {selectedMovie.director}</p>
                  <p><strong>Ngày phát hành:</strong> {selectedMovie.releaseDate}</p>
                  <p><strong>Mô tả:</strong> {selectedMovie.movieDescription}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
  
            </div>
          </div>

        </div>
      </div>
    </section>

  </main>
        </div>
    );
}

export default Movies;
