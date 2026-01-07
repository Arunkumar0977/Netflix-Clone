import React from 'react' 
import './Footer.css'
import youtube_icon from '../../assets/youtube_icon.png'
import twitter_icon from '../../assets/twitter_icon.png'
import insta_icon from '../../assets/instagram_icon.png'
import fb_icon from '../../assets/facebook_icon.png'

const Footer = () => {
  return (
    <div className='footer'>
      <div className="footer-icons">
        <img src={youtube_icon} alt="" />
        <img src={twitter_icon} alt="" />
        <img src={insta_icon} alt="" />
        <img src={fb_icon} alt="" />
      </div>
      <ul>
        <li>Audio Description</li>
        <li>Help Centre</li>
        <li>Gift Cards</li>
        <li>Media Centre</li>
        <li>Investor Relation</li>
        <li>Jobs</li>
        <li>Terms of User</li>
        <li>Privacy</li>
        <li>Legal Notices</li>
        <li>Cookies Preference</li>
        <li>Corporate Information</li>
        <li>Contact Us</li>
      </ul>
      <p className='copyright-text'>© 1997-2024 Netflix, Inc.</p>
    </div>
  )
}

export default Footer
