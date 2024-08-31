/* eslint-disable react/prop-types */
// src/components/Header.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProfileMenu from './ProfileMenu';
import MonthlyExpenseDropdown from './MonthlyExpenseDropdown'

const Header = ({ userFirstName }) => {
  return (
<header className="flex items-center justify-between p-4 text-gray-800">
  {/* Left Section */}
  <div className="text-3xl font-extrabold text-gray-900">
    Expense Tracker
  </div>
  <MonthlyExpenseDropdown />
  {/* Right Section */}
  <ProfileMenu userFirstName="Jatin" />
</header>

  );
};

export default Header;
