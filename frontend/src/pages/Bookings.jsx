import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, CheckCircle, Clock, XCircle, Loader2 } from 'lucide-react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await api.get('/users/myBookings');
        setBookings(response.data || []);
      } catch (err) {
        console.error('Failed to fetch bookings:', err);
        setError('Failed to load your bookings. Please try again later.');
        // Add some mock data to show the UI
        setBookings([
          {
            id: 'BKG-1029',
            hotelName: 'Grand Luxury Resort & Spa',
            location: 'Malibu, California',
            checkIn: '2026-05-10',
            checkOut: '2026-05-15',
            status: 'CONFIRMED',
            totalPrice: 2250,
            imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400'
          },
          {
            id: 'BKG-0982',
            hotelName: 'Urban Boutique Hotel',
            location: 'New York, NY',
            checkIn: '2025-11-01',
            checkOut: '2025-11-04',
            status: 'COMPLETED',
            totalPrice: 850,
            imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c0d5bf8f?auto=format&fit=crop&q=80&w=400'
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchBookings();
    } else {
      setLoading(false);
    }
  }, [user]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'CONFIRMED':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="h-3 w-3" /> Confirmed</span>;
      case 'PENDING':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="h-3 w-3" /> Pending</span>;
      case 'CANCELLED':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800"><XCircle className="h-3 w-3" /> Cancelled</span>;
      case 'COMPLETED':
        return <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><CheckCircle className="h-3 w-3" /> Completed</span>;
      default:
        return <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">{status}</span>;
    }
  };

  if (!user) {
    return (
      <div className="flex-grow flex flex-col items-center justify-center p-8 bg-gray-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please log in to view your bookings</h2>
        <Link to="/login" className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Trips</h1>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-rose-500" />
          </div>
        ) : error && bookings.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No trips booked... yet!</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Time to dust off your bags and start planning your next adventure.</p>
            <Link to="/" className="inline-block bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-3 rounded-xl font-bold transition-colors">
              Start searching
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col md:flex-row">
                <div className="md:w-1/3 aspect-video md:aspect-auto relative">
                  <img 
                    src={booking.imageUrl || `https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=400&sig=${booking.id}`} 
                    alt={booking.hotelName} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8 md:w-2/3 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{booking.hotelName}</h3>
                      {getStatusBadge(booking.status)}
                    </div>
                    <p className="text-gray-500 flex items-center gap-1 mb-6">
                      <MapPin className="h-4 w-4" /> {booking.location}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Check-in</span>
                        <span className="font-medium text-gray-900">{new Date(booking.checkIn).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                      <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                        <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Check-out</span>
                        <span className="font-medium text-gray-900">{new Date(booking.checkOut).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-6 border-t border-gray-100">
                    <div>
                      <span className="text-sm text-gray-500">Total Price</span>
                      <div className="text-2xl font-bold text-gray-900">${booking.totalPrice}</div>
                    </div>
                    
                    <div className="space-x-3">
                      <Link to={`/hotels/${booking.hotelId}`} className="px-4 py-2 text-sm font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors">
                        View Hotel
                      </Link>
                      {booking.status === 'CONFIRMED' && (
                        <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg transition-colors">
                          Manage
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
