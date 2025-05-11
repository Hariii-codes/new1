import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Search, AlertCircle } from 'lucide-react';
import { branches, BankBranch } from '../data/bankData';

interface Location {
  latitude: number;
  longitude: number;
}

interface BranchLocatorProps {
  initialLocation?: Location;
}

// Function to calculate distance between two coordinates in kilometers
const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

const BranchLocator: React.FC<BranchLocatorProps> = ({ initialLocation }) => {
  const [userLocation, setUserLocation] = useState<Location | null>(initialLocation || null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [nearbyBranches, setNearbyBranches] = useState<(BankBranch & { distance: number })[]>([]);
  const [selectedBank, setSelectedBank] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get user's location
  const getUserLocation = () => {
    setLoading(true);
    setError(null);

    // Check if the browser supports geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Unable to get your location. Please ensure location services are enabled.');
          setLoading(false);
          // Fallback to a default location (Mumbai)
          setUserLocation({
            latitude: 19.076,
            longitude: 72.8777,
          });
        }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setLoading(false);
      // Fallback to a default location (Delhi)
      setUserLocation({
        latitude: 28.7041,
        longitude: 77.1025,
      });
    }
  };

  // Calculate nearby branches when user location changes
  useEffect(() => {
    if (userLocation) {
      // Calculate distance for each branch
      const branchesWithDistance = branches.map((branch) => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          branch.location.latitude,
          branch.location.longitude
        );
        return { ...branch, distance };
      });

      // Sort branches by distance
      const sortedBranches = branchesWithDistance.sort((a, b) => a.distance - b.distance);
      setNearbyBranches(sortedBranches);
    }
  }, [userLocation]);

  // Filter branches based on selected bank and search query
  const filteredBranches = nearbyBranches.filter((branch) => {
    const matchesBank = selectedBank === 'all' || branch.bankName === selectedBank;
    const matchesSearch =
      searchQuery === '' ||
      branch.branchName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBank && matchesSearch;
  });

  // Get unique bank names for the filter dropdown
  const uniqueBanks = Array.from(new Set(branches.map((branch) => branch.bankName)));

  useEffect(() => {
    // Get user location on component mount if not already set
    if (!userLocation) {
      getUserLocation();
    }
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Bank Branch Locator</h2>

      {error && (
        <div className="mb-6 bg-red-50 text-red-700 p-4 rounded-lg flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{error}</span>
        </div>
      )}

      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <button
            onClick={getUserLocation}
            disabled={loading}
            className="flex items-center justify-center gap-2 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200"
          >
            <MapPin className="h-5 w-5" />
            {loading ? 'Getting location...' : 'Use My Current Location'}
          </button>

          <div className="flex-1 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by branch name, address or city"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4 border"
              />
            </div>

            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-4 border"
            >
              <option value="all">All Banks</option>
              {uniqueBanks.map((bank) => (
                <option key={bank} value={bank}>
                  {bank}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {userLocation && (
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Showing branches near{' '}
            <span className="font-medium">
              {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)}
            </span>
          </p>
        </div>
      )}

      <div className="space-y-6">
        {filteredBranches.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">No branches found matching your criteria.</p>
          </div>
        ) : (
          filteredBranches.map((branch) => (
            <div key={branch.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
              <div className="flex justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{branch.branchName}</h3>
                  <p className="text-indigo-600 font-medium">{branch.bankName}</p>
                </div>
                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {branch.distance.toFixed(2)} km away
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">
                    {branch.address}, {branch.city}, {branch.state} - {branch.pincode}
                  </p>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">{branch.phone}</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">{branch.email}</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0" />
                  <p className="text-gray-600">{branch.workingHours}</p>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Available Services</h4>
                <div className="flex flex-wrap gap-2">
                  {branch.services.map((service, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BranchLocator;