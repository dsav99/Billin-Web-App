import React from "react";
import Orders from "./Orders";
import { Link } from "react-router-dom"

export default function Menu() {
    return (
        <div id="menu">

            <div id="menu-logo">
                <h1>Bill</h1>
            </div>

            <div className="line"></div>

            <div className="menu-item">
                <Link to="/">Dashboard</Link>

            </div>

            <div className="menu-item">
                <Link to="/orders">Orders</Link>
            </div>

            <div className="menu-item">
                <Link to="/billing">Billing</Link>
            </div>

            <div className="menu-item">
                <Link to="/inventory">Inventory</Link>
            </div>

            <div className="menu-item">
                <Link to="/customers">Customers</Link>
            </div>


        </div>
    );
}


// <div id="menu">
//         <div id="menu-logo">
//             <h1>Bill</h1>
//         </div>
//         <div class="line">

//         </div>
//         <div class="menu-item" id="dashboard-btn">
//             <a href="#dashboard">Dashboard</a>
//         </div>
//         <div class="menu-item" id="orders-btn">
//             <a href="/orders.html">Orders</a>
//         </div>
//         <div class="menu-item" id="billing-btn">
//             <a href="/billing.html">Billing</a>
//         </div>
//         <div class="menu-item" id="inventory-btn">
//             <a href="/inventory.html">Inventory</a>
//         </div>
//         <div class="menu-item" id="customers-btn">
//             <a href="/customers.html">Customers</a>
//         </div>
//     </div>