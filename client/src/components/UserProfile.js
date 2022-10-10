import React from "react";

export default function UserProfile(props){
    return (
        <div className="user-profile">
            <p>Logged in</p>
            <h2>{props.username}</h2>
            <button onClick={signOut}>Log out</button>
        </div>
    );
}

function signOut(){
    localStorage.clear();
    window.location.reload();
}