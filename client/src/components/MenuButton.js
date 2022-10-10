import React from "react";
import UserProfile from "./UserProfile";

export default function MenuButton(props){

    
    const styles= {
       position:"relative"
    }
    
    return (
        <div style={{position:"relative"}}>
            <img className="menu-btn" src={props.source} onClick={()=>{props.toggle(props.id)}}></img>
            {props.userProfile}
            </div>
    );
}