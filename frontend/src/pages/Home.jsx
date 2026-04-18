import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, Loader2, ArrowRight } from 'lucide-react';
import api from '../services/api';

const Home = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedHotels = async () => {
      try {
        const response = await api.get('/hotels');
        // Let's assume the API returns a list of hotels
        setHotels(response.data.slice(0, 6) || []); // show only top 6
      } catch (err) {
        console.error('Failed to fetch hotels:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedHotels();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const query = new URLSearchParams(searchParams).toString();
    navigate(`/hotels?${query}`);
  };

  return (
    <div className="flex-grow flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-900 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542314831-c6a4d1409a50?auto=format&fit=crop&q=80&w=2000" 
            alt="Beautiful hotel pool" 
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6 drop-shadow-lg">
            Find your next perfect stay
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl mx-auto drop-shadow-md">
            Discover extraordinary homes, hotels, and experiences with AirbnbClone.
          </p>

          {/* Search Box */}
          <div className="bg-white p-4 rounded-3xl shadow-2xl max-w-4xl mx-auto backdrop-blur-xl bg-opacity-95">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
              
              <div className="w-full md:w-1/3 px-4 py-2 md:py-0">
                <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">Where</label>
                <div className="flex items-center mt-1">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <input 
                    type="text" 
                    placeholder="Search destinations" 
                    className="w-full border-none focus:ring-0 p-0 text-gray-900 placeholder-gray-500 bg-transparent text-sm md:text-base"
                    value={searchParams.location}
                    onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
                  />
                </div>
              </div>

              <div className="w-full md:w-1/3 px-4 py-3 md:py-0 flex">
                <div className="w-1/2 pr-2">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">Check in</label>
                  <input 
                    type="date" 
                    className="w-full border-none focus:ring-0 p-0 text-gray-900 bg-transparent text-sm mt-1"
                    value={searchParams.checkIn}
                    onChange={(e) => setSearchParams({...searchParams, checkIn: e.target.value})}
                  />
                </div>
                <div className="w-1/2 pl-2 border-l border-gray-200">
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">Check out</label>
                  <input 
                    type="date" 
                    className="w-full border-none focus:ring-0 p-0 text-gray-900 bg-transparent text-sm mt-1"
                    value={searchParams.checkOut}
                    onChange={(e) => setSearchParams({...searchParams, checkOut: e.target.value})}
                  />
                </div>
              </div>

              <div className="w-full md:w-1/3 px-4 py-3 md:py-0 flex items-center justify-between">
                <div>
                  <label className="block text-xs font-bold text-gray-800 uppercase tracking-wide">Who</label>
                  <div className="flex items-center mt-1">
                    <Users className="h-5 w-5 text-gray-400 mr-2" />
                    <input 
                      type="number" 
                      min="1"
                      className="w-20 border-none focus:ring-0 p-0 text-gray-900 bg-transparent text-sm md:text-base"
                      value={searchParams.guests}
                      onChange={(e) => setSearchParams({...searchParams, guests: e.target.value})}
                    />
                    <span className="text-gray-500 text-sm ml-1">guests</span>
                  </div>
                </div>
                
                <button type="submit" className="bg-rose-600 hover:bg-rose-700 text-white p-4 rounded-full transition-colors shadow-md flex items-center justify-center ml-2">
                  <Search className="h-6 w-6" />
                </button>
              </div>

            </form>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Featured Destinations</h2>
            <p className="text-gray-500 mt-2">Explore our top-rated hotels around the world.</p>
          </div>
          <Link to="/hotels" className="hidden sm:flex items-center text-rose-600 hover:text-rose-700 font-medium">
            View all <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-rose-500" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hotels.length > 0 ? (
              hotels.map((hotel) => (
                <Link to={`/hotels/${hotel.id || hotel.hotelId}`} key={hotel.id || hotel.hotelId} className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img 
                      src={hotel.imageUrl || `https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800&sig=${hotel.id || Math.random()}`} 
                      alt={hotel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-lg shadow-md flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-bold text-gray-900">{hotel.rating || '4.8'}</span>
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-1">{hotel.name}</h3>
                    </div>
                    <p className="text-gray-500 text-sm mb-4 flex items-center">
                      <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                      <span className="line-clamp-1">{hotel.location || hotel.address || 'Unknown Location'}</span>
                    </p>
                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <span className="text-lg font-bold text-gray-900">${hotel.pricePerNight || hotel.price || '120'}</span>
                        <span className="text-gray-500 text-sm"> / night</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              // Placeholder skeleton items if API fails or is empty
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-gray-100 rounded-2xl aspect-[4/3] animate-pulse"></div>
              ))
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
