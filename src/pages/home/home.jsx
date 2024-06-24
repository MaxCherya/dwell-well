import React from 'react';
import './styles.css'; // Your existing styles

// Multimedia
import bgVideo from '../../imgs/bg-video.mp4';
import { NavLink } from 'react-router-dom';
import WaterButton from '../../components/water-btn/WaterButton'; // Import the WaterButton component

// icons
import { FaBasketShopping } from "react-icons/fa6";

export default function Home() {
  return (
    <header>
      <div className='overlay'></div>
      <video src={bgVideo} autoPlay loop muted />
      <div className='text-wrapper'>
        <h1>Dwell Well Inc.</h1>
        <p>Fresh, organic groceries delivered to your door. Eat well, live well.</p>
        <NavLink to={'/shop'}>
          <WaterButton><FaBasketShopping />&nbsp; Shop Now</WaterButton>
        </NavLink>
      </div>
    </header>
  )
}
