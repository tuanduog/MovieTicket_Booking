import React, { useState,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../Movies/Movie_detail.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function Theater_add() {
  const navigate = useNavigate();

const [movieName, setMovieName] = useState("");
const [startTime, setStartTime] = useState("");
const [location, setLoction] = useState("");
const [theaterName, setTheaterName] = useState("");
const [roomId, setRoomId] = useState("");
const [roomName, setRoomName] = useState("");

const [room, setRoom]  = useState([]);

const [alertMsg, setAlertMsg] = useState('');
const [alertType, setAlertType] = useState('');

  const[theater, setTheater] = useState([]);
  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    theaterName ,
    location ,
  };



  try {
    const response = await axios.post("http://localhost:8099/theaters/add-Theater", data, {
      withCredentials: true,
    });
    console.log("Rạp chiếu mới đã được thêm:", response.data);

    setAlertMsg('Thêm rạp chiếu thành công!');
    setAlertType('success');
  } catch (err) {
    console.error("Lỗi khi thêm rạp:", err);
      setAlertMsg('Thêm rạp thất bại!');
  setAlertType('danger');
  }
};


useEffect(() => {
      axios.get('http://localhost:8099/theaters/getTheaters', { withCredentials: true })
      .then((res) => setTheater(res.data.data))
      .catch((err) => console.error(err));

  if (alertMsg) {
    const timer = setTimeout(() => {
      setAlertMsg('');
      setAlertType('');
    }, 3000); // 3 giây

    return () => clearTimeout(timer);
  }
}, [alertMsg]);

  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  const handleTheaterChange = (e) => {
    setSelectedTheater(e.target.value);
  };

    useEffect(() => {
  if (selectedTheater) {
    axios.get('http://localhost:8099/room/getRoomsByTheaterId', {
      withCredentials: true,
      params: {
        theaterId: selectedTheater,
      },
    })
    .then(res => setRoom(res.data.data))
    .catch(err => console.error(err));
  } else {
    setRoom([]);
  }
}, [selectedTheater]);
const [movies, setMovies] = useState([]);
const [selectedMovie, setSelectedMovie] = useState(null);
useEffect(() => {
  axios.get('http://localhost:8099/auth/getAll-movies', { withCredentials: true })
    .then(res => setMovies(res.data))
    .catch(err => console.error(err));
}, []);


    return (
  <main id="main" className="main" style={{paddingBottom:235}}>
{alertMsg && (
  <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
    {alertMsg}
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
)}
        <div className="col-lg-12">

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Thêm rạp chiếu</h5>

            
                <form onSubmit={handleSubmit}>
                   <div className="row mb-3">
                  <label htmlFor="inputTheaterName" className="col-sm-2 col-form-label">Tên rạp chiếu</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id='theaterName' onChange={(e) => setTheaterName(e.target.value)} required/>
                  </div>
                </div>
                          <div className="row mb-3">
                  <label htmlFor="inputLocation" className="col-sm-2 col-form-label">Địa điểm rạp chiếu</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id='location' onChange={(e) => setLoction(e.target.value)} required/>
                  </div>
                </div>
                   
            
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary" >Thêm rạp chiếu</button>
                  </div>
                </div>

              </form>

            </div>
          </div>
        </div>
        </main>
        
    );
}

export default Theater_add;
