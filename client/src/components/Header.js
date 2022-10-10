import React from "react";
import menu from "../images/menu.SVG"
import menuOpen from "../images/menu-open.SVG"
import user from "../images/user.SVG"
import settings from "../images/settings.SVG"
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import UserProfile from "./UserProfile";
import UserSettings from "./UserSettings";



export default function Header(props) {
    // console.log("Header rendered");

    const [menuState,setMenuState] = React.useState(false);

    const [menuButtons,setMenuButtons] = React.useState([ {
        on:true,
        key:"menu",
        id:"menu",
        source:menu
    },
    {
        on:true,
        key:"user",
        id:"user",
        source:user,
        userProfile:<UserProfile username={localStorage.getItem("user")}/>
    },
    {
        on:true,
        key:"settings",
        id:"settings",
        source:settings,
        userSettings:<UserSettings/>

    }])

    const buttons = menuButtons.map((button)=>{
        if(button.id==='user'){
            return <MenuButton on={button.on} toggle={handleClick} key={button.key} id={button.key} source={button.source} userProfile={!button.on?button.userProfile:""}  />
        }

        else if(button.id==='settings'){
            return <MenuButton on={button.on} toggle={handleClick} key={button.key} id={button.key} source={button.source} userProfile={!button.on?button.userSettings:""} />
        }
        else{
        return <MenuButton on={button.on} toggle={handleClick} key={button.key} id={button.key} source={button.source}/>;
        }
    })


    function handleClick(id){
        setMenuButtons((prevButtons)=>{
            return prevButtons.map((button)=>{
                if(button.id==="menu" && id=="menu"){
                    setMenuState((prevState)=>!prevState);
                    return button.source===menu?{...button,source:menuOpen,on:!button.on}:{...button,source:menu,on:!button.on};
                }
                else if(button.id=="user" && id=="user"){return {...button,on:!button.on}}
                else if(button.id=="settings" && id=="settings"){return {...button,on:!button.on}}
                else{
                    return button
                }
                
                
            })
        })
       
        
    }
    return (
        <div className="navbar">
        {menuState && <Menu/>}
            <div>
                <p>{localStorage.getItem("user")}</p>
                <h3>{props.location}</h3>
            </div>

            <div className='user-buttons'>
                {buttons}
            </div>
            
            
        </div>

    );
}

 
 