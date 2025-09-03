import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfileDropdown({ handleSignOut }) {

    console.log(JSON.parse(localStorage.getItem('user')));
  return (
    <Dropdown align="end">
      <Dropdown.Toggle variant="link" className="nav-link nav-profile d-flex align-items-center pe-0">
      <i class="bi bi-person-circle fs-4"></i>
        <span className="d-none d-md-block dropdown-toggle ps-2">{JSON.parse(localStorage.getItem('user')).user.data.username}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropdown-menu-arrow profile">
        <Dropdown.Header>
          <h6>{JSON.parse(localStorage.getItem('user')).user.data.username}</h6>
          <span>Mananger</span>
        </Dropdown.Header>
        <Dropdown.Divider />

        <Dropdown.Item href="users-profile.html">
          <i className="bi bi-person me-2"></i> My Profile
        </Dropdown.Item>

        <Dropdown.Item href="users-profile.html">
          <i className="bi bi-gear me-2"></i> Account Settings
        </Dropdown.Item>

        <Dropdown.Item href="pages-faq.html">
          <i className="bi bi-question-circle me-2"></i> Need Help?
        </Dropdown.Item>

        <Dropdown.Divider />
        <Dropdown.Item onClick={handleSignOut}>
          <i className="bi bi-box-arrow-right me-2"></i> Sign Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default ProfileDropdown;
