import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
function Theater () {
        const [theater, setTheater] = useState([]);
        const navigate = useNavigate();
const handleEdit = (movie) => {
  navigate("/Theater_edit", { state: { movie } });
};



const handleDeleteClick = (movie) => {

  const response = axios.delete("http://localhost:8099/theaters/delete-Theater", {
      params: { id: movie.theaterId },
      withCredentials: true,
    });
    alert("Thực hiện xoá " + movie.theaterName + " thành công");
    window.location.reload();

  }
const columns = [
  {
    name: "ID",
    selector: row => row.theaterId,
    sortable: true
  },
  {
    name: "Tên rạp",
    selector: row => row.theaterName,
    sortable: true
  },
  {
    name: "Địa chỉ",
    selector: row => row.theaterLocation,
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
        
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true,
    sortable: false
  }
];
      useEffect(() => {
    axios.get('http://localhost:8099/theaters/getTheaters', { withCredentials: true })
      .then((res) => setTheater(res.data.data))
      .catch((err) => console.error(err));
  }, []);
  const [filterText, setFilterText] = useState("");
const filteredTheater = Array.isArray(theater)
  ? theater.filter(t =>
      t.theaterName?.toLowerCase().includes(filterText.toLowerCase())
    )
  : [];
    return (
        <div>
           <main id="main" className="main">

    <div className="pagetitle">
      <h1>Quản lý rạp chiếu</h1>
      <nav>
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><a href="/">Home</a></li>
          <li className="breadcrumb-item active">Quản lý rạp chiếu</li>
        </ol>
      </nav>
    </div>

    <section className="section">
      <div className="row">
        <div className="col-lg-12">

 <div className="row mt-2">
               <div className="col-md-8">
                 <button className="btn btn-success mb-3 ms-auto">
                <a className='text-light' href="/Theater_add">
                    <i className="bi bi-plus-circle-fill pe-1"></i>
                    Thêm rạp chiếu mới</a>
                    </button>
                    </div>
              <div className="col-md-4">
              <input
        type="text"
        placeholder="Tìm rạp..."
        className="form-control mb-3"
        value={filterText}
        onChange={e => setFilterText(e.target.value)}
      />
      </div>
      </div>
          <div className="card">
            
            <div className="card-body">
              
                <div className="d-flex">
                    <h5 className="card-title"></h5>
                   
                </div>
             <DataTable
        columns={columns}
        data={filteredTheater}
        pagination
        highlightOnHover
        selectableRows
      />
              

            </div>
          </div>

        </div>
      </div>
    </section>

  </main>
        </div>
    );
}

export default Theater;
