/* eslint-disable */
import React from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import FeaturedInfo from "./FeaturedInfo";
import Chart from "./Chart";
import { userData } from "./dummyData";
import Sidebar from "./Sidebar";
const AdminDashboard = () => {
    const {
        user: { name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <div>
                <h4 className="card-header ">Dashboard Center</h4>
                <ul className="list-group">
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/category">
                            Create Category
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-link" to="/admin/categorys">
                            Manage Category
                        </Link>
                    </li>
                </ul>
            </div>
        );
    };

    const adminInfo = () => {
        return (
            <div className=" mb-5">
            <FeaturedInfo/>
            <Chart data={userData} title="User Analytics" grid dataKey="Active User"/> 

         </div>
        );
    };

    return (
        <div>
   <Sidebar/>

            <div className="row">
                <div className="col-3"></div>
                <div className="col-9">
                    {adminInfo()}
                </div>

            </div>
            </div>

    );
};

export default AdminDashboard;