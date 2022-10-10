import React from "react";

export default function Card(props) {
    return (
        <div className="stat-card">
            <div className="card-icon">
                <img src={props.imageUrl}></img>
            </div>
            <div className="card-content">
                <p>{props.title}</p>
                <h1>{props.value}</h1>
            </div>

        </div>
    );
}