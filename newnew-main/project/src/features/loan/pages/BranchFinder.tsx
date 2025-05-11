import React from 'react';
import { MapPin } from 'lucide-react';
import BranchLocator from '../components/BranchLocator';

const BranchFinder: React.FC = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Bank Branch Locator</h1>
        <p className="mt-2 text-gray-600">
          Find bank branches near your location or search for specific branches across India.
        </p>
      </div>

      <div className="bg-indigo-50 rounded-lg p-6 mb-8">
        <div className="flex items-start gap-4">
          <div className="bg-indigo-100 rounded-full p-3 flex-shrink-0">
            <MapPin className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">How It Works</h2>
            <p className="text-gray-700">
              Our branch locator helps you find the nearest bank branches based on your current location. 
              You can also filter branches by bank name or search for specific locations.
            </p>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-md border border-indigo-100">
                <div className="text-indigo-600 font-medium mb-1">1. Share Your Location</div>
                <p className="text-sm text-gray-600">
                  Click "Use My Current Location" to let us find branches near you. Alternatively, you can search by city or area.
                </p>
              </div>
              <div className="bg-white p-4 rounded-md border border-indigo-100">
                <div className="text-indigo-600 font-medium mb-1">2. Filter Results</div>
                <p className="text-sm text-gray-600">
                  Use the filters to narrow down by bank name, distance, and available services to find the perfect branch.
                </p>
              </div>
              <div className="bg-white p-4 rounded-md border border-indigo-100">
                <div className="text-indigo-600 font-medium mb-1">3. Get Details</div>
                <p className="text-sm text-gray-600">
                  View complete branch information including address, contact details, working hours, and available services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BranchLocator />
    </div>
  );
};

export default BranchFinder;