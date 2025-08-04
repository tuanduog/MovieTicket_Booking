  import React, { useState,useRef } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { useNavigate } from 'react-router-dom';
  import '../Movies/Movie_detail.css';
  import '@fortawesome/fontawesome-free/css/all.min.css';
  import { useLocation } from 'react-router-dom';
  import { useEffect } from 'react';
  import axios from 'axios';

  function Theater_edit() {
    const navigate = useNavigate();

  const [movieName, setMovieName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [movieId, setMovieId] = useState("");
  const [theaterId, setTheaterId] = useState("");
  const [theaterName, setTheaterName] = useState("");
  const [roomId, setRoomId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [locations,setLocations]  = useState("");
 
  const location = useLocation();
  const showtime = location.state?.movie;
  console.log(showtime);
  useEffect(() => {
    if (showtime) {

      setTheaterName(showtime.theaterName);
      setLocations(showtime.theaterLocation);
      setTheaterId(showtime.theaterId);
    }
  }, [showtime]);

  const [room, setRoom]  = useState([]);

  const [alertMsg, setAlertMsg] = useState('');
  const [alertType, setAlertType] = useState('');

  const[theater, setTheater] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      theaterId: showtime?.theaterId, // thêm showtimeId khi sửa
      theaterName,
      locations,
    };
    try {
      const response = await axios.put("http://localhost:8099/theaters/edit-Theater", data, {
        withCredentials: true,
              params: {
              id: data.theaterId,
      },
      });
      console.log("Đã cập nhật suất chiếu:", response.data);

      setAlertMsg('Cập nhật suất chiếu thành công!');
      setAlertType('success');
    } catch (err) {
      console.error("Lỗi khi cập nhật suất chiếu:", err);
      setAlertMsg('Cập nhật suất chiếu thất bại!');
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
                <h5 className="card-title">Sửa rạp</h5>

              
                  <form onSubmit={handleSubmit}>
                   <div className="row mb-3">
                  <label htmlFor="inputTheaterName" className="col-sm-2 col-form-label">Tên rạp chiếu</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id='theaterName' onChange={(e) => setTheaterName(e.target.value)} value={theaterName} required/>
                  </div>
                </div>
                          <div className="row mb-3">
                  <label htmlFor="inputLocation" className="col-sm-2 col-form-label">Địa điểm rạp chiếu</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id='location' onChange={(e) => setLocations(e.target.value)} value={locations} required/>
                  </div>
                </div>
                   
            
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary" >Sửa rạp chiếu</button>
                  </div>
                </div>

              </form>

              </div>
            </div>
          </div>
          </main>
      );
  }

  export default Theater_edit;
