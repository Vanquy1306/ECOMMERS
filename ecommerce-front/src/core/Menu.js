/* eslint-disable */
import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#b9b0b0" };
    } else {
        return { color: "#ffffff" };
    }
};

const Menu = ({ history }) => (
    
        <ul className="nav">
            <div className=" nav left-links" >
            <li className="navbar-logo">
                <Link
                    className=" nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    MQ COFFEE HOUSE
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/")}
                    to="/"
                >
                    HOME
                </Link>
            </li>

            <li className="nav-item">
                <Link
                    className="nav-link"
                    style={isActive(history, "/shop")}
                    to="/shop"
                >
                    SHOP
                </Link>
            </li>

            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/user/dashboard")}
                        to="/user/dashboard"
                    >
                        DASHBOARD
                    </Link>
                </li>
            )}

            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item ">
                    <Link
                        className="nav-link"
                        style={isActive(history, "/admin/dashboard")}
                        to="/admin/dashboard"
                    >
                        DASHBOARD
                    </Link>
                </li>
            )}
    </div>
    <div className="nav">
            {!isAuthenticated() && (
                <Fragment >
                    <li className="navright">
                        <Link
                            className="nav-link "
                            style={isActive(history, "/signin")}
                            to="/signin"
                        >
                            SIGNIN
                        </Link>
                    </li>

                    <li className="navright">
                        <Link
                            className="nav-link"
                            style={isActive(history, "/signup")}
                            to="/signup"
                        >
                            SIGNUP
                        </Link>
                    </li>
                </Fragment>
            )}
                        {isAuthenticated() && (

<li className="nav-item">
    <Link
        className="nav-link"
        style={isActive(history, "/cart")}
        to="/cart"
    >
        CART{" "}
        <sup>
            <small className="cart-badge">{itemTotal()}</small>
        </sup>
    </Link>
</li>
)}
            {isAuthenticated() && (
                <li className="navright">
                    <span
                        className="nav-link"
                        style={{ cursor: "pointer", color: "#ffffff" }}
                        onClick={() =>
                            signout(() => {
                                history.push("/");
                            })
                        }
                    >
                        SIGNOUT
                    </span>
                </li>
            )}


    </div>
    </ul>

);

export default withRouter(Menu);