import { Link, NavLink } from 'react-router-dom';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import {
  FaHome,
  FaInfoCircle,
  FaEnvelope,
  FaBars,
  FaTimes,
} from 'react-icons/fa';
import '../App.css';
import { useState } from 'react';
import Button from './Button';

export default function Header() {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <FaHome />,
      to: '/',
    },
    {
      id: 'about',
      label: 'About',
      icon: <FaInfoCircle />,
      to: 'about',
    },
    {
      id: 'contact',
      label: 'Contact',
      icon: <FaEnvelope />,
      to: 'contact',
    },
    {
      id: 'board',
      label: 'Board',
      to: 'board',
    },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleNavClick = item => {
    if (item.id === 'about' || item.id === 'contact') {
      toastr.error(`${item.label} 페이지는 현재 사용하실 수 없습니다.`);
      return false;
    }
    return true;
  };

  return (
    <header className="bg-gray-800 text-white px-4 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center h-14">
        <div>
          <Link to="/" className="text-xl font-bold">
            Janghee Plans
          </Link>
        </div>
        <nav className="space-x-4 md:flex hidden">
          {navItems.map(item => (
            <NavLink
              key={item.id}
              to={item.to}
              className="hover:text-gray-300"
              onClick={e => {
                const shouldNavigation = handleNavClick(item);
                if (!shouldNavigation) {
                  e.preventDefault(); // 페이지 전환 방지
                }
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <button className="md:hidden" onClick={toggleMenu}>
          <FaBars />
        </button>
        {/* <Button className="hidden md:block">게시판</Button> */}
        <Link
          to={'/board'}
          className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white font-bold py-1.5px px-4 rounded transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          게시판
        </Link>
      </div>

      {/* Mobile Menu */}
      <aside
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 z-50 ${isMenuOpen ? '-translate-x-full' : 'translate-x-0'} md:hidden transform transition-transform duration-300 ease-in-out`}
      >
        <div className="flex justify-end p-4">
          <button
            className="text-white focus:outline-none"
            aria-label="Close menu"
            onClick={toggleMenu}
          >
            <FaTimes className="h-6 w-6" />
          </button>
        </div>
        <nav className="flex flex-col space-y-4 p-4">
          {navItems.map(item => (
            <NavLink
              key={item.id}
              to={item.to}
              onClick={e => {
                const shouldNavigation = handleNavClick(item);
                if (!shouldNavigation) {
                  e.preventDefault(); // 페이지 전환 방지
                }
              }}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </header>
  );
}
