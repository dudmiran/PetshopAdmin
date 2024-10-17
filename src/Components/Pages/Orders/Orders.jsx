import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css'; // Ensure you have the necessary styles

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const url = "http://localhost:5000"; // Adjust this according to your setup

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get(`${url}/api/order/list`);
            if (response.data.success) {
                setOrders(response.data.data.reverse());
            } else {
                alert("Error fetching orders");
            }
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const statusHandler = async (event, orderId) => {
        try {
            const response = await axios.post(`${url}/api/order/status`, {
                orderId,
                status: event.target.value
            });
            if (response.data.success) {
                await fetchAllOrders();
            }
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    useEffect(() => {
        fetchAllOrders();
    }, []);

    return (
        <div className='orders-container'>
            <h3 className='orders-title'>Order Management</h3>
            <div className="orders-list">
                {orders.map((order) => (
                    <div key={order._id} className='order-card'>
                        <div className='order-details'>
                            <p className='order-items'>
                                {order.items.map((item, index) => (
                                    index === order.items.length - 1 
                                        ? `${item.name} x ${item.quantity}` 
                                        : `${item.name} x ${item.quantity}, `
                                ))}
                            </p>
                            <p className='order-user'>{`${order.address.firstName} ${order.address.lastName}`}</p>
                            <div className='order-address'>
                                <p>{`${order.address.street},`}</p>
                                <p>{`${order.address.city}, ${order.address.state}, ${order.address.country}, ${order.address.zipcode}`}</p>
                            </div>
                            <p className='order-phone'>{order.address.phone}</p>
                        </div>
                        <div className='order-summary'>
                            <p className='order-items-count'>Items: {order.items.length}</p>
                            <p className='order-amount'>Total: ${order.amount.toFixed(2)}</p>
                            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className='order-status-select'>
                                <option value="Order Processing">Order Processing</option>
                                <option value="Order Shipped">Order Shipped</option>
                                <option value="Order Out for Delivery">Order Out for Delivery</option>
                                <option value="Order Delivered">Order Delivered</option>
                            </select>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Orders;
