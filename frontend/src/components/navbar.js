import { useState } from 'react';

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Logo />
      </div>
      
      <button 
        className="navbar-toggler"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`navbar-collapse ${isOpen ? 'show' : ''}`}>
        <NavMenu />
      </div>
    </nav>
  );
}

function Logo() {
  return (
    <div className="navbar-brand">
      <img src="./assets/images/icon.jpg" alt="Site logo" />
    </div>
  );
}

function NavMenu() {
  return (
    <ul className="navbar-nav">
      <li><a href="#">Trang chủ</a></li>
      <li><a href="#">Về chúng tôi</a></li>
      <li><a href="#">Liên hệ</a></li>
    </ul>
  );
}

export default Navbar;

