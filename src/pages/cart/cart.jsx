import React, { useEffect, useState, useContext } from 'react'
import { CartContext } from '../../CartContext';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../components/firebase'
import './cart.css'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../../AuthContext';

// icons
import { MdDeleteForever } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { Link } from 'react-router-dom';

export default function Cart() {

  const { cartList, setCartList } = useContext(CartContext);
  const { changeQuantity } = useContext(CartContext);
  const { handleDelete } = useContext(CartContext);
  const { handleClear } = useContext(CartContext);
  const [productsList, setProductsList] = useState([]);
  const productsRef = collection(db, 'products');
  const [currentList, setCurrentList] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const [checkoutOn, setCheckoutOn] = useState(false);
  const { user } = useAuth();

  //order-information
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [street, setStreet] = useState('');
  const [facility, setFacility] = useState('');
  const [zip, setZip] = useState('');

  const ordersRef = collection(db, 'orders');

  const loadCart = async () => {
    try {
      // Combine cart items with matching product details
      const combinedList = cartList.map((cartItem) => {
        const match = productsList.find(product => product.id === cartItem.id);
        return match ? { ...match, quantity: cartItem.quantity || 0 } : null; // Add quantity and handle no match
      }).filter(item => item !== null); // Remove null entries
      setCurrentList(combinedList);
    } catch (err) {
      console.error(err);
    }
  };

  const notify = () => {
    toast.error('You removed the item from cart', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const notifyOrdered = () => {
    toast.success('You order was placed succesfully', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }

  const updateProductsList = async () => {
    try {
      const data = await getDocs(productsRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setProductsList(filteredData);
    }
    catch (err) {
      console.error(err);
    }
  }

  const calculateTotalSum = () => {
    const newTotalSum = currentList.reduce((sum, product) => sum + (product.quantity || 0) * product.price, 0);
    setTotalSum(newTotalSum.toFixed(2));
  };

  useEffect(() => {
    updateProductsList();
  }, []); // This effect runs only once, when the component mounts

  useEffect(() => {
    if (productsList.length > 0) {
      loadCart();
    }
  }, [productsList, cartList]); // This effect runs whenever productsList or cartList changes

  useEffect(() => {
    calculateTotalSum();
  }, [currentList]); // This effect runs whenever currentList changes

  const handleDeleteHere = (id) => {
    handleDelete(id);
    notify();
  }

  const placeOrder = async () => {
    await addDoc(ordersRef, {
      name: name, surname: surname, email: email, country: country, region: region, city: city, street: street, facility: facility, zip: zip, items: currentList
    })
    handleClear();
    notifyOrdered();
    setCheckoutOn(!checkoutOn);
  } 

  return (
    <div className='cart-container'>
      {
        checkoutOn ? <section className='checkout-menu-container'>
          <div className='checkout-menu-wrapper'>
            <ImCross className='exit-checkout-menu' onClick={() => setCheckoutOn(!checkoutOn)} />
            <h1>Delivery Information:</h1>
            <div className='checkout-fields'>
              <div className='name-sec'>
                <div>
                  <p>Name:</p>
                  <input type='text' placeholder='your name' value={name} onChange={(e) => setName(e.target.value)}></input>
                </div>
                <div>
                  <p>Surname: </p>
                  <input type='text' placeholder='your surname' value={surname} onChange={(e) => setSurname(e.target.value)}></input>
                </div>
              </div>
              <div>
                <p>Email:</p>
                <input type='email' placeholder='your email' className='email' value={email} onChange={(e) => setEmail(e.target.value)}></input>
              </div>
              <div className='name-sec'>
                <div>
                  <p>Country:</p>
                  <select id="country" name="country" class="form-control" onChange={(e) => setCountry(e.target.value)}>
                    <option value={""} selected='selected'></option>
                    <option value="Afghanistan">Afghanistan</option>
                    <option value="Åland Islands">Åland Islands</option>
                    <option value="Albania">Albania</option>
                    <option value="Algeria">Algeria</option>
                    <option value="American Samoa">American Samoa</option>
                    <option value="Andorra">Andorra</option>
                    <option value="Angola">Angola</option>
                    <option value="Anguilla">Anguilla</option>
                    <option value="Antarctica">Antarctica</option>
                    <option value="Antigua and Barbuda">Antigua and Barbuda</option>
                    <option value="Argentina">Argentina</option>
                    <option value="Armenia">Armenia</option>
                    <option value="Aruba">Aruba</option>
                    <option value="Australia">Australia</option>
                    <option value="Austria">Austria</option>
                    <option value="Azerbaijan">Azerbaijan</option>
                    <option value="Bahamas">Bahamas</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Bangladesh">Bangladesh</option>
                    <option value="Barbados">Barbados</option>
                    <option value="Belarus">Belarus</option>
                    <option value="Belgium">Belgium</option>
                    <option value="Belize">Belize</option>
                    <option value="Benin">Benin</option>
                    <option value="Bermuda">Bermuda</option>
                    <option value="Bhutan">Bhutan</option>
                    <option value="Bolivia">Bolivia</option>
                    <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
                    <option value="Botswana">Botswana</option>
                    <option value="Bouvet Island">Bouvet Island</option>
                    <option value="Brazil">Brazil</option>
                    <option value="British Indian Ocean Territory">British Indian Ocean Territory</option>
                    <option value="Brunei Darussalam">Brunei Darussalam</option>
                    <option value="Bulgaria">Bulgaria</option>
                    <option value="Burkina Faso">Burkina Faso</option>
                    <option value="Burundi">Burundi</option>
                    <option value="Cambodia">Cambodia</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Cape Verde">Cape Verde</option>
                    <option value="Cayman Islands">Cayman Islands</option>
                    <option value="Central African Republic">Central African Republic</option>
                    <option value="Chad">Chad</option>
                    <option value="Chile">Chile</option>
                    <option value="China">China</option>
                    <option value="Christmas Island">Christmas Island</option>
                    <option value="Cocos (Keeling) Islands">Cocos (Keeling) Islands</option>
                    <option value="Colombia">Colombia</option>
                    <option value="Comoros">Comoros</option>
                    <option value="Congo">Congo</option>
                    <option value="Congo, The Democratic Republic of The">Congo, The Democratic Republic of The</option>
                    <option value="Cook Islands">Cook Islands</option>
                    <option value="Costa Rica">Costa Rica</option>
                    <option value="Cote D'ivoire">Cote D'ivoire</option>
                    <option value="Croatia">Croatia</option>
                    <option value="Cuba">Cuba</option>
                    <option value="Cyprus">Cyprus</option>
                    <option value="Czech Republic">Czech Republic</option>
                    <option value="Denmark">Denmark</option>
                    <option value="Djibouti">Djibouti</option>
                    <option value="Dominica">Dominica</option>
                    <option value="Dominican Republic">Dominican Republic</option>
                    <option value="Ecuador">Ecuador</option>
                    <option value="Egypt">Egypt</option>
                    <option value="El Salvador">El Salvador</option>
                    <option value="Equatorial Guinea">Equatorial Guinea</option>
                    <option value="Eritrea">Eritrea</option>
                    <option value="Estonia">Estonia</option>
                    <option value="Ethiopia">Ethiopia</option>
                    <option value="Falkland Islands (Malvinas)">Falkland Islands (Malvinas)</option>
                    <option value="Faroe Islands">Faroe Islands</option>
                    <option value="Fiji">Fiji</option>
                    <option value="Finland">Finland</option>
                    <option value="France">France</option>
                    <option value="French Guiana">French Guiana</option>
                    <option value="French Polynesia">French Polynesia</option>
                    <option value="French Southern Territories">French Southern Territories</option>
                    <option value="Gabon">Gabon</option>
                    <option value="Gambia">Gambia</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Germany">Germany</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Gibraltar">Gibraltar</option>
                    <option value="Greece">Greece</option>
                    <option value="Greenland">Greenland</option>
                    <option value="Grenada">Grenada</option>
                    <option value="Guadeloupe">Guadeloupe</option>
                    <option value="Guam">Guam</option>
                    <option value="Guatemala">Guatemala</option>
                    <option value="Guernsey">Guernsey</option>
                    <option value="Guinea">Guinea</option>
                    <option value="Guinea-bissau">Guinea-bissau</option>
                    <option value="Guyana">Guyana</option>
                    <option value="Haiti">Haiti</option>
                    <option value="Heard Island and Mcdonald Islands">Heard Island and Mcdonald Islands</option>
                    <option value="Holy See (Vatican City State)">Holy See (Vatican City State)</option>
                    <option value="Honduras">Honduras</option>
                    <option value="Hong Kong">Hong Kong</option>
                    <option value="Hungary">Hungary</option>
                    <option value="Iceland">Iceland</option>
                    <option value="India">India</option>
                    <option value="Indonesia">Indonesia</option>
                    <option value="Iran, Islamic Republic of">Iran, Islamic Republic of</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Ireland">Ireland</option>
                    <option value="Isle of Man">Isle of Man</option>
                    <option value="Israel">Israel</option>
                    <option value="Italy">Italy</option>
                    <option value="Jamaica">Jamaica</option>
                    <option value="Japan">Japan</option>
                    <option value="Jersey">Jersey</option>
                    <option value="Jordan">Jordan</option>
                    <option value="Kazakhstan">Kazakhstan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kiribati">Kiribati</option>
                    <option value="Korea, Democratic People's Republic of">Korea, Democratic People's Republic of</option>
                    <option value="Korea, Republic of">Korea, Republic of</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Kyrgyzstan">Kyrgyzstan</option>
                    <option value="Lao People's Democratic Republic">Lao People's Democratic Republic</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Lesotho">Lesotho</option>
                    <option value="Liberia">Liberia</option>
                    <option value="Libyan Arab Jamahiriya">Libyan Arab Jamahiriya</option>
                    <option value="Liechtenstein">Liechtenstein</option>
                    <option value="Lithuania">Lithuania</option>
                    <option value="Luxembourg">Luxembourg</option>
                    <option value="Macao">Macao</option>
                    <option value="Macedonia, The Former Yugoslav Republic of">Macedonia, The Former Yugoslav Republic of</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Malaysia">Malaysia</option>
                    <option value="Maldives">Maldives</option>
                    <option value="Mali">Mali</option>
                    <option value="Malta">Malta</option>
                    <option value="Marshall Islands">Marshall Islands</option>
                    <option value="Martinique">Martinique</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Mauritius">Mauritius</option>
                    <option value="Mayotte">Mayotte</option>
                    <option value="Mexico">Mexico</option>
                    <option value="Micronesia, Federated States of">Micronesia, Federated States of</option>
                    <option value="Moldova, Republic of">Moldova, Republic of</option>
                    <option value="Monaco">Monaco</option>
                    <option value="Mongolia">Mongolia</option>
                    <option value="Montenegro">Montenegro</option>
                    <option value="Montserrat">Montserrat</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Mozambique">Mozambique</option>
                    <option value="Myanmar">Myanmar</option>
                    <option value="Namibia">Namibia</option>
                    <option value="Nauru">Nauru</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Netherlands">Netherlands</option>
                    <option value="Netherlands Antilles">Netherlands Antilles</option>
                    <option value="New Caledonia">New Caledonia</option>
                    <option value="New Zealand">New Zealand</option>
                    <option value="Nicaragua">Nicaragua</option>
                    <option value="Niger">Niger</option>
                    <option value="Nigeria">Nigeria</option>
                    <option value="Niue">Niue</option>
                    <option value="Norfolk Island">Norfolk Island</option>
                    <option value="Northern Mariana Islands">Northern Mariana Islands</option>
                    <option value="Norway">Norway</option>
                    <option value="Oman">Oman</option>
                    <option value="Pakistan">Pakistan</option>
                    <option value="Palau">Palau</option>
                    <option value="Palestinian Territory, Occupied">Palestinian Territory, Occupied</option>
                    <option value="Panama">Panama</option>
                    <option value="Papua New Guinea">Papua New Guinea</option>
                    <option value="Paraguay">Paraguay</option>
                    <option value="Peru">Peru</option>
                    <option value="Philippines">Philippines</option>
                    <option value="Pitcairn">Pitcairn</option>
                    <option value="Poland">Poland</option>
                    <option value="Portugal">Portugal</option>
                    <option value="Puerto Rico">Puerto Rico</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Reunion">Reunion</option>
                    <option value="Romania">Romania</option>
                    <option value="Russian Federation">Russian Federation</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saint Helena">Saint Helena</option>
                    <option value="Saint Kitts and Nevis">Saint Kitts and Nevis</option>
                    <option value="Saint Lucia">Saint Lucia</option>
                    <option value="Saint Pierre and Miquelon">Saint Pierre and Miquelon</option>
                    <option value="Saint Vincent and The Grenadines">Saint Vincent and The Grenadines</option>
                    <option value="Samoa">Samoa</option>
                    <option value="San Marino">San Marino</option>
                    <option value="Sao Tome and Principe">Sao Tome and Principe</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Serbia">Serbia</option>
                    <option value="Seychelles">Seychelles</option>
                    <option value="Sierra Leone">Sierra Leone</option>
                    <option value="Singapore">Singapore</option>
                    <option value="Slovakia">Slovakia</option>
                    <option value="Slovenia">Slovenia</option>
                    <option value="Solomon Islands">Solomon Islands</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Georgia and The South Sandwich Islands">South Georgia and The South Sandwich Islands</option>
                    <option value="Spain">Spain</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Suriname">Suriname</option>
                    <option value="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
                    <option value="Swaziland">Swaziland</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Switzerland">Switzerland</option>
                    <option value="Syrian Arab Republic">Syrian Arab Republic</option>
                    <option value="Taiwan">Taiwan</option>
                    <option value="Tajikistan">Tajikistan</option>
                    <option value="Tanzania, United Republic of">Tanzania, United Republic of</option>
                    <option value="Thailand">Thailand</option>
                    <option value="Timor-leste">Timor-leste</option>
                    <option value="Togo">Togo</option>
                    <option value="Tokelau">Tokelau</option>
                    <option value="Tonga">Tonga</option>
                    <option value="Trinidad and Tobago">Trinidad and Tobago</option>
                    <option value="Tunisia">Tunisia</option>
                    <option value="Turkey">Turkey</option>
                    <option value="Turkmenistan">Turkmenistan</option>
                    <option value="Turks and Caicos Islands">Turks and Caicos Islands</option>
                    <option value="Tuvalu">Tuvalu</option>
                    <option value="Uganda">Uganda</option>
                    <option value="Ukraine">Ukraine</option>
                    <option value="United Arab Emirates">United Arab Emirates</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                    <option value="United States Minor Outlying Islands">United States Minor Outlying Islands</option>
                    <option value="Uruguay">Uruguay</option>
                    <option value="Uzbekistan">Uzbekistan</option>
                    <option value="Vanuatu">Vanuatu</option>
                    <option value="Venezuela">Venezuela</option>
                    <option value="Viet Nam">Viet Nam</option>
                    <option value="Virgin Islands, British">Virgin Islands, British</option>
                    <option value="Virgin Islands, U.S.">Virgin Islands, U.S.</option>
                    <option value="Wallis and Futuna">Wallis and Futuna</option>
                    <option value="Western Sahara">Western Sahara</option>
                    <option value="Yemen">Yemen</option>
                    <option value="Zambia">Zambia</option>
                    <option value="Zimbabwe">Zimbabwe</option>
                  </select>
                </div>
                <div>
                  <p>Region/Oblast/State:</p>
                  <input type='text' placeholder='your region' value={region} onChange={(e) => setRegion(e.target.value)}></input>
                </div>
              </div>
              <div className='name-sec'>
                <div>
                  <p>City/Town/Village:</p>
                  <input type='text' placeholder='your town name' value={city} onChange={(e) => setCity(e.target.value)}></input>
                </div>
                <div>
                  <p>Street:</p>
                  <input type='text' placeholder='your street name' value={street} onChange={(e) => setStreet(e.target.value)}></input>
                </div>
              </div>
              <div className='name-sec'>
                <div>
                  <p>Facility №:</p>
                  <input type='number' placeholder='your facility number' value={facility} onChange={(e) => setFacility(e.target.value)}></input>
                </div>
                <div>
                  <p>Zip Code</p>
                  <input type='number' placeholder='your zip-code' value={zip} onChange={(e) => setZip(e.target.value)}></input>
                </div>
              </div>
              <button disabled={name.length === 0 || surname.length === 0 || email.length === 0 || email.includes('@') === false || country.length === 0 || region.length === 0 || city.length === 0 || street.length === 0 || facility.length === 0 || zip.length === 0} onClick={placeOrder}>Place Order</button>
              <p>Make sure to fill all the fields above</p>
            </div>
          </div>
        </section> : null
      }
      {user ? (user.uid === '0I7n46QjZIPZsfhMHs3wzPiWSHG2' ? <Link to='/orders'><button id='check-orders-btn'>Check orders</button></Link> : null) : null}
      <ToastContainer />
      {
        currentList.map((product) => (
          <div className='cart-wrapper'>
            <img src={product.img} alt={product.name} />
            <h1>{product.name}</h1>
            <input
              type="number"
              placeholder={product.quantity}
              onChange={(e) => changeQuantity(product.id, e.target.value)}
              min="0"
              step="1"
              onInput={(e) => e.target.value.replace(/[^0-9]/g, '').replace(/^0+/, '')}
            />
            <p>${(product.price * product.quantity).toFixed(2)}</p>
            <MdDeleteForever className='delete-from-cart' onClick={() => handleDeleteHere(product.id)} />
          </div>
        ))
      }
      <div>
        {
          currentList.length === 0 ?
          <div className='checkout-wrapper'>
            <p>Your cart is empty.</p>
            <Link to='/shop'><button>Go shopping</button></Link>
          </div>
          : <div className='checkout-wrapper'>
              <p>Total: ${totalSum}</p>
              <button onClick={() => setCheckoutOn(!checkoutOn)}>Checkout</button>
            </div>
        }
      </div>
    </div>
  );
}  
