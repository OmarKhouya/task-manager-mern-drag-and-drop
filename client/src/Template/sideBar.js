import { Link } from "react-router-dom";
import "./sidebar.css";
import "boxicons/css/boxicons.min.css";
export default function SideBar() {
  return (
        <div className="sidebar">
          <ul className="sidebar-ul">
            <li className="sidebar-li">
              <Link to={'/'} className="sidebar-nav-link">
                <span className="item-icon">
                  <i className="bx bxs-home"></i>
                </span>
                <span className="sidebar-item-txt">Home</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link to={'/about'} className="sidebar-nav-link">
                <span className="item-icon">
                  <i className="bx bxs-info-circle"></i>
                </span>
                <span className="sidebar-item-txt">About</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link to={"/services"} className="sidebar-nav-link">
                <span className="item-icon">
                  <i className="bx bx-task"></i>
                </span>
                <span className="sidebar-item-txt">Services</span>
              </Link>
            </li>
            <li className="sidebar-li">
              <Link to={"/contact"} className="sidebar-nav-link">
                <span className="item-icon">
                  <i className="bx bxs-contact"></i>
                </span>
                <span className="sidebar-item-txt">Contact</span>
              </Link>
            </li>
          </ul>
        </div>
  );
}
