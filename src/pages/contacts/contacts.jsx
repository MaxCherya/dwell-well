import React, { useEffect } from 'react'
import './contacts.css'
import image1 from '../../imgs/contacts-img1.jpg'
import { auth, googleProvider } from '../../components/firebase'
import { signInWithPopup, signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';

// icons
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Contacts() {

  const { user, setUser } = useAuth();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const loggedInSuc = () => toast.success('You have logged in to your account', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const loggedOuSuc = () => toast.success('You have logged out from your account', {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });

  const signInGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      loggedInSuc();
    }
    catch (err) {
      console.error(err)
      toast.error(`'${err}'`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      loggedOuSuc();
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <div className='very-bg'>
      <ToastContainer />
      <section className='block1'>
        <div className='text-block1'>
          <h1>Dwell Well Inc. - Contact Us</h1>
          <p><b>We're here to help!</b> Whether you have questions about our products, delivery options, or simply want to connect, we'd love to hear from you.</p>
        </div>
        <div className='img-block'>
          <img src={image1} alt='support' />
        </div>
      </section>
      <section className='block2'>
        <div className='block2-container'>
          <FaPhoneAlt id='phone' />
          <div className='block2-wrapper'>
            <h1>Customer service:</h1>
            <p>(555) 555-5555</p>
          </div>
          <div className='block2-wrapper'>
            <p>Working hours:</p>
            <p>9:00 AM - 5:00 PM</p>
            <p>Monday-Friday</p>
          </div>
        </div>
        <div className='block2-container'>
          <MdEmail id='email' />
          <div className='block2-wrapper'>
            <h1>Email for coperation:</h1>
            <p>dwell-well@inc.com</p>
          </div>
          <div className='block2-wrapper'>
            <p>Best use for fast cooperation</p>
            <p>and</p>
            <p>business deals</p>
          </div>
        </div>
      </section>
      <section className='block3'>
        {user ? (
          <div className='sign-out'>
            <img src={user.photoURL} alt={user.displayName} />
            <p>Welcome, {user.displayName}</p>
            {user ? (user.uid === '0I7n46QjZIPZsfhMHs3wzPiWSHG2' ? (
              <p id='adm-prof'>Admin Profile Active</p>
            ) : null) : null}
            <button onClick={logout}>Sign Out</button>
          </div>
        ) : (
          <div className='sign-in'>
            <p>If you want to receive latest updates of our products sign in with your google account:</p>
            <button onClick={signInGoogle}>Sign In with Google</button>
          </div>
        )}
      </section>
      <section>
      </section>
    </div>
  )
}
