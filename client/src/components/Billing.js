import React, { useEffect, useState } from "react";
import { renderToString } from "react-dom/server"
import Header from "./Header";
import "../css/Billing.css"
import jsPDF from "jspdf";
import html2canvas from 'html2canvas';
import { log } from "async";



export default function Billing() {

    const printRef = React.useRef();
    const totalRef = React.useRef();



    const docs = <div>
        <h1>ORDERS</h1>
        {printRef.current}
    </div>



    const handleDownloadPdf = async () => {
        const element = printRef.current;
        const canvas = await html2canvas(element);
        const data = canvas.toDataURL('image/png');

        const total = totalRef.current;
        const canvas2 = await html2canvas(total);
        const data2 = canvas2.toDataURL('image/png');


        const pdf = new jsPDF();
        const imgProperties = pdf.getImageProperties(data);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProperties.height * pdfWidth) / imgProperties.width;

        pdf.setFontSize(40);
        pdf.setFont('Helvetica', 'Bold');
        pdf.text(pdfWidth / 2 - 40, 15, `YOUR ORDER`);

        pdf.setFontSize(20);
        pdf.setFont('Helvetica', 'Normal');
        pdf.text(5, 25, `Customer Name: ${productSearch.name}`);
        pdf.text(5, 35, `Date: ${new Date()}`);
        pdf.addImage(data2, 'PNG', 20, 45);
        pdf.addImage(data, 'PNG', 20, 65, pdfWidth * 0.8, pdfHeight);
        pdf.save('print.pdf');
    };


    var authToken = 'bearer ' + localStorage.getItem("token");



    const [productSearch, setProductSearch] = useState({
        name: '', id: '', quantity: 1, email: '',_id:''
    })
    const [product, setProduct] = useState();
    const [newCustomer, setNewCustomer] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState([]);
    const [cart, setCart] = useState([]);
    const total = cart.reduce((prevValue, { price }) => prevValue + price, 0)



    useEffect(() => {
        async function fetchProduct() {
            var authToken = 'bearer ' + localStorage.getItem("token");

            if (productSearch.id !== "") {
                fetch(`http://localhost:8005/products/${productSearch.id}`, {
                    headers: {
                        Authorization: authToken
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setProduct(data[0])
                    })
            }
        }
        fetchProduct();
    }, [productSearch.id]);


    // console.log("JJ");
    useEffect(() => {
         async function fetchCustomer() {
            fetch("http://localhost:8005/customers?name=" + productSearch.name, {
                headers: {
                    Authorization: authToken
                }
            })
                .then(res => res.json())
                .then((customer) => {
                    console.log(customer);
                    if (customer.length === 0) {
                        console.log("Customer NOT exists");
                        setNewCustomer(true);
                        setCurrentCustomer([]);
                        setProductSearch((prevState)=>({...prevState,email:''}))
                    }
                    else {
                        // console.log(customer);
                        console.log("Customer exists");
                        setCurrentCustomer(customer);
                        setNewCustomer(false);
                    }
                })
        }

        fetchCustomer();
    }, [productSearch.name])


    function handleChange(e) {

        setProductSearch(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }




    async function generateBill() {
        console.log(newCustomer);
        if (productSearch.name) {
            if (cart.length === 0) {
                alert("cart cannot be empty")
            }
            else if(productSearch.email===""){
                alert("Enter an email address");
            }
            else {

                const custReq = await fetch("http://localhost:8005/customers?email="+productSearch.email,{
                    headers:{
                        Authorization:authToken
                    }
                })
                const customersList = await custReq.json()


                if(customersList.length===0){
                    console.log("Create a customer");
                    // Create a new customer
                    const createdCustomerReq = await fetch("http://localhost:8005/customers",{
                        method:"POST",
                        headers:{
                            Authorization:authToken,
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            name:productSearch.name,
                            email:productSearch.email,
                            orders:[]
                        })
                    })
                    const createdCustomer  = await  createdCustomerReq.json();

                    const newOrderReq = await fetch("http://localhost:8005/orders",{
                        method:"POST",
                        headers:{
                            Authorization:authToken,
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            customer:createdCustomer._id,
                            total:100,
                            cart:cart
                        })
                    })

                    const newOrder = await newOrderReq.json();

                    const orders = createdCustomer.orders;
                    orders.push(newOrder._id);

                    const updateReq = await fetch("http://localhost:8005/customers/"+createdCustomer._id,{
                        method:"POST",
                        headers:{
                            Authorization:authToken,
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            orders:orders
                        })
                    })

                    const updated = await updateReq.json();
                    console.log(updated);

                    // createdCustomer.orders


                    console.log(createdCustomer);
                }
                else{
                    console.log("Customer found");
                    console.log(customersList);

                    const newOrderReq = await fetch("http://localhost:8005/orders",{
                        method:"POST",
                        headers:{
                            Authorization:authToken,
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            customer:customersList[0]._id,
                            total:100,
                            cart:cart
                        })
                    })

                    const newOrder = await newOrderReq.json();
                    const orders = customersList[0].orders;
                    orders.push(newOrder._id);

                    const updateReq = await fetch("http://localhost:8005/customers/"+customersList[0]._id,{
                        method:"POST",
                        headers:{
                            Authorization:authToken,
                            'Content-Type':'application/json'
                        },
                        body:JSON.stringify({
                            orders:orders
                        })
                    })

                    const updated = await updateReq.json();
                }
            }
        }
        else {
            alert("Enter a customer name");
        }

                // fetch("http://localhost:8005/customers?email="+productSearch.email,{
                //     headers:{
                //         Authorization:authToken
                //     }
                // })
                // .then((resp)=>resp.json())
                // .then((data)=>{
                //     // console.log(data);
                //     if(data.length===0){
                //         console.log("Create a customer");
                //         // console.log(productSearch);
                //         fetch("http://localhost:8005/customers",{
                //             method:"POST",
                //             headers:{
                //                 Authorization:authToken,
                //                 'Content-Type':"application/json"
                //             },
                //             body:JSON.stringify({
                //                 "name":productSearch.name,
                //                 "email":productSearch.email,
                //                 "orders":[]
                //             })
                //         })
                //         .then((resp)=>resp.json())
                //         .then((createdCustomer)=>{
                //             // Create Order
                //             fetch("http://localhost:8005/orders",{
                //                 method:"POST",
                //                 headers:{
                //                     Authorization:authToken,
                //                     'Content-Type':'application/json'
                        //         },
                        //         body:JSON.stringify({
                        //             customer:createdCustomer._id,
                        //             total:100,
                        //             cart:cart
                        //         })
                        //     })
                        //     .then((r)=>r.json())
                        //     .then((newOrder)=>{
                        //         // const currentOrders = createdCustomer.orders;
                        //         // currentOrders.push(newOrder._id)

                        //         // createdCustomer.orders = currentOrders;

                        //         // createdCustomer.save()
                        //         // .then((x)=>x.json)
                        //         // .then((updated)=>console.log(updated))
                        //         // console.log(currentOrders);
                        //         // console.log(newOrder);
                        //         console.log(createdCustomer);
                        //     })
                            
                        // })

                    // }
                    // else{
                    //     console.log(data[0]);
                    // }
                // })

                
                
                
                
                // fetch("http://localhost:8005/customers?name=" + productSearch.name)
                //     .then((res) => res.json())
                //     .then((customer) => {
                //         // console.log(cart);
                //         if (customer.length !== 0) {
                //             console.log("Customer Found");
                //             console.log(customer);
                //         }
                //         else {
                //             // Create a customer first
                //             fetch("http://localhost:8005/customers",{
                //                 method:"POST",
                //                 headers:{
                //                     Authorization:authToken
                //                 },
                //                 body:JSON.stringify({
                //                     name:productSearch.name,
                //                     email:productSearch.email,
                //                     orders:[]
                //                 })
                //             })
                //             console.log("Customer Not Found");
                //         }
                //     })
            // }
        // }
        
    }
    // console.log(productSearch);

    function addToCart() {
        setCart(prevCart => ([...prevCart, product]))

    }

    function selectCustomer(cust) {
        setProductSearch((prevState)=>({...prevState,name:cust.name,_id:cust._id,email:cust.email}));
        setNewCustomer(false)
    }

    

    return (
        <div className="billing">
            <Header username="Savi" location="Billing" />
            <form className="product-search-form">
                <div className="form-div">
                    <div>
                        <label>Enter Customer Name:</label>
                        <input name="name" onChange={handleChange} value={productSearch.name} />
                    </div>
                    <div>
                        <label>Enter Customer Email:</label>
                        <input name="email" onChange={handleChange} value={productSearch.email} />
                    </div>
                    <div>
                        <label>Enter Product ID:</label>
                        <input name="id" onChange={handleChange} value={productSearch.id} />
                    </div>
                    <div>
                        <label>Enter Quantity:</label>
                        <input name="quantity" onChange={handleChange} value={productSearch.quantity} />
                    </div>
                </div>

            </form>


            

            {product && <h6 className="customer-search">Available Products</h6>}

            {product &&
                <div className="search-result">
                    <p className="result-description">{`${product.brand} ${product.name} (${product.size}) -- $${product.price}`}</p>
                    <input onClick={(e)=>{
                        addToCart();
                        e.target.parentElement.style.display="none";
                    }} type={"button"} value={"ADD"} />
                </div>
            }


            {!newCustomer && <h6 className="customer-search">Available Customers</h6>}
            {!newCustomer && currentCustomer.map((item)=>{
                return (
                    
                    <div className="search-result">
                        <p className="result-description">{item.name} - {item.email}</p>
                        <input onClick={(e)=>{
                            selectCustomer(item);
                            setNewCustomer(true);
                            e.preventDefault();
                            // e.target.parentElement.style.display="none";
                            }} type={"button"} value={"Select"} />
                    </div>
                )
            })}

            <div className='cart'>
                <div className="cart-headers">
                    <h2>Cart</h2>
                    <button onClick={generateBill}>Generate Bill</button>
                </div>
                <div ref={printRef} id="cart-items">
                    {
                        cart.map((item) => (
                            <div className="cart-item">
                                <p className="item-description">{`1x ${item.brand} ${item.name} (${item.size})`}</p>
                                <p className="item-price">{`$${item.price}/-`}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div ref={totalRef} className="cart-total">
                Total: <span id="total-cart">${total}/-</span>
            </div>
            <button type="button" onClick={handleDownloadPdf}>
                Download as PDF
            </button>
        </div>
    );
}

