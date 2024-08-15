import React, { useContext } from 'react'
import "./Cart.css";
import { StoreContext } from '../../context/Storecontext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const {cartItems, food_list, removeFromCart, getCartTotalAmount, url} = useContext(StoreContext);
  const navigate = useNavigate();

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {food_list.map((item,index) => {
          if (cartItems[item._id] > 0){
            return (
              <div key={index}>
                <div className='cart-items-title cart-items-item'>
                  <img src={`${url}/images/${item.image}`} alt={item.name} />
                  <p>{item.name}</p>
                  <p>$ {item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>$ {item.price * cartItems[item._id]}</p>
                  <p className='cross' onClick={()=>removeFromCart(item._id)}>
                    X
                  </p>
                </div>
                <hr />
              </div>
            )
          } else {
            return false
          }
        })}
      </div>
      <div className="cart-bottom">
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
              <p>{getCartTotalAmount()===0 ? 0 : 2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getCartTotalAmount()===0 ? 0 : getCartTotalAmount()+2}</p>
            </div>
          </div>
          <button onClick={()=>{navigate("/placeorder")}}>
            PROCEED TO CHECKOUT
          </button>
        </div>
        <div className='cart-promocode'>
          <div>
            <p>If you have a promocode, Enter it here</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='Enter your promocode here' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
