import React from "react";
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css';


export default function LandingPage(){
    return(
        
        <div>
            <div className={style.patitasContainer}>
  <div className={`${style.dog} ${style.walk}`}></div>
</div>
            
            <Link to ="/home" >
                <button className={style.buttom} width="250px" >Ingresar</button>
            </Link>
        </div>
    )
}