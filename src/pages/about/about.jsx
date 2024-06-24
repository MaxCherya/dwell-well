import React, { useEffect, useState } from 'react'
import missionData from "./missionData";
import galleryData from './galleryData';
import logo from '../../imgs/logo.png'
import './about.css'

// icons
import { SiCodefresh } from "react-icons/si";
import { MdExpandCircleDown } from "react-icons/md";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { FaCircleDot } from "react-icons/fa6";
import { FaRegDotCircle } from "react-icons/fa";

export default function About() {

  const [currentlySelected, setCurrentlySelected] = useState(null);
  const [currentlySelectedImg, setCurrentlySelectedImg] = useState(0);

  const selectedHandler = (id) => {
    if (id === currentlySelected) {
      setCurrentlySelected(null);
    }
    else {
      setCurrentlySelected(id);
    }
  }

  const handleNextImg = () => {
    if (currentlySelectedImg === galleryData.length - 1) {
      setCurrentlySelectedImg(0);
    }
    else {
      setCurrentlySelectedImg(currentlySelectedImg + 1);
    }
    console.log(currentlySelectedImg);
  }

  const handlePreviousImg = () => {
    if (currentlySelectedImg === 0) {
      setCurrentlySelectedImg(galleryData.length - 1);
    }
    else {
      setCurrentlySelectedImg(currentlySelectedImg - 1);
    }
    console.log(currentlySelectedImg);
  }

  return (
    <div className='bady'>
      <div className='scroller'></div>
      <div className='big-wrapper'>
        <div className='headEr'>
          <h1>Dwell Well Inc.: About Us</h1>
        </div>
        <section className='short-description'>
          <div className='sd-wrapper'>
            <SiCodefresh id='fresh-icon' />
            <p>Welcome to Dwell Well Inc., your one-stop shop for healthy living! We're passionate about providing our customers with fresh, high-quality organic food that's good for you and good for the planet.</p>
          </div>
        </section>
        <section className='our-mission'>
          <p id='head-mission'>At Dwell Well Inc., we believe that everyone deserves access to healthy, nutritious food grown with sustainability in mind. We are committed to:</p>
          <div className='accordian'>
            {
              missionData && missionData.length > 0 ? (
                missionData.map((item) => (
                  <div className='data-item' onClick={() => selectedHandler(item.id)}>
                    <h1 className='item-mission'>{item.mission}</h1>
                    <MdExpandCircleDown className='item-expand' />
                    {
                      currentlySelected === item.id ?
                        <p className='item-description'>{item.description}</p>
                        : null
                    }
                  </div>
                ))
              )
                : (<p>No Data Found</p>)
            }
          </div>
        </section>
        <section className='our-vision'>
          <p>Dwell Well Inc. aspires to be a beacon of healthy living, leading the way in organic food delivery on a global scale. We envision a future where fresh, organic food is readily accessible to everyone, seamlessly integrated into daily routines.  Through innovation and a deep commitment to our customers, we strive to make a lasting positive impact on people's health and the well-being of our planet.</p>
          <div className='img-accordion'>
            {galleryData && galleryData.length > 0
              ? (
                galleryData.map((item) => (
                  currentlySelectedImg === item.id ?
                    (
                      <div className='img-container-accordion'>
                        <img src={item.url} alt='gallery' />
                        <GrPrevious className='cntrls-imgs-prev' onClick={handlePreviousImg} />
                        <GrNext className='cntrls-imgs-next' onClick={handleNextImg} />
                      </div>
                    )
                    : null
                ))
              )
              : <p>No Data Found...</p>
            }
            <div className='img-accordion-cntrl'>
              <GrPrevious className='cntrls-imgs' onClick={handlePreviousImg} />
              {galleryData.map((item) => (
                <div className='nav-imgs-accordion'>
                  {
                    currentlySelectedImg === item.id ? <FaRegDotCircle /> : <FaCircleDot onClick={() => setCurrentlySelectedImg(item.id)} />
                  }
                </div>
              ))}
              <GrNext className='cntrls-imgs' onClick={handleNextImg} />
            </div>
          </div>
        </section>
        <section className='why-choose-us'>
          <p>
            At Dwell Well Inc., we don't just deliver groceries, we deliver fresh, organic goodness straight to your door. We prioritize exceptional quality, ensuring peak freshness and the highest nutritional value in every bite.  Convenience is key –  order online and free up your time for the things that matter. Plus, we're committed to sustainable practices throughout our supply chain, so you can feel good about nourishing yourself and the planet.  Join the Dwell Well community – choose healthy, choose convenient, choose sustainable.
          </p>
        </section>
        <section className='our-team-container'>
          <h1>Meet Our Team:</h1>
          <div className='our-team-wrapper'>
            <div className='team-member-wrapper'>
              <img src='https://ideogram.ai/assets/image/lossless/response/mSTnzg3WSn6cxxneVKvEUg' alt='David Lee' />
              <p className='team-member-wrapper-name'>David Lee</p>
              <p>Title: Produce Manager</p>
            </div>
            <div className='team-member-wrapper'>
              <img src='https://ideogram.ai/assets/image/lossless/response/Zb7xntzFRVCw5SxctyGf_Q' alt='Maria Rodriguez' />
              <p className='team-member-wrapper-name'>Maria Rodriguez</p>
              <p>Title: Marketing Specialist</p>
            </div>
            <div className='team-member-wrapper'>
              <img src='https://ideogram.ai/assets/image/lossless/response/o0B7ZLnrQj-Hi2lFM2jFwg' alt='Sarah Green' />
              <p className='team-member-wrapper-name'>Sarah Green</p>
              <p>Title: Customer Service Representative (East Region)</p>
            </div>
          </div>
        </section>
        <section className='footer-about'>
          <div className='footer-about-wrapper'>
            <div className='footer-about-left'>
              <p>dwell-well@inc.com</p>
              <p>(555) 555-5559</p>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3025.935784198827!2d-74.01806702393995!3d40.67538383985636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a8f2a2c4539%3A0x92fb04808ede9dd8!2s142%20Beard%20St%2C%20Brooklyn%2C%20NY%2011231%2C%20USA!5e0!3m2!1sen!2sua!4v1718705691496!5m2!1sen!2sua"
                className="map-iframe"
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="address"
              />
            </div>
            <div className='footer-about-right'>
              <img src={logo} alt='logo' />
              <p>© Dwell Well Inc.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
