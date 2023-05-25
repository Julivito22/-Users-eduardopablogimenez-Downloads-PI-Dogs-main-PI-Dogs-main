import React from "react";
import {Link} from 'react-router-dom';
import style from './LandingPage.module.css';


export default function LandingPage(){
    return(
        
        <div className={style.landingpage}>
            <div >
  
  
</div>
            <div className={style.patitasContainer}>
            <img src="https://i.pinimg.com/originals/da/d2/24/dad224dc4ecbf0f4e03322b3b7188187.gif" alt="Perro animado" className={style.perroanimado} />
  
</div>

            
            <Link to ="/home" >
           
                <button className={style.buttom} width="250px" >INGRESAR</button>
            </Link>
            

        </div>
    )
}