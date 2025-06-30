import React from 'react';
import { NavLink } from 'react-router-dom';

const UserMenu = () => {
  return (
    <div className="text-center">
      <h4 className="mb-3 p-3">Dashboard</h4>
      <div className="list-group">
        <NavLink
          to="/dashboard/user/profile"
          className="list-group-item list-group-item-action"
        >
          Profile
        </NavLink>
        <NavLink
          to="/dashboard/user/orders"
          className="list-group-item list-group-item-action"
        >
          orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
