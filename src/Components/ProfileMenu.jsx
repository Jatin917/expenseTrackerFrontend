import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authentication, authenticToken } from '../store/Atom/authentication';
import { toast } from 'react-toastify';

const ProfileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {firstName:userFirstName} = useRecoilValue(authentication);
  const setAuthToken = useSetRecoilState(authenticToken);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    // console.log("Logout clicked");
    toast.success('Logged out successfully! 👋');
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  const handleAddItem = () => {
    navigate("/add")
  };

  return (
    <div className="relative">
      <div className="flex items-center">
        <div
          className="w-12 h-12 flex items-center justify-center text-white bg-gray-600 rounded-full font-semibold cursor-pointer"
          onClick={toggleMenu}
        >
          {userFirstName.charAt(0)}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg">
          <ul className="py-1">
            <li
              onClick={handleAddItem}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              Add Item
            </li>
            <li
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
