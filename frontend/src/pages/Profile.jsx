import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Shield, AlertCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [profileData, setProfileData] = useState(user);
  const [loading, setLoading] = useState(!user);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setProfileData(response.data);
      } catch (err) {
        setError('Failed to load profile details');
      } finally {
        setLoading(false);
      }
    };

    if (!user) {
      fetchProfile();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-rose-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-4 rounded-xl">
          <AlertCircle className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
        
        <div className="bg-white shadow rounded-2xl overflow-hidden">
          <div className="p-8 sm:p-10">
            <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
              <div className="h-24 w-24 bg-rose-100 rounded-full flex items-center justify-center text-rose-500">
                <User className="h-12 w-12" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{profileData?.name || 'User'}</h2>
                <p className="text-gray-500 flex items-center gap-2 mt-1">
                  <Shield className="h-4 w-4" />
                  {profileData?.role || 'Guest'}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
                <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Email Address</label>
                    <div className="mt-1 flex items-center gap-2 text-gray-900">
                      <Mail className="h-5 w-5 text-gray-400" />
                      {profileData?.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100">
              <button className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-xl text-sm font-medium transition-colors shadow-sm">
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
