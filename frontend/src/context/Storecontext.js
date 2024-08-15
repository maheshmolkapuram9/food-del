import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = (props)=>{

    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:3123";
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([]);

    const addToCart = async (itemID) =>{
        if (!cartItems[itemID]){
            setCartItems(prev=>{
                return {...prev,[itemID]:1}
            }) 
        } else {
            setCartItems(prev=>{
                return {...prev,[itemID]:prev[itemID]+1}
            })
        }
        if (token){
            await axios.post(`${url}/api/cart/add`,{itemId : itemID}, {headers : {token}})
        }
    }

    const removeFromCart = async (itemID) =>{
        setCartItems(prev => {
            return {...prev, [itemID]:prev[itemID]-1}
        })
        if (token){
            await axios.post(`${url}/api/cart/remove`, {itemId : itemID}, {headers : {token}})
        }
    }

    const getCartTotalAmount = () => {
        let totalAmount = 0;
        for (const item in cartItems){
            if (cartItems[item] > 0){
                let food_info = food_list.find(product => product._id === item);
                totalAmount += food_info.price * cartItems[item] 
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async ()=>{
        const response = await axios.get(`${url}/api/food/list`);
        setFoodList(response.data.data)
    }

    const loadCartData = async(token)=>{
        const response = await axios.post(`${url}/api/cart/get`, {}, {headers : {token}});
        setCartItems(response.data.cart);
    }

    useEffect(()=>{
        async function loadData(){
            await fetchFoodList()
            if (localStorage.getItem("token")){
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadData();
    },[])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getCartTotalAmount,
        url,
        token,
        setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;