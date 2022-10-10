import React, { useEffect, useState } from "react";
import Header from "./Header"
import Table from "./Table"

export default function Orders(){

    const [orders,setOrders] = useState([]);

    useEffect(()=>{

        console.log(localStorage.getItem("token"));
        var authToken = 'bearer '+localStorage.getItem("token");

        fetch("http://localhost:8005/orders",{
            headers:{
                Authorization:authToken
            }
        })
        .then((res)=>res.json())
        .then((orders)=>setOrders(orders))
    },[]);

    console.log(orders);
    
    const morders = orders.map((item)=>(
        <tr>
            <td>{item._id}</td>
            <td>{item.customer.name}</td>
            <td>{item.total}</td>
            <td>{item.createdAt}</td>
        </tr>
    ))

    return (
        <div>
         <Header username='Savi' location='Orders'></Header>
        <Table title="Orders" data={morders} headers={['Order Id','Customer Id','Total','Date Placed']} />
        </div>
       
        
    );
}