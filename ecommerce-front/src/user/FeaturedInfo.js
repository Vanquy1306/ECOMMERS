/* eslint-disable */
import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth";
import { listOrders, getStatusValues, updateOrderStatus, listUsers } from "../admin/apiAdmin";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";


const FeaturedInfo = () => {
  const [orders, setOrders] = useState([]);
    const [statusValues, setStatusValues] = useState([]);
    const [users, setUsers] = useState([]);

    const { user, token } = isAuthenticated();
    const loadOrders = () => {
      listOrders(user._id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setOrders(data);
          }
      });
  };
  const loadUsers = () => {
    listUsers(user._id, token).then(data => {
        if (data.error) {
            console.log(data.error);
        } else {
          setUsers(data);
        }
    });
};
  const loadStatusValues = () => {
      getStatusValues(user._id, token).then(data => {
          if (data.error) {
              console.log(data.error);
          } else {
              setStatusValues(data);
          }
      });
  };  
  const getTotal = () => {
    return orders.reduce((currentValue, nextValue) => {
        return currentValue + nextValue.amount;
    }, 0);
};

  useEffect(() => {
    loadUsers();
      loadOrders();
      loadStatusValues();

  }, []);
  const showOrders = () => {
    if (orders.length > 0) {
        return (
           orders.length
        );
    } else {
        return <h1 className="text-danger">No orders</h1>;
    }
};
const showUsersLength = () => {
  if (users.length > 0) {
      return (
         users.length
      );
  } else {
      return <h1 className="text-danger">No users</h1>;
  }
};
const showInput = (key, value) => (
  <div className="input-group mb-2 mr-sm-2">
      <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
      </div>
      <input
          type="text"
          value={value}
          className="form-control"
          readOnly
      />
  </div>
);

const handleStatusChange = (e, orderId) => {
  updateOrderStatus(user._id, token, orderId, e.target.value).then(
      data => {
          if (data.error) {
              console.log("Status update failed");
          } else {
              loadOrders();
          }
      }
  );
};
const showStatus = o => (
  <div className="form-group">
      <h3 className="mark mb-4">Status: {o.status}</h3>
      <select
          className="form-control"
          onChange={e => handleStatusChange(e, o._id)}
      >
          <option>Update Status</option>
          {statusValues.map((status, index) => (
              <option key={index} value={status}>
                  {status}
              </option>
          ))}
      </select>
  </div>
);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Total Orders</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{showOrders()}</span>
          <span className="featuredMoneyRate">
          <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Users</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{showUsersLength()}</span>
          <span className="featuredMoneyRate">
          <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Profits</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">VNĐ {getTotal(orders)}</span>
          <span className="featuredMoneyRate">
             <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
export default FeaturedInfo;