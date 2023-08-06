import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';



const AdminPage = ({ products, users }) => {
    const data = [
        { name: 'Products', value: products.length },
        { name: 'Users', value: users.length },
    ];
    return (
        <div>
            <h2>Number of products and users</h2>
            <BarChart width={400} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#001529" />
            </BarChart>
        </div>
    );
};

export default AdminPage;
