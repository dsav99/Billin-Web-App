
import React, { useEffect } from "react";
// import { CartContext } from "../CartContext";
import { useStateValue } from "../AuthContext";
import "../css/Table.css"

export default function Table(props) {
    const styles = {
        border: 'solid',
    };
    return (
        <div id="orders" style={styles} >
            <div id="order-headers">
                <h2>{props.title}</h2>
            </div>

            <div id="order-items">
                <table className="table">
                    {/* {<th>ORDER ID</th>
                    <th>Total</th>
                    <th>Date Placed</th>
                    <th>Cart</th>} */}
                    <thead>
                        <tr>
                            {props.headers.map((item) => <th>{item}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {props.data && props.data.map((item)=><tr>
                            <td>{item.productId}</td>
                            <td>{item.name}</td>
                            <td>{item.brand}</td>
                            <td>{item.size}</td>
                            <td>{item.price}</td>
                        </tr>)} */}
                        {props.data}
                    </tbody>

                </table>
            </div>
        </div>

    );
}