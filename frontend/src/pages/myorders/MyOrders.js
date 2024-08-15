import axios from "axios";
import { StoreContext } from "../../context/Storecontext";
import "./MyOrders.css";
import {useContext, useEffect, useState} from "react";
import { assets } from "../../assets/assets";

const MyOrders = () => {
    const {url, token} = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchingUserOrdersData = async () => {
        const response = await axios.post(url + "/api/order/userorders", {}, {headers : {token}});
        if (response.data.success){
            setData(response.data.userOrdersData);
        }
    }

    useEffect(()=>{
        fetchingUserOrdersData();
    }, [token , url])

    return ( 
        <div className="my-orders">
            <div className="container">
                {data.map((order,index)=>{
                    return (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="parcel icon" />
                            
                                {order.items.map((item,index)=>{
                                    if (index === order.items.length - 1){
                                        return item.name + " x " + item.quantity
                                    } else {
                                        return item.name + " x " + item.quantity + ", "
                                    }
                                })}
                                <p>${order.amount}.00</p>
                                <p>Items: {order.items.length}</p>
                                <p><span>&#x25cf;</span><b>{order.status}</b></p>
                                <button onClick={fetchingUserOrdersData}>Track Order</button>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default MyOrders;