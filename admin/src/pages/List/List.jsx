import { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({endPointUrl}) => {
    const [data,setData] = useState([]);

    const fetchData = async()=>{
        const response = await axios.get(`${endPointUrl}/api/food/list`);
        if (response.data.sucess){
            setData(response.data.data)
        }else{
            toast.error("Error")
        }
    }

    const removeFood = async(foodId)=>{
        const response = await axios.post(`${endPointUrl}/api/food/remove`, {id:foodId})
        fetchData();
        if (response.data.sucess){
            toast.success(response.data.message)
        } else {
            toast.error("Error")
        }
    }

    useEffect(()=>{
        fetchData()
    },[])
    return ( 
        <div className="list add flex-col">
            <p>All Foods List</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Image</b>
                    <b>Name</b>
                    <b>Category</b>
                    <b>Price</b>
                    <b>Action</b>
                </div>
                {data.map((item,index)=>{
                    return (
                        <div key={index} className="list-table-format">
                            <img src={`${endPointUrl}/images/${item.image}`} alt="food image" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>$ {item.price}</p>
                            <p onClick={()=>{removeFood(item._id)}} className="cursor">
                                X
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
     );
}
 
export default List;