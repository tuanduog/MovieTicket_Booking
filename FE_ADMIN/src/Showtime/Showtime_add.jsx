import React, { useState,useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '../Movies/Movie_detail.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function Showtime_add() {
  const navigate = useNavigate();

const [movieName, setMovieName] = useState("");
const [startTime, setStartTime] = useState("");
const [movieId, setMovieId] = useState("");
const [theaterId, setTheaterId] = useState("");
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
    startTime,
    movieId:selectedMovie ,
    roomId :selectedRoom,
  };



  try {
    const response = await axios.post("http://localhost:8099/auth/add-Showtime", data, {
      withCredentials: true,
    });
    console.log("Suất chiếu mới đã được thêm:", response.data);

    setAlertMsg('Thêm suất chiếu thành công!');
    setAlertType('success');
  } catch (err) {
    console.error("Lỗi khi thêm suất chiêu:", err);
      setAlertMsg('Thêm suất chiếu thất bại!');
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
  axios.get('http://localhost:8099/movie/getAll-movies', { withCredentials: true })
    .then(res => setMovies(res.data))
    .catch(err => console.error(err));
}, []);


    return (
  <main id="main" className="main">
{alertMsg && (
  <div className={`alert alert-${alertType} alert-dismissible fade show`} role="alert">
    {alertMsg}
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
  </div>
)}
        <div className="col-lg-12">

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Thêm suất chiếu</h5>

            
                <form onSubmit={handleSubmit}>

  
                  <div className="row mb-3">
        <label htmlFor="theaterSelect" className="col-sm-2 col-form-label">Chọn rạp chiếu:</label>
        <div className="col-sm-10">
        <select
          id="theaterSelect"
          className="form-select"
          value={selectedTheater}
          onChange={handleTheaterChange}
        >
          <option value="">-- Chọn rạp --</option>
          {theater.map(theater => (
            <option key={theater.theaterId} value={theater.theaterId}>
              {theater.theaterName} - {theater.location}
            </option>
          ))}
        </select>
        </div>
      </div>
                 <div className="row mb-3">
                  <label htmlFor="inputCast" className="col-sm-2 col-form-label">Chọn phòng</label>
                 {/* Select phòng */}
      {room.length > 0 && (
        <div className="col-sm-10">
          <select
            className="form-select"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            <option value="">-- Chọn phòng --</option>
            {room.map(room => (
              <option key={room.roomId} value={room.roomId}>
                {room.roomName}
              </option>
            ))}
          </select>
        </div>
      )}
      <div className="row mb-3">
                  <label htmlFor="inputCast" className="col-sm-2 col-form-label">Chọn phim</label>
                  <div className="col-sm-10">
  <select
    id="movieSelect"
    className="form-select"
    value={selectedMovie || ''}
    onChange={(e) => setSelectedMovie(e.target.value)}
  >
    <option value="">-- Chọn phim --</option>
    {movies.map((movie) => (
      <option key={movie.movieId} value={movie.movieId}>
        {movie.movieName}
      </option>
    ))}
  </select>
  </div>
</div>
                </div>
                   <div className="row mb-3">
                  <label htmlFor="inputCast" className="col-sm-2 col-form-label">Giờ chiếu</label>
                  <div className="col-sm-10">
                    <input type="time" className="form-control" id='cast' onChange={(e) => setStartTime(e.target.value)} required/>
                  </div>
                </div>
                   
                


                <div className="row mb-3">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary" >Thêm lịch chiếu</button>
                  </div>
                </div>

              </form>

            </div>
          </div>
        </div>
        </main>
    );
}

export default Showtime_add;
