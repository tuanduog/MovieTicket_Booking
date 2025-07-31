import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

function Movie_edit() {
   const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // tạo đường dẫn tạm
    }
  };
    
    return (
  <main id="main" class="main">

        <div className="col-lg-12">

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Sửa phim</h5>

            
              <form>
                <div className="row mb-3">
                  <label htmlFor="inputMovie" className="col-sm-2 col-form-label">Ảnh bìa</label>
                  <div className="col-sm-10">
                <input type="file" accept="image/*" onChange={handleImageChange} className="form-control" />
      
      {image && (
        <div className="mt-3">
          <img src={image} alt="preview" className="img-thumbnail" />
        </div>
      )}
      </div>
       
                </div>
  
                <div className="row mb-3">
                  <label htmlFor="inputMovie" className="col-sm-2 col-form-label">Tên phim</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id='movieName' required/>
                  </div>
                </div>
                 <div className="row mb-3">
                  <label htmlFor="inputCast" className="col-sm-2 col-form-label">Diễn viên</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id='cast' required/>
                  </div>
                </div>
                      <div className="row mb-3">
                  <label htmlFor="inputCast" className="col-sm-2 col-form-label">Đạo diễn</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id='director'required />
                  </div>
                </div>


                <div className="row mb-3">
                  <label htmlFor="inputDate" className="col-sm-2 col-form-label">Ngày phát hành</label>
                  <div className="col-sm-10">
                    <input type="date" className="form-control" id='releaseDate' required/>
                  </div>
                </div>
                <div className="row mb-3">
                  <label htmlFor="inputTime" className="col-sm-2 col-form-label">Thời lượng</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" required/>
                  </div>
                </div>

               
                <div className="row mb-3">
                  <label htmlFor="inputDescription" className="col-sm-2 col-form-label">Mô tả</label>
                  <div className="col-sm-10">
                    <textarea className="form-control" id='description'></textarea>
                  </div>
                </div>
                <fieldset className="row mb-3">
                  <legend className="col-form-label col-sm-2 pt-0">Loại phim</legend>
                  <div className="col-sm-10">
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="option1" />
                      <label className="form-check-label" htmlFor="gridRadios1">
                        Sắp chiếu
                      </label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="option2"/>
                      <label className="form-check-label" htmlFor="gridRadios2">
                        Đang chiếu
                      </label>
                    </div>
                   
                  </div>
                </fieldset>
                <div className="row mb-3">
                  <legend className="col-form-label col-sm-2 pt-0">Thể loại</legend>
                  <div className="col-sm-10">
                    <div className="row">
                        <div className="col">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck1"/>
                      <label className="form-check-label" htmlFor="gridCheck1">
                        Kinh dị
                      </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck2" checked/>
                      <label className="form-check-label" htmlFor="gridCheck2">
                        Hành động
                      </label>
                    </div>
                    </div>
                         <div className="col">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck1"/>
                      <label className="form-check-label" htmlFor="gridCheck1">
                        Gia Đình
                      </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck2" checked/>
                      <label className="form-check-label" htmlFor="gridCheck2">
                        Hoạt Hình
                      </label>
                    </div>
                    </div>
                         <div className="col">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck1"/>
                      <label className="form-check-label" htmlFor="gridCheck1">
                        Tình cảm
                      </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck2" checked/>
                      <label className="form-check-label" htmlFor="gridCheck2">
                        Hài hước
                      </label>
                    </div>
                    </div>
                     <div className="col">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck1"/>
                      <label className="form-check-label" htmlFor="gridCheck1">
                        Phiêu lưu
                      </label>
                    </div>

                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" id="gridCheck2" checked/>
                      <label className="form-check-label" htmlFor="gridCheck2">
                        Tài liệu
                      </label>
                    </div>
                    </div>
                </div>
                  </div>
                </div>


                


                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">Thêm phim</label>
                  <div className="col-sm-10">
                    <button type="submit" className="btn btn-primary">Thêm phim</button>
                  </div>
                </div>

              </form>

            </div>
          </div>
        </div>
        </main>
    );
}

export default Movie_edit;
