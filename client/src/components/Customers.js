import React, { useState ,useEffect} from "react";
import Header from "./Header";
import Menu from "./Menu";
import Table from "./Table";

export default function Customers(){


    const [customersData,setCustomerData] = useState([]);
    useEffect(()=>{

        var authToken = 'bearer '+localStorage.getItem("token");

        async function fetchData(){
           fetch("http://localhost:8005/customers?",{
            headers:{
                Authorization:authToken
            }
           })
           .then(res=>res.json())
           .then(data=>{
            // console.log(data);
            setCustomerData(data)
           })
        }

        fetchData();
       
    },[]);
    // console.log(customersData);

    const customers = customersData.map((item)=><tr>
        <td>{item._id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
    </tr>)



    return (
        <div>
            <Header username='Savi' location='Customers' />
            <Table data={customers} title="Customers" headers={['Customer Id','Customer Name','Email']}/>
        </div>
    );
}