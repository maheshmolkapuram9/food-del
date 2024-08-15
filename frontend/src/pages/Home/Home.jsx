import React, { useState } from 'react'
import "./Home.css";
import Header from '../../components/navbar/Header/Header';
import Exploremenu from '../../components/exploremenu/Exploremenu';
import Fooddisplay from '../../components/foodDisplay/Fooddisplay';
import AppDownload from '../../components/AppDownload/AppDownload';

function Home() {
  const [category, setCategory] = useState("All");

  return (
    <div>
      <div className='home'>
        <Header/>
        <Exploremenu category={category} setCategory={setCategory}/>
        <Fooddisplay category={category} />
        <AppDownload/>
      </div>
    </div>
  )
}

export default Home
