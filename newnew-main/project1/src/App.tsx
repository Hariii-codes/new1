import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, MapPin, Calculator, Landmark, Menu, X } from 'lucide-react';
import { useState } from 'react';

// Import pages
import LoanComparison from './features/loan/pages/LoanComparison';
import BranchFinder from './features/loan/pages/BranchFinder';
import LoanCalculator from './features/loan/pages/LoanCalculator';
import Homepage from './features/loan/pages/Homepage';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Navigation */}
        <nav className="bg-white shadow-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="flex-shrink-0 flex items-center">
                  <Landmark className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-900">NIDHISAKHII</span>
                </Link>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link
                    to="/"
                    className="border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    <Home className="mr-1 h-4 w-4" />
                    Loan Tools
                  </Link>
                  <Link
                    to="/loans"
                    className="border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    <Landmark className="mr-1 h-4 w-4" />
                    Loan Compare
                  </Link>
                  <Link
                    to="/calculator"
                    className="border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    <Calculator className="mr-1 h-4 w-4" />
                    EMI Calculator
                  </Link>
                  <Link
                    to="/branches"
                    className="border-transparent text-gray-500 hover:border-indigo-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    <MapPin className="mr-1 h-4 w-4" />
                    Branch Locator
                  </Link>
                </div>
              </div>
              <div className="sm:hidden flex items-center">
                <button
                  onClick={toggleMobileMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  {isMobileMenuOpen ? (
                    <X className="block h-6 w-6" />
                  ) : (
                    <Menu className="block h-6 w-6" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMobileMenuOpen && (
            <div className="sm:hidden bg-white border-t border-gray-200">
              <div className="pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Home className="mr-2 h-5 w-5" />
                    Home
                  </div>
                </Link>
                <Link
                  to="/loans"
                  className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Landmark className="mr-2 h-5 w-5" />
                    Loan Compare
                  </div>
                </Link>
                <Link
                  to="/calculator"
                  className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    EMI Calculator
                  </div>
                </Link>
                <Link
                  to="/branches"
                  className="text-gray-500 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <MapPin className="mr-2 h-5 w-5" />
                    Branch Locator
                  </div>
                </Link>
              </div>
            </div>
          )}
        </nav>

        {/* Main content */}
        <main className="flex-grow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/loans" element={<LoanComparison />} />
              <Route path="/calculator" element={<LoanCalculator />} />
              <Route path="/branches" element={<BranchFinder />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="border-t border-gray-200 pt-4">
              <p className="text-center text-sm text-gray-500">
                &copy; 2025 NIDHISAK. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;