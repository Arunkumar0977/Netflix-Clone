// import React, { useEffect, useRef } from 'react'
// import './Navbar.css'
// import logo from '../../assets/logo.png'
// import search_icon from '../../assets/search_icon.svg'
// import bell_icon from '../../assets/bell_icon.svg'
// import profile_img from '../../assets/profile_img.png'
// import caret_img from '../../assets/caret_icon.svg'
// import { logout } from '../../firebase'

// const Navbar = () => {

//   const navRef = useRef();

//   useEffect(()=>{
//     window.addEventListener('scroll', ()=>{
//       if(window.scrollY >= 80){
//         navRef.current.classList.add('nav-dark')
//       }else{
//         navRef.current.classList.remove('nav-dark')
//       }
//     })
//   },[])

//   return (
//     <div ref={navRef} className='navbar'>
//       <div className="navbar-left">
//         <img src={logo} alt="" />
//         <ul>
//             <li>Home</li>
//             <li>TV Shows</li>
//             <li>Movies</li>
//             <li>New & Popular</li>
//             <li>My List</li>
//             <li>Browse by Languages</li>
//         </ul>
//       </div>
//       <div className="navbar-right">
//         <img src={search_icon} alt="icon" className='icons'/>
//         <p>Children</p>
//         <img src={bell_icon} alt="icon" className='icons'/>
//         <div className="navbar-profile">
//         <img src={profile_img} alt="icon" className='profile'/>
//         <img src={caret_img} alt="icon" />
//         <div className="dropdown">
//             <p onClick={()=>{logout()}}>Sign Out of Netflix</p>
//         </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Navbar


import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search_icon.svg';
import bell_icon from '../../assets/bell_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_img from '../../assets/caret_icon.svg';
import { logout } from '../../firebase';

const API_KEY = 'YOUR_TMDB_API_KEY';  // Replace with your actual TMDB API Key
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Navbar = () => {
  const navRef = useRef();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim() === '') return;

    try {
      const response = await fetch(`${SEARCH_API}${searchQuery}`);
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Netflix Logo" />
        <ul>
          <li>Home</li>
          <li>TV Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            <img src={search_icon} alt="Search" className="icons" />
          </button>
        </form>
        <p>Children</p>
        <img src={bell_icon} alt="Notifications" className="icons" />
        <div className="navbar-profile">
          <img src={profile_img} alt="Profile" className="profile" />
          <img src={caret_img} alt="Dropdown" />
          <div className="dropdown">
            <p onClick={() => logout()}>Sign Out of Netflix</p>
          </div>
        </div>
      </div>

      {/* Display Search Results */}
      {searchResults.length > 0 && (
        <div className="search-results">
          {searchResults.map((movie) => (
            <div key={movie.id} className="search-item">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
