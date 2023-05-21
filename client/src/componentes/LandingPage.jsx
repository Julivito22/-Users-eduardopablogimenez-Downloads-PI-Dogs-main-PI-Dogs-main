import React from "react";
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css';


export default function LandingPage(){
    return(
        
        <div className={style.landingpage}>
            <div className={style.flecha}>
  <div className={style.flechita}></div>
</div>
            <div className={style.patitasContainer}>
  
</div>
            
            <Link to ="/home" >
                <button className={style.buttom} width="250px" >Ingresar</button>
            </Link>
        </div>
    )
}