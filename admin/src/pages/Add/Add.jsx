import "./Add.css";
import {assets} from "../../assets/assets"
import { useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const Add = ({endPointUrl}) => {
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name : "",
        description : "",
        category : "salad",
        price : ""
    })

    const handleData = (e)=>{
        const {name, value} = e.target;
        setData(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        // const endPointUrl = "http://localhost:3123";
        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("category",data.category);
        formData.append("price",Number(data.price));
        formData.append("image",image);
        const response = await axios.post(`${endPointUrl}/api/food/add`, formData);
        if (response.data.sucess){
            setData({
                name : "",
                description : "",
                category : "salad",
                price : ""
            });
            setImage(false);
            toast.success(response.data.message)
        } else {
            console.log("form data is not added sucessfully");
            toast.error(response.data.message)
        }
    }

    return ( 
        <div className="add">
            <form action="flex-col" onSubmit={handleSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image">
                        <img src={image?URL.createObjectURL(image) :assets.upload_area} alt="upload area" />
                    </label>
                    <input onChange={(e)=>{return setImage(e.target.files[0])}} type="file" id="image" name="image" hidden required />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product Name</p>
                    <input onChange={handleData} value={data.name} type="text" name="name" placeholder="Type here" required />

                </div>
                <div className="add-product-description flex-col">
                    <p>Product Description</p>
                    <textarea onChange={handleData} value={data.description} name="description" rows="6" placeholder="write content here" required></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product Category</p>
                        <select onChange={handleData} value={data.category} name="category">
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product Price</p>
                        <input onChange={handleData} value={data.price} type="number" name="price" placeholder="$20"/>
                    </div>
                </div>
                <button type="submit" className="add-btn">ADD</button>
            </form>
        </div>
     );
}
 
export default Add;