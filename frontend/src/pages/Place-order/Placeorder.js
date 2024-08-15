import React, { useContext, useEffect, useState } from 'react'
import "./Placeorder.css";
import { StoreContext } from '../../context/Storecontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Placeorder() {
  const {getCartTotalAmount, token, food_list, cartItems, url} = useContext(StoreContext);
  const navigate = useNavigate();

  const [data, setData] = useState({
    firstName : "",
    lastName : "",
    email : "",
    street : "",
    city : "",
    state : "",
    zipcode : "",
    country : "",
    phone : ""
  });

  const onChangeHandler = (e) =>{
    const {name, value} = e.target;
    setData((prev)=>({
      ...prev,
      [name] : value
    }))
  }

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];
    food_list.forEach((item)=>{
      if (cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address : data,
      items : orderItems,
      amount : getCartTotalAmount() + 2
    }
    console.log(url+"/api/order/place", orderData, {headers : {token}})
    let response = await axios.post(url+"/api/order/place", orderData, {headers : {token}});
    
    if (response.data.success){
      const {session_url} = response.data;
      window.location.replace(session_url)
    } else {
      alert("Error")
    }
  }

  useEffect(()=>{
    if (!token){
      navigate("/cart");
      alert("PLease sign in to proceed further")
    } else if (getCartTotalAmount() === 0){
      navigate("/cart");
    }
  },[token])

  return (
    <form onSubmit={placeOrder} className='place-order'>
      <div className='place-order-left'>
        <p className='title'>Delivery information</p>
        <div className='multi-fields'>
          <input required type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name'/>
          <input required type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name'/>
        </div>
        <input required type="text" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address'/>
        <input required type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street'/>
        <div className='multi-fields'>
          <input required type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City'/>
          <input required type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State'/>
        </div>
        <div className='multi-fields'>
          <input required type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zipcode'/>
          <input required type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country'/>
        </div>
        <input required type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone'/>
      </div>
      <div className='place-order-right'> 
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details">
              <p>SubTotal</p>
              <p>{getCartTotalAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getCartTotalAmount() === 0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getCartTotalAmount()===0 ? 0 : getCartTotalAmount()+2}</p>
            </div>
          </div>
          <button type='submit'>
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </form>
  )
}

export default Placeorder;
