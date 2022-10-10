import React, { useEffect, useState } from "react";
import Header from "./Header";
import "../css/Inventory.css"
import Table from "./Table";
import { useStateValue } from "../AuthContext";

export default function Inventory() {

    const [state,dispatch] = useStateValue();
    const [products,setProducts] = useState([]);
    const [filter,setFilter] = useState('All');
    var authToken = 'bearer '+localStorage.getItem("token");

    useEffect(()=>{

        async function fetchData(){
            var queryParam = "name="+filter;
            console.log(queryParam);
            if(filter==="All")
                queryParam="";
           fetch("http://localhost:8005/products?"+queryParam,{
            headers:{
                Authorization:authToken
            }
           })
           .then(res=>res.json())
           .then(data=>{
            console.log(data);
            setProducts(data)
           })
        }

        fetchData();
       
    },[filter])

    function handleChange(e){
        setFilter(e.target.value)
    }

    const pproducts = products.map((item)=><tr>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.brand}</td>
        <td>{item.size}</td>
        <td>{item.price}</td>
    </tr>)


    return (
        <div>
            <Header username='Savi' location="Inventory" />
            <div className="container">
                <h1></h1>
                <select value={filter} onChange={handleChange}>
                    <option >All</option>
                    <option value="shirt">Shirts</option>
                    <option value="Jean" >Jeans</option>
                    <option value="Jacket">Jackets</option>
                </select>
                <select value={filter} onChange={handleChange}>
                    <option >Brand</option>
                    <option value="shirt">Nike</option>
                    <option value="Jean" >Addidas</option>
                    <option value="Jacket">Flying Machine</option>
                </select>
            </div>
            <Table title="Products" headers={['Product Id','Type','Brand','Size','Price']} data={pproducts} />
            {/* <div className="products">
                <table className="products-table">
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>TYPE</th>
                    <th>BRAND</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Stock</th>
                    </tr>
                </thead>

                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                        <td>1</td>
                    </tr>
                </tbody>
                    
                </table>
            </div> */}

        </div>
    );
}