import React, { useContext } from 'react'
import "./Fooddisplay.css";
import { StoreContext } from '../../context/Storecontext';
import FoodItem from '../FoodItem/FoodItem';

export default function Fooddisplay({category}) {
    const {food_list} = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((food,index)=>{
              if (category==="All" || category===food.category){
                return <FoodItem 
                key={index} 
                id={food._id} 
                name={food.name} 
                price={food.price}
                description={food.description}
                image={food.image}/>
              } else {
                return false
              }
        })}
      </div>
    </div>
  )
}
