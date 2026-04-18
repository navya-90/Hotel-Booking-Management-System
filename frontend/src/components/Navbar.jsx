import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Building2, Search, Menu, User, LogOut, X } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <Building2 className="h-8 w-8 text-rose-500" />
              <span className="font-bold text-xl text-rose-500 tracking-tight">AirbnbClone</span>
            </Link>
          </div>

          <div className="hidden sm:flex sm:items-center sm:ml-6">
            <div className="flex items-center space-x-4">
              <Link to="/hotels" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                Browse Hotels
              </Link>
              
              {user ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 border border-gray-300 rounded-full py-2 px-4 hover:shadow-md transition-shadow">
                    <Menu className="h-4 w-4 text-gray-500" />
                    <div className="h-6 w-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                      <User className="h-4 w-4 text-gray-500" />
                    </div>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white border border-gray-100 divide-y divide-gray-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Profile</Link>
                      <Link to="/bookings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Bookings</Link>
                    </div>
                    <div className="py-1">
                      <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                        <LogOut className="h-4 w-4 mr-2" />
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login" className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-gray-50">
                    Log in
                  </Link>
                  <Link to="/signup" className="bg-rose-500 text-white hover:bg-rose-600 px-4 py-2 rounded-full text-sm font-medium transition-colors shadow-sm">
                    Sign up
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-rose-500"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden border-t border-gray-100 bg-white">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/hotels" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Browse Hotels</Link>
          </div>
          {user ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-500" />
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name || 'User'}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email}</div>
                </div>
              </div>
              <div className="mt-3 space-y-1">
                <Link to="/profile" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">Profile</Link>
                <Link to="/bookings" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">My Bookings</Link>
                <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-gray-50">Sign out</button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 space-y-1">
              <Link to="/login" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">Log in</Link>
              <Link to="/signup" className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50">Sign up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
