import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Star, Wifi, Coffee, Tv, Wind, Check, Loader2, Calendar } from 'lucide-react';
import api from '../services/api';

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await api.get(`/hotels/${id}/info`);
        setHotel(response.data);
      } catch (err) {
        console.error('Failed to fetch hotel details:', err);
        // Fallback mock data if backend isn't ready
        setHotel({
          id,
          name: 'Grand Luxury Resort & Spa',
          location: 'Malibu, California',
          description: 'Experience the ultimate luxury at our beachfront resort. Featuring stunning ocean views, world-class dining, and a state-of-the-art spa. Perfect for romantic getaways or family vacations.',
          price: 450,
          rating: 4.9,
          reviews: 128,
          amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service'],
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleBooking = async () => {
    setBookingLoading(true);
    try {
      // Assuming a booking initialization endpoint exists based on backend controller
      const response = await api.post('/bookings/init', {
        hotelId: id,
        ...bookingData
      });
      // Redirect to booking status/payment or show success
      navigate(`/bookings`); // navigate to user bookings or specific booking page
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed. Please try again or log in.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-rose-500" />
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-700">Hotel not found</h2>
      </div>
    );
  }

  return (
    <div className="flex-grow bg-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">{hotel.name}</h1>
          <div className="flex items-center text-sm text-gray-600 gap-4">
            <span className="flex items-center gap-1 font-medium text-gray-900">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              {hotel.rating} <span className="text-gray-500 font-normal">({hotel.reviews || 0} reviews)</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {hotel.location || hotel.address}
            </span>
          </div>
        </div>

        <div className="rounded-3xl overflow-hidden mb-12 aspect-[21/9] bg-gray-100 relative">
          <img 
            src={hotel.imageUrl} 
            alt={hotel.name} 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-10">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About this space</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {hotel.description || 'Welcome to our wonderful hotel! Enjoy top-notch amenities, beautiful surroundings, and excellent service. We look forward to hosting you.'}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What this place offers</h2>
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                {(hotel.amenities || ['Wifi', 'TV', 'Air conditioning', 'Pool']).map((amenity, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-700">
                    <Check className="h-5 w-5 text-gray-400" />
                    <span className="text-lg">{amenity}</span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-3xl shadow-xl p-6 sticky top-24">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="text-2xl font-bold text-gray-900">${hotel.price || hotel.pricePerNight}</span>
                  <span className="text-gray-500"> / night</span>
                </div>
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  {hotel.rating}
                </div>
              </div>

              <div className="border border-gray-300 rounded-xl overflow-hidden mb-6">
                <div className="flex border-b border-gray-300">
                  <div className="w-1/2 p-3 border-r border-gray-300">
                    <label className="block text-xs font-bold text-gray-900 uppercase">Check-in</label>
                    <input 
                      type="date" 
                      className="w-full mt-1 border-none p-0 text-sm focus:ring-0 text-gray-700 bg-transparent"
                      value={bookingData.checkIn}
                      onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                    />
                  </div>
                  <div className="w-1/2 p-3">
                    <label className="block text-xs font-bold text-gray-900 uppercase">Check-out</label>
                    <input 
                      type="date" 
                      className="w-full mt-1 border-none p-0 text-sm focus:ring-0 text-gray-700 bg-transparent"
                      value={bookingData.checkOut}
                      onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                    />
                  </div>
                </div>
                <div className="p-3">
                  <label className="block text-xs font-bold text-gray-900 uppercase">Guests</label>
                  <select 
                    className="w-full mt-1 border-none p-0 text-sm focus:ring-0 text-gray-700 bg-transparent cursor-pointer"
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({...bookingData, guests: parseInt(e.target.value)})}
                  >
                    {[1,2,3,4,5,6].map(num => (
                      <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
              </div>

              <button 
                onClick={handleBooking}
                disabled={bookingLoading}
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-4 rounded-xl transition-colors shadow-md flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {bookingLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Reserve'}
              </button>

              <div className="text-center text-sm text-gray-500 mt-4">
                You won't be charged yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
