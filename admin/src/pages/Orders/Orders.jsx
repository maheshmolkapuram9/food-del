import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import {assets} from "../../assets/assets";
import "./Orders.css";

const Orders = ({ endPointUrl }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const response = await axios.get(endPointUrl + "/api/order/listingorders");
        if (response.data.success){
            setData(response.data.data)
        } else {
            toast.error(response.data.message)
        }
    }

    const statusHandler = async(e, orderId) => {
        const response = axios.post(endPointUrl + "/api/order/status", 
            {status : e.target.value, orderId});
        if ((await response).data.success){
            await fetchData();
        }
    }

    useEffect(()=>{
        fetchData()
    },[])

    return ( 
        <div className="order add">
            <h3>Orders page</h3>
             <div className="order-list">
                {data.map((order,index)=>{ 
                    return(
                    <div key={index} className="order-item">
                        <img src={assets.parcel_icon} alt="parcel icon" />
                        <div>
                            <p className="order-item-food">
                                {order.items.map((item,index)=>{
                                    if (index === order.items.length - 1){
                                        return item.name + " x " + item.quantity
                                    } else {
                                        return item.name + " x " + item.quantity + ","
                                    }   
                                })}
                            </p>
                            <p className="order-item-name">{order.address.firstName + " " + order.address.lastName}</p>
                            <div className="order-item-address">
                                <p>{order.address.street}</p>
                                <p>{order.address.city + ", " + order.address.state + ", " + order.address.zipcode} </p>
                            </div>
                            <p className="order-item-phone">{order.address.phone}</p> 
                        </div>
                        <p>Orders : {order.items.length}</p>
                        <p>$ {order.amount}</p>
                        <select onChange={(e)=>{statusHandler(e,order._id)}} value={order.status}>
                            <option value="Food Processing">Food Processing</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Food Delivered">Food Delivered</option>
                        </select>
                    </div>
                )})}
             </div>
        </div>
     );
}
 
export default Orders;