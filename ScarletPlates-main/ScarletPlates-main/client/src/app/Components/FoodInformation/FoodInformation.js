'use client';
import styles from './FoodInformation.module.css'
import { useState, useEffect } from 'react';
import axios from 'axios';




export default function FoodInformation(props) {
    const [food,setFood] = useState([]);
    const campus = props.campus;


    const getFood = async () => {
      const data = await axios.get(`http://127.0.0.1:8080/api/plate?campus=${campus}`)
      const food = await data.data;
      setFood(await food);
      console.log(food)
    
    }


  useEffect(()=> {
    getFood();
    
  },[])

  
    return (
       <div>
        {food?.map((food,index) => {
          return (
              <div key={index}>
                <p>{food.Name}</p>

              </div>
          )
        })}
        </div>
    )
}