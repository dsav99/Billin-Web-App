import React, { useEffect, useState } from "react";
import Card from "./Card";

import saleIcon from "../images/money.SVG"
import customerIcon from "../images/customer.SVG"
import ordersIcon from "../images/new-client.SVG"
import inventoryIcon from "../images/inventory.SVG"
import Header from "./Header";
import "../css/Dashboard.css"



export default function Dashboard() {


    const [totalSale,setTotalSale] = useState();
    const [totalOrders,setTotalOrders] = useState();
    const [totalCutomers,setTotalCustomers] = useState();


    var authToken = 'bearer '+localStorage.getItem("token");

    useEffect(()=>{
        fetch("http:localhost:8005/orders/gettotal",{
            headers:{
                Authorization:authToken,
                "Content-Type":"application/json"
            }
        })
        .then((response)=>response.json())
        .then((data)=>{
            setTotalSale('$'+data.TotalAmount);
            setTotalOrders(data.totalOrders);
            // console.log(data)
        });


        fetch("http:localhost:8005/customers/number",{
            headers:{
                Authorization:authToken,
                "Content-Type":"application/json"
            }
        })
        .then((num)=>num.json())
        .then(d=>{
            setTotalCustomers(d)
        })
    },[])



    return (
        <div className="body">

            <Header username='Savi' location='Dashboard' />
            <div className="stats">

                <Card title='Total Sale' value={totalSale} imageUrl={saleIcon} />
                <Card title='Total Customers' value={totalCutomers} imageUrl={customerIcon} />
                <Card title='Orders this month' value={totalOrders} imageUrl={ordersIcon} />
                <Card title='Inventory Value' value={"--"} imageUrl={inventoryIcon} />

            </div>
        </div>

    );
}

/* <div id="stats">
            <div class="stat-card" id="sales-count">
                <div class="card-icon">
                    <img src="/icons/money.SVG" alt="">
                </div>
                <div class="card-content">
                    <p>Total Sale</p>
                    <h1 id="total-sales"></h1>
                </div>

            </div>
            <div class="stat-card" id="customers-count">
                <div class="card-icon">
                    <img src="/icons/customer.SVG" alt="" srcset="">
                </div>
                <div class="card-content">
                    <p>Total Customers</p>
                    <h1 id="total-customers">3,412</h1>
                </div>

            </div>
            <div class="stat-card" id="new-customers">
                <div class="card-icon">
                    <img src="/icons/new-client.SVG" alt="">
                </div>
                <div class="card-content">
                    <p>Orders this month </p>
                    
                    <h1 id="new-clients">256</h1>
                </div>

            </div>
            <div class="stat-card" id="stock-value">
                <div class="card-icon">
                    <img src="/icons/inventory.SVG" alt="" srcset="">
                </div>
                <div class="card-content">
                    <p>Inventory Value</p>
                    <h1 id="total-inventory"></h1>
                </div>
            </div>
        </div> */